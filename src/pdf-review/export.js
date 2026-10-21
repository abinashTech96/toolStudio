import { exportable } from './model.js';
export async function reviewedPDF(api, bytes, session, reference, current = ()=>true) {
  exportable(session,reference);
  const lib=await api.pdfEditor(),doc=await lib.PDFDocument.load(bytes.slice()),{PDFName,PDFHexString}=lib;
  for(const item of [...session.comments,...session.stamps]){const box=doc.getPage(item.page-1).getCropBox();if(item.rect[0]<box.x||item.rect[1]<box.y||item.rect[2]>box.x+box.width||item.rect[3]>box.y+box.height)throw Error('Annotation lies outside page '+item.page+'. Select a region on that page and move the annotation before exporting.')}
  // Native Text annotations preserve Unicode notes and do not flatten or remove source content.
  for(const item of session.comments) {
    const annotation=doc.context.register(doc.context.obj({Type:'Annot',Subtype:'Text',Rect:item.rect,Contents:PDFHexString.fromText(item.text+(item.quote?'\nSelected text: '+item.quote:'')),T:PDFHexString.fromText('Tool Studio review'),Name:'Comment',F:4,C:[1,0.8,0.2]}));
    doc.getPage(item.page-1).node.addAnnot(annotation);
  }
  if(session.stamps.length) {
    const source=await api.asset('careerFontkit'),url=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));
    let kit;try{kit=(await import(url)).default}finally{URL.revokeObjectURL(url)}
    const fontBytes=await api.asset('careerFont'),fontkit=kit.create(fontBytes),supported=new Set(fontkit.characterSet);
    for(const s of session.stamps)for(const char of s.text)if(!supported.has(char.codePointAt(0)))throw Error('Stamp font cannot display '+char+'. Change stamp text; Unicode comments remain available.');
    doc.registerFontkit(kit);const font=await doc.embedFont(fontBytes,{subset:true});
    for(const s of session.stamps) {
      const [x,y,x2,y2]=s.rect,size=Math.min(s.size,(x2-x)/Math.max(1,font.widthOfTextAtSize(s.text,1)),y2-y);
      if(size<4)throw Error('Stamp region is too small for its text');
      // Flattened stamp preview/export use the same PDF-space anchor and explicit font size.
      const page=doc.getPage(s.page-1);page.drawText(s.text,{x,y,size,font});
    }
  }
  if(!current())throw Error('Review changed or export cancelled; preview again');
  const result=await doc.save();if(!current())throw Error('Review changed or export cancelled; preview again');return result;
}
