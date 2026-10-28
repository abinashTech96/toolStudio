# Compact homepage · v41.1

The category-first homepage retains the same tools, feature actions, search groups, favorites, theme IDs and saved preferences. This release reduces the space used to browse them.

- Category tiles use a horizontal icon/name/count arrangement on desktop and label-first tiles on phones. Descriptions remain available as category tooltips.
- Tool grids use three columns on wide screens, two on tablets and one on phones. Category labels are omitted inside an already-selected category. Meaningful descriptions retain their complete accessible text and tooltip, with two visible lines; generic repeated workspace descriptions are omitted.
- Opening a tool's features reveals one shared full-width panel below its tool row, keeping neighboring cards compact. Features use columns where space permits and a bounded scroll area on phones. Every feature remains available, including its favorite action.
- Close features and Escape return focus to the originating disclosure. Arrow Down on an expanded disclosure enters the feature list. Resizing and switching Grid/List preserve the active feature panel and its focus.
- Content entrances use 150 ms transform/opacity transitions. Repeated toggles cancel prior entrances; leaving Home cancels outstanding Home animations. System reduced motion and existing motion preferences are retained.
- Existing touch targets and TV text sizes remain supported. No themes, tools or storage keys are added or removed.

Local Chromium comparison at a 1440 px viewport:

| Element | v41.0 | v41.1 |
| --- | ---: | ---: |
| Category tile height | 170 px | 88 px |
| Camera tool card, collapsed | 167.5 px | 118.4 px |
| Expanded camera feature area | 902.1 px | 172.4 px |

These are layout measurements from one fixture, not frame-rate guarantees. Phone feature areas are capped at 280 px and remain scrollable by keyboard and touch.

`tests/home-compact.browser.mjs` covers density, full feature retention, row placement, repeated toggles, exact feature actions, favorites, scrolling, touch sizes, themes, accessibility and reduced motion. It runs with the existing homepage suite in Chromium, Firefox and WebKit. Whole-project CI continues to verify existing workspaces, exports, recovery, navigation, updates and published assets.
