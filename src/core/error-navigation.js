// One consistent path from an error message to an editable control.
export function showFieldErrors(root,error,status){
 root.querySelector('[data-field-errors]')?.remove();
 const fields=[...root.querySelectorAll('textarea,input,select')],label=error.fieldLabel,explicit=fields.find(e=>e.getAttribute('aria-label')===label||e.id===error.fieldId),invalid=fields.filter(e=>e.willValidate&&!e.validity.valid);
 const targets=explicit?[explicit]:invalid.length?invalid:/JSON|Unexpected|Expected|Invalid|Enter|Choose|required/i.test(error.message||'')?fields.filter(e=>e.getClientRects().length&&e.type!=='file').slice(0,1):[];
 if(!targets.length)return;const nav=document.createElement('nav');nav.dataset.fieldErrors='true';nav.setAttribute('aria-label','Fields to review');nav.className='studio-field-errors';
 for(const field of targets.slice(0,20)){
  field.setAttribute('aria-invalid','true');field.addEventListener('input',()=>{field.removeAttribute('aria-invalid');if(!root.querySelector('[aria-invalid=true]'))nav.remove()},{once:true});
  const button=document.createElement('button');button.type='button';button.textContent='Review '+(field.getAttribute('aria-label')||field.labels?.[0]?.textContent||field.id||'input');button.onclick=()=>{for(let p=field.parentElement;p&&p!==root;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;field.scrollIntoView({block:'center'});field.focus({preventScroll:true});if(Number.isInteger(error.position)&&['TEXTAREA','INPUT'].includes(field.tagName))try{field.setSelectionRange(error.position,error.position+1)}catch{}};nav.append(button);
 }
 status.after(nav);nav.querySelector('button')?.click();
}
