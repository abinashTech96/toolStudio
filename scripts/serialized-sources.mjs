import {parse} from 'acorn';
/** Pool only literal source arguments to $fn; executable bodies stay unchanged. */
export function createSourcePool(){
  const sources=[],indices=new Map();
  return{sources,transform(source){
    const ast=parse(source,{ecmaVersion:'latest',sourceType:'module'}),edits=[];
    const visit=node=>{
      if(!node||typeof node!=='object')return;
      if(node.type==='CallExpression'&&node.callee.type==='MemberExpression'&&node.callee.object?.name==='__studio33'&&node.callee.property?.name==='$fn'&&node.arguments[1]?.type==='Literal'&&typeof node.arguments[1].value==='string'){
        const argument=node.arguments[1],value=argument.value;if(!indices.has(value)){indices.set(value,sources.length);sources.push(value)}edits.push({start:argument.start,end:argument.end,value:String(indices.get(value))});
      }
      for(const value of Object.values(node)){if(Array.isArray(value))value.forEach(visit);else if(value&&typeof value==='object')visit(value)}
    };
    visit(ast);for(const edit of edits.sort((a,b)=>b.start-a.start))source=source.slice(0,edit.start)+edit.value+source.slice(edit.end);return source;
  }};
}
