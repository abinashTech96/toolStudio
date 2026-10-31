// Existing gameplay fixtures explicitly complete the new readiness screen.
// Dedicated v52 tests exercise the unready state without this helper.
export async function readyBoth(a,b,drain){await a.markReady();await drain();await b.markReady();await drain();}
