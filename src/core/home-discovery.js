/** Pure presentation helpers. No files, tool inputs or credentials enter Home metadata. */
export function greetingFor(date = new Date()) {
  const hour = date.getHours();
  return hour < 5 || hour >= 22 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
}

export function featurePinKey(entry, normalize) {
  // Disclosure index counters can change between releases; use their stable identity.
  return entry.detail ? 'detail:' + entry.id + ':' + (entry.detail.id || normalize(entry.label)) : entry.key;
}

export function discoveryResults(categories, modules, features, query, normalize, rank) {
  const text = normalize(query), tokens = text.split(' ').filter(Boolean);
  if (!tokens.length) return {categories: [], tools: [], features: []};
  const matches = value => tokens.every(token => normalize(value).includes(token));
  const toolResults = modules.filter(m => matches([m.id, m.label, m.description, ...(m.searchTerms || [])].join(' ')));
  const featureResults = features.filter(feature => !feature.detail || matches(feature.label)).map(feature => ({feature, rank: rank(feature, text, tokens)}))
    .filter(item => item.rank >= 0).sort((a, b) => b.rank - a.rank).map(item => item.feature);
  return {
    categories: categories.filter(c => matches(c.label + ' ' + c.id)),
    tools: toolResults.sort((a, b) => Number(normalize(b.label) === text) - Number(normalize(a.label) === text)),
    features: featureResults
  };
}
