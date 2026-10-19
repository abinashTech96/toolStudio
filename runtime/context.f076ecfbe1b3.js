/** Live bindings preserve shared tool state while modules move out of the old closure. */
export function createContext(bindings, options = {}) {
  const context = Object.create(null);
  for (const name of bindings) context[name] = undefined;
  context.$options = options;
  context.$fn = (fn, originalSource, inferredName = '') => {
    // Workers and exported forms serialize helpers. Keep their original standalone source.
    Object.defineProperty(fn, 'toString', {value: () => originalSource, configurable: true});
    if (!fn.name && inferredName) Object.defineProperty(fn, 'name', {value: inferredName, configurable: true});
    return fn;
  };
  return context;
}

export function initializeModules(context, modules, {cooperative=false}={}) {
  for (const module of modules) module.register(context);
  const initializers = modules.flatMap(module => module.steps.map(([order, run]) => ({order, run, module: module.id})));
  initializers.sort((a, b) => a.order - b.order);
  const seen = new Set();
  const run=initializer=>{
    if (seen.has(initializer.order)) throw new Error('Duplicate initializer order: ' + initializer.order);
    seen.add(initializer.order);
    try { initializer.run(context); }
    catch (cause) { throw new Error('Initialization failed in ' + initializer.module + ' (' + initializer.order + '): ' + cause.message, {cause}); }
  }
  if(!cooperative){for(const initializer of initializers)run(initializer);return context}
  return(async()=>{let start=performance.now();for(const initializer of initializers){run(initializer);if(performance.now()-start>=8){if(globalThis.scheduler?.yield)await scheduler.yield();else await new Promise(resolve=>setTimeout(resolve,0));start=performance.now()}}return context})();
}
