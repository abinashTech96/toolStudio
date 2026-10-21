import assert from 'node:assert/strict';
import {readPDFText} from '../src/advanced/assets.js';
import {createSession,validateSession,validateReviews,sourceStatus,remapSession,counts,rectangle,exportable,digest} from '../src/pdf-review/model.js';
import {validateGuidedState,reviewBundle} from '../src/guided/model.js';
const checks=[];function test(name,fn){fn();checks.push(name)}
const reference={name:'document.pdf',sha256:'a'.repeat(64),size:100,pages:3},replacement={...reference,sha256:'b'.repeat(64),pages:2};
const original=createSession(reference),note={id:'note-1',page:3,rect:[20,20,120,60],text:'Résumé — समीक्षा',quote:'Selected text',source:reference.sha256,needsReview:false,resolved:false};original.comments.push(note);
test('new reviews start with user decisions unset',()=>assert.deepEqual(counts(original),{'not-reviewed':3,'needs-changes':0,approved:0}));
test('Unicode notes round trip without loss',()=>assert.equal(validateSession(JSON.parse(JSON.stringify(original))).comments[0].text,note.text));
test('validating a review returns an independent copy',()=>{const s=validateSession(original);s.comments[0].text='Changed';assert.notEqual(original.comments[0].text,s.comments[0].text)});
test('source references distinguish missing and replaced files',()=>{assert.equal(sourceStatus(original,null),'missing');assert.equal(sourceStatus(original,replacement),'replaced');assert.equal(sourceStatus(original,reference),'matched')});
test('same filename cannot bypass checksum identity',()=>assert.throws(()=>exportable(original,replacement),/Relink/));
test('exact source can export',()=>exportable(original,reference));
test('replacement requires explicit annotation mapping approval',()=>assert.throws(()=>remapSession(original,replacement,[{id:note.id,page:1,reviewed:false}]),/Approve/));
test('replacement rejects invalid target pages',()=>assert.throws(()=>remapSession(original,replacement,[{id:note.id,page:3,reviewed:true}]),/Approve/));
test('replacement rejects missing mappings',()=>assert.throws(()=>remapSession(original,replacement,[]),/every/));
test('replacement resets page approvals and requires position verification',()=>{const s=structuredClone(original);s.pages[0]='approved';const mapped=remapSession(s,replacement,[{id:note.id,page:2,reviewed:true}]);assert.deepEqual(mapped.pages,['not-reviewed','not-reviewed']);assert.equal(mapped.comments[0].page,2);assert.equal(mapped.comments[0].needsReview,true);assert.throws(()=>exportable(mapped,replacement),/Verify/);mapped.comments[0].needsReview=false;exportable(mapped,replacement);assert.equal(s.document.sha256,reference.sha256)});
for(const [name,change]of [
 ['out-of-range comment pages',s=>s.comments[0].page=4],['nonfinite coordinates',s=>s.comments[0].rect[0]=NaN],['inverted regions',s=>s.comments[0].rect=[10,10,5,20]],['unknown decisions',s=>s.pages[0]='done'],['truncated page decisions',s=>s.pages.pop()],['malformed checksums',s=>s.document.sha256='abc'],['duplicate annotation IDs',s=>s.comments.push({...s.comments[0]})],['oversized comments',s=>s.comments[0].text='a'.repeat(4001)],['invalid change statuses',s=>s.changes.push({page:1,status:'maybe',resolved:false})],['invalid stamps',s=>s.stamps.push({id:'stamp',page:1,rect:[1,1,40,20],text:'Draft',source:reference.sha256,needsReview:false,size:100})]
])test('validation rejects '+name,()=>{const s=structuredClone(original);change(s);assert.throws(()=>validateSession(s))});
test('region selection normalizes any drag direction',()=>assert.deepEqual(rectangle([[100,80],[10,20]]),[10,20,100,80]));
test('saved reviews retain source identity in project bundles',()=>{const state=validateGuidedState({version:1,workspaces:{'pdf-review':{sessions:[original]}}});const result=reviewBundle({format:'toolstudio-work-bundle',version:1,title:'Review',state,references:['document.pdf']},{version:1,workspaces:{}});assert.equal(result.state.workspaces['pdf-review'].sessions[0].comments[0].quote,'Selected text');assert.deepEqual(result.missing,['document.pdf'])});
test('project restore rejects malformed nested review state',()=>{const state={version:1,workspaces:{'pdf-review':{sessions:[{...original,pages:[]}]}}};assert.throws(()=>validateGuidedState(state))});
test('saved-review limits prevent unbounded storage',()=>{assert.throws(()=>validateReviews({sessions:Array(11).fill(original)}));assert.throws(()=>validateReviews({sessions:[original,original]}))});
assert.equal(await digest(new Uint8Array([1,2,3])),'039058c6f2c0cb492c533b0a4d14ef77cc0f78abccced5287d84a1a2011cfb81');checks.push('source identity uses SHA-256');
// A stream exposing only getReader mirrors Safari without async stream iteration.
{
 let released = 0, calls = 0;
 const options = {includeMarkedContent: true};
 const chunks = [{items: [{str: 'Résumé'}], styles: {f1: {fontFamily: 'sans'}}, lang: null}, {items: [{str: 'समीक्षा'}], styles: {f2: {}}, lang: 'hi'}];
 const result = await readPDFText({streamTextContent(value) {assert.equal(value, options); return {getReader: () => ({read: async () => calls < chunks.length ? {value: chunks[calls++], done: false} : {done: true}, releaseLock() {released++}})}}}, options);
 assert.deepEqual(result.items.map(x => x.str), ['Résumé', 'समीक्षा']);
 assert.deepEqual(Object.keys(result.styles), ['f1', 'f2']); assert.equal(result.lang, 'hi'); assert.equal(released, 1);
 await assert.rejects(readPDFText({streamTextContent: () => ({getReader: () => ({read: async () => {throw Error('Broken PDF stream')}, releaseLock() {released++}})})}), /Broken PDF stream/);
 assert.equal(released, 2); checks.push('PDF text streams preserve chunks and release readers on success and error without async iteration');
}
console.log(JSON.stringify({suite:'pdf-review-unit',checks:checks.length,passed:true}));
