// Drive the actual v43 library and dock before checking existing game behavior.
export async function gameLibrary(page){
 if(await page.locator('#settingsDialog[open]').count())await page.locator('#closeSettings').click();
 if(await page.locator('#libraryView').isHidden()||await page.locator('#dockFavorites').getAttribute('aria-current')==='page')await page.locator('#allGames').click();
 if(await page.locator('#gameSearch').inputValue())await page.locator('#gameSearch').fill('');
 const all=page.locator('#gameFilters').getByRole('button',{name:'All',exact:true});if(await all.getAttribute('aria-pressed')!=='true')await all.click();
}
// Retained gameplay cases navigate the real settings overlay before acting.
// New overlay/focus tests use direct locators to verify its modal behavior.
export async function gameAction(locator,method,...args){
 const page=locator.page();
 if(await page.locator('#settingsDialog').count()){
  const inside=await locator.evaluate(e=>!!e.closest('#settingsDialog'));
  const open=await page.locator('#settingsDialog[open]').count();
  if(inside&&!open)await page.locator('#settingsToggle').click();
  else if(!inside&&open)await page.locator('#closeSettings').click();
 }
 return locator[method](...args);
}
export async function gameSettings(page){if(await page.locator('#settingsPanel').isHidden())await page.locator('#settingsToggle').click()}
export async function chooseGame(page,id,{settings=true}={}){
 await gameLibrary(page);await page.locator('#gamePicker [data-game="'+id+'"]').click();
 await page.waitForFunction(id=>document.querySelector('#gamePicker [data-game="'+id+'"]').getAttribute('aria-pressed')==='true'&&(document.querySelector('#board').children.length>0||!document.querySelector('#localRound').hidden),id);
 if(settings)await gameSettings(page);
}
