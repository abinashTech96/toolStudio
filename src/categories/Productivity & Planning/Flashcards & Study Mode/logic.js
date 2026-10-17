// flashcards · stable live bindings are provided by the shared runtime context.
// Initializer order preserves the existing tool behavior during this migration.
export const id="flashcards";
export function register(__studio33){
__studio33.fcValidate = __studio33.$fn((function fcValidate(data){if(!data||!Array.isArray(data.decks)||!data.decks.length||data.decks.length>50)throw Error('Invalid flashcard backup');const ids=new Set();for(const deck of data.decks){if(!deck||typeof deck.id!=='string'||ids.has(deck.id)||typeof deck.name!=='string'||!deck.name.trim()||deck.name.length>100||!Array.isArray(deck.cards)||deck.cards.length>5000)throw Error('Invalid deck');ids.add(deck.id);for(const card of deck.cards){if(!card||typeof card.id!=='string'||ids.has(card.id)||!['question','answer'].every(k=>typeof card[k]==='string'&&card[k].length<=10000)||!Number.isFinite(card.due)||!Number.isInteger(card.interval)||card.interval<0||card.interval>365||!Number.isInteger(card.reviews)||card.reviews<0)throw Error('Invalid flashcard');ids.add(card.id)}}return __studio33.csClone(data)}),"function fcValidate(data){if(!data||!Array.isArray(data.decks)||!data.decks.length||data.decks.length>50)throw Error('Invalid flashcard backup');const ids=new Set();for(const deck of data.decks){if(!deck||typeof deck.id!=='string'||ids.has(deck.id)||typeof deck.name!=='string'||!deck.name.trim()||deck.name.length>100||!Array.isArray(deck.cards)||deck.cards.length>5000)throw Error('Invalid deck');ids.add(deck.id);for(const card of deck.cards){if(!card||typeof card.id!=='string'||ids.has(card.id)||!['question','answer'].every(k=>typeof card[k]==='string'&&card[k].length<=10000)||!Number.isFinite(card.due)||!Number.isInteger(card.interval)||card.interval<0||card.interval>365||!Number.isInteger(card.reviews)||card.reviews<0)throw Error('Invalid flashcard');ids.add(card.id)}}return csClone(data)}","fcValidate");

__studio33.fcRender = __studio33.$fn((function fcRender(){const picker=__studio33.$('fcDeck');picker.replaceChildren();for(const d of __studio33.fcData.decks)picker.append(new Option(d.name+' ('+d.cards.length+')',d.id));picker.value=__studio33.fcActive;const host=__studio33.$('fcCards');host.replaceChildren();for(const c of __studio33.fcDeck().cards){const row=__studio33.csText('div','','cs-task');row.append(__studio33.csText('strong',c.question),__studio33.csText('p',c.answer,'cs-help'),__studio33.csText('small',c.reviews+' reviews · due '+new Date(c.due).toLocaleDateString()),__studio33.csButton('Edit',__studio33.$fn(()=>{__studio33.fcEditing=c.id;__studio33.$('fcQuestion').value=c.question;__studio33.$('fcAnswer').value=c.answer;__studio33.$('fcAdd').textContent='Save card'},"()=>{fcEditing=c.id;$('fcQuestion').value=c.question;$('fcAnswer').value=c.answer;$('fcAdd').textContent='Save card'}","")),__studio33.csButton('Delete',__studio33.$fn(()=>{__studio33.fcDeck().cards=__studio33.fcDeck().cards.filter(x=>x!==c);__studio33.fcSave();__studio33.fcStop();__studio33.fcRender()},"()=>{fcDeck().cards=fcDeck().cards.filter(x=>x!==c);fcSave();fcStop();fcRender()}","")));host.append(row)}__studio33.fcStudyRender()}),"function fcRender(){const picker=$('fcDeck');picker.replaceChildren();for(const d of fcData.decks)picker.append(new Option(d.name+' ('+d.cards.length+')',d.id));picker.value=fcActive;const host=$('fcCards');host.replaceChildren();for(const c of fcDeck().cards){const row=csText('div','','cs-task');row.append(csText('strong',c.question),csText('p',c.answer,'cs-help'),csText('small',c.reviews+' reviews · due '+new Date(c.due).toLocaleDateString()),csButton('Edit',()=>{fcEditing=c.id;$('fcQuestion').value=c.question;$('fcAnswer').value=c.answer;$('fcAdd').textContent='Save card'}),csButton('Delete',()=>{fcDeck().cards=fcDeck().cards.filter(x=>x!==c);fcSave();fcStop();fcRender()}));host.append(row)}fcStudyRender()}","fcRender");

__studio33.fcStop = __studio33.$fn((function fcStop(){__studio33.fcQueue=[];__studio33.fcShown=false;__studio33.fcSession=false;__studio33.fcEditing=null;__studio33.$('fcAdd').textContent='Add card'}),"function fcStop(){fcQueue=[];fcShown=false;fcSession=false;fcEditing=null;$('fcAdd').textContent='Add card'}","fcStop");

__studio33.fcStudyRender = __studio33.$fn((function fcStudyRender(){const c=__studio33.fcQueue[0],due=__studio33.fcDeck().cards.filter(x=>x.due<=Date.now()).length;__studio33.$('fcProgress').textContent=__studio33.fcSession?(c?__studio33.fcQueue.length+' remaining · '+__studio33.fcReviewed+' reviewed':'Session complete · '+__studio33.fcReviewed+' reviewed'):__studio33.fcDeck().cards.length+' cards · '+due+' due';__studio33.$('fcCard').textContent=c?(__studio33.fcShown?c.answer:c.question):__studio33.fcSession?'Session complete. Start another when ready.':'Choose Study due cards or Study all cards.';__studio33.$('fcFlip').disabled=!c;for(const id of ['fcAgain','fcGood','fcEasy'])__studio33.$(id).disabled=!c||!__studio33.fcShown;__studio33.$('fcFlip').textContent=__studio33.fcShown?'Show question':'Show answer'}),"function fcStudyRender(){const c=fcQueue[0],due=fcDeck().cards.filter(x=>x.due<=Date.now()).length;$('fcProgress').textContent=fcSession?(c?fcQueue.length+' remaining · '+fcReviewed+' reviewed':'Session complete · '+fcReviewed+' reviewed'):fcDeck().cards.length+' cards · '+due+' due';$('fcCard').textContent=c?(fcShown?c.answer:c.question):fcSession?'Session complete. Start another when ready.':'Choose Study due cards or Study all cards.';$('fcFlip').disabled=!c;for(const id of ['fcAgain','fcGood','fcEasy'])$(id).disabled=!c||!fcShown;$('fcFlip').textContent=fcShown?'Show question':'Show answer'}","fcStudyRender");

__studio33.fcStart = __studio33.$fn((function fcStart(all){__studio33.fcSession=true;__studio33.fcReviewed=0;__studio33.fcShown=false;__studio33.fcQueue=__studio33.fcDeck().cards.filter(c=>all||c.due<=Date.now()).slice();for(let i=__studio33.fcQueue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[__studio33.fcQueue[i],__studio33.fcQueue[j]]=[__studio33.fcQueue[j],__studio33.fcQueue[i]]}__studio33.fcStudyRender()}),"function fcStart(all){fcSession=true;fcReviewed=0;fcShown=false;fcQueue=fcDeck().cards.filter(c=>all||c.due<=Date.now()).slice();for(let i=fcQueue.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[fcQueue[i],fcQueue[j]]=[fcQueue[j],fcQueue[i]]}fcStudyRender()}","fcStart");

__studio33.fcRate = __studio33.$fn((function fcRate(grade){if(!__studio33.fcShown||!__studio33.fcQueue.length)return;const c=__studio33.fcQueue.shift();c.reviews++;__studio33.fcReviewed++;c.interval=grade==='again'?0:grade==='easy'?Math.min(365,Math.max(4,c.interval*3)):Math.min(365,Math.max(1,c.interval*2));c.due=Date.now()+(grade==='again'?10*60*1000:c.interval*864e5);__studio33.fcShown=false;__studio33.fcSave();__studio33.fcRender()}),"function fcRate(grade){if(!fcShown||!fcQueue.length)return;const c=fcQueue.shift();c.reviews++;fcReviewed++;c.interval=grade==='again'?0:grade==='easy'?Math.min(365,Math.max(4,c.interval*3)):Math.min(365,Math.max(1,c.interval*2));c.due=Date.now()+(grade==='again'?10*60*1000:c.interval*864e5);fcShown=false;fcSave();fcRender()}","fcRate");
}
export const steps=[
[1032,function initialize_1032(__studio33){
__studio33.fcKey = 'calc-studio-flashcards-v11';

}],
[1034,function initialize_1034(__studio33){
__studio33.fcData = undefined;

}],
[1035,function initialize_1035(__studio33){
try{__studio33.fcData=__studio33.fcValidate(__studio33.storage.get(__studio33.fcKey,{decks:[{id:__studio33.csId('deck'),name:'My first deck',cards:[]}]}))}catch{__studio33.fcData={decks:[{id:__studio33.csId('deck'),name:'My first deck',cards:[]}]}}
}],
[1036,function initialize_1036(__studio33){
__studio33.fcActive = __studio33.fcData.decks[0].id;
__studio33.fcQueue = [];
__studio33.fcShown = false;
__studio33.fcEditing = null;
__studio33.fcSession = false;
__studio33.fcReviewed = 0;

}],
[1037,function initialize_1037(__studio33){
__studio33.fcDeck = __studio33.$fn(()=>__studio33.fcData.decks.find(__studio33.$fn(d=>d.id===__studio33.fcActive,"d=>d.id===fcActive","")),"()=>fcData.decks.find(d=>d.id===fcActive)","fcDeck");

}],
[1038,function initialize_1038(__studio33){
__studio33.fcSave = __studio33.$fn(()=>__studio33.csPersist(__studio33.fcKey,__studio33.fcData),"()=>csPersist(fcKey,fcData)","fcSave");

}],
[1042,function initialize_1042(__studio33){
__studio33.$('fcDeck').onchange=__studio33.$fn(()=>{__studio33.fcActive=__studio33.$('fcDeck').value;__studio33.fcStop();__studio33.fcRender()},"()=>{fcActive=$('fcDeck').value;fcStop();fcRender()}","");
}],
[1043,function initialize_1043(__studio33){
__studio33.$('fcNew').onclick=__studio33.csSafe(__studio33.$fn(()=>{const name=__studio33.$('fcDeckName').value.trim();if(!name||name.length>100||__studio33.fcData.decks.length>=50)throw Error('Use a deck name of 1–100 characters; maximum 50 decks');const d={id:__studio33.csId('deck'),name,cards:[]};__studio33.fcData.decks.push(d);__studio33.fcActive=d.id;__studio33.fcSave();__studio33.fcStop();__studio33.fcRender()},"()=>{const name=$('fcDeckName').value.trim();if(!name||name.length>100||fcData.decks.length>=50)throw Error('Use a deck name of 1–100 characters; maximum 50 decks');const d={id:csId('deck'),name,cards:[]};fcData.decks.push(d);fcActive=d.id;fcSave();fcStop();fcRender()}",""),'flashcards');
}],
[1044,function initialize_1044(__studio33){
__studio33.$('fcDeleteDeck').onclick=__studio33.$fn(()=>{if(__studio33.fcData.decks.length===1){__studio33.csStatus('flashcards','Keep at least one deck.',true);return}if(!confirm('Delete this deck and all its cards?'))return;__studio33.fcData.decks=__studio33.fcData.decks.filter(__studio33.$fn(d=>d.id!==__studio33.fcActive,"d=>d.id!==fcActive",""));__studio33.fcActive=__studio33.fcData.decks[0].id;__studio33.fcSave();__studio33.fcStop();__studio33.fcRender()},"()=>{if(fcData.decks.length===1){csStatus('flashcards','Keep at least one deck.',true);return}if(!confirm('Delete this deck and all its cards?'))return;fcData.decks=fcData.decks.filter(d=>d.id!==fcActive);fcActive=fcData.decks[0].id;fcSave();fcStop();fcRender()}","");
}],
[1045,function initialize_1045(__studio33){
__studio33.$('fcAdd').onclick=__studio33.csSafe(__studio33.$fn(()=>{const question=__studio33.$('fcQuestion').value.trim(),answer=__studio33.$('fcAnswer').value.trim();if(!question||!answer||question.length>10000||answer.length>10000)throw Error('Enter a question and answer, up to 10,000 characters each');if(__studio33.fcEditing){const c=__studio33.fcDeck().cards.find(__studio33.$fn(x=>x.id===__studio33.fcEditing,"x=>x.id===fcEditing",""));Object.assign(c,{question,answer})}else{if(__studio33.fcDeck().cards.length>=5000)throw Error('Deck limit: 5,000 cards');__studio33.fcDeck().cards.push({id:__studio33.csId('card'),question,answer,due:Date.now(),interval:0,reviews:0})}__studio33.$('fcQuestion').value=__studio33.$('fcAnswer').value='';__studio33.fcSave();__studio33.fcStop();__studio33.fcRender()},"()=>{const question=$('fcQuestion').value.trim(),answer=$('fcAnswer').value.trim();if(!question||!answer||question.length>10000||answer.length>10000)throw Error('Enter a question and answer, up to 10,000 characters each');if(fcEditing){const c=fcDeck().cards.find(x=>x.id===fcEditing);Object.assign(c,{question,answer})}else{if(fcDeck().cards.length>=5000)throw Error('Deck limit: 5,000 cards');fcDeck().cards.push({id:csId('card'),question,answer,due:Date.now(),interval:0,reviews:0})}$('fcQuestion').value=$('fcAnswer').value='';fcSave();fcStop();fcRender()}",""),'flashcards');
}],
[1047,function initialize_1047(__studio33){
__studio33.$('fcStudyDue').onclick=__studio33.$fn(()=>__studio33.fcStart(false),"()=>fcStart(false)","");
}],
[1048,function initialize_1048(__studio33){
__studio33.$('fcStudyAll').onclick=__studio33.$fn(()=>__studio33.fcStart(true),"()=>fcStart(true)","");
}],
[1049,function initialize_1049(__studio33){
__studio33.$('fcFlip').onclick=__studio33.$('fcCard').onclick=__studio33.$fn(()=>{if(__studio33.fcQueue.length){__studio33.fcShown=!__studio33.fcShown;__studio33.fcStudyRender()}},"()=>{if(fcQueue.length){fcShown=!fcShown;fcStudyRender()}}","");
}],
[1051,function initialize_1051(__studio33){
for(const [id,g] of [['fcAgain','again'],['fcGood','good'],['fcEasy','easy']])__studio33.$(id).onclick=__studio33.$fn(()=>__studio33.fcRate(g),"()=>fcRate(g)","");
}],
[1052,function initialize_1052(__studio33){
__studio33.$('fcCSV').onclick=__studio33.$fn(()=>{const q=s=>'"'+s.replace(/"/g,'""')+'"';__studio33.downloadFile('flashcards.csv','question,answer\r\n'+__studio33.fcDeck().cards.map(c=>q(c.question)+','+q(c.answer)).join('\r\n'),'text/csv')},"()=>{const q=s=>'\"'+s.replace(/\"/g,'\"\"')+'\"';downloadFile('flashcards.csv','question,answer\\r\\n'+fcDeck().cards.map(c=>q(c.question)+','+q(c.answer)).join('\\r\\n'),'text/csv')}","");
}],
[1053,function initialize_1053(__studio33){
__studio33.$('fcBackup').onclick=__studio33.$fn(()=>__studio33.v9SaveJSON('flashcard-decks.json',__studio33.fcData),"()=>v9SaveJSON('flashcard-decks.json',fcData)","");
}],
[1054,function initialize_1054(__studio33){
__studio33.$('fcImport').onchange=__studio33.csSafe(__studio33.$fn(async()=>{const f=__studio33.$('fcImport').files[0];if(!f)return;if(f.size>5e6)throw Error('Import limit: 5 MB');const text=await f.text();if(f.name.toLowerCase().endsWith('.json')){const next=__studio33.fcValidate(JSON.parse(text));if(!confirm('Replace all flashcard decks with this backup?'))return;__studio33.fcData=next;__studio33.fcActive=__studio33.fcData.decks[0].id}else{const rows=__studio33.parseCSVText(text);if(rows[0]?.[0]?.toLowerCase()==='question'&&rows[0]?.[1]?.toLowerCase()==='answer')rows.shift();if(rows.some(r=>r.length!==2||!r[0].trim()||!r[1].trim()))throw Error('CSV requires question,answer columns');if(__studio33.fcDeck().cards.length+rows.length>5000)throw Error('Deck limit: 5,000 cards');const cards=rows.map(__studio33.$fn(r=>({id:__studio33.csId('card'),question:r[0],answer:r[1],due:Date.now(),interval:0,reviews:0}),"r=>({id:csId('card'),question:r[0],answer:r[1],due:Date.now(),interval:0,reviews:0})",""));__studio33.fcValidate({decks:[{...__studio33.fcDeck(),cards:[...__studio33.fcDeck().cards,...cards]}]});__studio33.fcDeck().cards.push(...cards)}__studio33.fcSave();__studio33.fcStop();__studio33.fcRender();__studio33.csStatus('flashcards','Import complete.')},"async()=>{const f=$('fcImport').files[0];if(!f)return;if(f.size>5e6)throw Error('Import limit: 5 MB');const text=await f.text();if(f.name.toLowerCase().endsWith('.json')){const next=fcValidate(JSON.parse(text));if(!confirm('Replace all flashcard decks with this backup?'))return;fcData=next;fcActive=fcData.decks[0].id}else{const rows=parseCSVText(text);if(rows[0]?.[0]?.toLowerCase()==='question'&&rows[0]?.[1]?.toLowerCase()==='answer')rows.shift();if(rows.some(r=>r.length!==2||!r[0].trim()||!r[1].trim()))throw Error('CSV requires question,answer columns');if(fcDeck().cards.length+rows.length>5000)throw Error('Deck limit: 5,000 cards');const cards=rows.map(r=>({id:csId('card'),question:r[0],answer:r[1],due:Date.now(),interval:0,reviews:0}));fcValidate({decks:[{...fcDeck(),cards:[...fcDeck().cards,...cards]}]});fcDeck().cards.push(...cards)}fcSave();fcStop();fcRender();csStatus('flashcards','Import complete.')}",""),'flashcards');
}]
];
