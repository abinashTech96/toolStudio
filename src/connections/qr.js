const engines=new Map();
export async function loadQR(kind){if(!["qrencode","qrdecode"].includes(kind))throw Error("Unknown QR engine");if(!engines.has(kind))engines.set(kind,import(new URL("../assets/vendor/"+kind+".mjs",import.meta.url)).then(module=>module.default()).catch(error=>{engines.delete(kind);throw error}));return engines.get(kind)}
