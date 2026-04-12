# Light Mode Implementation Plan

## Information Gathered:
- Project: RKM Studio landing page (BIM/architecture services)
- Core files: index.html (structure), style.css (styling/animations), script.js (GSAP interactions)
- Current state: Dark theme works well. Light theme variables exist but cause low contrast:
  * RKM slider titles invisible (opacity 0.1 white on black)
  * Marquees should stay black bg in light mode
  * Scroll highlights need better .scroll-highlight.active contrast
  * Pain point cards, service cards need better readability
  * Proof/trust stats need white text/black bg in light
- TODO.md confirms light mode fixes as priority
- Responsive design solid, focus on theme consistency across breakpoints

## Plan:
### 1. CSS Variable Updates (style.css)
```
- Update light theme vars: --bg → #ffffff, --text → #000000, --muted → #666666
- Ensure --panel uses light-appropriate rgba(white, 0.95)
- Add --overlaid-cards: #ffffff for light mode cards
- Fix marquees-section { background: #000000 !important; } overriding theme
- RKM slider: body[data-theme=light] .rkms-title:not(.active) h1 { color: rgba(0,0,0,0.1) !important; }
- .scroll-highlight.active { color: var(--accent) !important; background: rgba(var(--accent-rgb), 0.15); } with CSS var --accent-rgb: 252,65,3
```

### 2. Section-Specific Fixes
```
service-progression-section, pain-points-grid, proof-trust-section:
- Light mode: white cards with dark text/shadows
- Add .light-mode class or data-theme selectors for contrast

rkms-slider:
- Titles: active orange, inactive muted gray/black
- Images: brightness filter adjustment for light

marquees-section:
- Force black bg even in light theme (already noted)

hero, nav, etc.:
- Backgrounds, borders adapt properly
```

### 3. Responsive Theme Consistency
```
@media (max-width: 768px):
- Ensure mobile light mode readable (no washed-out text)
- Theme toggle icon visibility
```

### 4. JS Theme Detection Updates (script.js)
```
applyTheme(): Update signature image src for light/dark
Ensure dynamic theme switching re-applies CSS classes
```

## Dependent Files to Edit:
- **Primary**: style.css (90% of work)
- **Secondary**: script.js (theme switching logic)
- **Optional**: index.html (if adding theme-aware classes)

## Followup Steps:
1. Edit files per plan
2. Test light/dark toggle across devices
3. Test animations (GSAP unaffected by theme)
4. Update TODO.md marking steps complete
5. `git add . && git commit -m "fix: complete light mode color fixes" && gh pr create`
6. Run `npx serve .` to demo

<ask_followup_question>
Please confirm this plan addresses your light mode needs, or provide changes before I implement the CSS/JS edits.
</ask_followup_question>

