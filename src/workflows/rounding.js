export function roundAmount(value,precision=2,mode='nearest'){
 if(!Number.isFinite(value)||!Number.isInteger(precision)||precision<0||precision>4||!['nearest','half-even','down','up'].includes(mode))throw Error('Use finite amounts, 0–4 decimal places and a supported rounding policy');
 const scale=10**precision,n=value*scale;if(Math.abs(n)>Number.MAX_SAFE_INTEGER)throw Error('Amount exceeds safe precision for the selected decimal places');
 const floor=Math.floor(n),fraction=n-floor,tolerance=Number.EPSILON*Math.max(1,Math.abs(n))*2,tie=Math.abs(fraction-.5)<=tolerance;
 const rounded=mode==='down'?Math.floor(n+tolerance):mode==='up'?Math.ceil(n-tolerance):mode==='half-even'&&tie?(floor%2===0?floor:floor+1):Math.round(n+tolerance);return rounded/scale;
}
