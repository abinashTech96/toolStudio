const config = /* BUILD_CONFIG */;
const base = new URL('../', import.meta.url);
const status = document.getElementById('studioBootText');
try {
  const [{createContext, initializeModules}, {createResources, resourceRequirements, guardResourceActions}, {installLifecycle}] = await Promise.all([
    import(new URL(config.context, base)), import(new URL(config.resourceRuntime, base)), import(new URL(config.lifecycle, base))
  ]);
  const groups = await Promise.all(config.chunks.map(async path => {
    const result = await import(new URL(path, base));
    return result.modules;
  }));
  const context = createContext(config.bindings, {baseURL: base.href});
  initializeModules(context, groups.flat());
  const resources = createResources(context, config.resourceConfig, base);
  context.$requirements = resourceRequirements;
  guardResourceActions(context, resources);
  const advanced=await import(new URL(config.advancedRuntime,base));
  advanced.install(context,config.registry,{baseURL:base.href,assets:config.advancedAssets});
  installLifecycle(context, config.registry, resources);
  document.body.removeAttribute('data-loading'); document.getElementById('studioBoot')?.remove();
  window.__toolStudioReady = true;
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register(new URL('sw.js', base), {scope: base.pathname}).catch(error => console.warn('Offline cache unavailable', error));
} catch (error) {
  console.error(error);
  if (status) status.textContent = 'Tool Studio could not finish loading. Check your connection and retry.';
  document.getElementById('studioBootRetry')?.removeAttribute('hidden');
}
