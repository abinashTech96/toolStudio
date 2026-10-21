import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {pathToFileURL} from 'node:url';
const {chromium}=await import('playwright').catch(()=>import(pathToFileURL(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/playwright-core/index.mjs').href));
const port=Number(process.env.TEST_PORT||4187),base=`http://127.0.0.1:${port}/toolStudio/`;
const server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:String(port)},stdio:'pipe'});
const errors=[],requests=[],checks=[];
const check=(value,label)=>{assert(value,label);checks.push(label);console.log('PASS',label)};
let browser;
try{
 for(let n=0;n<100;n++){try{if((await fetch(base)).ok)break}catch{}await new Promise(r=>setTimeout(r,50));}
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 await context.route('**/runtime/bootstrap.*.js',async route=>{const response=await route.fetch();const text=(await response.text()).replace('await initializeModules(context, groups.flat(),{cooperative:true});','await initializeModules(context, groups.flat(),{cooperative:true}); window.testContext=context;');await route.fulfill({response,body:text});});
 const page=await context.newPage();page.setDefaultTimeout(10000);page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 await page.goto(base);await page.waitForFunction(()=>window.__toolStudioReady);
 check(await page.evaluate(()=>calcStudio.tools().length===124&&calcStudio.modules().length===69),'124 routes and 69 workspaces (all 105 legacy routes retained)');
 check(!requests.some(p=>/assets\/(ocr|vendor)/.test(p)),'No OCR or vendor engines downloaded at startup');
 check(await page.evaluate(()=>calcStudio.architecture().categories===11),'Eleven category modules');
 const open=async id=>{await page.evaluate(id=>calcStudio.openTool(id),id);await page.evaluate(id=>calcStudio.ensureToolResources(id),id)};
 const tools=await page.evaluate(()=>calcStudio.tools());
 for(const tool of tools){await open(tool.id);check(await page.evaluate(id=>!!testContext.$(id),tool.alias||tool.id),'Hosted route '+tool.id);}
 await open('jsonformatter');await page.locator('#jsonInput').fill('{"a":1}');await page.locator('#jsonPretty').click();check((await page.locator('#jsonOutput').inputValue()).includes('"a": 1'),'JSON formatting');
 check(await page.evaluate(()=>testContext.cs31Schema('{"a":[1,2],"b":null}').properties.a.type==='array'),'JSON Schema generation');
 check(await page.evaluate(()=>testContext.cs31ValueStates('{"a":null,"b":""}','/a\n/b').length===2),'Null and empty value inspection');
 await open('qr');await page.locator('#qrInput').fill('https://example.com/toolstudio');await page.locator('#qrGenerate').click();await page.waitForFunction(()=>document.querySelector('#qrDownload')&&!document.querySelector('#qrDownload').disabled);
 check(true,'Lazy QR encoder produces a downloadable code');
 await open('barcodes');await page.locator('#barcodeValue').fill('ABC123');await page.locator('#barcodeGenerate').click();await page.waitForFunction(()=>!document.querySelector('#barcodeSVG').disabled);check(true,'Lazy barcode library generates SVG');
 await open('pdfworkspace');
 check(await page.evaluate(async()=>{const pdf=testContext.v9Libraries('pdf'),doc=await pdf.PDFDocument.create();doc.addPage([100,100]);const bytes=await doc.save();return (await pdf.PDFDocument.load(bytes)).getPageCount()===1}),'Lazy PDF library round trip');
 await open('archives');check(await page.evaluate(async()=>{const lib=testContext.v9Libraries('archive'),bytes=lib.zipSync({'sample.txt':new TextEncoder().encode('sample')});return new TextDecoder().decode(lib.unzipSync(bytes)['sample.txt'])==='sample'}),'Lazy archive library round trip');
 await open('dataworkbench');check(await page.evaluate(()=>{const lib=testContext.v9Libraries('excel').XLSX,book=lib.utils.book_new();lib.utils.book_append_sheet(book,lib.utils.aoa_to_sheet([['id'],[1]]),'Data');const bytes=lib.write(book,{type:'array',bookType:'xlsx'});return lib.utils.sheet_to_json(lib.read(bytes,{type:'array'}).Sheets.Data)[0].id===1}),'Lazy spreadsheet library round trip');
 await open('markdown');await page.locator('#mdInput').fill('# Modular test');await page.locator('#mdRender').click();await page.waitForFunction(()=>!document.querySelector('#mdDownload').disabled);check(true,'Hosted Markdown worker rendering');
 await open('imagestudio');await page.evaluate(()=>calcStudio.ensureToolResources('imagestudio','ciOCRRun'));
 check(await page.evaluate(()=>testContext.ciAsset('ciOCRCoreAsset').length>3900000&&testContext.ciAsset('ciOCREngAsset').length>2000000),'Original OCR assets load on demand');
 const backup=await page.evaluate(()=>calcStudio.exportBackup());check(!!backup.state,'Existing backup API retained');
 await open('calculator');await page.locator('.studio-menu').evaluate(e=>e.open=true);await page.locator('#fullScreenToggle').click();check(await page.locator('#u19Exit').isVisible(),'Fullscreen Normal view control');await page.locator('#u19Exit').click();check(await page.locator('#u19Exit').isHidden(),'Normal view restores app');
 for(const layout of ['mobile','tv','desktop']){await page.locator('#u19DeviceButton').click();await page.selectOption('#u19Layout',layout);await page.locator('#u19SettingsClose').click();check(await page.locator('#categoryPicker').isVisible()&&await page.locator('#workspacePicker').isVisible(),'Category and tool controls in '+layout);}
 await page.setViewportSize({width:390,height:844});await page.locator('#u19DeviceButton').click();await page.selectOption('#u19Layout','mobile');await page.locator('#u19SettingsClose').click();check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Mobile page fits viewport');
 await page.reload();await page.waitForFunction(()=>window.__toolStudioReady);check(await page.evaluate(()=>calcStudio.device().layout==='mobile'),'Layout preference survives reload');
 await page.locator('.studio-menu').evaluate(e=>e.open=true);const event=page.waitForEvent('popup');await page.locator('#cs32ConnectionButton').click();const connection=await event;connection.on('pageerror',e=>errors.push(e.message));await connection.waitForFunction(()=>window.connectionStudio?.status().bridge);check(await page.evaluate(()=>calcStudio.connection().attached),'Connection redirect preserves authenticated tab bridge');await connection.close();
 const ocr=await context.newPage();ocr.on('pageerror',e=>errors.push(e.message));await ocr.goto(base);await ocr.waitForFunction(()=>window.__toolStudioReady&&window.testContext);await ocr.evaluate(async()=>{calcStudio.openTool('camerastudio');const c=testContext.ciCanvas(700,120),x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,700,120);x.fillStyle='#000';x.font='bold 64px sans-serif';x.fillText('STUDIO 123',20,85);await testContext.ciLoadCanvas(c,'ocr-test.png');testContext.ciMode('extract');});await ocr.locator('#ciOCR').click();await ocr.waitForFunction(()=>document.querySelector('#ciOCRText').value.includes('123'),null,{timeout:60000});check(true,'OCR button loads original engine and recognizes generated image');await ocr.close();
 const swContext=await browser.newContext();const sw=await swContext.newPage();sw.on('pageerror',e=>errors.push(e.message));await sw.goto(base);await sw.waitForFunction(()=>window.__toolStudioReady);await sw.evaluate(()=>navigator.serviceWorker.ready);await sw.waitForFunction(()=>!!navigator.serviceWorker.controller);await swContext.setOffline(true);await sw.reload();await sw.waitForFunction(()=>window.__toolStudioReady);check(await sw.evaluate(()=>calcStudio.tools().length===124),'Scoped service worker reloads app offline');await swContext.close();
 const offline=await browser.newPage();offline.on('pageerror',e=>errors.push(e.message));await offline.goto(pathToFileURL(path.resolve('dist/offline/Calc_Studio_Offline.html')).href);await offline.waitForFunction(()=>window.__toolStudioReady);check(await offline.evaluate(()=>calcStudio.tools().length===124),'Self-contained file build starts');await offline.close();
 const packed=await browser.newPage();packed.on('pageerror',e=>errors.push(e.message));await packed.goto(pathToFileURL(path.resolve('offline/Calc_Studio_Offline.html')).href);await packed.waitForFunction(()=>window.__toolStudioReady);check(await packed.evaluate(()=>calcStudio.tools().length===124),'Packed standalone offline file starts');await packed.evaluate(()=>calcStudio.openTool('querystudio'));await packed.locator('#querystudio').getByRole('button',{name:'Run query',exact:true}).click();await packed.waitForFunction(()=>document.querySelector('#querystudio .a34-status')?.dataset.state==='ready');check((await packed.locator('#querystudio .a34-output').innerText()).includes('35'),'Packed offline SQLite engine runs without a server');await packed.close();
 check(errors.length===0,'No browser runtime errors: '+errors.join('; '));
}finally{await browser?.close();server.kill();fs.mkdirSync('test-results',{recursive:true});fs.writeFileSync('test-results/smoke.json',JSON.stringify({checks:checks.length,errors,passed:checks},null,2));}
