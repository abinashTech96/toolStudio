// Only fixed state names and counts leave this module. Never include SDP,
// network addresses, ICE credentials, fingerprints, device names or messages.
export const CONNECTION_BUILD = '49.0.0';
const peerStates = new Set(['new','connecting','connected','disconnected','failed','closed']);
const iceStates = new Set(['new','checking','connected','completed','disconnected','failed','closed']);
const signalingStates = new Set(['stable','have-local-offer','have-remote-offer','have-local-pranswer','have-remote-pranswer','closed']);
const transportStates = new Set(['new','connecting','connected','closed','failed']);
const safeState = (value, allowed) => allowed.has(value) ? value : 'unknown';
export function peerCandidateSummary(description) {
 const summary = {total:0,host:0,srflx:0,relay:0,prflx:0,mdns:0};
 for (const line of String(description?.sdp || '').split(/\r?\n/)) {
  if (!line.startsWith('a=candidate:')) continue;
  summary.total++;
  const type = line.match(/\btyp (host|srflx|relay|prflx)\b/)?.[1];
  if (type) summary[type]++;
  if (/\.local\b/i.test(line)) summary.mdns++;
 }
 return summary;
}
export function peerSnapshot(pc) {
 return {
  connection:safeState(pc?.connectionState,peerStates),
  ice:safeState(pc?.iceConnectionState,iceStates),
  signaling:safeState(pc?.signalingState,signalingStates),
  gathering:safeState(pc?.iceGatheringState,new Set(['new','gathering','complete'])),
  dtls:safeState(pc?.sctp?.transport?.state,transportStates),
  sctp:safeState(pc?.sctp?.state,transportStates),
  local:peerCandidateSummary(pc?.localDescription),
  remote:peerCandidateSummary(pc?.remoteDescription)
 };
}
export function peerFailureStage(snapshot,sessionApproved=false) {
 if (sessionApproved) return 'session';
 if (!snapshot.local.total) return 'local-candidates';
 if (!snapshot.remote.total) return 'remote-candidates';
 if (!['connected','completed'].includes(snapshot.ice)) return 'network-path';
 if (snapshot.dtls!=='connected') return 'secure-transport';
 return 'data-channel';
}
export function peerFailureText(stage) {
 const explanations = {
  'local-candidates':'The browser did not provide a local connection address.',
  'remote-candidates':'The imported details did not provide a connection address for the other device.',
  'network-path':'The devices could not establish a network path.',
  'secure-transport':'The secure connection did not finish opening.',
  'data-channel':'The connection opened but its sharing channel did not stay open.',
  session:'The sharing session closed.'
 };
 return (explanations[stage] || 'The connection attempt ended.') + ' Copy the connection report below to help investigate. The report does not identify the underlying cause by itself.';
}
