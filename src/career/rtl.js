import bidiFactory from 'bidi-js';
const bidi=bidiFactory();
const formatting=/[\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/g;
export function hasRTL(text){return /[\u0590-\u08ff\ufb1d-\ufdff\ufe70-\ufeff]/.test(text)}
export function visualRuns(text,direction='rtl'){
 if(!text)return[];const embedding=bidi.getEmbeddingLevels(text,direction),mirrors=bidi.getMirroredCharactersMap(text,embedding),runs=[];let start=0;
 for(let i=1;i<=text.length;i++)if(i===text.length||embedding.levels[i]!==embedding.levels[start]){let value='';for(let n=start;n<i;n++)value+=mirrors.get(n)||text[n];runs.push({text:value.replace(formatting,''),level:embedding.levels[start],start,end:i});start=i}
 const max=Math.max(...runs.map(r=>r.level)),odd=runs.filter(r=>r.level%2).map(r=>r.level),min=odd.length?Math.min(...odd):max+1;for(let level=max;level>=min;level--){for(let i=0;i<runs.length;){if(runs[i].level<level){i++;continue}let end=i;while(end<runs.length&&runs[end].level>=level)end++;runs.splice(i,end-i,...runs.slice(i,end).reverse());i=end}}return runs;
}
export function shapeLine(raw,text,direction='rtl'){return visualRuns(text,direction).map(run=>({...run,shape:raw.layout(run.text,undefined,undefined,undefined,run.level%2?'rtl':'ltr')}))}
export function shapedWidth(raw,text,size,direction='rtl'){return shapeLine(raw,text,direction).reduce((n,r)=>n+r.shape.advanceWidth,0)*size/raw.unitsPerEm}
export function drawShapedLine(engine,pdf,page,font,raw,text,{x,y,size,direction='rtl'}){
 page.setFont(font);const key=page.getFont()[1],embedder=font.embedder;if(!embedder?.subset?.includeGlyph||!embedder.glyphIdMap)throw Error('PDF font shaping is unavailable; use browser Print / Save as PDF');const scale=size/raw.unitsPerEm;let cursor=x;
 page.pushOperators(engine.PDFOperator.of('BDC',[engine.PDFName.of('Span'),pdf.context.obj({ActualText:engine.PDFHexString.fromText(text)})]),engine.beginText(),engine.setFontAndSize(key,size));
 for(const run of shapeLine(raw,text,direction)){for(let i=0;i<run.shape.glyphs.length;i++){const glyph=run.shape.glyphs[i],position=run.shape.positions[i],id=embedder.subset.includeGlyph(glyph);embedder.glyphs[id-1]=glyph;embedder.glyphIdMap.set(glyph.id,id);page.pushOperators(engine.setTextMatrix(1,0,0,1,cursor+(position.xOffset||0)*scale,y+(position.yOffset||0)*scale),engine.showText(engine.PDFHexString.of(id.toString(16).padStart(4,'0'))));cursor+=position.xAdvance*scale}}
 embedder.glyphCache.invalidate();page.pushOperators(engine.endText(),engine.PDFOperator.of('EMC'));return cursor-x;
}
