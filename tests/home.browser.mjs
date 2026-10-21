import fs from 'node:fs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const port=4193,base=`http://127.0.0.1:${port}/toolStudio/`,passed=[],errors=[],requests=[];
const server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:String(port)},stdio:'pipe'});
let browser;
const check=(value,label)=>{assert(value,label);passed.push(label);console.log('PASS',label)};
try {
  for(let n=0;n<100;n++){try{if((await fetch(base)).ok)break}catch{}await new Promise(resolve=>setTimeout(resolve,50))}
  browser=await chromium.launch({headless:true,args:['--no-sandbox'],...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
  await page.goto(base);await page.waitForFunction(()=>window.__toolStudioReady);
  check(await page.locator('#studioHome').isVisible()&&!await page.locator('#calculator').isVisible(),'Fresh URL opens the dashboard instead of Calculator');
  check(!requests.some(url=>/assets\/(ocr|vendor|advanced)/.test(url)),'Dashboard keeps heavy engines lazy');
  check(await page.locator('.home-category').count()===11,'All eleven folder categories are discoverable');
  check(await page.locator('.home-tool-card').count()===8,'Initial dashboard shows a compact set of tools');
  await page.locator('[data-category=developer]').click();
  check((await page.locator('.home-tool-open small').allTextContents()).every(x=>x==='Developer, API & Automation'),'Category selection filters tool cards');
  await page.locator('.home-clear').click();
  await page.locator('#homeSearch').fill('SOQL');await page.locator('.home-tool-open').first().click();
  check(await page.locator('#soql').isVisible()&&page.url().endsWith('#tool=soql'),'Feature search opens the exact legacy feature');
  await page.goBack();await page.waitForFunction(()=>calcStudio.homeVisible());
  check(await page.locator('#studioHome').isVisible(),'Browser Back returns to the dashboard');
  await page.goForward();await page.waitForFunction(()=>!calcStudio.homeVisible());
  check(await page.locator('#soql').isVisible(),'Browser Forward restores the tool');
  await page.locator('#homeButton').click();await page.locator('#homeSearch').fill('EMI');
  await page.getByRole('button',{name:/Loan \/ EMI/}).first().click();
  check(await page.locator('#tools [data-tool=loan]').getAttribute('aria-pressed')==='true','EMI search selects the loan calculator mode');
  await page.locator('#homeButton').click();await page.locator('#homeSearch').fill('no-such-tool-unique');
  check(await page.locator('.home-empty').isVisible(),'Unmatched searches show a useful empty state');
  await page.getByRole('button',{name:'Reset filters',exact:true}).click();
  await page.locator('#homeSearch').fill('Query Studio');
  const favorite=page.locator('[data-tool=querystudio] .home-star');
  await favorite.click();check(await favorite.getAttribute('aria-pressed')==='true','Native workspaces can be favorited from Home');
  check(await favorite.evaluate(el=>el===document.activeElement),'Favoriting retains keyboard focus');
  await page.reload();await page.waitForFunction(()=>window.__toolStudioReady);
  check(await page.locator('.home-quick-links').getByRole('button',{name:'Query Studio',exact:true}).count()===1,'Native favorites survive reload');
  await page.locator('#homeSearch').fill('JSON Studio');await page.locator('.home-tool-open').first().click();
  await page.evaluate(()=>calcStudio.openTool('jsonformatter'));await page.locator('#jsonInput').fill('{"draft":"keep me"}');
  await page.locator('#homeButton').click();await page.evaluate(()=>calcStudio.openTool('jsonformatter'));
  check(await page.locator('#jsonInput').inputValue()==='{"draft":"keep me"}','Returning Home retains workspace input');
  await page.goto(base+'#tool=querystudio');await page.waitForFunction(()=>window.__toolStudioReady);
  await page.waitForSelector('#querystudio .a34-body');
  check(!await page.locator('#studioHome').isVisible()&&await page.locator('#querystudio').isVisible(),'Direct native workspace bookmarks survive startup');
  await page.goto(base+'#tool=soql');await page.waitForFunction(()=>window.__toolStudioReady);
  check(await page.locator('#soql').isVisible(),'Direct legacy feature bookmarks survive startup');
  await page.goto(base+'#tool=financeworkspace');await page.waitForFunction(()=>window.__toolStudioReady&&!calcStudio.homeVisible());
  check(page.url().endsWith('#tool=financeworkspace'),'Suite bookmarks preserve their original address');
  await page.locator('#homeButton').click();await page.goBack();
  await page.waitForFunction(()=>!calcStudio.homeVisible());
  check(page.url().endsWith('#tool=financeworkspace'),'Back to a suite bookmark does not insert another history entry');
  await page.goto(base+'#tool=missing-workspace');await page.waitForFunction(()=>window.__toolStudioReady);
  check(await page.locator('#studioHome').isVisible(),'Unknown workspace links fall back to Home');
  await page.locator('.home-clear').click();await page.locator('#homeOptional').check();
  await page.getByRole('button',{name:'All tools',exact:true}).click();
  check(await page.locator('.home-tool-card').count()===66,'All 66 main workspaces remain discoverable; three earlier Career editors are consolidated under Studio');
  // A fresh page gives the default compact layout at each screen width.
  await page.goto(base);await page.waitForFunction(()=>window.__toolStudioReady);
  for(const width of [390,768,1440]) {
    await page.setViewportSize({width,height:900});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Dashboard fits viewport at '+width+'px');
  }
  const audit=await new AxeBuilder({page}).include('#studioHome').withTags(['wcag2a','wcag2aa']).analyze();
  check(audit.violations.length===0,'Dashboard accessibility audit: '+audit.violations.map(x=>x.id).join(', '));
  const offline=await context.newPage();offline.on('pageerror',e=>errors.push(e.message));
  await offline.goto(pathToFileURL(path.resolve('dist/offline/Calc_Studio_Offline.html')).href);await offline.waitForFunction(()=>window.__toolStudioReady);
  check(await offline.locator('#studioHome').isVisible(),'Standalone offline build opens Home');
  await offline.locator('#homeSearch').fill('SOQL');await offline.locator('.home-tool-open').first().click();
  check(await offline.locator('#soql').isVisible(),'Offline feature search opens the selected tool');
  await offline.locator('#homeButton').click();check(await offline.locator('#studioHome').isVisible(),'Offline Home navigation works');
  check(errors.length===0,'No dashboard runtime errors: '+errors.join('; '));
} finally {
  await browser?.close();server.kill();fs.mkdirSync('test-results',{recursive:true});
  fs.writeFileSync('test-results/home.json',JSON.stringify({checks:passed.length,passed,errors},null,2));
}
