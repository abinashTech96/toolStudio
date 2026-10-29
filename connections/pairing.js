// Presentation state only. No network calls, permissions or pairing data are retained here.
export function pairingView(state, {method = 'manual', role = 'first', localType = ''} = {}) {
  const connected = !!(state.approved && state.peerApproved);
  const channelOpen = state.dc?.readyState === 'open';
  let step = 0, title = 'Choose your device', instruction = 'Open Connection on both devices. Choose First device here, or Second device if the other device has started.';
  if (state.peerFailure) {
    step = 1; title = 'Connection failed';instruction = state.peerFailure.instruction;
  } else if (state.pairingBusy) {
    step = 1; title = 'Preparing pairing details…';
    instruction = 'Keep this page open. Your next step will appear when preparation finishes.';
  } else if (connected) {
    step = 3; title = 'Connected to ' + state.peer;
    instruction = 'Both devices approved. Send a message, photo or file below.';
  } else if (channelOpen) {
    step = 2; title = state.approved ? 'Waiting for the other device to approve' : 'Compare and approve on both devices';
    instruction = 'Compare the verification codes. Approve only if they match. Sharing unlocks after both approvals.';
  } else if (method === 'server' && state.pc) {
    step = 1; title = 'Complete code pairing';
    instruction = 'First device: send the code or pairing link. Second device: use the same server address, enter the code and choose Join. Then verify both screens.';
  } else if (state.pc?.connectionState === 'connecting') {
    step = 2; title = 'Connecting the devices…';
    instruction = 'Keep both pages open. Approval appears only after the connection opens.';
  } else if (localType === 'answer') {
    step = 1; title = 'Send your answer to the first device';
    instruction = 'Copy your pairing details below and send them back. On the first device, paste them into Pairing details from the other device and choose Use pasted details.';
  } else if (localType === 'offer' && state.pc?.signalingState === 'have-local-offer') {
    step = 1; title = 'Send your details, then paste the answer';
    instruction = 'Copy your pairing details and send them to the second device. It will create an answer. Paste that answer here and choose Use pasted details.';
  } else if (state.pc) {
    step = 2; title = 'Connecting the devices…';
    instruction = 'Keep both pages open. If no approval prompt appears, check the network help below; the devices need a working network path.';
  } else if (role === 'second') {
    step = 1; title = 'Paste the first device’s details';
    instruction = 'Receive the pairing text from the first device. Paste the complete text below, then choose Use pasted details to create your answer.';
  } else {
    title = 'Start on this device';
    instruction = 'Choose Create connection details. Copy the generated text and send it directly to the second device using your usual messaging app.';
  }
  return {connected, step, title, instruction, completed: connected ? 4 : channelOpen ? 2 : localType || state.pc ? 1 : 0};
}
