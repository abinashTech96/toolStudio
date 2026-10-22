import {node} from '../advanced/ui.js';
export function installTaskNavigator(api,panel,id,tasks){
 if(id==='careerstudio')return;
 if(panel.querySelector('[data-task-navigator]'))return;
 const nav=node('nav',undefined,{'aria-label':'Workspace tasks',class:'studio-task-nav','data-task-navigator':id}),label=node('label','What would you like to do? '),select=node('select',undefined,{'aria-label':'Workspace task in '+id}),help=node('p','Choose a task. Inputs stay available when switching views.');
 select.append(new Option('Choose a task…',''),new Option('Use current tool','current'),...tasks.map(t=>new Option(t.label,'guided:'+t.id)));
 const routes=api.workspaceRegistry?.modules.find(m=>m.id===id)?.routes||[];for(const route of routes)if(route!==id)select.append(new Option(api.c.views[route]||route,'route:'+route));if(panel.querySelector('[data-advanced-feature]'))select.append(new Option('Advanced controls','advanced'));
 const guided=panel.querySelector('[data-guided-workflows]');if(guided){guided.querySelector('label').hidden=true;panel.querySelector('.g36-shortcut')?.parentElement.remove();const inner=guided.querySelector('select');inner.addEventListener('change',()=>{select.value=inner.value?'guided:'+inner.value:'current';guided.querySelector('summary').textContent=inner.selectedOptions[0]?.textContent||'Task controls'})}
 select.onchange=()=>{const value=select.value;if(value.startsWith('route:')){api.c.openTab(value.slice(6));return}if(value==='advanced'){const d=panel.querySelector('[data-advanced-feature]');d.open=true;d.scrollIntoView({block:'start'});d.querySelector('summary').focus();return}if(value.startsWith('guided:')){const d=panel.querySelector('[data-guided-workflows]'),s=d.querySelector('select');d.open=true;s.value=value.slice(7);s.dispatchEvent(new Event('change'));d.scrollIntoView({block:'start'});return}panel.querySelector('input,textarea,button')?.focus()};label.append(select);nav.append(label,help);panel.prepend(nav);
}
