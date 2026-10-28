// Drive the actual v43 library and dock before checking existing game behavior.
export async function gameLibrary(page){
 if(await page.locator('#libraryView').isHidden()||await page.locator('#dockFavorites').getAttribute('aria-current')==='page')await page.locator('#allGames').click();
 if(await page.locator('#gameSearch').inputValue())await page.locator('#gameSearch').fill('');
 const all=page.locator('#gameFilters').getByRole('button',{name:'All',exact:true});if(await all.getAttribute('aria-pressed')!=='true')await all.click();
}
export async function gameSettings(page){if(await page.locator('#settingsPanel').isHidden())await page.locator('#settingsToggle').click()}
export async function chooseGame(page,id,{settings=true}={}){
 await gameLibrary(page);await page.locator('[data-game="'+id+'"]').click();
 await page.waitForFunction(id=>document.querySelector('[data-game="'+id+'"]').getAttribute('aria-pressed')==='true'&&document.querySelector('#board').children.length>0,id);
 if(settings)await gameSettings(page);
}
