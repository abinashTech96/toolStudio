# v40 manual qualification

Status: pending. Automated browser and simulated hardware results are separate evidence.

| Area | Environment | Journey | Result |
|---|---|---|---|
| Bluetooth | Windows/Chrome with a supported BLE peripheral | Approve, read, write, notify, revoke, disconnect, reconnect, timeout | Not run: physical device unavailable |
| Bluetooth | Android/Chrome with a supported BLE peripheral | Same flow, background/foreground and permission recovery | Not run: physical device unavailable |
| USB | Windows/Linux Chrome with a bulk/interrupt test device | Select, claim, read/write, detach, invalid endpoint, reconnect | Not run: physical device unavailable |
| Mobile | iOS/Safari and Android/Chrome | Open picker/dialog, type with real keyboard, rotate, reach Save/Cancel | Not run on physical phones |
| Screen reader | Windows NVDA with Chrome and Firefox | Select a tool, edit, correct a field error, hear status, export | Not run: reader environment unavailable |
| Screen reader | macOS VoiceOver with Safari | Same flow plus exported PDF/Word heading/list navigation | Not run: reader environment unavailable |
| TV | TV browser with a directional remote | Home, picker, task, editor, result, Back/Return | Not run: physical remote unavailable |
| Screen recording | Supported desktop browser | User picker, microphone on/off, pause/resume, shared track ends, playback/export | Permission UI requires a real desktop session |
| Speech | Device with local and network voices | Choose voice, read, boundary highlighting, pause/resume, edit cancellation | Voice service and boundary events vary by device |

For each completed row record date, OS/browser/device or assistive-technology version, exact actions, observed result and a reproducible defect if it fails. Do not mark this matrix passed from browser emulation or mocked adapters.

PDF structure now provides basic headings and paragraph tags. Link annotation structure and reader behavior must be checked in the exported artifact before making an accessibility compliance claim.

The row-level lineage review accepts explicit parent-row references for joins. It does not infer a reliable join key or certify a manually supplied provenance claim. Retain original datasets and review references before sharing the report.
