import {gameAction} from './game-navigation.mjs';
import {chooseGame,gameLibrary,gameSettings} from './game-navigation.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
import * as browsers from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {startFixtureServer} from './fixture-server.mjs';
import * as E from '../src/games/extras.js';
import {defaults,SAVE_KEY} from '../src/games/saves.js';
const kind=process.env.REVIEW_BROWSER||'chromium',server=await startFixtureServer(4293),checks=[],errors=[];
const browser=await browsers[kind].launch({headless:true,...(kind==='chromium'?{args:['--no-sandbox'],...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})}:{})});
const context=await browser.newContext({viewport:{width:1280,height:1000}}),page=await context.newPage();
await context.addInitScript(()=>Math.random=()=>.5);
page.setDefaultTimeout(12000);page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
fs.mkdirSync('test-results',{recursive:true});
const test=async(name,fn)=>{await fn();checks.push(name);console.log('PASS',name)};
const meta=s=>({...s,moves:0,hints:0,credited:false});
async function select(id){await chooseGame(page,id);await page.waitForFunction(id=>document.querySelector('[data-game='+id+']').getAttribute('aria-pressed')==='true',id)}
async function saved(){await page.waitForTimeout(750);return page.evaluate(key=>JSON.parse(localStorage.getItem(key)),SAVE_KEY)}
async function fixture(id,state,setting={level:'medium',mode:'solo'}){
 await gameSettings(page);if(await page.locator('#remember').isChecked())await gameAction(page.locator('#remember'),"uncheck");
 const p=defaults();p.enabled=true;p.active=id;p.saves[id]=state;p.settings[id]=setting;
 await page.evaluate(([key,data])=>{localStorage.setItem(key,JSON.stringify(data));history.replaceState(null,'','#game='+data.active)},[SAVE_KEY,p]);await page.reload();
 await page.waitForFunction(id=>document.querySelector('[data-game='+id+']').getAttribute('aria-pressed')==='true',id);
}
try{
 await page.goto('http://127.0.0.1:4293/toolStudio/games/index.html');await chooseGame(page,'2048');await page.waitForSelector('.tile');
 await test('All fifteen games are reachable from the compact library',async()=>{
  await gameLibrary(page);assert.equal(await page.locator('#gamePicker [data-game]').count(),15);assert((await page.locator('.game-card').first().boundingBox()).height<=120);
 });
 await test('Dock selection keeps text readable throughout its transition',async()=>{
  for(const colorScheme of ['light','dark']){await page.emulateMedia({colorScheme});const ratios=await page.evaluate(async()=>{
   const lum=color=>{const rgb=color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]};const result=[];
   for(const id of ['dockFavorites','allGames']){const button=document.getElementById(id);button.click();for(let frame=0;frame<10;frame++){await new Promise(requestAnimationFrame);const css=getComputedStyle(button),a=lum(css.color),b=lum(css.backgroundColor);result.push((Math.max(a,b)+.05)/(Math.min(a,b)+.05))}}return result;
  });assert(ratios.every(r=>r>=4.5),colorScheme+' minimum contrast '+Math.min(...ratios))}await page.emulateMedia({colorScheme:'light'});
 });
 await test('Reversi responds with a legal computer turn and offers a local coach',async()=>{
  await select('reversi');assert.equal(await page.locator('#board button:not(:disabled)').count(),4);
  await gameAction(page.locator('#board button:not(:disabled)').first(),"click");
  await page.waitForFunction(()=>document.querySelector('#gameStatus').textContent.includes('X to play'));
  assert.equal(await page.locator('#board .X,#board .O').count(),6);
  await gameAction(page.locator('#hint'),"click");await page.locator('#board .suggested').waitFor();
  assert.equal(await page.locator('#board .suggested:not(:disabled)').count(),1);assert((await page.locator('#hintText').innerText()).includes('small-endgame'));
 });
 await test('Reversi two-player mode alternates, while switching cancels stale computer replies',async()=>{
  await gameAction(page.getByLabel('Opponent',{exact:true}),"selectOption",'two');await gameAction(page.locator('#board button:not(:disabled)').first(),"click");assert((await page.locator('#gameStatus').innerText()).includes('O to play'));
  await gameAction(page.getByLabel('Opponent',{exact:true}),"selectOption",'solo');await gameAction(page.locator('#board button:not(:disabled)').first(),"click");await select('lights');await page.waitForTimeout(250);assert.equal(await page.locator('#board').getAttribute('class'),'lights');assert.equal(await page.locator('#board button').count(),25);
 });
 await test('Sliding Puzzle touch, keyboard and Undo restore the actual board',async()=>{
  await select('sliding');const before=await page.locator('#board button').allTextContents();await gameAction(page.locator('#board button:not(:disabled)').first(),"click");assert.notDeepEqual(await page.locator('#board button').allTextContents(),before);
  await gameAction(page.locator('#slidingUndo'),"click");assert.deepEqual(await page.locator('#board button').allTextContents(),before);assert(await page.locator('#slidingUndo').isDisabled());
  const blank=before.indexOf(''),key=blank>=3?'ArrowDown':'ArrowUp';await gameAction(page.locator('#board'),"press",key);assert.notDeepEqual(await page.locator('#board button').allTextContents(),before);
  await gameAction(page.locator('#hint'),"click");await page.locator('#board .suggested').waitFor();assert.equal(await page.locator('#board .suggested:not(:disabled)').count(),1);
 });
 await test('Every puzzle/code setting produces the requested board',async()=>{
  for(const [id,label,counts]of [['sliding','Puzzle size',[9,9,16]],['lights','Pattern',[16,25,25]],['code','Code digits',[4,5,6]]]){
   await select(id);for(const [n,level]of ['easy','medium','hard'].entries()){await gameAction(page.getByLabel(label,{exact:true}),"selectOption",level);assert.equal(await page.locator(id==='code'?'.code-draft select:first-of-type option':'#board>button').count(),id==='code'?counts[n]*4:counts[n]);}
  }
 });
 await test('Lights Out changes its cross and the coach solves the actual board',async()=>{
  await select('lights');const before=await page.locator('#board button').evaluateAll(list=>list.map(e=>e.getAttribute('aria-pressed')));await gameAction(page.locator('#board button').nth(0),"click");const after=await page.locator('#board button').evaluateAll(list=>list.map(e=>e.getAttribute('aria-pressed')));
  assert.deepEqual(after.flatMap((v,i)=>v!==before[i]?[i]:[]),[0,1,5]);await gameAction(page.locator('#hint'),"click");assert.equal(await page.locator('#board .suggested').count(),1);assert((await page.locator('#hintText').innerText()).includes('Linear algebra'));
 });
 await test('Codebreaker keeps feedback history, supports repeats and never reveals an unfinished code',async()=>{
  await select('code');assert.equal(await page.locator('.code-answer').count(),0);await gameAction(page.locator('.check-code'),"click");assert.equal(await page.locator('.code-history li').count(),1);assert((await page.locator('.code-history li').innerText()).includes('exact'));
  await gameAction(page.locator('#hint'),"click");await page.waitForFunction(()=>document.querySelector('#hintText').textContent.includes('consistent with your feedback'));assert.equal(await page.locator('.code-answer').count(),0);
 });
 await test('Progress and drafts for all four games survive switching and an opted-in reload',async()=>{
  await page.evaluate(()=>localStorage.setItem('toolstudio-workspace-sentinel','keep'));assert.equal(await page.evaluate(key=>localStorage.getItem(key),SAVE_KEY),null);await gameSettings(page);await gameAction(page.locator('#remember'),"check");
  for(const id of ['reversi','sliding','lights','code']){await select(id);await saved()}
  await select('code');await gameAction(page.getByLabel('Digit 1',{exact:true}),"selectOption",'2');const before=await saved();
  assert(['reversi','sliding','lights','code'].every(id=>before.saves[id]));await page.reload();await page.waitForSelector('.code-draft');assert.equal(await page.getByLabel('Digit 1',{exact:true}).inputValue(),'2');
  assert.equal(await page.evaluate(()=>localStorage.getItem('toolstudio-workspace-sentinel')),'keep');
 });
 await test('Sliding completion credits assisted bests once and survives reload',async()=>{
  await fixture('sliding',{...meta({size:3,board:[1,2,3,4,5,6,7,0,8],undo:null}),moves:20,hints:1});await gameAction(page.getByRole('button',{name:'Slide tile 8',exact:true}),"click");assert.equal(await page.locator('#gameStatus').innerText(),'Puzzle complete in 21 moves!');
  const p=await saved();assert.equal(p.best['sliding:medium:solo:assisted'],21);await page.reload();await page.waitForSelector('.puzzle-tile');assert.equal((await saved()).best['sliding:medium:solo:assisted'],21);
 });
 await test('Lights Out completion counts a genuine win',async()=>{
  const board=E.toggleLights(Array(16).fill(0),4,0);await fixture('lights',meta({size:4,board}),{level:'easy',mode:'solo'});await gameAction(page.locator('#board button').first(),"click");assert.equal(await page.locator('#gameStatus').innerText(),'All lights off in 1 move!');assert.equal((await saved()).best['lights:easy:solo:solo'],1);
 });
 await test('Codebreaker records a win but never credits a ten-guess loss',async()=>{
  const s=meta({...E.createCode('easy'),secret:[1,2,3,4],draft:[1,2,3,4]});await fixture('code',s,{level:'easy',mode:'solo'});await gameAction(page.locator('.check-code'),"click");assert((await page.locator('#gameStatus').innerText()).includes('Code cracked'));assert.equal((await saved()).best['code:easy:solo:solo'],1);
  const row={guess:[1,1,1,1],exact:0,misplaced:0},loss={...meta({...E.createCode('easy'),secret:[2,2,2,2],history:Array.from({length:9},()=>structuredClone(row))}),moves:9};await fixture('code',loss,{level:'easy',mode:'solo'});await gameAction(page.locator('.check-code'),"click");assert((await page.locator('#gameStatus').innerText()).includes('No guesses left'));assert.equal(await page.locator('.code-answer').innerText(),'The code was 2 2 2 2.');assert.equal((await saved()).best['code:easy:solo:solo'],undefined);
 });
 await test('Reversi terminal match credits once and resumes a saved pending computer turn',async()=>{
  const b=Array(64).fill('X');b[0]='';b[1]='O';await fixture('reversi',{...meta({board:b,turn:'X'}),moves:59},{level:'hard',mode:'two'});await gameAction(page.locator('#board button').first(),"click");assert((await page.locator('#gameStatus').innerText()).includes('X wins!'));assert.equal((await saved()).matches.reversi.X,1);await page.reload();await page.waitForSelector('.reversi-cell');assert.equal((await saved()).matches.reversi.X,1);
  const n=E.playReversi(E.createReversi(),19);await fixture('reversi',{...meta(n),moves:1},{level:'easy',mode:'solo'});await page.waitForFunction(()=>document.querySelector('#gameStatus').textContent.includes('X to play'));assert.equal(await page.locator('#board .X,#board .O').count(),6);
 });
 await test('Earlier Games v2 saves retain their scores and original boards',async()=>{
  const old=defaults();delete old.matches.reversi;old.enabled=true;old.best['2048:medium:solo:solo']=128;old.saves['2048']=meta({board:[2,4,...Array(14).fill(0)],score:12,undo:null});
  await gameSettings(page);await gameAction(page.locator('#remember'),"uncheck");await page.evaluate(([key,data])=>{localStorage.setItem(key,JSON.stringify(data));history.replaceState(null,'','#game='+data.active)},[SAVE_KEY,old]);await page.reload();await page.waitForSelector('.tile');assert((await page.locator('#gameStatus').innerText()).includes('Score 12'));assert((await page.locator('#record').innerText()).includes('128 points'));assert(!(await page.locator('#saveStatus').innerText()).includes('could not'));
 });
 await test('Compact picker and new boards fit phone, tablet, desktop and TV viewports',async()=>{
  for(const width of [320,390,768,1440,1920]){await page.setViewportSize({width,height:900});for(const id of ['reversi','sliding','lights','code']){await select(id);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),id+' '+width);assert.equal(Math.round((await page.locator('#gameDock').boundingBox()).x),0)}}
 });
 await test('New games pass light and dark accessibility checks with live content',async()=>{
  await page.setViewportSize({width:1280,height:1000});for(const colorScheme of ['light','dark']){await page.emulateMedia({colorScheme});for(const id of ['reversi','sliding','lights','code']){await select(id);const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();assert.deepEqual(audit.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),[],id+' '+colorScheme)}}
 });
 await test('Reduced motion disables added transitions',async()=>{
  await page.emulateMedia({reducedMotion:'reduce'});await select('lights');assert.equal(await page.locator('#board button').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 });
 await test('Standalone offline games include working coaches without external requests',async()=>{
  const off=await context.newPage(),requests=[];off.on('pageerror',e=>errors.push(e.message));off.on('request',r=>{if(/^https?:/.test(r.url()))requests.push(r.url())});
  await off.goto(pathToFileURL(path.resolve('dist/offline/Calc_Studio_Games.html')).href);
  for(const id of ['reversi','sliding','lights','code']){await chooseGame(off,id);await gameAction(off.locator('#hint'),"click");await off.waitForFunction(()=>document.querySelector('#hintText').textContent.length>10);}
  assert.deepEqual(requests,[]);await off.close();
 });
 await test('Clear saved Games leaves tool workspace data intact',async()=>{
  await gameSettings(page);await gameAction(page.locator('#clearSaves'),"click");assert.equal(await page.evaluate(key=>localStorage.getItem(key),SAVE_KEY),null);assert.equal(await page.evaluate(()=>localStorage.getItem('toolstudio-workspace-sentinel')),'keep');
 });
 await page.emulateMedia({colorScheme:'light',reducedMotion:'no-preference'});await select('lights');await page.screenshot({path:'test-results/games-extra-'+kind+'-desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await select('code');await page.screenshot({path:'test-results/games-extra-'+kind+'-mobile.png',fullPage:true});
 await test('No new Games runtime errors',()=>assert.deepEqual(errors,[]));
} finally {await browser.close();await server.close();fs.writeFileSync('test-results/games-extra-'+kind+'.json',JSON.stringify({browser:kind,checks,errors},null,2));}
