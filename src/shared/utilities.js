// shared/utilities · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="shared/utilities";
export function register(__studio33){
__studio33.factorial = __studio33.$fn((function factorial(n){__studio33.integer(n);if(n>170)throw Error('Factorial supports 0–170');let v=1;for(let i=2;i<=n;i++)v*=i;return v}),"function factorial(n){integer(n);if(n>170)throw Error('Factorial supports 0–170');let v=1;for(let i=2;i<=n;i++)v*=i;return v}","factorial");

__studio33.combin = __studio33.$fn((function combin(n,r,permutation){__studio33.integer(n);__studio33.integer(r);if(r>n)throw Error('r must be between 0 and n');if(n>1000000)throw Error('n must be at most 1,000,000');if(!permutation)r=Math.min(r,n-r);let v=1;for(let i=1;i<=r;i++)v=__studio33.finite(v*(n-i+1)/(permutation?1:i));return Math.round(v)}),"function combin(n,r,permutation){integer(n);integer(r);if(r>n)throw Error('r must be between 0 and n');if(n>1000000)throw Error('n must be at most 1,000,000');if(!permutation)r=Math.min(r,n-r);let v=1;for(let i=1;i<=r;i++)v=finite(v*(n-i+1)/(permutation?1:i));return Math.round(v)}","combin");

__studio33.evaluate = __studio33.$fn((function evaluate(source,mode=__studio33.angle,answer=__studio33.ans,variables=null){
 if(typeof source!=='string'||!source.trim())throw Error('Enter an expression');if(source.length>2000)throw Error('Expression is too long');
 const s=source.replace(/×/g,'*').replace(/÷/g,'/').replace(/[−–]/g,'-').replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/\*\*/g,'^');
 const tokens=[];let p=0;
 while(p<s.length){if(/\s/.test(s[p])){p++;continue}const sub=s.slice(p),num=sub.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/),name=sub.match(/^[A-Za-z_][A-Za-z0-9_]*/);if(num){if(tokens.at(-1)?.t==='number')throw Error('Invalid number or missing operator');tokens.push({t:'number',v:__studio33.finite(Number(num[0]))});p+=num[0].length}else if(name){tokens.push({t:'name',v:name[0].toLowerCase()});p+=name[0].length}else if('+-*/^!%(),'.includes(s[p])){tokens.push({t:s[p++]})}else throw Error('Unrecognized character: '+s[p])}
 tokens.push({t:'end'});let i=0,depth=0;const peek=()=>tokens[i].t;const take=t=>{if(peek()!==t)throw Error(t===')'?'Missing closing parenthesis':'Expected '+t);return tokens[i++]};
 const toRad=x=>mode==='DEG'?x*Math.PI/180:x,fromRad=x=>mode==='DEG'?x*180/Math.PI:x;
 function call(name,a){const counts={sin:[1],cos:[1],tan:[1],asin:[1],acos:[1],atan:[1],sinh:[1],cosh:[1],tanh:[1],sqrt:[1],cbrt:[1],ln:[1],log:[1,2],exp:[1],abs:[1],floor:[1],ceil:[1],round:[1],root:[2],ncr:[2],npr:[2],mod:[2],min:null,max:null};if(!Object.hasOwn(counts,name))throw Error('Unknown function: '+name);if(counts[name]?!counts[name].includes(a.length):!a.length)throw Error('Incorrect number of arguments for '+name);const [x,y]=a;let v;
 switch(name){case'sin':v=Math.sin(toRad(x));break;case'cos':v=Math.cos(toRad(x));break;case'tan':if(Math.abs(Math.cos(toRad(x)))<1e-14)throw Error('tan is undefined at this angle');v=Math.tan(toRad(x));break;case'asin':v=fromRad(Math.asin(x));break;case'acos':v=fromRad(Math.acos(x));break;case'atan':v=fromRad(Math.atan(x));break;case'sinh':v=Math.sinh(x);break;case'cosh':v=Math.cosh(x);break;case'tanh':v=Math.tanh(x);break;case'sqrt':v=Math.sqrt(x);break;case'cbrt':v=Math.cbrt(x);break;case'ln':if(x<=0)throw Error('ln needs a positive number');v=Math.log(x);break;case'log':if(x<=0||(a.length===2&&(y<=0||y===1)))throw Error('Use x > 0 and base > 0, base ≠ 1');v=a.length===1?Math.log10(x):Math.log(x)/Math.log(y);break;case'exp':v=Math.exp(x);break;case'abs':v=Math.abs(x);break;case'floor':v=Math.floor(x);break;case'ceil':v=Math.ceil(x);break;case'round':v=Math.round(x);break;case'root':if(y===0)throw Error('Root degree cannot be zero');v=x<0&&Number.isInteger(y)&&Math.abs(y%2)===1?-Math.pow(-x,1/y):Math.pow(x,1/y);break;case'ncr':v=__studio33.combin(x,y,false);break;case'npr':v=__studio33.combin(x,y,true);break;case'mod':if(y===0)throw Error('Cannot take remainder with zero');v=x%y;break;case'min':v=Math.min(...a);break;case'max':v=Math.max(...a);break}return __studio33.finite(v)}
 function primary(){if(++depth>80)throw Error('Expression nesting is too deep');let v;if(peek()==='number')v=tokens[i++].v;else if(peek()==='('){i++;v=sum();take(')')}else if(peek()==='name'){const name=tokens[i++].v;if(['pi','e','ans'].includes(name))v={pi:Math.PI,e:Math.E,ans:answer}[name];else if(variables&&Object.hasOwn(variables,name))v=__studio33.finite(variables[name]);else{if(peek()!=='(')throw Error('Unknown variable or function: '+name);take('(');const args=[];if(peek()!==')'){args.push(sum());while(peek()===','){i++;args.push(sum())}}take(')');v=call(name,args)}}else throw Error('Expected a number, function, or parenthesis');depth--;while(peek()==='!'||peek()==='%'){const t=tokens[i++].t;v=t==='!'?__studio33.factorial(v):v/100}return v}
 function power(){let v=primary();if(peek()==='^'){i++;v=__studio33.finite(Math.pow(v,unary()))}return v}
 function unary(){if(peek()==='+'||peek()==='-'){if(++depth>80)throw Error('Expression nesting is too deep');const op=tokens[i++].t,v=unary();depth--;return op==='-'?-v:v}return power()}
 function product(){let v=unary();while(['*','/','number','name','('].includes(peek())){const op=peek();if(op==='*'||op==='/')i++;const b=unary();if(op==='/'&&b===0)throw Error('Cannot divide by zero');v=__studio33.finite(op==='/'?v/b:v*b)}return v}
 function sum(){let v=product();while(peek()==='+'||peek()==='-'){const op=tokens[i++].t,b=product();v=__studio33.finite(op==='+'?v+b:v-b)}return v}
 const value=sum();if(peek()!=='end')throw Error('Unexpected '+peek());return __studio33.finite(value);
}),"function evaluate(source,mode=angle,answer=ans,variables=null){\n if(typeof source!=='string'||!source.trim())throw Error('Enter an expression');if(source.length>2000)throw Error('Expression is too long');\n const s=source.replace(/×/g,'*').replace(/÷/g,'/').replace(/[−–]/g,'-').replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/\\*\\*/g,'^');\n const tokens=[];let p=0;\n while(p<s.length){if(/\\s/.test(s[p])){p++;continue}const sub=s.slice(p),num=sub.match(/^(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?/),name=sub.match(/^[A-Za-z_][A-Za-z0-9_]*/);if(num){if(tokens.at(-1)?.t==='number')throw Error('Invalid number or missing operator');tokens.push({t:'number',v:finite(Number(num[0]))});p+=num[0].length}else if(name){tokens.push({t:'name',v:name[0].toLowerCase()});p+=name[0].length}else if('+-*/^!%(),'.includes(s[p])){tokens.push({t:s[p++]})}else throw Error('Unrecognized character: '+s[p])}\n tokens.push({t:'end'});let i=0,depth=0;const peek=()=>tokens[i].t;const take=t=>{if(peek()!==t)throw Error(t===')'?'Missing closing parenthesis':'Expected '+t);return tokens[i++]};\n const toRad=x=>mode==='DEG'?x*Math.PI/180:x,fromRad=x=>mode==='DEG'?x*180/Math.PI:x;\n function call(name,a){const counts={sin:[1],cos:[1],tan:[1],asin:[1],acos:[1],atan:[1],sinh:[1],cosh:[1],tanh:[1],sqrt:[1],cbrt:[1],ln:[1],log:[1,2],exp:[1],abs:[1],floor:[1],ceil:[1],round:[1],root:[2],ncr:[2],npr:[2],mod:[2],min:null,max:null};if(!Object.hasOwn(counts,name))throw Error('Unknown function: '+name);if(counts[name]?!counts[name].includes(a.length):!a.length)throw Error('Incorrect number of arguments for '+name);const [x,y]=a;let v;\n switch(name){case'sin':v=Math.sin(toRad(x));break;case'cos':v=Math.cos(toRad(x));break;case'tan':if(Math.abs(Math.cos(toRad(x)))<1e-14)throw Error('tan is undefined at this angle');v=Math.tan(toRad(x));break;case'asin':v=fromRad(Math.asin(x));break;case'acos':v=fromRad(Math.acos(x));break;case'atan':v=fromRad(Math.atan(x));break;case'sinh':v=Math.sinh(x);break;case'cosh':v=Math.cosh(x);break;case'tanh':v=Math.tanh(x);break;case'sqrt':v=Math.sqrt(x);break;case'cbrt':v=Math.cbrt(x);break;case'ln':if(x<=0)throw Error('ln needs a positive number');v=Math.log(x);break;case'log':if(x<=0||(a.length===2&&(y<=0||y===1)))throw Error('Use x > 0 and base > 0, base ≠ 1');v=a.length===1?Math.log10(x):Math.log(x)/Math.log(y);break;case'exp':v=Math.exp(x);break;case'abs':v=Math.abs(x);break;case'floor':v=Math.floor(x);break;case'ceil':v=Math.ceil(x);break;case'round':v=Math.round(x);break;case'root':if(y===0)throw Error('Root degree cannot be zero');v=x<0&&Number.isInteger(y)&&Math.abs(y%2)===1?-Math.pow(-x,1/y):Math.pow(x,1/y);break;case'ncr':v=combin(x,y,false);break;case'npr':v=combin(x,y,true);break;case'mod':if(y===0)throw Error('Cannot take remainder with zero');v=x%y;break;case'min':v=Math.min(...a);break;case'max':v=Math.max(...a);break}return finite(v)}\n function primary(){if(++depth>80)throw Error('Expression nesting is too deep');let v;if(peek()==='number')v=tokens[i++].v;else if(peek()==='('){i++;v=sum();take(')')}else if(peek()==='name'){const name=tokens[i++].v;if(['pi','e','ans'].includes(name))v={pi:Math.PI,e:Math.E,ans:answer}[name];else if(variables&&Object.hasOwn(variables,name))v=finite(variables[name]);else{if(peek()!=='(')throw Error('Unknown variable or function: '+name);take('(');const args=[];if(peek()!==')'){args.push(sum());while(peek()===','){i++;args.push(sum())}}take(')');v=call(name,args)}}else throw Error('Expected a number, function, or parenthesis');depth--;while(peek()==='!'||peek()==='%'){const t=tokens[i++].t;v=t==='!'?factorial(v):v/100}return v}\n function power(){let v=primary();if(peek()==='^'){i++;v=finite(Math.pow(v,unary()))}return v}\n function unary(){if(peek()==='+'||peek()==='-'){if(++depth>80)throw Error('Expression nesting is too deep');const op=tokens[i++].t,v=unary();depth--;return op==='-'?-v:v}return power()}\n function product(){let v=unary();while(['*','/','number','name','('].includes(peek())){const op=peek();if(op==='*'||op==='/')i++;const b=unary();if(op==='/'&&b===0)throw Error('Cannot divide by zero');v=finite(op==='/'?v/b:v*b)}return v}\n function sum(){let v=product();while(peek()==='+'||peek()==='-'){const op=tokens[i++].t,b=product();v=finite(op==='+'?v+b:v-b)}return v}\n const value=sum();if(peek()!=='end')throw Error('Unexpected '+peek());return finite(value);\n}","evaluate");

__studio33.toast = __studio33.$fn((function toast(message){__studio33.$('toast').textContent=message;__studio33.$('toast').hidden=false;clearTimeout(__studio33.toastTimer);__studio33.toastTimer=setTimeout(__studio33.$fn(()=>__studio33.$('toast').hidden=true,"()=>$('toast').hidden=true",""),2400)}),"function toast(message){$('toast').textContent=message;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,2400)}","toast");

__studio33.addHistory = __studio33.$fn((function addHistory(item){__studio33.history.unshift({...item,id:__studio33.newId('hist'),label:'',note:'',pinned:false,time:new Date().toISOString()});while(__studio33.history.length>100){let index=__studio33.history.length-1;while(index>0&&__studio33.history[index].pinned)index--;__studio33.history.splice(index,1);}__studio33.storage.set('advanced-calculator-history',__studio33.history);__studio33.renderHistory()}),"function addHistory(item){history.unshift({...item,id:newId('hist'),label:'',note:'',pinned:false,time:new Date().toISOString()});while(history.length>100){let index=history.length-1;while(index>0&&history[index].pinned)index--;history.splice(index,1);}storage.set('advanced-calculator-history',history);renderHistory()}","addHistory");

__studio33.setTheme = __studio33.$fn((function setTheme(name){if(!Object.hasOwn(__studio33.themes,name))name='forest';document.documentElement.dataset.theme=name;__studio33.$('themeName').textContent=__studio33.themes[name];document.querySelectorAll('.theme-choice').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===name)));__studio33.storage.set('calc-studio-theme',name)}),"function setTheme(name){if(!Object.hasOwn(themes,name))name='forest';document.documentElement.dataset.theme=name;$('themeName').textContent=themes[name];document.querySelectorAll('.theme-choice').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===name)));storage.set('calc-studio-theme',name)}","setTheme");

__studio33.themeOpen = __studio33.$fn((function themeOpen(open){__studio33.$('themeMenu').hidden=!open;__studio33.$('themeToggle').setAttribute('aria-expanded',String(open))}),"function themeOpen(open){$('themeMenu').hidden=!open;$('themeToggle').setAttribute('aria-expanded',String(open))}","themeOpen");

__studio33.toggleHistory = __studio33.$fn((function toggleHistory(show){__studio33.$('historyPanel').hidden=!show;__studio33.$('workspace').classList.toggle('collapsed',!show);__studio33.$('historyToggle').setAttribute('aria-expanded',String(show));__studio33.storage.set('calc-studio-history-visible',show)}),"function toggleHistory(show){$('historyPanel').hidden=!show;$('workspace').classList.toggle('collapsed',!show);$('historyToggle').setAttribute('aria-expanded',String(show));storage.set('calc-studio-history-visible',show)}","toggleHistory");

__studio33.renderHistory = __studio33.$fn((function renderHistory(){__studio33.historyAnnotatedRender()}),"function renderHistory(){historyAnnotatedRender()}","renderHistory");

__studio33.makeField = __studio33.$fn((function makeField(label,id,value,type='number'){const wrap=document.createElement('label');wrap.className='field';const span=document.createElement('span');span.textContent=label;const input=document.createElement(type==='textarea'?'textarea':'input');input.id=id;if(type!=='textarea'){input.type=type;input.step='any';if(type==='number')input.min='0'}input.value=value;input.oninput=__studio33.renderToolResults;wrap.append(span,input);return wrap}),"function makeField(label,id,value,type='number'){const wrap=document.createElement('label');wrap.className='field';const span=document.createElement('span');span.textContent=label;const input=document.createElement(type==='textarea'?'textarea':'input');input.id=id;if(type!=='textarea'){input.type=type;input.step='any';if(type==='number')input.min='0'}input.value=value;input.oninput=renderToolResults;wrap.append(span,input);return wrap}","makeField");

__studio33.metricList = __studio33.$fn((function metricList(target,items){__studio33.$(target).replaceChildren();for(const [label,value]of items){const d=document.createElement('div');d.className='metric';const s=document.createElement('span'),b=document.createElement('strong');s.textContent=label;b.textContent=typeof value==='number'?__studio33.fmt(value):String(value);d.append(s,b);__studio33.$(target).append(d)}}),"function metricList(target,items){$(target).replaceChildren();for(const [label,value]of items){const d=document.createElement('div');d.className='metric';const s=document.createElement('span'),b=document.createElement('strong');s.textContent=label;b.textContent=typeof value==='number'?fmt(value):String(value);d.append(s,b);$(target).append(d)}}","metricList");

__studio33.errorMetric = __studio33.$fn((function errorMetric(target,e){__studio33.metricList(target,[['Check your inputs',e.message]])}),"function errorMetric(target,e){metricList(target,[['Check your inputs',e.message]])}","errorMetric");

__studio33.textParagraphs = __studio33.$fn((function textParagraphs(target,lines){__studio33.$(target).replaceChildren();for(const text of lines){const p=document.createElement('p');p.textContent=text;__studio33.$(target).append(p)}}),"function textParagraphs(target,lines){$(target).replaceChildren();for(const text of lines){const p=document.createElement('p');p.textContent=text;$(target).append(p)}}","textParagraphs");

__studio33.downloadFile = (function downloadFile(name,text,type='text/plain'){const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});

__studio33.copyText = __studio33.$fn((async function copyText(text){try{await navigator.clipboard.writeText(text);__studio33.toast('Copied')}catch{__studio33.toast('Copy unavailable; select the result to copy')}}),"async function copyText(text){try{await navigator.clipboard.writeText(text);toast('Copied')}catch{toast('Copy unavailable; select the result to copy')}}","copyText");

__studio33.numeric = __studio33.$fn((function numeric(id){const v=__studio33.$(id).value;if(!v.trim())throw Error('Complete all numeric inputs');return __studio33.evaluate(v)}),"function numeric(id){const v=$(id).value;if(!v.trim())throw Error('Complete all numeric inputs');return evaluate(v)}","numeric");

__studio33.setCompact = __studio33.$fn((function setCompact(value){__studio33.compact=value;document.querySelector('.shell').classList.toggle('expanded',!value);__studio33.$('densityToggle').textContent=value?'Expand':'Compact';__studio33.$('densityToggle').setAttribute('aria-pressed',String(!value));__studio33.storage.set('calc-studio-compact-v2',value)}),"function setCompact(value){compact=value;document.querySelector('.shell').classList.toggle('expanded',!value);$('densityToggle').textContent=value?'Expand':'Compact';$('densityToggle').setAttribute('aria-pressed',String(!value));storage.set('calc-studio-compact-v2',value)}","setCompact");

__studio33.closeCommands = __studio33.$fn((function closeCommands(){__studio33.$('commandOverlay').hidden=true;__studio33.commandFocus?.focus()}),"function closeCommands(){$('commandOverlay').hidden=true;commandFocus?.focus()}","closeCommands");

__studio33.showCommands = __studio33.$fn((function showCommands(){__studio33.commandFocus=document.activeElement;__studio33.$('commandOverlay').hidden=false;__studio33.$('commandSearch').value='';__studio33.commandIndex=0;__studio33.renderCommands();__studio33.$('commandSearch').focus()}),"function showCommands(){commandFocus=document.activeElement;$('commandOverlay').hidden=false;$('commandSearch').value='';commandIndex=0;renderCommands();$('commandSearch').focus()}","showCommands");

__studio33.notebookEvaluate = __studio33.$fn((function notebookEvaluate(text,mode=__studio33.angle){if(text.length>30000)throw Error('Notebook supports at most 30,000 characters');const lines=text.split(/\r?\n/);if(lines.length>200)throw Error('Use at most 200 lines');const vars=Object.create(null);let previous=__studio33.ans;return lines.map(__studio33.$fn((line,index)=>{const clean=line.split('#')[0].trim();if(!clean)return {line:index+1,empty:true};try{const assignment=clean.match(/^([a-z_][a-z0-9_]*)\s*=\s*(.+)$/i);let expression=clean,name=null;if(clean.includes('=')){if(!assignment)throw Error('Use name = expression');name=assignment[1].toLowerCase();if(!__studio33.validVariable(name))throw Error('This variable name is reserved or invalid');expression=assignment[2]}const value=__studio33.evaluate(expression,mode,previous,vars);if(name)vars[name]=value;previous=value;return {line:index+1,name,value}}catch(e){return {line:index+1,error:e.message}}},"(line,index)=>{const clean=line.split('#')[0].trim();if(!clean)return {line:index+1,empty:true};try{const assignment=clean.match(/^([a-z_][a-z0-9_]*)\\s*=\\s*(.+)$/i);let expression=clean,name=null;if(clean.includes('=')){if(!assignment)throw Error('Use name = expression');name=assignment[1].toLowerCase();if(!validVariable(name))throw Error('This variable name is reserved or invalid');expression=assignment[2]}const value=evaluate(expression,mode,previous,vars);if(name)vars[name]=value;previous=value;return {line:index+1,name,value}}catch(e){return {line:index+1,error:e.message}}}",""))}),"function notebookEvaluate(text,mode=angle){if(text.length>30000)throw Error('Notebook supports at most 30,000 characters');const lines=text.split(/\\r?\\n/);if(lines.length>200)throw Error('Use at most 200 lines');const vars=Object.create(null);let previous=ans;return lines.map((line,index)=>{const clean=line.split('#')[0].trim();if(!clean)return {line:index+1,empty:true};try{const assignment=clean.match(/^([a-z_][a-z0-9_]*)\\s*=\\s*(.+)$/i);let expression=clean,name=null;if(clean.includes('=')){if(!assignment)throw Error('Use name = expression');name=assignment[1].toLowerCase();if(!validVariable(name))throw Error('This variable name is reserved or invalid');expression=assignment[2]}const value=evaluate(expression,mode,previous,vars);if(name)vars[name]=value;previous=value;return {line:index+1,name,value}}catch(e){return {line:index+1,error:e.message}}})}","notebookEvaluate");

__studio33.solveEquation = __studio33.$fn((function solveEquation(kind,v){const [a,b,c,d,e,f]=v;if(!v.every(Number.isFinite))throw Error('Coefficients must be finite');if(kind==='linear'||(kind==='quadratic'&&a===0)){const aa=kind==='linear'?a:b,bb=kind==='linear'?b:c;if(aa===0)return {items:[['Solution',bb===0?'Every real x':'No solution']],steps:[aa+'x + '+bb+' = 0',bb===0?'The equation is an identity.':'The nonzero constant cannot equal zero.']};return {items:[['x',__studio33.finite(-bb/aa)]],steps:[aa+'x + '+bb+' = 0','x = −b / a = '+__studio33.fmt(-bb/aa)]}}
 if(kind==='quadratic'){const scale=Math.max(Math.abs(a),Math.abs(b),Math.abs(c)),aa=a/scale,bb=b/scale,cc=c/scale;let disc=bb*bb-4*aa*cc;const tolerance=Number.EPSILON*8*(Math.abs(bb*bb)+Math.abs(4*aa*cc));if(Math.abs(disc)<=tolerance)disc=0;const steps=['Discriminant Δ = b² − 4ac (coefficients scaled to reduce overflow).','Scaled Δ = '+__studio33.fmt(disc)];if(disc<0){const real=__studio33.finite(-bb/(2*aa)),imag=__studio33.finite(Math.sqrt(-disc)/(2*Math.abs(aa)));return {items:[['x₁',__studio33.fmt(real)+' + '+__studio33.fmt(imag)+'i'],['x₂',__studio33.fmt(real)+' − '+__studio33.fmt(imag)+'i']],steps:[...steps,'Δ < 0: roots are a complex conjugate pair.']}}if(disc===0){const x=__studio33.finite(-bb/(2*aa));return {items:[['Repeated root x',x]],steps:[...steps,'x = −b / (2a) = '+__studio33.fmt(x)]}}const q=-.5*(bb+(bb>=0?1:-1)*Math.sqrt(disc)),x1=__studio33.finite(q/aa),x2=__studio33.finite(cc/q);return {items:[['x₁',x1],['x₂',x2]],steps:[...steps,'Use q = −½(b + sign(b)√Δ), then x₁ = q/a and x₂ = c/q.','Stable evaluation of the quadratic formula.']}}
 // Row scaling makes determinant comparison independent of coefficient size.
 const s1=Math.max(Math.abs(a),Math.abs(b),Math.abs(c))||1,s2=Math.max(Math.abs(d),Math.abs(e),Math.abs(f))||1;
 const aa=a/s1,bb=b/s1,cc=c/s1,dd=d/s2,ee=e/s2,ff=f/s2,det=aa*ee-bb*dd;
 const tol=Number.EPSILON*16*(Math.abs(aa*ee)+Math.abs(bb*dd));
 if(Math.abs(det)<=tol){const inconsistent=(aa===0&&bb===0&&cc!==0)||(dd===0&&ee===0&&ff!==0)||Math.abs(aa*ff-cc*dd)>Number.EPSILON*32*(Math.abs(aa*ff)+Math.abs(cc*dd))||Math.abs(bb*ff-cc*ee)>Number.EPSILON*32*(Math.abs(bb*ff)+Math.abs(cc*ee));return {items:[['Solution',inconsistent?'No solution':'Infinitely many solutions']],steps:['The coefficient determinant is zero within floating point tolerance.',inconsistent?'The equations are inconsistent.':'The equations are dependent.']}}
 const x=__studio33.finite((cc*ee-bb*ff)/det),y=__studio33.finite((aa*ff-cc*dd)/det);return {items:[['x',x],['y',y]],steps:['D = ae − bd after row scaling = '+__studio33.fmt(det),'x = (ce − bf) / D = '+__studio33.fmt(x),'y = (af − cd) / D = '+__studio33.fmt(y)]};
}),"function solveEquation(kind,v){const [a,b,c,d,e,f]=v;if(!v.every(Number.isFinite))throw Error('Coefficients must be finite');if(kind==='linear'||(kind==='quadratic'&&a===0)){const aa=kind==='linear'?a:b,bb=kind==='linear'?b:c;if(aa===0)return {items:[['Solution',bb===0?'Every real x':'No solution']],steps:[aa+'x + '+bb+' = 0',bb===0?'The equation is an identity.':'The nonzero constant cannot equal zero.']};return {items:[['x',finite(-bb/aa)]],steps:[aa+'x + '+bb+' = 0','x = −b / a = '+fmt(-bb/aa)]}}\n if(kind==='quadratic'){const scale=Math.max(Math.abs(a),Math.abs(b),Math.abs(c)),aa=a/scale,bb=b/scale,cc=c/scale;let disc=bb*bb-4*aa*cc;const tolerance=Number.EPSILON*8*(Math.abs(bb*bb)+Math.abs(4*aa*cc));if(Math.abs(disc)<=tolerance)disc=0;const steps=['Discriminant Δ = b² − 4ac (coefficients scaled to reduce overflow).','Scaled Δ = '+fmt(disc)];if(disc<0){const real=finite(-bb/(2*aa)),imag=finite(Math.sqrt(-disc)/(2*Math.abs(aa)));return {items:[['x₁',fmt(real)+' + '+fmt(imag)+'i'],['x₂',fmt(real)+' − '+fmt(imag)+'i']],steps:[...steps,'Δ < 0: roots are a complex conjugate pair.']}}if(disc===0){const x=finite(-bb/(2*aa));return {items:[['Repeated root x',x]],steps:[...steps,'x = −b / (2a) = '+fmt(x)]}}const q=-.5*(bb+(bb>=0?1:-1)*Math.sqrt(disc)),x1=finite(q/aa),x2=finite(cc/q);return {items:[['x₁',x1],['x₂',x2]],steps:[...steps,'Use q = −½(b + sign(b)√Δ), then x₁ = q/a and x₂ = c/q.','Stable evaluation of the quadratic formula.']}}\n // Row scaling makes determinant comparison independent of coefficient size.\n const s1=Math.max(Math.abs(a),Math.abs(b),Math.abs(c))||1,s2=Math.max(Math.abs(d),Math.abs(e),Math.abs(f))||1;\n const aa=a/s1,bb=b/s1,cc=c/s1,dd=d/s2,ee=e/s2,ff=f/s2,det=aa*ee-bb*dd;\n const tol=Number.EPSILON*16*(Math.abs(aa*ee)+Math.abs(bb*dd));\n if(Math.abs(det)<=tol){const inconsistent=(aa===0&&bb===0&&cc!==0)||(dd===0&&ee===0&&ff!==0)||Math.abs(aa*ff-cc*dd)>Number.EPSILON*32*(Math.abs(aa*ff)+Math.abs(cc*dd))||Math.abs(bb*ff-cc*ee)>Number.EPSILON*32*(Math.abs(bb*ff)+Math.abs(cc*ee));return {items:[['Solution',inconsistent?'No solution':'Infinitely many solutions']],steps:['The coefficient determinant is zero within floating point tolerance.',inconsistent?'The equations are inconsistent.':'The equations are dependent.']}}\n const x=finite((cc*ee-bb*ff)/det),y=finite((aa*ff-cc*dd)/det);return {items:[['x',x],['y',y]],steps:['D = ae − bd after row scaling = '+fmt(det),'x = (ce − bf) / D = '+fmt(x),'y = (af − cd) / D = '+fmt(y)]};\n}","solveEquation");

__studio33.parseDate = (function parseDate(text){if(!/^\d{4}-\d{2}-\d{2}$/.test(text)||text.slice(0,4)==='0000')throw Error('Enter valid dates from year 0001 to 9999');const date=new Date(text+'T00:00:00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==text)throw Error('Enter a valid calendar date');return date});

__studio33.dateText = (function dateText(date){return date.toISOString().slice(0,10)});

__studio33.addMonthsClamped = (function addMonthsClamped(date,count){const target=new Date(date);target.setUTCDate(1);target.setUTCMonth(target.getUTCMonth()+count);const last=new Date(target);last.setUTCMonth(last.getUTCMonth()+1);last.setUTCDate(0);target.setUTCDate(Math.min(date.getUTCDate(),last.getUTCDate()));return target});

__studio33.calendarInterval = __studio33.$fn((function calendarInterval(start,end){let a=start,b=end;if(a>b)[a,b]=[b,a];let months=(b.getUTCFullYear()-a.getUTCFullYear())*12+b.getUTCMonth()-a.getUTCMonth();if(__studio33.addMonthsClamped(a,months)>b)months--;return {years:Math.floor(months/12),months:months%12,days:Math.round((b-__studio33.addMonthsClamped(a,months))/__studio33.dayMs),totalDays:Math.round((end-start)/__studio33.dayMs)}}),"function calendarInterval(start,end){let a=start,b=end;if(a>b)[a,b]=[b,a];let months=(b.getUTCFullYear()-a.getUTCFullYear())*12+b.getUTCMonth()-a.getUTCMonth();if(addMonthsClamped(a,months)>b)months--;return {years:Math.floor(months/12),months:months%12,days:Math.round((b-addMonthsClamped(a,months))/dayMs),totalDays:Math.round((end-start)/dayMs)}}","calendarInterval");

__studio33.workingDays = __studio33.$fn((function workingDays(start,end,weekends,holidays){if(end<start)throw Error('End date must be on or after start date');const days=Math.round((end-start)/__studio33.dayMs)+1;if(days>366000)throw Error('Working-day range supports at most 1,000 years');const excluded=new Set(weekends);let count=Math.floor(days/7)*(7-excluded.size);const remainder=days%7,first=start.getUTCDay();for(let i=0;i<remainder;i++)if(!excluded.has((first+i)%7))count++;const unique=new Set(holidays.map(__studio33.$fn(x=>__studio33.dateText(__studio33.parseDate(x)),"x=>dateText(parseDate(x))","")));let excludedHolidays=0;for(const text of unique){const date=__studio33.parseDate(text);if(date>=start&&date<=end&&!excluded.has(date.getUTCDay())){count--;excludedHolidays++}}return {count,days,excludedHolidays}}),"function workingDays(start,end,weekends,holidays){if(end<start)throw Error('End date must be on or after start date');const days=Math.round((end-start)/dayMs)+1;if(days>366000)throw Error('Working-day range supports at most 1,000 years');const excluded=new Set(weekends);let count=Math.floor(days/7)*(7-excluded.size);const remainder=days%7,first=start.getUTCDay();for(let i=0;i<remainder;i++)if(!excluded.has((first+i)%7))count++;const unique=new Set(holidays.map(x=>dateText(parseDate(x))));let excludedHolidays=0;for(const text of unique){const date=parseDate(text);if(date>=start&&date<=end&&!excluded.has(date.getUTCDay())){count--;excludedHolidays++}}return {count,days,excludedHolidays}}","workingDays");

__studio33.parseDuration = (function parseDuration(text){const match=text.trim().match(/^([+-]?)(\d{1,9}):([0-5]\d)(?::([0-5]\d))?$/);if(!match)throw Error('Use H:MM or H:MM:SS (minutes and seconds 00–59)');return (match[1]==='-'?-1:1)*(Number(match[2])*3600+Number(match[3])*60+Number(match[4]||0))});

__studio33.durationText = (function durationText(seconds){const sign=seconds<0?'-':'',value=Math.abs(seconds),h=Math.floor(value/3600),m=Math.floor(value%3600/60),s=value%60;return sign+h+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')});

__studio33.todayText = (function todayText(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')});

__studio33.selectField = (function selectField(label,id,options){const wrap=document.createElement('label');wrap.className='field';const span=document.createElement('span');span.textContent=label;const select=document.createElement('select');select.id=id;for(const [value,text]of options){const o=document.createElement('option');o.value=value;o.textContent=text;select.append(o)}wrap.append(span,select);return wrap});

__studio33.loanSchedule = __studio33.$fn((function loanSchedule(principal,annualRate,months){if(!Number.isFinite(principal)||principal<=0||!Number.isFinite(annualRate)||annualRate<0||!Number.isInteger(months)||months<1||months>1200)throw Error('Use principal > 0, interest ≥ 0, and 1–1200 whole months');const r=annualRate/1200,emi=__studio33.finite(r===0?principal/months:principal*r/(-Math.expm1(-months*Math.log1p(r))));let balance=principal,totalInterest=0,totalPaid=0;const rows=[];for(let m=1;m<=months;m++){const interest=__studio33.finite(balance*r),payment=m===months?__studio33.finite(balance+interest):emi,capital=Math.min(balance,payment-interest);balance=Math.max(0,balance-capital);totalInterest=__studio33.finite(totalInterest+interest);totalPaid=__studio33.finite(totalPaid+payment);rows.push({month:m,payment,interest,principal:capital,balance})}return {emi,interest:totalInterest,total:totalPaid,rows}}),"function loanSchedule(principal,annualRate,months){if(!Number.isFinite(principal)||principal<=0||!Number.isFinite(annualRate)||annualRate<0||!Number.isInteger(months)||months<1||months>1200)throw Error('Use principal > 0, interest ≥ 0, and 1–1200 whole months');const r=annualRate/1200,emi=finite(r===0?principal/months:principal*r/(-Math.expm1(-months*Math.log1p(r))));let balance=principal,totalInterest=0,totalPaid=0;const rows=[];for(let m=1;m<=months;m++){const interest=finite(balance*r),payment=m===months?finite(balance+interest):emi,capital=Math.min(balance,payment-interest);balance=Math.max(0,balance-capital);totalInterest=finite(totalInterest+interest);totalPaid=finite(totalPaid+payment);rows.push({month:m,payment,interest,principal:capital,balance})}return {emi,interest:totalInterest,total:totalPaid,rows}}","loanSchedule");

__studio33.parseBaseInteger = (function parseBaseInteger(text,base){let s=text.trim().replace(/_/g,'');if(!s||s.length>200)throw Error('Enter an unsigned integer');const prefix={2:/^0b/i,8:/^0o/i,16:/^0x/i};if(prefix[base])s=s.replace(prefix[base],'');const valid={2:/^[01]+$/,8:/^[0-7]+$/,10:/^\d+$/,16:/^[0-9a-f]+$/i};if(!valid[base]?.test(s))throw Error('Input has digits outside the selected base');return BigInt(({2:'0b',8:'0o',10:'',16:'0x'})[base]+s)});

__studio33.programmerCompute = __studio33.$fn((function programmerCompute(aText,bText,base,width,op){const mask=(1n<<BigInt(width))-1n,a=__studio33.parseBaseInteger(aText,base);if(a>mask)throw Error('A exceeds the selected word size');let b=0n,v=a;if(!['identity','not'].includes(op)){b=__studio33.parseBaseInteger(bText,['shl','shr'].includes(op)?10:base);if(['shl','shr'].includes(op)){if(b>=BigInt(width))throw Error('Shift count must be smaller than the word size')}else if(b>mask)throw Error('B exceeds the selected word size')}
 switch(op){case'and':v=a&b;break;case'or':v=a|b;break;case'xor':v=a^b;break;case'not':v=~a;break;case'shl':v=a<<b;break;case'shr':v=a>>b;break;case'add':v=a+b;break;case'sub':v=a-b;break;case'mul':v=a*b;break;case'div':if(b===0n)throw Error('Cannot divide by zero');v=a/b;break;case'mod':if(b===0n)throw Error('Cannot take remainder with zero');v=a%b;break}return v&mask}),"function programmerCompute(aText,bText,base,width,op){const mask=(1n<<BigInt(width))-1n,a=parseBaseInteger(aText,base);if(a>mask)throw Error('A exceeds the selected word size');let b=0n,v=a;if(!['identity','not'].includes(op)){b=parseBaseInteger(bText,['shl','shr'].includes(op)?10:base);if(['shl','shr'].includes(op)){if(b>=BigInt(width))throw Error('Shift count must be smaller than the word size')}else if(b>mask)throw Error('B exceeds the selected word size')}\n switch(op){case'and':v=a&b;break;case'or':v=a|b;break;case'xor':v=a^b;break;case'not':v=~a;break;case'shl':v=a<<b;break;case'shr':v=a>>b;break;case'add':v=a+b;break;case'sub':v=a-b;break;case'mul':v=a*b;break;case'div':if(b===0n)throw Error('Cannot divide by zero');v=a/b;break;case'mod':if(b===0n)throw Error('Cannot take remainder with zero');v=a%b;break}return v&mask}","programmerCompute");

__studio33.normalizeFormula = __studio33.$fn((function normalizeFormula(item){if(!item||typeof item.name!=='string'||!item.name.trim()||item.name.length>80||typeof item.expression!=='string'||!item.expression.trim()||item.expression.length>2000||!Array.isArray(item.variables)||item.variables.length>20)throw Error('Invalid formula file');const names=item.variables.map(x=>typeof x==='string'?x.toLowerCase().trim():'');if(names.some(__studio33.$fn(x=>!__studio33.validVariable(x),"x=>!validVariable(x)",""))||new Set(names).size!==names.length)throw Error('Formula input names must be unique and valid');const values=Object.create(null);for(const name of names){const v=item.values?.[name];values[name]=typeof v==='string'&&v.length<=100?v:'1'}return {id:typeof item.id==='string'&&/^[a-z0-9_-]{1,80}$/i.test(item.id)?item.id:'f-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),name:item.name.trim(),variables:names,expression:item.expression,values}}),"function normalizeFormula(item){if(!item||typeof item.name!=='string'||!item.name.trim()||item.name.length>80||typeof item.expression!=='string'||!item.expression.trim()||item.expression.length>2000||!Array.isArray(item.variables)||item.variables.length>20)throw Error('Invalid formula file');const names=item.variables.map(x=>typeof x==='string'?x.toLowerCase().trim():'');if(names.some(x=>!validVariable(x))||new Set(names).size!==names.length)throw Error('Formula input names must be unique and valid');const values=Object.create(null);for(const name of names){const v=item.values?.[name];values[name]=typeof v==='string'&&v.length<=100?v:'1'}return {id:typeof item.id==='string'&&/^[a-z0-9_-]{1,80}$/i.test(item.id)?item.id:'f-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),name:item.name.trim(),variables:names,expression:item.expression,values}}","normalizeFormula");

__studio33.readFormulaValues = (function readFormulaValues(){const values=Object.create(null);document.querySelectorAll('[data-formula-variable]').forEach(el=>values[el.dataset.formulaVariable]=el.value);return values});

__studio33.normalizeFormat = (function normalizeFormat(value){const input=value&&typeof value==='object'?value:{};return {mode:['auto','fixed','scientific'].includes(input.mode)?input.mode:'auto',digits:Number.isInteger(input.digits)&&input.digits>= (input.mode==='fixed'?0:1)&&input.digits<= (input.mode==='fixed'?12:15)?input.digits:input.mode==='fixed'?2:14,grouping:['none','western','indian'].includes(input.grouping)?input.grouping:'none'}});

__studio33.formatNumber = __studio33.$fn((function formatNumber(n){if(!Number.isFinite(n))return String(n);if(Object.is(n,-0))n=0;const f=__studio33.formatting;if(f.mode==='scientific')return n.toExponential(f.digits-1);const locale=f.grouping==='indian'?'en-IN':'en-US';if(f.mode==='fixed'){const text=n.toLocaleString(locale,{minimumFractionDigits:f.digits,maximumFractionDigits:f.digits,useGrouping:f.grouping!=='none'});return /^-0(?:\.0+)?$/.test(text)?text.slice(1):text;}if(f.grouping==='none')return Number(n.toPrecision(f.digits)).toString();return n.toLocaleString(locale,{maximumSignificantDigits:f.digits,useGrouping:true})}),"function formatNumber(n){if(!Number.isFinite(n))return String(n);if(Object.is(n,-0))n=0;const f=formatting;if(f.mode==='scientific')return n.toExponential(f.digits-1);const locale=f.grouping==='indian'?'en-IN':'en-US';if(f.mode==='fixed'){const text=n.toLocaleString(locale,{minimumFractionDigits:f.digits,maximumFractionDigits:f.digits,useGrouping:f.grouping!=='none'});return /^-0(?:\\.0+)?$/.test(text)?text.slice(1):text;}if(f.grouping==='none')return Number(n.toPrecision(f.digits)).toString();return n.toLocaleString(locale,{maximumSignificantDigits:f.digits,useGrouping:true})}","formatNumber");

__studio33.recordEdit = __studio33.$fn((function recordEdit(id){if(__studio33.editingReplay)return;const el=__studio33.$(id);if(!el)return;let stack=__studio33.editStacks.get(id);const entry={value:el.value,start:el.selectionStart??0,end:el.selectionEnd??0};if(!stack){__studio33.editStacks.set(id,{past:[entry],future:[]});return}if(stack.past.at(-1)?.value===entry.value)return;stack.past.push(entry);if(stack.past.length>100)stack.past.shift();stack.future=[];__studio33.updateUndoButtons()}),"function recordEdit(id){if(editingReplay)return;const el=$(id);if(!el)return;let stack=editStacks.get(id);const entry={value:el.value,start:el.selectionStart??0,end:el.selectionEnd??0};if(!stack){editStacks.set(id,{past:[entry],future:[]});return}if(stack.past.at(-1)?.value===entry.value)return;stack.past.push(entry);if(stack.past.length>100)stack.past.shift();stack.future=[];updateUndoButtons()}","recordEdit");

__studio33.resetEdits = __studio33.$fn((function resetEdits(id){__studio33.editStacks.delete(id);__studio33.recordEdit(id);__studio33.updateUndoButtons()}),"function resetEdits(id){editStacks.delete(id);recordEdit(id);updateUndoButtons()}","resetEdits");

__studio33.updateUndoButtons = __studio33.$fn((function updateUndoButtons(){const stack=__studio33.editStacks.get(__studio33.lastEditor);__studio33.$('undoEdit').disabled=!stack||stack.past.length<2;__studio33.$('redoEdit').disabled=!stack||!stack.future.length}),"function updateUndoButtons(){const stack=editStacks.get(lastEditor);$('undoEdit').disabled=!stack||stack.past.length<2;$('redoEdit').disabled=!stack||!stack.future.length}","updateUndoButtons");

__studio33.newId = (function newId(prefix='id'){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,9)});

__studio33.normalizeSession = (function normalizeSession(item){if(!item||typeof item.id!=='string'||!/^[a-z0-9_-]{1,80}$/i.test(item.id)||typeof item.name!=='string'||!item.name.trim()||item.name.length>80||typeof item.notebook!=='string'||item.notebook.length>30000||typeof item.expression!=='string'||item.expression.length>2000)throw Error('Invalid notebook session');return {id:item.id,name:item.name.trim(),notebook:item.notebook,expression:item.expression}});

__studio33.persistHistory = __studio33.$fn((function persistHistory(){__studio33.storage.set('advanced-calculator-history',__studio33.history)}),"function persistHistory(){storage.set('advanced-calculator-history',history)}","persistHistory");

__studio33.parseMeasure = __studio33.$fn((function parseMeasure(text){let s=text.trim().toLowerCase().replace(/’|′/g,"'").replace(/”|″/g,'"').replace(/feet|foot/g,'ft').replace(/inches|inch/g,'in');if(!s||s.length>200)throw Error('Enter a length such as 12 ft 6 in');let sign=1;if(s.startsWith('-')){sign=-1;s=s.slice(1).trim()}else if(s.startsWith('+'))s=s.slice(1).trim();s=s.replace(/'/g,' ft ').replace(/"/g,' in ');const number='(?:\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|(?:\\d+(?:\\.\\d*)?|\\.\\d+))',pattern=new RegExp('('+number+')\\s*(ft|in|cm|mm|m)\\b','g');let total=0,matched=false,end=0;for(const match of s.matchAll(pattern)){if(s.slice(end,match.index).trim())throw Error('Invalid length format');const token=match[1].trim();let value;if(token.includes('/')){const pieces=token.split(/\s+/),fraction=pieces.at(-1).split('/').map(Number);if(fraction[1]===0)throw Error('Fraction denominator cannot be zero');value=(pieces.length===2?Number(pieces[0]):0)+fraction[0]/fraction[1]}else value=Number(token);const factors={ft:.3048,in:.0254,m:1,cm:.01,mm:.001};total=__studio33.finite(total+value*factors[match[2]]);matched=true;end=match.index+match[0].length}if(!matched){if(!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))throw Error('Use explicit units for fractional measurements');total=Number(s)*.3048}else if(s.slice(end).trim())throw Error('Invalid length format');return sign*__studio33.finite(total)}),"function parseMeasure(text){let s=text.trim().toLowerCase().replace(/’|′/g,\"'\").replace(/”|″/g,'\"').replace(/feet|foot/g,'ft').replace(/inches|inch/g,'in');if(!s||s.length>200)throw Error('Enter a length such as 12 ft 6 in');let sign=1;if(s.startsWith('-')){sign=-1;s=s.slice(1).trim()}else if(s.startsWith('+'))s=s.slice(1).trim();s=s.replace(/'/g,' ft ').replace(/\"/g,' in ');const number='(?:\\\\d+\\\\s+\\\\d+\\\\/\\\\d+|\\\\d+\\\\/\\\\d+|(?:\\\\d+(?:\\\\.\\\\d*)?|\\\\.\\\\d+))',pattern=new RegExp('('+number+')\\\\s*(ft|in|cm|mm|m)\\\\b','g');let total=0,matched=false,end=0;for(const match of s.matchAll(pattern)){if(s.slice(end,match.index).trim())throw Error('Invalid length format');const token=match[1].trim();let value;if(token.includes('/')){const pieces=token.split(/\\s+/),fraction=pieces.at(-1).split('/').map(Number);if(fraction[1]===0)throw Error('Fraction denominator cannot be zero');value=(pieces.length===2?Number(pieces[0]):0)+fraction[0]/fraction[1]}else value=Number(token);const factors={ft:.3048,in:.0254,m:1,cm:.01,mm:.001};total=finite(total+value*factors[match[2]]);matched=true;end=match.index+match[0].length}if(!matched){if(!/^(?:\\d+(?:\\.\\d*)?|\\.\\d+)$/.test(s))throw Error('Use explicit units for fractional measurements');total=Number(s)*.3048}else if(s.slice(end).trim())throw Error('Invalid length format');return sign*finite(total)}","parseMeasure");

__studio33.feetInches = __studio33.$fn((function feetInches(metres){const sign=metres<0?'-':'',inches=Math.abs(metres)/.0254;let feet=Math.floor(inches/12),remaining=Number((inches-feet*12).toFixed(6));if(remaining>=12){feet++;remaining=0}return sign+feet+' ft '+__studio33.fmt(remaining)+' in'}),"function feetInches(metres){const sign=metres<0?'-':'',inches=Math.abs(metres)/.0254;let feet=Math.floor(inches/12),remaining=Number((inches-feet*12).toFixed(6));if(remaining>=12){feet++;remaining=0}return sign+feet+' ft '+fmt(remaining)+' in'}","feetInches");

__studio33.parseMatrix = __studio33.$fn((function parseMatrix(text){if(text.length>5000)throw Error('Matrix input is too long');const rows=text.trim().split(/\r?\n|;/).map(x=>x.trim()).filter(Boolean).map(__studio33.$fn(row=>row.split(/[\s,]+/).map(__studio33.$fn(x=>{if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(x))throw Error('Use decimal or scientific numeric entries');return __studio33.finite(Number(x))},"x=>{if(!/^[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?$/.test(x))throw Error('Use decimal or scientific numeric entries');return finite(Number(x))}","")),"row=>row.split(/[\\s,]+/).map(x=>{if(!/^[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?$/.test(x))throw Error('Use decimal or scientific numeric entries');return finite(Number(x))})",""));if(!rows.length||rows.length>8||!rows[0].length||rows[0].length>8||rows.some(row=>row.length!==rows[0].length))throw Error('Use a rectangular matrix of 1–8 rows and columns');return rows}),"function parseMatrix(text){if(text.length>5000)throw Error('Matrix input is too long');const rows=text.trim().split(/\\r?\\n|;/).map(x=>x.trim()).filter(Boolean).map(row=>row.split(/[\\s,]+/).map(x=>{if(!/^[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?$/.test(x))throw Error('Use decimal or scientific numeric entries');return finite(Number(x))}));if(!rows.length||rows.length>8||!rows[0].length||rows[0].length>8||rows.some(row=>row.length!==rows[0].length))throw Error('Use a rectangular matrix of 1–8 rows and columns');return rows}","parseMatrix");

__studio33.matrixDeterminant = __studio33.$fn((function matrixDeterminant(a){if(a.length!==a[0].length)throw Error('A must be square');const n=a.length,m=a.map(row=>[...row]),scale=Math.max(...m.flat().map(Math.abs));if(scale===0)return 0;let det=1;for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(m[r][c])>Math.abs(m[p][c]))p=r;if(m[p][c]===0)return 0;if(p!==c){[m[p],m[c]]=[m[c],m[p]];det=-det}const pivot=m[c][c];det=__studio33.finite(det*pivot);for(let r=c+1;r<n;r++){const ratio=m[r][c]/pivot;for(let j=c+1;j<n;j++)m[r][j]=__studio33.finite(m[r][j]-ratio*m[c][j])}}return det}),"function matrixDeterminant(a){if(a.length!==a[0].length)throw Error('A must be square');const n=a.length,m=a.map(row=>[...row]),scale=Math.max(...m.flat().map(Math.abs));if(scale===0)return 0;let det=1;for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(m[r][c])>Math.abs(m[p][c]))p=r;if(m[p][c]===0)return 0;if(p!==c){[m[p],m[c]]=[m[c],m[p]];det=-det}const pivot=m[c][c];det=finite(det*pivot);for(let r=c+1;r<n;r++){const ratio=m[r][c]/pivot;for(let j=c+1;j<n;j++)m[r][j]=finite(m[r][j]-ratio*m[c][j])}}return det}","matrixDeterminant");

__studio33.matrixInverse = __studio33.$fn((function matrixInverse(a){if(a.length!==a[0].length)throw Error('A must be square');const n=a.length,scale=Math.max(...a.flat().map(Math.abs));if(scale===0)throw Error('Matrix is singular');const m=a.map((row,i)=>[...row,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(m[r][c])>Math.abs(m[p][c]))p=r;if(Math.abs(m[p][c])<=Number.EPSILON*32*scale)throw Error('Matrix is singular or too ill-conditioned to invert reliably');[m[c],m[p]]=[m[p],m[c]];const pivot=m[c][c];for(let j=0;j<2*n;j++)m[c][j]=__studio33.finite(m[c][j]/pivot);for(let r=0;r<n;r++)if(r!==c){const ratio=m[r][c];for(let j=0;j<2*n;j++)m[r][j]=__studio33.finite(m[r][j]-ratio*m[c][j])}}return m.map(row=>row.slice(n))}),"function matrixInverse(a){if(a.length!==a[0].length)throw Error('A must be square');const n=a.length,scale=Math.max(...a.flat().map(Math.abs));if(scale===0)throw Error('Matrix is singular');const m=a.map((row,i)=>[...row,...Array.from({length:n},(_,j)=>i===j?1:0)]);for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(m[r][c])>Math.abs(m[p][c]))p=r;if(Math.abs(m[p][c])<=Number.EPSILON*32*scale)throw Error('Matrix is singular or too ill-conditioned to invert reliably');[m[c],m[p]]=[m[p],m[c]];const pivot=m[c][c];for(let j=0;j<2*n;j++)m[c][j]=finite(m[c][j]/pivot);for(let r=0;r<n;r++)if(r!==c){const ratio=m[r][c];for(let j=0;j<2*n;j++)m[r][j]=finite(m[r][j]-ratio*m[c][j])}}return m.map(row=>row.slice(n))}","matrixInverse");

__studio33.derivativeEstimate = __studio33.$fn((function derivativeEstimate(expression,x,mode='RAD'){const f=__studio33.$fn(value=>__studio33.evaluate(expression,mode,__studio33.ans,{x:value}),"value=>evaluate(expression,mode,ans,{x:value})","f");let h=Math.cbrt(Number.EPSILON)*Math.max(1,Math.abs(x));if(x+h===x||x-h===x)throw Error('Point is outside reliable numerical resolution');const coarse=__studio33.finite((f(x+h)-f(x-h))/(2*h)),fine=__studio33.finite((f(x+h/2)-f(x-h/2))/h),value=__studio33.finite(fine+(fine-coarse)/3),left=__studio33.finite((f(x)-f(x-h/2))/(h/2)),right=__studio33.finite((f(x+h/2)-f(x))/(h/2));if(Math.abs(left-right)>1e-3*Math.max(1,Math.abs(value)))throw Error('Derivative may not exist or the function varies too rapidly near this point');return {value,error:Math.abs(fine-coarse)/3}}),"function derivativeEstimate(expression,x,mode='RAD'){const f=value=>evaluate(expression,mode,ans,{x:value});let h=Math.cbrt(Number.EPSILON)*Math.max(1,Math.abs(x));if(x+h===x||x-h===x)throw Error('Point is outside reliable numerical resolution');const coarse=finite((f(x+h)-f(x-h))/(2*h)),fine=finite((f(x+h/2)-f(x-h/2))/h),value=finite(fine+(fine-coarse)/3),left=finite((f(x)-f(x-h/2))/(h/2)),right=finite((f(x+h/2)-f(x))/(h/2));if(Math.abs(left-right)>1e-3*Math.max(1,Math.abs(value)))throw Error('Derivative may not exist or the function varies too rapidly near this point');return {value,error:Math.abs(fine-coarse)/3}}","derivativeEstimate");

__studio33.integralEstimate = __studio33.$fn((function integralEstimate(expression,start,end,mode='RAD'){if(!Number.isFinite(start)||!Number.isFinite(end))throw Error('Bounds must be finite');if(start===end)return {value:0,error:0,evaluations:0};let sign=1,a=start,b=end;if(a>b){[a,b]=[b,a];sign=-1}if(!Number.isFinite(b-a))throw Error('Interval is too large');let evaluations=0;const f=__studio33.$fn(x=>{if(++evaluations>20000)throw Error('Integral needs too many samples; narrow the interval');return __studio33.evaluate(expression,mode,__studio33.ans,{x})},"x=>{if(++evaluations>20000)throw Error('Integral needs too many samples; narrow the interval');return evaluate(expression,mode,ans,{x})}","f");const fa=f(a),fb=f(b),m=(a+b)/2,fm=f(m),whole=__studio33.finite((b-a)*(fa+4*fm+fb)/6),tolerance=1e-8*Math.max(1,Math.abs(whole));let totalError=0;
 function refine(a,b,fa,fm,fb,whole,tol,depth){const m=a+(b-a)/2,l=a+(m-a)/2,r=m+(b-m)/2;if(l===a||r===b)throw Error('Interval is too small for reliable refinement');const fl=f(l),fr=f(r),left=__studio33.finite((m-a)*(fa+4*fl+fm)/6),right=__studio33.finite((b-m)*(fm+4*fr+fb)/6),delta=__studio33.finite(left+right-whole);if(Math.abs(delta)<=15*tol){totalError+=Math.abs(delta)/15;return __studio33.finite(left+right+delta/15)}if(depth<=0)throw Error('Integral did not converge; check for a singularity or rapid oscillation');return __studio33.finite(refine(a,m,fa,fl,fm,left,tol/2,depth-1)+refine(m,b,fm,fr,fb,right,tol/2,depth-1))}
 const result=refine(a,b,fa,fm,fb,whole,tolerance,16);return {value:__studio33.finite(sign*result),error:totalError,evaluations}}),"function integralEstimate(expression,start,end,mode='RAD'){if(!Number.isFinite(start)||!Number.isFinite(end))throw Error('Bounds must be finite');if(start===end)return {value:0,error:0,evaluations:0};let sign=1,a=start,b=end;if(a>b){[a,b]=[b,a];sign=-1}if(!Number.isFinite(b-a))throw Error('Interval is too large');let evaluations=0;const f=x=>{if(++evaluations>20000)throw Error('Integral needs too many samples; narrow the interval');return evaluate(expression,mode,ans,{x})};const fa=f(a),fb=f(b),m=(a+b)/2,fm=f(m),whole=finite((b-a)*(fa+4*fm+fb)/6),tolerance=1e-8*Math.max(1,Math.abs(whole));let totalError=0;\n function refine(a,b,fa,fm,fb,whole,tol,depth){const m=a+(b-a)/2,l=a+(m-a)/2,r=m+(b-m)/2;if(l===a||r===b)throw Error('Interval is too small for reliable refinement');const fl=f(l),fr=f(r),left=finite((m-a)*(fa+4*fl+fm)/6),right=finite((b-m)*(fm+4*fr+fb)/6),delta=finite(left+right-whole);if(Math.abs(delta)<=15*tol){totalError+=Math.abs(delta)/15;return finite(left+right+delta/15)}if(depth<=0)throw Error('Integral did not converge; check for a singularity or rapid oscillation');return finite(refine(a,m,fa,fl,fm,left,tol/2,depth-1)+refine(m,b,fm,fr,fb,right,tol/2,depth-1))}\n const result=refine(a,b,fa,fm,fb,whole,tolerance,16);return {value:finite(sign*result),error:totalError,evaluations}}","integralEstimate");

__studio33.normalizePreset = __studio33.$fn((function normalizePreset(item){if(!item||typeof item.name!=='string'||!item.name.trim()||item.name.length>80||!['pair','custom'].includes(item.type))throw Error('Invalid conversion preset');const id=typeof item.id==='string'&&/^[a-z0-9_-]{1,80}$/i.test(item.id)?item.id:__studio33.newId('preset');if(item.type==='custom'){if(typeof item.source!=='string'||!item.source.trim()||item.source.length>40||typeof item.target!=='string'||!item.target.trim()||item.target.length>40||!Number.isFinite(item.factor)||item.factor<=0)throw Error('Custom presets need unit names and a positive factor');return {id,name:item.name.trim(),type:'custom',source:item.source.trim(),target:item.target.trim(),factor:item.factor}}
 const category=item.category;if(category!=='currency'&&!Object.hasOwn(__studio33.unitGroups,category))throw Error('Preset refers to unknown units');const group=category==='currency'?__studio33.currencies:__studio33.unitGroups[category];if(!group||!Object.hasOwn(group,item.from)||!Object.hasOwn(group,item.to))throw Error('Preset refers to unknown units');return {id,name:item.name.trim(),type:'pair',category,from:item.from,to:item.to}}),"function normalizePreset(item){if(!item||typeof item.name!=='string'||!item.name.trim()||item.name.length>80||!['pair','custom'].includes(item.type))throw Error('Invalid conversion preset');const id=typeof item.id==='string'&&/^[a-z0-9_-]{1,80}$/i.test(item.id)?item.id:newId('preset');if(item.type==='custom'){if(typeof item.source!=='string'||!item.source.trim()||item.source.length>40||typeof item.target!=='string'||!item.target.trim()||item.target.length>40||!Number.isFinite(item.factor)||item.factor<=0)throw Error('Custom presets need unit names and a positive factor');return {id,name:item.name.trim(),type:'custom',source:item.source.trim(),target:item.target.trim(),factor:item.factor}}\n const category=item.category;if(category!=='currency'&&!Object.hasOwn(unitGroups,category))throw Error('Preset refers to unknown units');const group=category==='currency'?currencies:unitGroups[category];if(!group||!Object.hasOwn(group,item.from)||!Object.hasOwn(group,item.to))throw Error('Preset refers to unknown units');return {id,name:item.name.trim(),type:'pair',category,from:item.from,to:item.to}}","normalizePreset");

__studio33.persistRestoredState = __studio33.$fn((function persistRestoredState(state){const previous=new Map(__studio33.backupKeys.map(k=>[k,localStorage.getItem(k)]));try{for(const key of __studio33.backupKeys)localStorage.setItem(key,JSON.stringify(state[key]))}catch(e){let rollbackFailed=false;for(const [key,value]of previous){try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value)}catch{rollbackFailed=true}}throw Error(rollbackFailed?'Restore could not be saved. Current app state was kept, but saved data may be incomplete; export a backup before reloading.':'Restore could not be saved. Check browser storage space or permissions; current app state was kept.')}}),"function persistRestoredState(state){const previous=new Map(backupKeys.map(k=>[k,localStorage.getItem(k)]));try{for(const key of backupKeys)localStorage.setItem(key,JSON.stringify(state[key]))}catch(e){let rollbackFailed=false;for(const [key,value]of previous){try{if(value===null)localStorage.removeItem(key);else localStorage.setItem(key,value)}catch{rollbackFailed=true}}throw Error(rollbackFailed?'Restore could not be saved. Current app state was kept, but saved data may be incomplete; export a backup before reloading.':'Restore could not be saved. Check browser storage space or permissions; current app state was kept.')}}","persistRestoredState");

__studio33.readDeveloperFile = __studio33.$fn((async function readDeveloperFile(file){if(!file)throw Error('Choose a file');if(file.size>__studio33.developerLimit)throw Error('File must be at most 2 MiB');if(!/\.(txt|json)$/i.test(file.name||''))throw Error('Choose a .txt or .json file');const buffer=await file.arrayBuffer(),bytes=new Uint8Array(buffer);let encoding='utf-8';if(bytes[0]===255&&bytes[1]===254)encoding='utf-16le';else if(bytes[0]===254&&bytes[1]===255)encoding='utf-16be';let text;try{text=new TextDecoder(encoding,{fatal:true}).decode(bytes)}catch{throw Error('File is not valid UTF-8 or BOM-marked UTF-16 text')}if(text.length>__studio33.developerLimit)throw Error('Decoded text is too large');return text.replace(/^\uFEFF/,'')}),"async function readDeveloperFile(file){if(!file)throw Error('Choose a file');if(file.size>developerLimit)throw Error('File must be at most 2 MiB');if(!/\\.(txt|json)$/i.test(file.name||''))throw Error('Choose a .txt or .json file');const buffer=await file.arrayBuffer(),bytes=new Uint8Array(buffer);let encoding='utf-8';if(bytes[0]===255&&bytes[1]===254)encoding='utf-16le';else if(bytes[0]===254&&bytes[1]===255)encoding='utf-16be';let text;try{text=new TextDecoder(encoding,{fatal:true}).decode(bytes)}catch{throw Error('File is not valid UTF-8 or BOM-marked UTF-16 text')}if(text.length>developerLimit)throw Error('Decoded text is too large');return text.replace(/^\\uFEFF/,'')}","readDeveloperFile");

__studio33.compareDeveloperJSON = __studio33.$fn((function compareDeveloperJSON(leftText,rightText,numberText=false){const left=__studio33.parseDeveloperJSON(leftText),right=__studio33.parseDeveloperJSON(rightText);if(left.duplicates.length||right.duplicates.length)throw Error('Resolve duplicate keys before comparing: '+(left.duplicates.length?'original ':'updated ')+(left.duplicates[0]||right.duplicates[0]));const changes=[];let truncated=false;
 function change(type,path,before,after){if(changes.length>=5000){truncated=true;return}changes.push({type,path,...(before?{before}:{}),...(after?{after}:{})})}
 function walk(a,b,path){if(truncated)return;if(a.type!==b.type){change('changed',path,a,b);return}if(a.type==='object'){const ma=new Map(a.entries),mb=new Map(b.entries);for(const [key,value]of ma){const next=path+'/'+__studio33.jsonPointerSegment(key);if(!mb.has(key))change('removed',next,value,null);else walk(value,mb.get(key),next);if(truncated)return}for(const [key,value]of mb){if(!ma.has(key))change('added',path+'/'+__studio33.jsonPointerSegment(key),null,value);if(truncated)return}return}
 if(a.type==='array'){const max=Math.max(a.items.length,b.items.length);for(let i=0;i<max;i++){const next=path+'/'+i;if(i>=a.items.length)change('added',next,null,b.items[i]);else if(i>=b.items.length)change('removed',next,a.items[i],null);else walk(a.items[i],b.items[i],next);if(truncated)return}return}
 const equal=a.type==='number'?(numberText?a.raw===b.raw:__studio33.normalizedJSONNumber(a.raw)===__studio33.normalizedJSONNumber(b.raw)):a.value===b.value;if(!equal)change('changed',path,a,b)}
 walk(left.root,right.root,'');return {changes,truncated,leftNodes:left.nodes,rightNodes:right.nodes,numberText}}),"function compareDeveloperJSON(leftText,rightText,numberText=false){const left=parseDeveloperJSON(leftText),right=parseDeveloperJSON(rightText);if(left.duplicates.length||right.duplicates.length)throw Error('Resolve duplicate keys before comparing: '+(left.duplicates.length?'original ':'updated ')+(left.duplicates[0]||right.duplicates[0]));const changes=[];let truncated=false;\n function change(type,path,before,after){if(changes.length>=5000){truncated=true;return}changes.push({type,path,...(before?{before}:{}),...(after?{after}:{})})}\n function walk(a,b,path){if(truncated)return;if(a.type!==b.type){change('changed',path,a,b);return}if(a.type==='object'){const ma=new Map(a.entries),mb=new Map(b.entries);for(const [key,value]of ma){const next=path+'/'+jsonPointerSegment(key);if(!mb.has(key))change('removed',next,value,null);else walk(value,mb.get(key),next);if(truncated)return}for(const [key,value]of mb){if(!ma.has(key))change('added',path+'/'+jsonPointerSegment(key),null,value);if(truncated)return}return}\n if(a.type==='array'){const max=Math.max(a.items.length,b.items.length);for(let i=0;i<max;i++){const next=path+'/'+i;if(i>=a.items.length)change('added',next,null,b.items[i]);else if(i>=b.items.length)change('removed',next,a.items[i],null);else walk(a.items[i],b.items[i],next);if(truncated)return}return}\n const equal=a.type==='number'?(numberText?a.raw===b.raw:normalizedJSONNumber(a.raw)===normalizedJSONNumber(b.raw)):a.value===b.value;if(!equal)change('changed',path,a,b)}\n walk(left.root,right.root,'');return {changes,truncated,leftNodes:left.nodes,rightNodes:right.nodes,numberText}}","compareDeveloperJSON");

__studio33.jsonDiffReport = __studio33.$fn((function jsonDiffReport(result){return JSON.stringify({comparison:'JSON values; arrays by index',numberComparison:result.numberText?'Exact number tokens':'Exact decimal values',truncated:result.truncated,differences:result.changes.map(__studio33.$fn(row=>({type:row.type,path:row.path,...(row.before?{beforeJSON:__studio33.emitDeveloperJSON(row.before)}:{}),...(row.after?{afterJSON:__studio33.emitDeveloperJSON(row.after)}:{})}),"row=>({type:row.type,path:row.path,...(row.before?{beforeJSON:emitDeveloperJSON(row.before)}:{}),...(row.after?{afterJSON:emitDeveloperJSON(row.after)}:{})})",""))},null,2)}),"function jsonDiffReport(result){return JSON.stringify({comparison:'JSON values; arrays by index',numberComparison:result.numberText?'Exact number tokens':'Exact decimal values',truncated:result.truncated,differences:result.changes.map(row=>({type:row.type,path:row.path,...(row.before?{beforeJSON:emitDeveloperJSON(row.before)}:{}),...(row.after?{afterJSON:emitDeveloperJSON(row.after)}:{})}))},null,2)}","jsonDiffReport");

__studio33.newToolStatus = __studio33.$fn((function newToolStatus(id,message,error=false){__studio33.$(id).textContent=message;__studio33.$(id).dataset.error=String(error)}),"function newToolStatus(id,message,error=false){$(id).textContent=message;$(id).dataset.error=String(error)}","newToolStatus");

__studio33.assertUnicodeText = __studio33.$fn((function assertUnicodeText(text){if(text.length>__studio33.developerLimit)throw Error('Input supports at most 2,097,152 UTF-16 units');for(let i=0;i<text.length;i++){const c=text.charCodeAt(i);if(c>=0xD800&&c<=0xDBFF){const n=text.charCodeAt(++i);if(!(n>=0xDC00&&n<=0xDFFF))throw Error('Input contains an unpaired Unicode surrogate')}else if(c>=0xDC00&&c<=0xDFFF)throw Error('Input contains an unpaired Unicode surrogate')}}),"function assertUnicodeText(text){if(text.length>developerLimit)throw Error('Input supports at most 2,097,152 UTF-16 units');for(let i=0;i<text.length;i++){const c=text.charCodeAt(i);if(c>=0xD800&&c<=0xDBFF){const n=text.charCodeAt(++i);if(!(n>=0xDC00&&n<=0xDFFF))throw Error('Input contains an unpaired Unicode surrogate')}else if(c>=0xDC00&&c<=0xDFFF)throw Error('Input contains an unpaired Unicode surrogate')}}","assertUnicodeText");

__studio33.transformEncoding = __studio33.$fn((function transformEncoding(text,mode,decode=false){__studio33.assertUnicodeText(text);if(mode==='component'||mode==='uri'){return decode?(mode==='uri'?decodeURI(text):decodeURIComponent(text)):(mode==='uri'?encodeURI(text):encodeURIComponent(text))}if(!['base64','base64url'].includes(mode))throw Error('Choose an encoding mode');if(!decode){const bytes=new TextEncoder().encode(text);let binary='';for(let i=0;i<bytes.length;i+=16384)binary+=String.fromCharCode(...bytes.subarray(i,i+16384));const encoded=btoa(binary);return mode==='base64url'?encoded.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''):encoded}let encoded=text.replace(/[\t\n\r ]/g,'');if(mode==='base64url'){if(!/^[A-Za-z0-9_-]*={0,2}$/.test(encoded))throw Error('Invalid Base64URL alphabet');encoded=encoded.replace(/-/g,'+').replace(/_/g,'/')}else if(!/^[A-Za-z0-9+/]*={0,2}$/.test(encoded))throw Error('Invalid Base64 alphabet');const bare=encoded.replace(/=+$/,'');if(bare.length%4===1||(encoded.includes('=')&&encoded.length%4!==0))throw Error('Invalid Base64 padding or length');const padded=bare+'='.repeat((4-bare.length%4)%4);let binary;try{binary=atob(padded)}catch{throw Error('Invalid Base64 data')}if(btoa(binary).replace(/=+$/,'')!==bare)throw Error('Non-canonical Base64 data');try{return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(Uint8Array.from(binary,c=>c.charCodeAt(0)))}catch{throw Error('Decoded bytes are not valid UTF-8 text')}}),"function transformEncoding(text,mode,decode=false){assertUnicodeText(text);if(mode==='component'||mode==='uri'){return decode?(mode==='uri'?decodeURI(text):decodeURIComponent(text)):(mode==='uri'?encodeURI(text):encodeURIComponent(text))}if(!['base64','base64url'].includes(mode))throw Error('Choose an encoding mode');if(!decode){const bytes=new TextEncoder().encode(text);let binary='';for(let i=0;i<bytes.length;i+=16384)binary+=String.fromCharCode(...bytes.subarray(i,i+16384));const encoded=btoa(binary);return mode==='base64url'?encoded.replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=+$/,''):encoded}let encoded=text.replace(/[\\t\\n\\r ]/g,'');if(mode==='base64url'){if(!/^[A-Za-z0-9_-]*={0,2}$/.test(encoded))throw Error('Invalid Base64URL alphabet');encoded=encoded.replace(/-/g,'+').replace(/_/g,'/')}else if(!/^[A-Za-z0-9+/]*={0,2}$/.test(encoded))throw Error('Invalid Base64 alphabet');const bare=encoded.replace(/=+$/,'');if(bare.length%4===1||(encoded.includes('=')&&encoded.length%4!==0))throw Error('Invalid Base64 padding or length');const padded=bare+'='.repeat((4-bare.length%4)%4);let binary;try{binary=atob(padded)}catch{throw Error('Invalid Base64 data')}if(btoa(binary).replace(/=+$/,'')!==bare)throw Error('Non-canonical Base64 data');try{return new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(Uint8Array.from(binary,c=>c.charCodeAt(0)))}catch{throw Error('Decoded bytes are not valid UTF-8 text')}}","transformEncoding");

__studio33.regexWorkerJob = (function regexWorkerJob(job){const {pattern,flags,text,replacement,replace}=job;if(typeof pattern!=='string'||pattern.length>4000)throw Error('Pattern supports at most 4,000 units');if(typeof text!=='string'||text.length>200000)throw Error('Test text supports at most 200,000 units');if(typeof flags!=='string'||!/^[gimsuy]*$/.test(flags)||new Set(flags).size!==flags.length)throw Error('Use each supported flag g i m s u y at most once');if(typeof replacement!=='string'||replacement.length>10000)throw Error('Replacement supports at most 10,000 units');const re=new RegExp(pattern,flags),matches=[];let match,truncated=false;while((match=re.exec(text))!==null){if(matches.length>=500){truncated=true;break}matches.push({index:match.index,text:match[0],groups:Array.from(match).slice(1),named:match.groups?Object.fromEntries(Object.entries(match.groups)):null});if(!re.global)break;if(match[0]===''){const pos=re.lastIndex,c=text.codePointAt(pos);re.lastIndex=pos+((re.unicode&&c>0xFFFF)?2:1)}}let output=null;if(replace){let generated=text.length;output=text.replace(new RegExp(pattern,flags),(...args)=>{const named=typeof args.at(-1)==='object'?args.pop():undefined;args.pop();const offset=args.pop(),full=args[0],captures=args.slice(1);const expanded=replacement.replace(/\$([$&`']|[0-9]{1,2}|<[^>]*>)/g,(token,key)=>{if(key==='$')return '$';if(key==='&')return full;if(key==='`')return text.slice(0,offset);if(key==="'")return text.slice(offset+full.length);if(key[0]==='<')return named?(named[key.slice(1,-1)]??''):token;const n=Number(key);if(n>0&&n<=captures.length)return captures[n-1]??'';if(key.length===2&&Number(key[0])>0&&Number(key[0])<=captures.length)return (captures[Number(key[0])-1]??'')+key[1];return token});generated+=expanded.length-full.length;if(generated>2*1024*1024)throw Error('Replacement output exceeds 2,097,152 units');return expanded})}return {matches,truncated,output}});

__studio33.stopRegex = __studio33.$fn((function stopRegex(){__studio33.regexJobId++;if(__studio33.regexTimer)clearTimeout(__studio33.regexTimer);__studio33.regexTimer=null;if(__studio33.regexWorker)__studio33.regexWorker.terminate();__studio33.regexWorker=null;if(__studio33.regexWorkerURL)URL.revokeObjectURL(__studio33.regexWorkerURL);__studio33.regexWorkerURL=null}),"function stopRegex(){regexJobId++;if(regexTimer)clearTimeout(regexTimer);regexTimer=null;if(regexWorker)regexWorker.terminate();regexWorker=null;if(regexWorkerURL)URL.revokeObjectURL(regexWorkerURL);regexWorkerURL=null}","stopRegex");

__studio33.jsonCSV = __studio33.$fn((function jsonCSV(source,path='',delimiter=',',flatten=true,protect=true){if(![',',';','\t'].includes(delimiter))throw Error('Invalid delimiter');const parsed=__studio33.parseDeveloperJSON(source);if(parsed.duplicates.length)throw Error('Resolve duplicate JSON keys before converting');const root=__studio33.nodeAtJSONPointer(parsed.root,path);if(root.type!=='array'||root.items.some(x=>x.type!=='object'))throw Error('Select a JSON array containing only objects');if(!root.items.length)throw Error('The array is empty; no columns to export');if(root.items.length>10000)throw Error('CSV supports up to 10,000 records');const headers=[],known=new Set(),rows=[];function addHeader(key){if(!known.has(key)){if(headers.length>=500)throw Error('CSV supports up to 500 columns');headers.push(key);known.add(key)}}function fields(node,prefix,map){if(flatten&&node.type==='object'&&node.entries.length){for(const [key,value]of node.entries)fields(value,prefix+'/'+__studio33.jsonPointerSegment(key),map)}else{addHeader(prefix);map.set(prefix,node)}}for(const record of root.items){const row=new Map();for(const [key,value]of record.entries)fields(value,'/'+__studio33.jsonPointerSegment(key),row);rows.push(row)}if(!headers.length)throw Error('Records have no fields to export');let protectedCells=0;function safe(value,isString){if(protect&&isString&&/^[\s\uFEFF]*[=+\-@]/u.test(value)){protectedCells++;return "'"+value}return value}function quote(value){return /["\r\n]/.test(value)||value.includes(delimiter)?'"'+value.replace(/"/g,'""')+'"':value}function cell(node){if(!node||node.type==='null')return '';if(node.type==='string')return safe(node.value,true);return __studio33.emitDeveloperJSON(node)}const chunks=[headers.map(h=>quote(safe(h,true))).join(delimiter)];let length=chunks[0].length+2;for(const row of rows){const line=headers.map(h=>quote(cell(row.get(h)))).join(delimiter);length+=line.length+2;if(length>8*1024*1024)throw Error('CSV output exceeds 8,388,608 units');chunks.push(line)}return {text:chunks.join('\r\n')+'\r\n',rows:rows.length,columns:headers.length,protectedCells}}),"function jsonCSV(source,path='',delimiter=',',flatten=true,protect=true){if(![',',';','\\t'].includes(delimiter))throw Error('Invalid delimiter');const parsed=parseDeveloperJSON(source);if(parsed.duplicates.length)throw Error('Resolve duplicate JSON keys before converting');const root=nodeAtJSONPointer(parsed.root,path);if(root.type!=='array'||root.items.some(x=>x.type!=='object'))throw Error('Select a JSON array containing only objects');if(!root.items.length)throw Error('The array is empty; no columns to export');if(root.items.length>10000)throw Error('CSV supports up to 10,000 records');const headers=[],known=new Set(),rows=[];function addHeader(key){if(!known.has(key)){if(headers.length>=500)throw Error('CSV supports up to 500 columns');headers.push(key);known.add(key)}}function fields(node,prefix,map){if(flatten&&node.type==='object'&&node.entries.length){for(const [key,value]of node.entries)fields(value,prefix+'/'+jsonPointerSegment(key),map)}else{addHeader(prefix);map.set(prefix,node)}}for(const record of root.items){const row=new Map();for(const [key,value]of record.entries)fields(value,'/'+jsonPointerSegment(key),row);rows.push(row)}if(!headers.length)throw Error('Records have no fields to export');let protectedCells=0;function safe(value,isString){if(protect&&isString&&/^[\\s\\uFEFF]*[=+\\-@]/u.test(value)){protectedCells++;return \"'\"+value}return value}function quote(value){return /[\"\\r\\n]/.test(value)||value.includes(delimiter)?'\"'+value.replace(/\"/g,'\"\"')+'\"':value}function cell(node){if(!node||node.type==='null')return '';if(node.type==='string')return safe(node.value,true);return emitDeveloperJSON(node)}const chunks=[headers.map(h=>quote(safe(h,true))).join(delimiter)];let length=chunks[0].length+2;for(const row of rows){const line=headers.map(h=>quote(cell(row.get(h)))).join(delimiter);length+=line.length+2;if(length>8*1024*1024)throw Error('CSV output exceeds 8,388,608 units');chunks.push(line)}return {text:chunks.join('\\r\\n')+'\\r\\n',rows:rows.length,columns:headers.length,protectedCells}}","jsonCSV");

__studio33.parseUnixTimestamp = (function parseUnixTimestamp(text,unit='seconds'){text=String(text).trim();if(text.length>40)throw Error('Timestamp is too long');let millis;if(unit==='milliseconds'){if(!/^-?\d+$/.test(text))throw Error('Milliseconds must be a whole number');millis=BigInt(text)}else if(unit==='seconds'){const m=text.match(/^(-?)(\d+)(?:\.(\d{1,3}))?$/);if(!m)throw Error('Seconds must be numeric with at most 3 decimal places');millis=(BigInt(m[2])*1000n+BigInt((m[3]||'').padEnd(3,'0')))*(m[1]?-1n:1n)}else throw Error('Choose seconds or milliseconds');if(millis>8640000000000000n||millis< -8640000000000000n)throw Error('Timestamp is outside the supported date range');return Number(millis)});

__studio33.parseUTCDate = (function parseUTCDate(text){const m=String(text).trim().match(/^(\d{4}|[+-]\d{6})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?Z?$/);if(!m)throw Error('Use a UTC date such as 2026-10-07T12:00:00.000Z');const [year,month,day,hour,minute,second,ms]=[Number(m[1]),Number(m[2]),Number(m[3]),Number(m[4]),Number(m[5]),Number(m[6]||0),Number((m[7]||'').padEnd(3,'0'))];const date=new Date(0);date.setUTCFullYear(year,month-1,day);date.setUTCHours(hour,minute,second,ms);if(!Number.isFinite(date.getTime())||date.getUTCFullYear()!==year||date.getUTCMonth()!==month-1||date.getUTCDate()!==day||date.getUTCHours()!==hour||date.getUTCMinutes()!==minute||date.getUTCSeconds()!==second)throw Error('Invalid calendar date or time');return date.getTime()});

__studio33.unixSecondsText = (function unixSecondsText(millis){const value=BigInt(millis),negative=value<0n,absolute=negative?-value:value;const fraction=String(absolute%1000n).padStart(3,'0').replace(/0+$/,'');return (negative?'-':'')+(absolute/1000n).toString()+(fraction?'.'+fraction:'')});

__studio33.timestampSummary = __studio33.$fn((function timestampSummary(millis,zone){if(!Number.isSafeInteger(millis)||Math.abs(millis)>8640000000000000)throw Error('Invalid timestamp');const date=new Date(millis),format=new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',fractionalSecondDigits:3,hourCycle:'h23',timeZoneName:'longOffset'});return {seconds:__studio33.unixSecondsText(millis),milliseconds:String(millis),utc:date.toISOString(),zoned:format.format(date),zone:format.resolvedOptions().timeZone}}),"function timestampSummary(millis,zone){if(!Number.isSafeInteger(millis)||Math.abs(millis)>8640000000000000)throw Error('Invalid timestamp');const date=new Date(millis),format=new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',fractionalSecondDigits:3,hourCycle:'h23',timeZoneName:'longOffset'});return {seconds:unixSecondsText(millis),milliseconds:String(millis),utc:date.toISOString(),zoned:format.format(date),zone:format.resolvedOptions().timeZone}}","timestampSummary");

__studio33.rememberTool = __studio33.$fn((function rememberTool(id){__studio33.recentTools=[id,...__studio33.recentTools.filter(x=>x!==id)].slice(0,6);__studio33.storage.set('calc-studio-recents-v6',__studio33.recentTools);__studio33.renderRecents()}),"function rememberTool(id){recentTools=[id,...recentTools.filter(x=>x!==id)].slice(0,6);storage.set('calc-studio-recents-v6',recentTools);renderRecents()}","rememberTool");

__studio33.setEditorFullScreen = __studio33.$fn((function setEditorFullScreen(value){__studio33.editorFullScreen=!!value;document.querySelector('.main-card').classList.toggle('editor-fullscreen',__studio33.editorFullScreen);document.body.style.overflow=__studio33.editorFullScreen?'hidden':'';__studio33.$('fullScreenToggle').textContent=__studio33.editorFullScreen?'Exit full screen':'Full screen';__studio33.$('fullScreenToggle').setAttribute('aria-pressed',String(__studio33.editorFullScreen));if(!__studio33.editorFullScreen)__studio33.$('fullScreenToggle').focus()}),"function setEditorFullScreen(value){editorFullScreen=!!value;document.querySelector('.main-card').classList.toggle('editor-fullscreen',editorFullScreen);document.body.style.overflow=editorFullScreen?'hidden':'';$('fullScreenToggle').textContent=editorFullScreen?'Exit full screen':'Full screen';$('fullScreenToggle').setAttribute('aria-pressed',String(editorFullScreen));if(!editorFullScreen)$('fullScreenToggle').focus()}","setEditorFullScreen");

__studio33.outputButtons = __studio33.$fn((function outputButtons(ids,ready){for(const id of ids)__studio33.$(id).disabled=!ready}),"function outputButtons(ids,ready){for(const id of ids)$(id).disabled=!ready}","outputButtons");

__studio33.readLocalText = __studio33.$fn((async function readLocalText(file,extensions=['txt','json']){if(!file)throw Error('Choose a file');const extension=(file.name||'').split('.').at(-1).toLowerCase();if(!extensions.includes(extension))throw Error('Choose a '+extensions.map(x=>'.'+x).join(' / ')+' file');return __studio33.readDeveloperFile({name:'input.txt',size:file.size,arrayBuffer:()=>file.arrayBuffer()})}),"async function readLocalText(file,extensions=['txt','json']){if(!file)throw Error('Choose a file');const extension=(file.name||'').split('.').at(-1).toLowerCase();if(!extensions.includes(extension))throw Error('Choose a '+extensions.map(x=>'.'+x).join(' / ')+' file');return readDeveloperFile({name:'input.txt',size:file.size,arrayBuffer:()=>file.arrayBuffer()})}","readLocalText");

__studio33.uploadText = __studio33.$fn((function uploadText(inputId,fileId,extensions,after,statusId){__studio33.$(fileId).onchange=__studio33.$fn(async()=>{try{const value=await __studio33.readLocalText(__studio33.$(fileId).files[0],extensions);__studio33.$(inputId).value=value;after();__studio33.newToolStatus(statusId,'File loaded. Run the tool to update results.')}catch(e){__studio33.newToolStatus(statusId,e.message,true)}finally{__studio33.$(fileId).value=''}},"async()=>{try{const value=await readLocalText($(fileId).files[0],extensions);$(inputId).value=value;after();newToolStatus(statusId,'File loaded. Run the tool to update results.')}catch(e){newToolStatus(statusId,e.message,true)}finally{$(fileId).value=''}}","")}),"function uploadText(inputId,fileId,extensions,after,statusId){$(fileId).onchange=async()=>{try{const value=await readLocalText($(fileId).files[0],extensions);$(inputId).value=value;after();newToolStatus(statusId,'File loaded. Run the tool to update results.')}catch(e){newToolStatus(statusId,e.message,true)}finally{$(fileId).value=''}}}","uploadText");

__studio33.stopEditionWorker = __studio33.$fn((function stopEditionWorker(key){const current=__studio33.editionWorkers.get(key);if(current){clearTimeout(current.timer);current.worker.terminate();URL.revokeObjectURL(current.url);__studio33.editionWorkers.delete(key)}}),"function stopEditionWorker(key){const current=editionWorkers.get(key);if(current){clearTimeout(current.timer);current.worker.terminate();URL.revokeObjectURL(current.url);editionWorkers.delete(key)}}","stopEditionWorker");

__studio33.runEditionWorker = __studio33.$fn((function runEditionWorker(key,source,job,success,statusId,timeout=3000){return __studio33.runStudioWorker(key,source,job,success,statusId,timeout)}),"function runEditionWorker(key,source,job,success,statusId,timeout=3000){return runStudioWorker(key,source,job,success,statusId,timeout)}","runEditionWorker");

__studio33.textDiffJob = (function textDiffJob(job){
 const prepare=t=>{if(typeof t!=='string'||t.length>2097152)throw Error('Each text supports at most 2,097,152 units');return t?(job.newlines?t.replace(/\r\n?/g,'\n'):t).split('\n'):[]},
 left=prepare(job.left),right=prepare(job.right);
 if(left.length>10000||right.length>10000)throw Error('Text comparison supports up to 10,000 lines per input');
 const key=s=>job.whitespace?s.trim().replace(/\s+/gu,' '):s,a=left.map(key),b=right.map(key),rows=[];
 let work=0,peak=0;const budget=()=>{if(++work>20000000)throw Error('Exact alignment exceeded the comparison work limit. Compare smaller sections. No approximate result was produced.')};
 const same=(i,j)=>rows.push({type:'same',left:i+1,right:j+1,text:left[i]}),
 removed=i=>rows.push({type:'removed',left:i+1,text:left[i]}),added=j=>rows.push({type:'added',right:j+1,text:right[j]});
 function split(as,ae,bs,be){
  const n=ae-as,m=be-bs,max=Math.ceil((n+m)/2),offset=max+1,length=2*max+3,
  v1=new Int32Array(length),v2=new Int32Array(length),delta=n-m,front=(delta&1)!==0;
  peak=Math.max(peak,length*8);v1.fill(-1);v2.fill(-1);v1[offset+1]=v2[offset+1]=0;
  let k1start=0,k1end=0,k2start=0,k2end=0;
  for(let d=0;d<max;d++){
   for(let k=-d+k1start;k<=d-k1end;k+=2){budget();const at=offset+k;let x=k===-d||k!==d&&v1[at-1]<v1[at+1]?v1[at+1]:v1[at-1]+1,y=x-k;
    while(x<n&&y<m&&a[as+x]===b[bs+y]){budget();x++;y++}v1[at]=x;
    if(x>n)k1end+=2;else if(y>m)k1start+=2;else if(front){const other=offset+delta-k;if(other>=0&&other<length&&v2[other]!==-1&&x>=n-v2[other])return [as+x,bs+y]}
   }
   for(let k=-d+k2start;k<=d-k2end;k+=2){budget();const at=offset+k;let x=k===-d||k!==d&&v2[at-1]<v2[at+1]?v2[at+1]:v2[at-1]+1,y=x-k;
    while(x<n&&y<m&&a[ae-x-1]===b[be-y-1]){budget();x++;y++}v2[at]=x;
    if(x>n)k2end+=2;else if(y>m)k2start+=2;else if(!front){const other=offset+delta-k;if(other>=0&&other<length&&v1[other]!==-1){const x1=v1[other],y1=x1-(delta-k);if(x1>=n-x)return [as+x1,bs+y1]}}
   }
  }
  return null;
 }
 /* An explicit stack releases the linear-space frontiers before processing subblocks. */
 const stack=[{as:0,ae:a.length,bs:0,be:b.length}];
 while(stack.length){const block=stack.pop();let {as,ae,bs,be}=block;
  if(block.tail){while(as<ae)same(as++,bs++);continue}
  while(as<ae&&bs<be&&a[as]===b[bs]){budget();same(as++,bs++)}
  let tail=0;while(as<ae&&bs<be&&a[ae-1]===b[be-1]){budget();ae--;be--;tail++}
  if(tail)stack.push({as:ae,ae:ae+tail,bs:be,be:be+tail,tail:true});
  if(as===ae){while(bs<be)added(bs++);continue}if(bs===be){while(as<ae)removed(as++);continue}
  if(ae-as===1){let at=-1;for(let j=bs;j<be;j++){budget();if(a[as]===b[j]){at=j;break}}if(at<0){removed(as);while(bs<be)added(bs++)}else{while(bs<at)added(bs++);same(as,bs++);while(bs<be)added(bs++)}continue}
  if(be-bs===1){let at=-1;for(let i=as;i<ae;i++){budget();if(a[i]===b[bs]){at=i;break}}if(at<0){while(as<ae)removed(as++);added(bs)}else{while(as<at)removed(as++);same(as++,bs);while(as<ae)removed(as++)}continue}
  const keys=new Set(a.slice(as,ae));let common=false;for(let j=bs;j<be;j++){budget();if(keys.has(b[j])){common=true;break}}
  if(!common){while(as<ae)removed(as++);while(bs<be)added(bs++);continue}
  const middle=split(as,ae,bs,be);
  if(!middle||middle[0]===as&&middle[1]===bs||middle[0]===ae&&middle[1]===be)throw Error('Exact alignment could not be completed. Compare smaller sections.');
  stack.push({as:middle[0],ae,bs:middle[1],be},{as,ae:middle[0],bs,be:middle[1]});
 }
 return {rows,added:rows.filter(x=>x.type==='added').length,removed:rows.filter(x=>x.type==='removed').length,
 whitespace:!!job.whitespace,newlines:!!job.newlines,algorithm:'linear-space exact line alignment',frontierBytes:peak,work};
});

__studio33.parseCSVText = (function parseCSVText(source,delimiter=','){if(source.length>2097152)throw Error('CSV input supports at most 2,097,152 units');if(![',',';','\t'].includes(delimiter))throw Error('Invalid delimiter');source=source.replace(/^\uFEFF/,'');if(!source)throw Error('Enter CSV');const rows=[];let row=[],cell='',quoted=false,closed=false,touched=false;function finishCell(){row.push(cell);cell='';closed=false;if(row.length>500)throw Error('CSV supports up to 500 columns')}function finishRow(){finishCell();rows.push(row);row=[];touched=false;if(rows.length>10001)throw Error('CSV supports up to 10,000 data rows plus headers')}for(let i=0;i<source.length;i++){const c=source[i];if(quoted){if(c==='"'){if(source[i+1]==='"'){cell+='"';i++}else{quoted=false;closed=true}}else cell+=c;continue}if(closed&&c!==delimiter&&c!=='\r'&&c!=='\n')throw Error('Unexpected text after a closing quote at position '+(i+1));if(c==='"'){if(cell||closed)throw Error('Quote must start a CSV field at position '+(i+1));quoted=true;touched=true}else if(c===delimiter){finishCell();touched=true}else if(c==='\r'||c==='\n'){finishRow();if(c==='\r'&&source[i+1]==='\n')i++}else{cell+=c;touched=true}}if(quoted)throw Error('Unclosed quoted CSV field');if(touched||row.length||cell||closed)finishRow();if(!rows.length)throw Error('CSV has no records');return rows});

__studio33.csvToJSON = __studio33.$fn((function csvToJSON(source,delimiter=',',headers=true,infer=false,emptyNull=false){const rows=__studio33.parseCSVText(source,delimiter),width=rows[0].length;const names=headers?rows.shift():Array.from({length:width},(_,i)=>'field'+(i+1));if(names.some(x=>!x.trim())||new Set(names).size!==names.length)throw Error('Headers must be nonempty and unique');if(rows.length>10000)throw Error('CSV supports up to 10,000 data rows');if(rows.some(x=>x.length!==width))throw Error('Every record must have '+width+' fields');const value=text=>{if(emptyNull&&text==='')return {type:'null',value:null};if(infer){const token=text.trim();if(token==='true'||token==='false')return {type:'boolean',value:token==='true'};if(token==='null')return {type:'null',value:null};if(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(token)){if(token.length>10000)throw Error('Numeric cell is too long');return {type:'number',raw:token}}}return {type:'string',value:text}};const root={type:'array',items:rows.map(row=>({type:'object',entries:names.map((name,i)=>[name,value(row[i])])}))};return {text:__studio33.emitDeveloperJSON(root,'  '),rows:rows.length,columns:width}}),"function csvToJSON(source,delimiter=',',headers=true,infer=false,emptyNull=false){const rows=parseCSVText(source,delimiter),width=rows[0].length;const names=headers?rows.shift():Array.from({length:width},(_,i)=>'field'+(i+1));if(names.some(x=>!x.trim())||new Set(names).size!==names.length)throw Error('Headers must be nonempty and unique');if(rows.length>10000)throw Error('CSV supports up to 10,000 data rows');if(rows.some(x=>x.length!==width))throw Error('Every record must have '+width+' fields');const value=text=>{if(emptyNull&&text==='')return {type:'null',value:null};if(infer){const token=text.trim();if(token==='true'||token==='false')return {type:'boolean',value:token==='true'};if(token==='null')return {type:'null',value:null};if(/^-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$/.test(token)){if(token.length>10000)throw Error('Numeric cell is too long');return {type:'number',raw:token}}}return {type:'string',value:text}};const root={type:'array',items:rows.map(row=>({type:'object',entries:names.map((name,i)=>[name,value(row[i])])}))};return {text:emitDeveloperJSON(root,'  '),rows:rows.length,columns:width}}","csvToJSON");

__studio33.nodeChildren = (function nodeChildren(node){return node.type==='object'?node.entries:node.type==='array'?node.items.map((value,i)=>[String(i),value]):[]});

__studio33.nodePreview = __studio33.$fn((function nodePreview(node){if(node.type==='object')return '{'+node.entries.length+' keys}';if(node.type==='array')return '['+node.items.length+' items]';return __studio33.emitDeveloperJSON(node).slice(0,180)}),"function nodePreview(node){if(node.type==='object')return '{'+node.entries.length+' keys}';if(node.type==='array')return '['+node.items.length+' items]';return emitDeveloperJSON(node).slice(0,180)}","nodePreview");

__studio33.explorerSearchNodes = __studio33.$fn((function explorerSearchNodes(root,query){const results=[];let more=false;function visit(node,path,key){if(results.length>=200){more=true;return}if((key+' '+path+' '+(node.type==='object'||node.type==='array'?'':__studio33.emitDeveloperJSON(node))).toLowerCase().includes(query))results.push({node,path,key});for(const [name,child]of __studio33.nodeChildren(node)){if(more)return;visit(child,path+'/'+__studio33.jsonPointerSegment(name),name)}}visit(root,'','(root)');return {results,more}}),"function explorerSearchNodes(root,query){const results=[];let more=false;function visit(node,path,key){if(results.length>=200){more=true;return}if((key+' '+path+' '+(node.type==='object'||node.type==='array'?'':emitDeveloperJSON(node))).toLowerCase().includes(query))results.push({node,path,key});for(const [name,child]of nodeChildren(node)){if(more)return;visit(child,path+'/'+jsonPointerSegment(name),name)}}visit(root,'','(root)');return {results,more}}","explorerSearchNodes");

__studio33.sha256Digest = (async function sha256Digest(bytes){if(typeof crypto==='undefined'||!crypto.subtle)throw Error('Web Crypto is unavailable. Open this downloaded HTML directly in a current browser.');const result=await crypto.subtle.digest('SHA-256',bytes);return Array.from(new Uint8Array(result),b=>b.toString(16).padStart(2,'0')).join('')});

__studio33.transformText = (function transformText(text,mode,ignoreCase=false,find='',replacement=''){if(text.length>2097152)throw Error('Text supports at most 2,097,152 units');if(mode==='upper')return text.toUpperCase();if(mode==='lower')return text.toLowerCase();if(mode==='title')return text.replace(/[\p{L}\p{M}][\p{L}\p{M}\p{N}'’]*/gu,word=>{const points=Array.from(word.toLowerCase());return points.shift().toUpperCase()+points.join('')});if(mode==='replace'){if(!find)throw Error('Find text cannot be empty');if(find.length>10000||replacement.length>10000)throw Error('Find and replace inputs support up to 10,000 units');const pattern=new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),ignoreCase?'giu':'gu'),parts=[];let index=0,length=0,match;while((match=pattern.exec(text))){const prefix=text.slice(index,match.index);length+=prefix.length+replacement.length;if(length>8388608)throw Error('Output exceeds 8,388,608 units');parts.push(prefix,replacement);index=match.index+match[0].length}length+=text.length-index;if(length>8388608)throw Error('Output exceeds 8,388,608 units');parts.push(text.slice(index));return parts.join('')}const normalized=text.replace(/\r\n?/g,'\n'),trailing=normalized.endsWith('\n'),lines=normalized.split('\n');if(trailing)lines.pop();let out;if(mode==='trim')out=lines.map(line=>line.trim());else if(mode==='spaces')out=lines.map(line=>line.replace(/[^\S\n]+/gu,' '));else if(mode==='blank')out=lines.filter(line=>line.trim());else if(mode==='dedupe'){const seen=new Set();out=lines.filter(line=>{const key=ignoreCase?line.toLowerCase():line;if(seen.has(key))return false;seen.add(key);return true})}else if(mode==='sort'||mode==='reverse'){const key=value=>ignoreCase?value.toLowerCase():value;out=[...lines].sort((a,b)=>key(a)<key(b)?-1:key(a)>key(b)?1:0);if(mode==='reverse')out.reverse()}else throw Error('Unknown text transformation');return out.join('\n')+(trailing&&out.length?'\n':'')});

__studio33.prepareSchemaJSON = __studio33.$fn((function prepareSchemaJSON(text){const parsed=__studio33.parseDeveloperJSON(text);if(parsed.duplicates.length)throw Error('Resolve duplicate JSON keys before validation');function check(node,path){if(node.type==='number'){const number=Number(node.raw);if(!Number.isFinite(number)||__studio33.normalizedJSONNumber(node.raw)!==__studio33.normalizedJSONNumber(JSON.stringify(number)))throw Error('Numeric precision would be lost at '+(path||'(root)')+'. Quote identifiers or use representable values.')}for(const [key,child]of __studio33.nodeChildren(node))check(child,path+'/'+__studio33.jsonPointerSegment(key))}check(parsed.root,'');return __studio33.emitDeveloperJSON(parsed.root)}),"function prepareSchemaJSON(text){const parsed=parseDeveloperJSON(text);if(parsed.duplicates.length)throw Error('Resolve duplicate JSON keys before validation');function check(node,path){if(node.type==='number'){const number=Number(node.raw);if(!Number.isFinite(number)||normalizedJSONNumber(node.raw)!==normalizedJSONNumber(JSON.stringify(number)))throw Error('Numeric precision would be lost at '+(path||'(root)')+'. Quote identifiers or use representable values.')}for(const [key,child]of nodeChildren(node))check(child,path+'/'+jsonPointerSegment(key))}check(parsed.root,'');return emitDeveloperJSON(parsed.root)}","prepareSchemaJSON");

__studio33.maskDeveloperJSON = __studio33.$fn((function maskDeveloperJSON(source,rulesText,mode='replace',replacement='[REDACTED]',ignoreCase=true,keep=0){const parsed=__studio33.parseDeveloperJSON(source);if(parsed.duplicates.length)throw Error('Resolve duplicate keys before masking');if(!Number.isInteger(keep)||keep<0||keep>8)throw Error('Keep last characters must be 0–8');if(replacement.length>1000)throw Error('Replacement supports up to 1,000 units');if(!['replace','remove'].includes(mode))throw Error('Choose Replace or Remove');const rules=rulesText.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);if(!rules.length||rules.length>100)throw Error('Enter 1–100 fields or JSON Pointer patterns');const paths=rules.filter(x=>x.startsWith('/')).map(rule=>rule.slice(1).split('/').map(key=>{if(/~(?:[^01]|$)/.test(key))throw Error('Invalid JSON Pointer escape');return key.replace(/~1/g,'/').replace(/~0/g,'~')}));const keys=new Set(rules.filter(x=>!x.startsWith('/')).map(x=>ignoreCase?x.toLowerCase():x));let count=0;const affected=[];function match(key,path){return keys.has(ignoreCase?key.toLowerCase():key)||paths.some(parts=>parts.length===path.length&&parts.every((v,i)=>v==='*'||v===path[i]))}function walk(node,path){if(node.type==='object'){const entries=[];for(const [key,child]of node.entries){const next=[...path,key];if(match(key,next)){count++;if(affected.length<200)affected.push('/'+next.map(__studio33.jsonPointerSegment).join('/'));if(mode==='remove')continue;const tail=keep&&child.type==='string'?Array.from(child.value).slice(-keep).join(''):'';entries.push([key,{type:'string',value:replacement+tail}])}else entries.push([key,walk(child,next)])}return {type:'object',entries}}if(node.type==='array')return {type:'array',items:node.items.map(__studio33.$fn((child,i)=>{const next=[...path,String(i)];if(match(String(i),next)){count++;if(affected.length<200)affected.push('/'+next.map(__studio33.jsonPointerSegment).join('/'));if(mode==='remove')return {type:'null',value:null};const tail=keep&&child.type==='string'?Array.from(child.value).slice(-keep).join(''):'';return {type:'string',value:replacement+tail}}return walk(child,next)},"(child,i)=>{const next=[...path,String(i)];if(match(String(i),next)){count++;if(affected.length<200)affected.push('/'+next.map(jsonPointerSegment).join('/'));if(mode==='remove')return {type:'null',value:null};const tail=keep&&child.type==='string'?Array.from(child.value).slice(-keep).join(''):'';return {type:'string',value:replacement+tail}}return walk(child,next)}",""))};return node}return {text:__studio33.emitDeveloperJSON(walk(parsed.root,[]),'  '),count,paths:affected,pathsTruncated:count>200}}),"function maskDeveloperJSON(source,rulesText,mode='replace',replacement='[REDACTED]',ignoreCase=true,keep=0){const parsed=parseDeveloperJSON(source);if(parsed.duplicates.length)throw Error('Resolve duplicate keys before masking');if(!Number.isInteger(keep)||keep<0||keep>8)throw Error('Keep last characters must be 0–8');if(replacement.length>1000)throw Error('Replacement supports up to 1,000 units');if(!['replace','remove'].includes(mode))throw Error('Choose Replace or Remove');const rules=rulesText.split(/\\r?\\n/).map(x=>x.trim()).filter(Boolean);if(!rules.length||rules.length>100)throw Error('Enter 1–100 fields or JSON Pointer patterns');const paths=rules.filter(x=>x.startsWith('/')).map(rule=>rule.slice(1).split('/').map(key=>{if(/~(?:[^01]|$)/.test(key))throw Error('Invalid JSON Pointer escape');return key.replace(/~1/g,'/').replace(/~0/g,'~')}));const keys=new Set(rules.filter(x=>!x.startsWith('/')).map(x=>ignoreCase?x.toLowerCase():x));let count=0;const affected=[];function match(key,path){return keys.has(ignoreCase?key.toLowerCase():key)||paths.some(parts=>parts.length===path.length&&parts.every((v,i)=>v==='*'||v===path[i]))}function walk(node,path){if(node.type==='object'){const entries=[];for(const [key,child]of node.entries){const next=[...path,key];if(match(key,next)){count++;if(affected.length<200)affected.push('/'+next.map(jsonPointerSegment).join('/'));if(mode==='remove')continue;const tail=keep&&child.type==='string'?Array.from(child.value).slice(-keep).join(''):'';entries.push([key,{type:'string',value:replacement+tail}])}else entries.push([key,walk(child,next)])}return {type:'object',entries}}if(node.type==='array')return {type:'array',items:node.items.map((child,i)=>{const next=[...path,String(i)];if(match(String(i),next)){count++;if(affected.length<200)affected.push('/'+next.map(jsonPointerSegment).join('/'));if(mode==='remove')return {type:'null',value:null};const tail=keep&&child.type==='string'?Array.from(child.value).slice(-keep).join(''):'';return {type:'string',value:replacement+tail}}return walk(child,next)})};return node}return {text:emitDeveloperJSON(walk(parsed.root,[]),'  '),count,paths:affected,pathsTruncated:count>200}}","maskDeveloperJSON");

__studio33.parseRequestLines = (function parseRequestLines(text,header=false){if(text.length>100000)throw Error('Headers/query text supports at most 100,000 units');const result=[];for(const raw of text.split(/\r?\n/)){if(!raw.trim())continue;const separator=header?':':'=',index=raw.indexOf(separator);if(index<0)throw Error('Each line needs '+(header?'Name: value':'key=value'));const key=raw.slice(0,index).trim(),value=header?raw.slice(index+1).trim():raw.slice(index+1);if(!key)throw Error('Names cannot be empty');if(header&&!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(key))throw Error('Invalid HTTP header name');if(header&&/[\x00-\x08\x0b-\x1f\x7f]/.test(value))throw Error('HTTP header values contain unsupported control characters');if(/[\r\n\0]/.test(value)||/[\r\n\0]/.test(key))throw Error('Names/values cannot contain control line breaks');result.push([key,value]);if(result.length>100)throw Error('Use at most 100 headers or query parameters')}return result});

__studio33.buildAPIRequest = __studio33.$fn((function buildAPIRequest(options){if((options.body||'').length>2097152||(options.url||'').length>10000)throw Error('URL/body exceeds supported size');for(const text of [options.body||'',options.url||'',options.query||'',options.headers||''])__studio33.assertUnicodeText(text);if((options.body||'').includes('\0'))throw Error('NUL bytes cannot be represented in a shell text argument');if(!/^[A-Z]+$/.test(options.method)||!['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'].includes(options.method))throw Error('Choose a supported method');let url;try{url=new URL(options.url)}catch{throw Error('Enter an absolute HTTP(S) URL')}if(!['http:','https:'].includes(url.protocol)||url.username||url.password)throw Error('Use an HTTP(S) URL without embedded user credentials');if(url.hash)throw Error('Remove the URL fragment; fragments are not sent in HTTP requests');for(const [key,value]of __studio33.parseRequestLines(options.query||''))url.searchParams.append(key,value);const headers=__studio33.parseRequestLines(options.headers||'',true);if(options.validateJSON&&options.body){const parsed=__studio33.parseDeveloperJSON(options.body);if(parsed.duplicates.length)throw Error('Resolve duplicate JSON keys in the body')}if(!['posix','powershell'].includes(options.shell))throw Error('Choose a shell');const quote=text=>options.shell==='powershell'?"'"+text.replace(/'/g,"''")+"'":"'"+text.replace(/'/g,"'\\''")+"'";const args=['--request',quote(options.method),'--url',quote(url.toString())];for(const [key,value]of headers)args.push('--header',quote(key+': '+value));if(options.body)args.push('--data-raw',quote(options.body));const command=(options.shell==='powershell'?'curl.exe':'curl')+' '+args.join(' ');return {command,url:url.toString(),method:options.method,headerCount:headers.length,queryCount:__studio33.parseRequestLines(options.query||'').length,notice:'No request sent. Exported commands include entered headers/body; review credentials before sharing.'}}),"function buildAPIRequest(options){if((options.body||'').length>2097152||(options.url||'').length>10000)throw Error('URL/body exceeds supported size');for(const text of [options.body||'',options.url||'',options.query||'',options.headers||''])assertUnicodeText(text);if((options.body||'').includes('\\0'))throw Error('NUL bytes cannot be represented in a shell text argument');if(!/^[A-Z]+$/.test(options.method)||!['GET','POST','PUT','PATCH','DELETE','HEAD','OPTIONS'].includes(options.method))throw Error('Choose a supported method');let url;try{url=new URL(options.url)}catch{throw Error('Enter an absolute HTTP(S) URL')}if(!['http:','https:'].includes(url.protocol)||url.username||url.password)throw Error('Use an HTTP(S) URL without embedded user credentials');if(url.hash)throw Error('Remove the URL fragment; fragments are not sent in HTTP requests');for(const [key,value]of parseRequestLines(options.query||''))url.searchParams.append(key,value);const headers=parseRequestLines(options.headers||'',true);if(options.validateJSON&&options.body){const parsed=parseDeveloperJSON(options.body);if(parsed.duplicates.length)throw Error('Resolve duplicate JSON keys in the body')}if(!['posix','powershell'].includes(options.shell))throw Error('Choose a shell');const quote=text=>options.shell==='powershell'?\"'\"+text.replace(/'/g,\"''\")+\"'\":\"'\"+text.replace(/'/g,\"'\\\\''\")+\"'\";const args=['--request',quote(options.method),'--url',quote(url.toString())];for(const [key,value]of headers)args.push('--header',quote(key+': '+value));if(options.body)args.push('--data-raw',quote(options.body));const command=(options.shell==='powershell'?'curl.exe':'curl')+' '+args.join(' ');return {command,url:url.toString(),method:options.method,headerCount:headers.length,queryCount:parseRequestLines(options.query||'').length,notice:'No request sent. Exported commands include entered headers/body; review credentials before sharing.'}}","buildAPIRequest");

__studio33.inspectJWT = __studio33.$fn((function inspectJWT(token,now=Date.now()){token=token.trim().replace(/^Bearer\s+/i,'');if(token.length>100000)throw Error('JWT supports up to 100,000 units');const parts=token.split('.');if(parts.length===5)throw Error('Five-part encrypted JWE is not supported');if(parts.length!==3||!parts[0]||!parts[1])throw Error('Expected three JWT segments');for(const segment of parts)if(!/^[A-Za-z0-9_-]*$/.test(segment))throw Error('JWT segments must use unpadded Base64URL');if(parts[2]){let decoded;try{decoded=atob(parts[2].replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-parts[2].length%4)%4))}catch{throw Error('Invalid signature Base64URL encoding')}if(btoa(decoded).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')!==parts[2])throw Error('Noncanonical signature Base64URL encoding')}const headerText=__studio33.transformEncoding(parts[0],'base64url',true),payloadText=__studio33.transformEncoding(parts[1],'base64url',true),header=__studio33.parseDeveloperJSON(headerText),payload=__studio33.parseDeveloperJSON(payloadText);if(header.duplicates.length||payload.duplicates.length)throw Error('Duplicate JWT JSON keys are ambiguous');if(header.root.type!=='object'||payload.root.type!=='object')throw Error('Header and payload must be JSON objects');const get=(node,key)=>node.entries.find(x=>x[0]===key)?.[1];const alg=get(header.root,'alg');if(!alg||alg.type!=='string'||!alg.value)throw Error('JWT header must contain a string alg');const claims=[];for(const key of ['exp','nbf','iat']){const value=get(payload.root,key);if(!value)continue;if(value.type!=='number')throw Error(key+' must be a numeric timestamp');const seconds=Number(value.raw),millis=seconds*1000;if(!Number.isFinite(millis)||Math.abs(millis)>8640000000000000)throw Error(key+' timestamp is outside supported range');claims.push({name:key,raw:value.raw,utc:new Date(millis).toISOString(),state:key==='exp'?(now>=millis?'Expired by decoded claim':'Not expired by decoded claim'):key==='nbf'?(now<millis?'Not yet active by decoded claim':'Not-before time has passed'):(now<millis?'Issued-at is in the future':'Issued-at time has passed')})}return {header:__studio33.emitDeveloperJSON(header.root,'  '),payload:__studio33.emitDeveloperJSON(payload.root,'  '),algorithm:alg.value,claims,signaturePresent:!!parts[2],signatureVerified:false,notice:'Decoded only. Signature, issuer, audience, revocation, and authorization have NOT been verified.'}}),"function inspectJWT(token,now=Date.now()){token=token.trim().replace(/^Bearer\\s+/i,'');if(token.length>100000)throw Error('JWT supports up to 100,000 units');const parts=token.split('.');if(parts.length===5)throw Error('Five-part encrypted JWE is not supported');if(parts.length!==3||!parts[0]||!parts[1])throw Error('Expected three JWT segments');for(const segment of parts)if(!/^[A-Za-z0-9_-]*$/.test(segment))throw Error('JWT segments must use unpadded Base64URL');if(parts[2]){let decoded;try{decoded=atob(parts[2].replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-parts[2].length%4)%4))}catch{throw Error('Invalid signature Base64URL encoding')}if(btoa(decoded).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=+$/,'')!==parts[2])throw Error('Noncanonical signature Base64URL encoding')}const headerText=transformEncoding(parts[0],'base64url',true),payloadText=transformEncoding(parts[1],'base64url',true),header=parseDeveloperJSON(headerText),payload=parseDeveloperJSON(payloadText);if(header.duplicates.length||payload.duplicates.length)throw Error('Duplicate JWT JSON keys are ambiguous');if(header.root.type!=='object'||payload.root.type!=='object')throw Error('Header and payload must be JSON objects');const get=(node,key)=>node.entries.find(x=>x[0]===key)?.[1];const alg=get(header.root,'alg');if(!alg||alg.type!=='string'||!alg.value)throw Error('JWT header must contain a string alg');const claims=[];for(const key of ['exp','nbf','iat']){const value=get(payload.root,key);if(!value)continue;if(value.type!=='number')throw Error(key+' must be a numeric timestamp');const seconds=Number(value.raw),millis=seconds*1000;if(!Number.isFinite(millis)||Math.abs(millis)>8640000000000000)throw Error(key+' timestamp is outside supported range');claims.push({name:key,raw:value.raw,utc:new Date(millis).toISOString(),state:key==='exp'?(now>=millis?'Expired by decoded claim':'Not expired by decoded claim'):key==='nbf'?(now<millis?'Not yet active by decoded claim':'Not-before time has passed'):(now<millis?'Issued-at is in the future':'Issued-at time has passed')})}return {header:emitDeveloperJSON(header.root,'  '),payload:emitDeveloperJSON(payload.root,'  '),algorithm:alg.value,claims,signaturePresent:!!parts[2],signatureVerified:false,notice:'Decoded only. Signature, issuer, audience, revocation, and authorization have NOT been verified.'}}","inspectJWT");

__studio33.tokenizeSOQL = __studio33.$fn((function tokenizeSOQL(text){if(text.length>200000)throw Error('SOQL supports up to 200,000 units');const tokens=[];let i=0,depth=0;while(i<text.length){const ch=text[i];if(/\s/.test(ch)){i++;continue}if(ch==="'"){const start=i++;let closed=false;while(i<text.length){if(text[i]==='\\'){i+=2;continue}if(text[i++]==="'"){closed=true;break}}if(!closed)throw Error('Unclosed quoted string');tokens.push({text:text.slice(start,i),type:'string',start,end:i});continue}if(text.slice(i,i+2)==='/*'){const end=text.indexOf('*/',i+2);if(end<0)throw Error('Unclosed comment');tokens.push({text:text.slice(i,end+2),type:'comment',start:i,end:end+2});i=end+2;continue}if(text.slice(i,i+2)==='//'||text.slice(i,i+2)==='--'){let end=text.indexOf('\n',i);if(end<0)end=text.length;tokens.push({text:text.slice(i,end),type:'comment',start:i,end});i=end;continue}const word=text.slice(i).match(/^[A-Za-z_][A-Za-z0-9_$]*/);if(word){const raw=word[0];tokens.push({text:raw,type:__studio33.soqlKeywords.has(raw.toUpperCase())?'keyword':'identifier',start:i,end:i+raw.length});i+=raw.length;continue}const number=text.slice(i).match(/^\d+(?:\.\d+)?/);if(number){tokens.push({text:number[0],type:'number',start:i,end:i+number[0].length});i+=number[0].length;continue}if(ch==='(')depth++;if(ch===')'&&--depth<0)throw Error('Unmatched closing parenthesis');tokens.push({text:ch,type:'punctuation',start:i,end:i+1});i++}if(depth)throw Error('Unclosed parenthesis');if(!tokens.length)throw Error('Enter SOQL');return tokens}),"function tokenizeSOQL(text){if(text.length>200000)throw Error('SOQL supports up to 200,000 units');const tokens=[];let i=0,depth=0;while(i<text.length){const ch=text[i];if(/\\s/.test(ch)){i++;continue}if(ch===\"'\"){const start=i++;let closed=false;while(i<text.length){if(text[i]==='\\\\'){i+=2;continue}if(text[i++]===\"'\"){closed=true;break}}if(!closed)throw Error('Unclosed quoted string');tokens.push({text:text.slice(start,i),type:'string',start,end:i});continue}if(text.slice(i,i+2)==='/*'){const end=text.indexOf('*/',i+2);if(end<0)throw Error('Unclosed comment');tokens.push({text:text.slice(i,end+2),type:'comment',start:i,end:end+2});i=end+2;continue}if(text.slice(i,i+2)==='//'||text.slice(i,i+2)==='--'){let end=text.indexOf('\\n',i);if(end<0)end=text.length;tokens.push({text:text.slice(i,end),type:'comment',start:i,end});i=end;continue}const word=text.slice(i).match(/^[A-Za-z_][A-Za-z0-9_$]*/);if(word){const raw=word[0];tokens.push({text:raw,type:soqlKeywords.has(raw.toUpperCase())?'keyword':'identifier',start:i,end:i+raw.length});i+=raw.length;continue}const number=text.slice(i).match(/^\\d+(?:\\.\\d+)?/);if(number){tokens.push({text:number[0],type:'number',start:i,end:i+number[0].length});i+=number[0].length;continue}if(ch==='(')depth++;if(ch===')'&&--depth<0)throw Error('Unmatched closing parenthesis');tokens.push({text:ch,type:'punctuation',start:i,end:i+1});i++}if(depth)throw Error('Unclosed parenthesis');if(!tokens.length)throw Error('Enter SOQL');return tokens}","tokenizeSOQL");

__studio33.formatSOQL = __studio33.$fn((function formatSOQL(source,indent=2,uppercase=true){if(![2,4].includes(indent))throw Error('Choose 2 or 4 spaces');const tokens=__studio33.tokenizeSOQL(source),lines=[];let line='',level=0,selectLevels=new Set(),frames=[],previous='',previousType='';const pad=()=> ' '.repeat(level*indent);const flush=()=>{if(line.trim()){lines.push(pad()+line.trim());line=''}};for(let i=0;i<tokens.length;i++){const token=tokens[i],upper=token.text.toUpperCase(),next=tokens[i+1]?.text.toUpperCase(),isSubquery=token.text==='('&&next==='SELECT';const isKeyword=token.type==='keyword'&&!['.',':'].includes(previous);let text=isKeyword&&uppercase?upper:token.text;if(token.type==='comment'){flush();lines.push(pad()+text);previous='';continue}if(isSubquery){if(line.trim())flush();line='(';flush();frames.push({subquery:true,level});level++;previous='(';continue}if(token.text==='('){frames.push({subquery:false,level});line+=(previousType==='identifier'?'':' ')+text;previous='(';continue}if(token.text===')'){const frame=frames.pop();if(frame?.subquery){flush();selectLevels.delete(level);level=frame.level;line=')'}else line=line.trimEnd()+')';previous=')';previousType=token.type;continue}if(isKeyword&&['SELECT','FROM','WHERE','HAVING','LIMIT','OFFSET','TYPEOF','WHEN','ELSE','END'].includes(upper)||isKeyword&&['GROUP','ORDER','FOR','WITH','USING'].includes(upper)){if(upper==='SELECT'){flush();line=text;selectLevels.add(level)}else{flush();if(upper==='FROM')selectLevels.delete(level);line=text}previous=text;previousType=token.type;continue}if(token.text===','&&selectLevels.has(level)&&!frames.some(frame=>!frame.subquery&&frame.level===level)){line=line.trimEnd()+',';flush();previous=',';continue}if(token.text===','||token.text==='.'||token.text===':'||previous==='.'||previous===':'||token.text===';'||['=', '<','>','!'].includes(token.text)&&['=','<','>','!'].includes(previous)){line=line.trimEnd()+text}else if(token.text==='-'&&previous===':'){line+=text}else if(i>0&&tokens[i-1].end===token.start&&(token.type==='punctuation'||tokens[i-1].type==='punctuation'||token.type==='identifier'&&tokens[i-1].type==='number'))line+=text;else line+=(line&&!line.endsWith('(')?' ':'')+text;previous=token.text;previousType=token.type}flush();return {text:lines.join('\n'),tokens:__studio33.tokenizeSOQL(lines.join('\n')),notice:'Formatting only; syntax, field names, access, and query execution are not validated.'}}),"function formatSOQL(source,indent=2,uppercase=true){if(![2,4].includes(indent))throw Error('Choose 2 or 4 spaces');const tokens=tokenizeSOQL(source),lines=[];let line='',level=0,selectLevels=new Set(),frames=[],previous='',previousType='';const pad=()=> ' '.repeat(level*indent);const flush=()=>{if(line.trim()){lines.push(pad()+line.trim());line=''}};for(let i=0;i<tokens.length;i++){const token=tokens[i],upper=token.text.toUpperCase(),next=tokens[i+1]?.text.toUpperCase(),isSubquery=token.text==='('&&next==='SELECT';const isKeyword=token.type==='keyword'&&!['.',':'].includes(previous);let text=isKeyword&&uppercase?upper:token.text;if(token.type==='comment'){flush();lines.push(pad()+text);previous='';continue}if(isSubquery){if(line.trim())flush();line='(';flush();frames.push({subquery:true,level});level++;previous='(';continue}if(token.text==='('){frames.push({subquery:false,level});line+=(previousType==='identifier'?'':' ')+text;previous='(';continue}if(token.text===')'){const frame=frames.pop();if(frame?.subquery){flush();selectLevels.delete(level);level=frame.level;line=')'}else line=line.trimEnd()+')';previous=')';previousType=token.type;continue}if(isKeyword&&['SELECT','FROM','WHERE','HAVING','LIMIT','OFFSET','TYPEOF','WHEN','ELSE','END'].includes(upper)||isKeyword&&['GROUP','ORDER','FOR','WITH','USING'].includes(upper)){if(upper==='SELECT'){flush();line=text;selectLevels.add(level)}else{flush();if(upper==='FROM')selectLevels.delete(level);line=text}previous=text;previousType=token.type;continue}if(token.text===','&&selectLevels.has(level)&&!frames.some(frame=>!frame.subquery&&frame.level===level)){line=line.trimEnd()+',';flush();previous=',';continue}if(token.text===','||token.text==='.'||token.text===':'||previous==='.'||previous===':'||token.text===';'||['=', '<','>','!'].includes(token.text)&&['=','<','>','!'].includes(previous)){line=line.trimEnd()+text}else if(token.text==='-'&&previous===':'){line+=text}else if(i>0&&tokens[i-1].end===token.start&&(token.type==='punctuation'||tokens[i-1].type==='punctuation'||token.type==='identifier'&&tokens[i-1].type==='number'))line+=text;else line+=(line&&!line.endsWith('(')?' ':'')+text;previous=token.text;previousType=token.type}flush();return {text:lines.join('\\n'),tokens:tokenizeSOQL(lines.join('\\n')),notice:'Formatting only; syntax, field names, access, and query execution are not validated.'}}","formatSOQL");

__studio33.wireResultTool = __studio33.$fn((function wireResultTool(config){
 let ready=false,revision=0;const workerKey='u26-'+config.run;
 const invalidate=__studio33.$fn(()=>{revision++;const job=__studio33.editionWorkers.get(workerKey);__studio33.stopEditionWorker(workerKey);job?.failure?.();__studio33.refreshTaskUI();ready=false;config.onInvalidate?.();__studio33.$(config.output).value='';__studio33.outputButtons(config.buttons,false);__studio33.newToolStatus(config.status,'Press '+config.action+' to update results.')},"()=>{revision++;const job=editionWorkers.get(workerKey);stopEditionWorker(workerKey);job?.failure?.();refreshTaskUI();ready=false;config.onInvalidate?.();$(config.output).value='';outputButtons(config.buttons,false);newToolStatus(config.status,'Press '+config.action+' to update results.')}","invalidate");
 __studio33.$(config.run).onclick=__studio33.$fn(async()=>{invalidate();const ticket=revision;try{const pending=__studio33.u26JSONTask(config),r=pending?await pending:config.compute();if(ticket!==revision)return;__studio33.$(config.output).value=r.text;ready=true;__studio33.outputButtons(config.buttons,true);__studio33.newToolStatus(config.status,r.notice||'Done.')}catch(e){if(ticket===revision)__studio33.newToolStatus(config.status,e.message,!/^Cancelled/.test(e.message))}},"async()=>{invalidate();const ticket=revision;try{const pending=u26JSONTask(config),r=pending?await pending:config.compute();if(ticket!==revision)return;$(config.output).value=r.text;ready=true;outputButtons(config.buttons,true);newToolStatus(config.status,r.notice||'Done.')}catch(e){if(ticket===revision)newToolStatus(config.status,e.message,!/^Cancelled/.test(e.message))}}","");
 for(const id of config.inputs)__studio33.$(id).addEventListener('input',invalidate);
 __studio33.$(config.clear).onclick=__studio33.$fn(()=>{for(const id of config.clearInputs)__studio33.$(id).value='';invalidate()},"()=>{for(const id of config.clearInputs)$(id).value='';invalidate()}","");
 __studio33.$(config.buttons[0]).onclick=__studio33.$fn(()=>{if(ready)__studio33.copyText(__studio33.$(config.output).value)},"()=>{if(ready)copyText($(config.output).value)}","");
 __studio33.$(config.buttons[1]).onclick=__studio33.$fn(()=>{if(ready)__studio33.downloadFile(typeof config.filename==='function'?config.filename():config.filename,__studio33.$(config.output).value,config.mime||'text/plain')},"()=>{if(ready)downloadFile(typeof config.filename==='function'?config.filename():config.filename,$(config.output).value,config.mime||'text/plain')}","");return invalidate;
}),"function wireResultTool(config){\n let ready=false,revision=0;const workerKey='u26-'+config.run;\n const invalidate=()=>{revision++;const job=editionWorkers.get(workerKey);stopEditionWorker(workerKey);job?.failure?.();refreshTaskUI();ready=false;config.onInvalidate?.();$(config.output).value='';outputButtons(config.buttons,false);newToolStatus(config.status,'Press '+config.action+' to update results.')};\n $(config.run).onclick=async()=>{invalidate();const ticket=revision;try{const pending=u26JSONTask(config),r=pending?await pending:config.compute();if(ticket!==revision)return;$(config.output).value=r.text;ready=true;outputButtons(config.buttons,true);newToolStatus(config.status,r.notice||'Done.')}catch(e){if(ticket===revision)newToolStatus(config.status,e.message,!/^Cancelled/.test(e.message))}};\n for(const id of config.inputs)$(id).addEventListener('input',invalidate);\n $(config.clear).onclick=()=>{for(const id of config.clearInputs)$(id).value='';invalidate()};\n $(config.buttons[0]).onclick=()=>{if(ready)copyText($(config.output).value)};\n $(config.buttons[1]).onclick=()=>{if(ready)downloadFile(typeof config.filename==='function'?config.filename():config.filename,$(config.output).value,config.mime||'text/plain')};return invalidate;\n}","wireResultTool");

__studio33.jsonClone = (function jsonClone(node){return JSON.parse(JSON.stringify(node))});

__studio33.pointerParts = (function pointerParts(path){if(typeof path!=='string'||!path.startsWith('/')||/~(?:[^01]|$)/.test(path))throw Error('Use a valid non-root JSON Pointer');return path.slice(1).split('/').map(x=>x.replace(/~1/g,'/').replace(/~0/g,'~'))});

__studio33.setJSONPath = __studio33.$fn((function setJSONPath(root,path,value,remove=false){const parts=__studio33.pointerParts(path);let node=root;for(let i=0;i<parts.length-1;i++){const key=parts[i];if(node.type==='object'){let pair=node.entries.find(x=>x[0]===key);if(!pair){if(remove)throw Error('Path does not exist');pair=[key,{type:'object',entries:[]}];node.entries.push(pair)}node=pair[1]}else if(node.type==='array'&&/^(0|[1-9]\d*)$/.test(key)&&Number(key)<node.items.length)node=node.items[Number(key)];else throw Error('Path crosses a scalar or invalid array index')}const key=parts.at(-1);if(node.type==='object'){const index=node.entries.findIndex(x=>x[0]===key);if(remove){if(index<0)throw Error('Path does not exist');node.entries.splice(index,1)}else if(index<0)node.entries.push([key,value]);else node.entries[index][1]=value}else if(node.type==='array'&&/^(0|[1-9]\d*)$/.test(key)&&Number(key)<node.items.length){if(remove)node.items[Number(key)]={type:'null',value:null};else node.items[Number(key)]=value}else throw Error('Invalid target path')}),"function setJSONPath(root,path,value,remove=false){const parts=pointerParts(path);let node=root;for(let i=0;i<parts.length-1;i++){const key=parts[i];if(node.type==='object'){let pair=node.entries.find(x=>x[0]===key);if(!pair){if(remove)throw Error('Path does not exist');pair=[key,{type:'object',entries:[]}];node.entries.push(pair)}node=pair[1]}else if(node.type==='array'&&/^(0|[1-9]\\d*)$/.test(key)&&Number(key)<node.items.length)node=node.items[Number(key)];else throw Error('Path crosses a scalar or invalid array index')}const key=parts.at(-1);if(node.type==='object'){const index=node.entries.findIndex(x=>x[0]===key);if(remove){if(index<0)throw Error('Path does not exist');node.entries.splice(index,1)}else if(index<0)node.entries.push([key,value]);else node.entries[index][1]=value}else if(node.type==='array'&&/^(0|[1-9]\\d*)$/.test(key)&&Number(key)<node.items.length){if(remove)node.items[Number(key)]={type:'null',value:null};else node.items[Number(key)]=value}else throw Error('Invalid target path')}","setJSONPath");

__studio33.analyzeAPIResponse = __studio33.$fn((function analyzeAPIResponse(source,httpStatus=''){
 const root=__studio33.strictJSON(source),findings=[],failedPaths=new Set(),seen=new Set(),groups=Object.create(null);
 let nodes=0,omitted=false,failedRecordUnits=0;
 const entry=(node,key)=>node?.type==='object'?node.entries.find(x=>x[0]===key)?.[1]:null,
 primitive=node=>node?.type==='string'||node?.type==='boolean'?node.value:node?.type==='number'?node.raw:null,
 statusValue=node=>node?.type==='number'&&/^[1-5]\d\d$/.test(node.raw)?Number(node.raw):null,
 truth=(node,key)=>entry(node,key)?.type==='boolean'&&entry(node,key).value===false;
 function add(path,code,message,status,ref,fields){
  code=String(code||'HTTP_ERROR').slice(0,200);message=String(message||'No message provided');const identity=JSON.stringify([path,code,message]);
  if(seen.has(identity))return;seen.add(identity);if(findings.length>=1000){omitted=true;return}
  const shortened=message.slice(0,2000);if(shortened.length<message.length)omitted=true;
  findings.push({path,code,message:shortened+(shortened.length<message.length?' … [message shortened]':''),status,
   referenceId:String(ref||'').slice(0,200),fields:fields?.type==='array'?fields.items.slice(0,50).map(x=>String(primitive(x)??'').slice(0,200)):[],
   suggestion:(Object.hasOwn(__studio33.responseAdvice,code)?__studio33.responseAdvice[code]:null)||'Inspect the response body, status and corresponding request; this code has no built-in explanation.'});
 }
 function walk(node,path,context={}){
  if(++nodes>100000)throw Error('Response exceeds 100,000 inspected values');
  if(node.type==='array'){let evidence=false;node.items.forEach((child,i)=>{evidence=walk(child,path+'/'+i,context)||evidence});return evidence}
  if(node.type!=='object')return false;
  const ownStatus=entry(node,'httpStatusCode')||entry(node,'statusCode'),status=statusValue(ownStatus)??context.status??null,
  ref=primitive(entry(node,'referenceId'))??context.ref??'',code=primitive(entry(node,'errorCode'))||(entry(node,'statusCode')?.type==='string'?primitive(entry(node,'statusCode')):null),
  message=primitive(entry(node,'message')),failed=truth(node,'success')||truth(node,'isSuccessful')||statusValue(entry(node,'httpStatusCode'))>=400;
  if(failed)failedPaths.add(path);
  let evidence=false;if(code&&message){add(path,code,message,status,ref,entry(node,'fields'));evidence=true}
  if(truth(node,'isSuccessful')){add(path,'GRAPH_FAILED','Graph reports isSuccessful:false; inspect child failures and rollback.',status,ref);evidence=true}
  const errors=entry(node,'errors');if(truth(node,'success')&&(!errors||errors.type!=='array'||!errors.items.length)){add(path,code||'SUCCESS_FALSE',message||'Record reports success:false',status,ref);evidence=true}
  let bodyEvidence=false;for(const[key,child]of node.entries){const found=walk(child,path+'/'+__studio33.jsonPointerSegment(key),{status,ref});if(key==='body')bodyEvidence=found;evidence=found||evidence}
  const body=entry(node,'body');if(status>=400&&body&&!bodyEvidence){add(path,'HTTP_'+status,body.type==='string'?body.value:__studio33.emitDeveloperJSON(body),status,ref);evidence=true}
  return evidence;
 }
 walk(root,'');if(httpStatus!==''){const status=Number(httpStatus);if(!Number.isInteger(status)||status<100||status>599)throw Error('HTTP status must be 100–599');if(status>=400&&!findings.length)add('','HTTP_'+status,'Top-level HTTP failure; inspect the supplied body.',status,'')}
 for(const f of findings)groups[f.code]=(groups[f.code]||0)+1;
 const failedRecords=[];for(const path of failedPaths){if(failedRecords.length>=1000){omitted=true;break}const json=__studio33.emitDeveloperJSON(__studio33.nodeAtJSONPointer(root,path),'  ');if(failedRecordUnits+json.length>2097152){omitted=true;continue}failedRecordUnits+=json.length;failedRecords.push({path,json})}
 return {findings,groups,failedRecords,truncated:omitted,notice:'Recognized response evidence only. A 200 envelope can contain failed subrequests; no findings does not prove success. Original numeric tokens remain unchanged.'+(omitted?' Report limits were reached: messages or failed-record extracts were shortened/omitted. Inspect the original response for complete data.':'')};
}),"function analyzeAPIResponse(source,httpStatus=''){\n const root=strictJSON(source),findings=[],failedPaths=new Set(),seen=new Set(),groups=Object.create(null);\n let nodes=0,omitted=false,failedRecordUnits=0;\n const entry=(node,key)=>node?.type==='object'?node.entries.find(x=>x[0]===key)?.[1]:null,\n primitive=node=>node?.type==='string'||node?.type==='boolean'?node.value:node?.type==='number'?node.raw:null,\n statusValue=node=>node?.type==='number'&&/^[1-5]\\d\\d$/.test(node.raw)?Number(node.raw):null,\n truth=(node,key)=>entry(node,key)?.type==='boolean'&&entry(node,key).value===false;\n function add(path,code,message,status,ref,fields){\n  code=String(code||'HTTP_ERROR').slice(0,200);message=String(message||'No message provided');const identity=JSON.stringify([path,code,message]);\n  if(seen.has(identity))return;seen.add(identity);if(findings.length>=1000){omitted=true;return}\n  const shortened=message.slice(0,2000);if(shortened.length<message.length)omitted=true;\n  findings.push({path,code,message:shortened+(shortened.length<message.length?' … [message shortened]':''),status,\n   referenceId:String(ref||'').slice(0,200),fields:fields?.type==='array'?fields.items.slice(0,50).map(x=>String(primitive(x)??'').slice(0,200)):[],\n   suggestion:(Object.hasOwn(responseAdvice,code)?responseAdvice[code]:null)||'Inspect the response body, status and corresponding request; this code has no built-in explanation.'});\n }\n function walk(node,path,context={}){\n  if(++nodes>100000)throw Error('Response exceeds 100,000 inspected values');\n  if(node.type==='array'){let evidence=false;node.items.forEach((child,i)=>{evidence=walk(child,path+'/'+i,context)||evidence});return evidence}\n  if(node.type!=='object')return false;\n  const ownStatus=entry(node,'httpStatusCode')||entry(node,'statusCode'),status=statusValue(ownStatus)??context.status??null,\n  ref=primitive(entry(node,'referenceId'))??context.ref??'',code=primitive(entry(node,'errorCode'))||(entry(node,'statusCode')?.type==='string'?primitive(entry(node,'statusCode')):null),\n  message=primitive(entry(node,'message')),failed=truth(node,'success')||truth(node,'isSuccessful')||statusValue(entry(node,'httpStatusCode'))>=400;\n  if(failed)failedPaths.add(path);\n  let evidence=false;if(code&&message){add(path,code,message,status,ref,entry(node,'fields'));evidence=true}\n  if(truth(node,'isSuccessful')){add(path,'GRAPH_FAILED','Graph reports isSuccessful:false; inspect child failures and rollback.',status,ref);evidence=true}\n  const errors=entry(node,'errors');if(truth(node,'success')&&(!errors||errors.type!=='array'||!errors.items.length)){add(path,code||'SUCCESS_FALSE',message||'Record reports success:false',status,ref);evidence=true}\n  let bodyEvidence=false;for(const[key,child]of node.entries){const found=walk(child,path+'/'+jsonPointerSegment(key),{status,ref});if(key==='body')bodyEvidence=found;evidence=found||evidence}\n  const body=entry(node,'body');if(status>=400&&body&&!bodyEvidence){add(path,'HTTP_'+status,body.type==='string'?body.value:emitDeveloperJSON(body),status,ref);evidence=true}\n  return evidence;\n }\n walk(root,'');if(httpStatus!==''){const status=Number(httpStatus);if(!Number.isInteger(status)||status<100||status>599)throw Error('HTTP status must be 100–599');if(status>=400&&!findings.length)add('','HTTP_'+status,'Top-level HTTP failure; inspect the supplied body.',status,'')}\n for(const f of findings)groups[f.code]=(groups[f.code]||0)+1;\n const failedRecords=[];for(const path of failedPaths){if(failedRecords.length>=1000){omitted=true;break}const json=emitDeveloperJSON(nodeAtJSONPointer(root,path),'  ');if(failedRecordUnits+json.length>2097152){omitted=true;continue}failedRecordUnits+=json.length;failedRecords.push({path,json})}\n return {findings,groups,failedRecords,truncated:omitted,notice:'Recognized response evidence only. A 200 envelope can contain failed subrequests; no findings does not prove success. Original numeric tokens remain unchanged.'+(omitted?' Report limits were reached: messages or failed-record extracts were shortened/omitted. Inspect the original response for complete data.':'')};\n}","analyzeAPIResponse");

__studio33.mapJSONPayload = __studio33.$fn((function mapJSONPayload(source,rulesSource,each=false){const root=__studio33.strictJSON(source),rules=__studio33.ordinaryJSON(rulesSource);if(!Array.isArray(rules)||!rules.length||rules.length>100)throw Error('Use 1–100 mapping rules');const paths=[];for(const rule of rules){if(!rule||typeof rule.from!=='string'||typeof rule.to!=='string')throw Error('Each rule needs from/to JSON Pointers');if(rule.from)__studio33.pointerParts(rule.from);__studio33.pointerParts(rule.to);if(!['copy','string','number','boolean'].includes(rule.type||'copy'))throw Error('Unknown conversion');if(rule.required!==undefined&&typeof rule.required!=='boolean')throw Error('required must be boolean');if(paths.some(path=>path===rule.to||path.startsWith(rule.to+'/')||rule.to.startsWith(path+'/')))throw Error('Target paths overlap');paths.push(rule.to)}const ruleAST=__studio33.strictJSON(rulesSource),warnings=[];const inputs=each?(root.type==='array'?root.items:(()=>{throw Error('Map each record requires an array')})()):[root];if(inputs.length>1000)throw Error('Map up to 1,000 records');let estimatedUnits=0;const outputs=inputs.map(__studio33.$fn((input,index)=>{const out={type:'object',entries:[]};rules.forEach(__studio33.$fn((rule,ri)=>{let value;try{value=__studio33.nodeAtJSONPointer(input,rule.from)}catch{const def=ruleAST.items[ri].entries.find(x=>x[0]==='default');if(def)value=def[1];else if(rule.required)throw Error('Missing required source '+rule.from+' in record '+(index+1));else{if(warnings.length<200)warnings.push('Record '+(index+1)+': omitted missing '+rule.from);return}}const type=rule.type||'copy';if(type==='string')value={type:'string',value:value.type==='string'?value.value:__studio33.emitDeveloperJSON(value)};if(type==='number'){const raw=value.type==='number'?value.raw:value.type==='string'?value.value.trim():'';if(!/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(raw))throw Error('Cannot convert '+rule.from+' to a number');value={type:'number',raw}}if(type==='boolean'){if(value.type==='string'&&['true','false'].includes(value.value.trim().toLowerCase()))value={type:'boolean',value:value.value.trim().toLowerCase()==='true'};else if(value.type!=='boolean')throw Error('Boolean conversion accepts true/false only: '+rule.from)}estimatedUnits+=__studio33.emitDeveloperJSON(value).length+rule.to.length+20;if(estimatedUnits>8388608)throw Error('Mapped output exceeds 8 Mi units');__studio33.setJSONPath(out,rule.to,__studio33.jsonClone(value))},"(rule,ri)=>{let value;try{value=nodeAtJSONPointer(input,rule.from)}catch{const def=ruleAST.items[ri].entries.find(x=>x[0]==='default');if(def)value=def[1];else if(rule.required)throw Error('Missing required source '+rule.from+' in record '+(index+1));else{if(warnings.length<200)warnings.push('Record '+(index+1)+': omitted missing '+rule.from);return}}const type=rule.type||'copy';if(type==='string')value={type:'string',value:value.type==='string'?value.value:emitDeveloperJSON(value)};if(type==='number'){const raw=value.type==='number'?value.raw:value.type==='string'?value.value.trim():'';if(!/^-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$/.test(raw))throw Error('Cannot convert '+rule.from+' to a number');value={type:'number',raw}}if(type==='boolean'){if(value.type==='string'&&['true','false'].includes(value.value.trim().toLowerCase()))value={type:'boolean',value:value.value.trim().toLowerCase()==='true'};else if(value.type!=='boolean')throw Error('Boolean conversion accepts true/false only: '+rule.from)}estimatedUnits+=emitDeveloperJSON(value).length+rule.to.length+20;if(estimatedUnits>8388608)throw Error('Mapped output exceeds 8 Mi units');setJSONPath(out,rule.to,jsonClone(value))}",""));return out},"(input,index)=>{const out={type:'object',entries:[]};rules.forEach((rule,ri)=>{let value;try{value=nodeAtJSONPointer(input,rule.from)}catch{const def=ruleAST.items[ri].entries.find(x=>x[0]==='default');if(def)value=def[1];else if(rule.required)throw Error('Missing required source '+rule.from+' in record '+(index+1));else{if(warnings.length<200)warnings.push('Record '+(index+1)+': omitted missing '+rule.from);return}}const type=rule.type||'copy';if(type==='string')value={type:'string',value:value.type==='string'?value.value:emitDeveloperJSON(value)};if(type==='number'){const raw=value.type==='number'?value.raw:value.type==='string'?value.value.trim():'';if(!/^-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$/.test(raw))throw Error('Cannot convert '+rule.from+' to a number');value={type:'number',raw}}if(type==='boolean'){if(value.type==='string'&&['true','false'].includes(value.value.trim().toLowerCase()))value={type:'boolean',value:value.value.trim().toLowerCase()==='true'};else if(value.type!=='boolean')throw Error('Boolean conversion accepts true/false only: '+rule.from)}estimatedUnits+=emitDeveloperJSON(value).length+rule.to.length+20;if(estimatedUnits>8388608)throw Error('Mapped output exceeds 8 Mi units');setJSONPath(out,rule.to,jsonClone(value))});return out}",""));const text=__studio33.emitDeveloperJSON(each?{type:'array',items:outputs}:outputs[0],'  ');if(text.length>8388608)throw Error('Mapped output exceeds 8 Mi units');return {text,warnings,records:inputs.length,notice:'Mapped '+inputs.length+' record(s). Missing optional fields are omitted; review warnings. Numeric tokens are preserved.'}}),"function mapJSONPayload(source,rulesSource,each=false){const root=strictJSON(source),rules=ordinaryJSON(rulesSource);if(!Array.isArray(rules)||!rules.length||rules.length>100)throw Error('Use 1–100 mapping rules');const paths=[];for(const rule of rules){if(!rule||typeof rule.from!=='string'||typeof rule.to!=='string')throw Error('Each rule needs from/to JSON Pointers');if(rule.from)pointerParts(rule.from);pointerParts(rule.to);if(!['copy','string','number','boolean'].includes(rule.type||'copy'))throw Error('Unknown conversion');if(rule.required!==undefined&&typeof rule.required!=='boolean')throw Error('required must be boolean');if(paths.some(path=>path===rule.to||path.startsWith(rule.to+'/')||rule.to.startsWith(path+'/')))throw Error('Target paths overlap');paths.push(rule.to)}const ruleAST=strictJSON(rulesSource),warnings=[];const inputs=each?(root.type==='array'?root.items:(()=>{throw Error('Map each record requires an array')})()):[root];if(inputs.length>1000)throw Error('Map up to 1,000 records');let estimatedUnits=0;const outputs=inputs.map((input,index)=>{const out={type:'object',entries:[]};rules.forEach((rule,ri)=>{let value;try{value=nodeAtJSONPointer(input,rule.from)}catch{const def=ruleAST.items[ri].entries.find(x=>x[0]==='default');if(def)value=def[1];else if(rule.required)throw Error('Missing required source '+rule.from+' in record '+(index+1));else{if(warnings.length<200)warnings.push('Record '+(index+1)+': omitted missing '+rule.from);return}}const type=rule.type||'copy';if(type==='string')value={type:'string',value:value.type==='string'?value.value:emitDeveloperJSON(value)};if(type==='number'){const raw=value.type==='number'?value.raw:value.type==='string'?value.value.trim():'';if(!/^-?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?$/.test(raw))throw Error('Cannot convert '+rule.from+' to a number');value={type:'number',raw}}if(type==='boolean'){if(value.type==='string'&&['true','false'].includes(value.value.trim().toLowerCase()))value={type:'boolean',value:value.value.trim().toLowerCase()==='true'};else if(value.type!=='boolean')throw Error('Boolean conversion accepts true/false only: '+rule.from)}estimatedUnits+=emitDeveloperJSON(value).length+rule.to.length+20;if(estimatedUnits>8388608)throw Error('Mapped output exceeds 8 Mi units');setJSONPath(out,rule.to,jsonClone(value))});return out});const text=emitDeveloperJSON(each?{type:'array',items:outputs}:outputs[0],'  ');if(text.length>8388608)throw Error('Mapped output exceeds 8 Mi units');return {text,warnings,records:inputs.length,notice:'Mapped '+inputs.length+' record(s). Missing optional fields are omitted; review warnings. Numeric tokens are preserved.'}}","mapJSONPayload");

__studio33.compareExactJSONNumbers = __studio33.$fn((function compareExactJSONNumbers(a,b){function parts(raw){const n=__studio33.normalizedJSONNumber(raw);if(n==='0')return {sign:0,digits:'0',magnitude:0n};const sign=n[0]==='-'?-1:1;const [digits,exponent]=(sign<0?n.slice(1):n).split('e');return {sign,digits,magnitude:BigInt(digits.length)+BigInt(exponent)}}const x=parts(a),y=parts(b);if(x.sign!==y.sign)return x.sign<y.sign?-1:1;if(!x.sign)return 0;let order;if(x.magnitude!==y.magnitude)order=x.magnitude<y.magnitude?-1:1;else{const length=Math.max(x.digits.length,y.digits.length),u=x.digits.padEnd(length,'0'),v=y.digits.padEnd(length,'0');order=u===v?0:u<v?-1:1}return order*x.sign}),"function compareExactJSONNumbers(a,b){function parts(raw){const n=normalizedJSONNumber(raw);if(n==='0')return {sign:0,digits:'0',magnitude:0n};const sign=n[0]==='-'?-1:1;const [digits,exponent]=(sign<0?n.slice(1):n).split('e');return {sign,digits,magnitude:BigInt(digits.length)+BigInt(exponent)}}const x=parts(a),y=parts(b);if(x.sign!==y.sign)return x.sign<y.sign?-1:1;if(!x.sign)return 0;let order;if(x.magnitude!==y.magnitude)order=x.magnitude<y.magnitude?-1:1;else{const length=Math.max(x.digits.length,y.digits.length),u=x.digits.padEnd(length,'0'),v=y.digits.padEnd(length,'0');order=u===v?0:u<v?-1:1}return order*x.sign}","compareExactJSONNumbers");

__studio33.queryJSONPath = __studio33.$fn((function queryJSONPath(source,expression){function quotedValue(text){let result='';for(let j=1;j<text.length-1;j++){let c=text[j];if(c.charCodeAt(0)<32)throw Error('Control characters must be escaped in quoted paths');if(c!=='\\'){result+=c;continue}const escape=text[++j],simple={n:'\n',r:'\r',t:'\t',b:'\b',f:'\f',"'":"'",'"':'"','\\':'\\','/':'/'};if(Object.hasOwn(simple,escape)){result+=simple[escape];continue}if(escape==='u'&&/^[0-9a-fA-F]{4}$/.test(text.slice(j+1,j+5))){result+=String.fromCharCode(parseInt(text.slice(j+1,j+5),16));j+=4}else throw Error('Invalid quoted path escape')}return result}const root=__studio33.strictJSON(source);if(expression.length>2000||!expression.startsWith('$'))throw Error('JSONPath must start with $ (up to 2,000 units)');let i=1,steps=[];while(i<expression.length){const rest=expression.slice(i);let m;if((m=rest.match(/^\.\.([A-Za-z_$][\w$]*|\*)/))){steps.push({type:'recursive',key:m[1]});i+=m[0].length}else if((m=rest.match(/^\.([A-Za-z_$][\w$]*|\*)/))){steps.push({type:m[1]==='*'?'wildcard':'key',key:m[1]});i+=m[0].length}else if((m=rest.match(/^\[(\d+|\*)\]/))){steps.push({type:m[1]==='*'?'wildcard':'index',key:m[1]});i+=m[0].length}else if((m=rest.match(/^\[('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")\]/))){let key;if(m[1][0]==='"')key=JSON.parse(m[1]);else key=quotedValue(m[1]);steps.push({type:'key',key});i+=m[0].length}else if(rest.startsWith('[?(')){let end=-1,quote=null,escaped=false;for(let at=3;at<rest.length;at++){const c=rest[at];if(quote){if(escaped){escaped=false;continue}if(c==='\\'){escaped=true;continue}if(c===quote)quote=null}else if(c==='\"'||c==="'")quote=c;else if(c===')'&&rest[at+1]===']'){end=at;break}}if(end<0)throw Error('Unclosed filter');const filter=rest.slice(3,end),f=filter.match(/^@\.([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\s*(?:(==|!=|>=|<=|>|<)\s*(.+))?$/);if(!f)throw Error('Use @.field or @.field <operator> JSON primitive filters');let literal=null;if(f[2]){const text=f[3].trim();if(text[0]==="'"&&!/^'(?:\\.|[^'\\])*'$/.test(text))throw Error('Unclosed or invalid quoted filter string');literal=__studio33.strictJSON(text[0]==="'"?JSON.stringify(quotedValue(text)):text);if(['object','array'].includes(literal.type))throw Error('Filter literal must be a primitive')}steps.push({type:'filter',parts:f[1].split('.'),operator:f[2],literal});i+=end+2}else throw Error('Unsupported JSONPath near '+rest.slice(0,60));if(steps.length>100)throw Error('JSONPath supports up to 100 segments')}let matches=[{node:root,path:''}],work=0;const children=__studio33.$fn(x=>__studio33.nodeChildren(x.node).map(__studio33.$fn(([key,node])=>({node,path:x.path+'/'+__studio33.jsonPointerSegment(key),key}),"([key,node])=>({node,path:x.path+'/'+jsonPointerSegment(key),key})","")),"x=>nodeChildren(x.node).map(([key,node])=>({node,path:x.path+'/'+jsonPointerSegment(key),key}))","children");for(const step of steps){const next=[];function add(x){if(next.length>=1000)throw Error('Query exceeds 1,000 matches; narrow it');next.push(x)}for(const x of matches){if(++work>200000)throw Error('Query exceeds inspection budget');if(step.type==='recursive'){const stack=[x];while(stack.length){const parent=stack.pop();const rows=children(parent);for(const c of rows){if(++work>200000)throw Error('Query exceeds inspection budget');if(step.key==='*'||c.key===step.key)add(c)}for(let j=rows.length-1;j>=0;j--)if(['object','array'].includes(rows[j].node.type))stack.push(rows[j])}}else if(step.type==='wildcard')children(x).forEach(add);else if(step.type==='key'||step.type==='index'){if(step.type==='index'&&x.node.type!=='array')continue;children(x).filter(c=>c.key===step.key).forEach(add)}else for(const c of children(x)){let value;try{value=__studio33.nodeAtJSONPointer(c.node,'/'+step.parts.map(__studio33.jsonPointerSegment).join('/'))}catch{continue}let pass=!step.operator;if(step.operator){const a=value,b=step.literal;if(a.type!==b.type)pass=step.operator==='!=';else if(a.type==='number'){const order=__studio33.compareExactJSONNumbers(a.raw,b.raw);pass={'==':order===0,'!=':order!==0,'>':order>0,'<':order<0,'>=':order>=0,'<=':order<=0}[step.operator]}else if(['==','!='].includes(step.operator))pass=(a.value===b.value)===(step.operator==='==');else if(a.type==='string')pass={'>':a.value>b.value,'<':a.value<b.value,'>=':a.value>=b.value,'<=':a.value<=b.value}[step.operator];else pass=false}if(pass)add(c)}}matches=next}return {text:__studio33.emitDeveloperJSON({type:'array',items:matches.map(x=>x.node)},'  '),paths:matches.map(x=>x.path),count:matches.length,notice:'Safe supported JSONPath subset; no scripts/eval. Values retain numeric precision; numeric comparisons use exact decimal tokens.'}}),"function queryJSONPath(source,expression){function quotedValue(text){let result='';for(let j=1;j<text.length-1;j++){let c=text[j];if(c.charCodeAt(0)<32)throw Error('Control characters must be escaped in quoted paths');if(c!=='\\\\'){result+=c;continue}const escape=text[++j],simple={n:'\\n',r:'\\r',t:'\\t',b:'\\b',f:'\\f',\"'\":\"'\",'\"':'\"','\\\\':'\\\\','/':'/'};if(Object.hasOwn(simple,escape)){result+=simple[escape];continue}if(escape==='u'&&/^[0-9a-fA-F]{4}$/.test(text.slice(j+1,j+5))){result+=String.fromCharCode(parseInt(text.slice(j+1,j+5),16));j+=4}else throw Error('Invalid quoted path escape')}return result}const root=strictJSON(source);if(expression.length>2000||!expression.startsWith('$'))throw Error('JSONPath must start with $ (up to 2,000 units)');let i=1,steps=[];while(i<expression.length){const rest=expression.slice(i);let m;if((m=rest.match(/^\\.\\.([A-Za-z_$][\\w$]*|\\*)/))){steps.push({type:'recursive',key:m[1]});i+=m[0].length}else if((m=rest.match(/^\\.([A-Za-z_$][\\w$]*|\\*)/))){steps.push({type:m[1]==='*'?'wildcard':'key',key:m[1]});i+=m[0].length}else if((m=rest.match(/^\\[(\\d+|\\*)\\]/))){steps.push({type:m[1]==='*'?'wildcard':'index',key:m[1]});i+=m[0].length}else if((m=rest.match(/^\\[('(?:\\\\.|[^'\\\\])*'|\"(?:\\\\.|[^\"\\\\])*\")\\]/))){let key;if(m[1][0]==='\"')key=JSON.parse(m[1]);else key=quotedValue(m[1]);steps.push({type:'key',key});i+=m[0].length}else if(rest.startsWith('[?(')){let end=-1,quote=null,escaped=false;for(let at=3;at<rest.length;at++){const c=rest[at];if(quote){if(escaped){escaped=false;continue}if(c==='\\\\'){escaped=true;continue}if(c===quote)quote=null}else if(c==='\\\"'||c===\"'\")quote=c;else if(c===')'&&rest[at+1]===']'){end=at;break}}if(end<0)throw Error('Unclosed filter');const filter=rest.slice(3,end),f=filter.match(/^@\\.([A-Za-z_$][\\w$]*(?:\\.[A-Za-z_$][\\w$]*)*)\\s*(?:(==|!=|>=|<=|>|<)\\s*(.+))?$/);if(!f)throw Error('Use @.field or @.field <operator> JSON primitive filters');let literal=null;if(f[2]){const text=f[3].trim();if(text[0]===\"'\"&&!/^'(?:\\\\.|[^'\\\\])*'$/.test(text))throw Error('Unclosed or invalid quoted filter string');literal=strictJSON(text[0]===\"'\"?JSON.stringify(quotedValue(text)):text);if(['object','array'].includes(literal.type))throw Error('Filter literal must be a primitive')}steps.push({type:'filter',parts:f[1].split('.'),operator:f[2],literal});i+=end+2}else throw Error('Unsupported JSONPath near '+rest.slice(0,60));if(steps.length>100)throw Error('JSONPath supports up to 100 segments')}let matches=[{node:root,path:''}],work=0;const children=x=>nodeChildren(x.node).map(([key,node])=>({node,path:x.path+'/'+jsonPointerSegment(key),key}));for(const step of steps){const next=[];function add(x){if(next.length>=1000)throw Error('Query exceeds 1,000 matches; narrow it');next.push(x)}for(const x of matches){if(++work>200000)throw Error('Query exceeds inspection budget');if(step.type==='recursive'){const stack=[x];while(stack.length){const parent=stack.pop();const rows=children(parent);for(const c of rows){if(++work>200000)throw Error('Query exceeds inspection budget');if(step.key==='*'||c.key===step.key)add(c)}for(let j=rows.length-1;j>=0;j--)if(['object','array'].includes(rows[j].node.type))stack.push(rows[j])}}else if(step.type==='wildcard')children(x).forEach(add);else if(step.type==='key'||step.type==='index'){if(step.type==='index'&&x.node.type!=='array')continue;children(x).filter(c=>c.key===step.key).forEach(add)}else for(const c of children(x)){let value;try{value=nodeAtJSONPointer(c.node,'/'+step.parts.map(jsonPointerSegment).join('/'))}catch{continue}let pass=!step.operator;if(step.operator){const a=value,b=step.literal;if(a.type!==b.type)pass=step.operator==='!=';else if(a.type==='number'){const order=compareExactJSONNumbers(a.raw,b.raw);pass={'==':order===0,'!=':order!==0,'>':order>0,'<':order<0,'>=':order>=0,'<=':order<=0}[step.operator]}else if(['==','!='].includes(step.operator))pass=(a.value===b.value)===(step.operator==='==');else if(a.type==='string')pass={'>':a.value>b.value,'<':a.value<b.value,'>=':a.value>=b.value,'<=':a.value<=b.value}[step.operator];else pass=false}if(pass)add(c)}}matches=next}return {text:emitDeveloperJSON({type:'array',items:matches.map(x=>x.node)},'  '),paths:matches.map(x=>x.path),count:matches.length,notice:'Safe supported JSONPath subset; no scripts/eval. Values retain numeric precision; numeric comparisons use exact decimal tokens.'}}","queryJSONPath");

__studio33.parseSafeXML = (function parseSafeXML(source){if(typeof DOMParser!=='function')throw Error('XML parsing needs a current browser');if(!source.trim()||source.length>524288)throw Error('Enter XML up to 524,288 text units');if(/<!DOCTYPE|<!ENTITY/i.test(source))throw Error('DTD/entity declarations are not supported');const doc=new DOMParser().parseFromString(source,'application/xml');if(doc.getElementsByTagNameNS('http://www.mozilla.org/newlayout/xml/parsererror.xml','parsererror').length||doc.getElementsByTagNameNS('http://www.w3.org/1999/xhtml','parsererror').length)throw Error('XML is not well-formed');let count=0;const stack=[doc];while(stack.length){const node=stack.pop();if(++count>20000)throw Error('XML supports up to 20,000 nodes');stack.push(...node.childNodes)}return {doc,count}});

__studio33.formatXML = __studio33.$fn((function formatXML(source){const {doc,count}=__studio33.parseSafeXML(source),serialize=node=>new XMLSerializer().serializeToString(node);function render(node,depth,preserve=false){if(node.nodeType!==1)return serialize(node);const own=node.getAttributeNS('http://www.w3.org/XML/1998/namespace','space');preserve=own==='preserve'||own!=='default'&&preserve;const mixed=[...node.childNodes].some(c=>(c.nodeType===3&&c.nodeValue.trim())||c.nodeType===4);if(preserve||mixed||!node.children.length)return serialize(node);const shallow=node.cloneNode(false),opening=serialize(shallow).replace(/\s*\/>$/,'>');const children=[...node.childNodes].filter(c=>c.nodeType!==3||c.nodeValue.trim());return opening+'\n'+children.map(c=>'  '.repeat(depth+1)+render(c,depth+1,preserve)).join('\n')+'\n'+'  '.repeat(depth)+'</'+node.nodeName+'>'}return {text:[...doc.childNodes].filter(n=>n.nodeType!==3||n.nodeValue.trim()).map(n=>render(n,0)).join('\n'),count,notice:'Well-formed XML. Mixed content and xml:space=preserve are retained; element-only whitespace is formatted. DTD/entities are rejected.'}}),"function formatXML(source){const {doc,count}=parseSafeXML(source),serialize=node=>new XMLSerializer().serializeToString(node);function render(node,depth,preserve=false){if(node.nodeType!==1)return serialize(node);const own=node.getAttributeNS('http://www.w3.org/XML/1998/namespace','space');preserve=own==='preserve'||own!=='default'&&preserve;const mixed=[...node.childNodes].some(c=>(c.nodeType===3&&c.nodeValue.trim())||c.nodeType===4);if(preserve||mixed||!node.children.length)return serialize(node);const shallow=node.cloneNode(false),opening=serialize(shallow).replace(/\\s*\\/>$/,'>');const children=[...node.childNodes].filter(c=>c.nodeType!==3||c.nodeValue.trim());return opening+'\\n'+children.map(c=>'  '.repeat(depth+1)+render(c,depth+1,preserve)).join('\\n')+'\\n'+'  '.repeat(depth)+'</'+node.nodeName+'>'}return {text:[...doc.childNodes].filter(n=>n.nodeType!==3||n.nodeValue.trim()).map(n=>render(n,0)).join('\\n'),count,notice:'Well-formed XML. Mixed content and xml:space=preserve are retained; element-only whitespace is formatted. DTD/entities are rejected.'}}","formatXML");

__studio33.compareXML = __studio33.$fn((function compareXML(left,right,ignoreIndent=true){const a=__studio33.parseSafeXML(left),b=__studio33.parseSafeXML(right);function model(n,preserve=false){if(n.nodeType===1){const own=n.getAttributeNS('http://www.w3.org/XML/1998/namespace','space');preserve=own==='preserve'||own!=='default'&&preserve;const mixed=[...n.childNodes].some(c=>(c.nodeType===3&&c.nodeValue.trim())||c.nodeType===4);return {element:n.nodeName,namespace:n.namespaceURI||'',attributes:[...n.attributes].map(a=>[a.name,a.value]).sort((a,b)=>a[0].localeCompare(b[0])),children:[...n.childNodes].filter(c=>!(ignoreIndent&&!preserve&&!mixed&&c.nodeType===3&&!c.nodeValue.trim())).map(c=>model(c,preserve))}}return {type:n.nodeType,value:n.nodeValue||n.nodeName}}const leftRoot=__studio33.strictJSON(JSON.stringify([...a.doc.childNodes].filter(n=>n.nodeType!==3||n.nodeValue.trim()).map(n=>model(n)))),rightRoot=__studio33.strictJSON(JSON.stringify([...b.doc.childNodes].filter(n=>n.nodeType!==3||n.nodeValue.trim()).map(n=>model(n))));const result=__studio33.compareDeveloperJSON(__studio33.emitDeveloperJSON(leftRoot),__studio33.emitDeveloperJSON(rightRoot));return {text:__studio33.jsonDiffReport(result),notice:'Structural XML comparison; attribute order ignored. Child order, namespaces/prefixes, comments and mixed text remain significant.'}}),"function compareXML(left,right,ignoreIndent=true){const a=parseSafeXML(left),b=parseSafeXML(right);function model(n,preserve=false){if(n.nodeType===1){const own=n.getAttributeNS('http://www.w3.org/XML/1998/namespace','space');preserve=own==='preserve'||own!=='default'&&preserve;const mixed=[...n.childNodes].some(c=>(c.nodeType===3&&c.nodeValue.trim())||c.nodeType===4);return {element:n.nodeName,namespace:n.namespaceURI||'',attributes:[...n.attributes].map(a=>[a.name,a.value]).sort((a,b)=>a[0].localeCompare(b[0])),children:[...n.childNodes].filter(c=>!(ignoreIndent&&!preserve&&!mixed&&c.nodeType===3&&!c.nodeValue.trim())).map(c=>model(c,preserve))}}return {type:n.nodeType,value:n.nodeValue||n.nodeName}}const leftRoot=strictJSON(JSON.stringify([...a.doc.childNodes].filter(n=>n.nodeType!==3||n.nodeValue.trim()).map(n=>model(n)))),rightRoot=strictJSON(JSON.stringify([...b.doc.childNodes].filter(n=>n.nodeType!==3||n.nodeValue.trim()).map(n=>model(n))));const result=compareDeveloperJSON(emitDeveloperJSON(leftRoot),emitDeveloperJSON(rightRoot));return {text:jsonDiffReport(result),notice:'Structural XML comparison; attribute order ignored. Child order, namespaces/prefixes, comments and mixed text remain significant.'}}","compareXML");

__studio33.generateIntegrationTests = __studio33.$fn((function generateIntegrationTests(source,pathsText,boundsSource='{}'){const root=__studio33.strictJSON(source);if(root.type!=='object')throw Error('Baseline must be a JSON object');const paths=pathsText.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);if(!paths.length||paths.length>20)throw Error('Select 1–20 JSON Pointer fields');const bounds=__studio33.ordinaryJSON(boundsSource),cases=[{name:'Baseline',purpose:'Review against the actual integration contract',payload:__studio33.emitDeveloperJSON(root,'  ')}];let packUnits=cases[0].payload.length;function add(name,purpose,path,value,remove=false){const copy=__studio33.jsonClone(root);__studio33.setJSONPath(copy,path,value,remove);const payload=__studio33.emitDeveloperJSON(copy,'  ');packUnits+=payload.length+name.length+purpose.length+100;if(packUnits>8388608)throw Error('Test pack exceeds 8 Mi units; reduce inputs');cases.push({name,purpose,payload})}for(const path of paths){const field=__studio33.nodeAtJSONPointer(root,path);add('Missing '+path,'Check required-field handling; optional omissions may be valid.',path,null,true);add('Null '+path,'Check nullability and downstream null handling.',path,{type:'null',value:null});add('Wrong type '+path,'Check declared type validation.',path,field.type==='string'?{type:'object',entries:[]}:{type:'string',value:'INVALID_TYPE'});if(field.type==='string'){add('Empty '+path,'Check empty-string rules.',path,{type:'string',value:''});if(bounds[path]?.maxLength!==undefined){const length=Number(bounds[path].maxLength);if(!Number.isInteger(length)||length<0||length>10000)throw Error('maxLength must be 0–10,000');add('At maxLength '+path,'Review configured length boundary.',path,{type:'string',value:'X'.repeat(length)});add('Over maxLength '+path,'Check over-length handling.',path,{type:'string',value:'X'.repeat(length+1)})}}if(field.type==='number'){for(const key of ['min','max'])if(bounds[path]?.[key]!==undefined){const val=Number(bounds[path][key]),step=bounds[path].step===undefined?1:Number(bounds[path].step);if(!Number.isFinite(val)||!Number.isFinite(step)||step<=0||Math.abs(val)>1e12)throw Error('Use finite numeric bounds within ±1e12 and a positive step');add('At '+key+' '+path,'Review configured numeric boundary.',path,{type:'number',raw:String(val)});add('Beyond '+key+' '+path,'Review out-of-range handling; step uses floating-point arithmetic.',path,{type:'number',raw:String(val+(key==='min'?-step:step))})}}if(field.type==='array'&&field.items.length)add('Duplicate record '+path,'Check duplicate-record/idempotency handling.',path,{type:'array',items:[...field.items,__studio33.jsonClone(field.items[0])]})}const text=JSON.stringify({notice:'Candidate test payloads, not assertions of business validity. Expected outcomes depend on your contract. payload values are JSON document strings to preserve numeric tokens.',cases},null,2);if(text.length>8388608)throw Error('Test pack exceeds 8 Mi text units; reduce inputs');return {text,cases,count:cases.length,notice:cases.length+' candidate tests generated. Review purposes against your contract; no requests executed.'}}),"function generateIntegrationTests(source,pathsText,boundsSource='{}'){const root=strictJSON(source);if(root.type!=='object')throw Error('Baseline must be a JSON object');const paths=pathsText.split(/\\r?\\n/).map(x=>x.trim()).filter(Boolean);if(!paths.length||paths.length>20)throw Error('Select 1–20 JSON Pointer fields');const bounds=ordinaryJSON(boundsSource),cases=[{name:'Baseline',purpose:'Review against the actual integration contract',payload:emitDeveloperJSON(root,'  ')}];let packUnits=cases[0].payload.length;function add(name,purpose,path,value,remove=false){const copy=jsonClone(root);setJSONPath(copy,path,value,remove);const payload=emitDeveloperJSON(copy,'  ');packUnits+=payload.length+name.length+purpose.length+100;if(packUnits>8388608)throw Error('Test pack exceeds 8 Mi units; reduce inputs');cases.push({name,purpose,payload})}for(const path of paths){const field=nodeAtJSONPointer(root,path);add('Missing '+path,'Check required-field handling; optional omissions may be valid.',path,null,true);add('Null '+path,'Check nullability and downstream null handling.',path,{type:'null',value:null});add('Wrong type '+path,'Check declared type validation.',path,field.type==='string'?{type:'object',entries:[]}:{type:'string',value:'INVALID_TYPE'});if(field.type==='string'){add('Empty '+path,'Check empty-string rules.',path,{type:'string',value:''});if(bounds[path]?.maxLength!==undefined){const length=Number(bounds[path].maxLength);if(!Number.isInteger(length)||length<0||length>10000)throw Error('maxLength must be 0–10,000');add('At maxLength '+path,'Review configured length boundary.',path,{type:'string',value:'X'.repeat(length)});add('Over maxLength '+path,'Check over-length handling.',path,{type:'string',value:'X'.repeat(length+1)})}}if(field.type==='number'){for(const key of ['min','max'])if(bounds[path]?.[key]!==undefined){const val=Number(bounds[path][key]),step=bounds[path].step===undefined?1:Number(bounds[path].step);if(!Number.isFinite(val)||!Number.isFinite(step)||step<=0||Math.abs(val)>1e12)throw Error('Use finite numeric bounds within ±1e12 and a positive step');add('At '+key+' '+path,'Review configured numeric boundary.',path,{type:'number',raw:String(val)});add('Beyond '+key+' '+path,'Review out-of-range handling; step uses floating-point arithmetic.',path,{type:'number',raw:String(val+(key==='min'?-step:step))})}}if(field.type==='array'&&field.items.length)add('Duplicate record '+path,'Check duplicate-record/idempotency handling.',path,{type:'array',items:[...field.items,jsonClone(field.items[0])]})}const text=JSON.stringify({notice:'Candidate test payloads, not assertions of business validity. Expected outcomes depend on your contract. payload values are JSON document strings to preserve numeric tokens.',cases},null,2);if(text.length>8388608)throw Error('Test pack exceeds 8 Mi text units; reduce inputs');return {text,cases,count:cases.length,notice:cases.length+' candidate tests generated. Review purposes against your contract; no requests executed.'}}","generateIntegrationTests");

__studio33.businessDeadline = __studio33.$fn((function businessDeadline(startText,days,weekendsText,holidaysText,includeStart=false,direction=1){if(!Number.isInteger(days)||days<0||days>10000)throw Error('Business days must be 0–10,000');if(![1,-1].includes(direction))throw Error('Choose forward/backward');if(weekendsText.trim()&&!/^[0-6](?:\s*,\s*[0-6])*$/.test(weekendsText.trim()))throw Error('Use comma-separated weekdays 0–6');const start=__studio33.parseUTCDate(startText+'T00:00:00Z'),weekends=weekendsText.trim()?weekendsText.split(',').map(x=>Number(x.trim())):[];if(weekends.some(x=>!Number.isInteger(x)||x<0||x>6)||new Set(weekends).size===7)throw Error('Weekends use 0–6 and must leave at least one working weekday');const holidayLines=holidaysText.split(/[\r\n,]+/).map(x=>x.trim()).filter(Boolean);if(holidayLines.length>2000)throw Error('Use up to 2,000 holidays');const holidays=new Set(holidayLines.map(__studio33.$fn(x=>__studio33.parseUTCDate(x+'T00:00:00Z'),"x=>parseUTCDate(x+'T00:00:00Z')","")));const working=ms=>!weekends.includes(new Date(ms).getUTCDay())&&!holidays.has(ms);let current=start,remaining=days,scanned=0;const counted=[];if(days===0)return {date:startText,calendarDays:0,counted:[],notice:'Zero business days returns the starting calendar date.'};if(includeStart&&working(current)){remaining--;counted.push(new Date(current).toISOString().slice(0,10))}while(remaining){current+=direction*86400000;if(++scanned>100000)throw Error('Deadline exceeds search range');if(working(current)){remaining--;if(counted.length<200)counted.push(new Date(current).toISOString().slice(0,10))}}return {date:new Date(current).toISOString().slice(0,10),calendarDays:Math.abs((current-start)/86400000),counted,notice:days+' working days · '+holidays.size+' unique holidays. Date-only calendar arithmetic; no regional holiday service.'}}),"function businessDeadline(startText,days,weekendsText,holidaysText,includeStart=false,direction=1){if(!Number.isInteger(days)||days<0||days>10000)throw Error('Business days must be 0–10,000');if(![1,-1].includes(direction))throw Error('Choose forward/backward');if(weekendsText.trim()&&!/^[0-6](?:\\s*,\\s*[0-6])*$/.test(weekendsText.trim()))throw Error('Use comma-separated weekdays 0–6');const start=parseUTCDate(startText+'T00:00:00Z'),weekends=weekendsText.trim()?weekendsText.split(',').map(x=>Number(x.trim())):[];if(weekends.some(x=>!Number.isInteger(x)||x<0||x>6)||new Set(weekends).size===7)throw Error('Weekends use 0–6 and must leave at least one working weekday');const holidayLines=holidaysText.split(/[\\r\\n,]+/).map(x=>x.trim()).filter(Boolean);if(holidayLines.length>2000)throw Error('Use up to 2,000 holidays');const holidays=new Set(holidayLines.map(x=>parseUTCDate(x+'T00:00:00Z')));const working=ms=>!weekends.includes(new Date(ms).getUTCDay())&&!holidays.has(ms);let current=start,remaining=days,scanned=0;const counted=[];if(days===0)return {date:startText,calendarDays:0,counted:[],notice:'Zero business days returns the starting calendar date.'};if(includeStart&&working(current)){remaining--;counted.push(new Date(current).toISOString().slice(0,10))}while(remaining){current+=direction*86400000;if(++scanned>100000)throw Error('Deadline exceeds search range');if(working(current)){remaining--;if(counted.length<200)counted.push(new Date(current).toISOString().slice(0,10))}}return {date:new Date(current).toISOString().slice(0,10),calendarDays:Math.abs((current-start)/86400000),counted,notice:days+' working days · '+holidays.size+' unique holidays. Date-only calendar arithmetic; no regional holiday service.'}}","businessDeadline");

__studio33.decodeJWTBytes = (function decodeJWTBytes(segment){if(!/^[A-Za-z0-9_-]+$/.test(segment))throw Error('Invalid Base64URL');let binary;try{binary=atob(segment.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-segment.length%4)%4))}catch{throw Error('Invalid Base64URL')}if(btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')!==segment)throw Error('Noncanonical Base64URL');return Uint8Array.from(binary,c=>c.charCodeAt(0))});

__studio33.populateLogFilter = __studio33.$fn((function populateLogFilter(id,label,values){const select=__studio33.$(id),previous=select.value;select.replaceChildren();for(const value of ['',...new Set(values.filter(Boolean))].sort((a,b)=>a.localeCompare(b))){const option=document.createElement('option');option.value=value;option.textContent=value||label;select.append(option)}if([...select.options].some(x=>x.value===previous))select.value=previous;else select.value=''}),"function populateLogFilter(id,label,values){const select=$(id),previous=select.value;select.replaceChildren();for(const value of ['',...new Set(values.filter(Boolean))].sort((a,b)=>a.localeCompare(b))){const option=document.createElement('option');option.value=value;option.textContent=value||label;select.append(option)}if([...select.options].some(x=>x.value===previous))select.value=previous;else select.value=''}","populateLogFilter");

__studio33.boundedNumber = (function boundedNumber(value,label,min,max,integer=false){const n=Number(value);if(!['string','number'].includes(typeof value)||String(value).trim()===''||!Number.isFinite(n)||n<min||n>max||(integer&&!Number.isInteger(n)))throw Error(label+' must be '+(integer?'a whole number ':'')+'between '+min+' and '+max);return n});

__studio33.v9Currency = (function v9Currency(value){return Math.round(value*100)/100});

__studio33.solveLoanRate = __studio33.$fn((function solveLoanRate(principal,payment,months){principal=__studio33.boundedNumber(principal,'Loan amount',.01,1e12);payment=__studio33.boundedNumber(payment,'EMI',.01,1e12);months=__studio33.boundedNumber(months,'Tenure in months',1,1200,true);const zero=principal/months;if(payment<zero-1e-8)throw Error('EMI is below the zero-interest payment. No nonnegative rate fits these values.');if(Math.abs(payment-zero)<1e-8)return {monthlyRate:0,annualNominal:0,annualEffective:0,total:payment*months,interest:payment*months-principal};const emi=r=>principal*r/(-Math.expm1(-months*Math.log1p(r)));let lo=0,hi=.01;while(emi(hi)<payment&&hi<10000)hi*=2;if(emi(hi)<payment)throw Error('Rate exceeds the supported search range');for(let i=0;i<160;i++){const m=(lo+hi)/2;if(emi(m)>payment)hi=m;else lo=m}const r=(lo+hi)/2;return {monthlyRate:r*100,annualNominal:r*1200,annualEffective:Math.expm1(12*Math.log1p(r))*100,total:payment*months,interest:payment*months-principal}}),"function solveLoanRate(principal,payment,months){principal=boundedNumber(principal,'Loan amount',.01,1e12);payment=boundedNumber(payment,'EMI',.01,1e12);months=boundedNumber(months,'Tenure in months',1,1200,true);const zero=principal/months;if(payment<zero-1e-8)throw Error('EMI is below the zero-interest payment. No nonnegative rate fits these values.');if(Math.abs(payment-zero)<1e-8)return {monthlyRate:0,annualNominal:0,annualEffective:0,total:payment*months,interest:payment*months-principal};const emi=r=>principal*r/(-Math.expm1(-months*Math.log1p(r)));let lo=0,hi=.01;while(emi(hi)<payment&&hi<10000)hi*=2;if(emi(hi)<payment)throw Error('Rate exceeds the supported search range');for(let i=0;i<160;i++){const m=(lo+hi)/2;if(emi(m)>payment)hi=m;else lo=m}const r=(lo+hi)/2;return {monthlyRate:r*100,annualNominal:r*1200,annualEffective:Math.expm1(12*Math.log1p(r))*100,total:payment*months,interest:payment*months-principal}}","solveLoanRate");

__studio33.parseColor = __studio33.$fn((function parseColor(text){text=String(text).trim();let rgb;const hex=text.match(/^#?([\da-f]{3}|[\da-f]{6})$/i);if(hex){const h=hex[1].length===3?[...hex[1]].map(x=>x+x).join(''):hex[1];rgb=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}else{const r=text.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);const h=text.match(/^hsl\(\s*(-?[\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i);if(r)rgb=r.slice(1).map(__studio33.$fn(x=>__studio33.boundedNumber(x,'RGB channel',0,255,true),"x=>boundedNumber(x,'RGB channel',0,255,true)",""));else if(h){let hue=__studio33.boundedNumber(h[1],'Hue',-36000,36000),s=__studio33.boundedNumber(h[2],'Saturation',0,100)/100,l=__studio33.boundedNumber(h[3],'Lightness',0,100)/100;hue=((hue%360)+360)%360;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((hue/60)%2-1)),m=l-c/2;rgb=(hue<60?[c,x,0]:hue<120?[x,c,0]:hue<180?[0,c,x]:hue<240?[0,x,c]:hue<300?[x,0,c]:[c,0,x]).map(v=>Math.round((v+m)*255))}else throw Error('Use #RGB, #RRGGBB, rgb(0, 0, 0), or hsl(0, 0%, 0%)')}const [r,g,b]=rgb.map(x=>x/255),hi=Math.max(r,g,b),lo=Math.min(r,g,b),d=hi-lo,l=(hi+lo)/2;let hue=0;if(d)hue=(hi===r?((g-b)/d)%6:hi===g?(b-r)/d+2:(r-g)/d+4)*60;if(hue<0)hue+=360;const saturation=d?d/(1-Math.abs(2*l-1)):0;const luminance=rgb.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);return {rgb,hex:'#'+rgb.map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase(),hsl:[hue,saturation*100,l*100],luminance}}),"function parseColor(text){text=String(text).trim();let rgb;const hex=text.match(/^#?([\\da-f]{3}|[\\da-f]{6})$/i);if(hex){const h=hex[1].length===3?[...hex[1]].map(x=>x+x).join(''):hex[1];rgb=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}else{const r=text.match(/^rgb\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*\\)$/i);const h=text.match(/^hsl\\(\\s*(-?[\\d.]+)\\s*,\\s*([\\d.]+)%\\s*,\\s*([\\d.]+)%\\s*\\)$/i);if(r)rgb=r.slice(1).map(x=>boundedNumber(x,'RGB channel',0,255,true));else if(h){let hue=boundedNumber(h[1],'Hue',-36000,36000),s=boundedNumber(h[2],'Saturation',0,100)/100,l=boundedNumber(h[3],'Lightness',0,100)/100;hue=((hue%360)+360)%360;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((hue/60)%2-1)),m=l-c/2;rgb=(hue<60?[c,x,0]:hue<120?[x,c,0]:hue<180?[0,c,x]:hue<240?[0,x,c]:hue<300?[x,0,c]:[c,0,x]).map(v=>Math.round((v+m)*255))}else throw Error('Use #RGB, #RRGGBB, rgb(0, 0, 0), or hsl(0, 0%, 0%)')}const [r,g,b]=rgb.map(x=>x/255),hi=Math.max(r,g,b),lo=Math.min(r,g,b),d=hi-lo,l=(hi+lo)/2;let hue=0;if(d)hue=(hi===r?((g-b)/d)%6:hi===g?(b-r)/d+2:(r-g)/d+4)*60;if(hue<0)hue+=360;const saturation=d?d/(1-Math.abs(2*l-1)):0;const luminance=rgb.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);return {rgb,hex:'#'+rgb.map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase(),hsl:[hue,saturation*100,l*100],luminance}}","parseColor");

__studio33.colorContrast = __studio33.$fn((function colorContrast(fg,bg){const a=__studio33.parseColor(fg),b=__studio33.parseColor(bg),ratio=(Math.max(a.luminance,b.luminance)+.05)/(Math.min(a.luminance,b.luminance)+.05);return {foreground:a,background:b,ratio,AA:ratio>=4.5,largeAA:ratio>=3,AAA:ratio>=7,largeAAA:ratio>=4.5}}),"function colorContrast(fg,bg){const a=parseColor(fg),b=parseColor(bg),ratio=(Math.max(a.luminance,b.luminance)+.05)/(Math.min(a.luminance,b.luminance)+.05);return {foreground:a,background:b,ratio,AA:ratio>=4.5,largeAA:ratio>=3,AAA:ratio>=7,largeAAA:ratio>=4.5}}","colorContrast");

__studio33.weightedDecision = __studio33.$fn((function weightedDecision(data){if(!data||!Array.isArray(data.criteria)||!Array.isArray(data.options)||!data.criteria.length||!data.options.length||data.criteria.length>30||data.options.length>100)throw Error('Provide 1–30 criteria and 1–100 options');const criteria=data.criteria.map(__studio33.$fn(c=>{if(!c||typeof c.name!=='string'||!c.name.trim())throw Error('Every criterion needs a name');return {name:c.name.slice(0,100),weight:__studio33.boundedNumber(c.weight,'Weight',0,1e6)}},"c=>{if(!c||typeof c.name!=='string'||!c.name.trim())throw Error('Every criterion needs a name');return {name:c.name.slice(0,100),weight:boundedNumber(c.weight,'Weight',0,1e6)}}",""));const total=criteria.reduce((s,c)=>s+c.weight,0);if(!total)throw Error('At least one weight must be positive');const options=data.options.map(__studio33.$fn((o,index)=>{if(!o||typeof o.name!=='string'||!o.name.trim()||!Array.isArray(o.scores)||o.scores.length!==criteria.length)throw Error('Each option needs a name and one score per criterion');const scores=o.scores.map(__studio33.$fn(v=>__studio33.boundedNumber(v,'Score',0,10),"v=>boundedNumber(v,'Score',0,10)",""));return {name:o.name.slice(0,100),score:scores.reduce((s,v,i)=>s+v*criteria[i].weight,0)/total,scores,index}},"(o,index)=>{if(!o||typeof o.name!=='string'||!o.name.trim()||!Array.isArray(o.scores)||o.scores.length!==criteria.length)throw Error('Each option needs a name and one score per criterion');const scores=o.scores.map(v=>boundedNumber(v,'Score',0,10));return {name:o.name.slice(0,100),score:scores.reduce((s,v,i)=>s+v*criteria[i].weight,0)/total,scores,index}}","")).sort((a,b)=>b.score-a.score||a.index-b.index);return {criteria,options,totalWeight:total}}),"function weightedDecision(data){if(!data||!Array.isArray(data.criteria)||!Array.isArray(data.options)||!data.criteria.length||!data.options.length||data.criteria.length>30||data.options.length>100)throw Error('Provide 1–30 criteria and 1–100 options');const criteria=data.criteria.map(c=>{if(!c||typeof c.name!=='string'||!c.name.trim())throw Error('Every criterion needs a name');return {name:c.name.slice(0,100),weight:boundedNumber(c.weight,'Weight',0,1e6)}});const total=criteria.reduce((s,c)=>s+c.weight,0);if(!total)throw Error('At least one weight must be positive');const options=data.options.map((o,index)=>{if(!o||typeof o.name!=='string'||!o.name.trim()||!Array.isArray(o.scores)||o.scores.length!==criteria.length)throw Error('Each option needs a name and one score per criterion');const scores=o.scores.map(v=>boundedNumber(v,'Score',0,10));return {name:o.name.slice(0,100),score:scores.reduce((s,v,i)=>s+v*criteria[i].weight,0)/total,scores,index}}).sort((a,b)=>b.score-a.score||a.index-b.index);return {criteria,options,totalWeight:total}}","weightedDecision");

__studio33.splitExpenses = __studio33.$fn((function splitExpenses(data){if(!data||!Array.isArray(data.people)||!Array.isArray(data.expenses)||data.people.length<2||data.people.length>100||data.expenses.length>1000)throw Error('Provide 2–100 people and up to 1,000 expenses');const people=data.people.map(x=>{if(typeof x!=='string'||!x.trim()||x.length>100)throw Error('People need nonempty names of up to 100 characters');return x.trim()});if(new Set(people).size!==people.length)throw Error('Participant names must be unique');const balance=new Map(people.map(p=>[p,0])),entries=[];let total=0;function cents(value){if(typeof value!=='string'&&typeof value!=='number')throw Error('Amounts must be numbers or decimal strings');const m=String(value).match(/^(\d{1,9})(?:\.(\d{1,2}))?$/);if(!m)throw Error('Use nonnegative amounts with up to 2 decimal places');return Number(m[1])*100+Number((m[2]||'').padEnd(2,'0'))}for(const e of data.expenses){if(!e||!balance.has(e.paidBy))throw Error('Every paidBy must be a participant');const amount=cents(e.amount),shares=e.shares===undefined?Object.fromEntries(people.map(p=>[p,1])):e.shares;if(!shares||typeof shares!=='object'||Array.isArray(shares))throw Error('shares must map participant names to relative weights');const weights=Object.entries(shares).map(__studio33.$fn(([p,v])=>{if(!balance.has(p))throw Error('Unknown participant in shares: '+p);return {p,weight:__studio33.boundedNumber(v,'Share weight',0,1e6)}},"([p,v])=>{if(!balance.has(p))throw Error('Unknown participant in shares: '+p);return {p,weight:boundedNumber(v,'Share weight',0,1e6)}}",""));const denominator=weights.reduce((s,x)=>s+x.weight,0);if(!denominator)throw Error('At least one share must be positive');const allocated=weights.map((x,i)=>{const exact=amount*x.weight/denominator;return {...x,i,owed:Math.floor(exact),fraction:exact-Math.floor(exact)}});let spare=amount-allocated.reduce((s,x)=>s+x.owed,0);for(const x of [...allocated].sort((a,b)=>b.fraction-a.fraction||a.i-b.i)){if(!spare)break;x.owed++;spare--}balance.set(e.paidBy,balance.get(e.paidBy)+amount);for(const x of allocated)balance.set(x.p,balance.get(x.p)-x.owed);total+=amount;if(!Number.isSafeInteger(total))throw Error('Total is too large');entries.push({paidBy:e.paidBy,amount:amount/100,allocation:allocated.map(x=>({person:x.p,amount:x.owed/100}))})}const debtors=[...balance].filter(([,n])=>n<0).map(([p,n])=>({p,n:-n})),creditors=[...balance].filter(([,n])=>n>0).map(([p,n])=>({p,n})),settlements=[];let i=0,j=0;while(i<debtors.length&&j<creditors.length){const amount=Math.min(debtors[i].n,creditors[j].n);settlements.push({from:debtors[i].p,to:creditors[j].p,amount:amount/100});debtors[i].n-=amount;creditors[j].n-=amount;if(!debtors[i].n)i++;if(!creditors[j].n)j++}return {total:total/100,balances:[...balance].map(([person,n])=>({person,net:n/100})),settlements,entries}}),"function splitExpenses(data){if(!data||!Array.isArray(data.people)||!Array.isArray(data.expenses)||data.people.length<2||data.people.length>100||data.expenses.length>1000)throw Error('Provide 2–100 people and up to 1,000 expenses');const people=data.people.map(x=>{if(typeof x!=='string'||!x.trim()||x.length>100)throw Error('People need nonempty names of up to 100 characters');return x.trim()});if(new Set(people).size!==people.length)throw Error('Participant names must be unique');const balance=new Map(people.map(p=>[p,0])),entries=[];let total=0;function cents(value){if(typeof value!=='string'&&typeof value!=='number')throw Error('Amounts must be numbers or decimal strings');const m=String(value).match(/^(\\d{1,9})(?:\\.(\\d{1,2}))?$/);if(!m)throw Error('Use nonnegative amounts with up to 2 decimal places');return Number(m[1])*100+Number((m[2]||'').padEnd(2,'0'))}for(const e of data.expenses){if(!e||!balance.has(e.paidBy))throw Error('Every paidBy must be a participant');const amount=cents(e.amount),shares=e.shares===undefined?Object.fromEntries(people.map(p=>[p,1])):e.shares;if(!shares||typeof shares!=='object'||Array.isArray(shares))throw Error('shares must map participant names to relative weights');const weights=Object.entries(shares).map(([p,v])=>{if(!balance.has(p))throw Error('Unknown participant in shares: '+p);return {p,weight:boundedNumber(v,'Share weight',0,1e6)}});const denominator=weights.reduce((s,x)=>s+x.weight,0);if(!denominator)throw Error('At least one share must be positive');const allocated=weights.map((x,i)=>{const exact=amount*x.weight/denominator;return {...x,i,owed:Math.floor(exact),fraction:exact-Math.floor(exact)}});let spare=amount-allocated.reduce((s,x)=>s+x.owed,0);for(const x of [...allocated].sort((a,b)=>b.fraction-a.fraction||a.i-b.i)){if(!spare)break;x.owed++;spare--}balance.set(e.paidBy,balance.get(e.paidBy)+amount);for(const x of allocated)balance.set(x.p,balance.get(x.p)-x.owed);total+=amount;if(!Number.isSafeInteger(total))throw Error('Total is too large');entries.push({paidBy:e.paidBy,amount:amount/100,allocation:allocated.map(x=>({person:x.p,amount:x.owed/100}))})}const debtors=[...balance].filter(([,n])=>n<0).map(([p,n])=>({p,n:-n})),creditors=[...balance].filter(([,n])=>n>0).map(([p,n])=>({p,n})),settlements=[];let i=0,j=0;while(i<debtors.length&&j<creditors.length){const amount=Math.min(debtors[i].n,creditors[j].n);settlements.push({from:debtors[i].p,to:creditors[j].p,amount:amount/100});debtors[i].n-=amount;creditors[j].n-=amount;if(!debtors[i].n)i++;if(!creditors[j].n)j++}return {total:total/100,balances:[...balance].map(([person,n])=>({person,net:n/100})),settlements,entries}}","splitExpenses");

__studio33.typingStats = (function typingStats(target,typed,elapsedMs){const a=Array.from(target),b=Array.from(typed);let correct=0;for(let i=0;i<b.length;i++)if(a[i]===b[i])correct++;const minutes=Math.max(0,elapsedMs)/60000;return {characters:b.length,correct,errors:b.length-correct,accuracy:b.length?correct/b.length*100:100,grossWPM:minutes?b.length/5/minutes:0,correctWPM:minutes?correct/5/minutes:0,complete:typed===target}});

__studio33.parsePDFPages = (function parsePDFPages(text,count){if(!Number.isInteger(count)||count<1||count>1000)throw Error('PDF must have 1–1,000 pages');if(!String(text).trim())return Array.from({length:count},(_,i)=>i);const result=[];for(const token of String(text).split(',')){const m=token.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);if(!m)throw Error('Use page numbers/ranges such as 3,1,5-7');const a=Number(m[1]),b=Number(m[2]||m[1]);if(a<1||b<1||a>count||b>count)throw Error('Page number outside 1–'+count);const step=a<=b?1:-1;for(let n=a;;n+=step){result.push(n-1);if(result.length>1000)throw Error('Output limited to 1,000 pages');if(n===b)break}}return result});

__studio33.compareSheetRows = (function compareSheetRows(left,right,keyIndex=0){if(!left.length||!right.length)throw Error('Both sheets need a header row');const a=left[0].map(x=>String(x??'')),b=right[0].map(x=>String(x??''));if(a.some(x=>!x)||b.some(x=>!x)||new Set(a).size!==a.length||new Set(b).size!==b.length)throw Error('Headers must be nonempty and unique');if(!Number.isInteger(keyIndex)||keyIndex<0||keyIndex>=a.length)throw Error('Choose a key column');const key=a[keyIndex],other=b.indexOf(key);if(other<0)throw Error('Key column is missing from the second sheet');const index=(rows,headers,k)=>{const map=new Map();for(let i=1;i<rows.length;i++){const row=rows[i];if(row.every(x=>x===null||x===undefined||x===''))continue;const value=row[k];if(value===null||value===undefined||String(value)==='')throw Error('Blank key at row '+(i+1));const id=JSON.stringify([typeof value,value]);if(map.has(id))throw Error('Duplicate key '+value);map.set(id,{row:i+1,values:row})}return map};const x=index(left,a,keyIndex),y=index(right,b,other),columns=[...new Set([...a,...b])],changes=[];for(const [id,row]of x){const next=y.get(id);if(!next){changes.push({kind:'removed',key:row.values[keyIndex],leftRow:row.row});continue}const fields=[];for(const name of columns){const i=a.indexOf(name),j=b.indexOf(name),v=i<0?null:(row.values[i]??null),w=j<0?null:(next.values[j]??null);if(i<0||j<0||JSON.stringify(v)!==JSON.stringify(w))fields.push({column:name,left:v,right:w})}if(fields.length)changes.push({kind:'changed',key:row.values[keyIndex],leftRow:row.row,rightRow:next.row,fields})}for(const [id,row]of y)if(!x.has(id))changes.push({kind:'added',key:row.values[other],rightRow:row.row});return {keyColumn:key,leftRecords:x.size,rightRecords:y.size,added:changes.filter(x=>x.kind==='added').length,removed:changes.filter(x=>x.kind==='removed').length,changed:changes.filter(x=>x.kind==='changed').length,changes}});

__studio33.safeShortcutURL = (function safeShortcutURL(value){value=String(value).trim();if(!value||value.length>4000||/[\u0000-\u0020\u007f]/.test(value))throw Error('Enter a URL without spaces/control characters (up to 4,000 characters)');if(!/^[a-z][a-z0-9+.-]*:/i.test(value))value='https://'+value;let url;try{url=new URL(value)}catch{throw Error('Invalid URL')}if(!['http:','https:'].includes(url.protocol)||!url.hostname||url.username||url.password)throw Error('Use an HTTP/HTTPS URL without embedded credentials');return url.href});

__studio33.normalizeShortcut = __studio33.$fn((function normalizeShortcut(item){if(!item||typeof item!=='object'||typeof item.url!=='string'||typeof item.name!=='string'||!item.name.trim()||item.name.length>100)throw Error('Shortcut names require 1–100 characters');if(item.group!==undefined&&(typeof item.group!=='string'||item.group.length>80))throw Error('Group names support up to 80 characters');if(item.notes!==undefined&&(typeof item.notes!=='string'||item.notes.length>1000))throw Error('Notes support up to 1,000 characters');return {id:typeof item.id==='string'&&/^[\w-]{1,100}$/.test(item.id)?item.id:__studio33.newId('link'),name:item.name.trim(),url:__studio33.safeShortcutURL(item.url),group:(item.group||'General').trim()||'General',notes:item.notes||'',favorite:item.favorite===true}}),"function normalizeShortcut(item){if(!item||typeof item!=='object'||typeof item.url!=='string'||typeof item.name!=='string'||!item.name.trim()||item.name.length>100)throw Error('Shortcut names require 1–100 characters');if(item.group!==undefined&&(typeof item.group!=='string'||item.group.length>80))throw Error('Group names support up to 80 characters');if(item.notes!==undefined&&(typeof item.notes!=='string'||item.notes.length>1000))throw Error('Notes support up to 1,000 characters');return {id:typeof item.id==='string'&&/^[\\w-]{1,100}$/.test(item.id)?item.id:newId('link'),name:item.name.trim(),url:safeShortcutURL(item.url),group:(item.group||'General').trim()||'General',notes:item.notes||'',favorite:item.favorite===true}}","normalizeShortcut");

__studio33.parseShortcutImport = __studio33.$fn((function parseShortcutImport(text){if(text.length>2e6)throw Error('Import limit: 2 MB');const data=JSON.parse(text),items=Array.isArray(data)?data:data?.shortcuts;if(!Array.isArray(items)||items.length>500)throw Error('Import up to 500 shortcuts as an array or {shortcuts: [...]}');const result=items.map(__studio33.normalizeShortcut),ids=new Set();for(const item of result){if(ids.has(item.id))item.id=__studio33.newId('link');ids.add(item.id)}return result}),"function parseShortcutImport(text){if(text.length>2e6)throw Error('Import limit: 2 MB');const data=JSON.parse(text),items=Array.isArray(data)?data:data?.shortcuts;if(!Array.isArray(items)||items.length>500)throw Error('Import up to 500 shortcuts as an array or {shortcuts: [...]}');const result=items.map(normalizeShortcut),ids=new Set();for(const item of result){if(ids.has(item.id))item.id=newId('link');ids.add(item.id)}return result}","parseShortcutImport");

__studio33.validatePaymentIdentifier = (function validatePaymentIdentifier(kind,input){const value=String(input).replace(/\s/g,'').toUpperCase();if(kind==='iban'){if(!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(value))return {valid:false,normalized:value,message:'IBAN needs a two-letter country code, two check digits, and an alphanumeric account part (15–34 total characters).'};const formats={"AD": {"length": 24, "pattern": "^[0-9]{4}[0-9]{4}[A-Z0-9]{12}$"}, "AE": {"length": 23, "pattern": "^[0-9]{3}[0-9]{16}$"}, "AL": {"length": 28, "pattern": "^[0-9]{8}[A-Z0-9]{16}$"}, "AT": {"length": 20, "pattern": "^[0-9]{5}[0-9]{11}$"}, "AZ": {"length": 28, "pattern": "^[A-Z]{4}[A-Z0-9]{20}$"}, "BA": {"length": 20, "pattern": "^[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}$"}, "BE": {"length": 16, "pattern": "^[0-9]{3}[0-9]{7}[0-9]{2}$"}, "BG": {"length": 22, "pattern": "^[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}$"}, "BH": {"length": 22, "pattern": "^[A-Z]{4}[A-Z0-9]{14}$"}, "BI": {"length": 27, "pattern": "^[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}$"}, "BR": {"length": 29, "pattern": "^[A-Z0-9]{8}[0-9]{5}[0-9]{10}[A-Z0-9]{1}[A-Z0-9]{1}$"}, "BY": {"length": 28, "pattern": "^[A-Z0-9]{4}[0-9]{4}[A-Z0-9]{16}$"}, "CH": {"length": 21, "pattern": "^[0-9]{5}[A-Z0-9]{12}$"}, "CR": {"length": 22, "pattern": "^[0-9]{4}[0-9]{14}$"}, "CY": {"length": 28, "pattern": "^[0-9]{3}[0-9]{5}[A-Z0-9]{16}$"}, "CZ": {"length": 24, "pattern": "^[0-9]{4}[0-9]{16}$"}, "DE": {"length": 22, "pattern": "^[0-9]{8}[0-9]{10}$"}, "DJ": {"length": 27, "pattern": "^[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}$"}, "DK": {"length": 18, "pattern": "^[0-9]{4}[0-9]{9}[0-9]{1}$"}, "DO": {"length": 28, "pattern": "^[A-Z0-9]{4}[0-9]{20}$"}, "EE": {"length": 20, "pattern": "^[0-9]{2}[0-9]{14}$"}, "EG": {"length": 29, "pattern": "^[0-9]{4}[0-9]{4}[0-9]{17}$"}, "ES": {"length": 24, "pattern": "^[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}$"}, "FI": {"length": 18, "pattern": "^[0-9]{3}[0-9]{11}$"}, "FK": {"length": 18, "pattern": "^[A-Z]{2}[0-9]{12}$"}, "FO": {"length": 18, "pattern": "^[0-9]{4}[0-9]{9}[0-9]{1}$"}, "FR": {"length": 27, "pattern": "^[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}$"}, "GB": {"length": 22, "pattern": "^[A-Z]{4}[0-9]{6}[0-9]{8}$"}, "GE": {"length": 22, "pattern": "^[A-Z]{2}[0-9]{16}$"}, "GI": {"length": 23, "pattern": "^[A-Z]{4}[A-Z0-9]{15}$"}, "GL": {"length": 18, "pattern": "^[0-9]{4}[0-9]{9}[0-9]{1}$"}, "GR": {"length": 27, "pattern": "^[0-9]{3}[0-9]{4}[A-Z0-9]{16}$"}, "GT": {"length": 28, "pattern": "^[A-Z0-9]{4}[A-Z0-9]{20}$"}, "HN": {"length": 28, "pattern": "^[A-Z]{4}[0-9]{20}$"}, "HR": {"length": 21, "pattern": "^[0-9]{7}[0-9]{10}$"}, "HU": {"length": 28, "pattern": "^[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}$"}, "IE": {"length": 22, "pattern": "^[A-Z]{4}[0-9]{6}[0-9]{8}$"}, "IL": {"length": 23, "pattern": "^[0-9]{3}[0-9]{3}[0-9]{13}$"}, "IQ": {"length": 23, "pattern": "^[A-Z]{4}[0-9]{3}[0-9]{12}$"}, "IS": {"length": 26, "pattern": "^[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}$"}, "IT": {"length": 27, "pattern": "^[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}$"}, "JO": {"length": 30, "pattern": "^[A-Z]{4}[0-9]{4}[A-Z0-9]{18}$"}, "KW": {"length": 30, "pattern": "^[A-Z]{4}[A-Z0-9]{22}$"}, "KZ": {"length": 20, "pattern": "^[0-9]{3}[A-Z0-9]{13}$"}, "LB": {"length": 28, "pattern": "^[0-9]{4}[A-Z0-9]{20}$"}, "LC": {"length": 32, "pattern": "^[A-Z]{4}[A-Z0-9]{24}$"}, "LI": {"length": 21, "pattern": "^[0-9]{5}[A-Z0-9]{12}$"}, "LT": {"length": 20, "pattern": "^[0-9]{5}[0-9]{11}$"}, "LU": {"length": 20, "pattern": "^[0-9]{3}[A-Z0-9]{13}$"}, "LV": {"length": 21, "pattern": "^[A-Z]{4}[A-Z0-9]{13}$"}, "LY": {"length": 25, "pattern": "^[0-9]{3}[0-9]{3}[0-9]{15}$"}, "MC": {"length": 27, "pattern": "^[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}$"}, "MD": {"length": 24, "pattern": "^[A-Z0-9]{2}[A-Z0-9]{18}$"}, "ME": {"length": 22, "pattern": "^[0-9]{3}[0-9]{13}[0-9]{2}$"}, "MK": {"length": 19, "pattern": "^[0-9]{3}[A-Z0-9]{10}[0-9]{2}$"}, "MN": {"length": 20, "pattern": "^[0-9]{4}[0-9]{12}$"}, "MR": {"length": 27, "pattern": "^[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}$"}, "MT": {"length": 31, "pattern": "^[A-Z]{4}[0-9]{5}[A-Z0-9]{18}$"}, "MU": {"length": 30, "pattern": "^[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}$"}, "NI": {"length": 28, "pattern": "^[A-Z]{4}[0-9]{20}$"}, "NL": {"length": 18, "pattern": "^[A-Z]{4}[0-9]{10}$"}, "NO": {"length": 15, "pattern": "^[0-9]{4}[0-9]{6}[0-9]{1}$"}, "OM": {"length": 23, "pattern": "^[0-9]{3}[A-Z0-9]{16}$"}, "PK": {"length": 24, "pattern": "^[A-Z]{4}[A-Z0-9]{16}$"}, "PL": {"length": 28, "pattern": "^[0-9]{8}[0-9]{16}$"}, "PS": {"length": 29, "pattern": "^[A-Z]{4}[A-Z0-9]{21}$"}, "PT": {"length": 25, "pattern": "^[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}$"}, "QA": {"length": 29, "pattern": "^[A-Z]{4}[A-Z0-9]{21}$"}, "RO": {"length": 24, "pattern": "^[A-Z]{4}[A-Z0-9]{16}$"}, "RS": {"length": 22, "pattern": "^[0-9]{3}[0-9]{13}[0-9]{2}$"}, "RU": {"length": 33, "pattern": "^[0-9]{9}[0-9]{5}[A-Z0-9]{15}$"}, "SA": {"length": 24, "pattern": "^[0-9]{2}[A-Z0-9]{18}$"}, "SC": {"length": 31, "pattern": "^[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{16}[A-Z]{3}$"}, "SD": {"length": 18, "pattern": "^[0-9]{2}[0-9]{12}$"}, "SE": {"length": 24, "pattern": "^[0-9]{3}[0-9]{16}[0-9]{1}$"}, "SI": {"length": 19, "pattern": "^[0-9]{5}[0-9]{8}[0-9]{2}$"}, "SK": {"length": 24, "pattern": "^[0-9]{4}[0-9]{6}[0-9]{10}$"}, "SM": {"length": 27, "pattern": "^[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}$"}, "SO": {"length": 23, "pattern": "^[0-9]{4}[0-9]{3}[0-9]{12}$"}, "ST": {"length": 25, "pattern": "^[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}$"}, "SV": {"length": 28, "pattern": "^[A-Z]{4}[0-9]{20}$"}, "TL": {"length": 23, "pattern": "^[0-9]{3}[0-9]{14}[0-9]{2}$"}, "TN": {"length": 24, "pattern": "^[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}$"}, "TR": {"length": 26, "pattern": "^[0-9]{5}[0-9]{1}[A-Z0-9]{16}$"}, "UA": {"length": 29, "pattern": "^[0-9]{6}[A-Z0-9]{19}$"}, "VA": {"length": 22, "pattern": "^[0-9]{3}[0-9]{15}$"}, "VG": {"length": 24, "pattern": "^[A-Z]{4}[0-9]{16}$"}, "XK": {"length": 20, "pattern": "^[0-9]{4}[0-9]{10}[0-9]{2}$"}, "YE": {"length": 30, "pattern": "^[A-Z]{4}[0-9]{4}[A-Z0-9]{18}$"}};const country=value.slice(0,2),format=formats[country],length=format?.length;if(!length)throw Error('Country is not in the bundled IBAN registry snapshot. No country-format verdict is available.');let remainder=0;for(const ch of value.slice(4)+value.slice(0,4)){const digits=/\d/.test(ch)?ch:String(ch.charCodeAt(0)-55);for(const digit of digits)remainder=(remainder*10+Number(digit))%97}const nationalPattern=new RegExp(format.pattern).test(value.slice(4)),valid=value.length===length&&remainder===1&&nationalPattern;return {valid,normalized:value,country,expectedLength:length,checksum:remainder===1,nationalPattern,registrySnapshot:'2026-10-07',message:valid?'Country length, national BBAN pattern, and MOD-97 checksum passed.':'Length, national BBAN pattern, or MOD-97 checksum failed.'}}if(kind==='ifsc')return {valid:/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value),normalized:value,message:'IFSC format check: 4 letters, zero, then 6 letters/digits. No bank/branch lookup.'};if(kind==='bic')return {valid:/^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(value),normalized:value,message:'BIC format check: 8 or 11 characters. No institution lookup.'};if(kind==='aba'){const valid=/^\d{9}$/.test(value)&&/^(0[0-9]|1[0-2]|2[1-9]|3[0-2]|6[1-9]|7[0-2]|80)/.test(value)&&value!=='000000000'&&(3*(Number(value[0])+Number(value[3])+Number(value[6]))+7*(Number(value[1])+Number(value[4])+Number(value[7]))+Number(value[2])+Number(value[5])+Number(value[8]))%10===0;return {valid,normalized:value,message:'ABA routing-number format, prefix, and checksum check. No bank lookup.'}}if(kind==='upi'){const v=String(input).trim();return {valid:/^[A-Za-z0-9._-]{2,256}@[A-Za-z0-9.-]{2,64}$/.test(v),normalized:v,message:'UPI ID syntax check only; provider handles and account existence are not verified.'}}throw Error('Choose a supported identifier type')});

__studio33.v9Status = __studio33.$fn((function v9Status(id,message,error=false){__studio33.newToolStatus(id,message,error)}),"function v9Status(id,message,error=false){newToolStatus(id,message,error)}","v9Status");

__studio33.v9Table = __studio33.$fn((function v9Table(id,headers,rows){const root=__studio33.$(id);root.replaceChildren();if(!rows.length){const p=document.createElement('p');p.className='hint';p.textContent='No matching rows.';root.append(p);return}const wrap=document.createElement('div');wrap.className='v9-table-wrap';const table=document.createElement('table'),head=document.createElement('thead'),tr=document.createElement('tr');for(const h of headers){const th=document.createElement('th');th.textContent=String(h);tr.append(th)}head.append(tr);table.append(head);const body=document.createElement('tbody');for(const row of rows){const line=document.createElement('tr');for(const value of row){const td=document.createElement('td');td.textContent=value===null||value===undefined?'':typeof value==='object'?JSON.stringify(value):String(value);line.append(td)}body.append(line)}table.append(body);wrap.append(table);root.append(wrap)}),"function v9Table(id,headers,rows){const root=$(id);root.replaceChildren();if(!rows.length){const p=document.createElement('p');p.className='hint';p.textContent='No matching rows.';root.append(p);return}const wrap=document.createElement('div');wrap.className='v9-table-wrap';const table=document.createElement('table'),head=document.createElement('thead'),tr=document.createElement('tr');for(const h of headers){const th=document.createElement('th');th.textContent=String(h);tr.append(th)}head.append(tr);table.append(head);const body=document.createElement('tbody');for(const row of rows){const line=document.createElement('tr');for(const value of row){const td=document.createElement('td');td.textContent=value===null||value===undefined?'':typeof value==='object'?JSON.stringify(value):String(value);line.append(td)}body.append(line)}table.append(body);wrap.append(table);root.append(wrap)}","v9Table");

__studio33.v9Output = __studio33.$fn((function v9Output(id,value){const root=__studio33.$(id);root.replaceChildren();const pre=document.createElement('pre');pre.className='source-preview';pre.textContent=typeof value==='string'?value:JSON.stringify(value,null,2);root.append(pre)}),"function v9Output(id,value){const root=$(id);root.replaceChildren();const pre=document.createElement('pre');pre.className='source-preview';pre.textContent=typeof value==='string'?value:JSON.stringify(value,null,2);root.append(pre)}","v9Output");

__studio33.v9Invalidate = __studio33.$fn((function v9Invalidate(ids,status,message='Inputs changed. Run again to update the result.'){for(const id of ids)__studio33.$(id).disabled=true;__studio33.v9Status(status,message)}),"function v9Invalidate(ids,status,message='Inputs changed. Run again to update the result.'){for(const id of ids)$(id).disabled=true;v9Status(status,message)}","v9Invalidate");

__studio33.v9SaveJSON = __studio33.$fn((function v9SaveJSON(name,value){__studio33.downloadFile(name,JSON.stringify(value,null,2),'application/json')}),"function v9SaveJSON(name,value){downloadFile(name,JSON.stringify(value,null,2),'application/json')}","v9SaveJSON");

__studio33.v9Watch = __studio33.$fn((function v9Watch(ids,fn){for(const id of ids)__studio33.$(id).addEventListener('input',fn)}),"function v9Watch(ids,fn){for(const id of ids)$(id).addEventListener('input',fn)}","v9Watch");

__studio33.v9File = (function v9File(file,maxMB=20,extensions=null){if(!file)throw Error('Choose a file');if(file.size>maxMB*1024*1024)throw Error('File limit: '+maxMB+' MB');if(extensions&&!extensions.includes(file.name.split('.').pop().toLowerCase()))throw Error('Supported file types: '+extensions.join(', '));return file});

__studio33.runV9Worker = __studio33.$fn((function runV9Worker(key,source,job,success,statusId,timeout=15000,failure=()=>{}){return __studio33.runStudioWorker(key,source,job,success,statusId,timeout,failure)}),"function runV9Worker(key,source,job,success,statusId,timeout=15000,failure=()=>{}){return runStudioWorker(key,source,job,success,statusId,timeout,failure)}","runV9Worker");

__studio33.v9ReadText = __studio33.$fn((function v9ReadText(file){__studio33.v9File(file,2,['json','txt']);return file.text()}),"function v9ReadText(file){v9File(file,2,['json','txt']);return file.text()}","v9ReadText");

__studio33.v9Raster = __studio33.$fn((async function v9Raster(file){__studio33.v9File(file,20);const prefix=new Uint8Array(await file.slice(0,512).arrayBuffer()),info=__studio33.inspectFileBytes(prefix,file.name);if(!['PNG image','JPEG image','GIF image','WebP image','ISO media container'].includes(info.signature)&&!/^image\/(bmp|avif)$/.test(file.type))throw Error('Choose a supported raster image; SVG is not supported');const url=URL.createObjectURL(file),image=new Image();try{image.src=url;await image.decode();if(!image.naturalWidth||image.naturalWidth*image.naturalHeight>20000000)throw Error('Image limit: 20 megapixels');return image}finally{URL.revokeObjectURL(url)}}),"async function v9Raster(file){v9File(file,20);const prefix=new Uint8Array(await file.slice(0,512).arrayBuffer()),info=inspectFileBytes(prefix,file.name);if(!['PNG image','JPEG image','GIF image','WebP image','ISO media container'].includes(info.signature)&&!/^image\\/(bmp|avif)$/.test(file.type))throw Error('Choose a supported raster image; SVG is not supported');const url=URL.createObjectURL(file),image=new Image();try{image.src=url;await image.decode();if(!image.naturalWidth||image.naturalWidth*image.naturalHeight>20000000)throw Error('Image limit: 20 megapixels');return image}finally{URL.revokeObjectURL(url)}}","v9Raster");

__studio33.persistShortcuts = __studio33.$fn((function persistShortcuts(){try{localStorage.setItem(__studio33.shortcutStoreKey,JSON.stringify(__studio33.shortcuts));return true}catch{return false}}),"function persistShortcuts(){try{localStorage.setItem(shortcutStoreKey,JSON.stringify(shortcuts));return true}catch{return false}}","persistShortcuts");

__studio33.inspectZipDirectory = __studio33.$fn((function inspectZipDirectory(input){const bytes=input instanceof Uint8Array?input:new Uint8Array(input);if(bytes.length>50*1024*1024)throw Error('ZIP input limit: 50 MiB');const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),u16=p=>view.getUint16(p,true),u32=p=>view.getUint32(p,true);let end=-1;for(let i=bytes.length-22;i>=Math.max(0,bytes.length-65557);i--)if(u32(i)===0x06054b50&&i+22+u16(i+20)===bytes.length){end=i;break}if(end<0)throw Error('ZIP end record not found');if(u16(end+4)||u16(end+6)||u16(end+8)!==u16(end+10))throw Error('Multi-disk ZIP archives are unsupported');const count=u16(end+10),size=u32(end+12),offset=u32(end+16);if(count===65535||size===0xffffffff||offset===0xffffffff)throw Error('ZIP64 archives are unsupported');if(count>2000)throw Error('ZIP entry limit: 2,000');if(offset+size>end)throw Error('Invalid ZIP directory bounds');let p=offset,total=0;const entries=[],names=new Set();for(let i=0;i<count;i++){if(p+46>offset+size||u32(p)!==0x02014b50)throw Error('Invalid ZIP central entry');const flags=u16(p+8),method=u16(p+10),checksum=u32(p+16),compressed=u32(p+20),uncompressed=u32(p+24),n=u16(p+28),x=u16(p+30),c=u16(p+32),disk=u16(p+34),attributes=u32(p+38),local=u32(p+42);if(p+46+n+x+c>offset+size)throw Error('Truncated ZIP directory');if(disk||[compressed,uncompressed,local].includes(0xffffffff))throw Error('ZIP64 or multi-disk entries are unsupported');const raw=new TextDecoder(flags&2048?'utf-8':'latin1',{fatal:true}).decode(bytes.slice(p+46,p+46+n));const directory=raw.endsWith('/'),name=__studio33.safeZipPath(directory?raw.slice(0,-1):raw);if(names.has(name))throw Error('Duplicate normalized ZIP path: '+name);names.add(name);if(local+30>offset||u32(local)!==0x04034b50)throw Error('Invalid ZIP local header');const dataStart=local+30+u16(local+26)+u16(local+28);if(dataStart+compressed>offset)throw Error('ZIP entry overlaps the directory');const symlink=((attributes>>>16)&0xf000)===0xa000;total+=uncompressed;if(total>100*1024*1024)throw Error('Declared expanded size exceeds 100 MiB');entries.push({id:i,name,rawName:raw,directory,compressed,uncompressed,checksum,method,encrypted:!!(flags&1),symlink,supported:!directory&&!(flags&1)&&!symlink&&[0,8].includes(method),legacyName:!(flags&2048)&&/[^\x00-\x7f]/.test(raw)});p+=46+n+x+c}if(p!==offset+size)throw Error('Unexpected ZIP directory data');return {entries,totalUncompressed:total,compressedBytes:bytes.length}}),"function inspectZipDirectory(input){const bytes=input instanceof Uint8Array?input:new Uint8Array(input);if(bytes.length>50*1024*1024)throw Error('ZIP input limit: 50 MiB');const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength),u16=p=>view.getUint16(p,true),u32=p=>view.getUint32(p,true);let end=-1;for(let i=bytes.length-22;i>=Math.max(0,bytes.length-65557);i--)if(u32(i)===0x06054b50&&i+22+u16(i+20)===bytes.length){end=i;break}if(end<0)throw Error('ZIP end record not found');if(u16(end+4)||u16(end+6)||u16(end+8)!==u16(end+10))throw Error('Multi-disk ZIP archives are unsupported');const count=u16(end+10),size=u32(end+12),offset=u32(end+16);if(count===65535||size===0xffffffff||offset===0xffffffff)throw Error('ZIP64 archives are unsupported');if(count>2000)throw Error('ZIP entry limit: 2,000');if(offset+size>end)throw Error('Invalid ZIP directory bounds');let p=offset,total=0;const entries=[],names=new Set();for(let i=0;i<count;i++){if(p+46>offset+size||u32(p)!==0x02014b50)throw Error('Invalid ZIP central entry');const flags=u16(p+8),method=u16(p+10),checksum=u32(p+16),compressed=u32(p+20),uncompressed=u32(p+24),n=u16(p+28),x=u16(p+30),c=u16(p+32),disk=u16(p+34),attributes=u32(p+38),local=u32(p+42);if(p+46+n+x+c>offset+size)throw Error('Truncated ZIP directory');if(disk||[compressed,uncompressed,local].includes(0xffffffff))throw Error('ZIP64 or multi-disk entries are unsupported');const raw=new TextDecoder(flags&2048?'utf-8':'latin1',{fatal:true}).decode(bytes.slice(p+46,p+46+n));const directory=raw.endsWith('/'),name=safeZipPath(directory?raw.slice(0,-1):raw);if(names.has(name))throw Error('Duplicate normalized ZIP path: '+name);names.add(name);if(local+30>offset||u32(local)!==0x04034b50)throw Error('Invalid ZIP local header');const dataStart=local+30+u16(local+26)+u16(local+28);if(dataStart+compressed>offset)throw Error('ZIP entry overlaps the directory');const symlink=((attributes>>>16)&0xf000)===0xa000;total+=uncompressed;if(total>100*1024*1024)throw Error('Declared expanded size exceeds 100 MiB');entries.push({id:i,name,rawName:raw,directory,compressed,uncompressed,checksum,method,encrypted:!!(flags&1),symlink,supported:!directory&&!(flags&1)&&!symlink&&[0,8].includes(method),legacyName:!(flags&2048)&&/[^\\x00-\\x7f]/.test(raw)});p+=46+n+x+c}if(p!==offset+size)throw Error('Unexpected ZIP directory data');return {entries,totalUncompressed:total,compressedBytes:bytes.length}}","inspectZipDirectory");

__studio33.secureIndex = (function secureIndex(max){if(!Number.isInteger(max)||max<1||max>0x100000000)throw Error('Invalid random range');if(!globalThis.crypto?.getRandomValues)throw Error('Browser cryptographic randomness is unavailable');const limit=0x100000000-(0x100000000%max),a=new Uint32Array(1);do{crypto.getRandomValues(a)}while(a[0]>=limit);return a[0]%max});

__studio33.calendarParts = (function calendarParts(text){const m=String(text).match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2}))?)?$/);if(!m)throw Error('Use a valid date/time');const p={year:Number(m[1]),month:Number(m[2]),day:Number(m[3]),hour:Number(m[4]||0),minute:Number(m[5]||0),second:Number(m[6]||0)};if(p.year<1970||p.year>2100||p.hour>23||p.minute>59||p.second>59||p.month<1||p.month>12||p.day<1||p.day>31)throw Error('Calendar supports valid dates from 1970–2100');const d=new Date(Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second));if(d.getUTCMonth()!==p.month-1||d.getUTCDate()!==p.day)throw Error('Invalid calendar date');return p});

__studio33.zonedCalendarInstant = (function zonedCalendarInstant(parts,zone,ambiguity='earlier'){if(typeof zone!=='string'||zone.length>100)throw Error('Enter an IANA time zone');const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}),read=ms=>Object.fromEntries(formatter.formatToParts(new Date(ms)).filter(p=>['year','month','day','hour','minute','second'].includes(p.type)).map(p=>[p.type,Number(p.value)])),base=Date.UTC(parts.year,parts.month-1,parts.day,parts.hour,parts.minute,parts.second),offsets=new Set();for(const h of [-36,-24,-12,-6,0,6,12,24,36]){const ms=base+h*3600000,p=read(ms);offsets.add(Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-ms)}const candidates=[...offsets].map(offset=>base-offset).filter(ms=>{const p=read(ms);return Object.keys(parts).every(k=>p[k]===parts[k])}).sort((a,b)=>a-b);if(!candidates.length)throw Error('Local time does not exist in '+zone+' due to a clock change');return {ms:ambiguity==='later'?candidates.at(-1):candidates[0],ambiguous:candidates.length>1,zone:formatter.resolvedOptions().timeZone}});

__studio33.calendarOccurrences = __studio33.$fn((function calendarOccurrences(start,frequency,count,interval=1){count=__studio33.boundedNumber(count,'Occurrences',1,366,true);interval=__studio33.boundedNumber(interval,'Recurrence interval',1,52,true);if(!['none','daily','weekly','monthly','yearly'].includes(frequency))throw Error('Unsupported recurrence');if(frequency==='none')return [start];const result=[];for(let i=0;result.length<count&&i<20000;i++){const d=new Date(Date.UTC(start.year,start.month-1,start.day,start.hour,start.minute,start.second));if(frequency==='daily'||frequency==='weekly')d.setUTCDate(d.getUTCDate()+i*interval*(frequency==='weekly'?7:1));else{d.setUTCDate(1);if(frequency==='monthly')d.setUTCMonth(start.month-1+i*interval);else d.setUTCFullYear(start.year+i*interval);d.setUTCDate(start.day);if(d.getUTCDate()!==start.day)continue}if(d.getUTCFullYear()>2100)throw Error('Recurrence extends beyond 2100');result.push({year:d.getUTCFullYear(),month:d.getUTCMonth()+1,day:d.getUTCDate(),hour:start.hour,minute:start.minute,second:start.second})}if(result.length!==count)throw Error('Could not build the requested recurrence');return result}),"function calendarOccurrences(start,frequency,count,interval=1){count=boundedNumber(count,'Occurrences',1,366,true);interval=boundedNumber(interval,'Recurrence interval',1,52,true);if(!['none','daily','weekly','monthly','yearly'].includes(frequency))throw Error('Unsupported recurrence');if(frequency==='none')return [start];const result=[];for(let i=0;result.length<count&&i<20000;i++){const d=new Date(Date.UTC(start.year,start.month-1,start.day,start.hour,start.minute,start.second));if(frequency==='daily'||frequency==='weekly')d.setUTCDate(d.getUTCDate()+i*interval*(frequency==='weekly'?7:1));else{d.setUTCDate(1);if(frequency==='monthly')d.setUTCMonth(start.month-1+i*interval);else d.setUTCFullYear(start.year+i*interval);d.setUTCDate(start.day);if(d.getUTCDate()!==start.day)continue}if(d.getUTCFullYear()>2100)throw Error('Recurrence extends beyond 2100');result.push({year:d.getUTCFullYear(),month:d.getUTCMonth()+1,day:d.getUTCDate(),hour:start.hour,minute:start.minute,second:start.second})}if(result.length!==count)throw Error('Could not build the requested recurrence');return result}","calendarOccurrences");

__studio33.foldCalendarLine = (function foldCalendarLine(line){const encoder=new TextEncoder();let result='',current='',bytes=0;for(const char of line){const n=encoder.encode(char).length;if(bytes+n>75){result+=current+'\r\n';current=' ';bytes=1}current+=char;bytes+=n}return result+current});

__studio33.buildCalendarEvent = __studio33.$fn((function buildCalendarEvent(options){const title=String(options.title||'').trim(),description=String(options.description||''),location=String(options.location||'');if(!title||title.length>200||description.length>10000||location.length>500||/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(title+description+location))throw Error('Title requires 1–200 characters; description ≤10,000; location ≤500; control characters are unsupported');const start=__studio33.calendarParts(options.start),end=__studio33.calendarParts(options.end),allDay=options.allDay===true;if(!allDay&&(!String(options.start).includes('T')||!String(options.end).includes('T')))throw Error('Timed events require start and end times');const zone=options.zone||'UTC',escape=s=>s.replace(/\\/g,'\\\\').replace(/\r\n?|\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,'),stamp=ms=>new Date(ms).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,''),date=p=>String(p.year)+String(p.month).padStart(2,'0')+String(p.day).padStart(2,'0');let duration,startMs,endMs,ambiguous=false;const dates=__studio33.calendarOccurrences(start,options.frequency||'none',options.count??1,options.interval??1);let starts,ends;if(allDay){startMs=Date.UTC(start.year,start.month-1,start.day);endMs=Date.UTC(end.year,end.month-1,end.day);duration=endMs-startMs;if(duration<=0)throw Error('All-day end date is exclusive and must follow the start date');starts=dates.map(date);ends=dates.map(__studio33.$fn(p=>date(__studio33.calendarParts(new Date(Date.UTC(p.year,p.month-1,p.day)+duration).toISOString().slice(0,10))),"p=>date(calendarParts(new Date(Date.UTC(p.year,p.month-1,p.day)+duration).toISOString().slice(0,10)))",""))}else{const a=__studio33.zonedCalendarInstant(start,zone,options.ambiguity),b=__studio33.zonedCalendarInstant(end,zone,options.ambiguity);startMs=a.ms;endMs=b.ms;ambiguous=a.ambiguous||b.ambiguous;duration=endMs-startMs;if(duration<=0)throw Error('Event end must follow start');starts=dates.map(__studio33.$fn(p=>{const x=__studio33.zonedCalendarInstant(p,zone,options.ambiguity);ambiguous||=x.ambiguous;return stamp(x.ms)},"p=>{const x=zonedCalendarInstant(p,zone,options.ambiguity);ambiguous||=x.ambiguous;return stamp(x.ms)}",""));ends=starts.map(s=>stamp(Date.UTC(Number(s.slice(0,4)),Number(s.slice(4,6))-1,Number(s.slice(6,8)),Number(s.slice(9,11)),Number(s.slice(11,13)),Number(s.slice(13,15)))+duration))}const uid=options.uid||Array.from({length:32},__studio33.$fn(()=> '0123456789abcdef'[__studio33.secureIndex(16)],"()=> '0123456789abcdef'[secureIndex(16)]","")).join('')+'@calc-studio.local';if(!/^[A-Za-z0-9@._-]{1,150}$/.test(uid))throw Error('Invalid event UID');const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Calc Studio//Offline Event Builder//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+stamp(options.now??Date.now()),'SUMMARY:'+escape(title),'DTSTART'+(allDay?';VALUE=DATE':'')+':'+starts[0],'DTEND'+(allDay?';VALUE=DATE':'')+':'+ends[0]];if(starts.length>1)lines.push('RDATE'+(allDay?';VALUE=DATE':'')+':'+starts.slice(1).join(','));if(description)lines.push('DESCRIPTION:'+escape(description));if(location)lines.push('LOCATION:'+escape(location));if(options.url)lines.push('URL:'+__studio33.safeShortcutURL(options.url));if(!allDay)lines.push('X-STUDIO-SOURCE-TIMEZONE:'+zone);lines.push('END:VEVENT','END:VCALENDAR');return {text:lines.map(__studio33.foldCalendarLine).join('\r\n')+'\r\n',uid,occurrences:starts.map((start,i)=>({start,end:ends[i]})),zone:allDay?'All-day dates':zone,durationMilliseconds:duration,ambiguous,notice:'Finite recurrence is exported as explicit RDATE values. Timed occurrences preserve the selected local start time across clock changes; each has the initial elapsed duration. No invitations are sent.'}}),"function buildCalendarEvent(options){const title=String(options.title||'').trim(),description=String(options.description||''),location=String(options.location||'');if(!title||title.length>200||description.length>10000||location.length>500||/[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f]/.test(title+description+location))throw Error('Title requires 1–200 characters; description ≤10,000; location ≤500; control characters are unsupported');const start=calendarParts(options.start),end=calendarParts(options.end),allDay=options.allDay===true;if(!allDay&&(!String(options.start).includes('T')||!String(options.end).includes('T')))throw Error('Timed events require start and end times');const zone=options.zone||'UTC',escape=s=>s.replace(/\\\\/g,'\\\\\\\\').replace(/\\r\\n?|\\n/g,'\\\\n').replace(/;/g,'\\\\;').replace(/,/g,'\\\\,'),stamp=ms=>new Date(ms).toISOString().replace(/[-:]/g,'').replace(/\\.\\d{3}/,''),date=p=>String(p.year)+String(p.month).padStart(2,'0')+String(p.day).padStart(2,'0');let duration,startMs,endMs,ambiguous=false;const dates=calendarOccurrences(start,options.frequency||'none',options.count??1,options.interval??1);let starts,ends;if(allDay){startMs=Date.UTC(start.year,start.month-1,start.day);endMs=Date.UTC(end.year,end.month-1,end.day);duration=endMs-startMs;if(duration<=0)throw Error('All-day end date is exclusive and must follow the start date');starts=dates.map(date);ends=dates.map(p=>date(calendarParts(new Date(Date.UTC(p.year,p.month-1,p.day)+duration).toISOString().slice(0,10))))}else{const a=zonedCalendarInstant(start,zone,options.ambiguity),b=zonedCalendarInstant(end,zone,options.ambiguity);startMs=a.ms;endMs=b.ms;ambiguous=a.ambiguous||b.ambiguous;duration=endMs-startMs;if(duration<=0)throw Error('Event end must follow start');starts=dates.map(p=>{const x=zonedCalendarInstant(p,zone,options.ambiguity);ambiguous||=x.ambiguous;return stamp(x.ms)});ends=starts.map(s=>stamp(Date.UTC(Number(s.slice(0,4)),Number(s.slice(4,6))-1,Number(s.slice(6,8)),Number(s.slice(9,11)),Number(s.slice(11,13)),Number(s.slice(13,15)))+duration))}const uid=options.uid||Array.from({length:32},()=> '0123456789abcdef'[secureIndex(16)]).join('')+'@calc-studio.local';if(!/^[A-Za-z0-9@._-]{1,150}$/.test(uid))throw Error('Invalid event UID');const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Calc Studio//Offline Event Builder//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+stamp(options.now??Date.now()),'SUMMARY:'+escape(title),'DTSTART'+(allDay?';VALUE=DATE':'')+':'+starts[0],'DTEND'+(allDay?';VALUE=DATE':'')+':'+ends[0]];if(starts.length>1)lines.push('RDATE'+(allDay?';VALUE=DATE':'')+':'+starts.slice(1).join(','));if(description)lines.push('DESCRIPTION:'+escape(description));if(location)lines.push('LOCATION:'+escape(location));if(options.url)lines.push('URL:'+safeShortcutURL(options.url));if(!allDay)lines.push('X-STUDIO-SOURCE-TIMEZONE:'+zone);lines.push('END:VEVENT','END:VCALENDAR');return {text:lines.map(foldCalendarLine).join('\\r\\n')+'\\r\\n',uid,occurrences:starts.map((start,i)=>({start,end:ends[i]})),zone:allDay?'All-day dates':zone,durationMilliseconds:duration,ambiguous,notice:'Finite recurrence is exported as explicit RDATE values. Timed occurrences preserve the selected local start time across clock changes; each has the initial elapsed duration. No invitations are sent.'}}","buildCalendarEvent");

__studio33.dominantImageColors = __studio33.$fn((function dominantImageColors(pixels,count=8){count=__studio33.boundedNumber(count,'Palette size',2,16,true);const bins=new Map();let sampled=0;for(let i=0;i<pixels.length;i+=4){if(pixels[i+3]<128)continue;sampled++;const key=(pixels[i]>>3)+'-'+(pixels[i+1]>>3)+'-'+(pixels[i+2]>>3),b=bins.get(key)||{count:0,r:0,g:0,b:0};b.count++;b.r+=pixels[i];b.g+=pixels[i+1];b.b+=pixels[i+2];bins.set(key,b)}const ranked=[...bins.values()].sort((a,b)=>b.count-a.count),colors=[];for(const bin of ranked){const rgb=[bin.r,bin.g,bin.b].map(x=>Math.round(x/bin.count));if(colors.some(c=>Math.hypot(...rgb.map((x,i)=>x-c.rgb[i]))<28))continue;colors.push({rgb,hex:'#'+rgb.map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase(),sampleShare:sampled?bin.count/sampled:0});if(colors.length===count)break}return {colors,sampled,notice:'Approximate palette from downsampled color bins. Pixels below 50% opacity are excluded. Shares refer to these sampled bins, not exact full-image coverage.'}}),"function dominantImageColors(pixels,count=8){count=boundedNumber(count,'Palette size',2,16,true);const bins=new Map();let sampled=0;for(let i=0;i<pixels.length;i+=4){if(pixels[i+3]<128)continue;sampled++;const key=(pixels[i]>>3)+'-'+(pixels[i+1]>>3)+'-'+(pixels[i+2]>>3),b=bins.get(key)||{count:0,r:0,g:0,b:0};b.count++;b.r+=pixels[i];b.g+=pixels[i+1];b.b+=pixels[i+2];bins.set(key,b)}const ranked=[...bins.values()].sort((a,b)=>b.count-a.count),colors=[];for(const bin of ranked){const rgb=[bin.r,bin.g,bin.b].map(x=>Math.round(x/bin.count));if(colors.some(c=>Math.hypot(...rgb.map((x,i)=>x-c.rgb[i]))<28))continue;colors.push({rgb,hex:'#'+rgb.map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase(),sampleShare:sampled?bin.count/sampled:0});if(colors.length===count)break}return {colors,sampled,notice:'Approximate palette from downsampled color bins. Pixels below 50% opacity are excluded. Shares refer to these sampled bins, not exact full-image coverage.'}}","dominantImageColors");

__studio33.svgNode = (function svgNode(tag,attributes={},text=null){const node=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [name,value]of Object.entries(attributes))node.setAttribute(name,String(value));if(text!==null)node.textContent=text;return node});

__studio33.flowBounds = __studio33.$fn((function flowBounds(){const nodes=__studio33.flowState?.nodes||[];return {width:Math.max(420,...nodes.map(n=>n.x+n.width+40)),height:Math.max(280,...nodes.map(n=>n.y+n.height+40))}}),"function flowBounds(){const nodes=flowState?.nodes||[];return {width:Math.max(420,...nodes.map(n=>n.x+n.width+40)),height:Math.max(280,...nodes.map(n=>n.y+n.height+40))}}","flowBounds");

__studio33.cleanSVG = (function cleanSVG(svg){const clone=svg.cloneNode(true);clone.setAttribute('xmlns','http://www.w3.org/2000/svg');clone.querySelectorAll('[tabindex]').forEach(n=>n.removeAttribute('tabindex'));return new XMLSerializer().serializeToString(clone)});

__studio33.studioDescription = __studio33.$fn((function studioDescription(id){return ({archives:'Create ZIPs, inspect entries, and extract selected files.',flowchart:'Build diagrams from text or JSON and export SVG.',subnets:'Calculate IPv4/IPv6 networks and child subnets.',passwords:'Generate secure passwords or word passphrases.',barcodes:'Generate Code 128, EAN, UPC, and Code 39 symbols.',calendar:'Create calendar events with timezone-aware repeats.',imagecolors:'Pick exact pixels and extract an approximate palette.'})[id]||__studio33.studioDescriptions[id]||__studio33.views[id]}),"function studioDescription(id){return ({archives:'Create ZIPs, inspect entries, and extract selected files.',flowchart:'Build diagrams from text or JSON and export SVG.',subnets:'Calculate IPv4/IPv6 networks and child subnets.',passwords:'Generate secure passwords or word passphrases.',barcodes:'Generate Code 128, EAN, UPC, and Code 39 symbols.',calendar:'Create calendar events with timezone-aware repeats.',imagecolors:'Pick exact pixels and extract an approximate palette.'})[id]||studioDescriptions[id]||views[id]}","studioDescription");

__studio33.enhanceCommandResults = __studio33.$fn((function enhanceCommandResults(){if(typeof window==='undefined')return;for(const b of __studio33.$('commandResults').querySelectorAll('button')){const entry=__studio33.commandItems[[...__studio33.$('commandResults').children].indexOf(b)];if(!entry)continue;const title=b.textContent;b.replaceChildren();const strong=document.createElement('strong'),small=document.createElement('small');strong.textContent=title;small.textContent=__studio33.studioDescription(entry[0]);b.append(strong,small)}}),"function enhanceCommandResults(){if(typeof window==='undefined')return;for(const b of $('commandResults').querySelectorAll('button')){const entry=commandItems[[...$('commandResults').children].indexOf(b)];if(!entry)continue;const title=b.textContent;b.replaceChildren();const strong=document.createElement('strong'),small=document.createElement('small');strong.textContent=title;small.textContent=studioDescription(entry[0]);b.append(strong,small)}}","enhanceCommandResults");

__studio33.csStatus = __studio33.$fn((function csStatus(id,text,error=false){const e=__studio33.$(id+'Status');e.textContent=text;e.dataset.error=String(error)}),"function csStatus(id,text,error=false){const e=$(id+'Status');e.textContent=text;e.dataset.error=String(error)}","csStatus");

__studio33.csPNG = __studio33.$fn((async function csPNG(canvas,name){const blob=await __studio33.ciEncode(canvas,'image/png');__studio33.downloadFile(name,blob,'image/png');}),"async function csPNG(canvas,name){const blob=await ciEncode(canvas,'image/png');downloadFile(name,blob,'image/png');}","csPNG");

__studio33.csSafe = __studio33.$fn((function csSafe(action,id){return __studio33.$fn(async(...args)=>{try{await action(...args)}catch(e){__studio33.csStatus(id,e.message,true)}},"async(...args)=>{try{await action(...args)}catch(e){csStatus(id,e.message,true)}}","")}),"function csSafe(action,id){return async(...args)=>{try{await action(...args)}catch(e){csStatus(id,e.message,true)}}}","csSafe");

__studio33.csBound = __studio33.$fn((function csBound(id,min,max,integer=false){const v=Number(__studio33.$(id).value);if(!__studio33.$(id).value.trim()||!Number.isFinite(v)||v<min||v>max||integer&&!Number.isInteger(v))throw Error(__studio33.$(id).closest('label')?.innerText+' must be between '+min+' and '+max);return v}),"function csBound(id,min,max,integer=false){const v=Number($(id).value);if(!$(id).value.trim()||!Number.isFinite(v)||v<min||v>max||integer&&!Number.isInteger(v))throw Error($(id).closest('label')?.innerText+' must be between '+min+' and '+max);return v}","csBound");

__studio33.rcDecimal = (function rcDecimal(text){const m=String(text).match(/^([+-]?)(\d+)(?:\.(\d*))?(?:e([+-]?\d+))?$/i);if(!m||text.length>1000)return null;const scale=(m[3]||'').length-Number(m[4]||0);if(Math.abs(scale)>1000)return null;return {n:BigInt((m[1]==='-'?'-':'')+m[2]+(m[3]||'')),scale}});

__studio33.rcNear = __studio33.$fn((function rcNear(a,b,t){const x=__studio33.rcDecimal(a),y=__studio33.rcDecimal(b),z=__studio33.rcDecimal(t);if(!x||!y||!z)return null;const scale=Math.max(x.scale,y.scale,z.scale),pow=n=>10n**BigInt(n),diff=x.n*pow(scale-x.scale)-y.n*pow(scale-y.scale);return (diff<0n?-diff:diff)<=z.n*pow(scale-z.scale)}),"function rcNear(a,b,t){const x=rcDecimal(a),y=rcDecimal(b),z=rcDecimal(t);if(!x||!y||!z)return null;const scale=Math.max(x.scale,y.scale,z.scale),pow=n=>10n**BigInt(n),diff=x.n*pow(scale-x.scale)-y.n*pow(scale-y.scale);return (diff<0n?-diff:diff)<=z.n*pow(scale-z.scale)}","rcNear");

__studio33.rcMappings = (function rcMappings(text,a,b,required){const lines=text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);const pairs=lines.length?lines.map(s=>{const n=s.indexOf('=');return n<0?[s,s]:[s.slice(0,n).trim(),s.slice(n+1).trim()]}):required?[]:a.columns.filter(c=>b.columns.includes(c)).map(c=>[c,c]);if(required&&!pairs.length)throw Error('Enter at least one key mapping');if(pairs.length>200)throw Error('Too many mappings');for(const [l,r]of pairs)if(!a.columns.includes(l)||!b.columns.includes(r))throw Error('Unknown mapped column: '+l+' = '+r);return pairs});

__studio33.rdNormalize = __studio33.$fn((function rdNormalize(r){if(!r||typeof r!=='object'||Array.isArray(r)||!r.response||typeof r.response!=='object'||Array.isArray(r.response)||Object.keys(r.response).length>200)throw Error('Response file must contain an answer object named response');if(JSON.stringify(r).length>500000)throw Error('Response limit: 500 KB');for(const v of Object.values(r.response))if(!['string','number','boolean'].includes(typeof v)&&v!==null)throw Error('Unsupported response value');if(r.version===2){if(r.app!=='calc-studio-form-response'||typeof r.formId!=='string'||!Number.isInteger(r.formVersion)||!Array.isArray(r.fields)||!r.answers||typeof r.answers!=='object'||Array.isArray(r.answers)||!Array.isArray(r.inactiveFields))throw Error('Invalid versioned response');__studio33.fdValidate({title:String(r.formTitle||'Form'),formId:r.formId,formVersion:r.formVersion,fields:r.fields});for(const key of Object.keys(r.answers))if(!r.fields.some(f=>f.id===key))throw Error('Unknown response field ID');for(const key of r.inactiveFields)if(!r.fields.some(f=>f.id===key))throw Error('Unknown inactive field');}return __studio33.csClone(r)}),"function rdNormalize(r){if(!r||typeof r!=='object'||Array.isArray(r)||!r.response||typeof r.response!=='object'||Array.isArray(r.response)||Object.keys(r.response).length>200)throw Error('Response file must contain an answer object named response');if(JSON.stringify(r).length>500000)throw Error('Response limit: 500 KB');for(const v of Object.values(r.response))if(!['string','number','boolean'].includes(typeof v)&&v!==null)throw Error('Unsupported response value');if(r.version===2){if(r.app!=='calc-studio-form-response'||typeof r.formId!=='string'||!Number.isInteger(r.formVersion)||!Array.isArray(r.fields)||!r.answers||typeof r.answers!=='object'||Array.isArray(r.answers)||!Array.isArray(r.inactiveFields))throw Error('Invalid versioned response');fdValidate({title:String(r.formTitle||'Form'),formId:r.formId,formVersion:r.formVersion,fields:r.fields});for(const key of Object.keys(r.answers))if(!r.fields.some(f=>f.id===key))throw Error('Unknown response field ID');for(const key of r.inactiveFields)if(!r.fields.some(f=>f.id===key))throw Error('Unknown inactive field');}return csClone(r)}","rdNormalize");

__studio33.rdGroup = (function rdGroup(r){return r.version===2?r.formId+'@'+r.formVersion:'legacy:'+String(r.formTitle||r.form||'Unversioned form')});

__studio33.rdFields = (function rdFields(rows){return rows[0]?.version===2?rows[0].fields:Object.keys(rows.reduce((a,r)=>Object.assign(a,r.response),Object.create(null))).map(label=>({id:label,label,required:false,type:'text'}))});

__studio33.rdAnswer = (function rdAnswer(r,f){return r.version===2?r.answers[f.id]:r.response[f.label]});

__studio33.rdMissing = __studio33.$fn((function rdMissing(r,fields){return fields.filter(__studio33.$fn(f=>f.required&&!r.inactiveFields?.includes(f.id)&&(__studio33.rdAnswer(r,f)===undefined||__studio33.rdAnswer(r,f)===null||__studio33.rdAnswer(r,f)===''||f.type==='checkbox'&&__studio33.rdAnswer(r,f)!==true),"f=>f.required&&!r.inactiveFields?.includes(f.id)&&(rdAnswer(r,f)===undefined||rdAnswer(r,f)===null||rdAnswer(r,f)===''||f.type==='checkbox'&&rdAnswer(r,f)!==true)","")).length}),"function rdMissing(r,fields){return fields.filter(f=>f.required&&!r.inactiveFields?.includes(f.id)&&(rdAnswer(r,f)===undefined||rdAnswer(r,f)===null||rdAnswer(r,f)===''||f.type==='checkbox'&&rdAnswer(r,f)!==true)).length}","rdMissing");

__studio33.cs31Limit = (function cs31Limit(text,max=2097152){if(typeof text!=='string'||text.length>max)throw Error('Input exceeds '+max.toLocaleString()+' characters');return text;});

__studio33.cs31Schema = __studio33.$fn((function cs31Schema(source,required=true,closed=false){
 const root=__studio33.strictJSON(__studio33.cs31Limit(source));let visited=0;
 function infer(nodes,depth=0){
  if(depth>50)throw Error('Schema inference supports at most 50 nesting levels');
  visited+=nodes.length;if(visited>100000)throw Error('Schema inference limit: 100,000 values');
  const types=[...new Set(nodes.map(n=>n.type==='number'?(/^[-]?\d+$/.test(n.raw)?'integer':'number'):n.type))];
  if(types.includes('number')){const i=types.indexOf('integer');if(i>=0)types.splice(i,1);}
  if(!types.length)return {};
  const result={type:types.length===1?types[0]:types};
  const objects=nodes.filter(n=>n.type==='object');
  if(objects.length){const keys=[...new Set(objects.flatMap(n=>n.entries.map(e=>e[0])))];if(keys.length>2000)throw Error('Schema inference limit: 2,000 properties per object');
   const properties=Object.create(null),must=[];for(const key of keys){const values=objects.flatMap(n=>{const e=n.entries.find(e=>e[0]===key);return e?[e[1]]:[]});properties[key]=infer(values,depth+1);if(required&&values.length===objects.length)must.push(key);}
   result.properties=properties;if(must.length)result.required=must;result.additionalProperties=!closed;
  }
  const arrays=nodes.filter(n=>n.type==='array');if(arrays.length)result.items=infer(arrays.flatMap(n=>n.items),depth+1);
  return result;
 }
 return {$schema:'http://json-schema.org/draft-07/schema#',$comment:'Inferred from supplied samples only. Review types and required fields against the actual contract.',...infer([root])};
}),"function cs31Schema(source,required=true,closed=false){\n const root=strictJSON(cs31Limit(source));let visited=0;\n function infer(nodes,depth=0){\n  if(depth>50)throw Error('Schema inference supports at most 50 nesting levels');\n  visited+=nodes.length;if(visited>100000)throw Error('Schema inference limit: 100,000 values');\n  const types=[...new Set(nodes.map(n=>n.type==='number'?(/^[-]?\\d+$/.test(n.raw)?'integer':'number'):n.type))];\n  if(types.includes('number')){const i=types.indexOf('integer');if(i>=0)types.splice(i,1);}\n  if(!types.length)return {};\n  const result={type:types.length===1?types[0]:types};\n  const objects=nodes.filter(n=>n.type==='object');\n  if(objects.length){const keys=[...new Set(objects.flatMap(n=>n.entries.map(e=>e[0])))];if(keys.length>2000)throw Error('Schema inference limit: 2,000 properties per object');\n   const properties=Object.create(null),must=[];for(const key of keys){const values=objects.flatMap(n=>{const e=n.entries.find(e=>e[0]===key);return e?[e[1]]:[]});properties[key]=infer(values,depth+1);if(required&&values.length===objects.length)must.push(key);}\n   result.properties=properties;if(must.length)result.required=must;result.additionalProperties=!closed;\n  }\n  const arrays=nodes.filter(n=>n.type==='array');if(arrays.length)result.items=infer(arrays.flatMap(n=>n.items),depth+1);\n  return result;\n }\n return {$schema:'http://json-schema.org/draft-07/schema#',$comment:'Inferred from supplied samples only. Review types and required fields against the actual contract.',...infer([root])};\n}","cs31Schema");

__studio33.cs31ValueStates = __studio33.$fn((function cs31ValueStates(source,pointers){
 const root=__studio33.strictJSON(__studio33.cs31Limit(source));const paths=__studio33.cs31Limit(pointers,20000).split(/\r?\n/).filter(x=>x!==''||pointers==='');if(paths.length>200)throw Error('Use at most 200 JSON pointers');
 return paths.map(__studio33.$fn(path=>{if(path!==''&&!path.startsWith('/'))throw Error('Use JSON Pointer paths such as /customer/name; a blank path selects the root');let node=root,missing=false;
  for(const raw of path===''?[]:path.slice(1).split('/')){if(/~(?![01])/u.test(raw))throw Error('Invalid JSON Pointer escape');const key=raw.replace(/~1/g,'/').replace(/~0/g,'~');if(node.type==='object')node=node.entries.find(e=>e[0]===key)?.[1];else if(node.type==='array'&&/^(0|[1-9]\d*)$/.test(key))node=node.items[Number(key)];else node=undefined;if(!node){missing=true;break;}}
  const state=missing?'missing':node.type==='null'?'null':node.type==='string'?(node.value===''?'empty string':node.value.trim()===''?'whitespace string':'string'):node.type==='array'&&!node.items.length?'empty array':node.type==='object'&&!node.entries.length?'empty object':node.type;
  return{path,state,value:missing?null:__studio33.emitDeveloperJSON(node).slice(0,2000),valueTruncated:!missing&&__studio33.emitDeveloperJSON(node).length>2000};
 },"path=>{if(path!==''&&!path.startsWith('/'))throw Error('Use JSON Pointer paths such as /customer/name; a blank path selects the root');let node=root,missing=false;\n  for(const raw of path===''?[]:path.slice(1).split('/')){if(/~(?![01])/u.test(raw))throw Error('Invalid JSON Pointer escape');const key=raw.replace(/~1/g,'/').replace(/~0/g,'~');if(node.type==='object')node=node.entries.find(e=>e[0]===key)?.[1];else if(node.type==='array'&&/^(0|[1-9]\\d*)$/.test(key))node=node.items[Number(key)];else node=undefined;if(!node){missing=true;break;}}\n  const state=missing?'missing':node.type==='null'?'null':node.type==='string'?(node.value===''?'empty string':node.value.trim()===''?'whitespace string':'string'):node.type==='array'&&!node.items.length?'empty array':node.type==='object'&&!node.entries.length?'empty object':node.type;\n  return{path,state,value:missing?null:emitDeveloperJSON(node).slice(0,2000),valueTruncated:!missing&&emitDeveloperJSON(node).length>2000};\n }",""));
}),"function cs31ValueStates(source,pointers){\n const root=strictJSON(cs31Limit(source));const paths=cs31Limit(pointers,20000).split(/\\r?\\n/).filter(x=>x!==''||pointers==='');if(paths.length>200)throw Error('Use at most 200 JSON pointers');\n return paths.map(path=>{if(path!==''&&!path.startsWith('/'))throw Error('Use JSON Pointer paths such as /customer/name; a blank path selects the root');let node=root,missing=false;\n  for(const raw of path===''?[]:path.slice(1).split('/')){if(/~(?![01])/u.test(raw))throw Error('Invalid JSON Pointer escape');const key=raw.replace(/~1/g,'/').replace(/~0/g,'~');if(node.type==='object')node=node.entries.find(e=>e[0]===key)?.[1];else if(node.type==='array'&&/^(0|[1-9]\\d*)$/.test(key))node=node.items[Number(key)];else node=undefined;if(!node){missing=true;break;}}\n  const state=missing?'missing':node.type==='null'?'null':node.type==='string'?(node.value===''?'empty string':node.value.trim()===''?'whitespace string':'string'):node.type==='array'&&!node.items.length?'empty array':node.type==='object'&&!node.entries.length?'empty object':node.type;\n  return{path,state,value:missing?null:emitDeveloperJSON(node).slice(0,2000),valueTruncated:!missing&&emitDeveloperJSON(node).length>2000};\n });\n}","cs31ValueStates");

__studio33.cs31ApexName = (function cs31ApexName(value){const reserved=new Set(('abstract activate and any array as asc autonomous begin bigdecimal blob boolean break bulk by byte case cast catch char class collect commit const continue convert currency date datetime decimal default delete desc do double else end enum exception exit export extends false final finally float for from future global goto group having hint if implements import in inner insert instanceof int integer interface into join last_90_days like limit list long loop map merge new next_90_days not null nulls number object of on or outer override package parallel pragma private protected public retrieve return rollback savepoint search select set short sort static string super switch synchronized system sharing with without inherited testmethod then this throw time timestamp today tolLabel tomorrow transaction transient trigger true try undelete update upsert using virtual void volatile webservice when where while yesterday').toLowerCase().split(/\s+/));return /^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(value)&&!reserved.has(value.toLowerCase());});

__studio33.cs31Apex = __studio33.$fn((function cs31Apex(source,name='ApiPayload',fixture=false){
 if(!__studio33.cs31ApexName(name))throw Error('Use a nonreserved Apex class name: a letter followed by letters, digits or underscores (maximum 40)');
 const root=__studio33.strictJSON(__studio33.cs31Limit(source,200000)),warnings=[],classes=[],used=new Set([name.toLowerCase()]);let fallback=false,visits=0;
 const unique=__studio33.$fn(base=>{base=(base.replace(/[^A-Za-z0-9]/g,'').slice(0,28)||'Item');base=base[0].toUpperCase()+base.slice(1)+'Data';if(!/^[A-Za-z]/.test(base))base='Item'+base;let candidate=base,i=1;while(used.has(candidate.toLowerCase())||!__studio33.cs31ApexName(candidate))candidate=base+(i++);used.add(candidate.toLowerCase());return candidate;},"base=>{base=(base.replace(/[^A-Za-z0-9]/g,'').slice(0,28)||'Item');base=base[0].toUpperCase()+base.slice(1)+'Data';if(!/^[A-Za-z]/.test(base))base='Item'+base;let candidate=base,i=1;while(used.has(candidate.toLowerCase())||!cs31ApexName(candidate))candidate=base+(i++);used.add(candidate.toLowerCase());return candidate;}","unique");
 function infer(nodes,label,depth=0){if(depth>20||++visits>2000)throw Error('Apex generation limit: 20 levels / 2,000 fields');const nonnull=nodes.filter(n=>n.type!=='null'),types=[...new Set(nonnull.map(n=>n.type))];if(!types.length){warnings.push(label+': only null values; String is an assumption to review.');return'String';}if(types.length!==1){fallback=true;warnings.push(label+': mixed JSON types require an untyped parser.');return'Object';}
  const type=types[0];if(type==='string')return'String';if(type==='boolean')return'Boolean';if(type==='number'){if(nonnull.some(n=>n.raw.replace(/[-+.eE]/g,'').length>28))warnings.push(label+': large numeric tokens may exceed Apex Decimal precision; review the API contract.');return'Decimal';}
  if(type==='array'){const items=nonnull.flatMap(n=>n.items);if(!items.length){warnings.push(label+': empty arrays assume String elements; review the item type.');return'List<String>';}return'List<'+infer(items,label+'[]',depth+1)+'>';}
  const cname=unique(label),keys=[...new Set(nonnull.flatMap(n=>n.entries.map(e=>e[0])))],folded=new Set(),fields=[];
  for(const key of keys){if(!__studio33.cs31ApexName(key)||['parse','samplejson',name.toLowerCase()].includes(key.toLowerCase())||folded.has(key.toLowerCase())){fallback=true;warnings.push(label+'/'+key+': JSON name cannot be represented faithfully as an Apex member.');}folded.add(key.toLowerCase());const values=nonnull.flatMap(n=>{const e=n.entries.find(e=>e[0]===key);return e?[e[1]]:[]});fields.push({name:key,type:infer(values,key,depth+1)});}
  classes.push({name:cname,fields});return cname;
 }
 let rootType;if(root.type==='object'){rootType=infer([root],'Root');const c=classes.find(c=>c.name===rootType);classes.splice(classes.indexOf(c),1);classes.unshift({...c,name});rootType=name;}else rootType=infer([root],'Item');
 const lines=['// Generated from samples. Review types, access and org requirements before deployment.','public class '+name+' {'];
 if(fallback){lines.push('    // Untyped fallback preserves JSON keys and heterogeneous shapes.','    public static Object parse(String jsonText) {','        return System.JSON.deserializeUntyped(jsonText);','    }');}
 else{if(root.type==='object')for(const f of classes[0].fields)lines.push('    public '+f.type+' '+f.name+' { get; set; }');for(const c of classes.filter(c=>c.name!==name)){lines.push('','    public class '+c.name+' {');for(const f of c.fields)lines.push('        public '+f.type+' '+f.name+' { get; set; }');lines.push('    }');}lines.push('','    public static '+rootType+' parse(String jsonText) {','        return ('+rootType+') System.JSON.deserialize(jsonText, '+rootType+'.class);','    }');}
 if(fixture){const sample=__studio33.emitDeveloperJSON(root);lines.push('','    // JSON fixture only: this does not create or insert Salesforce records.','    public static String sampleJSON() {','        return '+__studio33.cs31ApexString(sample)+';','    }');}
 lines.push('}');const testName=name.slice(0,36)+'Test',testCode=fixture?['@IsTest','private class '+testName+' {','    @IsTest','    static void parsesSample() {','        String sampleJSON = '+__studio33.cs31ApexString(__studio33.emitDeveloperJSON(root))+';','        Object actual = '+name+'.parse(sampleJSON);',root.type==='null'?'        System.assertEquals(null, actual);':'        System.assertNotEquals(null, actual);','        // Add field assertions, negative cases and org-specific test setup.','        // No sObject is inserted by this sample.','    }','}'].join('\n'):'';return{code:lines.join('\n'),testCode,testName,warnings:[...new Set(warnings)],mode:fallback?'untyped':'typed',notice:'Generated starter code. No Apex compiler or Salesforce org is contacted. Null sample fields and empty arrays require type review.'};
}),"function cs31Apex(source,name='ApiPayload',fixture=false){\n if(!cs31ApexName(name))throw Error('Use a nonreserved Apex class name: a letter followed by letters, digits or underscores (maximum 40)');\n const root=strictJSON(cs31Limit(source,200000)),warnings=[],classes=[],used=new Set([name.toLowerCase()]);let fallback=false,visits=0;\n const unique=base=>{base=(base.replace(/[^A-Za-z0-9]/g,'').slice(0,28)||'Item');base=base[0].toUpperCase()+base.slice(1)+'Data';if(!/^[A-Za-z]/.test(base))base='Item'+base;let candidate=base,i=1;while(used.has(candidate.toLowerCase())||!cs31ApexName(candidate))candidate=base+(i++);used.add(candidate.toLowerCase());return candidate;};\n function infer(nodes,label,depth=0){if(depth>20||++visits>2000)throw Error('Apex generation limit: 20 levels / 2,000 fields');const nonnull=nodes.filter(n=>n.type!=='null'),types=[...new Set(nonnull.map(n=>n.type))];if(!types.length){warnings.push(label+': only null values; String is an assumption to review.');return'String';}if(types.length!==1){fallback=true;warnings.push(label+': mixed JSON types require an untyped parser.');return'Object';}\n  const type=types[0];if(type==='string')return'String';if(type==='boolean')return'Boolean';if(type==='number'){if(nonnull.some(n=>n.raw.replace(/[-+.eE]/g,'').length>28))warnings.push(label+': large numeric tokens may exceed Apex Decimal precision; review the API contract.');return'Decimal';}\n  if(type==='array'){const items=nonnull.flatMap(n=>n.items);if(!items.length){warnings.push(label+': empty arrays assume String elements; review the item type.');return'List<String>';}return'List<'+infer(items,label+'[]',depth+1)+'>';}\n  const cname=unique(label),keys=[...new Set(nonnull.flatMap(n=>n.entries.map(e=>e[0])))],folded=new Set(),fields=[];\n  for(const key of keys){if(!cs31ApexName(key)||['parse','samplejson',name.toLowerCase()].includes(key.toLowerCase())||folded.has(key.toLowerCase())){fallback=true;warnings.push(label+'/'+key+': JSON name cannot be represented faithfully as an Apex member.');}folded.add(key.toLowerCase());const values=nonnull.flatMap(n=>{const e=n.entries.find(e=>e[0]===key);return e?[e[1]]:[]});fields.push({name:key,type:infer(values,key,depth+1)});}\n  classes.push({name:cname,fields});return cname;\n }\n let rootType;if(root.type==='object'){rootType=infer([root],'Root');const c=classes.find(c=>c.name===rootType);classes.splice(classes.indexOf(c),1);classes.unshift({...c,name});rootType=name;}else rootType=infer([root],'Item');\n const lines=['// Generated from samples. Review types, access and org requirements before deployment.','public class '+name+' {'];\n if(fallback){lines.push('    // Untyped fallback preserves JSON keys and heterogeneous shapes.','    public static Object parse(String jsonText) {','        return System.JSON.deserializeUntyped(jsonText);','    }');}\n else{if(root.type==='object')for(const f of classes[0].fields)lines.push('    public '+f.type+' '+f.name+' { get; set; }');for(const c of classes.filter(c=>c.name!==name)){lines.push('','    public class '+c.name+' {');for(const f of c.fields)lines.push('        public '+f.type+' '+f.name+' { get; set; }');lines.push('    }');}lines.push('','    public static '+rootType+' parse(String jsonText) {','        return ('+rootType+') System.JSON.deserialize(jsonText, '+rootType+'.class);','    }');}\n if(fixture){const sample=emitDeveloperJSON(root);lines.push('','    // JSON fixture only: this does not create or insert Salesforce records.','    public static String sampleJSON() {','        return '+cs31ApexString(sample)+';','    }');}\n lines.push('}');const testName=name.slice(0,36)+'Test',testCode=fixture?['@IsTest','private class '+testName+' {','    @IsTest','    static void parsesSample() {','        String sampleJSON = '+cs31ApexString(emitDeveloperJSON(root))+';','        Object actual = '+name+'.parse(sampleJSON);',root.type==='null'?'        System.assertEquals(null, actual);':'        System.assertNotEquals(null, actual);','        // Add field assertions, negative cases and org-specific test setup.','        // No sObject is inserted by this sample.','    }','}'].join('\\n'):'';return{code:lines.join('\\n'),testCode,testName,warnings:[...new Set(warnings)],mode:fallback?'untyped':'typed',notice:'Generated starter code. No Apex compiler or Salesforce org is contacted. Null sample fields and empty arrays require type review.'};\n}","cs31Apex");

__studio33.cs31ApexString = (function cs31ApexString(text){if(text.length>200000)throw Error('Apex literal limit: 200,000 characters');const parts=[];for(let i=0;i<text.length;i+=2000)parts.push("'"+text.slice(i,i+2000).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\r/g,'\\r').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\u2028\u2029]/g,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'))+"'");return parts.join(' +\n            ')||"''";});

__studio33.cs31QueryAdvice = __studio33.$fn((function cs31QueryAdvice(text){const source=__studio33.cs31Limit(text,100000),rules=[[/MALFORMED_QUERY|unexpected token|unexpected character|missing.*FROM/i,'Query syntax','Check comma placement, quotes, parentheses and clause order. The formatter changes layout; it does not validate SOQL against an org.'],[/INVALID_FIELD|No such column|INVALID_FIELD_FOR_INSERT_UPDATE/i,'Field or relationship','Check object/field API names, relationship paths and field access using the target org’s metadata.'],[/INVALID_TYPE|not supported.*sObject|sObject type.*not supported/i,'Object availability','Check the object API name, enabled features and user access in the target org.'],[/non.selective|QUERY_TIMEOUT|selectivity/i,'Selectivity or timeout','Review indexed filters and returned volume in the target org’s Query Plan. Local text inspection cannot determine query cost.'],[/aggregate|GROUP BY|HAVING/i,'Aggregation','Check grouping of nonaggregated fields and the aggregate expressions used in HAVING.'],[/bind|only allowed in Apex/i,'Bind context','Apex bind variables need an Apex execution context. A REST query needs reviewed literal values rather than Apex variables.'],[/LIMIT_EXCEEDED|Too many SOQL/i,'Execution limits','Review transaction query counts and bulkification. Query formatting alone cannot resolve governor limits.']];return rules.filter(([re])=>re.test(source)).map(([,area,advice])=>({area,advice}));}),"function cs31QueryAdvice(text){const source=cs31Limit(text,100000),rules=[[/MALFORMED_QUERY|unexpected token|unexpected character|missing.*FROM/i,'Query syntax','Check comma placement, quotes, parentheses and clause order. The formatter changes layout; it does not validate SOQL against an org.'],[/INVALID_FIELD|No such column|INVALID_FIELD_FOR_INSERT_UPDATE/i,'Field or relationship','Check object/field API names, relationship paths and field access using the target org’s metadata.'],[/INVALID_TYPE|not supported.*sObject|sObject type.*not supported/i,'Object availability','Check the object API name, enabled features and user access in the target org.'],[/non.selective|QUERY_TIMEOUT|selectivity/i,'Selectivity or timeout','Review indexed filters and returned volume in the target org’s Query Plan. Local text inspection cannot determine query cost.'],[/aggregate|GROUP BY|HAVING/i,'Aggregation','Check grouping of nonaggregated fields and the aggregate expressions used in HAVING.'],[/bind|only allowed in Apex/i,'Bind context','Apex bind variables need an Apex execution context. A REST query needs reviewed literal values rather than Apex variables.'],[/LIMIT_EXCEEDED|Too many SOQL/i,'Execution limits','Review transaction query counts and bulkification. Query formatting alone cannot resolve governor limits.']];return rules.filter(([re])=>re.test(source)).map(([,area,advice])=>({area,advice}));}","cs31QueryAdvice");

__studio33.cs31Invisible = __studio33.$fn((function cs31Invisible(text){__studio33.cs31Limit(text);const names={0:'NUL',9:'TAB',10:'LF',13:'CR',32:'SPACE',160:'NO-BREAK SPACE',173:'SOFT HYPHEN',6158:'MONGOLIAN VOWEL SEPARATOR',8203:'ZERO WIDTH SPACE',8204:'ZERO WIDTH NON-JOINER',8205:'ZERO WIDTH JOINER',8206:'LEFT-TO-RIGHT MARK',8207:'RIGHT-TO-LEFT MARK',8232:'LINE SEPARATOR',8233:'PARAGRAPH SEPARATOR',8234:'LEFT-TO-RIGHT EMBEDDING',8235:'RIGHT-TO-LEFT EMBEDDING',8236:'POP DIRECTIONAL FORMATTING',8237:'LEFT-TO-RIGHT OVERRIDE',8238:'RIGHT-TO-LEFT OVERRIDE',8288:'WORD JOINER',8294:'LEFT-TO-RIGHT ISOLATE',8295:'RIGHT-TO-LEFT ISOLATE',8296:'FIRST STRONG ISOLATE',8297:'POP DIRECTIONAL ISOLATE',65279:'BOM / ZERO WIDTH NO-BREAK SPACE'},counts=new Map(),locations=[];let line=1,column=1,index=0;
 for(const c of text){const cp=c.codePointAt(0);if(Object.hasOwn(names,cp)||cp<32||cp===127){const key='U+'+cp.toString(16).toUpperCase().padStart(4,'0');counts.set(key,(counts.get(key)||0)+1);if(locations.length<200&&![' ','\n','\r'].includes(c))locations.push({code:key,name:names[cp]||'CONTROL',line,column,index});}if(c==='\n'){line++;column=1;}else column++;index+=c.length;}
 return{counts:[...counts].map(([code,count])=>({code,name:names[parseInt(code.slice(2),16)]||'CONTROL',count})),locations,notice:'Positions use 1-based Unicode code-point columns. Joiners and directional characters can be meaningful; review before removing them.'};
}),"function cs31Invisible(text){cs31Limit(text);const names={0:'NUL',9:'TAB',10:'LF',13:'CR',32:'SPACE',160:'NO-BREAK SPACE',173:'SOFT HYPHEN',6158:'MONGOLIAN VOWEL SEPARATOR',8203:'ZERO WIDTH SPACE',8204:'ZERO WIDTH NON-JOINER',8205:'ZERO WIDTH JOINER',8206:'LEFT-TO-RIGHT MARK',8207:'RIGHT-TO-LEFT MARK',8232:'LINE SEPARATOR',8233:'PARAGRAPH SEPARATOR',8234:'LEFT-TO-RIGHT EMBEDDING',8235:'RIGHT-TO-LEFT EMBEDDING',8236:'POP DIRECTIONAL FORMATTING',8237:'LEFT-TO-RIGHT OVERRIDE',8238:'RIGHT-TO-LEFT OVERRIDE',8288:'WORD JOINER',8294:'LEFT-TO-RIGHT ISOLATE',8295:'RIGHT-TO-LEFT ISOLATE',8296:'FIRST STRONG ISOLATE',8297:'POP DIRECTIONAL ISOLATE',65279:'BOM / ZERO WIDTH NO-BREAK SPACE'},counts=new Map(),locations=[];let line=1,column=1,index=0;\n for(const c of text){const cp=c.codePointAt(0);if(Object.hasOwn(names,cp)||cp<32||cp===127){const key='U+'+cp.toString(16).toUpperCase().padStart(4,'0');counts.set(key,(counts.get(key)||0)+1);if(locations.length<200&&![' ','\\n','\\r'].includes(c))locations.push({code:key,name:names[cp]||'CONTROL',line,column,index});}if(c==='\\n'){line++;column=1;}else column++;index+=c.length;}\n return{counts:[...counts].map(([code,count])=>({code,name:names[parseInt(code.slice(2),16)]||'CONTROL',count})),locations,notice:'Positions use 1-based Unicode code-point columns. Joiners and directional characters can be meaningful; review before removing them.'};\n}","cs31Invisible");

__studio33.cs31TextChange = __studio33.$fn((function cs31TextChange(text,mode,find='',replacement=''){__studio33.cs31Limit(text);let output=text,count=0;if(mode==='replace'){if(!find)throw Error('Enter a literal search string');count=text.split(find).length-1;if(count>100000)throw Error('Replacement limit: 100,000 matches');output=text.split(find).join(replacement);}else if(mode==='trim')output=text.split(/\r\n|\r|\n/).map(s=>s.replace(/^[\t ]+|[\t ]+$/g,'')).join('\n');else if(mode==='spaces')output=text.replace(/[\u00a0\u2007\u202f]/g,' ').replace(/[\t ]+/g,' ');else if(mode==='newlines')output=text.replace(/\r\n?|\u2028|\u2029/g,'\n');else if(mode==='zerowidth')output=text.replace(/[\u200b\ufeff]/g,'');else throw Error('Choose a text operation');__studio33.cs31Limit(output,4194304);return{output,matches:mode==='replace'?count:null,changed:output!==text,inputCharacters:text.length,outputCharacters:output.length,notice:'Literal preview. The input changes only after Apply; Undo restores the exact previous input.'};}),"function cs31TextChange(text,mode,find='',replacement=''){cs31Limit(text);let output=text,count=0;if(mode==='replace'){if(!find)throw Error('Enter a literal search string');count=text.split(find).length-1;if(count>100000)throw Error('Replacement limit: 100,000 matches');output=text.split(find).join(replacement);}else if(mode==='trim')output=text.split(/\\r\\n|\\r|\\n/).map(s=>s.replace(/^[\\t ]+|[\\t ]+$/g,'')).join('\\n');else if(mode==='spaces')output=text.replace(/[\\u00a0\\u2007\\u202f]/g,' ').replace(/[\\t ]+/g,' ');else if(mode==='newlines')output=text.replace(/\\r\\n?|\\u2028|\\u2029/g,'\\n');else if(mode==='zerowidth')output=text.replace(/[\\u200b\\ufeff]/g,'');else throw Error('Choose a text operation');cs31Limit(output,4194304);return{output,matches:mode==='replace'?count:null,changed:output!==text,inputCharacters:text.length,outputCharacters:output.length,notice:'Literal preview. The input changes only after Apply; Undo restores the exact previous input.'};}","cs31TextChange");

__studio33.cs31Date = (function cs31Date(text){if(typeof text!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(text)||new Date(text+'T12:00:00Z').toISOString().slice(0,10)!==text)throw Error('Use a valid date: YYYY-MM-DD');return text;});

__studio33.cs31Time = (function cs31Time(text){if(!/^\d{2}:\d{2}$/.test(text))throw Error('Use working hours in HH:MM');const[h,m]=text.split(':').map(Number);if(h>23||m>59)throw Error('Invalid working hours');return h*60+m;});

__studio33.cs31ZoneParts = (function cs31ZoneParts(ms,formatter){const p=Object.fromEntries(formatter.formatToParts(ms).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));return{date:p.year+'-'+p.month+'-'+p.day,minute:Number(p.hour)%24*60+Number(p.minute),weekday:p.weekday};});

__studio33.cs31Overlap = __studio33.$fn((function cs31Overlap(options){
 __studio33.cs31Date(options.date);const zones=[options.a,options.b];if(zones.some(z=>typeof z!=='string'||z.length>100))throw Error('Use IANA timezone names');const formatters=zones.map(timeZone=>new Intl.DateTimeFormat('en-GB',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',weekday:'short',hourCycle:'h23'}));
 const windows=[[__studio33.cs31Time(options.aStart),__studio33.cs31Time(options.aEnd)],[__studio33.cs31Time(options.bStart),__studio33.cs31Time(options.bEnd)]];if(windows.some(([a,b])=>a===b))throw Error('Working-hour start and end must differ');
 const holidays=[options.aHolidays||'',options.bHolidays||''].map(__studio33.$fn(text=>{__studio33.cs31Limit(text,30000);const days=text.split(/[\s,;]+/).filter(Boolean);if(days.length>1000)throw Error('Use at most 1,000 holidays per calendar');return new Set(days.map(__studio33.cs31Date));},"text=>{cs31Limit(text,30000);const days=text.split(/[\\s,;]+/).filter(Boolean);if(days.length>1000)throw Error('Use at most 1,000 holidays per calendar');return new Set(days.map(cs31Date));}",""));
 const base=Date.parse(options.date+'T00:00:00Z'),start=base-14*3600000,end=base+38*3600000,slots=[];let active=null;
 function working(part,i){let date=part.date,weekday=part.weekday;const[a,b]=windows[i],inside=a<b?part.minute>=a&&part.minute<b:part.minute>=a||part.minute<b;if(!inside)return false;if(a>b&&part.minute<b){date=new Date(Date.parse(date+'T12:00:00Z')-86400000).toISOString().slice(0,10);weekday=new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',weekday:'short'}).format(Date.parse(date+'T12:00:00Z'));}return(!options.weekdays||!['Sat','Sun'].includes(weekday))&&!holidays[i].has(date);}
 for(let ms=start;ms<end;ms+=60000){const p=formatters.map(__studio33.$fn(f=>__studio33.cs31ZoneParts(ms,f),"f=>cs31ZoneParts(ms,f)","")),ok=p[0].date===options.date&&p.every((part,i)=>working(part,i));if(ok&&active===null)active=ms;if(!ok&&active!==null){slots.push({start:new Date(active).toISOString(),end:new Date(ms).toISOString(),minutes:(ms-active)/60000});active=null;}}
 if(active!==null)slots.push({start:new Date(active).toISOString(),end:new Date(end).toISOString(),minutes:(end-active)/60000});
 return{date:options.date,zones,slots,totalMinutes:slots.reduce((n,s)=>n+s.minutes,0),notice:'Minute-resolution overlap on the selected local date in the first timezone. Browser timezone data determines DST. Overnight shifts use the holiday/weekend calendar of their starting day.'};
}),"function cs31Overlap(options){\n cs31Date(options.date);const zones=[options.a,options.b];if(zones.some(z=>typeof z!=='string'||z.length>100))throw Error('Use IANA timezone names');const formatters=zones.map(timeZone=>new Intl.DateTimeFormat('en-GB',{timeZone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',weekday:'short',hourCycle:'h23'}));\n const windows=[[cs31Time(options.aStart),cs31Time(options.aEnd)],[cs31Time(options.bStart),cs31Time(options.bEnd)]];if(windows.some(([a,b])=>a===b))throw Error('Working-hour start and end must differ');\n const holidays=[options.aHolidays||'',options.bHolidays||''].map(text=>{cs31Limit(text,30000);const days=text.split(/[\\s,;]+/).filter(Boolean);if(days.length>1000)throw Error('Use at most 1,000 holidays per calendar');return new Set(days.map(cs31Date));});\n const base=Date.parse(options.date+'T00:00:00Z'),start=base-14*3600000,end=base+38*3600000,slots=[];let active=null;\n function working(part,i){let date=part.date,weekday=part.weekday;const[a,b]=windows[i],inside=a<b?part.minute>=a&&part.minute<b:part.minute>=a||part.minute<b;if(!inside)return false;if(a>b&&part.minute<b){date=new Date(Date.parse(date+'T12:00:00Z')-86400000).toISOString().slice(0,10);weekday=new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',weekday:'short'}).format(Date.parse(date+'T12:00:00Z'));}return(!options.weekdays||!['Sat','Sun'].includes(weekday))&&!holidays[i].has(date);}\n for(let ms=start;ms<end;ms+=60000){const p=formatters.map(f=>cs31ZoneParts(ms,f)),ok=p[0].date===options.date&&p.every((part,i)=>working(part,i));if(ok&&active===null)active=ms;if(!ok&&active!==null){slots.push({start:new Date(active).toISOString(),end:new Date(ms).toISOString(),minutes:(ms-active)/60000});active=null;}}\n if(active!==null)slots.push({start:new Date(active).toISOString(),end:new Date(end).toISOString(),minutes:(end-active)/60000});\n return{date:options.date,zones,slots,totalMinutes:slots.reduce((n,s)=>n+s.minutes,0),notice:'Minute-resolution overlap on the selected local date in the first timezone. Browser timezone data determines DST. Overnight shifts use the holiday/weekend calendar of their starting day.'};\n}","cs31Overlap");

__studio33.cs31Hex = (function cs31Hex(value){const text=String(value).trim();if(!/^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(text))throw Error('Use opaque hex colors such as #2b5468');const hex=text.length===4?'#'+[...text.slice(1)].map(c=>c+c).join(''):text;return{hex:hex.toUpperCase(),rgb:[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16))};});

__studio33.cs31Contrast = __studio33.$fn((function cs31Contrast(a,b){const lum=__studio33.$fn(c=>__studio33.cs31Hex(c).rgb.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0),"c=>cs31Hex(c).rgb.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0)","lum"),x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}),"function cs31Contrast(a,b){const lum=c=>cs31Hex(c).rgb.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0),x=lum(a),y=lum(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}","cs31Contrast");

__studio33.cs31Palette = __studio33.$fn((function cs31Palette(source,target=4.5){const colors=[...new Set(__studio33.cs31Limit(source,5000).split(/[\s,;]+/).filter(Boolean).map(__studio33.$fn(x=>__studio33.cs31Hex(x).hex,"x=>cs31Hex(x).hex","")))];if(colors.length<2||colors.length>24)throw Error('Use 2–24 distinct hex colors');if(![3,4.5,7].includes(Number(target)))throw Error('Choose contrast 3, 4.5 or 7');target=Number(target);const pairs=[];for(let i=0;i<colors.length;i++)for(let j=i+1;j<colors.length;j++)pairs.push({foreground:colors[i],background:colors[j],ratio:__studio33.cs31Contrast(colors[i],colors[j]),pass:__studio33.cs31Contrast(colors[i],colors[j])>=target});return{colors,target,pairs};}),"function cs31Palette(source,target=4.5){const colors=[...new Set(cs31Limit(source,5000).split(/[\\s,;]+/).filter(Boolean).map(x=>cs31Hex(x).hex))];if(colors.length<2||colors.length>24)throw Error('Use 2–24 distinct hex colors');if(![3,4.5,7].includes(Number(target)))throw Error('Choose contrast 3, 4.5 or 7');target=Number(target);const pairs=[];for(let i=0;i<colors.length;i++)for(let j=i+1;j<colors.length;j++)pairs.push({foreground:colors[i],background:colors[j],ratio:cs31Contrast(colors[i],colors[j]),pass:cs31Contrast(colors[i],colors[j])>=target});return{colors,target,pairs};}","cs31Palette");

__studio33.cs31Alternative = __studio33.$fn((function cs31Alternative(fg,bg,target=4.5){const original=__studio33.cs31Hex(fg),background=__studio33.cs31Hex(bg).hex;target=Number(target);if(![3,4.5,7].includes(target))throw Error('Choose contrast 3, 4.5 or 7');if(__studio33.cs31Contrast(original.hex,background)>=target)return{color:original.hex,ratio:__studio33.cs31Contrast(original.hex,background),changed:false};const hex=rgb=>'#'+rgb.map(x=>Math.round(x).toString(16).padStart(2,'0')).join('').toUpperCase(),candidates=[];for(const end of [0,255]){const at=t=>hex(original.rgb.map(x=>x+(end-x)*t));if(__studio33.cs31Contrast(at(1),background)<target)continue;let lo=0,hi=1;for(let n=0;n<30;n++){const mid=(lo+hi)/2;if(__studio33.cs31Contrast(at(mid),background)>=target)hi=mid;else lo=mid;}const color=at(hi),rgb=__studio33.cs31Hex(color).rgb;candidates.push({color,ratio:__studio33.cs31Contrast(color,background),distance:rgb.reduce((s,x,i)=>s+(x-original.rgb[i])**2,0)});}if(!candidates.length)throw Error('No alternative meets the selected contrast');candidates.sort((a,b)=>a.distance-b.distance);return{...candidates[0],changed:true};}),"function cs31Alternative(fg,bg,target=4.5){const original=cs31Hex(fg),background=cs31Hex(bg).hex;target=Number(target);if(![3,4.5,7].includes(target))throw Error('Choose contrast 3, 4.5 or 7');if(cs31Contrast(original.hex,background)>=target)return{color:original.hex,ratio:cs31Contrast(original.hex,background),changed:false};const hex=rgb=>'#'+rgb.map(x=>Math.round(x).toString(16).padStart(2,'0')).join('').toUpperCase(),candidates=[];for(const end of [0,255]){const at=t=>hex(original.rgb.map(x=>x+(end-x)*t));if(cs31Contrast(at(1),background)<target)continue;let lo=0,hi=1;for(let n=0;n<30;n++){const mid=(lo+hi)/2;if(cs31Contrast(at(mid),background)>=target)hi=mid;else lo=mid;}const color=at(hi),rgb=cs31Hex(color).rgb;candidates.push({color,ratio:cs31Contrast(color,background),distance:rgb.reduce((s,x,i)=>s+(x-original.rgb[i])**2,0)});}if(!candidates.length)throw Error('No alternative meets the selected contrast');candidates.sort((a,b)=>a.distance-b.distance);return{...candidates[0],changed:true};}","cs31Alternative");

__studio33.cs31Simulate = __studio33.$fn((function cs31Simulate(color,mode){const {rgb}=__studio33.cs31Hex(color),matrices={protan:[[.567,.433,0],[.558,.442,0],[0,.242,.758]],deutan:[[.625,.375,0],[.7,.3,0],[0,.3,.7]],tritan:[[.95,.05,0],[0,.433,.567],[0,.475,.525]],gray:[[.2126,.7152,.0722],[.2126,.7152,.0722],[.2126,.7152,.0722]]};if(mode==='normal')return __studio33.cs31Hex(color).hex;const matrix=matrices[mode];if(!matrix)throw Error('Choose a simulation');return'#'+matrix.map(row=>Math.round(Math.max(0,Math.min(255,row.reduce((v,c,i)=>v+c*rgb[i],0)))).toString(16).padStart(2,'0')).join('').toUpperCase();}),"function cs31Simulate(color,mode){const {rgb}=cs31Hex(color),matrices={protan:[[.567,.433,0],[.558,.442,0],[0,.242,.758]],deutan:[[.625,.375,0],[.7,.3,0],[0,.3,.7]],tritan:[[.95,.05,0],[0,.433,.567],[0,.475,.525]],gray:[[.2126,.7152,.0722],[.2126,.7152,.0722],[.2126,.7152,.0722]]};if(mode==='normal')return cs31Hex(color).hex;const matrix=matrices[mode];if(!matrix)throw Error('Choose a simulation');return'#'+matrix.map(row=>Math.round(Math.max(0,Math.min(255,row.reduce((v,c,i)=>v+c*rgb[i],0)))).toString(16).padStart(2,'0')).join('').toUpperCase();}","cs31Simulate");

__studio33.cs31Timestamp = (function cs31Timestamp(value){if(typeof value!=='string'||value.trim()==='')throw Error('Enter seconds or HH:MM:SS.mmm');const s=value.trim();if(/^\d+(?:\.\d{1,6})?$/.test(s)){const n=Number(s);if(n<=604800)return n;}const m=s.match(/^(?:(\d{1,3}):)?([0-5]?\d):([0-5]\d(?:\.\d{1,6})?)$/);if(!m)throw Error('Use seconds, MM:SS or HH:MM:SS.mmm');const n=(Number(m[1]||0)*60+Number(m[2]))*60+Number(m[3]);if(n>604800)throw Error('Time range limit: seven days');return n;});

__studio33.cs31PCMSize = (function cs31PCMSize(duration,start,end,rate,channels){if(![duration,start,end,rate,channels].every(Number.isFinite)||duration<=0||start<0||end>duration||end<=start||rate<1||!Number.isInteger(channels)||channels<1||channels>32)throw Error('Use a valid loaded audio range');const frames=Math.floor(end*rate)-Math.floor(start*rate);if(frames<1)throw Error('Range contains no complete samples');return{frames,seconds:frames/rate,bytes:44+frames*channels*2,format:'16-bit PCM WAV'};});

__studio33.cs31FrameTimes = (function cs31FrameTimes(duration,start,end,step,retained=0){if(![duration,start,end,step,retained].every(Number.isFinite)||duration<=0||start<0||start>end||end>duration||step<.04||step>3600||retained<0||!Number.isInteger(retained))throw Error('Use a valid range and interval of 0.04–3,600 seconds');const count=Math.floor((end-start)/step+1e-10)+1;if(count>101||count+retained>101)throw Error('Maximum 100 retained frames; increase the interval');const times=Array.from({length:count},(_,i)=>start+i*step).filter(t=>t<duration);if(!times.length||times.length+retained>100)throw Error('Choose 1–100 frame timestamps strictly before the video end');return times;});

__studio33.cs31ClaimReview = __studio33.$fn((function cs31ClaimReview(resume,evidence){__studio33.cs31Limit(resume,200000);__studio33.cs31Limit(evidence,200000);const lines=resume.split(/\r?\n/).filter(x=>x.trim()),reference=evidence.normalize('NFKC').toLowerCase();return lines.filter(x=>/\d|\b(?:expert|certified|led|managed|increased|reduced|improved|saved|million|billion)\b/i.test(x)).slice(0,300).map(line=>{const tokens=line.match(/\b\d[\d,.]*(?:\s*%|\s*(?:million|billion|years?|months?|hours?|days?))?/gi)||[],missing=tokens.filter(t=>!reference.includes(t.normalize('NFKC').toLowerCase()));return{claim:line.slice(0,2000),state:!evidence.trim()?'Evidence not supplied':missing.length?'Numeric evidence needs review':'Manual evidence review needed',missingTokens:missing,notice:'Text matching cannot verify whether a claim is true.'};});}),"function cs31ClaimReview(resume,evidence){cs31Limit(resume,200000);cs31Limit(evidence,200000);const lines=resume.split(/\\r?\\n/).filter(x=>x.trim()),reference=evidence.normalize('NFKC').toLowerCase();return lines.filter(x=>/\\d|\\b(?:expert|certified|led|managed|increased|reduced|improved|saved|million|billion)\\b/i.test(x)).slice(0,300).map(line=>{const tokens=line.match(/\\b\\d[\\d,.]*(?:\\s*%|\\s*(?:million|billion|years?|months?|hours?|days?))?/gi)||[],missing=tokens.filter(t=>!reference.includes(t.normalize('NFKC').toLowerCase()));return{claim:line.slice(0,2000),state:!evidence.trim()?'Evidence not supplied':missing.length?'Numeric evidence needs review':'Manual evidence review needed',missingTokens:missing,notice:'Text matching cannot verify whether a claim is true.'};});}","cs31ClaimReview");

__studio33.cs31Arithmetic = __studio33.$fn((function cs31Arithmetic(source){__studio33.cs31Limit(source,1000);const s=source.replace(/×/g,'*').replace(/[÷]/g,'/').replace(/[−]/g,'-'),tokens=s.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[()+\-*/^]/g)||[];if(tokens.join('')!==s.replace(/\s/g,'')||tokens.length>200||!tokens.length)throw Error('Step view supports numbers, parentheses, +, −, ×, ÷ and powers. Use the calculator for other functions.');let at=0,depth=0;const steps=[];
 const binding={'+':[10,11],'-':[10,11],'*':[20,21],'/':[20,21],'^':[30,30]};
 function parse(min=0){if(++depth>50)throw Error('Arithmetic nesting limit: 50');let t=tokens[at++],node;if(t==='+'||t==='-'){const rhs=parse(25);node={text:'('+t+rhs.text+')'};steps.push({expression:node.text,result:__studio33.evaluate(node.text)});}else if(t==='('){node=parse();if(tokens[at++]!==')')throw Error('Unclosed parenthesis');node={text:'('+node.text+')'};}else if(t&&/^\d|^\./.test(t))node={text:t};else throw Error('Expected a number');while(binding[tokens[at]]&&binding[tokens[at]][0]>=min){const op=tokens[at++],rhs=parse(binding[op][1]);node={text:'('+node.text+op+rhs.text+')'};const result=__studio33.evaluate(node.text);if(!Number.isFinite(result))throw Error('Calculation is not finite');steps.push({expression:node.text,result});}depth--;return node;}
 const node=parse();if(at!==tokens.length)throw Error('Unexpected arithmetic token');return{steps,result:__studio33.evaluate(node.text),notice:'Each step is evaluated with the current calculator engine. Displayed scientific values are approximations; this view does not provide symbolic proofs.'};
}),"function cs31Arithmetic(source){cs31Limit(source,1000);const s=source.replace(/×/g,'*').replace(/[÷]/g,'/').replace(/[−]/g,'-'),tokens=s.match(/(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?|[()+\\-*/^]/g)||[];if(tokens.join('')!==s.replace(/\\s/g,'')||tokens.length>200||!tokens.length)throw Error('Step view supports numbers, parentheses, +, −, ×, ÷ and powers. Use the calculator for other functions.');let at=0,depth=0;const steps=[];\n const binding={'+':[10,11],'-':[10,11],'*':[20,21],'/':[20,21],'^':[30,30]};\n function parse(min=0){if(++depth>50)throw Error('Arithmetic nesting limit: 50');let t=tokens[at++],node;if(t==='+'||t==='-'){const rhs=parse(25);node={text:'('+t+rhs.text+')'};steps.push({expression:node.text,result:evaluate(node.text)});}else if(t==='('){node=parse();if(tokens[at++]!==')')throw Error('Unclosed parenthesis');node={text:'('+node.text+')'};}else if(t&&/^\\d|^\\./.test(t))node={text:t};else throw Error('Expected a number');while(binding[tokens[at]]&&binding[tokens[at]][0]>=min){const op=tokens[at++],rhs=parse(binding[op][1]);node={text:'('+node.text+op+rhs.text+')'};const result=evaluate(node.text);if(!Number.isFinite(result))throw Error('Calculation is not finite');steps.push({expression:node.text,result});}depth--;return node;}\n const node=parse();if(at!==tokens.length)throw Error('Unexpected arithmetic token');return{steps,result:evaluate(node.text),notice:'Each step is evaluated with the current calculator engine. Displayed scientific values are approximations; this view does not provide symbolic proofs.'};\n}","cs31Arithmetic");

__studio33.cs31PDFTokens = (function cs31PDFTokens(text){
 const tokens=[];let i=0,steps=0;while(i<text.length){if(++steps>200000)throw Error('PDF page token limit exceeded');const c=text[i];if(/[\s\0]/.test(c)){i++;continue;}if(c==='%'){while(i<text.length&&!/[\r\n]/.test(text[i]))i++;continue;}
  if(c==='('){let level=1,n=0;i++;while(i<text.length&&level){const v=text[i++];if(v==='\\'){if(i<text.length){if(text[i]==='\r'&&text[i+1]==='\n')i++;if(!/[\r\n]/.test(text[i]))n++;i++;}}else if(v==='('){level++;n++;}else if(v===')'){level--;if(level)n++;}else n++;}if(level)throw Error('Unterminated PDF literal string');tokens.push({kind:'string',size:n});continue;}
  if(c==='<'&&text[i+1]!=='<'){let n=0;i++;while(i<text.length&&text[i]!=='>'){if(!/\s/.test(text[i]))n++;i++;}if(i>=text.length)throw Error('Unterminated PDF hex string');i++;tokens.push({kind:'string',size:Math.ceil(n/2)});continue;}
  if(c==='['||c===']'){tokens.push({kind:c});i++;continue;}
  if('()<>{}'.includes(c)){i+=text[i+1]===c?2:1;tokens.push({kind:'delimiter'});continue;}
  let value='';if(c==='/'){i++;while(i<text.length&&!/[\s\0()[\]<>{}/%]/.test(text[i]))value+=text[i++];tokens.push({kind:'name',value:value.replace(/#([\da-f]{2})/gi,(_,hex)=>String.fromCharCode(parseInt(hex,16)))});continue;}
  while(i<text.length&&!/[\s\0()[\]<>{}/%]/.test(text[i]))value+=text[i++];if(!value){i++;continue;}tokens.push({kind:'word',value});if(value==='BI'){/* Inline images have binary data. Refuse to interpret bytes as text operators. */return{tokens,inlineImage:true,partial:true};}
 }
 return{tokens,inlineImage:false,partial:false};
});

__studio33.cs31PDFDecode = (async function cs31PDFDecode(raw,Name){
 let bytes=raw.getContents(),filter=raw.dict.lookup(Name.of('Filter')),filters=filter?(typeof filter.size==='function'?Array.from({length:filter.size()},(_,i)=>filter.lookup(i).toString()):[filter.toString()]):[];
 if(bytes.length>4*1048576)throw Error('PDF stream exceeds inspection limit');
 for(const f of filters){
  if(f!=='/FlateDecode'&&f!=='/Fl')throw Error('Unsupported PDF stream filter '+f);
  if(typeof DecompressionStream!=='function')throw Error('This browser lacks PDF stream decompression');
  const reader=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate')).getReader(),chunks=[];let size=0;
  try{while(true){const{value,done}=await reader.read();if(done)break;size+=value.length;if(size>4*1048576){await reader.cancel();throw Error('Decoded PDF stream exceeds inspection limit');}chunks.push(value);}}finally{reader.releaseLock();}
  bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
 }
 return bytes;
});

__studio33.cs31Field = __studio33.$fn((function cs31Field(parent,id,label,value='',type='text'){const wrap=__studio33.csText('label','','field'),e=document.createElement(type==='textarea'?'textarea':'input');e.id=id;if(type!=='textarea')e.type=type;e.value=value;e.defaultValue=value;e.setAttribute('aria-label',label);if(type==='textarea'){e.rows=5;e.spellcheck=false;}wrap.append(__studio33.csText('span',label),e);parent.append(wrap);return e;}),"function cs31Field(parent,id,label,value='',type='text'){const wrap=csText('label','','field'),e=document.createElement(type==='textarea'?'textarea':'input');e.id=id;if(type!=='textarea')e.type=type;e.value=value;e.defaultValue=value;e.setAttribute('aria-label',label);if(type==='textarea'){e.rows=5;e.spellcheck=false;}wrap.append(csText('span',label),e);parent.append(wrap);return e;}","cs31Field");

__studio33.cs31Select = __studio33.$fn((function cs31Select(parent,id,label,values,value){const wrap=__studio33.csText('label','','field'),e=document.createElement('select');e.id=id;e.setAttribute('aria-label',label);for(const[v,t]of values)e.append(new Option(t,v,false,v===value));wrap.append(__studio33.csText('span',label),e);parent.append(wrap);return e;}),"function cs31Select(parent,id,label,values,value){const wrap=csText('label','','field'),e=document.createElement('select');e.id=id;e.setAttribute('aria-label',label);for(const[v,t]of values)e.append(new Option(t,v,false,v===value));wrap.append(csText('span',label),e);parent.append(wrap);return e;}","cs31Select");

__studio33.cs31Check = __studio33.$fn((function cs31Check(parent,id,label,checked=false){const wrap=__studio33.csText('label','','cs31-check'),e=document.createElement('input');e.id=id;e.type='checkbox';e.checked=e.defaultChecked=checked;wrap.append(e,__studio33.csText('span',label));parent.append(wrap);return e;}),"function cs31Check(parent,id,label,checked=false){const wrap=csText('label','','cs31-check'),e=document.createElement('input');e.id=id;e.type='checkbox';e.checked=e.defaultChecked=checked;wrap.append(e,csText('span',label));parent.append(wrap);return e;}","cs31Check");

__studio33.cs31Actions = __studio33.$fn((function cs31Actions(parent){const row=__studio33.csText('div','','row studio-actions cs31-actions');parent.append(row);return row;}),"function cs31Actions(parent){const row=csText('div','','row studio-actions cs31-actions');parent.append(row);return row;}","cs31Actions");

__studio33.cs31Output = __studio33.$fn((function cs31Output(parent,id,label='Reviewed output'){const e=__studio33.cs31Field(parent,id,label,'','textarea');e.readOnly=true;return e;}),"function cs31Output(parent,id,label='Reviewed output'){const e=cs31Field(parent,id,label,'','textarea');e.readOnly=true;return e;}","cs31Output");

__studio33.cs31Table = __studio33.$fn((function cs31Table(parent,head,rows){const wrap=__studio33.csText('div','','cs31-table-scroll'),t=document.createElement('table'),thead=document.createElement('thead'),tr=document.createElement('tr');for(const x of head)tr.append(__studio33.csText('th',x));thead.append(tr);const body=document.createElement('tbody');for(const row of rows.slice(0,300)){const tr=document.createElement('tr');for(const cell of row)tr.append(__studio33.csText('td',String(cell??'')));body.append(tr);}t.append(thead,body);wrap.append(t);parent.replaceChildren(wrap);if(rows.length>300)parent.append(__studio33.csText('p','First 300 rows shown; exports contain the full bounded report.','hint'));}),"function cs31Table(parent,head,rows){const wrap=csText('div','','cs31-table-scroll'),t=document.createElement('table'),thead=document.createElement('thead'),tr=document.createElement('tr');for(const x of head)tr.append(csText('th',x));thead.append(tr);const body=document.createElement('tbody');for(const row of rows.slice(0,300)){const tr=document.createElement('tr');for(const cell of row)tr.append(csText('td',String(cell??'')));body.append(tr);}t.append(thead,body);wrap.append(t);parent.replaceChildren(wrap);if(rows.length>300)parent.append(csText('p','First 300 rows shown; exports contain the full bounded report.','hint'));}","cs31Table");

__studio33.cs31Set = __studio33.$fn((function cs31Set(id,value){const e=__studio33.$(id);if(!e)return;e.type==='checkbox'?e.checked=!!value:e.value=String(value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}),"function cs31Set(id,value){const e=$(id);if(!e)return;e.type==='checkbox'?e.checked=!!value:e.value=String(value);e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}","cs31Set");

__studio33.cs31Watch = __studio33.$fn((function cs31Watch(ids,fn){for(const id of ids)__studio33.$(id)?.addEventListener('input',fn);}),"function cs31Watch(ids,fn){for(const id of ids)$(id)?.addEventListener('input',fn);}","cs31Watch");

__studio33.cs31Record = __studio33.$fn((function cs31Record(tool,result,settings={}){const report={app:'calc-studio-result-report',version:1,edition:31,tool,name:__studio33.views[tool],generatedAt:new Date().toISOString(),settings,inputSummary:__studio33.u25InputFields(tool).filter(e=>!e.closest('.cs31-box')).map(e=>({field:e.getAttribute('aria-label')||e.id,characters:e.type==='checkbox'?undefined:e.value.length,type:e.type})),result};__studio33.cs31Reports.set(tool,report);return report;}),"function cs31Record(tool,result,settings={}){const report={app:'calc-studio-result-report',version:1,edition:31,tool,name:views[tool],generatedAt:new Date().toISOString(),settings,inputSummary:u25InputFields(tool).filter(e=>!e.closest('.cs31-box')).map(e=>({field:e.getAttribute('aria-label')||e.id,characters:e.type==='checkbox'?undefined:e.value.length,type:e.type})),result};cs31Reports.set(tool,report);return report;}","cs31Record");

__studio33.cs31JSONDownload = __studio33.$fn((function cs31JSONDownload(name,data){const text=JSON.stringify(data,null,2);if(text.length>8388608)throw Error('Report exceeds 8 MiB');JSON.parse(text);__studio33.downloadFile(name,text,'application/json');}),"function cs31JSONDownload(name,data){const text=JSON.stringify(data,null,2);if(text.length>8388608)throw Error('Report exceeds 8 MiB');JSON.parse(text);downloadFile(name,text,'application/json');}","cs31JSONDownload");

__studio33.cs31ReportActions = __studio33.$fn((function cs31ReportActions(parent,tool,result){const row=__studio33.cs31Actions(parent);__studio33.cs31Button(row,'cs31Report-'+tool,'Export result report',__studio33.$fn(()=>{const value=result();if(!value)throw Error('Generate a current result first');__studio33.cs31JSONDownload(tool+'-report.json',__studio33.cs31Record(tool,value));},"()=>{const value=result();if(!value)throw Error('Generate a current result first');cs31JSONDownload(tool+'-report.json',cs31Record(tool,value));}",""));}),"function cs31ReportActions(parent,tool,result){const row=cs31Actions(parent);cs31Button(row,'cs31Report-'+tool,'Export result report',()=>{const value=result();if(!value)throw Error('Generate a current result first');cs31JSONDownload(tool+'-report.json',cs31Record(tool,value));});}","cs31ReportActions");

__studio33.cs31Source = __studio33.$fn((function cs31Source(){if(!__studio33.cs31WorkerSource)__studio33.cs31WorkerSource=__studio33.u22JSONSource+'\n'+[__studio33.strictJSON,__studio33.cs31Limit,__studio33.cs31Schema,__studio33.cs31ValueStates,__studio33.cs31ApexName,__studio33.cs31ApexString,__studio33.cs31Apex,__studio33.cs31Invisible,__studio33.cs31TextChange,__studio33.cs31Date,__studio33.cs31Time,__studio33.cs31ZoneParts,__studio33.cs31Overlap,__studio33.cs31ClaimReview].map(f=>f.toString()).join('\n')+'\nself.job=({kind,args})=>{self.postMessage({progress:.1,message:"Reviewing input…"});return ({schema:cs31Schema,states:cs31ValueStates,apex:cs31Apex,invisible:cs31Invisible,text:cs31TextChange,overlap:cs31Overlap,claims:cs31ClaimReview})[kind](...args)}';return __studio33.cs31WorkerSource;}),"function cs31Source(){if(!cs31WorkerSource)cs31WorkerSource=u22JSONSource+'\\n'+[strictJSON,cs31Limit,cs31Schema,cs31ValueStates,cs31ApexName,cs31ApexString,cs31Apex,cs31Invisible,cs31TextChange,cs31Date,cs31Time,cs31ZoneParts,cs31Overlap,cs31ClaimReview].map(f=>f.toString()).join('\\n')+'\\nself.job=({kind,args})=>{self.postMessage({progress:.1,message:\"Reviewing input…\"});return ({schema:cs31Schema,states:cs31ValueStates,apex:cs31Apex,invisible:cs31Invisible,text:cs31TextChange,overlap:cs31Overlap,claims:cs31ClaimReview})[kind](...args)}';return cs31WorkerSource;}","cs31Source");

__studio33.cs31Cancel = __studio33.$fn((function cs31Cancel(key){const task=__studio33.cs31Tasks.get(key);if(task){__studio33.cs31Tasks.delete(key);__studio33.stopEditionWorker(key);__studio33.cs31Status(task.box,'Processing cancelled. Run again when ready.');task.reject(new DOMException('Cancelled','AbortError'));__studio33.refreshTaskUI();}}),"function cs31Cancel(key){const task=cs31Tasks.get(key);if(task){cs31Tasks.delete(key);stopEditionWorker(key);cs31Status(task.box,'Processing cancelled. Run again when ready.');task.reject(new DOMException('Cancelled','AbortError'));refreshTaskUI();}}","cs31Cancel");

__studio33.cs31Job = __studio33.$fn((function cs31Job(key,kind,args,box){__studio33.cs31Cancel(key);return new Promise(__studio33.$fn((resolve,reject)=>{const entry={reject,box};__studio33.cs31Tasks.set(key,entry);__studio33.cs31Status(box,'Processing…');__studio33.runStudioWorker(key,__studio33.cs31Source(),{kind,args},__studio33.$fn(result=>{if(__studio33.cs31Tasks.get(key)!==entry)return;__studio33.cs31Tasks.delete(key);resolve(result);},"result=>{if(cs31Tasks.get(key)!==entry)return;cs31Tasks.delete(key);resolve(result);}",""),box.querySelector('.cs31-status').id||(box.querySelector('.cs31-status').id=key+'Status'),60000,__studio33.$fn(()=>{if(__studio33.cs31Tasks.get(key)===entry){__studio33.cs31Tasks.delete(key);reject(new DOMException('Processing stopped','AbortError'));}},"()=>{if(cs31Tasks.get(key)===entry){cs31Tasks.delete(key);reject(new DOMException('Processing stopped','AbortError'));}}",""));},"(resolve,reject)=>{const entry={reject,box};cs31Tasks.set(key,entry);cs31Status(box,'Processing…');runStudioWorker(key,cs31Source(),{kind,args},result=>{if(cs31Tasks.get(key)!==entry)return;cs31Tasks.delete(key);resolve(result);},box.querySelector('.cs31-status').id||(box.querySelector('.cs31-status').id=key+'Status'),60000,()=>{if(cs31Tasks.get(key)===entry){cs31Tasks.delete(key);reject(new DOMException('Processing stopped','AbortError'));}});}",""));}),"function cs31Job(key,kind,args,box){cs31Cancel(key);return new Promise((resolve,reject)=>{const entry={reject,box};cs31Tasks.set(key,entry);cs31Status(box,'Processing…');runStudioWorker(key,cs31Source(),{kind,args},result=>{if(cs31Tasks.get(key)!==entry)return;cs31Tasks.delete(key);resolve(result);},box.querySelector('.cs31-status').id||(box.querySelector('.cs31-status').id=key+'Status'),60000,()=>{if(cs31Tasks.get(key)===entry){cs31Tasks.delete(key);reject(new DOMException('Processing stopped','AbortError'));}});});}","cs31Job");

__studio33.cs31VideoSettings = __studio33.$fn((function cs31VideoSettings(){return{width:Number(__studio33.$('cs31VideoWidth')?.value||1920),format:__studio33.$('cs31VideoFormat')?.value||'image/png',quality:Number(__studio33.$('cs31VideoQuality')?.value||90)/100};}),"function cs31VideoSettings(){return{width:Number($('cs31VideoWidth')?.value||1920),format:$('cs31VideoFormat')?.value||'image/png',quality:Number($('cs31VideoQuality')?.value||90)/100};}","cs31VideoSettings");

__studio33.cs31WAVJob = (function cs31WAVJob(job){const{data,rate,first,frames,channels,gain,fadeIn,fadeOut}=job;if(!Number.isInteger(frames)||frames<1||channels<1||frames*channels*2>150*1048576)throw Error('Invalid audio export size');const raw=new ArrayBuffer(44+frames*channels*2),view=new DataView(raw),str=(o,s)=>[...s].forEach((c,i)=>view.setUint8(o+i,c.charCodeAt(0)));str(0,'RIFF');view.setUint32(4,raw.byteLength-8,true);str(8,'WAVE');str(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,channels,true);view.setUint32(24,rate,true);view.setUint32(28,rate*channels*2,true);view.setUint16(32,channels*2,true);view.setUint16(34,16,true);str(36,'data');view.setUint32(40,frames*channels*2,true);let clips=0,o=44;for(let n=0;n<frames;n++){if(n%262144===0)self.postMessage({progress:n/frames,message:'Encoding audio samples…'});const fade=Math.min(1,fadeIn?n/fadeIn:1,fadeOut?(frames-1-n)/fadeOut:1);for(let c=0;c<channels;c++){let v=data[c][first+n]*gain*fade;if(Math.abs(v)>1)clips++;v=Math.max(-1,Math.min(1,v));view.setInt16(o,Math.round(v*(v<0?32768:32767)),true);o+=2;}}return{bytes:new Uint8Array(raw),clips,seconds:frames/rate};});

__studio33.cs31Leave = __studio33.$fn((function cs31Leave(next){if(__studio33.activeView===next)return;for(const key of [...__studio33.cs31Tasks.keys()])__studio33.cs31Cancel(key);for(const key of ['cs31-pdf','cs31-audio']){const job=__studio33.editionWorkers.get(key);if(job){__studio33.stopEditionWorker(key);job.failure?.();}}}),"function cs31Leave(next){if(activeView===next)return;for(const key of [...cs31Tasks.keys()])cs31Cancel(key);for(const key of ['cs31-pdf','cs31-audio']){const job=editionWorkers.get(key);if(job){stopEditionWorker(key);job.failure?.();}}}","cs31Leave");
}
export const steps=[
[5,function initialize_5(__studio33){
__studio33.$ = __studio33.$fn(id=>{const e=document.getElementById(id);if(e)return e;const cached=__studio33.cs30NodeCache.get(id);if(cached&&__studio33.cs30TemplateRoots.has(cached.getRootNode()))return cached;__studio33.cs30NodeCache.delete(id);for(const root of __studio33.cs30TemplateRoots){const found=root.getElementById(id);if(found){__studio33.cs30NodeCache.set(id,found);return found;}}return null},"id=>{const e=document.getElementById(id);if(e)return e;const cached=cs30NodeCache.get(id);if(cached&&cs30TemplateRoots.has(cached.getRootNode()))return cached;cs30NodeCache.delete(id);for(const root of cs30TemplateRoots){const found=root.getElementById(id);if(found){cs30NodeCache.set(id,found);return found;}}return null}","$");

}],
[7,function initialize_7(__studio33){
__studio33.angle = __studio33.storage.get('advanced-calculator-angle','DEG');

}],
[8,function initialize_8(__studio33){
if(!['DEG','RAD'].includes(__studio33.angle))__studio33.angle='DEG';
}],
[9,function initialize_9(__studio33){
__studio33.ans = Number(__studio33.storage.get('advanced-calculator-ans',0));

}],
[10,function initialize_10(__studio33){
if(!Number.isFinite(__studio33.ans))__studio33.ans=0;
}],
[11,function initialize_11(__studio33){
__studio33.memory = __studio33.storage.get('calc-studio-memory',null);

}],
[12,function initialize_12(__studio33){
if(__studio33.memory!==null&&!Number.isFinite(__studio33.memory))__studio33.memory=null;
}],
[13,function initialize_13(__studio33){
__studio33.history = __studio33.storage.get('advanced-calculator-history',[]);

}],
[14,function initialize_14(__studio33){
if(!Array.isArray(__studio33.history))__studio33.history=[];
}],
[15,function initialize_15(__studio33){
__studio33.history=__studio33.history.filter(x=>x&&typeof x.expr==='string'&&typeof x.result==='string').slice(0,100);
}],
[16,function initialize_16(__studio33){
__studio33.currentValue = null;
__studio33.conversionValue = null;
__studio33.conversionMeta = null;
__studio33.tool = 'percent';
__studio33.toastTimer = undefined;

}],
[17,function initialize_17(__studio33){
__studio33.formatting = __studio33.normalizeFormat(__studio33.storage.get('calc-studio-formatting',{}));

}],
[18,function initialize_18(__studio33){
__studio33.editStacks = new Map();

}],
[20,function initialize_20(__studio33){
__studio33.fmt = __studio33.formatNumber;

}],
[21,function initialize_21(__studio33){
__studio33.finite = n=>{if(!Number.isFinite(n))throw Error('Result is outside the finite real-number range');return n};

}],
[22,function initialize_22(__studio33){
__studio33.integer = n=>{if(!Number.isSafeInteger(n)||n<0)throw Error('Use nonnegative safe integers');return n};

}],
[32,function initialize_32(__studio33){
__studio33.sci = [['sin','sin'],['cos','cos'],['tan','tan'],['sin⁻¹','asin'],['cos⁻¹','acos'],['tan⁻¹','atan'],['√x','sqrt'],['∛x','cbrt'],['x²','^2',false],['xʸ','^',false],['ln','ln'],['log₁₀','log'],['eˣ','exp'],['|x|','abs'],['x!','!',false],['π','pi',false],['e','e',false],['Ans','Ans',false],['nCr','nCr'],['nPr','nPr'],['root','root'],['mod','mod'],['(', '(',false],[')',')',false]];

}],
[34,function initialize_34(__studio33){
__studio33.commaButton = document.createElement('button');

}],
[35,function initialize_35(__studio33){
__studio33.commaButton.className='key function';
}],
[36,function initialize_36(__studio33){
__studio33.commaButton.textContent=',';
}],
[37,function initialize_37(__studio33){
__studio33.commaButton.title='Separate function arguments';
}],
[38,function initialize_38(__studio33){
__studio33.commaButton.onclick=__studio33.$fn(()=>__studio33.insert(','),"()=>insert(',')","");
}],
[40,function initialize_40(__studio33){
__studio33.nums = [['AC','clear'],['±','negate'],['%','%'],['÷','/'],['7','7'],['8','8'],['9','9'],['×','*'],['4','4'],['5','5'],['6','6'],['−','-'],['1','1'],['2','2'],['3','3'],['+','+'],['0','0'],['.','.'],['⌫','backspace'],['=','equals']];

}],
[47,function initialize_47(__studio33){
__studio33.science(__studio33.storage.get('calc-studio-scientific',true));
}],
[50,function initialize_50(__studio33){
__studio33.memoryLabel();
}],
[53,function initialize_53(__studio33){
__studio33.retiredThemes = new Set(['amber', 'rose', 'slate', 'ocean', 'sand', 'violet', 'copper', 'midnight', 'contrast', 'light', 'dark', 'glass']);

}],
[54,function initialize_54(__studio33){
__studio33.themes = {cartoon:'Cartoonish',forest:'Forest',sky:'Sky & clouds',neon:'Neon',pearl:'Pearl',graphite:'Graphite'};

}],
[56,function initialize_56(__studio33){
for(const [name,label] of Object.entries(__studio33.themes)){const b=document.createElement('button');b.className='theme-choice';b.dataset.theme=name;b.innerHTML='<b>'+label+'</b><span class="mini-keys"><i>7</i><i>+</i><i>=</i></span>';b.onclick=__studio33.$fn(()=>{__studio33.setTheme(name);__studio33.themeOpen(false);__studio33.$('themeToggle').focus()},"()=>{setTheme(name);themeOpen(false);$('themeToggle').focus()}","");__studio33.$('themeGrid').append(b)}
}],
[57,function initialize_57(__studio33){
__studio33.setTheme(__studio33.storage.get('calc-studio-theme','forest'));
}],
[59,function initialize_59(__studio33){
__studio33.$('themeToggle').onclick=__studio33.$fn(()=>__studio33.themeOpen(__studio33.$('themeMenu').hidden),"()=>themeOpen($('themeMenu').hidden)","");
}],
[60,function initialize_60(__studio33){
document.addEventListener('click',__studio33.$fn(e=>{if(!e.target.closest('.theme-wrap'))__studio33.themeOpen(false)},"e=>{if(!e.target.closest('.theme-wrap'))themeOpen(false)}",""));
}],
[61,function initialize_61(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if(e.key==='Escape')__studio33.themeOpen(false)},"e=>{if(e.key==='Escape')themeOpen(false)}",""));
}],
[63,function initialize_63(__studio33){
__studio33.toggleHistory(__studio33.storage.get('calc-studio-history-visible',false));
}],
[64,function initialize_64(__studio33){
__studio33.$('historyToggle').onclick=__studio33.$fn(()=>__studio33.toggleHistory(__studio33.$('historyPanel').hidden),"()=>toggleHistory($('historyPanel').hidden)","");
}],
[65,function initialize_65(__studio33){
__studio33.$('minimizeHistory').onclick=__studio33.$fn(()=>{__studio33.toggleHistory(false);__studio33.$('historyToggle').focus()},"()=>{toggleHistory(false);$('historyToggle').focus()}","");
}],
[69,function initialize_69(__studio33){
__studio33.$('clearHistory').onclick=__studio33.$fn(()=>{const previous=__studio33.history;__studio33.history=[];__studio33.storage.set('advanced-calculator-history',__studio33.history);__studio33.renderHistory();__studio33.toast('History cleared');const undo=document.createElement('button');undo.textContent='Undo';undo.style.marginLeft='14px';undo.onclick=__studio33.$fn(()=>{__studio33.history=previous;__studio33.storage.set('advanced-calculator-history',__studio33.history);__studio33.renderHistory();__studio33.toast('History restored')},"()=>{history=previous;storage.set('advanced-calculator-history',history);renderHistory();toast('History restored')}","");__studio33.$('toast').append(undo);clearTimeout(__studio33.toastTimer);__studio33.toastTimer=setTimeout(__studio33.$fn(()=>__studio33.$('toast').hidden=true,"()=>$('toast').hidden=true",""),7000)},"()=>{const previous=history;history=[];storage.set('advanced-calculator-history',history);renderHistory();toast('History cleared');const undo=document.createElement('button');undo.textContent='Undo';undo.style.marginLeft='14px';undo.onclick=()=>{history=previous;storage.set('advanced-calculator-history',history);renderHistory();toast('History restored')};$('toast').append(undo);clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,7000)}","");
}],
[70,function initialize_70(__studio33){
__studio33.$('exportHistory').onclick=__studio33.$fn(()=>{if(!__studio33.history.length)return __studio33.toast('No history to export');const cell=v=>'"'+String(v??'').replace(/^[=+\-@\t\r]/,"'$&").replace(/"/g,'""')+'"';const csv='Expression,Result,Angle,Time,Label,Note,Pinned,RawValue\r\n'+__studio33.history.map(x=>[x.expr,x.result,x.angle,x.time,x.label||'',x.note||'',x.pinned?'yes':'no',Number.isFinite(x.value)?String(x.value):''].map(cell).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='calculator-history.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)},"()=>{if(!history.length)return toast('No history to export');const cell=v=>'\"'+String(v??'').replace(/^[=+\\-@\\t\\r]/,\"'$&\").replace(/\"/g,'\"\"')+'\"';const csv='Expression,Result,Angle,Time,Label,Note,Pinned,RawValue\\r\\n'+history.map(x=>[x.expr,x.result,x.angle,x.time,x.label||'',x.note||'',x.pinned?'yes':'no',Number.isFinite(x.value)?String(x.value):''].map(cell).join(',')).join('\\r\\n');const url=URL.createObjectURL(new Blob(['\\uFEFF'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='calculator-history.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}","");
}],
[71,function initialize_71(__studio33){
__studio33.$('helpToggle').onclick=__studio33.$fn(()=>{__studio33.$('helpPanel').hidden=!__studio33.$('helpPanel').hidden;__studio33.$('helpToggle').setAttribute('aria-expanded',String(!__studio33.$('helpPanel').hidden))},"()=>{$('helpPanel').hidden=!$('helpPanel').hidden;$('helpToggle').setAttribute('aria-expanded',String(!$('helpPanel').hidden))}","");
}],
[72,function initialize_72(__studio33){
__studio33.unitGroups = {length:{m:['Metres',1],km:['Kilometres',1000],cm:['Centimetres',.01],mm:['Millimetres',.001],ft:['Feet',.3048],in:['Inches',.0254],yd:['Yards',.9144],mi:['Miles',1609.344]},area:{m2:['Square metres',1],ft2:['Square feet',.09290304],km2:['Square kilometres',1e6],acre:['Acres',4046.8564224],hectare:['Hectares',10000]},mass:{kg:['Kilograms',1],g:['Grams',.001],mg:['Milligrams',1e-6],lb:['Pounds',.45359237],oz:['Ounces',.028349523125],t:['Metric tonnes',1000]},temperature:{c:['Celsius (°C)',1],f:['Fahrenheit (°F)',1],k:['Kelvin (K)',1]},volume:{l:['Litres',1],ml:['Millilitres',.001],m3:['Cubic metres',1000],usgal:['US gallons',3.785411784],ukgal:['Imperial gallons',4.54609],cup:['US cups',.2365882365]},speed:{ms:['Metres / second',1],kmh:['Kilometres / hour',1/3.6],mph:['Miles / hour',.44704],knot:['Knots',.5144444444444445]},time:{s:['Seconds',1],min:['Minutes',60],h:['Hours',3600],d:['Days',86400],wk:['Weeks',604800]},data:{b:['Bytes',1],bit:['Bits',.125],kb:['kB (1000 B)',1000],mb:['MB (10⁶ B)',1e6],gb:['GB (10⁹ B)',1e9],tb:['TB (10¹² B)',1e12],kib:['KiB (1024 B)',1024],mib:['MiB (1024² B)',1048576],gib:['GiB (1024³ B)',1073741824]},energy:{j:['Joules',1],kj:['Kilojoules',1000],cal:['Calories (thermochemical)',4.184],kcal:['Kilocalories',4184],kwh:['Kilowatt-hours',3.6e6]},pressure:{pa:['Pascals',1],kpa:['Kilopascals',1000],bar:['Bar',100000],psi:['PSI',6894.757293168],atm:['Atmospheres',101325]}};

}],
[73,function initialize_73(__studio33){
__studio33.currencies = {USD:'US dollar',INR:'Indian rupee',EUR:'Euro',GBP:'British pound',AED:'UAE dirham',AUD:'Australian dollar',CAD:'Canadian dollar',SGD:'Singapore dollar',JPY:'Japanese yen',CHF:'Swiss franc',CNY:'Chinese yuan',NZD:'New Zealand dollar',SAR:'Saudi riyal',QAR:'Qatari riyal',KWD:'Kuwaiti dinar',BHD:'Bahraini dinar',OMR:'Omani rial',HKD:'Hong Kong dollar',KRW:'South Korean won',THB:'Thai baht',MYR:'Malaysian ringgit',IDR:'Indonesian rupiah',PHP:'Philippine peso',VND:'Vietnamese dong',BDT:'Bangladeshi taka',NPR:'Nepalese rupee',LKR:'Sri Lankan rupee',PKR:'Pakistani rupee',ZAR:'South African rand',BRL:'Brazilian real',MXN:'Mexican peso',SEK:'Swedish krona',NOK:'Norwegian krone',DKK:'Danish krone',PLN:'Polish zloty',TRY:'Turkish lira'};

}],
[74,function initialize_74(__studio33){
__studio33.rateCache = __studio33.storage.get('calc-studio-rates',{});

}],
[75,function initialize_75(__studio33){
if(!__studio33.rateCache||typeof __studio33.rateCache!=='object'||Array.isArray(__studio33.rateCache))__studio33.rateCache={};
}],
[76,function initialize_76(__studio33){
__studio33.requestId = 0;
__studio33.controller = null;
__studio33.debounce = undefined;

}],
[91,function initialize_91(__studio33){
document.querySelectorAll('[data-tool]').forEach(__studio33.$fn(b=>b.onclick=__studio33.$fn(()=>{__studio33.tool=b.dataset.tool;document.querySelectorAll('[data-tool]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));__studio33.renderTools()},"b=>b.onclick=()=>{tool=b.dataset.tool;document.querySelectorAll('[data-tool]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderTools()}",""),"()=>{tool=b.dataset.tool;document.querySelectorAll('[data-tool]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));renderTools()}",""));
}],
[93,function initialize_93(__studio33){
__studio33.recentTools = __studio33.storage.get("calc-studio-recents-v6",[]);

}],
[94,function initialize_94(__studio33){
if(!Array.isArray(__studio33.recentTools))__studio33.recentTools=[];
}],
[95,function initialize_95(__studio33){
__studio33.editorFullScreen = false;

}],
[97,function initialize_97(__studio33){
Object.assign(__studio33.views,{annotation:'Image Annotation & Redaction',audioeditor:'Audio Trimmer & Editor',videoframes:'Video Frame Extractor',pdfform:'PDF Form Filler',formdesigner:'Offline Form Designer',flashcards:'Flashcards & Study Mode',presentationtimer:'Presentation Timer',keyboard:'Keyboard Tester',contactsheet:'Image Contact Sheet Builder',kanban:'Personal Kanban Board'});
}],
[100,function initialize_100(__studio33){
Object.assign(__studio33.views,{dataworkbench:'Data Workbench',reconciliation:'Reconciliation Studio',workflows:'Workflow Builder',responsedashboard:'Form Response Dashboard',jsonstudio:'JSON Studio',texttoolkit:'Text Toolkit',datetoolkit:'Date & Time Toolkit',pdfworkspace:'PDF Workspace',projectworkspaces:'Saved Project Workspaces'});
}],
[101,function initialize_101(__studio33){
Object.assign(__studio33.views,{comparisonstudio:'Comparison Studio',integrationstudio:'Integration Studio',imagestudio:'Image Studio',formsworkspace:'Forms Workspace'});
}],
[102,function initialize_102(__studio33){
Object.assign(__studio33.views,{apiclient:'Live API client',jwtworkspace:'JWT tool',hashworkspace:'Hash & file inspection',financeworkspace:'Finance & loan tools',conversionworkspace:'Converters',statistics:'Statistics'});
}],
[103,function initialize_103(__studio33){
__studio33.reservedNames = new Set(['pi','e','ans','sin','cos','tan','asin','acos','atan','sinh','cosh','tanh','sqrt','cbrt','ln','log','exp','abs','floor','ceil','round','root','ncr','npr','mod','min','max']);

}],
[117,function initialize_117(__studio33){
__studio33.$('densityToggle').onclick=__studio33.$fn(()=>__studio33.setCompact(!__studio33.compact),"()=>setCompact(!compact)","");
}],
[118,function initialize_118(__studio33){
__studio33.$('workspacePicker').onchange=__studio33.$fn(()=>__studio33.openTab(__studio33.$('workspacePicker').value),"()=>openTab($('workspacePicker').value)","");
}],
[119,function initialize_119(__studio33){
__studio33.setCompact(__studio33.compact);
}],
[120,function initialize_120(__studio33){
if(__studio33.compact&&!__studio33.storage.get('calc-studio-v2-initialized',false))__studio33.toggleHistory(false);
}],
[121,function initialize_121(__studio33){
__studio33.storage.set('calc-studio-v2-initialized',true);
}],
[122,function initialize_122(__studio33){
__studio33.commandItems = [];
__studio33.commandIndex = 0;
__studio33.commandFocus = null;

}],
[126,function initialize_126(__studio33){
__studio33.$('commandToggle').onclick=__studio33.showCommands;
}],
[127,function initialize_127(__studio33){
__studio33.$('commandClose').onclick=__studio33.closeCommands;
}],
[128,function initialize_128(__studio33){
__studio33.$('commandSearch').oninput=__studio33.$fn(()=>{__studio33.commandIndex=0;__studio33.renderCommands()},"()=>{commandIndex=0;renderCommands()}","");
}],
[129,function initialize_129(__studio33){
__studio33.$('commandOverlay').onclick=__studio33.$fn(e=>{if(e.target===__studio33.$('commandOverlay'))__studio33.closeCommands()},"e=>{if(e.target===$('commandOverlay'))closeCommands()}","");
}],
[130,function initialize_130(__studio33){
__studio33.$('commandSearch').onkeydown=__studio33.$fn(e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();__studio33.commandIndex=(__studio33.commandIndex+(e.key==='ArrowDown'?1:-1)+__studio33.commandItems.length)%Math.max(1,__studio33.commandItems.length);__studio33.renderCommands()}if(e.key==='Enter'&&__studio33.commandItems.length){e.preventDefault();__studio33.openTab(__studio33.commandItems[__studio33.commandIndex][0]);__studio33.closeCommands()}},"e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();commandIndex=(commandIndex+(e.key==='ArrowDown'?1:-1)+commandItems.length)%Math.max(1,commandItems.length);renderCommands()}if(e.key==='Enter'&&commandItems.length){e.preventDefault();openTab(commandItems[commandIndex][0]);closeCommands()}}","");
}],
[131,function initialize_131(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();__studio33.showCommands()}if(!__studio33.$('commandOverlay').hidden){if(e.key==='Escape'){e.preventDefault();__studio33.closeCommands()}if(e.key==='Tab'){const focusable=[...__studio33.$('commandOverlay').querySelectorAll('button,input')].filter(x=>!x.disabled),first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}},"e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();showCommands()}if(!$('commandOverlay').hidden){if(e.key==='Escape'){e.preventDefault();closeCommands()}if(e.key==='Tab'){const focusable=[...$('commandOverlay').querySelectorAll('button,input')].filter(x=>!x.disabled),first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}}",""));
}],
[134,function initialize_134(__studio33){
__studio33.notebookExample = 'price = 250\nqty = 4\nsubtotal = price * qty\ntax = subtotal * 18%\ntotal = subtotal + tax\n# Change price or qty to update everything\ntotal / 2';

}],
[149,function initialize_149(__studio33){
__studio33.currentExact = null;

}],
[154,function initialize_154(__studio33){
__studio33.dayMs = 86400000;

}],
[168,function initialize_168(__studio33){
__studio33.financeLoans = null;

}],
[180,function initialize_180(__studio33){
__studio33.initialFormulas = [{id:'total-price',name:'Total price',variables:['price','qty','tax'],expression:'price * qty * (1 + tax/100)',values:{price:'250',qty:'4',tax:'18'}},{id:'rectangle-area',name:'Rectangle area',variables:['width','height'],expression:'width * height',values:{width:'10',height:'12'}}];

}],
[181,function initialize_181(__studio33){
__studio33.formulaList = __studio33.storage.get('calc-studio-formulas',__studio33.initialFormulas);
__studio33.selectedFormula = null;
__studio33.formulaValue = null;

}],
[183,function initialize_183(__studio33){
try{if(!Array.isArray(__studio33.formulaList)||__studio33.formulaList.length>100)throw Error();__studio33.formulaList=__studio33.formulaList.map(__studio33.normalizeFormula)}catch{__studio33.formulaList=__studio33.initialFormulas.map(__studio33.normalizeFormula)}
}],
[199,function initialize_199(__studio33){
__studio33.renderFormulaOptions();
}],
[200,function initialize_200(__studio33){
__studio33.loadFormula(__studio33.formulaList[0]?.id||'');
}],
[223,function initialize_223(__studio33){
__studio33.savedGraph = __studio33.storage.get('calc-studio-graph',null);

}],
[226,function initialize_226(__studio33){
__studio33.renderFavorites();
}],
[227,function initialize_227(__studio33){
__studio33.renderNotebook();
}],
[228,function initialize_228(__studio33){
__studio33.renderEquationFields();
}],
[229,function initialize_229(__studio33){
__studio33.renderFractions();
}],
[230,function initialize_230(__studio33){
__studio33.renderDateFields();
}],
[231,function initialize_231(__studio33){
__studio33.renderFinanceFields();
}],
[232,function initialize_232(__studio33){
__studio33.renderProgrammer();
}],
[244,function initialize_244(__studio33){
__studio33.$('undoEdit').onclick=__studio33.$fn(()=>__studio33.replayEdit(false),"()=>replayEdit(false)","");
}],
[245,function initialize_245(__studio33){
__studio33.$('redoEdit').onclick=__studio33.$fn(()=>__studio33.replayEdit(true),"()=>replayEdit(true)","");
}],
[247,function initialize_247(__studio33){
for(const id of __studio33.undoIds){const el=__studio33.$(id);el.dataset.undo='true';__studio33.recordEdit(id);el.addEventListener('focus',__studio33.$fn(()=>{__studio33.lastEditor=id;__studio33.updateUndoButtons()},"()=>{lastEditor=id;updateUndoButtons()}",""));el.addEventListener('input',__studio33.$fn(()=>__studio33.recordEdit(id),"()=>recordEdit(id)",""))}
}],
[254,function initialize_254(__studio33){
__studio33.sessions=__studio33.storage.get('calc-studio-sessions',null);
}],
[261,function initialize_261(__studio33){
__studio33.renderSessionOptions();
}],
[262,function initialize_262(__studio33){
__studio33.renderNotebook();
}],
[263,function initialize_263(__studio33){
__studio33.preview();
}],
[272,function initialize_272(__studio33){
__studio33.setNotebookSplit(__studio33.storage.get('calc-studio-notebook-split',55));
}],
[273,function initialize_273(__studio33){
__studio33.history=__studio33.history.map(__studio33.$fn(item=>({...item,id:typeof item.id==='string'?item.id:__studio33.newId('hist'),label:typeof item.label==='string'?item.label.slice(0,80):'',note:typeof item.note==='string'?item.note.slice(0,1000):'',pinned:item.pinned===true}),"item=>({...item,id:typeof item.id==='string'?item.id:newId('hist'),label:typeof item.label==='string'?item.label.slice(0,80):'',note:typeof item.note==='string'?item.note.slice(0,1000):'',pinned:item.pinned===true})",""));
}],
[274,function initialize_274(__studio33){
__studio33.storage.set('advanced-calculator-history',__studio33.history);
}],
[287,function initialize_287(__studio33){
__studio33.matrixText = '';

}],
[301,function initialize_301(__studio33){
__studio33.presets = __studio33.storage.get('calc-studio-presets',[]);
__studio33.selectedPreset = null;

}],
[303,function initialize_303(__studio33){
try{if(!Array.isArray(__studio33.presets)||__studio33.presets.length>100)throw Error();__studio33.presets=__studio33.presets.map(__studio33.normalizePreset)}catch{__studio33.presets=[]}
}],
[312,function initialize_312(__studio33){
__studio33.presetUnits();
}],
[313,function initialize_313(__studio33){
__studio33.renderPresetOptions();
}],
[323,function initialize_323(__studio33){
__studio33.reviewedBackup = null;
__studio33.undoBackup = null;

}],
[336,function initialize_336(__studio33){
__studio33.syncFormatting();
}],
[337,function initialize_337(__studio33){
__studio33.renderMeasurements();
}],
[338,function initialize_338(__studio33){
__studio33.renderMatrices();
}],
[339,function initialize_339(__studio33){
__studio33.renderCalculus();
}],
[340,function initialize_340(__studio33){
__studio33.presetType();
}],
[341,function initialize_341(__studio33){
__studio33.updateUndoButtons();
}],
[342,function initialize_342(__studio33){
__studio33.developerLimit = 2*1024*1024;

}],
[345,function initialize_345(__studio33){
__studio33.charDebounce = undefined;

}],
[360,function initialize_360(__studio33){
__studio33.jsonMode = 'pretty';
__studio33.jsonDebounce = undefined;
__studio33.jsonReady = false;

}],
[377,function initialize_377(__studio33){
__studio33.diffResult = null;
__studio33.diffVisible = 200;

}],
[393,function initialize_393(__studio33){
__studio33.renderCharacters();
}],
[394,function initialize_394(__studio33){
__studio33.jsonButtons();
}],
[399,function initialize_399(__studio33){
__studio33.encodingReady = false;

}],
[411,function initialize_411(__studio33){
__studio33.regexWorkerSource = 'const job='+__studio33.regexWorkerJob.toString()+';self.onmessage=function(event){try{self.postMessage({ok:true,result:job(event.data)})}catch(e){self.postMessage({ok:false,error:e.message})}}';

}],
[412,function initialize_412(__studio33){
__studio33.regexWorker = null;
__studio33.regexWorkerURL = null;
__studio33.regexTimer = null;
__studio33.regexJobId = 0;

}],
[424,function initialize_424(__studio33){
__studio33.csvReady = false;

}],
[439,function initialize_439(__studio33){
__studio33.timestampMillis = null;
__studio33.timestampCopyText = '';

}],
[450,function initialize_450(__studio33){
__studio33.schemaBundleSource="";

}],
[455,function initialize_455(__studio33){
__studio33.$('categoryPicker').onchange=__studio33.$fn(()=>__studio33.openTab(__studio33.toolCategories[__studio33.$('categoryPicker').value].tools[0]),"()=>openTab(toolCategories[$('categoryPicker').value].tools[0])","");
}],
[457,function initialize_457(__studio33){
__studio33.$('fullScreenToggle').onclick=__studio33.$fn(()=>__studio33.setEditorFullScreen(!__studio33.editorFullScreen),"()=>setEditorFullScreen(!editorFullScreen)","");
}],
[458,function initialize_458(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if(e.key==='Escape'&&__studio33.editorFullScreen&&__studio33.$('commandOverlay').hidden){e.preventDefault();e.stopPropagation();__studio33.setEditorFullScreen(false)}},"e=>{if(e.key==='Escape'&&editorFullScreen&&$('commandOverlay').hidden){e.preventDefault();e.stopPropagation();setEditorFullScreen(false)}}",""),true);
}],
[462,function initialize_462(__studio33){
__studio33.editionWorkers = new Map();

}],
[466,function initialize_466(__studio33){
__studio33.textDiffResult = null;
__studio33.textDiffVisible = 200;

}],
[480,function initialize_480(__studio33){
__studio33.csvJsonReady = false;

}],
[490,function initialize_490(__studio33){
__studio33.explorerRoot = null;
__studio33.explorerNodes = 0;
__studio33.explorerDetailNodes = [];

}],
[524,function initialize_524(__studio33){
__studio33.hashTicket = 0;

}],
[544,function initialize_544(__studio33){
__studio33.schemaResult = null;

}],
[554,function initialize_554(__studio33){
__studio33.syncToolNavigation(__studio33.activeView);
}],
[555,function initialize_555(__studio33){
__studio33.renderRecents();
}],
[593,function initialize_593(__studio33){
__studio33.sampleExample = 'id | sequence | 1\nname | name\nemail | email\namount | integer | 100:5000\nactive | boolean\nstatus | choice | New,Pending,Approved';

}],
[607,function initialize_607(__studio33){
__studio33.invalidateMarkdown();
}],
[625,function initialize_625(__studio33){
__studio33.updateLogFiles();
}],
[632,function initialize_632(__studio33){
__studio33.responseAdvice = {REQUIRED_FIELD_MISSING:'Check required fields and values for this record.',FIELD_CUSTOM_VALIDATION_EXCEPTION:'Review validation rules and the message against the record values.',INVALID_FIELD:'Check API names, relationships and field access.',INVALID_TYPE:'Check the object API name and availability.',MALFORMED_QUERY:'Inspect the SOQL syntax and selected fields.',INVALID_CROSS_REFERENCE_KEY:'Check lookup ID type, existence, access and related record availability.',DUPLICATE_VALUE:'Review unique fields and duplicate records.',UNABLE_TO_LOCK_ROW:'Inspect concurrent updates and retry handling.',INVALID_SESSION_ID:'Check the session/token and authentication flow.',INSUFFICIENT_ACCESS_OR_READONLY:'Review user/object/record permissions.',PROCESSING_HALTED:'Inspect the first earlier failure and dependency/rollback settings.'};

}],
[644,function initialize_644(__studio33){
__studio33.compositeDemo = JSON.stringify([{method:'POST',url:'/services/data/v57.0/sobjects/Account',referenceId:'refAccount',body:{Name:'Sample Account'}},{method:'POST',url:'/services/data/v57.0/sobjects/Contact',referenceId:'refContact',body:{LastName:'Sample',AccountId:'@{refAccount.id}'}}],null,2);

}],
[652,function initialize_652(__studio33){
__studio33.responseResult = null;

}],
[660,function initialize_660(__studio33){
__studio33.mappingDemoRules = JSON.stringify([{from:'/name',to:'/customer/fullName',required:true},{from:'/phone',to:'/customer/phone',type:'string'},{from:'/amount',to:'/loan/amount',type:'number'},{from:'/active',to:'/loan/active',type:'boolean'},{from:'/missing',to:'/source',default:'Sample'}],null,2);

}],
[686,function initialize_686(__studio33){
__studio33.verifyRevision = 0;
__studio33.verifyReady = false;

}],
[700,function initialize_700(__studio33){
__studio33.installEditorControls();
}],
[715,function initialize_715(__studio33){
__studio33.studioLibraryCache = {};

}],
[745,function initialize_745(__studio33){
__studio33.excelState = {A:null,B:null};

}],
[746,function initialize_746(__studio33){
__studio33.excelDifference = null;
__studio33.excelPage = 0;

}],
[772,function initialize_772(__studio33){
__studio33.imageSource = null;
__studio33.imageResult = null;
__studio33.imageVersion = 0;

}],
[794,function initialize_794(__studio33){
__studio33.colorResult = null;

}],
[800,function initialize_800(__studio33){
__studio33.rateResult = null;

}],
[810,function initialize_810(__studio33){
__studio33.decisionResult = null;
__studio33.expenseResult = null;

}],
[823,function initialize_823(__studio33){
__studio33.typingStartTime = null;
__studio33.typingEndTime = null;
__studio33.typingTimer = null;
__studio33.typingArmed = false;
__studio33.typingTarget = '';
__studio33.typingFrozen = '';

}],
[834,function initialize_834(__studio33){
__studio33.inspectedFile = null;
__studio33.inspectVersion = 0;

}],
[839,function initialize_839(__studio33){
__studio33.shortcutStoreKey = 'calc-studio-url-shortcuts-v9';

}],
[840,function initialize_840(__studio33){
__studio33.shortcuts = [];
__studio33.shortcutEditing = null;

}],
[841,function initialize_841(__studio33){
try{const saved=__studio33.storage.get(__studio33.shortcutStoreKey,[]);__studio33.shortcuts=__studio33.parseShortcutImport(JSON.stringify(saved))}catch{__studio33.shortcuts=[]}
}],
[852,function initialize_852(__studio33){
__studio33.renderShortcuts();
}],
[891,function initialize_891(__studio33){
__studio33.flowState = null;
__studio33.flowDragging = null;

}],
[937,function initialize_937(__studio33){
__studio33.eventResult = null;

}],
[945,function initialize_945(__studio33){
__studio33.pickerSource = null;
__studio33.pickerResult = null;
__studio33.pickerPoint = {x:0,y:0};
__studio33.pickerVersion = 0;

}],
[963,function initialize_963(__studio33){
__studio33.csId = prefix=>prefix+'-'+(crypto.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2));

}],
[964,function initialize_964(__studio33){
__studio33.csClone = x=>JSON.parse(JSON.stringify(x));

}],
[965,function initialize_965(__studio33){
__studio33.csText = (tag,text,cls='')=>{const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;return e};

}],
[966,function initialize_966(__studio33){
__studio33.csButton = __studio33.$fn((text,action)=>{const b=__studio33.csText('button',text,'small');b.type='button';b.onclick=action;return b},"(text,action)=>{const b=csText('button',text,'small');b.type='button';b.onclick=action;return b}","csButton");

}],
[971,function initialize_971(__studio33){
__studio33.csDate = ()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};

}],
[985,function initialize_985(__studio33){
__studio33.annDraw();
}],
[997,function initialize_997(__studio33){
__studio33.vidURL = null;
__studio33.vidFrames = [];
__studio33.vidBusy = false;
__studio33.vidGeneration = 0;

}],
[1022,function initialize_1022(__studio33){
__studio33.fdTypeControls();
}],
[1031,function initialize_1031(__studio33){
__studio33.fdRender();
}],
[1055,function initialize_1055(__studio33){
__studio33.fcRender();
}],
[1073,function initialize_1073(__studio33){
;
}],
[1077,function initialize_1077(__studio33){
setInterval(__studio33.ptRender,250);
}],
[1079,function initialize_1079(__studio33){
__studio33.kbRows = [['Escape','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'],['Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal','Backspace'],['Tab','KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Backslash'],['CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Enter'],['ShiftLeft','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ShiftRight'],['ControlLeft','MetaLeft','AltLeft','Space','AltRight','MetaRight','ContextMenu','ControlRight','ArrowLeft','ArrowUp','ArrowDown','ArrowRight'],['Insert','Delete','Home','End','PageUp','PageDown','NumLock','NumpadDivide','NumpadMultiply','NumpadSubtract','NumpadAdd','NumpadEnter'],['Numpad0','Numpad1','Numpad2','Numpad3','Numpad4','Numpad5','Numpad6','Numpad7','Numpad8','Numpad9','NumpadDecimal']];

}],
[1080,function initialize_1080(__studio33){
__studio33.kbKeys = new Map();
__studio33.kbTested = new Set();

}],
[1081,function initialize_1081(__studio33){
__studio33.kbEvents = [];
__studio33.kbPresses = 0;

}],
[1084,function initialize_1084(__studio33){
document.addEventListener('keydown',__studio33.kbEvent,true);
}],
[1085,function initialize_1085(__studio33){
document.addEventListener('keyup',__studio33.kbEvent,true);
}],
[1089,function initialize_1089(__studio33){
__studio33.csImages = [];
__studio33.csTicket = 0;

}],
[1114,function initialize_1114(__studio33){
__studio33.knChecklist.className='cs-checklist full';
}],
[1115,function initialize_1115(__studio33){
__studio33.knChecklist.id='ktChecklist';
}],
[1116,function initialize_1116(__studio33){
__studio33.$('ktSubtasks').closest('label').after(__studio33.knChecklist);
}],
[1118,function initialize_1118(__studio33){
__studio33.$('ktSubtasks').oninput=__studio33.knChecklistRender;
}],
[1139,function initialize_1139(__studio33){
__studio33.knRender();
}],
[1140,function initialize_1140(__studio33){
__studio33.csExtraKeys = [__studio33.knKey,__studio33.fcKey,__studio33.fdKey,__studio33.ptKey];

}],
[1141,function initialize_1141(__studio33){
__studio33.backupKeys.push(...__studio33.csExtraKeys);
}],
[1142,function initialize_1142(__studio33){
__studio33.csOriginalValidateBackup = __studio33.validateBackup;

}],
[1143,function initialize_1143(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const input=__studio33.csClone(data);if(input?.state)for(const key of __studio33.csExtraKeys)if(!Object.hasOwn(input.state,key))input.state[key]=null;const result=__studio33.csOriginalValidateBackup(input),s=result.state;if(s[__studio33.knKey]!==null)s[__studio33.knKey]=__studio33.knValidate(s[__studio33.knKey]);if(s[__studio33.fcKey]!==null)s[__studio33.fcKey]=__studio33.fcValidate(s[__studio33.fcKey]);if(s[__studio33.fdKey]!==null)s[__studio33.fdKey]=__studio33.fdValidate(s[__studio33.fdKey]);const timer=s[__studio33.ptKey];if(timer!==null&&(!timer||typeof timer.segments!=='string'||timer.segments.length>10000||!Number.isFinite(timer.warning)||timer.warning<0||timer.warning>600))throw Error('Invalid timer settings');return result},"function(data){const input=csClone(data);if(input?.state)for(const key of csExtraKeys)if(!Object.hasOwn(input.state,key))input.state[key]=null;const result=csOriginalValidateBackup(input),s=result.state;if(s[knKey]!==null)s[knKey]=knValidate(s[knKey]);if(s[fcKey]!==null)s[fcKey]=fcValidate(s[fcKey]);if(s[fdKey]!==null)s[fdKey]=fdValidate(s[fdKey]);const timer=s[ptKey];if(timer!==null&&(!timer||typeof timer.segments!=='string'||timer.segments.length>10000||!Number.isFinite(timer.warning)||timer.warning<0||timer.warning>600))throw Error('Invalid timer settings');return result}","");
}],
[1145,function initialize_1145(__studio33){
__studio33.csOriginalSnapshot = __studio33.backupSnapshot;

}],
[1146,function initialize_1146(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const r=__studio33.csOriginalSnapshot();r.state[__studio33.knKey]=__studio33.csClone(__studio33.knData);r.state[__studio33.fcKey]=__studio33.csClone(__studio33.fcData);r.state[__studio33.fdKey]=__studio33.csClone(__studio33.fdData);return r},"function(){const r=csOriginalSnapshot();r.state[knKey]=csClone(knData);r.state[fcKey]=csClone(fcData);r.state[fdKey]=csClone(fdData);return r}","");
}],
[1147,function initialize_1147(__studio33){
Object.assign(__studio33.studioDescriptions,{annotation:'Annotate images with arrows, labels, highlights and opaque redactions.',audioeditor:'Trim audio, adjust volume, apply fades and export WAV.',videoframes:'Extract timestamped PNG frames and ZIP sequences from video.',pdfform:'Fill standard PDF form fields and optionally flatten the result.',formdesigner:'Build validated questionnaires and export standalone HTML.',flashcards:'Organise decks, import CSV and practise with revision tracking.',presentationtimer:'Run speaker segments with warnings and overtime tracking.',keyboard:'Inspect physical key codes, modifiers and repeated presses.',contactsheet:'Create labelled image grids with configurable layout.',kanban:'Manage boards with dependencies, subtasks, priorities and WIP limits.'});
}],
[1154,function initialize_1154(__studio33){
try{__studio33.v12State=__studio33.v12Validate(__studio33.storage.get(__studio33.v12Key,__studio33.v12Defaults()))}catch{__studio33.v12State=__studio33.v12Defaults()}
}],
[1194,function initialize_1194(__studio33){
__studio33.rcTables = [null,null];
__studio33.rcReport = null;
__studio33.rcLimit = 100;

}],
[1244,function initialize_1244(__studio33){
__studio33.fdData.formId||=__studio33.csId('form');
}],
[1245,function initialize_1245(__studio33){
__studio33.fdData.formVersion||=1;
}],
[1261,function initialize_1261(__studio33){
__studio33.rdPage = 0;
__studio33.rdUndo = null;

}],
[1285,function initialize_1285(__studio33){
__studio33.$('ktDuration').oninput=__studio33.$fn(()=>{if(__studio33.v12Date(__studio33.$('ktStart').value)&&Number(__studio33.$('ktDuration').value)>=1&&Number(__studio33.$('ktDuration').value)<=3650)__studio33.$('ktDue').value=__studio33.v12Shift(__studio33.$('ktStart').value,Number(__studio33.$('ktDuration').value)-1)},"()=>{if(v12Date($('ktStart').value)&&Number($('ktDuration').value)>=1&&Number($('ktDuration').value)<=3650)$('ktDue').value=v12Shift($('ktStart').value,Number($('ktDuration').value)-1)}","");
}],
[1293,function initialize_1293(__studio33){
__studio33.timeline = document.createElement('div');

}],
[1295,function initialize_1295(__studio33){
__studio33.timeline.className='v12-table v12-timeline';
}],
[1296,function initialize_1296(__studio33){
__studio33.timeline.hidden=true;
}],
[1298,function initialize_1298(__studio33){
__studio33.bulk = document.createElement('div');

}],
[1299,function initialize_1299(__studio33){
__studio33.bulk.className='v12-timeline-toolbar';
}],
[1300,function initialize_1300(__studio33){
__studio33.bulk.innerHTML='<label class="field"><span>Task templates</span><select id="knTemplate"></select></label><button id="knUseTemplate" class="small">Create from template</button><label class="field"><span>Bulk priority</span><select id="knBulkPriority"><option value="">Keep priority</option><option>urgent</option><option>high</option><option>normal</option><option>low</option></select></label><label class="field"><span>Bulk column</span><select id="knBulkColumn"></select></label><button id="knBulkApply" class="small">Apply to checked tasks</button><button id="knBulkSelect" class="small">Select filtered tasks</button><button id="knBulkClear" class="small">Clear selection</button><button id="knTimelineCSV" class="small">Export timeline CSV</button>';
}],
[1334,function initialize_1334(__studio33){
__studio33.backupKeys.push(__studio33.v12Key);
}],
[1336,function initialize_1336(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,__studio33.v12Key))raw.state[__studio33.v12Key]=null;const result=__studio33.v12PreviousValidateBackup(raw);if(result.state[__studio33.v12Key]){__studio33.v12Validate(result.state[__studio33.v12Key]);for(const s of result.state[__studio33.v12Key].snapshots)__studio33.wsValidateTools(s.tools);__studio33.wsValidateTools(result.state[__studio33.v12Key].recovery.values)}return result},"function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,v12Key))raw.state[v12Key]=null;const result=v12PreviousValidateBackup(raw);if(result.state[v12Key]){v12Validate(result.state[v12Key]);for(const s of result.state[v12Key].snapshots)wsValidateTools(s.tools);wsValidateTools(result.state[v12Key].recovery.values)}return result}","");
}],
[1338,function initialize_1338(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const x=__studio33.v12PreviousSnapshot();x.state[__studio33.v12Key]=__studio33.csClone(__studio33.v12State);return x},"function(){const x=v12PreviousSnapshot();x.state[v12Key]=csClone(v12State);return x}","");
}],
[1351,function initialize_1351(__studio33){
__studio33.workflowHelp = document.createElement('details');

}],
[1352,function initialize_1352(__studio33){
__studio33.workflowHelp.className='details-box';
}],
[1353,function initialize_1353(__studio33){
__studio33.workflowHelp.innerHTML='<summary>Step options and examples</summary><p class="hint">Mask: {"fields":["secret"],"replacement":"[REDACTED]"}. Map: {"rules":[{"from":"/id","to":"/recordId","required":true}]}. Query: {"path":"$.items[*]"}. Schema: {"schema":{"type":"object","required":["id"]}}. CSV conversion: {"delimiter":",","headers":true,"infer":false}. JSON → CSV: {"path":"/items","flatten":true,"protect":true}. Empty options use the defaults. A failed step stops that file; successful batch files remain downloadable.</p>';
}],
[1355,function initialize_1355(__studio33){
__studio33.initializeStudioUI();
}],
[1357,function initialize_1357(__studio33){
for(const cat of Object.values(__studio33.toolCategories)){const mapped=cat.tools.map(__studio33.$fn(id=>__studio33.v12Home[id]||id,"id=>v12Home[id]||id",""));cat.tools=[...new Set(mapped)]}
}],
[1362,function initialize_1362(__studio33){
for(const cat of Object.values(__studio33.toolCategories))cat.tools=[...new Set(cat.tools)];
}],
[1364,function initialize_1364(__studio33){
__studio33.categoryForTool=__studio33.$fn(function(id){return __studio33.v12OriginalCategory(__studio33.v12Home[id]||id)},"function(id){return v12OriginalCategory(v12Home[id]||id)}","");
}],
[1368,function initialize_1368(__studio33){
window.addEventListener('hashchange',__studio33.v12Route);
}],
[1374,function initialize_1374(__studio33){
__studio33.dwRender();
}],
[1375,function initialize_1375(__studio33){
__studio33.wfRender();
}],
[1376,function initialize_1376(__studio33){
__studio33.rdRender();
}],
[1377,function initialize_1377(__studio33){
__studio33.wsRender();
}],
[1378,function initialize_1378(__studio33){
__studio33.fdRender();
}],
[1379,function initialize_1379(__studio33){
__studio33.knRender();
}],
[1381,function initialize_1381(__studio33){
__studio33.syncToolNavigation(__studio33.activeView);
}],
[1382,function initialize_1382(__studio33){
__studio33.v12Route();
}],
[1386,function initialize_1386(__studio33){
Object.assign(__studio33.v12Suites,__studio33.v13Suites);
}],
[1387,function initialize_1387(__studio33){
for(const [home,modes]of Object.entries(__studio33.v13Suites)){
 __studio33.v12Last[home]=modes[0];const panel=__studio33.$(home),tabs=__studio33.csText('div','','v12-suite-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',__studio33.views[home]+' modes');
 for(const id of modes){__studio33.v12Home[id]=home;const button=__studio33.csButton(__studio33.views[id],__studio33.$fn(()=>__studio33.openTab(id),"()=>openTab(id)",""));button.dataset.mode=id;button.setAttribute('role','tab');button.setAttribute('aria-controls',id);tabs.append(button)}
 panel.querySelector('.panel-heading').after(tabs);const container=__studio33.csText('div','','v12-suite-modes');for(const id of modes){__studio33.$(id).classList.add('v12-nested-mode');container.append(__studio33.$(id))}panel.append(container);
 tabs.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const buttons=[...tabs.querySelectorAll('button')],i=buttons.indexOf(document.activeElement);if(i<0)return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[next].click();buttons[next].focus()});
}
}],
[1388,function initialize_1388(__studio33){
for(const cat of Object.values(__studio33.toolCategories))cat.tools=[...new Set(cat.tools.map(__studio33.$fn(id=>__studio33.v12Home[id]||id,"id=>v12Home[id]||id","")))];
}],
[1389,function initialize_1389(__studio33){
for(const id of Object.keys(__studio33.v13Suites))for(const cat of Object.values(__studio33.toolCategories))cat.tools=cat.tools.filter(x=>x!==id);
}],
[1395,function initialize_1395(__studio33){
__studio33.v13EditorDialog.className='v13-editor-dialog';
}],
[1396,function initialize_1396(__studio33){
__studio33.v13EditorDialog.id='editorFocusDialog';
}],
[1397,function initialize_1397(__studio33){
__studio33.v13EditorDialog.setAttribute('aria-label','Expanded editor');
}],
[1399,function initialize_1399(__studio33){
__studio33.v13EditorHeader.append(__studio33.v13EditorTitle,__studio33.csButton('Close editor (Esc)',__studio33.$fn(()=>__studio33.v13EditorDialog.close(),"()=>v13EditorDialog.close()","")));
}],
[1400,function initialize_1400(__studio33){
__studio33.v13EditorDialog.append(__studio33.v13EditorHeader);
}],
[1401,function initialize_1401(__studio33){
document.body.append(__studio33.v13EditorDialog);
}],
[1404,function initialize_1404(__studio33){
__studio33.v13EditorDialog.addEventListener('close',__studio33.$fn(()=>{if(!__studio33.v13EditorDialog.open)__studio33.v13CloseEditor()},"()=>{if(!v13EditorDialog.open)v13CloseEditor()}",""));
}],
[1405,function initialize_1405(__studio33){
__studio33.v13EditorDialog.addEventListener('cancel',__studio33.$fn(()=>__studio33.v13CloseEditor(),"()=>v13CloseEditor()",""));
}],
[1408,function initialize_1408(__studio33){
for(const editor of document.querySelectorAll('section textarea[id]'))__studio33.v13InstallEditor(editor);
}],
[1422,function initialize_1422(__studio33){
__studio33.rcMappings=__studio33.$fn(function(text,a,b,required){if(!text.trimStart().startsWith('['))return __studio33.v13LegacyMappings(text,a,b,required);const pairs=__studio33.ordinaryJSON(text);if(!Array.isArray(pairs)||pairs.length>200||required&&!pairs.length||pairs.some(p=>!Array.isArray(p)||p.length!==2||!a.columns.includes(p[0])||!b.columns.includes(p[1])))throw Error('Invalid column mappings');return pairs},"function(text,a,b,required){if(!text.trimStart().startsWith('['))return v13LegacyMappings(text,a,b,required);const pairs=ordinaryJSON(text);if(!Array.isArray(pairs)||pairs.length>200||required&&!pairs.length||pairs.some(p=>!Array.isArray(p)||p.length!==2||!a.columns.includes(p[0])||!b.columns.includes(p[1])))throw Error('Invalid column mappings');return pairs}","");
}],
[1424,function initialize_1424(__studio33){
__studio33.v13Mapping.id='rcMappingEditor';
}],
[1425,function initialize_1425(__studio33){
__studio33.v13Mapping.append(__studio33.csText('h3','Map columns'),__studio33.csText('p','Load both tables to choose matching columns. Key columns identify records; compare columns supply values to check. The first-row samples below help verify each mapping.','hint'));
}],
[1427,function initialize_1427(__studio33){
__studio33.v13KeyRows.id='rcKeyRows';
}],
[1428,function initialize_1428(__studio33){
__studio33.v13ColumnRows.id='rcColumnRows';
}],
[1429,function initialize_1429(__studio33){
__studio33.v13Mapping.append(__studio33.csText('h4','Record keys'),__studio33.v13KeyRows,__studio33.csButton('Add key mapping',__studio33.$fn(()=>__studio33.v13AddMapping(true),"()=>v13AddMapping(true)","")),__studio33.csText('h4','Values to compare'),__studio33.v13ColumnRows,__studio33.csButton('Add compare mapping',__studio33.$fn(()=>__studio33.v13AddMapping(false),"()=>v13AddMapping(false)","")));
}],
[1441,function initialize_1441(__studio33){
__studio33.v13Dedupe.className='details-box v13-dedupe';
}],
[1442,function initialize_1442(__studio33){
__studio33.v13Dedupe.open=true;
}],
[1443,function initialize_1443(__studio33){
__studio33.v13Dedupe.append(__studio33.csText('summary','Duplicate keys'),__studio33.csText('p','Choose the columns that define a duplicate. Keep the first row in source order. Cell types remain significant. Deduplication reviews the whole table; cleanup uses selected rows, or all filtered rows.','hint'));
}],
[1446,function initialize_1446(__studio33){
__studio33.v13Dedupe.append(__studio33.v13DedupeColumns);
}],
[1450,function initialize_1450(__studio33){
__studio33.v13Preview.hidden=true;
}],
[1456,function initialize_1456(__studio33){
__studio33.v13DedupeColumns.addEventListener('change',__studio33.v13CancelPreview);
}],
[1465,function initialize_1465(__studio33){
__studio33.v13Calendar.className='details-box v13-calendar';
}],
[1466,function initialize_1466(__studio33){
__studio33.v13Calendar.append(__studio33.csText('summary','Working-day calendar'));
}],
[1467,function initialize_1467(__studio33){
__studio33.calendarFields = __studio33.csText('div','','fields');

}],
[1468,function initialize_1468(__studio33){
__studio33.calendarFields.innerHTML='<label class="field"><span>Default schedule for new tasks</span><select id="knScheduleDefault"><option value="calendar">Calendar days</option><option value="working">Working days</option></select></label><label class="field"><span>Holidays (YYYY-MM-DD, one per line)</span><textarea id="knHolidays" maxlength="12000" spellcheck="false"></textarea></label>';
}],
[1469,function initialize_1469(__studio33){
__studio33.v13Calendar.append(__studio33.calendarFields,__studio33.csText('p','Working-day durations skip the weekend days and holidays selected here. Changing the calendar does not move existing tasks. Use the task editor or a conflict repair to reschedule explicitly.','hint'));
}],
[1470,function initialize_1470(__studio33){
__studio33.weekendBox = __studio33.csText('div','','v12-checkbox-grid');

}],
[1472,function initialize_1472(__studio33){
for(const [day,name]of ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].entries()){const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=String(day);input.setAttribute('aria-label','Nonworking '+name);label.append(input,document.createTextNode(' '+name));__studio33.weekendBox.append(label)}
}],
[1473,function initialize_1473(__studio33){
__studio33.v13Calendar.append(__studio33.csText('p','Nonworking weekdays','hint'),__studio33.weekendBox);
}],
[1476,function initialize_1476(__studio33){
__studio33.v13Calendar.append(__studio33.calendarSave);
}],
[1488,function initialize_1488(__studio33){
__studio33.ktScheduleField = __studio33.csText('label','','field');

}],
[1489,function initialize_1489(__studio33){
__studio33.ktScheduleField.append(__studio33.csText('span','Duration calendar'));
}],
[1490,function initialize_1490(__studio33){
__studio33.ktSchedule = document.createElement('select');

}],
[1491,function initialize_1491(__studio33){
__studio33.ktSchedule.id='ktSchedule';
}],
[1493,function initialize_1493(__studio33){
__studio33.ktScheduleField.append(__studio33.ktSchedule);
}],
[1494,function initialize_1494(__studio33){
__studio33.$('ktDuration').closest('label').before(__studio33.ktScheduleField);
}],
[1495,function initialize_1495(__studio33){
__studio33.$('ktDuration').closest('label').querySelector('span').textContent='Duration (days, including start)';
}],
[1497,function initialize_1497(__studio33){
__studio33.v12TaskFields=__studio33.$fn(function(existing){const fields=__studio33.v13OldTaskFields(existing);fields.schedule=__studio33.ktSchedule.value;if(fields.schedule==='working'&&fields.start){const calendar=__studio33.v13CalendarFor(),duration=Number(__studio33.$('ktDuration').value);if(!Number.isInteger(duration)||duration<1||duration>3650)throw Error('Working-day duration must be 1–3,650 days');fields.start=__studio33.v13NextWorking(fields.start,calendar);__studio33.$('ktDue').value=__studio33.v13WorkingShift(fields.start,duration-1,calendar)}return fields},"function(existing){const fields=v13OldTaskFields(existing);fields.schedule=ktSchedule.value;if(fields.schedule==='working'&&fields.start){const calendar=v13CalendarFor(),duration=Number($('ktDuration').value);if(!Number.isInteger(duration)||duration<1||duration>3650)throw Error('Working-day duration must be 1–3,650 days');fields.start=v13NextWorking(fields.start,calendar);$('ktDue').value=v13WorkingShift(fields.start,duration-1,calendar)}return fields}","");
}],
[1501,function initialize_1501(__studio33){
__studio33.$('ktDuration').oninput=__studio33.v13DurationToDue;
}],
[1502,function initialize_1502(__studio33){
__studio33.ktSchedule.onchange=__studio33.v13DurationToDue;
}],
[1503,function initialize_1503(__studio33){
__studio33.$('ktStart').addEventListener('change',__studio33.v13DurationToDue);
}],
[1510,function initialize_1510(__studio33){
__studio33.v13Zoom.innerHTML='<label class="field"><span>Timeline zoom</span><select id="knTimelineZoom"><option value="day">Day · 90 days</option><option value="week" selected>Week · 1 year</option><option value="month">Month · 3 years</option></select></label><label class="field"><span>Window starts</span><input id="knTimelineStart" type="date"></label><button id="knTimelineBack" class="small">Earlier</button><button id="knTimelineToday" class="small">Today</button><button id="knTimelineFirst" class="small">First task</button><button id="knTimelineForward" class="small">Later</button>';
}],
[1530,function initialize_1530(__studio33){
__studio33.dwRender();
}],
[1531,function initialize_1531(__studio33){
__studio33.knRender();
}],
[1532,function initialize_1532(__studio33){
__studio33.syncToolNavigation(__studio33.activeView);
}],
[1533,function initialize_1533(__studio33){
__studio33.openTab(__studio33.activeView);
}],
[1534,function initialize_1534(__studio33){
__studio33.v12Route();
}],
[1594,function initialize_1594(__studio33){
__studio33.lcBuilderButton.id='apiOpenClient';
}],
[1597,function initialize_1597(__studio33){
__studio33.lcCompositeButton.id='compOpenClient';
}],
[1604,function initialize_1604(__studio33){
__studio33.lcModeButton.setAttribute('role','tab');
}],
[1609,function initialize_1609(__studio33){
__studio33.backupKeys.push(__studio33.lcKey);
}],
[1618,function initialize_1618(__studio33){
__studio33.lcLibraryRender();
}],
[1619,function initialize_1619(__studio33){
__studio33.lcAuthRender();
}],
[1620,function initialize_1620(__studio33){
__studio33.lcResponseRender();
}],
[1622,function initialize_1622(__studio33){
__studio33.syncToolNavigation(__studio33.activeView);
}],
[1623,function initialize_1623(__studio33){
__studio33.openTab(__studio33.activeView);
}],
[1624,function initialize_1624(__studio33){
__studio33.v12Route();
}],
[1628,function initialize_1628(__studio33){
__studio33.conversionButtons();
}],
[1629,function initialize_1629(__studio33){
__studio33.renderHistory();
}],
[1630,function initialize_1630(__studio33){
__studio33.renderTools();
}],
[1631,function initialize_1631(__studio33){
__studio33.preview();
}],
[1632,function initialize_1632(__studio33){
__studio33.restoredDrafts = __studio33.storage.get('calc-studio-drafts',null);

}],
[1636,function initialize_1636(__studio33){
__studio33.u15Style.textContent=`
.u15-box{margin:14px 0;padding:14px;border:1px solid var(--line);border-radius:12px;background:var(--surface)}.u15-box>summary{cursor:pointer;font-weight:650}.u15-box h3{margin:0 0 10px}.u15-box .fields{margin:10px 0}.u15-status{white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px;margin:8px 0}.u15-row{display:flex;gap:7px;align-items:center;margin:7px 0;flex-wrap:wrap}.u15-row input:not([type=checkbox]),.u15-row select{flex:1;min-width:100px}.u15-table{border-collapse:collapse;width:100%;font-size:12px}.u15-table th,.u15-table td{border:1px solid var(--line);padding:7px;text-align:left;vertical-align:top;overflow-wrap:anywhere}.u15-table pre{max-width:500px;white-space:pre-wrap}.u15-numbered{display:flex;gap:0;min-width:0;width:100%;align-items:stretch}.u15-numbered textarea{flex:1;min-width:0;margin:0!important;border-radius:0 8px 8px 0!important}.u15-gutter{flex:0 0 45px;background:var(--surface);border:1px solid var(--line);border-right:0;border-radius:8px 0 0 8px;overflow:hidden;user-select:none;color:var(--muted);padding:10px 5px;text-align:right;max-height:600px;font:12px/1.6 ui-monospace,Consolas,monospace;white-space:pre}.u15-error-line{background:#d76b6633;color:var(--text);display:block}.u15-box input[aria-invalid=true],textarea[aria-invalid=true]{outline:2px solid #d76b66}.u15-meter{height:10px;accent-color:var(--accent);width:100%}.u15-chart{width:100%;height:auto;min-height:140px}.u15-highlight-old{background:#d76b6633;text-decoration:none}.u15-highlight-new{background:#31a36b33;text-decoration:none}.u15-muted{color:var(--muted)}.u15-primary{background:var(--accent)!important;color:var(--on-accent,#fff)!important;border-color:var(--accent)!important}.u15-stale{border-left:3px solid #d69b36;padding-left:8px}.u15-json-row{display:grid;grid-template-columns:minmax(160px,1fr) 110px minmax(170px,2fr) auto;gap:7px;padding:7px 0;align-items:center}.u15-json-row input{min-width:0;width:100%}.u15-json-row code{overflow-wrap:anywhere}.u15-help{max-width:100%;overflow-wrap:anywhere}.u15-status[data-error=true]{color:#b34343}@media(max-width:700px){.u15-json-row{grid-template-columns:1fr}.u15-row{align-items:stretch}.u15-gutter{flex-basis:35px}.u15-box{padding:10px}.u15-table pre{max-width:240px}.u15-box .table-scroll{max-width:100%;overflow:auto}}
`;
}],
[1637,function initialize_1637(__studio33){
document.head.append(__studio33.u15Style);
}],
[1652,function initialize_1652(__studio33){
__studio33.u15Field(__studio33.u15Curl,'u15CurlInput','Paste a literal cURL command','','textarea');
}],
[1665,function initialize_1665(__studio33){
__studio33.u15PrivacyOutput.readOnly=true;
}],
[1670,function initialize_1670(__studio33){
__studio33.u15Field(__studio33.u15Checks,'u15Assertions','Checks: JSON array','[{"type":"status","equals":200},{"type":"path","path":"/id","exists":true}]','textarea');
}],
[1671,function initialize_1671(__studio33){
__studio33.u15Field(__studio33.u15Checks,'u15Extract','Extract rules: name → JSON Pointer','[{"name":"record_id","path":"/id"}]','textarea');
}],
[1673,function initialize_1673(__studio33){
__studio33.u15Checks.append(__studio33.u15CheckResults);
}],
[1680,function initialize_1680(__studio33){
__studio33.$('u15Extract').addEventListener('input',__studio33.$fn(()=>{__studio33.u15Extracted=[];__studio33.u15ChecksStatus.textContent='Extraction rules changed. Preview again before applying.'},"()=>{u15Extracted=[];u15ChecksStatus.textContent='Extraction rules changed. Preview again before applying.'}",""));
}],
[1685,function initialize_1685(__studio33){
__studio33.u15Field(__studio33.u15Tree,'u15TreeFilter','Filter JSON Pointer paths','');
}],
[1687,function initialize_1687(__studio33){
__studio33.u15Tree.append(__studio33.u15TreeRows);
}],
[1694,function initialize_1694(__studio33){
__studio33.$('u15TreeFilter').oninput=__studio33.$fn(()=>{__studio33.u15TreePage=0;try{__studio33.u15RenderTree()}catch{}},"()=>{u15TreePage=0;try{u15RenderTree()}catch{}}","");
}],
[1700,function initialize_1700(__studio33){
__studio33.u15Map.append(__studio33.u15MapRows);
}],
[1707,function initialize_1707(__studio33){
__studio33.u15MapPreview.id='u15MapPreview';
}],
[1708,function initialize_1708(__studio33){
__studio33.u15Map.append(__studio33.u15MapPreview);
}],
[1713,function initialize_1713(__studio33){
__studio33.u15Field(__studio33.u15DiffFields,'u15ArrayPath','Array JSON Pointer (blank = root)','');
}],
[1714,function initialize_1714(__studio33){
__studio33.u15Field(__studio33.u15DiffFields,'u15ArrayKey','Record key, e.g. id (blank = compare by index)','');
}],
[1715,function initialize_1715(__studio33){
__studio33.u15Field(__studio33.u15Diff,'u15IgnorePaths','Ignored JSON Pointers, one per line; * matches one segment','','textarea');
}],
[1716,function initialize_1716(__studio33){
__studio33.u15Diff.append(__studio33.csText('p','Example: array /records, key id, ignored /records/*/updatedAt. Duplicate, missing or blank record keys are reported as errors. Matching retains source indexes in the report.','hint'));
}],
[1717,function initialize_1717(__studio33){
__studio33.u15Status(__studio33.u15Diff,'u15DiffStatus');
}],
[1720,function initialize_1720(__studio33){
__studio33.compareDeveloperJSON=__studio33.$fn(function(a,b,n=false){const config={key:__studio33.$('u15ArrayKey').value.trim(),arrayPath:__studio33.$('u15ArrayPath').value.trim(),ignore:__studio33.$('u15IgnorePaths').value};return config.key||config.ignore.trim()?__studio33.u15CompareJSON(a,b,n,config):__studio33.u15BaseCompare(a,b,n)},"function(a,b,n=false){const config={key:$('u15ArrayKey').value.trim(),arrayPath:$('u15ArrayPath').value.trim(),ignore:$('u15IgnorePaths').value};return config.key||config.ignore.trim()?u15CompareJSON(a,b,n,config):u15BaseCompare(a,b,n)}","");
}],
[1722,function initialize_1722(__studio33){
__studio33.jsonDiffReport=__studio33.$fn(function(result){const report=JSON.parse(__studio33.u15OldDiffReport(result));if(result.rules){report.comparison=result.rules.key?'JSON values; selected array matched by record key':'JSON values; arrays by index';report.rules=result.rules;report.indexPairs=result.indexPairs;report.differences=result.changes.map(__studio33.$fn(r=>({type:r.type,path:r.path,recordKey:r.recordKey,beforeIndex:r.beforeIndex,afterIndex:r.afterIndex,...(r.before?{beforeJSON:__studio33.emitDeveloperJSON(r.before)}:{}),...(r.after?{afterJSON:__studio33.emitDeveloperJSON(r.after)}:{})}),"r=>({type:r.type,path:r.path,recordKey:r.recordKey,beforeIndex:r.beforeIndex,afterIndex:r.afterIndex,...(r.before?{beforeJSON:emitDeveloperJSON(r.before)}:{}),...(r.after?{afterJSON:emitDeveloperJSON(r.after)}:{})})",""))}return JSON.stringify(report,null,2)},"function(result){const report=JSON.parse(u15OldDiffReport(result));if(result.rules){report.comparison=result.rules.key?'JSON values; selected array matched by record key':'JSON values; arrays by index';report.rules=result.rules;report.indexPairs=result.indexPairs;report.differences=result.changes.map(r=>({type:r.type,path:r.path,recordKey:r.recordKey,beforeIndex:r.beforeIndex,afterIndex:r.afterIndex,...(r.before?{beforeJSON:emitDeveloperJSON(r.before)}:{}),...(r.after?{afterJSON:emitDeveloperJSON(r.after)}:{})}))}return JSON.stringify(report,null,2)}","");
}],
[1731,function initialize_1731(__studio33){
__studio33.u15Profile.id='u15Profile';
}],
[1732,function initialize_1732(__studio33){
__studio33.u15Data.append(__studio33.u15Profile);
}],
[1735,function initialize_1735(__studio33){
__studio33.u15Field(__studio33.u15TypeFields,'u15DataType','Explicit target type','string','text',[['string','Text'],['number','JSON number'],['boolean','Boolean true/false'],['date','Date YYYY-MM-DD']]);
}],
[1737,function initialize_1737(__studio33){
__studio33.u15Field(__studio33.u15Data,'u15SortRules','Sort rules: priority order JSON array','[]','textarea');
}],
[1738,function initialize_1738(__studio33){
__studio33.u15Field(__studio33.u15Data,'u15FilterRules','Filter rules: all must match (JSON array)','[]','textarea');
}],
[1739,function initialize_1739(__studio33){
__studio33.u15Data.append(__studio33.csText('p','Sort: [{"column":"amount","direction":"desc"}]. Filter: [{"column":"status","op":"eq","value":"Approved"}]. Operators: eq, ne, contains, gt, gte, lt, lte, blank, notBlank. Numeric operators use exact decimal comparisons.','hint'));
}],
[1745,function initialize_1745(__studio33){
__studio33.u15Field(__studio33.u15Data,'u15ValidationRules','Validation rules: JSON array','[]','textarea');
}],
[1746,function initialize_1746(__studio33){
__studio33.u15Data.append(__studio33.csText('p','Example: [{"column":"id","required":true,"unique":true},{"column":"amount","type":"number","min":"0"},{"column":"status","enum":["New","Approved"]}]. Dates use type date.','hint'));
}],
[1748,function initialize_1748(__studio33){
__studio33.u15ValidationHost.id='u15ValidationHost';
}],
[1749,function initialize_1749(__studio33){
__studio33.u15Data.append(__studio33.u15ValidationHost);
}],
[1753,function initialize_1753(__studio33){
__studio33.u15Button(__studio33.u15Data,'u15ValidationDownload','Download quality report',__studio33.$fn(()=>{if(!__studio33.u15ValidationReport)throw Error('Validate the table first');__studio33.downloadFile('data-quality-report.json',JSON.stringify(__studio33.u15ValidationReport,null,2),'application/json')},"()=>{if(!u15ValidationReport)throw Error('Validate the table first');downloadFile('data-quality-report.json',JSON.stringify(u15ValidationReport,null,2),'application/json')}",""));
}],
[1759,function initialize_1759(__studio33){
__studio33.dwCommit=__studio33.$fn(function(...args){__studio33.u15ValidationReport=null;__studio33.u15ValidationHost.replaceChildren();__studio33.u15Profile.replaceChildren();return __studio33.u15OldCommit(...args)},"function(...args){u15ValidationReport=null;u15ValidationHost.replaceChildren();u15Profile.replaceChildren();return u15OldCommit(...args)}","");
}],
[1761,function initialize_1761(__studio33){
__studio33.u15Field(__studio33.u15Rc,'u15RcRules','Rules keyed by reference column','{}','textarea');
}],
[1762,function initialize_1762(__studio33){
__studio33.u15Rc.append(__studio33.csText('p','Example: {"amount":{"tolerance":"0.50","mode":"decimal"},"status":{"blank":"equivalent"}}. Modes: text or decimal. Blank handling: exact (distinguish null/missing/empty), equivalent, ignore (skip if either blank). Global trimming/case settings still apply.','hint'));
}],
[1764,function initialize_1764(__studio33){
__studio33.u15Rc.append(__studio33.u15RcDetail);
}],
[1765,function initialize_1765(__studio33){
__studio33.u15Status(__studio33.u15Rc,'u15RcStatus');
}],
[1770,function initialize_1770(__studio33){
__studio33.rcRender=__studio33.$fn(function(){__studio33.u15OldRcRender();__studio33.u15RcDetail.replaceChildren();for(const r of (__studio33.rcReport?.results||[]).filter(x=>x.kind==='duplicate').slice(0,100)){const box=__studio33.u15Box('u15Dup-'+__studio33.u15RcDetail.children.length,'Duplicate group '+r.key,__studio33.u15RcDetail);const content=__studio33.csText('div','');box.append(content);__studio33.u15Table(content,['Side','Source row','Record'],[...(r.referenceRecords||[]).map(__studio33.$fn(x=>['Reference',x.row,__studio33.csText('pre',JSON.stringify(x.values,null,2))],"x=>['Reference',x.row,csText('pre',JSON.stringify(x.values,null,2))]","")),...(r.currentRecords||[]).map(__studio33.$fn(x=>['Current',x.row,__studio33.csText('pre',JSON.stringify(x.values,null,2))],"x=>['Current',x.row,csText('pre',JSON.stringify(x.values,null,2))]",""))]);}__studio33.u15RcSignatureRefresh()},"function(){u15OldRcRender();u15RcDetail.replaceChildren();for(const r of (rcReport?.results||[]).filter(x=>x.kind==='duplicate').slice(0,100)){const box=u15Box('u15Dup-'+u15RcDetail.children.length,'Duplicate group '+r.key,u15RcDetail);const content=csText('div','');box.append(content);u15Table(content,['Side','Source row','Record'],[...(r.referenceRecords||[]).map(x=>['Reference',x.row,csText('pre',JSON.stringify(x.values,null,2))]),...(r.currentRecords||[]).map(x=>['Current',x.row,csText('pre',JSON.stringify(x.values,null,2))])]);}u15RcSignatureRefresh()}","");
}],
[1780,function initialize_1780(__studio33){
__studio33.u15Field(__studio33.u15WorkflowFields,'u15WhenPath','Condition JSON Pointer (blank = always)','');
}],
[1781,function initialize_1781(__studio33){
__studio33.u15Field(__studio33.u15WorkflowFields,'u15WhenMode','Condition test','exists','text',[['exists','Path exists'],['missing','Path missing'],['equals','Equals JSON value']]);
}],
[1782,function initialize_1782(__studio33){
__studio33.u15Field(__studio33.u15WorkflowFields,'u15WhenValue','Expected JSON value','true');
}],
[1783,function initialize_1783(__studio33){
__studio33.u15Field(__studio33.u15WorkflowFields,'u15OnError','If this step fails','stop','text',[['stop','Stop this file'],['continue','Keep previous input and continue']]);
}],
[1784,function initialize_1784(__studio33){
__studio33.u15Workflow.append(__studio33.csText('p','Conditions examine the input at this step. Continue records the failure and passes the unchanged input to the next step. Conditions do not execute code.','hint'));
}],
[1787,function initialize_1787(__studio33){
__studio33.u15CancelStep.id='u15CancelStep';
}],
[1788,function initialize_1788(__studio33){
__studio33.u15CancelStep.hidden=true;
}],
[1792,function initialize_1792(__studio33){
__studio33.wfValidate=__studio33.$fn(function(w){const valid=__studio33.u15OldWfValidate(w);for(const s of valid.steps){const o=s.options;if(o.$onError!==undefined&&!['stop','continue'].includes(o.$onError))throw Error('Step $onError must be stop or continue');if(o.$when){if(typeof o.$when!=='object'||typeof o.$when.path!=='string'||!['exists','missing','equals'].includes(o.$when.test))throw Error('Condition needs path and exists/missing/equals test');__studio33.u15PointerParts(o.$when.path);if(o.$when.test==='equals'&&!Object.hasOwn(o.$when,'value'))throw Error('Equals condition needs value')}}return valid},"function(w){const valid=u15OldWfValidate(w);for(const s of valid.steps){const o=s.options;if(o.$onError!==undefined&&!['stop','continue'].includes(o.$onError))throw Error('Step $onError must be stop or continue');if(o.$when){if(typeof o.$when!=='object'||typeof o.$when.path!=='string'||!['exists','missing','equals'].includes(o.$when.test))throw Error('Condition needs path and exists/missing/equals test');u15PointerParts(o.$when.path);if(o.$when.test==='equals'&&!Object.hasOwn(o.$when,'value'))throw Error('Equals condition needs value')}}return valid}","");
}],
[1797,function initialize_1797(__studio33){
__studio33.u15Field(__studio33.u15PresetFields,'u15WorkflowPreset','Reusable starter workflow','mask','text',[['mask','Mask sensitive fields → format JSON'],['csv','CSV → JSON → validate → format'],['query','Extract records → convert to CSV']]);
}],
[1807,function initialize_1807(__studio33){
for(const [id,label,value]of [['u15LoanPrincipal','Principal','500000'],['u15LoanRate','Annual interest (%)','9'],['u15LoanMonths','Tenure (months)','60'],['u15LoanFee','Upfront fees (not financed)','0'],['u15LoanExtra','Extra principal every month','0'],['u15LoanLump','One-time principal payment','0'],['u15LoanLumpMonth','One-time payment month','12'],['u15LoanNewRate','New annual interest (%)','9'],['u15LoanRateMonth','Rate change month (0 = none)','0']])__studio33.u15Field(__studio33.u15LoanFields,id,label,value,'number');
}],
[1808,function initialize_1808(__studio33){
__studio33.u15Field(__studio33.u15LoanFields,'u15LoanRatePolicy','At rate change','recast','text',[['recast','Recalculate payment over remaining term'],['keep','Keep regular payment; require repayment within term']]);
}],
[1810,function initialize_1810(__studio33){
__studio33.u15LoanResults.id='u15LoanResults';
}],
[1811,function initialize_1811(__studio33){
__studio33.u15Loan.append(__studio33.u15LoanResults);
}],
[1814,function initialize_1814(__studio33){
__studio33.u15Button(__studio33.u15Loan,'u15LoanUseA','Use current Loan A inputs',__studio33.$fn(()=>{if(!__studio33.$('financeAp'))throw Error('Choose Compare loans in Finance first');for(const[a,b]of [['u15LoanPrincipal','financeAp'],['u15LoanRate','financeAr'],['u15LoanMonths','financeAn']])__studio33.$(a).value=String(__studio33.numeric(b));__studio33.$('u15LoanNewRate').value=__studio33.$('u15LoanRate').value;__studio33.u15LoanStatus.textContent='Loan A values copied. Review scenario amounts.'},"()=>{if(!$('financeAp'))throw Error('Choose Compare loans in Finance first');for(const[a,b]of [['u15LoanPrincipal','financeAp'],['u15LoanRate','financeAr'],['u15LoanMonths','financeAn']])$(a).value=String(numeric(b));$('u15LoanNewRate').value=$('u15LoanRate').value;u15LoanStatus.textContent='Loan A values copied. Review scenario amounts.'}",""));
}],
[1815,function initialize_1815(__studio33){
__studio33.u15Button(__studio33.u15Loan,'u15LoanCalculate','Compare repayment scenario',__studio33.$fn(()=>{const read=__studio33.$fn(id=>{if(!__studio33.$(id).value.trim())throw Error('Complete '+__studio33.$(id).closest('label').innerText);return Number(__studio33.$(id).value)},"id=>{if(!$(id).value.trim())throw Error('Complete '+$(id).closest('label').innerText);return Number($(id).value)}","read"),c={principal:read('u15LoanPrincipal'),rate:read('u15LoanRate'),months:read('u15LoanMonths'),fee:read('u15LoanFee'),extra:read('u15LoanExtra'),lump:read('u15LoanLump'),lumpMonth:read('u15LoanLumpMonth'),newRate:read('u15LoanNewRate'),rateMonth:read('u15LoanRateMonth'),policy:__studio33.$('u15LoanRatePolicy').value},scenario=__studio33.u15LoanScenario(c),baseline=__studio33.u15LoanScenario({...c,extra:0,lump:0,rateMonth:0});__studio33.u15LoanReport={baseline,scenario};__studio33.u15Table(__studio33.u15LoanResults,['Metric','Baseline','Scenario'],[['Months to repay',baseline.months,scenario.months],['Interest',baseline.interest.toFixed(2),scenario.interest.toFixed(2)],['Upfront fees',baseline.fees.toFixed(2),scenario.fees.toFixed(2)],['Total including fees',baseline.totalCost.toFixed(2),scenario.totalCost.toFixed(2)],['Interest saving','—',(baseline.interest-scenario.interest).toFixed(2)]]);const schedule=__studio33.csText('div','');__studio33.u15LoanResults.append(schedule);__studio33.u15Table(schedule,['Month','Rate %','Payment','Extra principal','Interest','Principal','Balance'],scenario.rows.slice(0,120).map(r=>[r.month,r.annualRate,r.payment.toFixed(2),r.extra.toFixed(2),r.interest.toFixed(2),r.principal.toFixed(2),r.balance.toFixed(2)]));__studio33.u15LoanStatus.textContent=scenario.notice+' First 120 schedule rows shown; CSV contains every month.'},"()=>{const read=id=>{if(!$(id).value.trim())throw Error('Complete '+$(id).closest('label').innerText);return Number($(id).value)},c={principal:read('u15LoanPrincipal'),rate:read('u15LoanRate'),months:read('u15LoanMonths'),fee:read('u15LoanFee'),extra:read('u15LoanExtra'),lump:read('u15LoanLump'),lumpMonth:read('u15LoanLumpMonth'),newRate:read('u15LoanNewRate'),rateMonth:read('u15LoanRateMonth'),policy:$('u15LoanRatePolicy').value},scenario=u15LoanScenario(c),baseline=u15LoanScenario({...c,extra:0,lump:0,rateMonth:0});u15LoanReport={baseline,scenario};u15Table(u15LoanResults,['Metric','Baseline','Scenario'],[['Months to repay',baseline.months,scenario.months],['Interest',baseline.interest.toFixed(2),scenario.interest.toFixed(2)],['Upfront fees',baseline.fees.toFixed(2),scenario.fees.toFixed(2)],['Total including fees',baseline.totalCost.toFixed(2),scenario.totalCost.toFixed(2)],['Interest saving','—',(baseline.interest-scenario.interest).toFixed(2)]]);const schedule=csText('div','');u15LoanResults.append(schedule);u15Table(schedule,['Month','Rate %','Payment','Extra principal','Interest','Principal','Balance'],scenario.rows.slice(0,120).map(r=>[r.month,r.annualRate,r.payment.toFixed(2),r.extra.toFixed(2),r.interest.toFixed(2),r.principal.toFixed(2),r.balance.toFixed(2)]));u15LoanStatus.textContent=scenario.notice+' First 120 schedule rows shown; CSV contains every month.'}",""));
}],
[1818,function initialize_1818(__studio33){
for(const e of __studio33.u15LoanFields.querySelectorAll('input,select'))e.addEventListener('input',__studio33.$fn(()=>{__studio33.u15LoanReport=null;__studio33.u15LoanResults.classList.add('u15-stale');__studio33.u15LoanStatus.textContent='Inputs changed. Recalculate the scenario.'},"()=>{u15LoanReport=null;u15LoanResults.classList.add('u15-stale');u15LoanStatus.textContent='Inputs changed. Recalculate the scenario.'}",""));
}],
[1821,function initialize_1821(__studio33){
__studio33.u15Field(__studio33.u15GraphFields,'u15InspectX','Inspect x coordinate','0','number');
}],
[1823,function initialize_1823(__studio33){
__studio33.u15PointHost.id='u15PointHost';
}],
[1824,function initialize_1824(__studio33){
__studio33.u15Graph.append(__studio33.u15PointHost);
}],
[1830,function initialize_1830(__studio33){
__studio33.u15RootHost.id='u15RootHost';
}],
[1831,function initialize_1831(__studio33){
__studio33.u15Graph.append(__studio33.u15RootHost);
}],
[1837,function initialize_1837(__studio33){
__studio33.u15Field(__studio33.u15CalcFields,'u15RootA','Lower x','-10','number');
}],
[1838,function initialize_1838(__studio33){
__studio33.u15Field(__studio33.u15CalcFields,'u15RootB','Upper x','10','number');
}],
[1840,function initialize_1840(__studio33){
__studio33.u15Calculus.append(__studio33.u15CalcRootHost);
}],
[1847,function initialize_1847(__studio33){
__studio33.u15Field(__studio33.u15LogFields,'u15LogTransaction','Timeline transaction','','text',[]);
}],
[1849,function initialize_1849(__studio33){
__studio33.u15LogPairs.id='u15LogPairs';
}],
[1850,function initialize_1850(__studio33){
__studio33.u15LogLimits.id='u15LogLimits';
}],
[1851,function initialize_1851(__studio33){
__studio33.u15LogTimeline.id='u15LogTimeline';
}],
[1852,function initialize_1852(__studio33){
__studio33.u15Logs.append(__studio33.u15LogTimeline,__studio33.u15LogLimits,__studio33.u15LogPairs);
}],
[1855,function initialize_1855(__studio33){
__studio33.$('u15LogTransaction').onchange=__studio33.u15LogVisuals;
}],
[1863,function initialize_1863(__studio33){
__studio33.u15CompositeHost.id='u15CompositeHost';
}],
[1864,function initialize_1864(__studio33){
__studio33.u15Composite.append(__studio33.u15CompositeHost);
}],
[1869,function initialize_1869(__studio33){
__studio33.u15Kanban.append(__studio33.u15KanbanStats);
}],
[1871,function initialize_1871(__studio33){
__studio33.u15KanbanPreview.id='u15KanbanPreview';
}],
[1872,function initialize_1872(__studio33){
__studio33.u15Kanban.append(__studio33.u15KanbanPreview);
}],
[1880,function initialize_1880(__studio33){
__studio33.u15Button(__studio33.u15Kanban,'u15CancelSchedule','Cancel schedule preview',__studio33.$fn(()=>{__studio33.u15PendingSchedule=null;__studio33.u15KanbanPreview.replaceChildren();__studio33.u15KanbanStatus.textContent='Preview cleared.'},"()=>{u15PendingSchedule=null;u15KanbanPreview.replaceChildren();u15KanbanStatus.textContent='Preview cleared.'}",""));
}],
[1884,function initialize_1884(__studio33){
__studio33.u15Forms.append(__studio33.u15ImportHost);
}],
[1887,function initialize_1887(__studio33){
__studio33.fdValidate=__studio33.$fn(function(data){const valid=__studio33.u15OldFDValidate(data);for(const f of valid.fields){if(['text','textarea','email'].includes(f.type)&&[f.min,f.max].some(v=>v!==null&&(!Number.isInteger(v)||v<0)))throw Error('Text lengths must be nonnegative integers');if(['select','radio'].includes(f.type)&&!f.choices.length)throw Error('Choice fields need at least one option')}return valid},"function(data){const valid=u15OldFDValidate(data);for(const f of valid.fields){if(['text','textarea','email'].includes(f.type)&&[f.min,f.max].some(v=>v!==null&&(!Number.isInteger(v)||v<0)))throw Error('Text lengths must be nonnegative integers');if(['select','radio'].includes(f.type)&&!f.choices.length)throw Error('Choice fields need at least one option')}return valid}","");
}],
[1892,function initialize_1892(__studio33){
__studio33.u15Forms.append(__studio33.u15ConditionHost);
}],
[1901,function initialize_1901(__studio33){
__studio33.u15QualityHost.id='u15QualityHost';
}],
[1902,function initialize_1902(__studio33){
__studio33.u15Quality.append(__studio33.u15QualityHost);
}],
[1911,function initialize_1911(__studio33){
for(const editor of document.querySelectorAll('section textarea[id]')){if(editor.id.startsWith('u15')){editor.classList.add('developer-editor');editor.rows=5;editor.spellcheck=false;__studio33.v13InstallEditor(editor)}__studio33.u15InstallGutter(editor)}
}],
[1914,function initialize_1914(__studio33){
__studio33.v13CloseEditor=__studio33.$fn(function(){__studio33.u15OldCloseEditor();__studio33.u15ReattachGutters()},"function(){u15OldCloseEditor();u15ReattachGutters()}","");
}],
[1915,function initialize_1915(__studio33){
__studio33.v13EditorDialog.addEventListener('close',__studio33.u15ReattachGutters);
}],
[1916,function initialize_1916(__studio33){
__studio33.v13EditorHeader.querySelector('button').onclick=__studio33.$fn(()=>__studio33.v13CloseEditor(),"()=>v13CloseEditor()","");
}],
[1919,function initialize_1919(__studio33){
__studio33.newToolStatus=__studio33.$fn(function(id,message,error=false){__studio33.u15OldStatus(id,message,error);__studio33.u15MarkError(__studio33.$(id),message,error)},"function(id,message,error=false){u15OldStatus(id,message,error);u15MarkError($(id),message,error)}","");
}],
[1922,function initialize_1922(__studio33){
for(const status of document.querySelectorAll('.developer-status,.u15-status'))new MutationObserver(__studio33.$fn(()=>__studio33.u15MarkError(status,status.textContent,status.dataset.error==='true'),"()=>u15MarkError(status,status.textContent,status.dataset.error==='true')","")).observe(status,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:['data-error']});
}],
[1924,function initialize_1924(__studio33){
for(const id of ['u15LoanPrincipal','u15LoanRate','u15LoanMonths','u15LoanFee','u15LoanExtra','u15LoanLump','u15LoanLumpMonth','u15LoanNewRate','u15LoanRateMonth','u15LoanRatePolicy'])__studio33.$(id).addEventListener('input',__studio33.$fn(()=>{__studio33.u15LoanReport=null;__studio33.u15LoanStatus.textContent='Inputs changed. Recalculate the scenario.';__studio33.u15LoanResults.classList.add('u15-stale')},"()=>{u15LoanReport=null;u15LoanStatus.textContent='Inputs changed. Recalculate the scenario.';u15LoanResults.classList.add('u15-stale')}",""));
}],
[1926,function initialize_1926(__studio33){
__studio33.$('u15LoanCalculate').onclick=__studio33.$fn(async function(...args){await __studio33.u15LoanCalculateAction.apply(this,args);if(__studio33.u15LoanReport)__studio33.u15LoanResults.classList.remove('u15-stale')},"async function(...args){await u15LoanCalculateAction.apply(this,args);if(u15LoanReport)u15LoanResults.classList.remove('u15-stale')}","");
}],
[1930,function initialize_1930(__studio33){
__studio33.knValidate=__studio33.$fn(function(data){const valid=__studio33.u15OldKNValidate(data);for(const b of valid.boards)for(const t of b.tasks)if(t.completedAt!==undefined&&(typeof t.completedAt!=='string'||!Number.isFinite(Date.parse(t.completedAt))))throw Error('Invalid task completion timestamp');return valid},"function(data){const valid=u15OldKNValidate(data);for(const b of valid.boards)for(const t of b.tasks)if(t.completedAt!==undefined&&(typeof t.completedAt!=='string'||!Number.isFinite(Date.parse(t.completedAt))))throw Error('Invalid task completion timestamp');return valid}","");
}],
[1932,function initialize_1932(__studio33){
document.title='Calc Studio — Complete edition '+__studio33.u15Version;
}],
[1933,function initialize_1933(__studio33){
__studio33.$('helpPanel').replaceChildren(__studio33.csText('h3','Calc Studio · edition '+__studio33.u15Version),__studio33.csText('p','91 registered tool/workspace entries, grouped into combined studios. This release improves existing workflows: cURL import, enabled request rows, response checks, variable extraction, redaction preview, keyed JSON comparison, editable JSON values, schema suggestions, visual mapping, data profiling/validation, per-column reconciliation, workflow conditions, loan scenarios, numerical graph analysis, log visuals, Kanban workload and form-response quality checks.'),__studio33.csText('p','New controls are under descriptive expandable panels in each existing tool. Local tools and bundled libraries work without a server. Live HTTP requests and currency refresh require a network connection; API calls remain subject to browser CORS. Nothing is sent until you choose Send.'),__studio33.csText('p','Find tool: Ctrl/⌘ K. Find in an editor: Ctrl/⌘ F. Replace: Ctrl/⌘ H. Expand editor: Alt Enter. Escape closes expanded editors. Undo/redo remains available for supported text edits. Editor gutters show line numbers and detected error locations.'),__studio33.csText('p','API saving omits dedicated credentials and redacts sensitive JSON/form body keys by default. Literal text bodies are omitted unless they are a variable placeholder or authentication inclusion is enabled. Preview saved values before export. Remembered environments and explicitly included credentials remain in full backups; review backups before sharing.'),__studio33.csText('p','Keyed JSON comparison requires unique, nonblank scalar record keys. Ignored paths use JSON Pointer syntax; * matches one segment. Exact numeric tokens are retained. Workflow failure policy Continue records the failure and keeps the previous input. Cancel step edit never removes the original step.'),__studio33.csText('p','Numerical roots/intersections use sign-change brackets and sampled exact zeros. Tangencies, narrow features and discontinuities may be missed. Loan schedules are rounded monthly estimates with upfront fees; they do not reproduce lender-specific rules. Log diagrams show recorded evidence; inclusive elapsed operations can overlap.'),__studio33.csText('p','Use Formatting & backup to export all saved work. Project snapshots and draft recovery remain opt-in. Current uploads, live responses and unsaved credentials remain page-local. The separate Calc Studio Guide provides examples and detailed operating limits.'));
}],
[1934,function initialize_1934(__studio33){
__studio33.wfRender();
}],
[1935,function initialize_1935(__studio33){
__studio33.dwRender();
}],
[1936,function initialize_1936(__studio33){
__studio33.u15LogVisuals();
}],
[1937,function initialize_1937(__studio33){
__studio33.u15ReattachGutters();
}],
[1939,function initialize_1939(__studio33){
__studio33.u16Style.textContent=`.u16-preview{border:1px solid var(--line);border-radius:12px;padding:12px;margin:12px 0;max-height:480px;overflow:auto}.u16-split{display:flex!important;gap:16px;align-items:stretch}.u16-split>.field{flex:1;min-width:220px;resize:horizontal;overflow:auto}.u16-split textarea{min-height:280px}.u16-note{max-width:240px}.u16-review-row{display:flex;gap:8px;flex-wrap:wrap;padding:10px 0;border-bottom:1px solid var(--line)}.u16-review-row>code{flex:1;min-width:180px;overflow-wrap:anywhere}.u16-review-row select{max-width:190px}.u16-review-row input{min-width:140px;flex:1}.u16-error{color:var(--text);background:var(--op);padding:12px;border-radius:10px}@media(max-width:750px){.u16-split{display:grid!important;grid-template-columns:1fr!important}.u16-split>.field{resize:none;min-width:0}.u16-review-row>*{max-width:100%;min-width:0}}`;
}],
[1940,function initialize_1940(__studio33){
document.head.append(__studio33.u16Style);
}],
[1955,function initialize_1955(__studio33){
__studio33.u16Runner.append(__studio33.csText('p','Load a saved collection, review the order and rules, then Preview and Run. CSV values and extracted variables remain within this run. Requests run once in sequence; cancellation stops future requests.','hint'));
}],
[1973,function initialize_1973(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16JoinRight','Second table: CSV or JSON array','','textarea');
}],
[1974,function initialize_1974(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16JoinKeys','Join keys: JSON array of [current column, second-table column]','[["id","id"]]','textarea');
}],
[1975,function initialize_1975(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16JoinMode','Join type','left','text',[['left','Left join'],['inner','Inner join'],['full','Full outer join']]);
}],
[1976,function initialize_1976(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16JoinDuplicates','Duplicate key policy','reject','text',[['reject','Reject duplicate groups'],['expand','Expand all matching combinations']]);
}],
[1977,function initialize_1977(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16GroupColumns','Group columns: JSON array','["status"]');
}],
[1978,function initialize_1978(__studio33){
__studio33.u16Field(__studio33.u16Tables,'u16GroupMetrics','Summary metrics: JSON array','[{"op":"count","as":"records"},{"op":"sum","column":"amount","as":"total"}]','textarea');
}],
[1989,function initialize_1989(__studio33){
__studio33.u16Button(__studio33.u16Tables,'u16UnmatchedExport','Export unmatched records',__studio33.$fn(()=>{if(!__studio33.u16TablePending)throw Error('Preview a join first');__studio33.u16Fresh(__studio33.u16TablePending.signature,__studio33.u16TableSignature());__studio33.downloadFile('join-unmatched.csv',__studio33.v12CSV([['side','source_row','reason'],...__studio33.u16TablePending.unmatched]),'text/csv')},"()=>{if(!u16TablePending)throw Error('Preview a join first');u16Fresh(u16TablePending.signature,u16TableSignature());downloadFile('join-unmatched.csv',v12CSV([['side','source_row','reason'],...u16TablePending.unmatched]),'text/csv')}",""));
}],
[1991,function initialize_1991(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONAction','Operation','add','text',[['add','Add property / insert array item'],['replace','Replace value or branch'],['rename','Rename object property'],['remove','Delete property / array item'],['move','Move branch']]);
}],
[1992,function initialize_1992(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONPath','Target JSON Pointer (blank = root)','/newField');
}],
[1993,function initialize_1993(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONFrom','Move source JSON Pointer','');
}],
[1994,function initialize_1994(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONName','New property name (rename only)','');
}],
[1995,function initialize_1995(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16JSONValue','New JSON value','null','textarea');
}],
[1996,function initialize_1996(__studio33){
__studio33.u16Field(__studio33.u16JSONBox,'u16SchemaSamples','Schema samples: JSON array of sample documents','[{"id":1},{"id":2,"note":"optional"}]','textarea');
}],
[2022,function initialize_2022(__studio33){
__studio33.u16Button(__studio33.u16Resolution,'u16ResolvedJSON','Export corrected JSON',__studio33.$fn(()=>__studio33.downloadFile('reconciled-data.json',__studio33.dwJSON(__studio33.u16ResolvedReady().table),'application/json'),"()=>downloadFile('reconciled-data.json',dwJSON(u16ResolvedReady().table),'application/json')",""));
}],
[2023,function initialize_2023(__studio33){
__studio33.u16Button(__studio33.u16Resolution,'u16ResolvedCSV','Export corrected CSV',__studio33.$fn(()=>__studio33.downloadFile('reconciled-data.csv',__studio33.dwCSV(__studio33.u16ResolvedReady().table),'text/csv'),"()=>downloadFile('reconciled-data.csv',dwCSV(u16ResolvedReady().table),'text/csv')",""));
}],
[2024,function initialize_2024(__studio33){
__studio33.u16Button(__studio33.u16Resolution,'u16ResolutionAudit','Export decision audit',__studio33.$fn(()=>{const p=__studio33.u16ResolvedReady();__studio33.downloadFile('reconciliation-decisions.json',JSON.stringify({app:'calc-studio-resolution',version:1,createdAt:p.createdAt,rules:__studio33.rcReport.rules,outputColumns:p.table.columns,outputRows:p.table.rows.length,decisions:p.audit},null,2),'application/json')},"()=>{const p=u16ResolvedReady();downloadFile('reconciliation-decisions.json',JSON.stringify({app:'calc-studio-resolution',version:1,createdAt:p.createdAt,rules:rcReport.rules,outputColumns:p.table.columns,outputRows:p.table.rows.length,decisions:p.audit},null,2),'application/json')}",""));
}],
[2027,function initialize_2027(__studio33){
__studio33.u16Field(__studio33.u16Hotspots,'u16HotspotSort','Rank by','total','text',[['total','Total inclusive elapsed'],['count','Execution count'],['max','Maximum elapsed'],['self','Recorded self time']]);
}],
[2034,function initialize_2034(__studio33){
__studio33.$('u16HotspotSort').onchange=__studio33.u16HotspotsDraw;
}],
[2037,function initialize_2037(__studio33){
__studio33.invalidateLogs=__studio33.$fn(function(){__studio33.u16OldInvalidateLogs();__studio33.u16HotspotReport=null;__studio33.u16HotspotRows.replaceChildren();__studio33.u16HotspotStatus.textContent='Log inputs changed. Analyze logs and hotspots again.'},"function(){u16OldInvalidateLogs();u16HotspotReport=null;u16HotspotRows.replaceChildren();u16HotspotStatus.textContent='Log inputs changed. Analyze logs and hotspots again.'}","");
}],
[2046,function initialize_2046(__studio33){
__studio33.u16Field(__studio33.u16PatchBox,'u16PatchRules','Patch selection','all','text',[['all','All raw source-to-target changes'],['accepted','Accepted reviewed changes only']]);
}],
[2057,function initialize_2057(__studio33){
__studio33.u16Field(__studio33.u16Composite,'u16CompositeResponse','Composite / Graph response JSON','','textarea');
}],
[2058,function initialize_2058(__studio33){
__studio33.u16Field(__studio33.u16Composite,'u16RetrySelection','Requests to retry: JSON array of "graphId/referenceId"','[]','textarea');
}],
[2069,function initialize_2069(__studio33){
__studio33.u16Button(__studio33.u16Composite,'u16RetryExport','Export retry payload',__studio33.$fn(()=>__studio33.downloadFile('composite-retry.json',__studio33.u16RetryReady(),'application/json'),"()=>downloadFile('composite-retry.json',u16RetryReady(),'application/json')",""));
}],
[2072,function initialize_2072(__studio33){
__studio33.u16Field(__studio33.u16Workflow,'u16StepName','Save this step output under a name','');
}],
[2073,function initialize_2073(__studio33){
__studio33.u16Field(__studio33.u16Workflow,'u16StepSource','Use a previous named output (blank = previous step)','');
}],
[2074,function initialize_2074(__studio33){
__studio33.u16Field(__studio33.u16Workflow,'u16StepEach','Process array items individually','no','text',[['no','Process whole input'],['yes','Process each JSON array item']]);
}],
[2075,function initialize_2075(__studio33){
__studio33.u16Field(__studio33.u16Workflow,'u16StepEachLimit','Maximum items (1–500)','100','number');
}],
[2080,function initialize_2080(__studio33){
__studio33.wfValidate=__studio33.$fn(function(w){const valid=__studio33.u16OldWFValidate(w),names=new Set();for(const s of valid.steps){const o=s.options;for(const key of ['$name','$input'])if(o[key]!==undefined&&(!/^[A-Za-z_][\w.-]{0,99}$/.test(o[key])))throw Error(key+' must be a name of 1–100 characters');if(o.$input&&!names.has(o.$input))throw Error('Named input '+o.$input+' must come from an earlier step');if(o.$name){if(names.has(o.$name))throw Error('Use unique output names');names.add(o.$name)}if(o.$each!==undefined&&typeof o.$each!=='boolean')throw Error('$each must be boolean');if(o.$eachLimit!==undefined&&(!Number.isInteger(o.$eachLimit)||o.$eachLimit<1||o.$eachLimit>500))throw Error('$eachLimit must be 1–500')}return valid},"function(w){const valid=u16OldWFValidate(w),names=new Set();for(const s of valid.steps){const o=s.options;for(const key of ['$name','$input'])if(o[key]!==undefined&&(!/^[A-Za-z_][\\w.-]{0,99}$/.test(o[key])))throw Error(key+' must be a name of 1–100 characters');if(o.$input&&!names.has(o.$input))throw Error('Named input '+o.$input+' must come from an earlier step');if(o.$name){if(names.has(o.$name))throw Error('Use unique output names');names.add(o.$name)}if(o.$each!==undefined&&typeof o.$each!=='boolean')throw Error('$each must be boolean');if(o.$eachLimit!==undefined&&(!Number.isInteger(o.$eachLimit)||o.$eachLimit<1||o.$eachLimit>500))throw Error('$eachLimit must be 1–500')}return valid}","");
}],
[2092,function initialize_2092(__studio33){
__studio33.u16Field(__studio33.u16Planning,'u16Capacity','Weekly hours by assignee: JSON object','{"Unassigned":40}','textarea');
}],
[2098,function initialize_2098(__studio33){
__studio33.knValidate=__studio33.$fn(function(data){const x=__studio33.u16OldKNValidate(data);for(const b of x.boards){if(b.weeklyCapacity!==undefined)__studio33.u16ValidateCapacity(b.weeklyCapacity);if(b.scheduleBaseline!==undefined){const p=b.scheduleBaseline;if(!p||!Number.isFinite(Date.parse(p.at))||!Array.isArray(p.tasks)||p.tasks.length>2000||p.tasks.some(__studio33.$fn(t=>!t||typeof t.id!=='string'||typeof t.title!=='string'||t.start&&!__studio33.v12Date(t.start)||t.due&&!__studio33.v12Date(t.due),"t=>!t||typeof t.id!=='string'||typeof t.title!=='string'||t.start&&!v12Date(t.start)||t.due&&!v12Date(t.due)","")))throw Error('Invalid schedule baseline')}}return x},"function(data){const x=u16OldKNValidate(data);for(const b of x.boards){if(b.weeklyCapacity!==undefined)u16ValidateCapacity(b.weeklyCapacity);if(b.scheduleBaseline!==undefined){const p=b.scheduleBaseline;if(!p||!Number.isFinite(Date.parse(p.at))||!Array.isArray(p.tasks)||p.tasks.length>2000||p.tasks.some(t=>!t||typeof t.id!=='string'||typeof t.title!=='string'||t.start&&!v12Date(t.start)||t.due&&!v12Date(t.due)))throw Error('Invalid schedule baseline')}}return x}","");
}],
[2111,function initialize_2111(__studio33){
for(const [id,label,value,type]of [['u16LoanPrincipal','Principal','500000','number'],['u16LoanAnnual','Annual rate (%)','9','number'],['u16LoanStart','Accrual start date','2026-01-01','date'],['u16LoanFirst','First payment date','2026-02-01','date'],['u16LoanPayments','Number of payments','60','number'],['u16LoanFees','Upfront fees','0','number']])__studio33.u16Field(__studio33.u16FinanceFields,id,label,value,type);
}],
[2112,function initialize_2112(__studio33){
__studio33.u16Field(__studio33.u16FinanceFields,'u16LoanFrequency','Payment frequency','monthly','text',[['monthly','Monthly'],['fortnightly','Every 14 days'],['weekly','Every 7 days']]);
}],
[2113,function initialize_2113(__studio33){
__studio33.u16Field(__studio33.u16FinanceFields,'u16LoanPolicy','After a rate change','recast','text',[['recast','Recalculate scheduled payment'],['keep','Keep scheduled payment']]);
}],
[2114,function initialize_2114(__studio33){
__studio33.u16Field(__studio33.u16Finance,'u16LoanEvents','Dated events: rate or extra-principal JSON array','[]','textarea');
}],
[2115,function initialize_2115(__studio33){
__studio33.u16Field(__studio33.u16Finance,'u16LoanName','Scenario name','Scenario 1');
}],
[2116,function initialize_2116(__studio33){
__studio33.u16Field(__studio33.u16Finance,'u16LoanSaved','Saved scenario','','text',[['','Choose scenario']]);
}],
[2123,function initialize_2123(__studio33){
try{__studio33.u16State=__studio33.u16StateValidate(__studio33.storage.get(__studio33.u16StateKey,{version:1,loans:[],runs:[]}))}catch{__studio33.u16State={version:1,loans:[],runs:[]}}
}],
[2132,function initialize_2132(__studio33){
__studio33.u16LoanSavedRender();
}],
[2133,function initialize_2133(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanCalculate','Calculate dated schedule',__studio33.$fn(()=>{__studio33.u16DatedLoan=null;const report=__studio33.u16DatedSchedule(__studio33.u16LoanConfig());__studio33.u16DatedLoan={signature:__studio33.u16LoanSignature(),report};__studio33.u16FinanceDraw(report)},"()=>{u16DatedLoan=null;const report=u16DatedSchedule(u16LoanConfig());u16DatedLoan={signature:u16LoanSignature(),report};u16FinanceDraw(report)}",""));
}],
[2135,function initialize_2135(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanSave','Save calculated scenario',__studio33.$fn(()=>{if(!__studio33.u16DatedLoan)throw Error('Calculate a schedule first');__studio33.u16Fresh(__studio33.u16DatedLoan.signature,__studio33.u16LoanSignature());const name=__studio33.$('u16LoanName').value.trim();if(!name||name.length>100)throw Error('Enter a name up to 100 characters');if(__studio33.u16State.loans.length>=30)throw Error('Maximum 30 saved scenarios');__studio33.u16State.loans.push({id:__studio33.csId('loan16'),name,config:__studio33.csClone(__studio33.u16DatedLoan.report.configuration)});__studio33.u16StateSave();__studio33.u16LoanSavedRender();__studio33.u16FinanceStatus.textContent='Scenario saved; compare all saved scenarios below.'},"()=>{if(!u16DatedLoan)throw Error('Calculate a schedule first');u16Fresh(u16DatedLoan.signature,u16LoanSignature());const name=$('u16LoanName').value.trim();if(!name||name.length>100)throw Error('Enter a name up to 100 characters');if(u16State.loans.length>=30)throw Error('Maximum 30 saved scenarios');u16State.loans.push({id:csId('loan16'),name,config:csClone(u16DatedLoan.report.configuration)});u16StateSave();u16LoanSavedRender();u16FinanceStatus.textContent='Scenario saved; compare all saved scenarios below.'}",""));
}],
[2136,function initialize_2136(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanLoad','Load saved scenario',__studio33.$fn(()=>{const s=__studio33.u16State.loans.find(__studio33.$fn(s=>s.id===__studio33.$('u16LoanSaved').value,"s=>s.id===$('u16LoanSaved').value",""));if(!s)throw Error('Choose a saved scenario');const c=s.config,values={u16LoanPrincipal:c.principal,u16LoanAnnual:c.rate,u16LoanStart:c.start,u16LoanFirst:c.first,u16LoanPayments:c.payments,u16LoanFees:c.fee,u16LoanFrequency:c.frequency,u16LoanPolicy:c.policy,u16LoanEvents:JSON.stringify(c.events,null,2)};for(const [id,v]of Object.entries(values))__studio33.u15Change(__studio33.$(id),String(v));__studio33.$('u16LoanName').value=s.name;__studio33.u16DatedLoan=null;__studio33.u16FinanceStatus.textContent='Loaded. Calculate to refresh the schedule.'},"()=>{const s=u16State.loans.find(s=>s.id===$('u16LoanSaved').value);if(!s)throw Error('Choose a saved scenario');const c=s.config,values={u16LoanPrincipal:c.principal,u16LoanAnnual:c.rate,u16LoanStart:c.start,u16LoanFirst:c.first,u16LoanPayments:c.payments,u16LoanFees:c.fee,u16LoanFrequency:c.frequency,u16LoanPolicy:c.policy,u16LoanEvents:JSON.stringify(c.events,null,2)};for(const [id,v]of Object.entries(values))u15Change($(id),String(v));$('u16LoanName').value=s.name;u16DatedLoan=null;u16FinanceStatus.textContent='Loaded. Calculate to refresh the schedule.'}",""));
}],
[2137,function initialize_2137(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanDelete','Delete selected scenario',__studio33.$fn(()=>{__studio33.u16State.loans=__studio33.u16State.loans.filter(__studio33.$fn(s=>s.id!==__studio33.$('u16LoanSaved').value,"s=>s.id!==$('u16LoanSaved').value",""));__studio33.u16StateSave();__studio33.u16LoanSavedRender();__studio33.u16FinanceStatus.textContent='Selected saved scenario removed.'},"()=>{u16State.loans=u16State.loans.filter(s=>s.id!==$('u16LoanSaved').value);u16StateSave();u16LoanSavedRender();u16FinanceStatus.textContent='Selected saved scenario removed.'}",""));
}],
[2138,function initialize_2138(__studio33){
__studio33.u16Button(__studio33.u16Finance,'u16LoanCompare','Compare saved scenarios',__studio33.$fn(()=>{if(!__studio33.u16State.loans.length)throw Error('Save at least one scenario');const rows=__studio33.u16State.loans.map(__studio33.$fn(s=>{const r=__studio33.u16DatedSchedule(s.config);return [s.name,s.config.frequency,r.regularPayments,r.initialPayment.toFixed(2),r.finalPayment.toFixed(2),r.interest.toFixed(2),r.fees.toFixed(2),r.totalCost.toFixed(2)]},"s=>{const r=u16DatedSchedule(s.config);return [s.name,s.config.frequency,r.regularPayments,r.initialPayment.toFixed(2),r.finalPayment.toFixed(2),r.interest.toFixed(2),r.fees.toFixed(2),r.totalCost.toFixed(2)]}",""));__studio33.u15Table(__studio33.u16FinanceRows,['Scenario','Frequency','Payments','Initial payment','Final payment','Interest','Fees','Total cost'],rows);__studio33.u16FinanceStatus.textContent='All saved scenarios recalculated with the same actual/365 estimate. Different terms, principals and fees affect comparisons.'},"()=>{if(!u16State.loans.length)throw Error('Save at least one scenario');const rows=u16State.loans.map(s=>{const r=u16DatedSchedule(s.config);return [s.name,s.config.frequency,r.regularPayments,r.initialPayment.toFixed(2),r.finalPayment.toFixed(2),r.interest.toFixed(2),r.fees.toFixed(2),r.totalCost.toFixed(2)]});u15Table(u16FinanceRows,['Scenario','Frequency','Payments','Initial payment','Final payment','Interest','Fees','Total cost'],rows);u16FinanceStatus.textContent='All saved scenarios recalculated with the same actual/365 estimate. Different terms, principals and fees affect comparisons.'}",""));
}],
[2147,function initialize_2147(__studio33){
__studio33.fdValidate=__studio33.$fn(function(data){const valid=__studio33.u16OldFDValidate(data);if(valid.crossRules!==undefined)__studio33.u16CrossRulesValidate(valid.crossRules,valid.fields);return valid},"function(data){const valid=u16OldFDValidate(data);if(valid.crossRules!==undefined)u16CrossRulesValidate(valid.crossRules,valid.fields);return valid}","");
}],
[2156,function initialize_2156(__studio33){
__studio33.rdNormalize=__studio33.$fn(function(r){const x=__studio33.u16OldRDNormalize(r);if(x.crossRules!==undefined){if(x.version!==2)throw Error('Cross-field rules require a versioned response');__studio33.u16CrossRulesValidate(x.crossRules,x.fields)}return x},"function(r){const x=u16OldRDNormalize(r);if(x.crossRules!==undefined){if(x.version!==2)throw Error('Cross-field rules require a versioned response');u16CrossRulesValidate(x.crossRules,x.fields)}return x}","");
}],
[2159,function initialize_2159(__studio33){
__studio33.u16Field(__studio33.u16ResponseRules,'u16ResponseSource','Source form/version group','','text',[['','Choose source group']]);
}],
[2160,function initialize_2160(__studio33){
__studio33.u16Field(__studio33.u16ResponseRules,'u16ResponseMap','Source field ID → target field ID: JSON array','[]','textarea');
}],
[2174,function initialize_2174(__studio33){
__studio33.rdRender=__studio33.$fn(function(){__studio33.u16PreviousRDRender();__studio33.u16MigrationGeneration++;const groups=[...new Set(__studio33.v12State.responses.map(__studio33.rdGroup))];__studio33.v12Opt(__studio33.$('u16ResponseSource'),[['','Choose source group'],...groups.map(__studio33.$fn(k=>{const r=__studio33.v12State.responses.find(__studio33.$fn(r=>__studio33.rdGroup(r)===k,"r=>rdGroup(r)===k",""));return [k,(r.formTitle||'Form')+' · '+k]},"k=>{const r=v12State.responses.find(r=>rdGroup(r)===k);return [k,(r.formTitle||'Form')+' · '+k]}",""))],__studio33.$('u16ResponseSource').value)},"function(){u16PreviousRDRender();u16MigrationGeneration++;const groups=[...new Set(v12State.responses.map(rdGroup))];v12Opt($('u16ResponseSource'),[['','Choose source group'],...groups.map(k=>{const r=v12State.responses.find(r=>rdGroup(r)===k);return [k,(r.formTitle||'Form')+' · '+k]})],$('u16ResponseSource').value)}","");
}],
[2181,function initialize_2181(__studio33){
__studio33.u16Field(__studio33.u16History,'u16HistoryName','Run name','Reviewed run');
}],
[2182,function initialize_2182(__studio33){
__studio33.u16Field(__studio33.u16History,'u16HistorySaved','Saved run','','text',[['','Choose saved run']]);
}],
[2188,function initialize_2188(__studio33){
__studio33.u16HistoryRender();
}],
[2189,function initialize_2189(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryCapture','Save current inputs, rules and outputs',__studio33.$fn(()=>{const tool=__studio33.$('u16HistoryTool').value,name=__studio33.$('u16HistoryName').value.trim();if(!name||name.length>100)throw Error('Enter a name up to 100 characters');const record=__studio33.u16HistoryCapture(tool);if(__studio33.u16State.runs.length>=20)throw Error('Maximum 20 saved runs; delete or export an older run');__studio33.u16State.runs.unshift({id:__studio33.csId('run16'),name,at:new Date().toISOString(),...record});__studio33.u16StateSave();__studio33.u16HistoryRender();__studio33.u16HistoryStatus.textContent='Saved '+name+'. API snapshots contain a redacted request and response metadata; environments and response bodies are excluded.'},"()=>{const tool=$('u16HistoryTool').value,name=$('u16HistoryName').value.trim();if(!name||name.length>100)throw Error('Enter a name up to 100 characters');const record=u16HistoryCapture(tool);if(u16State.runs.length>=20)throw Error('Maximum 20 saved runs; delete or export an older run');u16State.runs.unshift({id:csId('run16'),name,at:new Date().toISOString(),...record});u16StateSave();u16HistoryRender();u16HistoryStatus.textContent='Saved '+name+'. API snapshots contain a redacted request and response metadata; environments and response bodies are excluded.'}",""));
}],
[2191,function initialize_2191(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryInspect','Preview saved run',__studio33.$fn(()=>{const r=__studio33.u16SelectedRun();__studio33.u16HistoryPreview.replaceChildren(__studio33.csText('pre',JSON.stringify(r,null,2).slice(0,30000)));__studio33.u16HistoryStatus.textContent='First 30,000 characters shown. Restore loads inputs; choose the tool action to rerun explicitly.'},"()=>{const r=u16SelectedRun();u16HistoryPreview.replaceChildren(csText('pre',JSON.stringify(r,null,2).slice(0,30000)));u16HistoryStatus.textContent='First 30,000 characters shown. Restore loads inputs; choose the tool action to rerun explicitly.'}",""));
}],
[2194,function initialize_2194(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryRestore','Restore inputs for rerun',__studio33.$fn(()=>{const r=__studio33.u16SelectedRun();__studio33.u16RunRestoreUndo=__studio33.u16HistoryCapture(r.tool);__studio33.u16RestoreRun(r);__studio33.u16HistoryStatus.textContent='Inputs restored. Outputs were retained only in the saved record; run the tool to compute fresh results. No API request sent.'},"()=>{const r=u16SelectedRun();u16RunRestoreUndo=u16HistoryCapture(r.tool);u16RestoreRun(r);u16HistoryStatus.textContent='Inputs restored. Outputs were retained only in the saved record; run the tool to compute fresh results. No API request sent.'}",""));
}],
[2195,function initialize_2195(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryUndo','Undo last run restore',__studio33.$fn(()=>{if(!__studio33.u16RunRestoreUndo)throw Error('Restore a run first');const next=__studio33.u16HistoryCapture(__studio33.u16RunRestoreUndo.tool);__studio33.u16RestoreRun(__studio33.u16RunRestoreUndo);__studio33.u16RunRestoreUndo=next},"()=>{if(!u16RunRestoreUndo)throw Error('Restore a run first');const next=u16HistoryCapture(u16RunRestoreUndo.tool);u16RestoreRun(u16RunRestoreUndo);u16RunRestoreUndo=next}",""));
}],
[2196,function initialize_2196(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryExport','Export selected saved run',__studio33.$fn(()=>__studio33.downloadFile('saved-tool-run.json',JSON.stringify(__studio33.u16SelectedRun(),null,2),'application/json'),"()=>downloadFile('saved-tool-run.json',JSON.stringify(u16SelectedRun(),null,2),'application/json')",""));
}],
[2197,function initialize_2197(__studio33){
__studio33.u16Button(__studio33.u16History,'u16HistoryDelete','Delete selected saved run',__studio33.$fn(()=>{__studio33.u16State.runs=__studio33.u16State.runs.filter(__studio33.$fn(r=>r.id!==__studio33.$('u16HistorySaved').value,"r=>r.id!==$('u16HistorySaved').value",""));__studio33.u16StateSave();__studio33.u16HistoryRender();__studio33.u16HistoryStatus.textContent='Selected run removed.'},"()=>{u16State.runs=u16State.runs.filter(r=>r.id!==$('u16HistorySaved').value);u16StateSave();u16HistoryRender();u16HistoryStatus.textContent='Selected run removed.'}",""));
}],
[2198,function initialize_2198(__studio33){
__studio33.backupKeys.push(__studio33.u16StateKey);
}],
[2200,function initialize_2200(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,__studio33.u16StateKey))raw.state[__studio33.u16StateKey]=null;const valid=__studio33.u16PreviousValidateBackup(raw);if(valid.state[__studio33.u16StateKey])__studio33.u16StateValidate(valid.state[__studio33.u16StateKey]);return valid},"function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,u16StateKey))raw.state[u16StateKey]=null;const valid=u16PreviousValidateBackup(raw);if(valid.state[u16StateKey])u16StateValidate(valid.state[u16StateKey]);return valid}","");
}],
[2202,function initialize_2202(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const x=__studio33.u16PreviousBackup();x.state[__studio33.u16StateKey]=__studio33.csClone(__studio33.u16State);return x},"function(){const x=u16PreviousBackup();x.state[u16StateKey]=csClone(u16State);return x}","");
}],
[2204,function initialize_2204(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(s){__studio33.u16PreviousRestore(s);__studio33.u16State=s[__studio33.u16StateKey]?__studio33.u16StateValidate(s[__studio33.u16StateKey]):{version:1,loans:[],runs:[]};__studio33.u16LoanSavedRender();__studio33.u16HistoryRender();__studio33.u16DatedLoan=null;__studio33.u16PlanReport=null;__studio33.u16ResolutionState=null;__studio33.u16Resolved=null;__studio33.u16CompositeMapped=null;__studio33.u16Retry=null},"function(s){u16PreviousRestore(s);u16State=s[u16StateKey]?u16StateValidate(s[u16StateKey]):{version:1,loans:[],runs:[]};u16LoanSavedRender();u16HistoryRender();u16DatedLoan=null;u16PlanReport=null;u16ResolutionState=null;u16Resolved=null;u16CompositeMapped=null;u16Retry=null}","");
}],
[2205,function initialize_2205(__studio33){
for(const [id,list]of __studio33.wsElements){const added=[...__studio33.$(id).querySelectorAll('input[id],textarea[id],select[id]')].filter(e=>e.id.startsWith('u16')&&!e.readOnly&&!e.matches('[type=file]')).map(e=>e.id);__studio33.wsElements.set(id,[...new Set([...list,...added])])}
}],
[2206,function initialize_2206(__studio33){
for(const area of document.querySelectorAll('textarea[id]')){if(area.id.startsWith('u16')&&!__studio33.v13Editors.has(area.id)){__studio33.v13InstallEditor(area);__studio33.u15InstallGutter(area)}}
}],
[2208,function initialize_2208(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 16';
}],
[2209,function initialize_2209(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Edition 16: complete task flows'),__studio33.csText('p','Collection runner with CSV iterations, reconciliation resolutions, table joins and summaries, structural JSON editing, log hotspots, Composite response/retry mapping, named workflow outputs and item processing, comparison decisions and JSON Patch, Kanban capacity and baselines, dated loan scenarios, cross-field form rules and response-version mapping, resizable editor splits and saved run history. New panels use Preview before Apply or Run where relevant.'));
}],
[2210,function initialize_2210(__studio33){
__studio33.fdRender();
}],
[2211,function initialize_2211(__studio33){
__studio33.knRender();
}],
[2212,function initialize_2212(__studio33){
__studio33.wfRender();
}],
[2213,function initialize_2213(__studio33){
__studio33.rdRender();
}],
[2215,function initialize_2215(__studio33){
__studio33.u17Style.textContent=`
:root{--u17-gap:8px;--u17-danger:#ad343c}:root[data-theme=neon]{--u17-danger:#ff939b}
body{padding:10px 16px 20px}.main-card{padding:16px}.top.studio-header{padding:5px 0;margin-bottom:6px}.panel-heading{margin:8px 0 4px}.panel-heading h2{font-size:18px;line-height:1.3}.cs-intro{font-size:12px;line-height:1.5;margin:4px 0 12px;color:var(--muted)}
.extra-panel,.v12-native-mode,.v12-suite-modes{min-width:0}.extra-panel .fields{gap:12px;margin:10px 0;align-items:start}.extra-panel .row,.extra-panel .developer-toolbar,.extra-panel .v12-wrap{gap:8px;margin:8px 0;align-items:center}.extra-panel .field{min-width:0}.extra-panel .field>span{font-size:12px;font-weight:600;margin-bottom:5px}
button[data-u17-role]{min-height:36px;padding:7px 12px;border-radius:8px;font-size:12px;line-height:1.3;font-weight:600;white-space:normal;box-shadow:none;background:transparent!important;color:var(--text)!important;border:1px solid var(--line)!important}
button[data-u17-role=primary]{background:var(--accent)!important;color:var(--on)!important;border-color:var(--accent)!important}
button[data-u17-role=result]{background:var(--surface)!important;border-color:var(--accent)!important}
button[data-u17-role=utility]{background:transparent!important;border-color:transparent!important;font-weight:500;padding:6px 8px}
button[data-u17-role=danger]{color:var(--u17-danger)!important;border-color:var(--u17-danger)!important;background:transparent!important}
button[data-u17-role]:disabled{opacity:.45;cursor:not-allowed}button[data-u17-role]:not(:disabled):hover{filter:brightness(.94);text-decoration:underline}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:3px}.u15-status[data-error=true]{color:var(--u17-danger)}
.extra-panel select,.compact-nav select{appearance:none;background:var(--surface);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='m2 2 4 4 4-4' fill='none' stroke='%2377838a' stroke-width='1.8' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;border:1px solid var(--line);border-radius:6px;padding:7px 30px 7px 10px;min-height:36px;font-size:12px;max-width:100%;min-width:0;box-shadow:inset 0 -1px 0 var(--line)}
.extra-panel .inline-field select,.extra-panel .row>select,.extra-panel .developer-toolbar>select{width:auto;max-width:260px}.extra-panel .field select{width:100%}.extra-panel input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]){min-height:36px;padding:7px 10px;font-size:12px;border-radius:6px}.extra-panel input[type=file]{max-width:100%}.extra-panel input[type=checkbox]{width:16px;height:16px;vertical-align:middle}
.v12-suite-tabs{padding:4px 0 8px;margin-bottom:8px;gap:4px}.v12-suite-tabs button{min-height:34px;padding:6px 10px;border-radius:6px;font-size:12px}.v12-shared{margin:6px 0;padding:0;border:0;background:transparent}.v12-shared>p{display:none}.v12-nested-mode>.panel-heading{margin:6px 0 2px}.v12-nested-mode>.panel-heading h2{font-size:14px;color:var(--muted)}
.u17-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:8px 0;margin:4px 0 10px;border:0}.u17-actions:empty,.u17-empty{display:none!important}.u17-actions .inline-field{display:flex;gap:5px;align-items:center;font-size:12px}.u17-field-actions{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:4px 0 6px}.u17-result-actions{display:flex;gap:6px;flex-wrap:wrap;margin:4px 0 8px;align-items:center}
.u17-advanced{margin:16px 0 4px;border:1px solid var(--line);border-radius:10px;background:var(--surface);padding:0}.u17-advanced>summary{padding:10px 12px;font-size:12px;font-weight:650;cursor:pointer}.u17-advanced[open]{padding:0 12px 12px}.u17-advanced[open]>summary{margin:0 -12px 8px;border-bottom:1px solid var(--line)}.u17-advanced .details-box,.u17-advanced .u15-box{margin:8px 0;padding:10px;border-radius:8px;background:var(--panel)}.u17-advanced .hint{line-height:1.5}.u17-advanced textarea.developer-editor{min-height:130px}.u17-advanced .u16-split textarea{min-height:260px}.u17-help p{font-size:12px;line-height:1.5;margin:8px 0}
.developer-editor{min-height:240px;font-size:13px;line-height:1.6;padding:10px}.u15-gutter{font-size:13px;line-height:1.6}.json-editors,.u17-editor-pair{display:grid;grid-template-columns:minmax(0,var(--editor-left,50%)) minmax(0,1fr);gap:12px;margin:8px 0;align-items:start}.u17-editor-pair>.field{width:100%;margin:0}.u17-editor-pair textarea{min-height:260px}.u17-editor-pair.u17-stacked{grid-template-columns:1fr}.studio-editor-tabs{display:none!important}.v13-editor-tools{display:flex;gap:2px;align-items:center;flex-wrap:wrap;margin:3px 0 5px;padding:0;border:0;background:transparent}.v13-editor-tools>button{min-height:30px;font-size:11px;padding:5px 7px;white-space:nowrap}.v13-editor-tools>span.hint{display:none}.u17-editor-menu{position:relative;margin-left:auto}.u17-editor-menu>summary{font-size:11px;cursor:pointer;padding:6px}.u17-editor-menu[open]>div{position:absolute;right:0;top:100%;z-index:12;min-width:160px;background:var(--panel);padding:8px;border:1px solid var(--line);border-radius:8px;box-shadow:var(--shadow)}.u17-editor-menu button{width:100%;text-align:left}.v12-output-tabs{gap:3px;margin:3px 0 5px;align-items:center}.v12-output-tabs button{min-height:30px;padding:5px 7px;font-size:11px}.u17-view-menu{position:relative}.u17-view-menu summary{font-size:11px;padding:6px;cursor:pointer}.u17-view-menu[open]>div{position:absolute;right:0;top:100%;z-index:12;background:var(--panel);padding:8px;min-width:200px;border:1px solid var(--line);border-radius:8px}.u17-view-menu button{display:block;width:100%;text-align:left}.u17-view-menu button[aria-pressed=true]{text-decoration:underline}
.studio-mobile-actions{display:none!important}.u17-mobile-actions{display:none}.u17-auto{font-size:11px;color:var(--muted);margin:4px 0}.u17-result-actions:empty{display:none}.lc-request-line{margin:8px 0}.lc-input-tabs,.lc-response-tabs{margin:8px 0}.lc-response{margin-top:12px}.u17-advanced .u16-split>.field{min-width:0}.u16-review-row select{max-width:100%}.v13-mapping-row{min-width:0}
@media(max-width:750px){body{padding:6px 8px 84px}.main-card{padding:12px}.top.studio-header{position:relative}.extra-panel button[data-u17-role]{min-height:44px;padding:8px 10px}.extra-panel select,.compact-nav select{min-height:44px}.extra-panel input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=file]){min-height:44px}.json-editors,.u17-editor-pair{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:14px;padding-right:0}.json-editors[data-mobile-pane]>[data-studio-pane]{display:block!important}.studio-divider{display:none}.u17-editor-pair textarea,.developer-editor{min-height:190px}.v13-editor-tools>button{min-height:44px;font-size:11px;padding:8px 6px}.v13-editor-tools{gap:2px}.u17-editor-menu>summary,.u17-view-menu>summary{min-height:44px;display:flex;align-items:center}.v12-output-tabs button{min-height:44px}.v12-suite-tabs{flex-wrap:nowrap;overflow:auto;max-width:100%;padding-bottom:8px}.v12-suite-tabs button{flex:none;white-space:nowrap;min-height:44px}.extra-panel .field,.extra-panel .row>*{max-width:100%}.u17-actions{gap:6px}.u17-mobile-actions{position:fixed;display:flex;left:0;right:0;bottom:0;z-index:25;gap:8px;padding:8px 12px max(8px,env(safe-area-inset-bottom));background:var(--panel);border-top:1px solid var(--line)}.u17-mobile-actions[hidden]{display:none}.u17-mobile-actions button{min-height:44px;flex:1;min-width:0;font-size:12px}.u17-advanced>summary{min-height:44px}.u17-editor-menu[open]>div{min-width:160px}.u17-result-actions button{font-size:11px}.v12-shared{gap:4px}.v12-shared button{font-size:11px;min-height:44px}.u17-advanced .u16-split>.field{resize:none;min-width:0}.lc-request-line{gap:6px}.lc-request-line .field{min-width:0}.lc-request-line select{width:90px}}
/* Override the earlier compact/mobile editor rules without shrinking the working area. */
.extra-panel .u17-actions{display:flex!important;padding:6px 0!important;margin:2px 0 8px!important;justify-content:flex-start!important;gap:8px!important}
.developer-status:empty,.u15-status:empty{display:none!important}.v12-nested-mode>.panel-heading:not(:has(button)){display:none}.v12-nested-mode{padding-top:2px!important}
.u17-editor-controls{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:3px 0 5px}.u17-editor-controls .v13-editor-tools,.u17-editor-controls .v12-output-tabs{margin:0}.u17-editor-controls .v13-editor-tools{flex:1}.u17-editor-controls .v12-output-tabs{order:2}.developer-editor{min-height:240px!important}.u17-advanced .developer-editor{min-height:130px!important}.u17-advanced .u16-split .developer-editor{min-height:260px!important}.u17-workspace-options{margin:8px 0!important;border-radius:8px!important}.u17-workspace-options>summary{padding:10px!important}
@media(max-width:750px){.developer-editor{min-height:190px!important}.extra-panel .u17-actions{gap:6px!important}.u17-editor-controls{gap:3px}.u17-editor-controls .v13-editor-tools{flex:1}.u17-editor-controls .v12-output-tabs{order:0}.u17-editor-controls .v13-editor-tools>button{font-size:11px}.v12-nested-mode>.cs-intro{margin:2px 0 8px}.u17-actions .inline-field{margin:0}.u17-actions>button{flex:none}}
`;
}],
[2216,function initialize_2216(__studio33){
document.head.append(__studio33.u17Style);
}],
[2225,function initialize_2225(__studio33){
for(const e of document.querySelectorAll('.row,.developer-toolbar'))if(!e.id&&!e.querySelector('button,input:not([type=file]),select,textarea')&&!e.textContent.trim())e.classList.add('u17-empty');
}],
[2226,function initialize_2226(__studio33){
for(const {editor,tools}of __studio33.v13Editors.values()){const field=editor.closest('.field');if(!field||tools.closest('.u17-editor-controls'))continue;const controls=__studio33.csText('div','','u17-editor-controls');tools.before(controls);controls.append(tools);const tabs=field.querySelector('.v12-output-tabs');if(tabs)controls.append(tabs)}
}],
[2242,function initialize_2242(__studio33){
__studio33.u17SuiteOptions();
}],
[2243,function initialize_2243(__studio33){
document.querySelectorAll('button').forEach(__studio33.u17Classify);
}],
[2244,function initialize_2244(__studio33){
for(const e of document.querySelectorAll('.field input,.field select,.field textarea'))if(!e.hasAttribute('aria-label')&&!e.hasAttribute('aria-labelledby')){const title=e.closest('.field')?.querySelector(':scope>span')?.textContent.trim();if(title)e.setAttribute('aria-label',title)}
}],
[2246,function initialize_2246(__studio33){
document.addEventListener('toggle',__studio33.$fn(e=>{if(e.target.tagName==='DETAILS'&&e.target.open&&e.target.closest('.u17-advanced')){const parent=e.target.parentElement?.closest('details');if(parent)__studio33.u17Reveal(parent)}},"e=>{if(e.target.tagName==='DETAILS'&&e.target.open&&e.target.closest('.u17-advanced')){const parent=e.target.parentElement?.closest('details');if(parent)u17Reveal(parent)}}",""),true);
}],
[2247,function initialize_2247(__studio33){
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelectorAll('.u17-editor-menu[open],.u17-view-menu[open]').forEach(d=>d.open=false)});
}],
[2248,function initialize_2248(__studio33){
document.addEventListener('pointerdown',e=>document.querySelectorAll('.u17-editor-menu[open],.u17-view-menu[open]').forEach(d=>{if(!d.contains(e.target))d.open=false}));
}],
[2250,function initialize_2250(__studio33){
__studio33.u17Mobile.setAttribute('aria-label','Current tool shortcuts');
}],
[2251,function initialize_2251(__studio33){
__studio33.u17Mobile.hidden=true;
}],
[2252,function initialize_2252(__studio33){
document.body.append(__studio33.u17Mobile);
}],
[2256,function initialize_2256(__studio33){
__studio33.u17Observer.observe(__studio33.$('workspace'),{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['disabled','hidden']});
}],
[2257,function initialize_2257(__studio33){
__studio33.u17MobileSync();
}],
[2259,function initialize_2259(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 17';
}],
[2260,function initialize_2260(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Edition 17: compact, consistent controls'),__studio33.csText('p','Filled buttons run the main action. Outlined result buttons copy, download or reuse output. Text controls manage editors. Clear/delete actions use a distinct danger style. Inputs and outputs are visible together on desktop and stacked on mobile; editor tools and advanced features remain available through More and Advanced & help. Mobile shortcuts provide the main action, Results and Advanced.'));
}],
[2290,function initialize_2290(__studio33){
try{__studio33.u18State=__studio33.u18StateCheck(__studio33.storage.get(__studio33.u18StateKey,{version:1,recipes:[],programs:[]}))}catch{__studio33.u18State={version:1,recipes:[],programs:[]}}
}],
[2310,function initialize_2310(__studio33){
__studio33.rdNormalize=__studio33.$fn(function(x){const r=__studio33.u18PreviousRDNormalize(x);if(r.sections!==undefined){if(!r.sections||typeof r.sections!=='object'||Array.isArray(r.sections)||!Array.isArray(r.repeatingDefinitions))throw Error('Invalid repeating response sections');const layout=__studio33.u18FormLayoutCheck({repeating:r.repeatingDefinitions,steps:[],computed:[]},r.fields,false);for(const [id,entries]of Object.entries(r.sections)){const s=layout.repeating.find(s=>s.id===id);if(!s||!Array.isArray(entries)||entries.length<s.minRows||entries.length>s.maxRows)throw Error('Repeating response rows are outside the declared bounds');for(const row of entries){if(!row||typeof row!=='object'||Array.isArray(row)||Object.keys(row).some(k=>!s.fields.some(f=>f.id===k)))throw Error('Unknown repeating response field');for(const f of s.fields){const v=row[f.id];if(v!==undefined&&!['string','number','boolean'].includes(typeof v)||typeof v==='number'&&!Number.isFinite(v))throw Error('Unsupported repeating answer value')}}}for(const s of layout.repeating)if(!Object.hasOwn(r.sections,s.id))throw Error('Missing repeating response section '+s.id)}return r},"function(x){const r=u18PreviousRDNormalize(x);if(r.sections!==undefined){if(!r.sections||typeof r.sections!=='object'||Array.isArray(r.sections)||!Array.isArray(r.repeatingDefinitions))throw Error('Invalid repeating response sections');const layout=u18FormLayoutCheck({repeating:r.repeatingDefinitions,steps:[],computed:[]},r.fields,false);for(const [id,entries]of Object.entries(r.sections)){const s=layout.repeating.find(s=>s.id===id);if(!s||!Array.isArray(entries)||entries.length<s.minRows||entries.length>s.maxRows)throw Error('Repeating response rows are outside the declared bounds');for(const row of entries){if(!row||typeof row!=='object'||Array.isArray(row)||Object.keys(row).some(k=>!s.fields.some(f=>f.id===k)))throw Error('Unknown repeating response field');for(const f of s.fields){const v=row[f.id];if(v!==undefined&&!['string','number','boolean'].includes(typeof v)||typeof v==='number'&&!Number.isFinite(v))throw Error('Unsupported repeating answer value')}}}for(const s of layout.repeating)if(!Object.hasOwn(r.sections,s.id))throw Error('Missing repeating response section '+s.id)}return r}","");
}],
[2312,function initialize_2312(__studio33){
__studio33.u18Style.textContent=`.u18-feature{overflow-wrap:anywhere}.u18-feature>.field{margin:12px 0}.u18-feature textarea{min-height:130px!important;font:12px/1.6 ui-monospace,Consolas,monospace;resize:vertical;white-space:pre}.u18-feature>button{margin:5px 6px 5px 0}.u18-feature pre{white-space:pre-wrap;max-height:360px;overflow:auto;font:12px/1.6 ui-monospace,monospace}.u18-feature .u18-report{margin:12px 0;max-height:500px;overflow:auto}.u18-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:8px 0;border-bottom:1px solid var(--line)}.u18-row>strong{flex:1;min-width:160px}.u18-row input,.u18-row select{max-width:100%;min-width:0}.u18-guide{width:min(860px,calc(100% - 24px));max-height:90vh;overflow:auto;border:1px solid var(--line);background:var(--panel);color:var(--text);border-radius:14px;padding:22px}.u18-guide::backdrop{background:#12221c88}.u18-guide header{display:flex;gap:12px;justify-content:space-between;align-items:center}.u18-guide h2{font-size:20px;margin:0}.u18-guide input{width:100%;padding:10px;margin:12px 0;border:1px solid var(--line);border-radius:6px;background:var(--surface);color:var(--text)}.u18-guide td{overflow-wrap:anywhere}.u18-program-svg{display:block;max-width:100%;height:auto}.u18-form-frame{width:100%;height:600px;border:1px solid var(--line);border-radius:8px}@media(max-width:750px){.u18-feature>button{min-height:44px}.u18-feature .u15-table{min-width:560px}.u18-feature .table-scroll{overflow:auto;max-width:100%}.u18-guide{padding:14px}.u18-guide .table-scroll{overflow:auto}.u18-guide table{min-width:560px}}`;
}],
[2313,function initialize_2313(__studio33){
document.head.append(__studio33.u18Style);
}],
[2322,function initialize_2322(__studio33){
__studio33.u18Field(__studio33.u18API,'u18Spec','OpenAPI 3.0 JSON','{}');
}],
[2323,function initialize_2323(__studio33){
__studio33.u18Field(__studio33.u18API,'u18Operation','Operation','','text',[['','Import a specification first']]);
}],
[2326,function initialize_2326(__studio33){
__studio33.u18File(__studio33.u18API,'u18SpecFile','Import specification JSON','.json,application/json',__studio33.$fn(async f=>{const source=await f[0].text();__studio33.u15Change(__studio33.$('u18Spec'),source);__studio33.u18LoadSpec(__studio33.u18Read(source))},"async f=>{const source=await f[0].text();u15Change($('u18Spec'),source);u18LoadSpec(u18Read(source))}",""));
}],
[2327,function initialize_2327(__studio33){
__studio33.u18Button(__studio33.u18API,'u18SpecImport','Import specification',__studio33.$fn(()=>__studio33.u18LoadSpec(__studio33.u18Read(__studio33.$('u18Spec').value)),"()=>u18LoadSpec(u18Read($('u18Spec').value))",""),true);
}],
[2334,function initialize_2334(__studio33){
__studio33.$('u18Spec').addEventListener('input',__studio33.$fn(()=>{__studio33.u18Operations=[];__studio33.u18APIBinding=null;__studio33.u18SentBinding=null},"()=>{u18Operations=[];u18APIBinding=null;u18SentBinding=null}",""));
}],
[2335,function initialize_2335(__studio33){
__studio33.$('u18Operation').addEventListener('change',__studio33.$fn(()=>{__studio33.u18APIBinding=null;__studio33.u18SentBinding=null},"()=>{u18APIBinding=null;u18SentBinding=null}",""));
}],
[2337,function initialize_2337(__studio33){
__studio33.u18Field(__studio33.u18Meta,'u18Describe','Describe JSON: object, array, or object-name map','[]');
}],
[2345,function initialize_2345(__studio33){
__studio33.u18Field(__studio33.u18Logs,'u18Apex','Or paste one Apex class','');
}],
[2349,function initialize_2349(__studio33){
__studio33.u18Field(__studio33.u18Map,'u18MapRules','Advanced mapping rules','[{"to":"/recordId","value":{"path":"/id"}}]');
}],
[2355,function initialize_2355(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18RecipeName','Recipe name','Clean records','text');
}],
[2356,function initialize_2356(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18RecipeSaved','Saved recipe','','text',[['','Choose a recipe']]);
}],
[2357,function initialize_2357(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18RecipeSteps','Recipe steps','[]');
}],
[2358,function initialize_2358(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18LineRow','Output row (1-based)','1','number');
}],
[2359,function initialize_2359(__studio33){
__studio33.u18Field(__studio33.u18Data,'u18LineColumn','Output column name','','text');
}],
[2362,function initialize_2362(__studio33){
__studio33.u18RecipeChoices();
}],
[2368,function initialize_2368(__studio33){
__studio33.u18Button(__studio33.u18Data,'u18RecipeLoad','Load selected recipe',__studio33.$fn(()=>{const r=__studio33.u18State.recipes.find(__studio33.$fn(r=>r.name===__studio33.$('u18RecipeSaved').value,"r=>r.name===$('u18RecipeSaved').value",""));if(!r)throw Error('Choose a recipe');__studio33.u15Change(__studio33.$('u18RecipeSteps'),JSON.stringify(r.steps,null,2));__studio33.$('u18RecipeName').value=r.name;__studio33.u18RecipePreview=null},"()=>{const r=u18State.recipes.find(r=>r.name===$('u18RecipeSaved').value);if(!r)throw Error('Choose a recipe');u15Change($('u18RecipeSteps'),JSON.stringify(r.steps,null,2));$('u18RecipeName').value=r.name;u18RecipePreview=null}",""));
}],
[2369,function initialize_2369(__studio33){
__studio33.u18Button(__studio33.u18Data,'u18RecipeExport','Export recipe & lineage',__studio33.$fn(()=>{__studio33.u18Fresh(__studio33.u18RecipePreview,__studio33.u18RecipeSig());const r=__studio33.u18RecipePreview.report;__studio33.u18Export('transformation-recipe-lineage.json',{name:__studio33.$('u18RecipeName').value,steps:r.steps,rowRefs:r.rowRefs.map(i=>i+1),columns:r.columns})},"()=>{u18Fresh(u18RecipePreview,u18RecipeSig());const r=u18RecipePreview.report;u18Export('transformation-recipe-lineage.json',{name:$('u18RecipeName').value,steps:r.steps,rowRefs:r.rowRefs.map(i=>i+1),columns:r.columns})}",""));
}],
[2372,function initialize_2372(__studio33){
__studio33.u18Field(__studio33.u18Recon,'u18MatchRules','Weighted matching rules','[{"left":"name","right":"name","mode":"text","weight":1,"tolerance":0}]');
}],
[2373,function initialize_2373(__studio33){
__studio33.u18Field(__studio33.u18Recon,'u18MatchThreshold','Minimum similarity (%)','70','number');
}],
[2378,function initialize_2378(__studio33){
__studio33.u18Button(__studio33.u18Recon,'u18MatchExport','Export reviewed pair audit',__studio33.$fn(()=>__studio33.u18Export('reviewed-record-matches.json',{pairs:__studio33.u18ReviewedPairs().map(m=>({...m,left:m.left+1,right:m.right+1})),notice:'Indices are 1-based source rows. Similarity scores are not probabilities.'}),"()=>u18Export('reviewed-record-matches.json',{pairs:u18ReviewedPairs().map(m=>({...m,left:m.left+1,right:m.right+1})),notice:'Indices are 1-based source rows. Similarity scores are not probabilities.'})",""));
}],
[2382,function initialize_2382(__studio33){
__studio33.u18Field(__studio33.u18Flow,'u18ProgramName','Program name','Branching transformation','text');
}],
[2383,function initialize_2383(__studio33){
__studio33.u18Field(__studio33.u18Flow,'u18ProgramSaved','Saved program','','text',[['','Choose a program']]);
}],
[2384,function initialize_2384(__studio33){
__studio33.u18Field(__studio33.u18Flow,'u18Program','Program graph JSON',JSON.stringify({entry:'format',nodes:[{id:'format',kind:'action',action:'pretty',options:{},next:'end'},{id:'end',kind:'end'}]},null,2));
}],
[2385,function initialize_2385(__studio33){
__studio33.u18Field(__studio33.u18Flow,'u18ProgramTests','Test fixtures (text inputs and expected outputs)','[]');
}],
[2388,function initialize_2388(__studio33){
__studio33.u18ProgramChoices();
}],
[2394,function initialize_2394(__studio33){
__studio33.u18Button(__studio33.u18Flow,'u18ProgramLoad','Load selected program',__studio33.$fn(()=>{const p=__studio33.u18State.programs.find(__studio33.$fn(p=>p.name===__studio33.$('u18ProgramSaved').value,"p=>p.name===$('u18ProgramSaved').value",""));if(!p)throw Error('Choose a saved program');__studio33.$('u18ProgramName').value=p.name;__studio33.u15Change(__studio33.$('u18Program'),JSON.stringify(p.program,null,2));__studio33.u18ProgramDraw(p.program)},"()=>{const p=u18State.programs.find(p=>p.name===$('u18ProgramSaved').value);if(!p)throw Error('Choose a saved program');$('u18ProgramName').value=p.name;u15Change($('u18Program'),JSON.stringify(p.program,null,2));u18ProgramDraw(p.program)}",""));
}],
[2396,function initialize_2396(__studio33){
__studio33.u18Button(__studio33.u18Flow,'u18ProgramExport','Export program, fixtures & test report',__studio33.$fn(()=>{const program=__studio33.u18ProgramCheck(__studio33.u18Read(__studio33.$('u18Program').value)),tests=__studio33.u18Read(__studio33.$('u18ProgramTests').value);if(__studio33.u18ProgramTestReport)__studio33.u18Fresh(__studio33.u18ProgramTestReport,__studio33.u18Signature(['u18Program','u18ProgramTests'],__studio33.u18State.programs));__studio33.u18Export('workflow-program-tests.json',{name:__studio33.$('u18ProgramName').value,program,tests,report:__studio33.u18ProgramTestReport?.rows||[]})},"()=>{const program=u18ProgramCheck(u18Read($('u18Program').value)),tests=u18Read($('u18ProgramTests').value);if(u18ProgramTestReport)u18Fresh(u18ProgramTestReport,u18Signature(['u18Program','u18ProgramTests'],u18State.programs));u18Export('workflow-program-tests.json',{name:$('u18ProgramName').value,program,tests,report:u18ProgramTestReport?.rows||[]})}",""));
}],
[2397,function initialize_2397(__studio33){
__studio33.u18File(__studio33.u18Flow,'u18ProgramFile','Import program and fixtures','.json,application/json',__studio33.$fn(async files=>{const p=__studio33.u18Read(await files[0].text());__studio33.u18ProgramCheck(p.program);__studio33.u18Array(p.tests||[],30,'tests');__studio33.$('u18ProgramName').value=String(p.name||'Imported program').slice(0,100);__studio33.u15Change(__studio33.$('u18Program'),JSON.stringify(p.program,null,2));__studio33.u15Change(__studio33.$('u18ProgramTests'),JSON.stringify(p.tests||[],null,2));__studio33.u18ProgramTestReport=null;__studio33.u18ProgramDraw(p.program)},"async files=>{const p=u18Read(await files[0].text());u18ProgramCheck(p.program);u18Array(p.tests||[],30,'tests');$('u18ProgramName').value=String(p.name||'Imported program').slice(0,100);u15Change($('u18Program'),JSON.stringify(p.program,null,2));u15Change($('u18ProgramTests'),JSON.stringify(p.tests||[],null,2));u18ProgramTestReport=null;u18ProgramDraw(p.program)}",""));
}],
[2399,function initialize_2399(__studio33){
__studio33.u18Field(__studio33.u18Board,'u18AvailabilityJSON','Availability by exact assignee name','{"Unassigned":{"dailyHours":8,"weekends":[0,6],"leave":[],"overrides":{}}}');
}],
[2400,function initialize_2400(__studio33){
__studio33.u18Field(__studio33.u18Board,'u18LevelStart','Earliest start date',__studio33.csDate(),'date');
}],
[2405,function initialize_2405(__studio33){
__studio33.u18Button(__studio33.u18Board,'u18LevelExport','Export reviewed allocations',__studio33.$fn(()=>{__studio33.u18Fresh(__studio33.u18LevelPreview,__studio33.u18LevelSig());__studio33.u18Export('availability-schedule.json',__studio33.u18LevelPreview.report)},"()=>{u18Fresh(u18LevelPreview,u18LevelSig());u18Export('availability-schedule.json',u18LevelPreview.report)}",""));
}],
[2407,function initialize_2407(__studio33){
__studio33.u18Field(__studio33.u18Form,'u18Layout','Layout JSON','{"steps":[],"computed":[],"repeating":[]}');
}],
[2415,function initialize_2415(__studio33){
__studio33.u18Field(__studio33.u18Finance,'u18ActualPayments','Actual payments JSON','[]');
}],
[2416,function initialize_2416(__studio33){
__studio33.u18Field(__studio33.u18Finance,'u18ActualDate','As-of date',__studio33.csDate(),'date');
}],
[2417,function initialize_2417(__studio33){
__studio33.u18Field(__studio33.u18Finance,'u18Rounding','Actual interest rounding','payment','text',[['payment','At each payment'],['daily','Each day']]);
}],
[2421,function initialize_2421(__studio33){
__studio33.u18Button(__studio33.u18Finance,'u18ActualExport','Export payment comparison',__studio33.$fn(()=>{__studio33.u18Fresh(__studio33.u18ActualPreview,__studio33.u18ActualSig());__studio33.u18Export('planned-actual-payments.json',__studio33.u18ActualPreview.report)},"()=>{u18Fresh(u18ActualPreview,u18ActualSig());u18Export('planned-actual-payments.json',u18ActualPreview.report)}",""));
}],
[2423,function initialize_2423(__studio33){
__studio33.u18Guide.id='u18Guide';
}],
[2424,function initialize_2424(__studio33){
__studio33.u18Guide.className='u18-guide';
}],
[2425,function initialize_2425(__studio33){
__studio33.u18Guide.setAttribute('aria-label','Current tool guide');
}],
[2427,function initialize_2427(__studio33){
__studio33.u18GuideSearch.placeholder='Find a button or dropdown';
}],
[2428,function initialize_2428(__studio33){
__studio33.u18GuideSearch.setAttribute('aria-label','Find a control in this guide');
}],
[2429,function initialize_2429(__studio33){
__studio33.u18GuideHeader.append(__studio33.u18GuideTitle,__studio33.csButton('Close Guide',__studio33.$fn(()=>__studio33.u18Guide.close(),"()=>u18Guide.close()","")));
}],
[2430,function initialize_2430(__studio33){
__studio33.u18Guide.append(__studio33.u18GuideHeader,__studio33.csText('p','Control meanings, locations and dropdown choices for the current tool. Advanced controls stay in their named feature panel.','hint'),__studio33.u18GuideSearch,__studio33.u18GuideBody);
}],
[2431,function initialize_2431(__studio33){
document.body.append(__studio33.u18Guide);
}],
[2433,function initialize_2433(__studio33){
Object.assign(__studio33.u18GuideDescriptions,{
 u18SpecImport:'Parses OpenAPI 3.0 JSON and lists supported operations. No request is sent.',u18Operation:'Chooses the imported method/path to load. Changing it clears the prior response contract binding.',u18SpecLoad:'Replaces the client editor with an operation template. Review variables and authentication before Send.',u18ContractCheck:'Checks the latest complete response from the loaded operation against its declared status and JSON contract.',
 u18MetaCheck:'Checks current Composite writes against the imported Describe metadata; no org request is made.',u18MetaExport:'Downloads the findings only while the payload and metadata still match the checked inputs.',u18SourceAnalyze:'Links query/DML log events to uploaded classes and source lines, with evidence and loop candidates.',u18SourceExport:'Downloads source-link findings, without copying the uploaded class bodies into the report.',
 u18MapPreview:'Builds a local result using nested declarative mapping expressions. The source is unchanged.',u18MapUse:'Places the reviewed mapping in the output editor only while its inputs are unchanged.',u18MapExport:'Downloads the fresh mapped JSON result with exact numeric tokens.',
 u18RecipePreview:'Runs recipe steps on a copy of the loaded table for review.',u18RecipeApply:'Commits the reviewed table as one change. Table Undo restores the source.',u18RecipeSaved:'Chooses a saved recipe configuration; use Load selected recipe to put it in the editor.',u18RecipeLoad:'Loads the chosen configuration; it does not transform the table until preview and apply.',u18RecipeSave:'Saves recipe steps under the entered name, replacing a recipe with that name. Source data is excluded.',u18Lineage:'Shows the source row, source columns and transformation steps for the selected output cell.',u18RecipeExport:'Downloads recipe steps and lineage references before Apply. Source cell values are excluded.',
 u18MatchPreview:'Computes up to three rule-based similarity candidates per reference row in a bounded worker.',u18MatchExport:'Downloads the pair audit after every row is reviewed and duplicate assignments are resolved.',u18MatchUse:'Adds approved synthetic match keys to working copies. Review mappings and choose Reconcile afterward.',
 u18ProgramReview:'Validates graph nodes and displays branch connections without running transformations.',u18ProgramRun:'Runs local action/condition/call nodes on workflow input and places the result in workflow output.',u18ProgramSaved:'Chooses a reusable saved program. Use Load selected program to edit it.',u18ProgramCancel:'Requests cancellation of the graph or fixtures at the next local processing checkpoint.',u18ProgramSave:'Saves the graph under its name for Call nodes; fixture data is excluded.',u18ProgramLoad:'Replaces draft graph JSON with the selected saved program.',u18ProgramTest:'Runs editor fixtures and compares actual output with expected text or JSON.',u18ProgramExport:'Downloads the graph, fixtures and current test report; changed inputs require rerunning the tests.',
 u18LevelPreview:'Allocates estimated task hours using dependencies, assignee calendars and daily capacities without changing dates.',u18LevelApply:'Applies reviewed task dates as one board change. Board Undo restores the previous dates.',u18LevelExport:'Downloads the reviewed task dates and per-day allocations before Apply.',
 u18LayoutFields:'Shows stable ordinary field IDs and fills the layout editor with its saved configuration.',u18LayoutSave:'Validates and saves the layout; actual changes increment the form version.',u18LayoutPreview:'Opens the saved standalone wizard in a local preview frame.',u18LayoutExport:'Downloads a self-contained form with the saved steps, calculations, repeats and response contract.',u18RepeatInspect:'Checks imported repeating entries for required values, types and allowed choices.',
 u18ActualCompare:'Computes actual/365 principal and interest from receipts and compares with the existing dated loan plan.',u18ActualExport:'Downloads the fresh principal/interest/receipt comparison.',u18Rounding:'At each payment rounds accrued interest when a normal receipt arrives; Each day rounds each daily accrual to cents.'
});
}],
[2437,function initialize_2437(__studio33){
__studio33.u18GuideButton.id='u18GuideOpen';
}],
[2438,function initialize_2438(__studio33){
__studio33.u18GuideButton.setAttribute('aria-label','Guide to the current tool');
}],
[2439,function initialize_2439(__studio33){
document.querySelector('.top-actions')?.append(__studio33.u18GuideButton);
}],
[2440,function initialize_2440(__studio33){
__studio33.u18GuideSearch.oninput=__studio33.u18GuideDraw;
}],
[2441,function initialize_2441(__studio33){
__studio33.backupKeys.push(__studio33.u18StateKey);
}],
[2443,function initialize_2443(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const x=__studio33.u18OldBackup();x.state[__studio33.u18StateKey]=__studio33.csClone(__studio33.u18State);return x},"function(){const x=u18OldBackup();x.state[u18StateKey]=csClone(u18State);return x}","");
}],
[2445,function initialize_2445(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,__studio33.u18StateKey))raw.state[__studio33.u18StateKey]=null;const x=__studio33.u18OldValidateBackup(raw);if(x.state[__studio33.u18StateKey])__studio33.u18StateCheck(x.state[__studio33.u18StateKey]);return x},"function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,u18StateKey))raw.state[u18StateKey]=null;const x=u18OldValidateBackup(raw);if(x.state[u18StateKey])u18StateCheck(x.state[u18StateKey]);return x}","");
}],
[2447,function initialize_2447(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(s){__studio33.u18OldRestore(s);__studio33.u18State=s[__studio33.u18StateKey]?__studio33.u18StateCheck(s[__studio33.u18StateKey]):{version:1,recipes:[],programs:[]};__studio33.u18RecipeChoices();__studio33.u18ProgramChoices()},"function(s){u18OldRestore(s);u18State=s[u18StateKey]?u18StateCheck(s[u18StateKey]):{version:1,recipes:[],programs:[]};u18RecipeChoices();u18ProgramChoices()}","");
}],
[2449,function initialize_2449(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 18';
}],
[2450,function initialize_2450(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Edition 18: deeper existing tools'),__studio33.csText('p','OpenAPI 3.0 request templates and JSON response contracts, imported Salesforce Describe validation, source-linked Apex evidence, reviewed similarity matches, transformation recipes and cell lineage, nested mappings, three-way JSON/text merges, branching sub-workflows with fixtures, availability scheduling, repeating/calculated multi-step forms, and planned/actual payment reconciliation. Use Guide in the header for control locations and dropdown choices.'));
}],
[2455,function initialize_2455(__studio33){
try{__studio33.u19State=__studio33.u19Check(__studio33.storage.get(__studio33.u19Key,__studio33.u19Defaults))}catch{__studio33.u19State=__studio33.csClone(__studio33.u19Defaults)}
}],
[2466,function initialize_2466(__studio33){
__studio33.u19Settings.append(__studio33.csText('p','Choose a layout and reading style. These settings apply to every tool; themes remain independent.','u19-settings-note'));
}],
[2473,function initialize_2473(__studio33){
__studio33.u19Settings.append(__studio33.u19DeviceStatus);
}],
[2475,function initialize_2475(__studio33){
__studio33.u19RemoteBox.append(__studio33.csText('summary','Remote setup & received keys'),__studio33.csText('p','Arrows move focus. OK / Enter activates a control. Press OK on a field to edit; press Back to leave field editing. Learn only keys that this browser delivers. Browser-reserved keys cannot be remapped.','u19-settings-note'));
}],
[2477,function initialize_2477(__studio33){
__studio33.u19KeyStatus.id='u19KeyStatus';
}],
[2479,function initialize_2479(__studio33){
__studio33.u19RemoteBox.append(__studio33.u19KeyStatus);
}],
[2482,function initialize_2482(__studio33){
for(const [action,label]of Object.entries(__studio33.u19RemoteLabels)){const row=__studio33.csText('div','','u19-mapping'),text=__studio33.csText('div','');text.append(__studio33.csText('strong',label),document.createElement('br'));const detail=__studio33.csText('small','Default');__studio33.u19RemoteText[action]=detail;text.append(detail);row.append(text,__studio33.u19Button('Learn key',__studio33.$fn(()=>{__studio33.u19Learn=action;__studio33.u19KeyStatus.textContent='Press the key for '+label+'. Escape cancels learning.'},"()=>{u19Learn=action;u19KeyStatus.textContent='Press the key for '+label+'. Escape cancels learning.'}",""),'u19Learn-'+action));__studio33.u19RemoteBox.append(row)}
}],
[2483,function initialize_2483(__studio33){
__studio33.u19RemoteBox.append(__studio33.u19Button('Reset remote mappings',__studio33.$fn(()=>{__studio33.u19Learn='';__studio33.u19State.remote={};__studio33.u19Save();__studio33.u19MappingLabels();__studio33.u19KeyStatus.textContent='Default remote mappings restored.'},"()=>{u19Learn='';u19State.remote={};u19Save();u19MappingLabels();u19KeyStatus.textContent='Default remote mappings restored.'}",""),'u19RemoteReset'));
}],
[2484,function initialize_2484(__studio33){
__studio33.u19Settings.append(__studio33.u19RemoteBox);
}],
[2485,function initialize_2485(__studio33){
__studio33.u19Settings.append(__studio33.csText('p','Normal view always has a visible button in an expanded workspace, editor or presentation. Back closes the current menu/dialog first. TV field editing uses a dashed focus outline.','u19-settings-note'));
}],
[2487,function initialize_2487(__studio33){
__studio33.u19DeviceButton.classList.add('u19-device-button');
}],
[2488,function initialize_2488(__studio33){
document.querySelector('.studio-header').append(__studio33.u19DeviceButton);
}],
[2494,function initialize_2494(__studio33){
for(const [picker,key]of [[__studio33.u19LayoutPicker,'layout'],[__studio33.u19MotionPicker,'motion'],[__studio33.u19TextPicker,'editorSize']])picker.onchange=__studio33.$fn(()=>{__studio33.u19State[key]=picker.value;__studio33.u19Save();__studio33.u19Apply()},"()=>{u19State[key]=picker.value;u19Save();u19Apply()}","");
}],
[2495,function initialize_2495(__studio33){
__studio33.u19WrapPicker.onchange=__studio33.$fn(()=>{__studio33.u19State.wrap=__studio33.u19WrapPicker.value==='on';__studio33.u19Save();__studio33.u19Apply()},"()=>{u19State.wrap=u19WrapPicker.value==='on';u19Save();u19Apply()}","");
}],
[2496,function initialize_2496(__studio33){
__studio33.u19Settings.addEventListener('close',__studio33.$fn(()=>{__studio33.u19Learn='';__studio33.u19StopEditing();const current=document.activeElement;if(current===document.body||current===__studio33.u19Settings||__studio33.u19Settings.contains(current)){const previous=__studio33.u19DialogFocus.get(__studio33.u19Settings);(previous?.getClientRects().length?previous:__studio33.u19DeviceButton)?.focus({preventScroll:true})}__studio33.u19SyncExit()},"()=>{u19Learn='';u19StopEditing();const current=document.activeElement;if(current===document.body||current===u19Settings||u19Settings.contains(current)){const previous=u19DialogFocus.get(u19Settings);(previous?.getClientRects().length?previous:u19DeviceButton)?.focus({preventScroll:true})}u19SyncExit()}",""));
}],
[2501,function initialize_2501(__studio33){
window.addEventListener('resize',__studio33.u19Resize);
}],
[2502,function initialize_2502(__studio33){
window.addEventListener('orientationchange',__studio33.u19Resize);
}],
[2503,function initialize_2503(__studio33){
window.visualViewport?.addEventListener('resize',__studio33.u19Resize);
}],
[2504,function initialize_2504(__studio33){
for(const query of ['(pointer:coarse)','(prefers-reduced-motion:reduce)']){const media=matchMedia(query);if(media.addEventListener)media.addEventListener('change',__studio33.$fn(()=>__studio33.u19Apply(),"()=>u19Apply()",""))}
}],
[2505,function initialize_2505(__studio33){
document.addEventListener('focusin',__studio33.u19Viewport);
}],
[2506,function initialize_2506(__studio33){
document.addEventListener('focusout',__studio33.$fn(()=>requestAnimationFrame(__studio33.u19Viewport),"()=>requestAnimationFrame(u19Viewport)",""));
}],
[2510,function initialize_2510(__studio33){
__studio33.u19Exit.className='u19-exit';
}],
[2511,function initialize_2511(__studio33){
__studio33.u19Exit.hidden=true;
}],
[2512,function initialize_2512(__studio33){
__studio33.u19Exit.setAttribute('aria-label','Exit full screen and return to normal view');
}],
[2513,function initialize_2513(__studio33){
__studio33.u19Card.append(__studio33.u19Exit);
}],
[2518,function initialize_2518(__studio33){
__studio33.setEditorFullScreen=__studio33.$fn(function(value){if(value&&!__studio33.editorFullScreen)__studio33.u19AppSnapshot=__studio33.u19Snapshot();__studio33.u19OldAppFullscreen(value);if(!value){__studio33.u19Restore(__studio33.u19AppSnapshot);__studio33.u19AppSnapshot=null}__studio33.u19SyncExit()},"function(value){if(value&&!editorFullScreen)u19AppSnapshot=u19Snapshot();u19OldAppFullscreen(value);if(!value){u19Restore(u19AppSnapshot);u19AppSnapshot=null}u19SyncExit()}","");
}],
[2520,function initialize_2520(__studio33){
__studio33.v13CloseEditor=__studio33.$fn(function(){const was=!!__studio33.v13Focused;__studio33.u19OldCloseEditor();if(was){__studio33.u19Restore(__studio33.u19EditorSnapshot);__studio33.u19EditorSnapshot=null}__studio33.u19SyncExit()},"function(){const was=!!v13Focused;u19OldCloseEditor();if(was){u19Restore(u19EditorSnapshot);u19EditorSnapshot=null}u19SyncExit()}","");
}],
[2521,function initialize_2521(__studio33){
for(const [id,entry]of __studio33.v13Editors){const old=entry.expand;entry.expand=__studio33.$fn(function(){if(!__studio33.v13Focused)__studio33.u19EditorSnapshot=__studio33.u19Snapshot();old();__studio33.u19SyncExit()},"function(){if(!v13Focused)u19EditorSnapshot=u19Snapshot();old();u19SyncExit()}","");const button=entry.tools.querySelector('[data-expand]');if(button)button.onclick=entry.expand}
}],
[2522,function initialize_2522(__studio33){
document.addEventListener('click',__studio33.$fn(e=>{if(e.target.closest('[data-expand]')&&!__studio33.v13Focused)__studio33.u19EditorSnapshot=__studio33.u19Snapshot();if(e.target.closest('[data-expand],#ptFull,#fullScreenToggle'))requestAnimationFrame(__studio33.u19SyncExit)},"e=>{if(e.target.closest('[data-expand]')&&!v13Focused)u19EditorSnapshot=u19Snapshot();if(e.target.closest('[data-expand],#ptFull,#fullScreenToggle'))requestAnimationFrame(u19SyncExit)}",""),true);
}],
[2523,function initialize_2523(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if(e.altKey&&e.key==='Enter'&&e.target.tagName==='TEXTAREA'&&!__studio33.v13Focused){__studio33.u19EditorSnapshot=__studio33.u19Snapshot();requestAnimationFrame(__studio33.u19SyncExit)}},"e=>{if(e.altKey&&e.key==='Enter'&&e.target.tagName==='TEXTAREA'&&!v13Focused){u19EditorSnapshot=u19Snapshot();requestAnimationFrame(u19SyncExit)}}",""),true);
}],
[2525,function initialize_2525(__studio33){
if(__studio33.u19OldEditorHeaderButton)__studio33.u19OldEditorHeaderButton.textContent='Close editor';
}],
[2531,function initialize_2531(__studio33){
document.addEventListener('fullscreenchange',__studio33.$fn(()=>{if(!document.fullscreenElement&&__studio33.u19StageSnapshot)__studio33.u19StageExit();__studio33.u19SyncExit()},"()=>{if(!document.fullscreenElement&&u19StageSnapshot)u19StageExit();u19SyncExit()}",""));
}],
[2532,function initialize_2532(__studio33){
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('close',__studio33.$fn(()=>requestAnimationFrame(__studio33.u19SyncExit),"()=>requestAnimationFrame(u19SyncExit)",""));
}],
[2546,function initialize_2546(__studio33){
document.addEventListener('focusout',__studio33.$fn(e=>{if(e.target===__studio33.u19Editing)__studio33.u19StopEditing()},"e=>{if(e.target===u19Editing)u19StopEditing()}",""));
}],
[2547,function initialize_2547(__studio33){
document.addEventListener('pointerdown',__studio33.$fn(()=>__studio33.u19StopEditing(),"()=>u19StopEditing()",""));
}],
[2549,function initialize_2549(__studio33){
__studio33.showCommands=__studio33.$fn(function(){__studio33.u19OldCommands();if(__studio33.u19Layout==='tv'){const first=__studio33.$('commandResults').querySelector('button');(first||__studio33.$('commandClose')).focus()}__studio33.u19SyncExit()},"function(){u19OldCommands();if(u19Layout==='tv'){const first=$('commandResults').querySelector('button');(first||$('commandClose')).focus()}u19SyncExit()}","");
}],
[2550,function initialize_2550(__studio33){
__studio33.$('commandToggle').onclick=__studio33.showCommands;
}],
[2552,function initialize_2552(__studio33){
__studio33.u19Reader.classList.add('u19-expanded');
}],
[2555,function initialize_2555(__studio33){
__studio33.u19ReaderText.id='u19ReaderContent';
}],
[2556,function initialize_2556(__studio33){
__studio33.u19Reader.append(__studio33.u19ReaderActions,__studio33.u19ReaderText);
}],
[2558,function initialize_2558(__studio33){
__studio33.u19ReaderActions.append(__studio33.u19ReaderCopy,__studio33.csText('span','Result snapshot · rerun the tool to refresh.','hint'));
}],
[2559,function initialize_2559(__studio33){
__studio33.u19Reader.addEventListener('close',__studio33.$fn(()=>{__studio33.u19Restore(__studio33.u19ReaderSnapshot);__studio33.u19ReaderSnapshot=null;__studio33.u19SyncExit()},"()=>{u19Restore(u19ReaderSnapshot);u19ReaderSnapshot=null;u19SyncExit()}",""));
}],
[2569,function initialize_2569(__studio33){
__studio33.u19RowFields.className='u19-row-detail';
}],
[2570,function initialize_2570(__studio33){
__studio33.u19RowDialog.append(__studio33.u19RowFields);
}],
[2575,function initialize_2575(__studio33){
__studio33.u19RowDialog.append(__studio33.u19RowTools,__studio33.csText('p','Read-only details. Use the original table cells to edit values. Copy includes each value and its stored type.','u19-settings-note'));
}],
[2579,function initialize_2579(__studio33){
__studio33.dwRender=__studio33.$fn(function(){__studio33.u19OldDWRender();__studio33.u19InstallRowButtons()},"function(){u19OldDWRender();u19InstallRowButtons()}","");
}],
[2580,function initialize_2580(__studio33){
__studio33.u19InstallRowButtons();
}],
[2581,function initialize_2581(__studio33){
__studio33.u19RowDialog.addEventListener('close',__studio33.$fn(()=>{__studio33.u19DialogFocus.get(__studio33.u19RowDialog)?.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{u19DialogFocus.get(u19RowDialog)?.focus({preventScroll:true});u19SyncExit()}",""));
}],
[2583,function initialize_2583(__studio33){
__studio33.backupKeys.push(__studio33.u19Key);
}],
[2585,function initialize_2585(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const result=__studio33.u19PreviousBackup();result.state[__studio33.u19Key]=__studio33.csClone(__studio33.u19State);return result},"function(){const result=u19PreviousBackup();result.state[u19Key]=csClone(u19State);return result}","");
}],
[2587,function initialize_2587(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,__studio33.u19Key))raw.state[__studio33.u19Key]=null;const result=__studio33.u19PreviousValidation(raw);if(result.state[__studio33.u19Key])result.state[__studio33.u19Key]=__studio33.u19Check(result.state[__studio33.u19Key]);return result},"function(data){const raw={...data,state:{...data?.state}};if(!Object.hasOwn(raw.state,u19Key))raw.state[u19Key]=null;const result=u19PreviousValidation(raw);if(result.state[u19Key])result.state[u19Key]=u19Check(result.state[u19Key]);return result}","");
}],
[2589,function initialize_2589(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u19PreviousRestore(state);__studio33.u19State=state[__studio33.u19Key]?__studio33.u19Check(state[__studio33.u19Key]):__studio33.csClone(__studio33.u19Defaults);__studio33.u19Apply()},"function(state){u19PreviousRestore(state);u19State=state[u19Key]?u19Check(state[u19Key]):csClone(u19Defaults);u19Apply()}","");
}],
[2591,function initialize_2591(__studio33){
__studio33.u19DialogWatch.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
}],
[2593,function initialize_2593(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 19';
}],
[2594,function initialize_2594(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Edition 19: mobile & TV'),__studio33.csText('p','Use Device & display for Auto/Desktop/Mobile/TV layouts, editor size, wrapping and motion. Pearl and Graphite add subtle animated surfaces. TV uses arrows/OK/Back with optional received-key mapping; OK begins field editing, Back ends it. Every expanded view has a visible Normal view button. Focus result shows a snapshot, image zoom changes preview only, and Data Workbench rows have read-only Details. Remote keys and native fullscreen depend on the browser; onscreen exit remains available.'));
}],
[2595,function initialize_2595(__studio33){
__studio33.u19Apply();
}],
[2597,function initialize_2597(__studio33){
__studio33.u20MotionStatus.id='u20MotionStatus';
}],
[2600,function initialize_2600(__studio33){
__studio33.u20MotionFooter.append(__studio33.u20MotionStatus,__studio33.u20MotionButton);
}],
[2601,function initialize_2601(__studio33){
__studio33.$('themeMenu').append(__studio33.u20MotionFooter);
}],
[2605,function initialize_2605(__studio33){
__studio33.u19Apply=__studio33.$fn(function(){__studio33.u20ApplyPrevious();__studio33.u20MotionLabel();if(!__studio33.u20Animated()){__studio33.u19Card.style.removeProperty('--u20-x');__studio33.u19Card.style.removeProperty('--u20-y');document.querySelectorAll('.u20-ripple').forEach(e=>e.remove())}},"function(){u20ApplyPrevious();u20MotionLabel();if(!u20Animated()){u19Card.style.removeProperty('--u20-x');u19Card.style.removeProperty('--u20-y');document.querySelectorAll('.u20-ripple').forEach(e=>e.remove())}}","");
}],
[2607,function initialize_2607(__studio33){
__studio33.setTheme=__studio33.$fn(function(name){__studio33.u20SetThemePrevious(name);__studio33.u20MotionLabel();__studio33.u19Card.classList.remove('u20-enter');if(__studio33.u20Animated()){requestAnimationFrame(__studio33.$fn(()=>{__studio33.u19Card.classList.add('u20-enter');setTimeout(__studio33.$fn(()=>__studio33.u19Card.classList.remove('u20-enter'),"()=>u19Card.classList.remove('u20-enter')",""),400)},"()=>{u19Card.classList.add('u20-enter');setTimeout(()=>u19Card.classList.remove('u20-enter'),400)}",""))}},"function(name){u20SetThemePrevious(name);u20MotionLabel();u19Card.classList.remove('u20-enter');if(u20Animated()){requestAnimationFrame(()=>{u19Card.classList.add('u20-enter');setTimeout(()=>u19Card.classList.remove('u20-enter'),400)})}}","");
}],
[2609,function initialize_2609(__studio33){
__studio33.u19Card.addEventListener('pointermove',__studio33.$fn(e=>{if(!__studio33.u20Animated()||e.pointerType==='touch'||__studio33.u19Layout==='tv'||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;__studio33.u20PointerPoint={x:e.clientX,y:e.clientY};if(__studio33.u20PointerFrame)return;__studio33.u20PointerFrame=requestAnimationFrame(__studio33.$fn(()=>{__studio33.u20PointerFrame=0;if(!__studio33.u20Animated()||!__studio33.u20PointerPoint)return;const box=__studio33.u19Card.getBoundingClientRect();__studio33.u19Card.style.setProperty('--u20-x',Math.max(0,Math.min(100,(__studio33.u20PointerPoint.x-box.left)/box.width*100))+'%');__studio33.u19Card.style.setProperty('--u20-y',Math.max(0,Math.min(100,(__studio33.u20PointerPoint.y-box.top)/box.height*100))+'%')},"()=>{u20PointerFrame=0;if(!u20Animated()||!u20PointerPoint)return;const box=u19Card.getBoundingClientRect();u19Card.style.setProperty('--u20-x',Math.max(0,Math.min(100,(u20PointerPoint.x-box.left)/box.width*100))+'%');u19Card.style.setProperty('--u20-y',Math.max(0,Math.min(100,(u20PointerPoint.y-box.top)/box.height*100))+'%')}",""))},"e=>{if(!u20Animated()||e.pointerType==='touch'||u19Layout==='tv'||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;u20PointerPoint={x:e.clientX,y:e.clientY};if(u20PointerFrame)return;u20PointerFrame=requestAnimationFrame(()=>{u20PointerFrame=0;if(!u20Animated()||!u20PointerPoint)return;const box=u19Card.getBoundingClientRect();u19Card.style.setProperty('--u20-x',Math.max(0,Math.min(100,(u20PointerPoint.x-box.left)/box.width*100))+'%');u19Card.style.setProperty('--u20-y',Math.max(0,Math.min(100,(u20PointerPoint.y-box.top)/box.height*100))+'%')})}",""));
}],
[2610,function initialize_2610(__studio33){
__studio33.u19Card.addEventListener('pointerleave',__studio33.$fn(()=>{__studio33.u20PointerPoint=null;__studio33.u19Card.style.removeProperty('--u20-x');__studio33.u19Card.style.removeProperty('--u20-y')},"()=>{u20PointerPoint=null;u19Card.style.removeProperty('--u20-x');u19Card.style.removeProperty('--u20-y')}",""));
}],
[2612,function initialize_2612(__studio33){
document.addEventListener('pointerdown',__studio33.$fn(e=>__studio33.u20Feedback(e.target.closest('button'),e),"e=>u20Feedback(e.target.closest('button'),e)",""),{passive:true});
}],
[2613,function initialize_2613(__studio33){
document.addEventListener('click',__studio33.$fn(e=>{if(e.detail===0)__studio33.u20Feedback(e.target.closest('button'))},"e=>{if(e.detail===0)u20Feedback(e.target.closest('button'))}",""),true);
}],
[2614,function initialize_2614(__studio33){
window.addEventListener('keydown',__studio33.$fn(e=>{if(['Enter',' ','Select','Accept'].includes(e.key))__studio33.u20Feedback(e.target.closest('button'));if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)&&__studio33.u19Layout==='tv'&&__studio33.u20Animated())requestAnimationFrame(()=>{const e=document.activeElement;if(e?.matches('button')){e.classList.add('u20-tap-glow');setTimeout(()=>e.classList.remove('u20-tap-glow'),250)}})},"e=>{if(['Enter',' ','Select','Accept'].includes(e.key))u20Feedback(e.target.closest('button'));if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)&&u19Layout==='tv'&&u20Animated())requestAnimationFrame(()=>{const e=document.activeElement;if(e?.matches('button')){e.classList.add('u20-tap-glow');setTimeout(()=>e.classList.remove('u20-tap-glow'),250)}})}",""),true);
}],
[2616,function initialize_2616(__studio33){
document.addEventListener('visibilitychange',__studio33.u20VisibilityChanged);
}],
[2617,function initialize_2617(__studio33){
__studio33.u20VisibilityChanged();
}],
[2618,function initialize_2618(__studio33){
__studio33.u20MotionLabel();
}],
[2620,function initialize_2620(__studio33){
for(const [id,title]of [['categoryPicker','Category'],['workspacePicker','Tool']]){const select=__studio33.$(id),label=__studio33.csText('label','','u21-picker');label.htmlFor=id;label.append(__studio33.csText('span',title));select.before(label);label.append(select)}
}],
[2621,function initialize_2621(__studio33){
__studio33.u21Actions.prepend(__studio33.$('commandToggle'));
}],
[2622,function initialize_2622(__studio33){
__studio33.u21Actions.append(__studio33.u21Options);
}],
[2623,function initialize_2623(__studio33){
document.body.append(__studio33.$('commandOverlay'));
}],
[2624,function initialize_2624(__studio33){
__studio33.$('commandClose').onclick=__studio33.$fn(()=>__studio33.closeCommands(),"()=>closeCommands()","");
}],
[2626,function initialize_2626(__studio33){
__studio33.u21Header.before(__studio33.u21HeaderHome);
}],
[2630,function initialize_2630(__studio33){
__studio33.u21Options.addEventListener('toggle',__studio33.u21Position);
}],
[2632,function initialize_2632(__studio33){
__studio33.themeOpen=__studio33.$fn(function(open){if(open)__studio33.u21Options.open=false;__studio33.u21ThemeOpen(open);__studio33.u21Position()},"function(open){if(open)u21Options.open=false;u21ThemeOpen(open);u21Position()}","");
}],
[2633,function initialize_2633(__studio33){
__studio33.u21Options.querySelector('summary').addEventListener('click',__studio33.$fn(()=>{__studio33.themeOpen(false);requestAnimationFrame(__studio33.u21Position)},"()=>{themeOpen(false);requestAnimationFrame(u21Position)}",""));
}],
[2634,function initialize_2634(__studio33){
for(const event of ['resize','scroll','orientationchange'])window.addEventListener(event,__studio33.u21Position,{passive:true});
}],
[2635,function initialize_2635(__studio33){
window.visualViewport?.addEventListener('resize',__studio33.u21Position);
}],
[2636,function initialize_2636(__studio33){
window.visualViewport?.addEventListener('scroll',__studio33.u21Position);
}],
[2638,function initialize_2638(__studio33){
__studio33.u19Apply=__studio33.$fn(function(){__studio33.u21Apply();__studio33.u21Position()},"function(){u21Apply();u21Position()}","");
}],
[2640,function initialize_2640(__studio33){
__studio33.setEditorFullScreen=__studio33.$fn(function(value){const snapshot=value&&!__studio33.editorFullScreen?__studio33.u19Snapshot():null;if(value&&!__studio33.editorFullScreen)__studio33.u19Card.prepend(__studio33.u21Header);if(!value&&__studio33.u21Header.parentElement===__studio33.u19Card)__studio33.u21HeaderHome.after(__studio33.u21Header);__studio33.u21Fullscreen(value);if(snapshot)__studio33.u19AppSnapshot=snapshot;__studio33.u21Position()},"function(value){const snapshot=value&&!editorFullScreen?u19Snapshot():null;if(value&&!editorFullScreen)u19Card.prepend(u21Header);if(!value&&u21Header.parentElement===u19Card)u21HeaderHome.after(u21Header);u21Fullscreen(value);if(snapshot)u19AppSnapshot=snapshot;u21Position()}","");
}],
[2642,function initialize_2642(__studio33){
__studio33.u19Scope=__studio33.$fn(function(){return __studio33.u19Modal()||(!__studio33.$('commandOverlay').hidden?__studio33.$('commandOverlay'):!__studio33.$('themeMenu').hidden?__studio33.$('themeMenu'):__studio33.u21Options.open?__studio33.u21Options:__studio33.u21Scope())},"function(){return u19Modal()||(!$('commandOverlay').hidden?$('commandOverlay'):!$('themeMenu').hidden?$('themeMenu'):u21Options.open?u21Options:u21Scope())}","");
}],
[2644,function initialize_2644(__studio33){
__studio33.showCommands=__studio33.$fn(function(){__studio33.u21Options.open=false;__studio33.themeOpen(false);__studio33.u21Position();__studio33.u21ShowCommands()},"function(){u21Options.open=false;themeOpen(false);u21Position();u21ShowCommands()}","");
}],
[2645,function initialize_2645(__studio33){
__studio33.$('commandToggle').onclick=__studio33.showCommands;
}],
[2646,function initialize_2646(__studio33){
__studio33.u21Position();
}],
[2650,function initialize_2650(__studio33){
try{__studio33.u22State=__studio33.u22Check(__studio33.storage.get(__studio33.u22Key,{version:1,panes:{},draftTimes:{}}))}catch{__studio33.u22State={version:1,panes:{},draftTimes:{}}}
}],
[2659,function initialize_2659(__studio33){
document.addEventListener('input',__studio33.u22Changed);
}],
[2660,function initialize_2660(__studio33){
document.addEventListener('change',__studio33.u22Changed);
}],
[2680,function initialize_2680(__studio33){
__studio33.u22ApplyPanes();
}],
[2683,function initialize_2683(__studio33){
__studio33.u22ReaderInfo.id='u22ReaderInfo';
}],
[2684,function initialize_2684(__studio33){
__studio33.u19ReaderText.before(__studio33.u22ReaderInfo);
}],
[2686,function initialize_2686(__studio33){
__studio33.u22ReaderFind.type='search';
}],
[2687,function initialize_2687(__studio33){
__studio33.u22ReaderFind.placeholder='Find in complete result';
}],
[2688,function initialize_2688(__studio33){
__studio33.u22ReaderFind.setAttribute('aria-label','Find in complete result');
}],
[2689,function initialize_2689(__studio33){
__studio33.u22ReaderFind.id='u22ReaderFind';
}],
[2691,function initialize_2691(__studio33){
__studio33.u22ReaderSearch.append(__studio33.u22ReaderFind,__studio33.u19Button('Previous match',__studio33.$fn(()=>__studio33.u22FindReader(-1),"()=>u22FindReader(-1)",""),'u22ReaderPrevious'),__studio33.u19Button('Next match',__studio33.$fn(()=>__studio33.u22FindReader(1),"()=>u22FindReader(1)",""),'u22ReaderNext'));
}],
[2692,function initialize_2692(__studio33){
__studio33.u19ReaderText.before(__studio33.u22ReaderSearch);
}],
[2695,function initialize_2695(__studio33){
__studio33.u19ReaderActions.append(__studio33.u22ReaderDownload,__studio33.u22ReaderMore);
}],
[2696,function initialize_2696(__studio33){
__studio33.u19ReaderCopy.onclick=__studio33.$fn(()=>{if(__studio33.u22ReaderPayload)__studio33.copyText(__studio33.u22ReaderPayload)},"()=>{if(u22ReaderPayload)copyText(u22ReaderPayload)}","");
}],
[2699,function initialize_2699(__studio33){
__studio33.u22ReaderFind.oninput=__studio33.$fn(()=>{__studio33.u22ReaderMatch=-1;__studio33.u22FindReader(1)},"()=>{u22ReaderMatch=-1;u22FindReader(1)}","");
}],
[2701,function initialize_2701(__studio33){
__studio33.u19Reader.addEventListener('close',__studio33.$fn(()=>{__studio33.u22ReaderPayload='';__studio33.u22ReaderBlob=null;__studio33.u19ReaderText.replaceChildren();__studio33.u22ReaderFind.value=''},"()=>{u22ReaderPayload='';u22ReaderBlob=null;u19ReaderText.replaceChildren();u22ReaderFind.value=''}",""));
}],
[2704,function initialize_2704(__studio33){
__studio33.u22DiffNav.id='u22DiffNav';
}],
[2707,function initialize_2707(__studio33){
__studio33.u22DiffNav.append(__studio33.u22DiffPrev,__studio33.u22DiffNext,__studio33.u22DiffCount);
}],
[2714,function initialize_2714(__studio33){
__studio33.renderJSONDiff();
}],
[2716,function initialize_2716(__studio33){
__studio33.u22APIHelp.id='u22APIHelp';
}],
[2717,function initialize_2717(__studio33){
__studio33.u22APIHelp.hidden=true;
}],
[2729,function initialize_2729(__studio33){
__studio33.u22Graph.tabIndex=0;
}],
[2730,function initialize_2730(__studio33){
__studio33.u22Graph.setAttribute('aria-label','Graph preview');
}],
[2732,function initialize_2732(__studio33){
__studio33.$('u19View-graph').append(__studio33.u22GraphButton);
}],
[2734,function initialize_2734(__studio33){
__studio33.u19LayoutPicker.addEventListener('change',__studio33.u22StopInspect);
}],
[2737,function initialize_2737(__studio33){
__studio33.u22DraftDialog.append(__studio33.u22DraftInfo,__studio33.u22DraftText,__studio33.u19Button('Restore this draft',__studio33.$fn(()=>{if(!__studio33.u22DraftValues)return;try{__studio33.wsUndoRestore=__studio33.wsCapture([__studio33.u22DraftTool]);__studio33.wsApply({[__studio33.u22DraftTool]:__studio33.u22DraftValues});__studio33.wsRender();__studio33.u22DraftDialog.close();__studio33.toast('Draft restored. Undo snapshot restore is available in Project Workspaces.')}catch(e){__studio33.u22DraftInfo.textContent=e.message}},"()=>{if(!u22DraftValues)return;try{wsUndoRestore=wsCapture([u22DraftTool]);wsApply({[u22DraftTool]:u22DraftValues});wsRender();u22DraftDialog.close();toast('Draft restored. Undo snapshot restore is available in Project Workspaces.')}catch(e){u22DraftInfo.textContent=e.message}}",""),'u22DraftRestore'));
}],
[2741,function initialize_2741(__studio33){
for(const id of __studio33.wsEligible){const p=__studio33.$(id);if(!p)continue;const row=__studio33.csText('div','','u22-ui u22-draft'),labelWrap=__studio33.csText('label',''),check=document.createElement('input');check.type='checkbox';check.id='u22Recovery-'+id;labelWrap.append(check,document.createTextNode('Save this tool’s draft locally'));const label=__studio33.csText('small',''),preview=__studio33.u19Button('Preview saved draft',__studio33.$fn(()=>__studio33.u22PreviewDraft(id),"()=>u22PreviewDraft(id)",""),'u22Preview-'+id);row.append(labelWrap,label,preview);const advanced=p.querySelector(':scope>.u17-advanced');(advanced||p).append(row);__studio33.u22DraftLabels.set(id,{check,label,preview});check.onchange=__studio33.$fn(()=>{const tools=new Set(__studio33.v12State.recovery.tools);if(check.checked){tools.add(id);__studio33.v12State.recovery.values[id]=__studio33.u25RecoveryCapture([id])[id];__studio33.u22State.draftTimes[id]=new Date().toISOString()}else tools.delete(id);__studio33.v12State.recovery.tools=[...tools];__studio33.v12State.recovery.enabled=tools.size>0;__studio33.v12Save();__studio33.u22Save();__studio33.u22DraftRefresh()},"()=>{const tools=new Set(v12State.recovery.tools);if(check.checked){tools.add(id);v12State.recovery.values[id]=u25RecoveryCapture([id])[id];u22State.draftTimes[id]=new Date().toISOString()}else tools.delete(id);v12State.recovery.tools=[...tools];v12State.recovery.enabled=tools.size>0;v12Save();u22Save();u22DraftRefresh()}","")}
}],
[2744,function initialize_2744(__studio33){
__studio33.csPersist=__studio33.$fn(function(key,value){const ok=__studio33.u22OldPersist(key,value);if(ok&&key===__studio33.v12Key){const next=JSON.stringify(value.recovery.values);if(next!==__studio33.u22DraftLast){let before={};try{before=JSON.parse(__studio33.u22DraftLast)}catch{}for(const[id,v]of Object.entries(value.recovery.values))if(JSON.stringify(v)!==JSON.stringify(before[id]))__studio33.u22State.draftTimes[id]=new Date().toISOString();for(const id of Object.keys(__studio33.u22State.draftTimes))if(!value.recovery.values[id])delete __studio33.u22State.draftTimes[id];__studio33.u22DraftLast=next;__studio33.u22OldPersist(__studio33.u22Key,__studio33.u22State)}__studio33.u22DraftRefresh()}return ok},"function(key,value){const ok=u22OldPersist(key,value);if(ok&&key===v12Key){const next=JSON.stringify(value.recovery.values);if(next!==u22DraftLast){let before={};try{before=JSON.parse(u22DraftLast)}catch{}for(const[id,v]of Object.entries(value.recovery.values))if(JSON.stringify(v)!==JSON.stringify(before[id]))u22State.draftTimes[id]=new Date().toISOString();for(const id of Object.keys(u22State.draftTimes))if(!value.recovery.values[id])delete u22State.draftTimes[id];u22DraftLast=next;u22OldPersist(u22Key,u22State)}u22DraftRefresh()}return ok}","");
}],
[2745,function initialize_2745(__studio33){
__studio33.u22DraftRefresh();
}],
[2747,function initialize_2747(__studio33){
__studio33.u22Reset.append(__studio33.csText('p','Choose what to clear in this browser. Download a backup first if you need to keep saved work.'));
}],
[2750,function initialize_2750(__studio33){
__studio33.u22ResetDescription.id='u22ResetDescription';
}],
[2752,function initialize_2752(__studio33){
__studio33.u22ResetInput.id='u22ResetInput';
}],
[2753,function initialize_2753(__studio33){
__studio33.u22ResetInput.placeholder='Type RESET';
}],
[2754,function initialize_2754(__studio33){
__studio33.u22ResetInput.autocomplete='off';
}],
[2755,function initialize_2755(__studio33){
__studio33.u22ResetVerify.append(__studio33.csText('span','For all saved data, type RESET to confirm'),__studio33.u22ResetInput);
}],
[2758,function initialize_2758(__studio33){
__studio33.u22ResetError.id='u22ResetError';
}],
[2759,function initialize_2759(__studio33){
__studio33.u22Reset.append(__studio33.u22ResetDescription,__studio33.u22ResetVerify,__studio33.u22ResetError);
}],
[2764,function initialize_2764(__studio33){
__studio33.u22ResetScope.onchange=__studio33.u22ResetExplain;
}],
[2767,function initialize_2767(__studio33){
document.querySelector('.studio-menu-body').append(__studio33.u22ResetButton);
}],
[2768,function initialize_2768(__studio33){
__studio33.u22ResetExplain();
}],
[2769,function initialize_2769(__studio33){
__studio33.backupKeys.push(__studio33.u22Key);
}],
[2771,function initialize_2771(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.u22OldBackup();b.state[__studio33.u22Key]=__studio33.csClone(__studio33.u22State);return b},"function(){const b=u22OldBackup();b.state[u22Key]=csClone(u22State);return b}","");
}],
[2773,function initialize_2773(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.u22Key))b.state[__studio33.u22Key]=null;const result=__studio33.u22OldValidate(b);if(result.state[__studio33.u22Key])result.state[__studio33.u22Key]=__studio33.u22Check(result.state[__studio33.u22Key]);return result},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,u22Key))b.state[u22Key]=null;const result=u22OldValidate(b);if(result.state[u22Key])result.state[u22Key]=u22Check(result.state[u22Key]);return result}","");
}],
[2775,function initialize_2775(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u22OldRestore(state);__studio33.u22State=state[__studio33.u22Key]?__studio33.u22Check(state[__studio33.u22Key]):{version:1,panes:{},draftTimes:{}};__studio33.u22ApplyPanes();__studio33.u22DraftLast=JSON.stringify(__studio33.v12State.recovery.values);__studio33.u22DraftRefresh()},"function(state){u22OldRestore(state);u22State=state[u22Key]?u22Check(state[u22Key]):{version:1,panes:{},draftTimes:{}};u22ApplyPanes();u22DraftLast=JSON.stringify(v12State.recovery.values);u22DraftRefresh()}","");
}],
[2777,function initialize_2777(__studio33){
for(const d of [__studio33.u22Reset,__studio33.u22DraftDialog])d.addEventListener('close',__studio33.$fn(()=>{let target=__studio33.u19DialogFocus.get(d);const closed=target?.closest('details:not([open])');if(closed)target=closed.querySelector(':scope>summary');if(target&&__studio33.u19Visible(target))target.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{let target=u19DialogFocus.get(d);const closed=target?.closest('details:not([open])');if(closed)target=closed.querySelector(':scope>summary');if(target&&u19Visible(target))target.focus({preventScroll:true});u19SyncExit()}",""));
}],
[2781,function initialize_2781(__studio33){
;
}],
[2783,function initialize_2783(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Result refinements & Reset'),__studio33.csText('p','Mobile editors offer Input / Result / Both. Focus result copies data only and searches/downloads the full text. Large JSON and CSV jobs use the cancellable task bar. Eligible tools offer per-tool draft opt-in and preview before restore under Advanced & help. Options → Reset… lets you clear tool cache/memory, restore display settings, or delete all app-owned browser data; the dialog offers a backup and describes each scope.'));
}],
[2785,function initialize_2785(__studio33){
document.addEventListener('pointerdown',__studio33.$fn(e=>{if(__studio33.u22Inspection&&!__studio33.u22Inspection.target.contains(e.target)&&!__studio33.u22Inspection.button.contains(e.target))__studio33.u22StopInspect(false)},"e=>{if(u22Inspection&&!u22Inspection.target.contains(e.target)&&!u22Inspection.button.contains(e.target))u22StopInspect(false)}",""),true);
}],
[2786,function initialize_2786(__studio33){
document.addEventListener('keydown',__studio33.$fn(e=>{if(e.key==='Tab'&&__studio33.u22Inspection)__studio33.u22StopInspect(false)},"e=>{if(e.key==='Tab'&&u22Inspection)u22StopInspect(false)}",""),true);
}],
[2789,function initialize_2789(__studio33){
__studio33.views.tools='Percentages & EMI';
}],
[2790,function initialize_2790(__studio33){
__studio33.views.apiclient='API request editor';
}],
[2791,function initialize_2791(__studio33){
__studio33.views.integrationtests='Integration test payload generator';
}],
[2810,function initialize_2810(__studio33){
__studio33.u23CurlShell.id='u23CurlShell';
}],
[2811,function initialize_2811(__studio33){
__studio33.u23CurlShell.setAttribute('aria-label','Command shell');
}],
[2812,function initialize_2812(__studio33){
__studio33.u23CurlShell.append(new Option('POSIX · macOS / Linux','posix'),new Option('PowerShell · Windows','powershell'));
}],
[2814,function initialize_2814(__studio33){
__studio33.u23CurlLabel.append(__studio33.u23CurlShell);
}],
[2820,function initialize_2820(__studio33){
__studio33.u23CurlShell.onchange=__studio33.$fn(()=>{__studio33.lcInvalidateCurl();__studio33.u23State.shell=__studio33.u23CurlShell.value;__studio33.u23Save()},"()=>{lcInvalidateCurl();u23State.shell=u23CurlShell.value;u23Save()}","");
}],
[2822,function initialize_2822(__studio33){
__studio33.lcBusy=__studio33.$fn(function(busy){__studio33.u23OldBusy(busy);__studio33.u23CurlShell.disabled=busy},"function(busy){u23OldBusy(busy);u23CurlShell.disabled=busy}","");
}],
[2824,function initialize_2824(__studio33){
__studio33.u23Token.id='u23JWTToken';
}],
[2825,function initialize_2825(__studio33){
__studio33.u23Token.className='developer-editor';
}],
[2826,function initialize_2826(__studio33){
__studio33.u23Token.rows=4;
}],
[2827,function initialize_2827(__studio33){
__studio33.u23Token.spellcheck=false;
}],
[2831,function initialize_2831(__studio33){
__studio33.v13InstallEditor(__studio33.u23Token);
}],
[2832,function initialize_2832(__studio33){
__studio33.u15InstallGutter(__studio33.u23Token);
}],
[2844,function initialize_2844(__studio33){
__studio33.u23HashCopy.disabled=true;
}],
[2852,function initialize_2852(__studio33){
__studio33.u23Statistics();
}],
[2855,function initialize_2855(__studio33){
__studio33.wsApply=__studio33.$fn(function(tools){if(tools.tools){const next=Object.keys(tools.tools).some(k=>k.startsWith('loan'))?'loan':Object.keys(tools.tools).some(k=>k.startsWith('percent'))?'percent':__studio33.tool;if(next!==__studio33.tool){__studio33.tool=next;__studio33.renderTools();document.querySelectorAll('[data-tool]').forEach(__studio33.$fn(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===__studio33.tool)),"b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool))",""))}}__studio33.u23OldApply(tools);if(tools.statistics)__studio33.u23Statistics()},"function(tools){if(tools.tools){const next=Object.keys(tools.tools).some(k=>k.startsWith('loan'))?'loan':Object.keys(tools.tools).some(k=>k.startsWith('percent'))?'percent':tool;if(next!==tool){tool=next;renderTools();document.querySelectorAll('[data-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.tool===tool)))}}u23OldApply(tools);if(tools.statistics)u23Statistics()}","");
}],
[2863,function initialize_2863(__studio33){
try{__studio33.u23State=__studio33.u23Check(__studio33.storage.get(__studio33.u23Key,{version:1,hidden:__studio33.u23Optional,shell:'posix'}))}catch{__studio33.u23State={version:1,hidden:[...__studio33.u23Optional],shell:'posix'}}
}],
[2869,function initialize_2869(__studio33){
__studio33.categoryForTool=__studio33.u23Category;
}],
[2877,function initialize_2877(__studio33){
__studio33.studioDescription=__studio33.$fn(function(id){return({jwtworkspace:'One token editor with explicit inspection and signature verification.',hashworkspace:'Hash UTF-8 text or inspect and hash original file bytes.',financeworkspace:'Compare loans, calculate percentages/EMI and solve an interest rate.',conversionworkspace:'Built-in units/currencies and saved/custom conversion factors.',statistics:'Mean, median, sum and population/sample deviation.',integrationtests:'Generate payload candidates for integration test cases.'})[id]||__studio33.u23OldDescription(id)},"function(id){return({jwtworkspace:'One token editor with explicit inspection and signature verification.',hashworkspace:'Hash UTF-8 text or inspect and hash original file bytes.',financeworkspace:'Compare loans, calculate percentages/EMI and solve an interest rate.',conversionworkspace:'Built-in units/currencies and saved/custom conversion factors.',statistics:'Mean, median, sum and population/sample deviation.',integrationtests:'Generate payload candidates for integration test cases.'})[id]||u23OldDescription(id)}","");
}],
[2880,function initialize_2880(__studio33){
__studio33.u23Manage.append(__studio33.csText('p','Choose which workspaces appear in the main categories. Unchecked workspaces remain available under Extra utilities and through Find tool. Their saved data is kept.'));
}],
[2882,function initialize_2882(__studio33){
__studio33.u23ManageSearch.id='u23ManageSearch';
}],
[2883,function initialize_2883(__studio33){
__studio33.u23ManageSearch.type='search';
}],
[2884,function initialize_2884(__studio33){
__studio33.u23ManageSearch.placeholder='Search tool workspaces';
}],
[2885,function initialize_2885(__studio33){
__studio33.u23ManageSearch.setAttribute('aria-label','Search tool workspaces');
}],
[2886,function initialize_2886(__studio33){
__studio33.u23Manage.append(__studio33.u23ManageSearch);
}],
[2889,function initialize_2889(__studio33){
__studio33.u23Manage.append(__studio33.u23ManageCount);
}],
[2891,function initialize_2891(__studio33){
__studio33.u23ManageList.id='u23ManageList';
}],
[2892,function initialize_2892(__studio33){
__studio33.u23Manage.append(__studio33.u23ManageList);
}],
[2895,function initialize_2895(__studio33){
__studio33.u23ManageSearch.oninput=__studio33.u23ManageRender;
}],
[2897,function initialize_2897(__studio33){
__studio33.u23ManageActions.append(__studio33.u19Button('Show all',__studio33.$fn(()=>{__studio33.u23ManageDraft.clear();__studio33.u23ManageRender()},"()=>{u23ManageDraft.clear();u23ManageRender()}",""),'u23ManageAll'),__studio33.u19Button('Recommended defaults',__studio33.$fn(()=>{__studio33.u23ManageDraft=new Set(__studio33.u23Optional);__studio33.u23ManageRender()},"()=>{u23ManageDraft=new Set(u23Optional);u23ManageRender()}",""),'u23ManageDefaults'),__studio33.u19Button('Apply & close',__studio33.$fn(()=>{__studio33.u23State.hidden=[...__studio33.u23ManageDraft];__studio33.u23Save();__studio33.u23MenuApply();__studio33.u23Manage.close()},"()=>{u23State.hidden=[...u23ManageDraft];u23Save();u23MenuApply();u23Manage.close()}",""),'u23ManageApply'));
}],
[2898,function initialize_2898(__studio33){
__studio33.u23Manage.append(__studio33.u23ManageActions);
}],
[2900,function initialize_2900(__studio33){
document.querySelector('.studio-menu-body').insertBefore(__studio33.u23ManageButton,__studio33.$('u22ResetButton'));
}],
[2901,function initialize_2901(__studio33){
__studio33.u23Manage.addEventListener('close',__studio33.$fn(()=>{let focus=__studio33.u19DialogFocus.get(__studio33.u23Manage);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{let focus=u19DialogFocus.get(u23Manage);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&u19Visible(focus))focus.focus({preventScroll:true});u19SyncExit()}",""));
}],
[2902,function initialize_2902(__studio33){
__studio33.backupKeys.push(__studio33.u23Key);
}],
[2903,function initialize_2903(__studio33){
__studio33.u22SettingKeys.push(__studio33.u23Key);
}],
[2905,function initialize_2905(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.u23OldBackup();b.state[__studio33.u23Key]=__studio33.csClone(__studio33.u23State);return b},"function(){const b=u23OldBackup();b.state[u23Key]=csClone(u23State);return b}","");
}],
[2907,function initialize_2907(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.u23Key))b.state[__studio33.u23Key]=null;const result=__studio33.u23OldValidate(b);if(result.state[__studio33.u23Key])result.state[__studio33.u23Key]=__studio33.u23Check(result.state[__studio33.u23Key]);return result},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,u23Key))b.state[u23Key]=null;const result=u23OldValidate(b);if(result.state[u23Key])result.state[u23Key]=u23Check(result.state[u23Key]);return result}","");
}],
[2909,function initialize_2909(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u23OldRestore(state);__studio33.u23State=state[__studio33.u23Key]?__studio33.u23Check(state[__studio33.u23Key]):{version:1,hidden:[...__studio33.u23Optional],shell:'posix'};__studio33.u23MenuApply();__studio33.u23Statistics()},"function(state){u23OldRestore(state);u23State=state[u23Key]?u23Check(state[u23Key]):{version:1,hidden:[...u23Optional],shell:'posix'};u23MenuApply();u23Statistics()}","");
}],
[2911,function initialize_2911(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 20';
}],
[2912,function initialize_2912(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Focused workspaces & optional tools'),__studio33.csText('p','Options → Manage tools controls main-menu visibility. Unchecked tools remain under Extra utilities and in targeted search, with saved data retained. JWT uses one shared token; Hash & file inspection has text/file modes; Finance groups loan comparison, percentages/EMI and interest-rate solving; Statistics stays in Math. Converters includes saved/custom conversions. The API request editor builds POSIX or PowerShell cURL and sends only when Send is explicitly chosen. Old request-builder links open this shared editor. Integration test payload generator produces test inputs.'));
}],
[2913,function initialize_2913(__studio33){
__studio33.u23MenuApply();
}],
[2914,function initialize_2914(__studio33){
__studio33.openTab(__studio33.u23Canonical(__studio33.activeView));
}],
[2918,function initialize_2918(__studio33){
try{__studio33.u24State=__studio33.u24Check(__studio33.storage.get(__studio33.u24Key,{version:1,mode:'auto',diagnostics:false}))}catch{__studio33.u24State={version:1,mode:'auto',diagnostics:false}}
}],
[2924,function initialize_2924(__studio33){
__studio33.u24EditorVisibility.observe(document.querySelector('.main-card'),{subtree:true,attributes:true,attributeFilter:['hidden']});
}],
[2925,function initialize_2925(__studio33){
document.addEventListener('toggle',__studio33.$fn(e=>{if(e.target.tagName==='DETAILS'&&e.target.open)__studio33.u24EnsureEditors(e.target)},"e=>{if(e.target.tagName==='DETAILS'&&e.target.open)u24EnsureEditors(e.target)}",""),true);
}],
[2926,function initialize_2926(__studio33){
document.addEventListener('focusin',__studio33.$fn(e=>{if(e.target.matches('textarea[id]')&&!__studio33.v13Editors.has(e.target.id))__studio33.u24EnsureEditors(e.target.closest('.field')||e.target.parentElement,true)},"e=>{if(e.target.matches('textarea[id]')&&!v13Editors.has(e.target.id))u24EnsureEditors(e.target.closest('.field')||e.target.parentElement,true)}",""));
}],
[2934,function initialize_2934(__studio33){
__studio33.knTaskList=__studio33.$fn(function(){const tasks=__studio33.u24OldTaskList();return __studio33.u24TimelinePaging?__studio33.u24TaskWindow(tasks,'timeline'):tasks},"function(){const tasks=u24OldTaskList();return u24TimelinePaging?u24TaskWindow(tasks,'timeline'):tasks}","");
}],
[2936,function initialize_2936(__studio33){
__studio33.knTimelineRender=__studio33.$fn(function(){__studio33.u24TimelinePaging=true;try{__studio33.u24OldTimeline()}finally{__studio33.u24TimelinePaging=false}__studio33.u24TaskPager(__studio33.timeline,'timeline')},"function(){u24TimelinePaging=true;try{u24OldTimeline()}finally{u24TimelinePaging=false}u24TaskPager(timeline,'timeline')}","");
}],
[2941,function initialize_2941(__studio33){
__studio33.dwRender=__studio33.$fn(function(){if(__studio33.u24Opening){__studio33.u24DWPending=true;return}return __studio33.u24OldDWRender()},"function(){if(u24Opening){u24DWPending=true;return}return u24OldDWRender()}","");
}],
[2949,function initialize_2949(__studio33){
__studio33.u24DiffPager.id='u24DiffPager';
}],
[2953,function initialize_2953(__studio33){
__studio33.u24DiffPager.append(__studio33.u24DiffPrev,__studio33.u24DiffPageText,__studio33.u24DiffNext);
}],
[2960,function initialize_2960(__studio33){
__studio33.refreshTaskUI=__studio33.$fn(function(){__studio33.u24OldTaskUI();const e=[...__studio33.editionWorkers.values()].find(__studio33.$fn(e=>e.owner===__studio33.activeView,"e=>e.owner===activeView",""));if(e?.started)__studio33.$('studioTaskText').textContent+=' · '+((performance.now()-e.started)/1000).toFixed(1)+' s';},"function(){u24OldTaskUI();const e=[...editionWorkers.values()].find(e=>e.owner===activeView);if(e?.started)$('studioTaskText').textContent+=' · '+((performance.now()-e.started)/1000).toFixed(1)+' s';}","");
}],
[2964,function initialize_2964(__studio33){
__studio33.runStudioWorker=__studio33.$fn(function(...args){const out=__studio33.u24WorkerClock(...args);if(__studio33.editionWorkers.size)__studio33.u24TaskClock();return out},"function(...args){const out=u24WorkerClock(...args);if(editionWorkers.size)u24TaskClock();return out}","");
}],
[2974,function initialize_2974(__studio33){
__studio33.u19Motion=__studio33.$fn(function(){return __studio33.u24Effective()&&(__studio33.u24State.mode==='performance'||__studio33.u19State.motion!=='full')&&__studio33.u24OldMotion()==='full'?'reduced':__studio33.u24OldMotion()},"function(){return u24Effective()&&(u24State.mode==='performance'||u19State.motion!=='full')&&u24OldMotion()==='full'?'reduced':u24OldMotion()}","");
}],
[2977,function initialize_2977(__studio33){
__studio33.u24Performance.append(__studio33.csText('p','Choose lighter effects for a slower device. Tool calculations and exports use the same data.'));
}],
[2980,function initialize_2980(__studio33){
__studio33.u24PerformanceStatus.id='u24PerformanceStatus';
}],
[2981,function initialize_2981(__studio33){
__studio33.u24Performance.append(__studio33.u24PerformanceStatus);
}],
[2982,function initialize_2982(__studio33){
__studio33.u24PerformancePicker.onchange=__studio33.$fn(()=>{__studio33.u24State.mode=__studio33.u24PerformancePicker.value;__studio33.csPersist(__studio33.u24Key,__studio33.u24State);__studio33.u24ApplyPerformance()},"()=>{u24State.mode=u24PerformancePicker.value;csPersist(u24Key,u24State);u24ApplyPerformance()}","");
}],
[2984,function initialize_2984(__studio33){
__studio33.u24DiagnosticsCheck.type='checkbox';
}],
[2985,function initialize_2985(__studio33){
__studio33.u24DiagnosticsCheck.id='u24DiagnosticsEnabled';
}],
[2986,function initialize_2986(__studio33){
__studio33.u24DiagnosticsLabel.append(__studio33.u24DiagnosticsCheck,__studio33.csText('span','Measure tool-opening and processing time locally'));
}],
[2987,function initialize_2987(__studio33){
__studio33.u24Performance.append(__studio33.u24DiagnosticsLabel);
}],
[2989,function initialize_2989(__studio33){
__studio33.u24DiagnosticsText.id='u24Diagnostics';
}],
[2990,function initialize_2990(__studio33){
__studio33.u24Performance.append(__studio33.u24DiagnosticsText);
}],
[2993,function initialize_2993(__studio33){
__studio33.u24DiagnosticsCheck.onchange=__studio33.$fn(()=>{__studio33.u24State.diagnostics=__studio33.u24DiagnosticsCheck.checked;__studio33.u24Metrics.runs=[];__studio33.u24Metrics.opens=[];__studio33.csPersist(__studio33.u24Key,__studio33.u24State);__studio33.u24DiagnosticsRender()},"()=>{u24State.diagnostics=u24DiagnosticsCheck.checked;u24Metrics.runs=[];u24Metrics.opens=[];csPersist(u24Key,u24State);u24DiagnosticsRender()}","");
}],
[2994,function initialize_2994(__studio33){
__studio33.u24Performance.append(__studio33.u19Button('Refresh measurements',__studio33.u24DiagnosticsRender,'u24DiagnosticsRefresh'),__studio33.u19Button('Download measurements',__studio33.$fn(()=>__studio33.downloadFile('calc-studio-performance.json',JSON.stringify(__studio33.u24Diagnostics(),null,2),'application/json'),"()=>downloadFile('calc-studio-performance.json',JSON.stringify(u24Diagnostics(),null,2),'application/json')",""),'u24DiagnosticsExport'));
}],
[2995,function initialize_2995(__studio33){
document.querySelector('.studio-menu-body').insertBefore(__studio33.u19Button('Performance…',__studio33.$fn(()=>{__studio33.u24ApplyPerformance();__studio33.u24DiagnosticsRender();__studio33.u19OpenDialog(__studio33.u24Performance,__studio33.$('u24PerformanceClose'))},"()=>{u24ApplyPerformance();u24DiagnosticsRender();u19OpenDialog(u24Performance,$('u24PerformanceClose'))}",""),'u24PerformanceButton'),__studio33.$('u22ResetButton'));
}],
[2997,function initialize_2997(__studio33){
for(const e of [__studio33.u19Card,document.querySelector('.studio-header'),__studio33.$('themeGrid'),...document.querySelectorAll('section')])if(e)__studio33.u24ScreenObserver.observe(e);
}],
[2998,function initialize_2998(__studio33){
__studio33.u19LayoutPicker.addEventListener('change',__studio33.$fn(()=>requestAnimationFrame(__studio33.u24ApplyPerformance),"()=>requestAnimationFrame(u24ApplyPerformance)",""));
}],
[3005,function initialize_3005(__studio33){
for(const[id,c]of Object.entries(__studio33.u24EmptyConfigs)){if(c.fields.some(__studio33.$fn(k=>!__studio33.$(k),"k=>!$(k)","")))continue;const p=__studio33.$(id),box=__studio33.csText('div','','u24-empty');box.id='u24Empty-'+id;box.append(__studio33.csText('p','Start with your data or an example.'));const actions=__studio33.csText('div','','u24-empty-actions');actions.append(__studio33.u19Button('Paste data',__studio33.$fn(async()=>{const e=__studio33.$(c.fields[0]);try{if(!navigator.clipboard?.readText)throw Error('unavailable');const text=await navigator.clipboard.readText();if(text.length>2097152)throw Error('size');__studio33.u15Change(e,text);e.focus()}catch{__studio33.toast('Paste with your keyboard or the device paste menu.');e.focus()}},"async()=>{const e=$(c.fields[0]);try{if(!navigator.clipboard?.readText)throw Error('unavailable');const text=await navigator.clipboard.readText();if(text.length>2097152)throw Error('size');u15Change(e,text);e.focus()}catch{toast('Paste with your keyboard or the device paste menu.');e.focus()}}",""),'u24Paste-'+id));if(c.upload&&__studio33.$(c.upload))actions.append(__studio33.u19Button('Upload file',__studio33.$fn(()=>__studio33.$(c.upload).click(),"()=>$(c.upload).click()",""),'u24Upload-'+id));actions.append(__studio33.u19Button('Load example',__studio33.$fn(()=>c.fields.forEach(__studio33.$fn((k,i)=>__studio33.u15Change(__studio33.$(k),c.example[i]||c.example[0]),"(k,i)=>u15Change($(k),c.example[i]||c.example[0])","")),"()=>c.fields.forEach((k,i)=>u15Change($(k),c.example[i]||c.example[0]))",""),'u24Example-'+id));box.append(actions);p.querySelector('.panel-heading').after(box);__studio33.u24EmptyBars.set(id,box);for(const k of c.fields)__studio33.$(k).addEventListener('input',__studio33.$fn(()=>__studio33.u24EmptyRefresh(id),"()=>u24EmptyRefresh(id)",""));__studio33.u24EmptyRefresh(id)}
}],
[3008,function initialize_3008(__studio33){
__studio33.u24UndoBar.id='u24UndoClear';
}],
[3009,function initialize_3009(__studio33){
__studio33.u24UndoBar.hidden=true;
}],
[3011,function initialize_3011(__studio33){
__studio33.u24UndoBar.append(__studio33.u24UndoLabel,__studio33.u19Button('Undo clear',__studio33.$fn(()=>{const r=__studio33.u24Undo;if(!r)return;const signature=__studio33.u24TextSignature(r.id);if(signature!==r.after){__studio33.u24ForgetUndo();__studio33.toast('New input entered; clear undo was dismissed.');return}for(const[k,v]of Object.entries(r.values))if(__studio33.$(k))__studio33.u15Change(__studio33.$(k),v);__studio33.u24ForgetUndo();__studio33.u24EmptyRefresh(r.id);__studio33.toast('Inputs restored. Run the tool to refresh results.')},"()=>{const r=u24Undo;if(!r)return;const signature=u24TextSignature(r.id);if(signature!==r.after){u24ForgetUndo();toast('New input entered; clear undo was dismissed.');return}for(const[k,v]of Object.entries(r.values))if($(k))u15Change($(k),v);u24ForgetUndo();u24EmptyRefresh(r.id);toast('Inputs restored. Run the tool to refresh results.')}",""),'u24UndoClearButton'),__studio33.u19Button('Dismiss',__studio33.u24ForgetUndo));
}],
[3012,function initialize_3012(__studio33){
__studio33.u19Card.append(__studio33.u24UndoBar);
}],
[3016,function initialize_3016(__studio33){
for(const id of Object.keys(__studio33.u24EmptyConfigs)){const p=__studio33.$(id);if(!p)continue;for(const b of p.querySelectorAll('button[id]')){if(!/Clear$/i.test(b.id)||!b.onclick||b.closest('section')!==p)continue;const old=b.onclick;b.onclick=__studio33.$fn(function(...args){const values=__studio33.u24TextValues(id),before=JSON.stringify(values),out=old.apply(this,args),done=__studio33.$fn(()=>{__studio33.u24EmptyRefresh(id);const after=__studio33.u24TextSignature(id);if(before!==after&&before.length<=4194304){__studio33.u24ForgetUndo();__studio33.u24Undo={id,values,after};__studio33.u24UndoLabel.textContent=__studio33.views[id]+' inputs cleared · Undo available for 15 seconds';__studio33.u24UndoBar.hidden=false;__studio33.u24UndoTimer=setTimeout(__studio33.u24ForgetUndo,15000)}},"()=>{u24EmptyRefresh(id);const after=u24TextSignature(id);if(before!==after&&before.length<=4194304){u24ForgetUndo();u24Undo={id,values,after};u24UndoLabel.textContent=views[id]+' inputs cleared · Undo available for 15 seconds';u24UndoBar.hidden=false;u24UndoTimer=setTimeout(u24ForgetUndo,15000)}}","done");if(out?.then)return out.finally(done);done();return out},"function(...args){const values=u24TextValues(id),before=JSON.stringify(values),out=old.apply(this,args),done=()=>{u24EmptyRefresh(id);const after=u24TextSignature(id);if(before!==after&&before.length<=4194304){u24ForgetUndo();u24Undo={id,values,after};u24UndoLabel.textContent=views[id]+' inputs cleared · Undo available for 15 seconds';u24UndoBar.hidden=false;u24UndoTimer=setTimeout(u24ForgetUndo,15000)}};if(out?.then)return out.finally(done);done();return out}","")}}
}],
[3017,function initialize_3017(__studio33){
document.addEventListener('input',__studio33.$fn(e=>{if(__studio33.u24Undo&&e.target.closest('section')?.id===__studio33.u24Undo.id&&__studio33.u24TextSignature(__studio33.u24Undo.id)!==__studio33.u24Undo.after)__studio33.u24ForgetUndo()},"e=>{if(u24Undo&&e.target.closest('section')?.id===u24Undo.id&&u24TextSignature(u24Undo.id)!==u24Undo.after)u24ForgetUndo()}",""));
}],
[3020,function initialize_3020(__studio33){
document.addEventListener('click',__studio33.$fn(e=>{const b=e.target.closest('button'),id=b?.closest('section')?.id;if(!id||/Clear|Copy|Download|Upload|Cancel|Close|Undo|Focus|TextSize/i.test(b.id))return;__studio33.u24Action={id,at:performance.now()}},"e=>{const b=e.target.closest('button'),id=b?.closest('section')?.id;if(!id||/Clear|Copy|Download|Upload|Cancel|Close|Undo|Focus|TextSize/i.test(b.id))return;u24Action={id,at:performance.now()}}",""),true);
}],
[3024,function initialize_3024(__studio33){
__studio33.newToolStatus=__studio33.$fn(function(id,message,error=false){__studio33.u24OldNewStatus(id,message,error);__studio33.u24FieldError(__studio33.$(id),message,error);__studio33.u24EmptyRefresh(__studio33.$(id)?.closest('section')?.id)},"function(id,message,error=false){u24OldNewStatus(id,message,error);u24FieldError($(id),message,error);u24EmptyRefresh($(id)?.closest('section')?.id)}","");
}],
[3026,function initialize_3026(__studio33){
__studio33.csStatus=__studio33.$fn(function(id,message,error=false){__studio33.u24OldCSStatus(id,message,error);__studio33.u24FieldError(__studio33.$(id+'Status'),message,error);__studio33.u24EmptyRefresh(id)},"function(id,message,error=false){u24OldCSStatus(id,message,error);u24FieldError($(id+'Status'),message,error);u24EmptyRefresh(id)}","");
}],
[3029,function initialize_3029(__studio33){
document.addEventListener('input',__studio33.$fn(e=>__studio33.u24ClearError(e.target),"e=>u24ClearError(e.target)",""));
}],
[3031,function initialize_3031(__studio33){
__studio33.u24StorageSummary.id='u24StorageSummary';
}],
[3032,function initialize_3032(__studio33){
__studio33.u24StorageList.id='u24StorageList';
}],
[3033,function initialize_3033(__studio33){
__studio33.u24StorageReview.id='u24StorageReview';
}],
[3034,function initialize_3034(__studio33){
__studio33.u24Storage.append(__studio33.csText('p','Review saved-data size in this browser. Download a full backup before cleanup. Uploaded media and unsaved results live in memory and are not included in these totals.'),__studio33.u24StorageSummary,__studio33.u24StorageList,__studio33.u24StorageReview);
}],
[3043,function initialize_3043(__studio33){
__studio33.u24StorageConfirm.type='checkbox';
}],
[3044,function initialize_3044(__studio33){
__studio33.u24StorageConfirm.id='u24StorageConfirm';
}],
[3045,function initialize_3045(__studio33){
__studio33.u24StorageConfirmRow.append(__studio33.u24StorageConfirm,__studio33.csText('span','I reviewed the selected groups and want to clear them.'));
}],
[3046,function initialize_3046(__studio33){
__studio33.u24Storage.append(__studio33.u24StorageConfirmRow,__studio33.u19Button('Download full backup',__studio33.$fn(()=>__studio33.downloadFile('calc-studio-before-cleanup.json',JSON.stringify(__studio33.backupSnapshot(),null,2),'application/json'),"()=>downloadFile('calc-studio-before-cleanup.json',JSON.stringify(backupSnapshot(),null,2),'application/json')",""),'u24StorageBackup'),__studio33.u19Button('Refresh usage',__studio33.u24StorageRender,'u24StorageRefresh'),__studio33.u19Button('Clear selected saved data',__studio33.$fn(()=>{const keys=__studio33.u24StorageSelection();if(!keys.length)return;if(!__studio33.u24StorageConfirm.checked){__studio33.u24StorageReview.textContent='Review the selected groups and check the confirmation before cleanup.';__studio33.u24StorageConfirm.focus();return}try{clearTimeout(__studio33.wsTimer);clearTimeout(__studio33.jsonDebounce);for(const owner of new Set([...__studio33.editionWorkers.values()].map(e=>e.owner)))__studio33.cancelStudioTasks(owner);__studio33.lcJob?.controller.abort();for(const key of keys)localStorage.removeItem(key);location.reload()}catch(e){__studio33.u24StorageReview.textContent='Cleanup could not finish: '+e.message+'. Restore from your backup if needed.'}},"()=>{const keys=u24StorageSelection();if(!keys.length)return;if(!u24StorageConfirm.checked){u24StorageReview.textContent='Review the selected groups and check the confirmation before cleanup.';u24StorageConfirm.focus();return}try{clearTimeout(wsTimer);clearTimeout(jsonDebounce);for(const owner of new Set([...editionWorkers.values()].map(e=>e.owner)))cancelStudioTasks(owner);lcJob?.controller.abort();for(const key of keys)localStorage.removeItem(key);location.reload()}catch(e){u24StorageReview.textContent='Cleanup could not finish: '+e.message+'. Restore from your backup if needed.'}}",""),'u24StorageClear'));
}],
[3047,function initialize_3047(__studio33){
document.querySelector('.studio-menu-body').insertBefore(__studio33.u19Button('Storage & cleanup…',__studio33.$fn(()=>{__studio33.u24StorageRender();__studio33.u19OpenDialog(__studio33.u24Storage,__studio33.$('u24StorageClose'))},"()=>{u24StorageRender();u19OpenDialog(u24Storage,$('u24StorageClose'))}",""),'u24StorageButton'),__studio33.$('u22ResetButton'));
}],
[3050,function initialize_3050(__studio33){
__studio33.$('u24StorageBackup').before(__studio33.u24RecordsExport);
}],
[3052,function initialize_3052(__studio33){
__studio33.u24Storage.append(__studio33.u24RecordsHelp);
}],
[3054,function initialize_3054(__studio33){
__studio33.u24RecordsRestore.append(__studio33.csText('summary','Restore saved records'));
}],
[3056,function initialize_3056(__studio33){
__studio33.u24RecordsFile.type='file';
}],
[3057,function initialize_3057(__studio33){
__studio33.u24RecordsFile.accept='.json';
}],
[3058,function initialize_3058(__studio33){
__studio33.u24RecordsFile.id='u24RecordsFile';
}],
[3059,function initialize_3059(__studio33){
__studio33.u24RecordsFile.setAttribute('aria-label','Saved-record export');
}],
[3061,function initialize_3061(__studio33){
__studio33.u24RecordsStatus.id='u24RecordsStatus';
}],
[3064,function initialize_3064(__studio33){
__studio33.u24RecordsConfirm.type='checkbox';
}],
[3065,function initialize_3065(__studio33){
__studio33.u24RecordsConfirm.id='u24RecordsConfirm';
}],
[3066,function initialize_3066(__studio33){
__studio33.u24RecordsConfirmRow.append(__studio33.u24RecordsConfirm,__studio33.csText('span','Replace matching saved records with the reviewed file.'));
}],
[3068,function initialize_3068(__studio33){
__studio33.u24RecordsFile.onchange=__studio33.$fn(async()=>{__studio33.u24RecordsPending=null;__studio33.u24RecordsConfirm.checked=false;__studio33.u24RecordsApply.disabled=true;try{const f=__studio33.u24RecordsFile.files[0];if(!f)return;if(f.size>12*1024*1024)throw Error('Saved-record export limit: 12 MiB');const records=__studio33.u24RecordsCheck(JSON.parse(await f.text()));__studio33.u24RecordsPending=records;const keys=Object.keys(records),existing=keys.filter(k=>localStorage.getItem(k)!==null).length;__studio33.u24RecordsStatus.textContent='Reviewed '+keys.length+' Calc Studio records; '+existing+' matching records will be replaced. Other records stay. Applying reloads the app and releases unsaved input/results.';__studio33.u24RecordsApply.disabled=!keys.length}catch(e){__studio33.u24RecordsStatus.textContent=e.message}},"async()=>{u24RecordsPending=null;u24RecordsConfirm.checked=false;u24RecordsApply.disabled=true;try{const f=u24RecordsFile.files[0];if(!f)return;if(f.size>12*1024*1024)throw Error('Saved-record export limit: 12 MiB');const records=u24RecordsCheck(JSON.parse(await f.text()));u24RecordsPending=records;const keys=Object.keys(records),existing=keys.filter(k=>localStorage.getItem(k)!==null).length;u24RecordsStatus.textContent='Reviewed '+keys.length+' Calc Studio records; '+existing+' matching records will be replaced. Other records stay. Applying reloads the app and releases unsaved input/results.';u24RecordsApply.disabled=!keys.length}catch(e){u24RecordsStatus.textContent=e.message}}","");
}],
[3070,function initialize_3070(__studio33){
__studio33.u24RecordsApply.disabled=true;
}],
[3071,function initialize_3071(__studio33){
__studio33.u24RecordsRestore.append(__studio33.u24RecordsFile,__studio33.u24RecordsStatus,__studio33.u24RecordsConfirmRow,__studio33.u24RecordsApply);
}],
[3072,function initialize_3072(__studio33){
__studio33.u24Storage.append(__studio33.u24RecordsRestore);
}],
[3073,function initialize_3073(__studio33){
__studio33.$('u24StorageBackup').textContent='Download app backup';
}],
[3074,function initialize_3074(__studio33){
__studio33.u24Storage.querySelector('p').textContent='Review saved-data size in this browser. Download all saved records before cleanup. Uploaded media and unsaved results live in memory and are not included in these totals.';
}],
[3076,function initialize_3076(__studio33){
for(const id of Object.keys(__studio33.views)){const p=__studio33.$(id);if(!p)continue;for(const b of p.querySelectorAll('button[id][data-u17-role=primary],#hashText,#verifyRun,#inspectHash')){if(b.closest('section')!==p||!b.onclick)continue;const old=b.onclick;b.onclick=__studio33.$fn(function(...args){if(__studio33.u24RunningButtons.has(b)){__studio33.toast('This action is still running.');return}const start=performance.now();let result;try{result=old.apply(this,args)}catch(e){__studio33.u24Record('run',id,start,'error');throw e}if(!result?.then){if(![...__studio33.editionWorkers.values()].some(e=>e.owner===id))__studio33.u24Record('run',id,start);return result}__studio33.u24RunningButtons.add(b);b.setAttribute('aria-busy','true');return result.then(__studio33.$fn(value=>{__studio33.u24Record('run',id,start);return value},"value=>{u24Record('run',id,start);return value}",""),__studio33.$fn(e=>{__studio33.u24Record('run',id,start,'error');throw e},"e=>{u24Record('run',id,start,'error');throw e}","")).finally(__studio33.$fn(()=>{__studio33.u24RunningButtons.delete(b);b.removeAttribute('aria-busy')},"()=>{u24RunningButtons.delete(b);b.removeAttribute('aria-busy')}",""))},"function(...args){if(u24RunningButtons.has(b)){toast('This action is still running.');return}const start=performance.now();let result;try{result=old.apply(this,args)}catch(e){u24Record('run',id,start,'error');throw e}if(!result?.then){if(![...editionWorkers.values()].some(e=>e.owner===id))u24Record('run',id,start);return result}u24RunningButtons.add(b);b.setAttribute('aria-busy','true');return result.then(value=>{u24Record('run',id,start);return value},e=>{u24Record('run',id,start,'error');throw e}).finally(()=>{u24RunningButtons.delete(b);b.removeAttribute('aria-busy')})}","")}}
}],
[3077,function initialize_3077(__studio33){
__studio33.backupKeys.push(__studio33.u24Key);
}],
[3078,function initialize_3078(__studio33){
__studio33.u22SettingKeys.push(__studio33.u24Key);
}],
[3080,function initialize_3080(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.u24OldBackup();b.state[__studio33.u24Key]=__studio33.csClone(__studio33.u24State);return b},"function(){const b=u24OldBackup();b.state[u24Key]=csClone(u24State);return b}","");
}],
[3082,function initialize_3082(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.u24Key))b.state[__studio33.u24Key]=null;const valid=__studio33.u24OldValidate(b);if(valid.state[__studio33.u24Key])valid.state[__studio33.u24Key]=__studio33.u24Check(valid.state[__studio33.u24Key]);return valid},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,u24Key))b.state[u24Key]=null;const valid=u24OldValidate(b);if(valid.state[u24Key])valid.state[u24Key]=u24Check(valid.state[u24Key]);return valid}","");
}],
[3084,function initialize_3084(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u24OldRestore(state);__studio33.u24State=state[__studio33.u24Key]?__studio33.u24Check(state[__studio33.u24Key]):{version:1,mode:'auto',diagnostics:false};__studio33.u24ForgetUndo();__studio33.u24ApplyPerformance()},"function(state){u24OldRestore(state);u24State=state[u24Key]?u24Check(state[u24Key]):{version:1,mode:'auto',diagnostics:false};u24ForgetUndo();u24ApplyPerformance()}","");
}],
[3085,function initialize_3085(__studio33){
for(const dialog of [__studio33.u24Performance,__studio33.u24Storage])dialog.addEventListener('close',__studio33.$fn(()=>{let focus=__studio33.u19DialogFocus.get(dialog);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{let focus=u19DialogFocus.get(dialog);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&u19Visible(focus))focus.focus({preventScroll:true});u19SyncExit()}",""));
}],
[3086,function initialize_3086(__studio33){
__studio33.u24Booting=false;
}],
[3087,function initialize_3087(__studio33){
__studio33.u24ApplyPerformance();
}],
[3088,function initialize_3088(__studio33){
__studio33.u24EnsureEditors(__studio33.$(__studio33.u23Home(__studio33.activeView)));
}],
[3089,function initialize_3089(__studio33){
__studio33.renderJSONDiff();
}],
[3090,function initialize_3090(__studio33){
__studio33.u24Metrics.setupMs=performance.now()-__studio33.u24SetupStart;
}],
[3091,function initialize_3091(__studio33){
__studio33.u24Metrics.readyMs=performance.now();
}],
[3092,function initialize_3092(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:21,openTool:__studio33.$fn(id=>__studio33.openTab(id),"id=>openTab(id)",""),performance:__studio33.$fn(()=>__studio33.u24Diagnostics(),"()=>u24Diagnostics()","")});
}],
[3093,function initialize_3093(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 21';
}],
[3094,function initialize_3094(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Performance, storage & easier entry'),__studio33.csText('p','Options → Performance selects Auto, Standard or Performance effects and optional local timing measurements. Editor controls initialize when used. Long result tables, differences and Kanban cards use bounded pages; downloads retain complete data. Large JSON comparisons use the cancellable task bar. Options → Storage & cleanup shows saved-data sizes with backup and reviewed selective cleanup. Empty supported tools offer Paste, Upload or Load example; supported text clears have a 15-second Undo. Action searches include compare JSON, calculate EMI and hash file. Explicit media clear/unload releases temporary sources.'));
}],
[3106,function initialize_3106(__studio33){
try{__studio33.u25State=__studio33.u25Check(__studio33.storage.get(__studio33.u25Key,__studio33.u25Defaults))}catch{__studio33.u25State=__studio33.csClone(__studio33.u25Defaults)}
}],
[3115,function initialize_3115(__studio33){
__studio33.u25Hub.append(__studio33.csText('p','Connect tools, reuse setups and process files. Every input replacement has a review step.'),__studio33.u25HubCards);
}],
[3118,function initialize_3118(__studio33){
document.querySelector('.studio-menu-body').insertBefore(__studio33.u25HubButton,__studio33.$('u22ResetButton'));
}],
[3120,function initialize_3120(__studio33){
__studio33.u25Profiles.append(__studio33.csText('p','Save a set of tools and display preferences. Input templates are optional and limited to supported text/calculation tools. API authentication, JWTs, passwords, uploads and results are excluded. Review any personal data inside ordinary text or JSON before saving.'));
}],
[3122,function initialize_3122(__studio33){
__studio33.u25ProfileName.maxLength=100;
}],
[3124,function initialize_3124(__studio33){
__studio33.u25ProfileList.id='u25ProfileList';
}],
[3125,function initialize_3125(__studio33){
__studio33.u25Profiles.append(__studio33.u25ProfileList);
}],
[3129,function initialize_3129(__studio33){
__studio33.u25ProfileSearch.oninput=__studio33.u25ProfileChoices;
}],
[3131,function initialize_3131(__studio33){
__studio33.u25ProfilePreview.id='u25ProfilePreview';
}],
[3132,function initialize_3132(__studio33){
__studio33.u25Profiles.append(__studio33.u25ProfilePreview,__studio33.u25ProfileStatus);
}],
[3135,function initialize_3135(__studio33){
__studio33.u25Saved.onchange=__studio33.u25ProfileReview;
}],
[3137,function initialize_3137(__studio33){
__studio33.u25Profiles.append(__studio33.u25ProfileActions);
}],
[3139,function initialize_3139(__studio33){
__studio33.$('u25ProfileUndo').disabled=true;
}],
[3141,function initialize_3141(__studio33){
__studio33.u25ProfileImport.accept='.json';
}],
[3142,function initialize_3142(__studio33){
__studio33.u25ProfileImport.onchange=__studio33.u25Safe(__studio33.$fn(async()=>{const f=__studio33.u25ProfileImport.files[0];if(!f)return;if(f.size>4*1024*1024)throw Error('Profile import limit: 4 MiB');const imported=__studio33.u25Check(JSON.parse(await f.text()));__studio33.u25State=__studio33.u25Check({...__studio33.u25State,profiles:[...__studio33.u25State.profiles,...imported.profiles.map(__studio33.$fn(p=>({...p,id:__studio33.csId('profile')}),"p=>({...p,id:csId('profile')})",""))]});__studio33.u25Save();__studio33.u25ProfileRender();__studio33.u25ProfileStatus.textContent='Profiles imported. Review before applying.'},"async()=>{const f=u25ProfileImport.files[0];if(!f)return;if(f.size>4*1024*1024)throw Error('Profile import limit: 4 MiB');const imported=u25Check(JSON.parse(await f.text()));u25State=u25Check({...u25State,profiles:[...u25State.profiles,...imported.profiles.map(p=>({...p,id:csId('profile')}))]});u25Save();u25ProfileRender();u25ProfileStatus.textContent='Profiles imported. Review before applying.'}",""),__studio33.u25ProfileStatus);
}],
[3144,function initialize_3144(__studio33){
__studio33.u25ProfileLinks.id='u25ProfileLinks';
}],
[3145,function initialize_3145(__studio33){
__studio33.u25ProfileLinks.setAttribute('aria-label','Active workspace profile tools');
}],
[3146,function initialize_3146(__studio33){
__studio33.u25ProfileLinks.hidden=true;
}],
[3147,function initialize_3147(__studio33){
__studio33.u19Card.prepend(__studio33.u25ProfileLinks);
}],
[3154,function initialize_3154(__studio33){
__studio33.u25TransferPreview.id='u25TransferPreview';
}],
[3164,function initialize_3164(__studio33){
__studio33.u25Share.append(__studio33.csText('p','Links contain only the selected tool and display preferences by default. Optional input templates are visible to anyone receiving the link or setup file. API credentials, tokens and uploads are excluded. A local file link requires the recipient to have the HTML; download a setup file for a portable alternative.'));
}],
[3166,function initialize_3166(__studio33){
__studio33.u25SharePreview.id='u25SharePreview';
}],
[3168,function initialize_3168(__studio33){
__studio33.u25ShareLink.readOnly=true;
}],
[3169,function initialize_3169(__studio33){
__studio33.u25ShareLink.rows=3;
}],
[3170,function initialize_3170(__studio33){
__studio33.u25Share.append(__studio33.u25SharePreview,__studio33.u25ShareStatus);
}],
[3176,function initialize_3176(__studio33){
__studio33.u25ShareInputs.onchange=__studio33.u25Safe(__studio33.u25ShareRender,__studio33.u25ShareStatus);
}],
[3177,function initialize_3177(__studio33){
__studio33.u25Share.append(__studio33.u19Button('Copy reviewed link',__studio33.u25Safe(__studio33.$fn(async()=>{if(!__studio33.u25ShareLink.value)throw Error('Download the setup file for this setup');await navigator.clipboard.writeText(__studio33.u25ShareLink.value);__studio33.u25ShareStatus.textContent='Link copied.'},"async()=>{if(!u25ShareLink.value)throw Error('Download the setup file for this setup');await navigator.clipboard.writeText(u25ShareLink.value);u25ShareStatus.textContent='Link copied.'}",""),__studio33.u25ShareStatus),'u25ShareCopy'),__studio33.u19Button('Download setup file',__studio33.$fn(()=>__studio33.downloadFile('calc-studio-tool-setup.json',JSON.stringify(__studio33.u25Shared,null,2),'application/json'),"()=>downloadFile('calc-studio-tool-setup.json',JSON.stringify(u25Shared,null,2),'application/json')",""),'u25ShareDownload'));
}],
[3180,function initialize_3180(__studio33){
__studio33.u25SetupPreview.id='u25SetupPreview';
}],
[3181,function initialize_3181(__studio33){
__studio33.u25Setup.append(__studio33.csText('p','Applying replaces the listed input fields and display preferences. Review the complete setup before applying. No tool runs and no API request is sent.'),__studio33.u25SetupPreview,__studio33.u25SetupStatus);
}],
[3183,function initialize_3183(__studio33){
__studio33.u25SetupFile.accept='.json';
}],
[3187,function initialize_3187(__studio33){
__studio33.u25SetupFile.onchange=__studio33.$fn(async()=>{const ticket=++__studio33.u25SetupTicket;__studio33.u25SetupStatus.textContent='Reading setup file…';__studio33.u25Received=null;__studio33.$('u25SetupApply').disabled=true;__studio33.u25SetupPreview.textContent='';try{const f=__studio33.u25SetupFile.files[0];if(!f){__studio33.u25SetupStatus.textContent='Choose a setup file to review.';return;}if(f.size>2*1024*1024)throw Error('Setup import limit: 2 MiB');const text=await f.text();if(ticket!==__studio33.u25SetupTicket)return;__studio33.u25SetupReview(JSON.parse(text))}catch(e){if(ticket===__studio33.u25SetupTicket)__studio33.u25SetupStatus.textContent=e.message}},"async()=>{const ticket=++u25SetupTicket;u25SetupStatus.textContent='Reading setup file…';u25Received=null;$('u25SetupApply').disabled=true;u25SetupPreview.textContent='';try{const f=u25SetupFile.files[0];if(!f){u25SetupStatus.textContent='Choose a setup file to review.';return;}if(f.size>2*1024*1024)throw Error('Setup import limit: 2 MiB');const text=await f.text();if(ticket!==u25SetupTicket)return;u25SetupReview(JSON.parse(text))}catch(e){if(ticket===u25SetupTicket)u25SetupStatus.textContent=e.message}}","");
}],
[3188,function initialize_3188(__studio33){
__studio33.u25Setup.append(__studio33.u19Button('Download received setup',__studio33.$fn(()=>{if(__studio33.u25Received)__studio33.downloadFile('received-tool-setup.json',JSON.stringify(__studio33.u25Received,null,2),'application/json')},"()=>{if(u25Received)downloadFile('received-tool-setup.json',JSON.stringify(u25Received,null,2),'application/json')}",""),'u25SetupDownload'),__studio33.u19Button('Apply reviewed setup',__studio33.u25Safe(__studio33.$fn(()=>{if(!__studio33.u25Received||!__studio33.u25SetupConfirm.checked)throw Error('Load and review a setup, then confirm application');if(__studio33.lcJob||__studio33.editionWorkers.size)throw Error('Finish or cancel processing first');__studio33.wsApply(__studio33.u25Received.templates);__studio33.u25DisplayApply(__studio33.u25Received.display);__studio33.openTab(__studio33.u25Received.tool);__studio33.u25Setup.close();__studio33.toast('Setup applied. Run the tool when ready.')},"()=>{if(!u25Received||!u25SetupConfirm.checked)throw Error('Load and review a setup, then confirm application');if(lcJob||editionWorkers.size)throw Error('Finish or cancel processing first');wsApply(u25Received.templates);u25DisplayApply(u25Received.display);openTab(u25Received.tool);u25Setup.close();toast('Setup applied. Run the tool when ready.')}",""),__studio33.u25SetupStatus),'u25SetupApply'));
}],
[3189,function initialize_3189(__studio33){
__studio33.$('u25SetupApply').disabled=true;
}],
[3192,function initialize_3192(__studio33){
window.addEventListener('hashchange',__studio33.u25ReadFragment);
}],
[3194,function initialize_3194(__studio33){
__studio33.u25Recovery.append(__studio33.csText('p','Choose tools whose unfinished inputs should be saved in this browser. Recovery is opt-in; uploads, live responses and credentials are excluded. Ordinary text/JSON can still contain personal data. Review saved inputs before restoring them.'));
}],
[3196,function initialize_3196(__studio33){
__studio33.u25RecoveryList.id='u25RecoveryList';
}],
[3197,function initialize_3197(__studio33){
__studio33.u25Recovery.append(__studio33.u25RecoveryList);
}],
[3200,function initialize_3200(__studio33){
__studio33.u25RecoveryPreview.id='u25RecoveryPreview';
}],
[3201,function initialize_3201(__studio33){
__studio33.u25Recovery.append(__studio33.u25RecoveryPreview,__studio33.u25RecoveryStatus);
}],
[3206,function initialize_3206(__studio33){
__studio33.$('u25RecoveryRestore').disabled=true;
}],
[3208,function initialize_3208(__studio33){
__studio33.u25RecoveryBanner.id='u25RecoveryBanner';
}],
[3209,function initialize_3209(__studio33){
__studio33.u25RecoveryBanner.append(__studio33.csText('span','Saved unfinished work is available.'),__studio33.u19Button('Review recovery',__studio33.$fn(()=>__studio33.u25ShowRecovery(),"()=>u25ShowRecovery()",""),'u25RecoveryBannerReview'),__studio33.u19Button('Dismiss',__studio33.$fn(()=>{__studio33.u25RecoveryBanner.hidden=true},"()=>{u25RecoveryBanner.hidden=true}","")));
}],
[3210,function initialize_3210(__studio33){
__studio33.u19Card.prepend(__studio33.u25RecoveryBanner);
}],
[3215,function initialize_3215(__studio33){
document.addEventListener('input',__studio33.$fn(e=>{const id=[...__studio33.u25Eligible].find(__studio33.$fn(id=>__studio33.wsElements.get(id)?.includes(e.target.id),"id=>wsElements.get(id)?.includes(e.target.id)",""));if(!id||!__studio33.v12State.recovery.enabled||!__studio33.v12State.recovery.tools.includes(id))return;__studio33.u25Dirty.add(id);clearTimeout(__studio33.u25DraftTimer);__studio33.u25DraftTimer=setTimeout(__studio33.u25Flush,550)},"e=>{const id=[...u25Eligible].find(id=>wsElements.get(id)?.includes(e.target.id));if(!id||!v12State.recovery.enabled||!v12State.recovery.tools.includes(id))return;u25Dirty.add(id);clearTimeout(u25DraftTimer);u25DraftTimer=setTimeout(u25Flush,550)}",""));
}],
[3216,function initialize_3216(__studio33){
window.addEventListener('pagehide',__studio33.u25Flush);
}],
[3217,function initialize_3217(__studio33){
document.addEventListener('visibilitychange',__studio33.$fn(()=>{if(document.hidden)__studio33.u25Flush()},"()=>{if(document.hidden)u25Flush()}",""));
}],
[3219,function initialize_3219(__studio33){
__studio33.u25Batch.append(__studio33.csText('p','Process up to 50 files and 50 MiB total, one file at a time in a background worker. JSON/text inputs are limited to 2 MiB per file; SHA-256 accepts up to 16 MiB per file. Comparisons use one reference file against each selected file. Files remain in memory.'));
}],
[3221,function initialize_3221(__studio33){
__studio33.u25BatchFiles.multiple=true;
}],
[3223,function initialize_3223(__studio33){
__studio33.u25BatchBase.parentElement.hidden=true;
}],
[3225,function initialize_3225(__studio33){
__studio33.u25BatchProgress.id='u25BatchProgress';
}],
[3226,function initialize_3226(__studio33){
__studio33.u25BatchProgress.max=1;
}],
[3227,function initialize_3227(__studio33){
__studio33.u25BatchProgress.value=0;
}],
[3228,function initialize_3228(__studio33){
__studio33.u25BatchProgress.setAttribute('aria-label','Batch progress');
}],
[3230,function initialize_3230(__studio33){
__studio33.u25BatchResults.id='u25BatchResults';
}],
[3231,function initialize_3231(__studio33){
__studio33.u25Batch.append(__studio33.u25BatchProgress,__studio33.u25BatchStatus,__studio33.u25BatchResults);
}],
[3240,function initialize_3240(__studio33){
__studio33.u25BatchClear();
}],
[3241,function initialize_3241(__studio33){
__studio33.u25Batch.addEventListener('close',__studio33.$fn(()=>{if(__studio33.u25BatchJob){__studio33.u25BatchClear();__studio33.u25BatchStatus.textContent='Batch cancelled when the dialog closed.'}},"()=>{if(u25BatchJob){u25BatchClear();u25BatchStatus.textContent='Batch cancelled when the dialog closed.'}}",""));
}],
[3242,function initialize_3242(__studio33){
window.addEventListener('pagehide',__studio33.u25BatchClear);
}],
[3245,function initialize_3245(__studio33){
__studio33.u25SFDetails.append(__studio33.csText('summary','Developer handoffs'));
}],
[3249,function initialize_3249(__studio33){
__studio33.u25SOQLDetails.append(__studio33.csText('summary','Query starters & API handoff'));
}],
[3251,function initialize_3251(__studio33){
__studio33.u25SOQLOrg.placeholder='https://your-org.my.salesforce.com';
}],
[3257,function initialize_3257(__studio33){
__studio33.u25CompositeDetails.append(__studio33.csText('summary','Composite workflow starters'));
}],
[3259,function initialize_3259(__studio33){
__studio33.u25CompositeVersion.value='57.0';
}],
[3261,function initialize_3261(__studio33){
__studio33.u25CompositePreview.id='u25CompositePreview';
}],
[3262,function initialize_3262(__studio33){
__studio33.u25CompositeDetails.append(__studio33.u25CompositePreview,__studio33.u25CompositeStatus);
}],
[3265,function initialize_3265(__studio33){
__studio33.u25CompositeDetails.querySelector('#u25CompositeApply').disabled=true;
}],
[3266,function initialize_3266(__studio33){
for(const e of [__studio33.u25CompositeStarter,__studio33.u25CompositeVersion])e.addEventListener('input',__studio33.$fn(()=>{__studio33.u25CompositePayload=null;__studio33.$('u25CompositeApply').disabled=true;__studio33.u25CompositePreview.textContent='';__studio33.u25CompositeStatus.textContent='Starter changed. Preview again.'},"()=>{u25CompositePayload=null;$('u25CompositeApply').disabled=true;u25CompositePreview.textContent='';u25CompositeStatus.textContent='Starter changed. Preview again.'}",""));
}],
[3269,function initialize_3269(__studio33){
__studio33.u25Limits.append(__studio33.csText('summary','Governor usage summary'),__studio33.csText('p','Summarizes reported usage from the current analyzer result. Uses limits recorded in the log rather than assuming a synchronous/asynchronous limit. Missing metrics remain unknown. Truncated logs may omit their final limit block.'));
}],
[3271,function initialize_3271(__studio33){
__studio33.u25LimitOutput.id='u25LimitOutput';
}],
[3273,function initialize_3273(__studio33){
__studio33.u25Limits.append(__studio33.u25LimitOutput);
}],
[3275,function initialize_3275(__studio33){
__studio33.u25HubItem('Linked tool workflow','Review a result, then place it in another tool without copying.',__studio33.$fn(()=>__studio33.u25ShowTransfer(),"()=>u25ShowTransfer()",""),'u25HubTransfer');
}],
[3276,function initialize_3276(__studio33){
__studio33.u25HubItem('Workspace profiles','Save selected tools, display choices and optional input templates.',__studio33.u25ShowProfiles,'u25HubProfiles');
}],
[3277,function initialize_3277(__studio33){
__studio33.u25HubItem('Batch processing','Format JSON, hash files or compare multiple files to one reference.',__studio33.u25ShowBatch,'u25HubBatch');
}],
[3278,function initialize_3278(__studio33){
__studio33.u25HubItem('Share tool setup','Copy a reviewed setup link or download a portable setup file.',__studio33.u25ShowShare,'u25HubShare');
}],
[3279,function initialize_3279(__studio33){
__studio33.u25HubItem('Load shared setup','Review a setup file before replacing inputs or display choices.',__studio33.u25ShowSetup,'u25HubSetup');
}],
[3280,function initialize_3280(__studio33){
__studio33.u25HubItem('Session recovery','Choose autosaved tools, review unfinished work or discard drafts.',__studio33.u25ShowRecovery,'u25HubRecovery');
}],
[3284,function initialize_3284(__studio33){
__studio33.renderCommands=__studio33.$fn(function(){__studio33.u25OldCommands();const q=__studio33.$('commandSearch').value.trim().toLowerCase(),actions=__studio33.u25PaletteActions.filter(([label,aliases],i)=>q?(label+' '+aliases).toLowerCase().includes(q):i<3),host=__studio33.$('commandResults');if(actions.length&&host.querySelector('p.hint'))host.replaceChildren();for(const[label,aliases,fn]of [...actions].reverse()){const b=__studio33.csText('button','','command-result');b.append(__studio33.csText('strong',label),__studio33.csText('small','Action · '+aliases));b.onclick=__studio33.$fn(()=>{__studio33.closeCommands();fn()},"()=>{closeCommands();fn()}","");host.prepend(b)}const buttons=[...host.querySelectorAll('button')];__studio33.commandIndex=Math.max(0,Math.min(__studio33.commandIndex,buttons.length-1));buttons.forEach(__studio33.$fn((b,i)=>b.classList.toggle('active',i===__studio33.commandIndex),"(b,i)=>b.classList.toggle('active',i===commandIndex)",""));__studio33.commandItems=buttons.map((b,i)=>['u25-action-'+i,b.textContent])},"function(){u25OldCommands();const q=$('commandSearch').value.trim().toLowerCase(),actions=u25PaletteActions.filter(([label,aliases],i)=>q?(label+' '+aliases).toLowerCase().includes(q):i<3),host=$('commandResults');if(actions.length&&host.querySelector('p.hint'))host.replaceChildren();for(const[label,aliases,fn]of [...actions].reverse()){const b=csText('button','','command-result');b.append(csText('strong',label),csText('small','Action · '+aliases));b.onclick=()=>{closeCommands();fn()};host.prepend(b)}const buttons=[...host.querySelectorAll('button')];commandIndex=Math.max(0,Math.min(commandIndex,buttons.length-1));buttons.forEach((b,i)=>b.classList.toggle('active',i===commandIndex));commandItems=buttons.map((b,i)=>['u25-action-'+i,b.textContent])}","");
}],
[3285,function initialize_3285(__studio33){
__studio33.$('commandSearch').placeholder='Find tools, settings or actions';
}],
[3286,function initialize_3286(__studio33){
__studio33.$('commandSearch').setAttribute('aria-label','Find tools, settings or actions');
}],
[3287,function initialize_3287(__studio33){
__studio33.$('commandSearch').onkeydown=__studio33.$fn(e=>{const buttons=[...__studio33.$('commandResults').querySelectorAll('button')];if(!buttons.length)return;if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();__studio33.commandIndex=e.key==='Home'?0:e.key==='End'?buttons.length-1:(__studio33.commandIndex+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons.forEach(__studio33.$fn((b,i)=>b.classList.toggle('active',i===__studio33.commandIndex),"(b,i)=>b.classList.toggle('active',i===commandIndex)",""));buttons[__studio33.commandIndex].scrollIntoView({block:'nearest'})}else if(e.key==='Enter'){e.preventDefault();buttons[__studio33.commandIndex]?.click()}},"e=>{const buttons=[...$('commandResults').querySelectorAll('button')];if(!buttons.length)return;if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();commandIndex=e.key==='Home'?0:e.key==='End'?buttons.length-1:(commandIndex+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons.forEach((b,i)=>b.classList.toggle('active',i===commandIndex));buttons[commandIndex].scrollIntoView({block:'nearest'})}else if(e.key==='Enter'){e.preventDefault();buttons[commandIndex]?.click()}}","");
}],
[3288,function initialize_3288(__studio33){
__studio33.backupKeys.push(__studio33.u25Key);
}],
[3289,function initialize_3289(__studio33){
__studio33.u24StorageGroups.push(['profiles','Workspace profiles',[__studio33.u25Key]]);
}],
[3291,function initialize_3291(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.u25OldBackup();b.state[__studio33.u25Key]=__studio33.csClone(__studio33.u25State);return b},"function(){const b=u25OldBackup();b.state[u25Key]=csClone(u25State);return b}","");
}],
[3293,function initialize_3293(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.u25Key))b.state[__studio33.u25Key]=null;const valid=__studio33.u25OldValidate(b);if(valid.state[__studio33.u25Key])valid.state[__studio33.u25Key]=__studio33.u25Check(valid.state[__studio33.u25Key]);return valid},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,u25Key))b.state[u25Key]=null;const valid=u25OldValidate(b);if(valid.state[u25Key])valid.state[u25Key]=u25Check(valid.state[u25Key]);return valid}","");
}],
[3295,function initialize_3295(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.u25OldRestore(state);__studio33.u25State=state[__studio33.u25Key]?__studio33.u25Check(state[__studio33.u25Key]):__studio33.csClone(__studio33.u25Defaults);__studio33.u25ProfileUndo=null;__studio33.u25ProfileLinks.hidden=true;__studio33.u25ProfileRender();__studio33.u25RecoveryRefresh()},"function(state){u25OldRestore(state);u25State=state[u25Key]?u25Check(state[u25Key]):csClone(u25Defaults);u25ProfileUndo=null;u25ProfileLinks.hidden=true;u25ProfileRender();u25RecoveryRefresh()}","");
}],
[3296,function initialize_3296(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 22';
}],
[3297,function initialize_3297(__studio33){
__studio33.$('helpPanel').querySelector('p').textContent=__studio33.$('helpPanel').querySelector('p').textContent.replace(/^\d+ registered tool\/workspace entries/,Object.keys(__studio33.views).length+' registered tool/workspace entries');
}],
[3298,function initialize_3298(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Connected workspaces'),__studio33.csText('p','Find tool now searches settings and actions as well as tools. Options → Workspace tools opens reviewed result handoffs, workspace profiles, batch file processing, share/import setup and central session recovery. Handoffs and setup imports replace only reviewed inputs and never run a tool or send a request automatically. Salesforce starters extend the existing ID, SOQL, Composite and log tools.'));
}],
[3299,function initialize_3299(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:22,openTool:__studio33.$fn(id=>__studio33.openTab(id),"id=>openTab(id)","")});
}],
[3301,function initialize_3301(__studio33){
__studio33.u25RecoveryReady=true;
}],
[3302,function initialize_3302(__studio33){
__studio33.u25ProfileRender();
}],
[3303,function initialize_3303(__studio33){
__studio33.u25RecoveryRefresh();
}],
[3304,function initialize_3304(__studio33){
__studio33.u25ReadFragment();
}],
[3305,function initialize_3305(__studio33){
for(const dialog of [__studio33.u25Hub,__studio33.u25Profiles,__studio33.u25Transfer,__studio33.u25Share,__studio33.u25Setup,__studio33.u25Recovery,__studio33.u25Batch])dialog.addEventListener('close',__studio33.$fn(()=>{if(__studio33.u19Modal()){__studio33.u19SyncExit();return}let focus=__studio33.u19DialogFocus.get(dialog);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});__studio33.u19StopEditing();__studio33.u19SyncExit()},"()=>{if(u19Modal()){u19SyncExit();return}let focus=u19DialogFocus.get(dialog);const closed=focus?.closest('details:not([open])');if(closed)focus=closed.querySelector(':scope>summary');if(focus&&u19Visible(focus))focus.focus({preventScroll:true});u19StopEditing();u19SyncExit()}",""));
}],
[3306,function initialize_3306(__studio33){
for(const id of ['u22ResetConfirm','u24StorageClear','u24RecordsApply']){const button=__studio33.$(id),old=button.onclick;button.onclick=__studio33.$fn(function(...args){const permitted=id==='u22ResetConfirm'?(__studio33.u22ResetScope.value!=='all'||__studio33.u22ResetInput.value.trim()==='RESET'):id==='u24StorageClear'?__studio33.u24StorageConfirm.checked&&__studio33.u24StorageSelection().length>0:!!__studio33.u24RecordsPending&&__studio33.u24RecordsConfirm.checked;if(permitted){clearTimeout(__studio33.u25DraftTimer);__studio33.u25Dirty.clear()}return old.apply(this,args)},"function(...args){const permitted=id==='u22ResetConfirm'?(u22ResetScope.value!=='all'||u22ResetInput.value.trim()==='RESET'):id==='u24StorageClear'?u24StorageConfirm.checked&&u24StorageSelection().length>0:!!u24RecordsPending&&u24RecordsConfirm.checked;if(permitted){clearTimeout(u25DraftTimer);u25Dirty.clear()}return old.apply(this,args)}","")}
}],
[3308,function initialize_3308(__studio33){
__studio33.invalidateLogs=__studio33.$fn(function(){__studio33.u25OldInvalidateLogs();__studio33.u25LimitOutput.replaceChildren()},"function(){u25OldInvalidateLogs();u25LimitOutput.replaceChildren()}","");
}],
[3309,function initialize_3309(__studio33){
clearTimeout(__studio33.wsTimer);
}],
[3317,function initialize_3317(__studio33){
__studio33.u24RecordsFile.onchange=__studio33.$fn(async()=>{const ticket=++__studio33.u26RecordsTicket,file=__studio33.u24RecordsFile.files[0];__studio33.u24RecordsPending=null;__studio33.u24RecordsConfirm.checked=false;__studio33.u24RecordsApply.disabled=true;__studio33.u24RecordsStatus.textContent=file?'Reading saved records…':'Choose a saved-record file.';if(!file)return;try{if(file.size>12*1024*1024)throw Error('Saved-record export limit: 12 MiB');const text=await file.text();if(ticket!==__studio33.u26RecordsTicket)return;const records=__studio33.u24RecordsCheck(JSON.parse(text)),keys=Object.keys(records),existing=keys.filter(k=>localStorage.getItem(k)!==null).length;__studio33.u24RecordsPending=records;__studio33.u24RecordsStatus.textContent='Reviewed '+keys.length+' Calc Studio records; '+existing+' matching records will be replaced. Other records stay. Applying reloads the app and releases unsaved input/results.';__studio33.u24RecordsApply.disabled=!keys.length}catch(e){if(ticket===__studio33.u26RecordsTicket)__studio33.u24RecordsStatus.textContent=e.message}},"async()=>{const ticket=++u26RecordsTicket,file=u24RecordsFile.files[0];u24RecordsPending=null;u24RecordsConfirm.checked=false;u24RecordsApply.disabled=true;u24RecordsStatus.textContent=file?'Reading saved records…':'Choose a saved-record file.';if(!file)return;try{if(file.size>12*1024*1024)throw Error('Saved-record export limit: 12 MiB');const text=await file.text();if(ticket!==u26RecordsTicket)return;const records=u24RecordsCheck(JSON.parse(text)),keys=Object.keys(records),existing=keys.filter(k=>localStorage.getItem(k)!==null).length;u24RecordsPending=records;u24RecordsStatus.textContent='Reviewed '+keys.length+' Calc Studio records; '+existing+' matching records will be replaced. Other records stay. Applying reloads the app and releases unsaved input/results.';u24RecordsApply.disabled=!keys.length}catch(e){if(ticket===u26RecordsTicket)u24RecordsStatus.textContent=e.message}}","");
}],
[3332,function initialize_3332(__studio33){
__studio33.u26TextPager.id='u26TextPager';
}],
[3339,function initialize_3339(__studio33){
__studio33.u24PolishEditor=__studio33.$fn(function(editor){if(__studio33.u26Polished.has(editor))return;__studio33.u26PolishOld(editor);__studio33.u26Polished.add(editor)},"function(editor){if(u26Polished.has(editor))return;u26PolishOld(editor);u26Polished.add(editor)}","");
}],
[3340,function initialize_3340(__studio33){
document.addEventListener('visibilitychange',__studio33.$fn(()=>{if(document.hidden){if(__studio33.u24TaskTimer){clearInterval(__studio33.u24TaskTimer);__studio33.u24TaskTimer=0}if(__studio33.u20PointerFrame){cancelAnimationFrame(__studio33.u20PointerFrame);__studio33.u20PointerFrame=0}__studio33.u20PointerPoint=null}else if(__studio33.editionWorkers.size)__studio33.u24TaskClock()},"()=>{if(document.hidden){if(u24TaskTimer){clearInterval(u24TaskTimer);u24TaskTimer=0}if(u20PointerFrame){cancelAnimationFrame(u20PointerFrame);u20PointerFrame=0}u20PointerPoint=null}else if(editionWorkers.size)u24TaskClock()}",""));
}],
[3342,function initialize_3342(__studio33){
window.addEventListener('resize',__studio33.$fn(()=>{if(__studio33.u26PerformanceFrame)return;__studio33.u26PerformanceFrame=requestAnimationFrame(__studio33.$fn(()=>{__studio33.u26PerformanceFrame=0;__studio33.u19Root.dataset.performance=__studio33.u24Effective()?'on':'off'},"()=>{u26PerformanceFrame=0;u19Root.dataset.performance=u24Effective()?'on':'off'}",""))},"()=>{if(u26PerformanceFrame)return;u26PerformanceFrame=requestAnimationFrame(()=>{u26PerformanceFrame=0;u19Root.dataset.performance=u24Effective()?'on':'off'})}",""),{passive:true});
}],
[3343,function initialize_3343(__studio33){
__studio33.u26Booting=false;
}],
[3345,function initialize_3345(__studio33){
__studio33.renderTextDiff();
}],
[3346,function initialize_3346(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:23,openTool:__studio33.$fn(id=>__studio33.openTab(id),"id=>openTab(id)","")});
}],
[3347,function initialize_3347(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 23';
}],
[3348,function initialize_3348(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Existing-tool accuracy & performance'),__studio33.csText('p','Short basic calculator expressions use exact fraction arithmetic before a finite Number result; scientific functions remain approximations. Statistics use scaled compensated sums. Text comparisons align exactly with linear-space frontiers and bounded pages. Large mapping, masking, JSONPath, Composite, response analysis and test-pack runs use cancellable workers. Blank CSV records are retained. Table selection and simple unfiltered cell edits preserve controls. Background timing and theme work pause while hidden.'));
}],
[3349,function initialize_3349(__studio33){
__studio33.CI_HTML = "<div class=\"ci-studio\">\n  <div class=\"ci-actions ci-source\">\n    <button id=\"ciUpload\">Open image</button><button id=\"ciPhoto\">Take photo</button><button id=\"ciCamera\">Live camera</button><button id=\"ciUnload\">Clear studio</button><button id=\"ciStopProcessing\" hidden>Cancel operation</button>\n    <input id=\"ciFile\" type=\"file\" accept=\"image/png,image/jpeg,image/webp,image/bmp,image/avif,image/gif\" hidden>\n    <input id=\"ciCapture\" type=\"file\" accept=\"image/*\" capture=\"environment\" hidden>\n  </div>\n  <p id=\"camerastudioStatus\" class=\"hint developer-status\" role=\"status\">Open a photo or screenshot to begin. Images stay in this tab; they are not saved in browser backups.</p>\n  <div class=\"ci-tabs\" role=\"tablist\" aria-label=\"Camera and image workflows\">\n    <button data-ci-mode=\"edit\" role=\"tab\" aria-controls=\"ciEdit\" aria-selected=\"true\">Edit image</button>\n    <button data-ci-mode=\"extract\" role=\"tab\" aria-controls=\"ciExtract\" aria-selected=\"false\">Extract text</button>\n    <button data-ci-mode=\"qr\" role=\"tab\" aria-controls=\"ciQR\" aria-selected=\"false\">QR scan</button>\n    <button data-ci-mode=\"pdf\" role=\"tab\" aria-controls=\"ciPDF\" aria-selected=\"false\">Photos to PDF</button>\n    <button data-ci-mode=\"batch\" role=\"tab\" aria-controls=\"ciBatch\" aria-selected=\"false\">Batch images</button>\n  </div>\n  <div id=\"ciLive\" hidden>\n    <div class=\"ci25-camera-frame\"><video id=\"ciVideo\" playsinline muted aria-label=\"Live camera preview\"></video><div class=\"ci25-framing\" aria-hidden=\"true\"></div><output id=\"ci25Countdown\" aria-live=\"polite\"></output></div>\n    <div class=\"ci-actions\"><label>Camera <select id=\"ciFacing\"><option value=\"environment\">Rear</option><option value=\"user\">Front</option></select></label><label>Countdown <select id=\"ci25Delay\"><option value=\"0\">Off</option><option value=\"3\">3 seconds</option><option value=\"5\">5 seconds</option></select></label><button id=\"ciSnap\">Capture &amp; review</button><button id=\"ciLiveQR\">Scan live QR</button><button id=\"ciStopCamera\">Stop camera</button></div>\n    <p class=\"hint\">Live access requires browser camera permission. Take photo / Open image remain available when live access is blocked.</p>\n  </div>\n  <div id=\"ciImageArea\">\n    <div class=\"ci-actions ci-history\"><button id=\"ciUndo\" disabled>Undo</button><button id=\"ciRedo\" disabled>Redo</button><button id=\"ciReset\" disabled>Reset to original</button><label><input id=\"ciBefore\" type=\"checkbox\"> Show original</label><button id=\"ciZoomOut\">− Zoom</button><button id=\"ciZoomIn\">+ Zoom</button><button id=\"ciFit\">Fit</button><label><input id=\"ci25Compare\" type=\"checkbox\"> Compare original</label><label id=\"ci25SplitLabel\" hidden>Divider <input id=\"ci25Split\" type=\"range\" min=\"0\" max=\"100\" value=\"50\" aria-label=\"Before and after divider\"></label><span id=\"ciDimensions\" class=\"hint\">No image</span></div>\n    <div id=\"ciViewport\" class=\"ci-viewport\"><canvas id=\"ciCanvas\" width=\"1\" height=\"1\" tabindex=\"0\" aria-label=\"Image preview. Drag for the selected crop, corner or annotation tool.\"></canvas><p id=\"ciEmpty\">Your image preview appears here</p></div>\n    <p id=\"ciPreviewNote\" class=\"hint\">Touch or drag the preview to select an area. Numeric controls are available for precise editing.</p>\n  </div>\n  <section id=\"ciEdit\" role=\"tabpanel\" class=\"ci-mode\">\n    <label class=\"ci-operation\">Editing tool <select id=\"ciOperation\"><option value=\"crop\">Crop & resize</option><option value=\"document\">Document scanner</option><option value=\"annotate\">Annotate & redact</option><option value=\"adjust\">Photo adjustments</option><option value=\"compress\">Image size target</option></select></label>\n    <div data-ci-op=\"crop\">\n      <div class=\"ci-fields\"><label>Aspect ratio <select id=\"ciRatio\"><option value=\"free\">Free</option><option value=\"1\">Square 1:1</option><option value=\"1.3333333333333333\">4:3</option><option value=\"1.7777777777777777\">16:9</option><option value=\"0.75\">Portrait 3:4</option><option value=\"0.5625\">Portrait 9:16</option></select></label><label>Left px <input id=\"ciCropX\" type=\"number\" min=\"0\" value=\"0\"></label><label>Top px <input id=\"ciCropY\" type=\"number\" min=\"0\" value=\"0\"></label><label>Crop width px <input id=\"ciCropW\" type=\"number\" min=\"1\" value=\"1\"></label><label>Crop height px <input id=\"ciCropH\" type=\"number\" min=\"1\" value=\"1\"></label></div>\n      <div class=\"ci-actions\"><button id=\"ciCrop\">Apply crop</button><button id=\"ciSelectionReset\">Select whole image</button><button id=\"ciLeft\">↶ Rotate left</button><button id=\"ciRight\">↷ Rotate right</button><button id=\"ciFlipX\">Flip horizontal</button><button id=\"ciFlipY\">Flip vertical</button></div>\n      <div class=\"ci-fields\"><label>Output width px <input id=\"ciWidth\" type=\"number\" min=\"1\" max=\"8192\" value=\"1\"></label><label>Output height px <input id=\"ciHeight\" type=\"number\" min=\"1\" max=\"8192\" value=\"1\"></label><label><input id=\"ciLock\" type=\"checkbox\" checked> Keep proportions</label></div><button id=\"ciResize\">Apply resize</button><div class=\"ci-fields\"><label>Straighten angle ° <input id=\"ci25Angle\" type=\"number\" min=\"-45\" max=\"45\" step=\"0.1\" value=\"0\"></label><label>Angle preview <input id=\"ci25AngleSlider\" type=\"range\" min=\"-45\" max=\"45\" step=\"0.1\" value=\"0\" aria-label=\"Straighten angle\"></label></div><div class=\"ci-actions\"><button id=\"ci25Straighten\">Apply fine rotation</button><button id=\"ci25AngleCancel\">Cancel angle preview</button></div>\n    </div>\n    <div data-ci-op=\"document\" hidden>\n      <p class=\"hint\">Drag the four labelled corners around the document, in order: top-left, top-right, bottom-right, bottom-left. Or enter their coordinates below.</p>\n      <div id=\"ciCorners\" class=\"ci-fields\"></div>\n      <div class=\"ci-fields\"><label>Output width px <input id=\"ciDocW\" type=\"number\" min=\"16\" max=\"3000\" value=\"1200\"></label><label>Output height px <input id=\"ciDocH\" type=\"number\" min=\"16\" max=\"3000\" value=\"1600\"></label><label>Finish <select id=\"ciDocFinish\"><option value=\"color\">Colour</option><option value=\"gray\">Grayscale</option><option value=\"bw\">Black & white</option></select></label><label>Contrast % <input id=\"ciDocContrast\" type=\"number\" min=\"0\" max=\"200\" value=\"120\"></label></div>\n      <div class=\"ci-actions\"><button id=\"ciDocument\">Straighten document</button><button id=\"ciCornerReset\">Reset corners</button><button id=\"ci25Suggest\">Suggest document corners</button></div>\n    <p id=\"ci25CornerInfo\" class=\"hint\" role=\"status\">Suggested corners are a starting point. Check all four before straightening.</p></div>\n    <div data-ci-op=\"annotate\" hidden>\n      <div class=\"ci-fields\"><label>Mark <select id=\"ciMark\"><option value=\"arrow\">Arrow</option><option value=\"rectangle\">Rectangle</option><option value=\"highlight\">Highlight</option><option value=\"text\">Text</option><option value=\"redact\">Solid redaction</option><option value=\"pen\">Freehand pen</option></select></label><label>Colour <input id=\"ciColor\" type=\"color\" value=\"#ff3b30\"></label><label>Stroke / text size px <input id=\"ciStroke\" type=\"number\" min=\"1\" max=\"200\" value=\"6\"></label><label>Text <input id=\"ciText\" maxlength=\"500\" placeholder=\"Label or note\"></label></div>\n      <details><summary>Place mark using coordinates</summary><div class=\"ci-fields\"><label>Start x <input id=\"ciMarkX\" type=\"number\" value=\"0\" min=\"0\"></label><label>Start y <input id=\"ciMarkY\" type=\"number\" value=\"0\" min=\"0\"></label><label>End x <input id=\"ciMarkX2\" type=\"number\" value=\"100\" min=\"0\"></label><label>End y <input id=\"ciMarkY2\" type=\"number\" value=\"100\" min=\"0\"></label></div><button id=\"ciAddMark\">Apply mark</button></details>\n      <details id=\"ci25MarksPanel\"><summary>Edit existing annotations</summary><label>Annotation <select id=\"ci25MarkList\"><option value=\"\">No editable annotations</option></select></label><p class=\"hint\">Select a mark, then change its coordinates, colour, size or text above. A selected mark can also be dragged to move it.</p><div class=\"ci-actions\"><button id=\"ci25MarkUpdate\">Update selected</button><button id=\"ci25MarkDelete\">Delete selected</button><button id=\"ci25MarkNew\">Draw new mark</button></div><p id=\"ci25MarkInfo\" class=\"hint\">Up to 100 editable marks. Crop, rotate or pixel adjustments flatten the current annotation layer; Undo can restore it.</p></details><p class=\"hint\">Redactions are opaque black blocks. Export contains flattened edited pixels; the original remains available in this tab until Clear studio.</p>\n    </div>\n    <div data-ci-op=\"adjust\" hidden>\n      <div class=\"ci-fields\"><label>Brightness % <input id=\"ciBrightness\" type=\"number\" min=\"0\" max=\"200\" value=\"100\"></label><label>Contrast % <input id=\"ciContrast\" type=\"number\" min=\"0\" max=\"200\" value=\"100\"></label><label>Saturation % <input id=\"ciSaturation\" type=\"number\" min=\"0\" max=\"200\" value=\"100\"></label><label>Grayscale % <input id=\"ciGray\" type=\"number\" min=\"0\" max=\"100\" value=\"0\"></label><label>Sharpen <select id=\"ciSharpen\"><option value=\"0\">Off</option><option value=\"0.5\">Gentle</option><option value=\"1\">Strong</option></select></label></div>\n      <div class=\"ci-actions\"><button id=\"ciAdjust\">Apply adjustments</button><button id=\"ciAdjustReset\">Reset adjustment controls</button><button id=\"ci25AdjustCancel\">Cancel preview</button></div>\n    </div>\n    <div data-ci-op=\"compress\" hidden>\n      <div class=\"ci-fields\"><label>Size target <select id=\"ciTarget\"><option value=\"200\">Under 200 KB</option><option value=\"500\">Under 500 KB</option><option value=\"1000\">Under 1 MB</option><option value=\"custom\">Custom KB</option></select></label><label>Custom KB <input id=\"ciCustomKB\" type=\"number\" min=\"1\" max=\"20000\" value=\"300\"></label><label>Format <select id=\"ciTargetFormat\"><option value=\"image/jpeg\">JPEG</option><option value=\"image/webp\">WebP</option></select></label><label>Minimum quality % <input id=\"ciMinQuality\" type=\"number\" min=\"5\" max=\"90\" value=\"35\"></label><label><input id=\"ciDownsize\" type=\"checkbox\" checked> Reduce dimensions if needed</label></div>\n      <button id=\"ciCompress\">Find size & preview</button><p class=\"hint\">KB means 1,000 bytes. JPEG replaces transparency with the selected export background. Dimensions may shrink when enabled; the actual output is checked against the limit.</p>\n    </div>\n    <div class=\"ci-export\"><details><summary>Export presets &amp; size</summary><div class=\"ci-fields\"><label>Preset <select id=\"ci25Preset\"></select></label><label>Preset name <input id=\"ci25PresetName\" maxlength=\"60\" placeholder=\"My export preset\"></label><label>Maximum export edge px · 0 = unchanged <input id=\"ci25MaxEdge\" type=\"number\" min=\"0\" max=\"8192\" value=\"0\"></label><label>JPEG background <input id=\"ci25Background\" type=\"color\" value=\"#ffffff\"></label></div><div class=\"ci-actions\"><button id=\"ci25PresetApply\">Use preset</button><button id=\"ci25PresetSave\">Save current settings</button><button id=\"ci25PresetDelete\">Delete saved preset</button></div><p id=\"ci25PresetInfo\" class=\"hint\" role=\"status\">Presets save export/PDF settings only, without photos or text.</p></details><div class=\"ci-fields\"><label>Export format <select id=\"ciFormat\"><option value=\"image/png\">PNG · preserve transparency</option><option value=\"image/jpeg\">JPEG · selected background</option><option value=\"image/webp\">WebP</option></select></label><label>Quality % <input id=\"ciQuality\" type=\"number\" min=\"5\" max=\"100\" value=\"90\"></label><label>Filename <input id=\"ciName\" value=\"edited-image\" maxlength=\"80\"></label></div><div class=\"ci-actions\"><button id=\"ciExportPreview\">Prepare export</button><button id=\"ciDownload\" disabled>Download image</button><button id=\"ci25ShareImage\" disabled>Share image</button><button id=\"ciAddPage\">Add edited image to PDF</button></div><div id=\"ciExportResult\" hidden><img id=\"ciExportImage\" alt=\"Actual encoded output preview\"><p id=\"ciExportInfo\" class=\"hint\" role=\"status\"></p><dl id=\"ci25Verification\" class=\"ci25-verification\"></dl></div></div>\n  </section>\n  <section id=\"ciExtract\" role=\"tabpanel\" class=\"ci-mode\" hidden>\n    <p class=\"hint\">English printed text and numbers are bundled for offline extraction. Drag the preview to select a text area, or use the whole image. Straighten your photo in Edit image first if needed. Review every extracted value; this is not reliable handwriting recognition or automatic table reconstruction.</p>\n    <div class=\"ci-fields\"><label>Recognition layout <select id=\"ciOCRLayout\"><option value=\"3\">Automatic page</option><option value=\"6\">Single text block</option><option value=\"7\">Single line</option><option value=\"11\">Scattered text</option></select></label><label><input id=\"ciOCRNumbers\" type=\"checkbox\"> Numbers & arithmetic symbols only</label></div>\n    <div class=\"ci-actions\"><button id=\"ciOCR\">Extract selected area</button><button id=\"ciOCRWhole\">Use whole image</button><button id=\"ciCancel\">Cancel processing</button></div>\n    <details id=\"ci25OCRReview\"><summary>Review recognised words on the photo</summary><div class=\"ci-fields\"><label><input id=\"ci25OCRShow\" type=\"checkbox\" checked> Show word boxes</label><label>Flag confidence below <input id=\"ci25OCRThreshold\" type=\"number\" min=\"0\" max=\"100\" value=\"80\"></label><label>Word to review <select id=\"ci25OCRWord\"></select></label><label>Correction <input id=\"ci25OCRCorrection\" maxlength=\"500\"></label></div><div class=\"ci-actions\"><button id=\"ci25OCRCorrect\">Apply word correction</button><button id=\"ci25OCRPrev\">Previous word</button><button id=\"ci25OCRNext\">Next word</button></div><p id=\"ci25OCRWordInfo\" class=\"hint\" role=\"status\">Extract text to see word positions. Boxes are review aids, not proof of accuracy.</p></details><label class=\"field\"><span>Review and correct extracted text</span><textarea id=\"ciOCRText\" rows=\"7\" spellcheck=\"false\" aria-label=\"Reviewed extracted text\"></textarea></label>\n    <div class=\"ci-actions\"><button id=\"ciCopyText\">Copy text</button><button id=\"ciTextDownload\">Download text</button><button id=\"ciNumbers\">Extract number tokens</button><button id=\"ciSend\">Review send to tool…</button></div><p id=\"ciOCRInfo\" class=\"hint\" role=\"status\">No extraction yet.</p>\n  </section>\n  <section id=\"ciQR\" role=\"tabpanel\" class=\"ci-mode\" hidden>\n    <p class=\"hint\">Open a QR screenshot or use Live camera. Scan results are shown before you choose an action; links never open automatically.</p>\n    <div class=\"ci-actions\"><button id=\"ciScanQR\">Scan edited image</button><button id=\"ciQRLiveStart\">Start live QR scan</button><button id=\"ciQRCopy\" disabled>Copy decoded text</button><button id=\"ciQROpen\" disabled>Open reviewed web link</button></div>\n    <label class=\"field\"><span>Decoded content</span><textarea id=\"ciQRText\" rows=\"4\" readonly aria-label=\"Decoded QR content\"></textarea></label><p id=\"ciQRInfo\" class=\"hint\" role=\"status\">No QR scanned.</p>\n  </section>\n  <section id=\"ciPDF\" role=\"tabpanel\" class=\"ci-mode\" hidden>\n    <div class=\"ci-actions\"><button id=\"ciPDFFilesButton\">Add photos</button><input id=\"ciPDFFiles\" type=\"file\" accept=\"image/*\" multiple hidden><button id=\"ciPDFClear\">Clear pages</button></div>\n    <div class=\"ci-fields\"><label>Page size <select id=\"ciPageSize\"><option value=\"a4\">A4</option><option value=\"letter\">Letter</option><option value=\"image\">Fit image size</option></select></label><label>Orientation <select id=\"ciPageOrientation\"><option value=\"auto\">Auto per photo</option><option value=\"portrait\">Portrait</option><option value=\"landscape\">Landscape</option></select></label><label>Margin mm <input id=\"ciMargin\" type=\"number\" min=\"0\" max=\"40\" value=\"10\"></label><label>Photo quality % <input id=\"ciPDFQuality\" type=\"number\" min=\"20\" max=\"100\" value=\"85\"></label></div>\n    <p class=\"hint\">Use Edit page for crop, fine rotation and document cleanup. Save replaces that queued page; Cancel keeps it unchanged.</p><div id=\"ciPages\" class=\"ci-pages\"></div><details><summary>Apply common cleanup to all queued pages</summary><div class=\"ci-fields\"><label>Crop inset % per edge <input id=\"ci25PageInset\" type=\"number\" min=\"0\" max=\"25\" value=\"0\"></label><label>Straighten angle ° <input id=\"ci25PageAngle\" type=\"number\" min=\"-45\" max=\"45\" step=\"0.1\" value=\"0\"></label><label>Finish <select id=\"ci25PageFinish\"><option value=\"color\">Colour</option><option value=\"gray\">Grayscale</option><option value=\"bw\">Black &amp; white</option></select></label><label>Contrast % <input id=\"ci25PageContrast\" type=\"number\" min=\"0\" max=\"200\" value=\"100\"></label></div><button id=\"ci25PagesClean\">Apply cleanup to all pages</button><p class=\"hint\">Uses the same relative inset and angle for every page. Different camera perspectives should be corrected individually. Changes are published only after every page succeeds.</p></details><div class=\"ci-actions\"><button id=\"ciBuildPDF\">Build PDF</button><button id=\"ciDownloadPDF\" disabled>Download PDF</button><button id=\"ci25SharePDF\" disabled>Share PDF</button></div><p id=\"ciPDFInfo\" class=\"hint\" role=\"status\">Add up to 30 photos, then reorder and rotate pages.</p>\n  </section>\n  <section id=\"ciBatch\" role=\"tabpanel\" class=\"ci-mode\" hidden>\n    <label class=\"field\"><span>Images to process · up to 30 files / 60 MiB total</span><input id=\"ciBatchFiles\" type=\"file\" accept=\"image/*\" multiple></label>\n    <div class=\"ci-fields\"><label>Maximum width px <input id=\"ciBatchW\" type=\"number\" min=\"16\" max=\"8192\" value=\"1600\"></label><label>Maximum height px <input id=\"ciBatchH\" type=\"number\" min=\"16\" max=\"8192\" value=\"1600\"></label><label>Format <select id=\"ciBatchFormat\"><option value=\"image/jpeg\">JPEG</option><option value=\"image/webp\">WebP</option><option value=\"image/png\">PNG</option></select></label><label>Quality % <input id=\"ciBatchQuality\" type=\"number\" min=\"5\" max=\"100\" value=\"85\"></label><label>Size target KB · 0 = off <input id=\"ciBatchKB\" type=\"number\" min=\"0\" max=\"20000\" value=\"0\"></label><label>Watermark text <input id=\"ciWatermark\" maxlength=\"100\" placeholder=\"Optional\"></label></div>\n    <div class=\"ci-actions\"><button id=\"ci25BatchPreview\">Preview first image</button><button id=\"ciRunBatch\">Run batch</button><button id=\"ciCancelBatch\">Cancel batch</button><button id=\"ciDownloadZIP\" disabled>Download ZIP & report</button><button id=\"ciBatchClear\">Clear files & results</button></div><progress id=\"ciBatchProgress\" max=\"1\" value=\"0\" aria-label=\"Image batch progress\"></progress><p id=\"ciBatchInfo\" class=\"hint\" role=\"status\">Each image is processed separately. A report records dimensions, actual size and any failures.</p><div id=\"ci25BatchPreviewResult\" hidden><img id=\"ci25BatchImage\" alt=\"Actual encoded first-image preview\"><p id=\"ci25BatchPreviewInfo\" class=\"hint\" role=\"status\"></p></div><div id=\"ciBatchResults\"></div>\n  </section>\n</div>\n\n<details class=\"ci-help\"><summary>Limits &amp; help</summary><p class=\"hint\">Raster images: up to 20 MiB and 20 megapixels; the working image is reduced to at most 16 megapixels. Exports support up to 8192 px per side and 16 megapixels. Undo retains up to 12 states / 64 MiB; Reset to original remains available. OCR supports English printed text, processes at most 6 megapixels and stops after 120 seconds. Document output supports up to 3000 px per side. PDF: 30 photo pages / 60 MiB retained. Batch: 30 source images / 60 MiB total / 64 MiB combined output. GIF uses a still frame. Browser image codecs determine available formats.</p><p class=\"hint\">Live camera needs permission and a secure context. Use Take photo or Open image if access is unavailable. QR reads one code per image. PDF pages contain flattened photos, without a searchable OCR text layer. Review extracted values before use. Clear studio releases retained photos, edits, text and camera access; it does not clear other tools.</p></details>\n";

}],
[3351,function initialize_3351(__studio33){
__studio33.ciPanel.querySelector('.u17-advanced')?.remove();
}],
[3352,function initialize_3352(__studio33){
__studio33.ciPanel.insertAdjacentHTML('beforeend',__studio33.CI_HTML);
}],
[3427,function initialize_3427(__studio33){
;
}],
[3429,function initialize_3429(__studio33){
__studio33.ciControlVisibility();
}],
[3487,function initialize_3487(__studio33){
document.addEventListener('visibilitychange',__studio33.$fn(()=>{if(document.hidden)__studio33.ciStopCamera()},"()=>{if(document.hidden)ciStopCamera()}",""));
}],
[3488,function initialize_3488(__studio33){
__studio33.u23SearchAliases.camerastudio='camera photo image studio ocr extract document scanner perspective crop resize rotate compress target size annotate redact qr scan pdf batch watermark';
}],
[3559,function initialize_3559(__studio33){
__studio33.backupKeys.push(__studio33.ci25PresetKey);
}],
[3560,function initialize_3560(__studio33){
__studio33.u22SettingKeys.push(__studio33.ci25PresetKey);
}],
[3561,function initialize_3561(__studio33){
__studio33.u24StorageGroups.push(['camera-presets','Camera export presets',[__studio33.ci25PresetKey]]);
}],
[3568,function initialize_3568(__studio33){
__studio33.ci25PresetRender();
}],
[3588,function initialize_3588(__studio33){
__studio33.ci25CaptureImage.alt='Captured photo review';
}],
[3601,function initialize_3601(__studio33){
__studio33.ci25PageBar.hidden=true;
}],
[3630,function initialize_3630(__studio33){
__studio33.ci25MarksUI();
}],
[3631,function initialize_3631(__studio33){
__studio33.ci25OCRList();
}],
[3643,function initialize_3643(__studio33){
__studio33.CI26_HTML = "<template id=\"ci26ProjectUI\"><details class=\"ci26-details\"><summary>Editing project &amp; resource usage</summary><div class=\"ci-actions\"><button id=\"ci26ProjectSave\">Save editing project</button><button id=\"ci26ProjectOpen\">Open editing project</button><input id=\"ci26ProjectFile\" type=\"file\" accept=\".json,application/json\" hidden></div><p class=\"hint\">Projects contain original pixels and editable annotations, including areas hidden by redactions. Share flattened image/PDF exports when you want covered content removed. Projects do not include camera access, queued photos or edit history.</p><p id=\"ci26Dirty\" role=\"status\" class=\"hint\">No editing project loaded.</p><p id=\"ci26Memory\" class=\"hint\">Open an image to see estimated image-buffer memory.</p></details></template>\n<template id=\"ci26ResizeUI\"><details class=\"ci26-details\"><summary>Fit, Fill &amp; Pad resize</summary><div class=\"ci-fields\"><label>Resize behaviour <select id=\"ci26ResizeMode\"><option value=\"exact\">Exact dimensions · existing behaviour</option><option value=\"fit\">Fit within dimensions</option><option value=\"fill\">Fill dimensions · crop overflow</option><option value=\"pad\">Pad to dimensions</option></select></label><label>Padding colour <input id=\"ci26PadColor\" type=\"color\" value=\"#ffffff\"></label><label><input id=\"ci26PadTransparent\" type=\"checkbox\"> Transparent padding</label></div><div class=\"ci-actions\"><button id=\"ci26ResizePreview\">Preview resize</button><button id=\"ci26ResizeCancel\">Cancel resize preview</button></div><p id=\"ci26ResizeInfo\" class=\"hint\">Use output width/height above. Fit preserves proportions; Fill crops centrally; Pad keeps the whole image. Apply resize commits the previewed operation.</p></details></template>\n<template id=\"ci26CornerUI\"><details class=\"ci26-details\"><summary>Precision corner magnifier</summary><div class=\"ci-fields\"><label>Corner <select id=\"ci26Corner\"><option value=\"0\">1 · Top-left</option><option value=\"1\">2 · Top-right</option><option value=\"2\">3 · Bottom-right</option><option value=\"3\">4 · Bottom-left</option></select></label><label>Fine step px <input id=\"ci26CornerStep\" type=\"number\" min=\"1\" max=\"100\" value=\"1\"></label><label>Magnification <select id=\"ci26LoupeZoom\"><option value=\"4\">4×</option><option value=\"8\">8×</option><option value=\"16\">16×</option></select></label></div><canvas id=\"ci26Loupe\" width=\"192\" height=\"192\" aria-label=\"Magnified document corner\"></canvas><div class=\"ci-actions\"><button id=\"ci26CornerLeft\">← Left</button><button id=\"ci26CornerRight\">Right →</button><button id=\"ci26CornerUp\">↑ Up</button><button id=\"ci26CornerDown\">Down ↓</button></div><p class=\"hint\">The crosshair marks the exact corner. Fine-step buttons work with touch, keyboard and TV focus navigation.</p></details></template>\n<template id=\"ci26LayerUI\"><details class=\"ci26-details\"><summary>Layer order, lock &amp; alignment</summary><div class=\"ci-actions\"><button id=\"ci26MarkBack\">Move backward</button><button id=\"ci26MarkFront\">Move forward</button><button id=\"ci26MarkDuplicate\">Duplicate selected</button><button id=\"ci26MarkLock\">Lock / unlock selected</button></div><div class=\"ci-fields\"><label>Align selected to image <select id=\"ci26Align\"><option value=\"left\">Left</option><option value=\"center\">Horizontal centre</option><option value=\"right\">Right</option><option value=\"top\">Top</option><option value=\"middle\">Vertical centre</option><option value=\"bottom\">Bottom</option></select></label></div><button id=\"ci26MarkAlign\">Align selected</button><p id=\"ci26LayerInfo\" class=\"hint\">Select a mark in Edit existing annotations. Locked marks keep their pixels and block move/update/delete until unlocked.</p></details></template>\n<template id=\"ci26TableUI\"><details id=\"ci26Table\" class=\"ci26-details\"><summary>Photo → editable table</summary><p class=\"hint\">Select the table area in the photo, mark row/column boundaries, extract, then correct every cell. All cells remain text, preserving leading zeros. Merged cells and irregular layouts require manual correction.</p><div class=\"ci-fields\"><label>Rows <input id=\"ci26Rows\" type=\"number\" min=\"1\" max=\"100\" value=\"3\"></label><label>Columns <input id=\"ci26Cols\" type=\"number\" min=\"1\" max=\"20\" value=\"3\"></label><label>Internal row boundaries · y px relative to selection <input id=\"ci26RowLines\" placeholder=\"Example: 60, 120\"></label><label>Internal column boundaries · x px relative to selection <input id=\"ci26ColLines\" placeholder=\"Example: 100, 250\"></label><label><input id=\"ci26GridShow\" type=\"checkbox\" checked> Show &amp; drag guides</label></div><div class=\"ci-actions\"><button id=\"ci26GridReset\">Make equal row/column guides</button><button id=\"ci26TableExtract\">Extract table cells</button><button id=\"ci26TableBlank\">Create blank review table</button><button id=\"ci26TableClear\">Clear reviewed table</button></div><div id=\"ci26TablePreview\" class=\"table-scroll\"></div><div class=\"ci-actions\"><button id=\"ci26TablePrev\">Previous rows</button><button id=\"ci26TableNext\">Next rows</button><span id=\"ci26TablePage\" class=\"hint\"></span></div><label><input id=\"ci26TableHeader\" type=\"checkbox\" checked> First row is column headings for Data Table</label><div class=\"ci-actions\"><button id=\"ci26TableCSV\">Download reviewed CSV</button><button id=\"ci26TableSend\">Review send to Data Table…</button></div><p id=\"ci26TableInfo\" class=\"hint\" role=\"status\">Up to 100 rows × 20 columns, 1,000 cells. The photo remains unchanged.</p></details></template>\n<template id=\"ci26DeskewUI\"><details class=\"ci26-details\"><summary>Suggest straightening from text</summary><button id=\"ci26Deskew\">Analyse text alignment</button><p id=\"ci26DeskewInfo\" class=\"hint\" role=\"status\">Suggests a correction within ±12° from printed text. Review the angle preview before Apply fine rotation.</p></details></template>\n<template id=\"ci26PDFUI\"><details class=\"ci26-details\"><summary>Searchable PDF text</summary><label><input id=\"ci26PDFSearchable\" type=\"checkbox\"> Include reviewed OCR text layer</label><p class=\"hint\">Use Extract/review text beside each queued page, correct words, then confirm review. Every page must have a current reviewed result before building a searchable PDF; blank pages can be confirmed as having no text. Rotating or editing a page requires extracting its text again. English/Latin text supported by the bundled PDF font; unsupported characters are reported before export.</p><p id=\"ci26PDFTextInfo\" class=\"hint\" role=\"status\">Searchable text is optional. Image-only PDFs remain available.</p></details></template>\n";

}],
[3646,function initialize_3646(__studio33){
__studio33.ci26Templates.innerHTML=__studio33.CI26_HTML;
}],
[3745,function initialize_3745(__studio33){
__studio33.ci26PDFImage.alt='Page being reviewed for searchable text';
}],
[3752,function initialize_3752(__studio33){
__studio33.ci26PDFAck.type='checkbox';
}],
[3772,function initialize_3772(__studio33){
__studio33.ciPanel.addEventListener('input',e=>{if(e.target.matches('input,textarea,select'))e.target.removeAttribute('aria-invalid')});
}],
[3777,function initialize_3777(__studio33){
document.addEventListener('invalid',e=>{e.target.setAttribute('aria-invalid','true');e.target.setAttribute('aria-description',e.target.validationMessage)},true);
}],
[3778,function initialize_3778(__studio33){
document.addEventListener('input',e=>{if(e.target.matches?.('[aria-invalid=true]')&&e.target.validity?.valid){e.target.removeAttribute('aria-invalid');e.target.removeAttribute('aria-description')}});
}],
[3792,function initialize_3792(__studio33){
__studio33.ci26Checklist.append(__studio33.csText('p','Edition 26 development checks cover the following release criteria. This checklist does not run tests or certify this browser/device.'));
}],
[3809,function initialize_3809(__studio33){
__studio33.ci26TableRender();
}],
[3810,function initialize_3810(__studio33){
__studio33.ci26Dirty();
}],
[3818,function initialize_3818(__studio33){
__studio33.ci26Dirty();
}],
[3820,function initialize_3820(__studio33){
__studio33.u24EnsureEditors(__studio33.ciPanel);
}],
[3821,function initialize_3821(__studio33){
for(const e of __studio33.ciPanel.querySelectorAll('button')){e.type='button';e.classList.add('small');if(e.hasAttribute('data-ci-mode'))__studio33.u17SetRole(e,'utility')}
}],
[3822,function initialize_3822(__studio33){
__studio33.ciButtons();
}],
[3823,function initialize_3823(__studio33){
__studio33.ciPDFPages();
}],
[3824,function initialize_3824(__studio33){
__studio33.ciMode('edit');
}],
[3825,function initialize_3825(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 26';
}],
[3826,function initialize_3826(__studio33){
__studio33.$('helpPanel').querySelector('p').textContent=__studio33.$('helpPanel').querySelector('p').textContent.replace(/^\d+ registered tool\/workspace entries/,Object.keys(__studio33.views).length+' registered tool/workspace entries');
}],
[3827,function initialize_3827(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:26});
}],
[3857,function initialize_3857(__studio33){
window.addEventListener('afterprint',__studio33.crPrintCleanup);
}],
[3880,function initialize_3880(__studio33){
__studio33.crTransferTarget.setAttribute('aria-label','Resume experience destination');
}],
[3904,function initialize_3904(__studio33){
Object.assign(__studio33.u23SearchAliases,{careerresume:'resume cv curriculum vitae professional profile',careermatcher:'career job description keywords requirements resume comparison',careerachievements:'achievement accomplishment impact evidence metrics',careerinterview:'interview preparation questions answers project examples',careerskills:'career skill matrix gap learning checklist target role',careertemplates:'professional documents introduction update handover appreciation cover letter'});
}],
[3906,function initialize_3906(__studio33){
__studio33.studioDescription=__studio33.$fn(function(id){return({careerresume:'Build and print a structured resume from your supplied details.',careermatcher:'Compare literal job requirements with resume wording and evidence.',careerachievements:'Draft reviewed achievement statements using your facts.',careerinterview:'Organise questions, answers, project examples and preparation status.',careerskills:'Compare self-rated current/target skills and export learning actions.',careertemplates:'Fill, review and print professional introductions, updates and handovers.'})[id]||__studio33.crDescriptionOld(id)},"function(id){return({careerresume:'Build and print a structured resume from your supplied details.',careermatcher:'Compare literal job requirements with resume wording and evidence.',careerachievements:'Draft reviewed achievement statements using your facts.',careerinterview:'Organise questions, answers, project examples and preparation status.',careerskills:'Compare self-rated current/target skills and export learning actions.',careertemplates:'Fill, review and print professional introductions, updates and handovers.'})[id]||crDescriptionOld(id)}","");
}],
[3908,function initialize_3908(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 27';
}],
[3909,function initialize_3909(__studio33){
__studio33.$('helpPanel').querySelector('p').textContent=__studio33.$('helpPanel').querySelector('p').textContent.replace(/^\d+ registered tool\/workspace entries/,Object.keys(__studio33.views).length+' registered tool/workspace entries');
}],
[3910,function initialize_3910(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:27});
}],
[3911,function initialize_3911(__studio33){
document.title='Calc Studio — Career edition 27';
}],
[3912,function initialize_3912(__studio33){
__studio33.ci26Checklist.querySelector('p').textContent='Edition 27 release criteria include existing tools and Career & Professional Documents. This checklist does not run tests or certify this browser/device.';
}],
[3913,function initialize_3913(__studio33){
__studio33.ci26List.append(__studio33.csText('li','Career document printing, literal comparison, reviewed handoffs, project validation and privacy cleanup pass'));
}],
[3914,function initialize_3914(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Career & Professional Documents'),__studio33.csText('p','Resume Builder, Job Description Matcher, Achievement Builder, Interview Preparation Organizer, Skills Matrix and Professional Document Templates share one in-memory project. Add/save entry records before downloading the project. No career data is automatically stored in app backups. Literal match counts are not an ATS score. Build/review documents before exporting; Print / Save as PDF uses the browser print dialog.'));
}],
[3921,function initialize_3921(__studio33){
Object.assign(__studio33.views,__studio33.n28Names);
}],
[3924,function initialize_3924(__studio33){
__studio33.studioDescription=__studio33.$fn(id=>__studio33.n28Descriptions[id]||__studio33.n28OldDescription(id),"id=>n28Descriptions[id]||n28OldDescription(id)","");
}],
[3925,function initialize_3925(__studio33){
for(const[id,name]of Object.entries(__studio33.n28Names)){
 const panel=__studio33.$(id);panel?.setAttribute('aria-label',name);const h=panel?.querySelector(':scope>.panel-heading h1,:scope>.panel-heading h2');if(h)h.textContent=name;
}
}],
[3926,function initialize_3926(__studio33){
for(const[id,text]of Object.entries(__studio33.n28Descriptions)){const p=__studio33.$(id),intro=p?.querySelector(':scope>.cs-intro');if(intro)intro.textContent=text;}
}],
[3927,function initialize_3927(__studio33){
for(const key of Object.keys(__studio33.u23Catalog))delete __studio33.u23Catalog[key];
}],
[3928,function initialize_3928(__studio33){
Object.assign(__studio33.u23Catalog,__studio33.n28Categories,{saved:{label:'My Work & Settings',tools:[...__studio33.n28Shared]}});
}],
[3929,function initialize_3929(__studio33){
__studio33.u23Homes.clear();
}],
[3930,function initialize_3930(__studio33){
for(const id of [...Object.keys(__studio33.n28HomeCategory),...__studio33.n28Shared])__studio33.u23Homes.add(id);
}],
[3934,function initialize_3934(__studio33){
try{__studio33.n28State=__studio33.n28Check(__studio33.storage.get(__studio33.n28Key,__studio33.n28Defaults()))}catch{__studio33.n28State=__studio33.n28Defaults()}
}],
[3939,function initialize_3939(__studio33){
window.addEventListener('pagehide',__studio33.n28Flush);
}],
[3941,function initialize_3941(__studio33){
__studio33.u23Category=__studio33.$fn(function(id){const home=__studio33.u23Home(id);return __studio33.n28HomeCategory[home]||'saved'},"function(id){const home=u23Home(id);return n28HomeCategory[home]||'saved'}","");
}],
[3942,function initialize_3942(__studio33){
__studio33.categoryForTool=__studio33.u23Category;
}],
[3946,function initialize_3946(__studio33){
__studio33.u23Manage.querySelector('p').textContent='Choose workspaces for the main dropdowns. Unchecked workspaces keep their subject category and remain available through Find tool, My Work and existing links. Saved content is kept.';
}],
[3947,function initialize_3947(__studio33){
__studio33.u23ExtraNote.textContent='Optional workspace · use Options → Manage tools to include it in its subject dropdown.';
}],
[3949,function initialize_3949(__studio33){
__studio33.u23ManageRender=__studio33.$fn(function(){__studio33.n28OldManageRender();const count=__studio33.u23Manage.querySelector('[role=status]');if(count)count.textContent=count.textContent.replace('main workspaces','visible workspaces').replace('in Extra utilities','optional workspaces');},"function(){n28OldManageRender();const count=u23Manage.querySelector('[role=status]');if(count)count.textContent=count.textContent.replace('main workspaces','visible workspaces').replace('in Extra utilities','optional workspaces');}","");
}],
[3951,function initialize_3951(__studio33){
__studio33.n28Work.append(__studio33.csText('p','Open saved projects, formulas and links, or return to a favorite or recent feature. Opening an item does not restore or overwrite your inputs.'),__studio33.n28WorkBody);
}],
[3956,function initialize_3956(__studio33){
__studio33.$('commandToggle').after(__studio33.n28WorkButton);
}],
[3958,function initialize_3958(__studio33){
__studio33.u21OptionsPanel.prepend(__studio33.n28SettingsButton);
}],
[3960,function initialize_3960(__studio33){
__studio33.n28ModeSearch.type='search';
}],
[3961,function initialize_3961(__studio33){
__studio33.n28ModeSearch.id='n28FeatureSearch';
}],
[3962,function initialize_3962(__studio33){
__studio33.n28ModeSearch.placeholder='Filter feature names';
}],
[3963,function initialize_3963(__studio33){
__studio33.n28ModeSearch.setAttribute('aria-label','Filter workspace features');
}],
[3964,function initialize_3964(__studio33){
__studio33.n28ModeList.id='n28FeatureList';
}],
[3965,function initialize_3965(__studio33){
__studio33.n28ModeDialog.append(__studio33.n28ModeSearch,__studio33.n28ModeList);
}],
[3978,function initialize_3978(__studio33){
__studio33.n28ModeSearch.oninput=__studio33.n28FeatureRender;
}],
[3983,function initialize_3983(__studio33){
__studio33.n28SearchCount.id='n28SearchCount';
}],
[3985,function initialize_3985(__studio33){
__studio33.$('commandSearch').after(__studio33.n28SearchCount);
}],
[3987,function initialize_3987(__studio33){
__studio33.$('commandSearch').placeholder='Find workspaces, features or actions';
}],
[3988,function initialize_3988(__studio33){
__studio33.$('commandSearch').setAttribute('aria-label','Find workspaces, features or actions');
}],
[3998,function initialize_3998(__studio33){
__studio33.n28OldCiOperation();
}],
[3999,function initialize_3999(__studio33){
__studio33.n28OldCiMode(__studio33.n28State.camera.mode);
}],
[4001,function initialize_4001(__studio33){
__studio33.renderFavorites=__studio33.$fn(function(){__studio33.n28OldFavorites();if(__studio33.n28Work.open)__studio33.n28WorkRender()},"function(){n28OldFavorites();if(n28Work.open)n28WorkRender()}","");
}],
[4003,function initialize_4003(__studio33){
__studio33.renderRecents=__studio33.$fn(function(){__studio33.n28OldRecents();if(__studio33.n28Work.open)__studio33.n28WorkRender()},"function(){n28OldRecents();if(n28Work.open)n28WorkRender()}","");
}],
[4005,function initialize_4005(__studio33){
__studio33.backupKeys.push(__studio33.n28Key);
}],
[4006,function initialize_4006(__studio33){
__studio33.u22SettingKeys.push(__studio33.n28Key);
}],
[4009,function initialize_4009(__studio33){
__studio33.$('u22ResetConfirm').onclick=__studio33.$fn(function(...args){const scope=__studio33.u22ResetScope.value;if(scope==='all'&&__studio33.u22ResetInput.value.trim()!=='RESET')return __studio33.n28OldReset.apply(this,args);if(scope==='cache')__studio33.n28Flush();else __studio33.n28StopSave();return __studio33.n28OldReset.apply(this,args);},"function(...args){const scope=u22ResetScope.value;if(scope==='all'&&u22ResetInput.value.trim()!=='RESET')return n28OldReset.apply(this,args);if(scope==='cache')n28Flush();else n28StopSave();return n28OldReset.apply(this,args);}","");
}],
[4011,function initialize_4011(__studio33){
__studio33.$('u24StorageClear').onclick=__studio33.$fn(function(...args){const keys=__studio33.u24StorageSelection();if(keys.length&&__studio33.u24StorageConfirm.checked){if(keys.includes(__studio33.n28Key))__studio33.n28StopSave();else __studio33.n28Flush();}return __studio33.n28OldCleanup.apply(this,args);},"function(...args){const keys=u24StorageSelection();if(keys.length&&u24StorageConfirm.checked){if(keys.includes(n28Key))n28StopSave();else n28Flush();}return n28OldCleanup.apply(this,args);}","");
}],
[4013,function initialize_4013(__studio33){
__studio33.$('u24RecordsApply').onclick=__studio33.$fn(function(...args){if(__studio33.u24RecordsPending&&__studio33.u24RecordsConfirm.checked){if(Object.hasOwn(__studio33.u24RecordsPending,__studio33.n28Key))__studio33.n28StopSave();else __studio33.n28Flush();}return __studio33.n28OldRecordsApply.apply(this,args);},"function(...args){if(u24RecordsPending&&u24RecordsConfirm.checked){if(Object.hasOwn(u24RecordsPending,n28Key))n28StopSave();else n28Flush();}return n28OldRecordsApply.apply(this,args);}","");
}],
[4015,function initialize_4015(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.n28OldBackup();b.state[__studio33.n28Key]=__studio33.csClone(__studio33.n28State);return b;},"function(){const b=n28OldBackup();b.state[n28Key]=csClone(n28State);return b;}","");
}],
[4017,function initialize_4017(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.n28Key))b.state[__studio33.n28Key]=null;const result=__studio33.n28OldValidate(b);if(result.state[__studio33.n28Key])result.state[__studio33.n28Key]=__studio33.n28Check(result.state[__studio33.n28Key]);return result;},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,n28Key))b.state[n28Key]=null;const result=n28OldValidate(b);if(result.state[n28Key])result.state[n28Key]=n28Check(result.state[n28Key]);return result;}","");
}],
[4020,function initialize_4020(__studio33){
for(const d of [__studio33.n28Work,__studio33.n28ModeDialog])d.addEventListener('close',__studio33.$fn(()=>{const focus=__studio33.u19DialogFocus.get(d);if(focus&&__studio33.u19Visible(focus))focus.focus({preventScroll:true});__studio33.u19SyncExit()},"()=>{const focus=u19DialogFocus.get(d);if(focus&&u19Visible(focus))focus.focus({preventScroll:true});u19SyncExit()}",""));
}],
[4021,function initialize_4021(__studio33){
for(const[home,id]of Object.entries(__studio33.n28State.last))if(__studio33.v12Suites[home])__studio33.v12Last[home]=id;
}],
[4022,function initialize_4022(__studio33){
document.querySelector('label[for=workspacePicker]>span').textContent='Workspace / tool';
}],
[4023,function initialize_4023(__studio33){
__studio33.u23MenuApply();
}],
[4024,function initialize_4024(__studio33){
__studio33.n28DecorateCurrent();
}],
[4025,function initialize_4025(__studio33){
document.title='Calc Studio — Organized edition 28';
}],
[4027,function initialize_4027(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 28';
}],
[4028,function initialize_4028(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Categories, workspaces and features'),__studio33.csText('p','Eight subject categories group all tools. My Work opens saved projects, formulas, links, favorites and recent features. Formatting & backup is in Options. Browse features filters the current workspace; Find tool searches names, categories and features and opens the matching surface without running it. Optional workspaces keep their subject home and remain searchable. Workspace tabs and camera feature choices are remembered without storing their inputs. Existing tool IDs, backups and transformation handlers are retained.'));
}],
[4033,function initialize_4033(__studio33){
try{__studio33.cs29State=__studio33.cs29Check(__studio33.storage.get(__studio33.cs29Key,__studio33.cs29Defaults()))}catch{__studio33.cs29State=__studio33.cs29Defaults()}
}],
[4035,function initialize_4035(__studio33){
__studio33.cs29Settings.append(__studio33.csText('h3','Workspace appearance'));
}],
[4038,function initialize_4038(__studio33){
__studio33.cs29Favorites.type='checkbox';
}],
[4039,function initialize_4039(__studio33){
__studio33.cs29Favorites.id='cs29Favorites';
}],
[4040,function initialize_4040(__studio33){
__studio33.cs29FavoritesRow.append(__studio33.cs29Favorites,__studio33.csText('span','Show favorites & recent tools above the workspace'));
}],
[4041,function initialize_4041(__studio33){
__studio33.cs29Settings.append(__studio33.cs29FavoritesRow,__studio33.csText('p','Mobile keeps 48 px touch targets; TV keeps larger controls and readable text. My Work always provides favorites and recent tools. The existing topbar and Expand/Compact shell switch retain their arrangement and behaviour.','hint'));
}],
[4042,function initialize_4042(__studio33){
__studio33.u19RemoteBox.before(__studio33.cs29Settings);
}],
[4047,function initialize_4047(__studio33){
__studio33.cs29Density.onchange=__studio33.$fn(()=>{__studio33.cs29State.density=__studio33.cs29Density.value;__studio33.cs29Save()},"()=>{cs29State.density=cs29Density.value;cs29Save()}","");
}],
[4048,function initialize_4048(__studio33){
__studio33.cs29Favorites.onchange=__studio33.$fn(()=>{__studio33.cs29State.favorites=__studio33.cs29Favorites.checked;__studio33.cs29Save()},"()=>{cs29State.favorites=cs29Favorites.checked;cs29Save()}","");
}],
[4049,function initialize_4049(__studio33){
for(const id of Object.keys(__studio33.views))__studio33.$(id)?.classList.add('cs29-surface');
}],
[4051,function initialize_4051(__studio33){
__studio33.cs29Dialogs();
}],
[4052,function initialize_4052(__studio33){
document.addEventListener('focusin',__studio33.$fn(e=>{if(e.target.closest('dialog'))__studio33.cs29Dialogs()},"e=>{if(e.target.closest('dialog'))cs29Dialogs()}",""));
}],
[4053,function initialize_4053(__studio33){
__studio33.u19Settings.addEventListener('close',__studio33.$fn(()=>{for(const editor of __studio33.$(__studio33.activeView)?.querySelectorAll('textarea')||[]){if(!__studio33.u19Visible(editor))continue;const parent=editor.parentNode,next=editor.nextSibling,focused=document.activeElement===editor,start=editor.selectionStart,end=editor.selectionEnd,direction=editor.selectionDirection,x=editor.scrollLeft,y=editor.scrollTop;editor.remove();parent.insertBefore(editor,next);if(focused)editor.focus({preventScroll:true});editor.setSelectionRange(start,end,direction);editor.scrollLeft=x;editor.scrollTop=y;}__studio33.cs29Schedule()},"()=>{for(const editor of $(activeView)?.querySelectorAll('textarea')||[]){if(!u19Visible(editor))continue;const parent=editor.parentNode,next=editor.nextSibling,focused=document.activeElement===editor,start=editor.selectionStart,end=editor.selectionEnd,direction=editor.selectionDirection,x=editor.scrollLeft,y=editor.scrollTop;editor.remove();parent.insertBefore(editor,next);if(focused)editor.focus({preventScroll:true});editor.setSelectionRange(start,end,direction);editor.scrollLeft=x;editor.scrollTop=y;}cs29Schedule()}",""));
}],
[4057,function initialize_4057(__studio33){
__studio33.v13CloseEditor=__studio33.$fn(function(){const editor=__studio33.v13Focused?.editor;__studio33.cs29OldClose();const r=editor&&__studio33.cs29Fields.get(editor.id);if(r&&r.anchor.isConnected){const gutter=editor.closest('.u15-numbered');if(!gutter&&editor.parentElement===r.head)r.anchor.after(editor);else if(!gutter&&r.head.contains(editor))r.anchor.after(editor);if(r.head.contains(__studio33.v13Editors.get(editor.id)?.search))r.head.after(__studio33.v13Editors.get(editor.id).search);}__studio33.cs29Schedule()},"function(){const editor=v13Focused?.editor;cs29OldClose();const r=editor&&cs29Fields.get(editor.id);if(r&&r.anchor.isConnected){const gutter=editor.closest('.u15-numbered');if(!gutter&&editor.parentElement===r.head)r.anchor.after(editor);else if(!gutter&&r.head.contains(editor))r.anchor.after(editor);if(r.head.contains(v13Editors.get(editor.id)?.search))r.head.after(v13Editors.get(editor.id).search);}cs29Schedule()}","");
}],
[4059,function initialize_4059(__studio33){
__studio33.u24PolishEditor=__studio33.$fn(function(editor){const tools=__studio33.v13Editors.get(editor.id)?.tools;let out;if(tools&&!__studio33.cs29PolishedTools.has(tools)){out=__studio33.cs29OldPolish(editor);__studio33.cs29PolishedTools.add(tools);}if(editor.closest('.cs29-surface'))__studio33.cs29Field(editor);return out;},"function(editor){const tools=v13Editors.get(editor.id)?.tools;let out;if(tools&&!cs29PolishedTools.has(tools)){out=cs29OldPolish(editor);cs29PolishedTools.add(tools);}if(editor.closest('.cs29-surface'))cs29Field(editor);return out;}","");
}],
[4061,function initialize_4061(__studio33){
for(const[home,r]of __studio33.n28FeatureControls){const bar=__studio33.csText('div','','cs29-modesbar'),button=r.row.querySelector('button');r.row.before(bar);bar.append(r.tabs,button);button.classList.add('cs29-feature-button');button.textContent='Features';button.setAttribute('aria-label','Browse '+__studio33.views[home]+' features');r.row.remove();__studio33.cs29ModeBars.set(home,bar);}
}],
[4062,function initialize_4062(__studio33){
__studio33.n28CommonSummaries.add('About');
}],
[4071,function initialize_4071(__studio33){
__studio33.u17Observer.disconnect();
}],
[4072,function initialize_4072(__studio33){
__studio33.u24EditorVisibility.disconnect();
}],
[4075,function initialize_4075(__studio33){
document.addEventListener('toggle',__studio33.$fn(e=>{if(e.target.tagName==='DETAILS'&&e.target.open&&e.target.closest('.cs29-surface'))__studio33.cs29Schedule()},"e=>{if(e.target.tagName==='DETAILS'&&e.target.open&&e.target.closest('.cs29-surface'))cs29Schedule()}",""),true);
}],
[4079,function initialize_4079(__studio33){
__studio33.u19Apply=__studio33.$fn(function(){__studio33.cs29OldApply();__studio33.cs29Apply();},"function(){cs29OldApply();cs29Apply();}","");
}],
[4080,function initialize_4080(__studio33){
__studio33.backupKeys.push(__studio33.cs29Key);
}],
[4081,function initialize_4081(__studio33){
__studio33.u22SettingKeys.push(__studio33.cs29Key);
}],
[4084,function initialize_4084(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const b=__studio33.cs29OldBackup();b.state[__studio33.cs29Key]=__studio33.csClone(__studio33.cs29State);return b;},"function(){const b=cs29OldBackup();b.state[cs29Key]=csClone(cs29State);return b;}","");
}],
[4086,function initialize_4086(__studio33){
__studio33.validateBackup=__studio33.$fn(function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,__studio33.cs29Key))b.state[__studio33.cs29Key]=null;const valid=__studio33.cs29OldValidate(b);if(valid.state[__studio33.cs29Key])valid.state[__studio33.cs29Key]=__studio33.cs29Check(valid.state[__studio33.cs29Key]);return valid;},"function(data){const b={...data,state:{...data?.state}};if(!Object.hasOwn(b.state,cs29Key))b.state[cs29Key]=null;const valid=cs29OldValidate(b);if(valid.state[cs29Key])valid.state[cs29Key]=cs29Check(valid.state[cs29Key]);return valid;}","");
}],
[4088,function initialize_4088(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.cs29OldRestore(state);__studio33.cs29State=state[__studio33.cs29Key]?__studio33.cs29Check(state[__studio33.cs29Key]):__studio33.cs29Defaults();__studio33.cs29Apply();__studio33.cs29Prepare();__studio33.cs29Observe();},"function(state){cs29OldRestore(state);cs29State=state[cs29Key]?cs29Check(state[cs29Key]):cs29Defaults();cs29Apply();cs29Prepare();cs29Observe();}","");
}],
[4089,function initialize_4089(__studio33){
__studio33.cs29Apply();
}],
[4090,function initialize_4090(__studio33){
__studio33.cs29Prepare();
}],
[4091,function initialize_4091(__studio33){
__studio33.cs29Observe();
}],
[4092,function initialize_4092(__studio33){
document.title='Calc Studio — Compact edition 29';
}],
[4093,function initialize_4093(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:29,openTool:__studio33.$fn(id=>__studio33.openTab(id),"id=>openTab(id)",""),workspaceUI:__studio33.$fn(()=>({version:1,...__studio33.csClone(__studio33.cs29State),observedTool:__studio33.activeView,coalescedFramePending:!!__studio33.cs29Frame,trackedScrollViews:__studio33.cs29Scrolls.size}),"()=>({version:1,...csClone(cs29State),observedTool:activeView,coalescedFramePending:!!cs29Frame,trackedScrollViews:cs29Scrolls.size})","")});
}],
[4094,function initialize_4094(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 29';
}],
[4095,function initialize_4095(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Compact workspace controls'),__studio33.csText('p','The existing topbar is retained. Display → Workspace appearance selects Compact or Comfortable and the optional favorites/recent strip. Feature browsing shares a row with tabs. Editor labels and tools share a toolbar; Undo, Redo and Expand use labelled accessible icons. Status lines combine task state with the current validation message. Named advanced panels are grouped without adding disclosure levels. UI observation follows the active workspace and updates are coalesced per frame; uploaded files, editor values and transformations keep their original handlers.'));
}],
[4106,function initialize_4106(__studio33){
for(const[id,title]of Object.entries(__studio33.cs30Names))__studio33.cs30Heading(id,title);
}],
[4110,function initialize_4110(__studio33){
__studio33.$('n28Browse-camerastudio')?.remove();
}],
[4113,function initialize_4113(__studio33){
for(const key of Object.keys(__studio33.n28HomeCategory))delete __studio33.n28HomeCategory[key];
}],
[4114,function initialize_4114(__studio33){
for(const[key,c]of Object.entries(__studio33.n28Categories))for(const home of c.tools)__studio33.n28HomeCategory[home]=key;
}],
[4115,function initialize_4115(__studio33){
for(const key of Object.keys(__studio33.u23Catalog))delete __studio33.u23Catalog[key];
}],
[4116,function initialize_4116(__studio33){
Object.assign(__studio33.u23Catalog,__studio33.n28Categories,{saved:{label:'My Work & Settings',tools:__studio33.n28Shared}});
}],
[4117,function initialize_4117(__studio33){
__studio33.u23Homes.clear();
}],
[4118,function initialize_4118(__studio33){
for(const id of [...Object.keys(__studio33.n28HomeCategory),...__studio33.n28Shared])__studio33.u23Homes.add(id);
}],
[4123,function initialize_4123(__studio33){
__studio33.u23IsExtra=__studio33.$fn(function(id){return __studio33.u23State.hidden.includes(__studio33.u23Home(id))||(id!==__studio33.u23Home(id)&&(__studio33.u23State.hiddenModes||[]).includes(id));},"function(id){return u23State.hidden.includes(u23Home(id))||(id!==u23Home(id)&&(u23State.hiddenModes||[]).includes(id));}","");
}],
[4127,function initialize_4127(__studio33){
__studio33.u23MenuApply=__studio33.$fn(function(){if(__studio33.u23State.version!==2||!Array.isArray(__studio33.u23State.hiddenModes))__studio33.u23State=__studio33.u23Check(__studio33.u23State);__studio33.cs30BaseMenuApply();for(const[home,record]of __studio33.n28FeatureControls)for(const b of record.tabs.querySelectorAll('[data-mode]')){const id=b.dataset.mode;b.hidden=id!==__studio33.activeView&&__studio33.u23State.hiddenModes.includes(id);b.dataset.cs30Optional=String(__studio33.u23State.hiddenModes.includes(id));}__studio33.n28Index=null;},"function(){if(u23State.version!==2||!Array.isArray(u23State.hiddenModes))u23State=u23Check(u23State);cs30BaseMenuApply();for(const[home,record]of n28FeatureControls)for(const b of record.tabs.querySelectorAll('[data-mode]')){const id=b.dataset.mode;b.hidden=id!==activeView&&u23State.hiddenModes.includes(id);b.dataset.cs30Optional=String(u23State.hiddenModes.includes(id));}n28Index=null;}","");
}],
[4131,function initialize_4131(__studio33){
__studio33.u23ManageButton.onclick=__studio33.$fn(()=>{__studio33.u21Options.open=false;__studio33.u23ManageDraft=new Set(__studio33.u23State.hidden);__studio33.cs30ManageFeatures=new Set(__studio33.u23State.hiddenModes);__studio33.u23ManageSearch.value='';__studio33.u23ManageRender();__studio33.u19OpenDialog(__studio33.u23Manage,__studio33.u19Layout==='tv'?__studio33.$('u23ManageClose'):__studio33.u23ManageSearch);},"()=>{u21Options.open=false;u23ManageDraft=new Set(u23State.hidden);cs30ManageFeatures=new Set(u23State.hiddenModes);u23ManageSearch.value='';u23ManageRender();u19OpenDialog(u23Manage,u19Layout==='tv'?$('u23ManageClose'):u23ManageSearch);}","");
}],
[4132,function initialize_4132(__studio33){
__studio33.$('u23ManageAll').onclick=__studio33.$fn(()=>{__studio33.u23ManageDraft.clear();__studio33.cs30ManageFeatures.clear();__studio33.u23ManageRender()},"()=>{u23ManageDraft.clear();cs30ManageFeatures.clear();u23ManageRender()}","");
}],
[4134,function initialize_4134(__studio33){
__studio33.$('u23ManageApply').onclick=__studio33.$fn(()=>{__studio33.u23State=__studio33.u23Check({version:2,hidden:[...__studio33.u23ManageDraft],hiddenModes:[...__studio33.cs30ManageFeatures],shell:__studio33.u23State.shell});__studio33.u23Save();__studio33.u23MenuApply();__studio33.u23Manage.close();},"()=>{u23State=u23Check({version:2,hidden:[...u23ManageDraft],hiddenModes:[...cs30ManageFeatures],shell:u23State.shell});u23Save();u23MenuApply();u23Manage.close();}","");
}],
[4136,function initialize_4136(__studio33){
__studio33.$('workspacePicker').onchange=__studio33.$fn(()=>__studio33.cs30OpenHome(__studio33.$('workspacePicker').value),"()=>cs30OpenHome($('workspacePicker').value)","");
}],
[4137,function initialize_4137(__studio33){
__studio33.$('categoryPicker').onchange=__studio33.$fn(()=>__studio33.cs30OpenHome(__studio33.toolCategories[__studio33.$('categoryPicker').value]?.tools[0]),"()=>cs30OpenHome(toolCategories[$('categoryPicker').value]?.tools[0])","");
}],
[4139,function initialize_4139(__studio33){
try{__studio33.n28State=__studio33.n28Check(__studio33.storage.get(__studio33.n28Key,__studio33.n28State));}catch{__studio33.n28State=__studio33.n28Defaults();}
}],
[4141,function initialize_4141(__studio33){
__studio33.n28OldCiOperation();
}],
[4142,function initialize_4142(__studio33){
__studio33.n28OldCiMode(__studio33.n28State.camera.mode);
}],
[4143,function initialize_4143(__studio33){
for(const[home,id]of Object.entries(__studio33.n28State.last))__studio33.v12Last[home]=id;
}],
[4144,function initialize_4144(__studio33){
Object.assign(__studio33.n28Descriptions,{imagestudio:'Camera capture, image editing, OCR, QR scanning, quick conversion, screenshot markup, contact sheets, photos to PDF and batch exports.',graph:'Plot functions and inspect numerical derivatives and integrals.',calculator:'Scientific and exact arithmetic, memory and amounts in words.',colors:'Color conversion, text contrast, image pixels and extracted palettes.',salesforce:'Salesforce ID conversion and SOQL formatting, with links to logs and Composite requests.',conversionworkspace:'Units, currency, feet/inches arithmetic, areas, volumes and saved conversions.',datetoolkit:'Date calculations, timestamps, business-day deadlines and calendar event exports.',careerdocuments:'Resume, job wording comparison, evidence-based achievements and professional templates.',careerpreparation:'Interview preparation records and a skills matrix with learning actions.'});
}],
[4145,function initialize_4145(__studio33){
for(const home of Object.keys(__studio33.cs30Groups)){const panel=__studio33.$(home),heading=panel.querySelector(':scope>.panel-heading');let intro=[...panel.querySelectorAll('.cs-intro')].find(e=>e.closest('section')===panel);if(!intro){intro=__studio33.csText('p','','cs-intro');}intro.textContent=__studio33.n28Descriptions[home]||__studio33.studioDescription(home);if(!intro.closest('.cs29-about')){heading.after(intro);__studio33.cs29AboutDone.delete(panel);}}
}],
[4156,function initialize_4156(__studio33){
;
}],
[4159,function initialize_4159(__studio33){
;
}],
[4167,function initialize_4167(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.cs30MountAll();__studio33.cs30OriginalRestore(state);__studio33.u23State=__studio33.u23Check(__studio33.u23State);__studio33.n28State=__studio33.n28Check(__studio33.n28State);__studio33.n28Index=null;__studio33.u23MenuApply();__studio33.openTab(__studio33.activeView);},"function(state){cs30MountAll();cs30OriginalRestore(state);u23State=u23Check(u23State);n28State=n28Check(n28State);n28Index=null;u23MenuApply();openTab(activeView);}","");
}],
[4171,function initialize_4171(__studio33){
__studio33.cs30Resource.append(__studio33.csText('summary','Workspace lifecycle & shared file limits'));
}],
[4173,function initialize_4173(__studio33){
__studio33.cs30ResourceStatus.id='cs30ResourceStatus';
}],
[4175,function initialize_4175(__studio33){
__studio33.cs30Resource.append(__studio33.cs30ResourceStatus,__studio33.u19Button('Refresh lifecycle details',__studio33.cs30ResourceRefresh));
}],
[4176,function initialize_4176(__studio33){
__studio33.u24Performance.append(__studio33.cs30Resource);
}],
[4177,function initialize_4177(__studio33){
__studio33.cs30Resource.addEventListener('toggle',__studio33.$fn(()=>{if(__studio33.cs30Resource.open)__studio33.cs30ResourceRefresh()},"()=>{if(cs30Resource.open)cs30ResourceRefresh()}",""));
}],
[4180,function initialize_4180(__studio33){
__studio33.cs30TemplateRoots.add(__studio33.cs30Compatibility.content);
}],
[4182,function initialize_4182(__studio33){
__studio33.u23MenuApply();
}],
[4183,function initialize_4183(__studio33){
__studio33.n28Index=null;
}],
[4185,function initialize_4185(__studio33){
document.title='Calc Studio — Consolidated edition 30';
}],
[4187,function initialize_4187(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 30';
}],
[4188,function initialize_4188(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Consolidated workspaces'),__studio33.csText('p','Existing features are migrated into fewer workspaces. All legacy tool links and project field IDs remain available. Camera & Image Studio includes the quick conversion, quick markup and contact-sheet workflows; image palettes are in Color & Accessibility. Career has Resume & Applications and Interview & Skills. Graph/calculus, conversions/measurements, dates/events, QR/barcodes and Salesforce IDs/SOQL are grouped. Amount in words is a Calculator feature and sample data is a Data Workbench mode. Workflow Builder, Regex and Cron are in Developer, API & Automation. Manage tools supports optional barcode features and Keyboard Tester. A single dispatcher mounts the current workspace and parks inactive interfaces while retaining their values and handlers. OCR remains fully bundled.'));
}],
[4215,function initialize_4215(__studio33){
__studio33.cs31Ready = false;

}],
[4216,function initialize_4216(__studio33){
__studio33.cs31Mounted = new Map();
__studio33.cs31Tasks = new Map();
__studio33.cs31Reports = new Map();
__studio33.cs31Key = 'calc-studio-tool-enhancements-v31';

}],
[4218,function initialize_4218(__studio33){
__studio33.cs31Settings = undefined;

}],
[4219,function initialize_4219(__studio33){
try{__studio33.cs31Settings=__studio33.cs31CheckSettings(__studio33.storage.get(__studio33.cs31Key,{version:1,presets:[]}));}catch{__studio33.cs31Settings={version:1,presets:[]};}
}],
[4220,function initialize_4220(__studio33){
__studio33.backupKeys.push(__studio33.cs31Key);
}],
[4221,function initialize_4221(__studio33){
__studio33.u22SettingKeys.push(__studio33.cs31Key);
}],
[4222,function initialize_4222(__studio33){
__studio33.u24StorageGroups.push(['tool-presets31','Media, PDF & validation presets',[__studio33.cs31Key]]);
}],
[4223,function initialize_4223(__studio33){
__studio33.cs31BackupOld = __studio33.backupSnapshot;

}],
[4224,function initialize_4224(__studio33){
__studio33.backupSnapshot=__studio33.$fn(function(){const data=__studio33.cs31BackupOld();data.state[__studio33.cs31Key]=__studio33.csClone(__studio33.cs31Settings);return data;},"function(){const data=cs31BackupOld();data.state[cs31Key]=csClone(cs31Settings);return data;}","");
}],
[4225,function initialize_4225(__studio33){
__studio33.cs31ValidateOld = __studio33.validateBackup;

}],
[4226,function initialize_4226(__studio33){
__studio33.validateBackup=__studio33.$fn(function(raw){const data={...raw,state:{...raw?.state}};if(!Object.hasOwn(data.state,__studio33.cs31Key))data.state[__studio33.cs31Key]=null;const valid=__studio33.cs31ValidateOld(data);if(valid.state[__studio33.cs31Key])valid.state[__studio33.cs31Key]=__studio33.cs31CheckSettings(valid.state[__studio33.cs31Key]);return valid;},"function(raw){const data={...raw,state:{...raw?.state}};if(!Object.hasOwn(data.state,cs31Key))data.state[cs31Key]=null;const valid=cs31ValidateOld(data);if(valid.state[cs31Key])valid.state[cs31Key]=cs31CheckSettings(valid.state[cs31Key]);return valid;}","");
}],
[4227,function initialize_4227(__studio33){
__studio33.cs31RestoreOld = __studio33.csRestoreSavedWork;

}],
[4228,function initialize_4228(__studio33){
__studio33.csRestoreSavedWork=__studio33.$fn(function(state){__studio33.cs31Settings=state[__studio33.cs31Key]?__studio33.cs31CheckSettings(state[__studio33.cs31Key]):{version:1,presets:[]};__studio33.cs31RestoreOld(state);for(const render of __studio33.cs31PresetRenders)render();},"function(state){cs31Settings=state[cs31Key]?cs31CheckSettings(state[cs31Key]):{version:1,presets:[]};cs31RestoreOld(state);for(const render of cs31PresetRenders)render();}","");
}],
[4243,function initialize_4243(__studio33){
__studio33.cs31WorkerSource = '';

}],
[4247,function initialize_4247(__studio33){
__studio33.cs31PresetRenders = new Set();

}],
[4260,function initialize_4260(__studio33){
__studio33.cs31CrCheckOld = __studio33.crCheck;

}],
[4262,function initialize_4262(__studio33){
__studio33.cs31CareerRefresh = ()=>{};

}],
[4263,function initialize_4263(__studio33){
__studio33.cs31CrResetOld = __studio33.crResetViews;

}],
[4264,function initialize_4264(__studio33){
__studio33.crResetViews=__studio33.$fn(function(){__studio33.cs31CrResetOld();queueMicrotask(__studio33.$fn(()=>__studio33.cs31CareerRefresh(),"()=>cs31CareerRefresh()",""));},"function(){cs31CrResetOld();queueMicrotask(()=>cs31CareerRefresh());}","");
}],
[4271,function initialize_4271(__studio33){
__studio33.cs31ImageBatchReport = null;

}],
[4273,function initialize_4273(__studio33){
__studio33.cs31Installers = {jsondiff:__studio33.cs31ReadableReport,textdiff:__studio33.cs31ReadableReport,reconciliation:__studio33.cs31ReadableReport,apiresponse:__studio33.cs31ResponseLinks,apiclient:__studio33.cs31Developer,salesforce:__studio33.cs31Developer,soql:__studio33.cs31Developer,schema:__studio33.cs31JSONTools,jsonformatter:__studio33.cs31JSONTools,dataworkbench:__studio33.cs31JSONTools,textutils:__studio33.cs31TextTools,markdown:__studio33.cs31TextTools,dates:__studio33.cs31DateTools,calculator:__studio33.cs31CalculateTools,finance:__studio33.cs31CalculateTools,graph:__studio33.cs31CalculateTools,converter:__studio33.cs31CalculateTools,colors:__studio33.cs31Colors,qr:__studio33.cs31QRTools,barcodes:__studio33.cs31QRTools,pdf:__studio33.cs31PDFTools,audioeditor:__studio33.cs31MediaTools,videoframes:__studio33.cs31MediaTools,careermatcher:__studio33.cs31CareerTools,formdesigner:__studio33.cs31FormTools,kanban:__studio33.cs31KanbanTools,archives:__studio33.cs31ArchiveTools};

}],
[4277,function initialize_4277(__studio33){
__studio33.cs31IndexOld = __studio33.n28BuildIndex;

}],
[4279,function initialize_4279(__studio33){
__studio33.cs31OpenFeatureOld = __studio33.n28FeatureOpen;

}],
[4280,function initialize_4280(__studio33){
__studio33.n28FeatureOpen=__studio33.$fn(function(entry){if(entry.cs31Detail){if(__studio33.n28ModeDialog.open)__studio33.n28ModeDialog.close();__studio33.closeCommands();__studio33.openTab(entry.id);const detail=__studio33.$(entry.cs31Detail);for(let p=detail?.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;if(detail){detail.open=true;detail.scrollIntoView({block:'nearest'});detail.querySelector('summary')?.focus();}return;}__studio33.cs31OpenFeatureOld(entry);},"function(entry){if(entry.cs31Detail){if(n28ModeDialog.open)n28ModeDialog.close();closeCommands();openTab(entry.id);const detail=$(entry.cs31Detail);for(let p=detail?.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;if(detail){detail.open=true;detail.scrollIntoView({block:'nearest'});detail.querySelector('summary')?.focus();}return;}cs31OpenFeatureOld(entry);}","");
}],
[4281,function initialize_4281(__studio33){
__studio33.cs31Ready=true;
}],
[4282,function initialize_4282(__studio33){
__studio33.cs31Prepare(__studio33.activeView);
}],
[4283,function initialize_4283(__studio33){
__studio33.n28Index=null;
}],
[4284,function initialize_4284(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,version:31,enhancements:__studio33.$fn(()=>({edition:31,features:__studio33.cs31Features.map(([tool,id,name])=>({tool,id,name})),mounted:[...__studio33.cs31Mounted.keys()],topbar:'unchanged',offlineOCR:'retained'}),"()=>({edition:31,features:cs31Features.map(([tool,id,name])=>({tool,id,name})),mounted:[...cs31Mounted.keys()],topbar:'unchanged',offlineOCR:'retained'})","")});
}],
[4285,function initialize_4285(__studio33){
document.title='Calc Studio — Tool improvements edition 31';
}],
[4286,function initialize_4286(__studio33){
__studio33.$('helpPanel').querySelector('h3').textContent='Calc Studio · edition 31';
}],
[4287,function initialize_4287(__studio33){
__studio33.$('helpPanel').append(__studio33.csText('h3','Existing-tool improvements'),__studio33.csText('p','Use Features or Find tool to locate new advanced workflows. Edition 31 adds sample-based Apex/schema generation, value-state inspection, response snapshots, reviewed text cleanup, timezone overlap, formulas and discontinuity review, batch conversions, palette analysis, printable codes, PDF content/size previews, media presets and resume versions. Existing Composite checks, logs, reconciliation, OCR review, table cleanup, form conditions and recurring Kanban tasks are retained. New settings presets participate in backup/reset; resume versions stay in the explicitly saved career project. The topbar layout and bundled offline OCR are unchanged.'));
}],
[4289,function initialize_4289(__studio33){
document.querySelector('.studio-menu-body').append(__studio33.cs32Button);
}],
[4302,function initialize_4302(__studio33){
window.addEventListener('message',__studio33.$fn(e=>{const s=__studio33.cs32Session;if(!s||s.port||e.source!==s.child||e.data?.type!=='cs-connection-ready'||e.data.token!==s.token)return;if(location.protocol!=='file:'&&e.origin!==location.origin)return;const c=new MessageChannel();s.port=c.port1;s.port.onmessage=__studio33.$fn(async e=>{const m=e.data;if(__studio33.cs32Session!==s||!m||typeof m.type!=='string')return;if(m.type==='ready')return;if(m.type==='detach'){__studio33.cs32Close();return}if(m.type==='revoke'){__studio33.cs32Revoke();return}if(m.type==='stop-results'){__studio33.cs32StopResults();return}if(typeof m.id!=='string'||m.id.length>80)return;try{let data;switch(m.type){case'permissions':data=await __studio33.cs32Grant();break;case'text':data=await __studio33.cs32Text(m.text);break;case'image':data=await __studio33.cs32Image(m);break;case'command':data=await __studio33.cs32Command(m);break;case'results':data=await __studio33.cs32Results();break;default:throw Error('Unsupported connection request')}if(__studio33.cs32Session===s)s.port.postMessage({type:'reply',id:m.id,data})}catch(error){if(__studio33.cs32Session===s)s.port.postMessage({type:'reply',id:m.id,error:error.message})}},"async e=>{const m=e.data;if(cs32Session!==s||!m||typeof m.type!=='string')return;if(m.type==='ready')return;if(m.type==='detach'){cs32Close();return}if(m.type==='revoke'){cs32Revoke();return}if(m.type==='stop-results'){cs32StopResults();return}if(typeof m.id!=='string'||m.id.length>80)return;try{let data;switch(m.type){case'permissions':data=await cs32Grant();break;case'text':data=await cs32Text(m.text);break;case'image':data=await cs32Image(m);break;case'command':data=await cs32Command(m);break;case'results':data=await cs32Results();break;default:throw Error('Unsupported connection request')}if(cs32Session===s)s.port.postMessage({type:'reply',id:m.id,data})}catch(error){if(cs32Session===s)s.port.postMessage({type:'reply',id:m.id,error:error.message})}}","");s.port.start();s.child.postMessage({type:'cs-connection-port',token:s.token},location.protocol==='file:'?'*':location.origin,[c.port2]);},"e=>{const s=cs32Session;if(!s||s.port||e.source!==s.child||e.data?.type!=='cs-connection-ready'||e.data.token!==s.token)return;if(location.protocol!=='file:'&&e.origin!==location.origin)return;const c=new MessageChannel();s.port=c.port1;s.port.onmessage=async e=>{const m=e.data;if(cs32Session!==s||!m||typeof m.type!=='string')return;if(m.type==='ready')return;if(m.type==='detach'){cs32Close();return}if(m.type==='revoke'){cs32Revoke();return}if(m.type==='stop-results'){cs32StopResults();return}if(typeof m.id!=='string'||m.id.length>80)return;try{let data;switch(m.type){case'permissions':data=await cs32Grant();break;case'text':data=await cs32Text(m.text);break;case'image':data=await cs32Image(m);break;case'command':data=await cs32Command(m);break;case'results':data=await cs32Results();break;default:throw Error('Unsupported connection request')}if(cs32Session===s)s.port.postMessage({type:'reply',id:m.id,data})}catch(error){if(cs32Session===s)s.port.postMessage({type:'reply',id:m.id,error:error.message})}};s.port.start();s.child.postMessage({type:'cs-connection-port',token:s.token},location.protocol==='file:'?'*':location.origin,[c.port2]);}",""));
}],
[4303,function initialize_4303(__studio33){
window.addEventListener('pagehide',__studio33.cs32Close);
}],
[4304,function initialize_4304(__studio33){
window.calcStudio=Object.freeze({...window.calcStudio,connection:__studio33.$fn(()=>({available:true,attached:!!__studio33.cs32Session?.port,remote:!!__studio33.cs32Session?.remote,sharingResults:!!__studio33.cs32Timer}),"()=>({available:true,attached:!!cs32Session?.port,remote:!!cs32Session?.remote,sharingResults:!!cs32Timer})","")});
}]
];
