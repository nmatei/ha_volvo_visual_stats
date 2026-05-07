# Volvo Visual Stats - Development Guidelines

## Project Overview

This is a **Home Assistant custom card** for displaying Volvo vehicle status with real-time visual indicators.

**Repository Structure:** Single-repo with sources (`src/`) and compiled output (`dist/`)
**Build System:** Rollup + TypeScript
**Distribution:** HACS (Home Assistant Community Store)

---

## Architecture & Key Decisions

### Configuration Approach (Dynamic Entity ID Mapping)

The card uses a **prefix-based + override system** for entity mapping:

1. **User provides `id_prefix`** (e.g., `volvo_xc40_`, `volvo_`)
2. **Card auto-generates entity IDs** from the prefix + standard suffixes
3. **User can override specific entities** if naming differs

**Example:** With `id_prefix: volvo_xc40_`
- Auto-generates: `binary_sensor.volvo_xc40_window_front_left_open`
- User can override: `binary_sensor.custom_front_left_window_sensor`

**Benefits:**
- Zero-config for standard Volvo integration users
- Flexible for custom entity names
- No UI editor complexity (YAML-only)

### Entity Name Patterns

| Component | Auto-Generated | Override Config |
|-----------|---|---|
| Window FL Open | `binary_sensor.{prefix}window_front_left_open` | `entities.windows_doors.window_front_left` |
| Door Trunk | `binary_sensor.{prefix}trunk_open` | `entities.windows_doors.trunk` |
| Climate Active | `binary_sensor.{prefix}climate_active` | `entities.climate.active` |
| Charging | `sensor.{prefix}charging_status` | `entities.charging.status` |
| Tire Pressure FL | `sensor.{prefix}tire_pressure_front_left_warning` | `entities.tire_pressure.front_left_warning` |

### SVG Rendering

- **Base Image:** Placeholder (will reference `src/assets/default.PNG`)
- **Overlay Strategy:** SVG layers on top of base image
- **Visual Elements:**
  - **Orange lines** around windows when open
  - **Animated steam/fog** inside cabin when climate active
  - **Green pulsing glow** around charging port when charging
  - **Red indicator dots** at wheels when tire pressure warning

### State Management

`CarState` interface in `types.ts` holds current car state:
```typescript
{
  windows_doors: { window_front_left: false, ... },
  climate: { active: false },
  charging: { isCharging: false, status: 'idle' },
  tire_pressure: { front_left_warning: false, ... }
}
```

Updated every time `hass.states` changes via Lit's reactive system.

---

## File Structure

```
src/
├── volvo-stats-card.ts          # Main Lit component
├── types.ts                      # TypeScript interfaces
├── components/
│   ├── svg-base.ts              # SVG container & rendering
│   ├── windows-doors.ts         # Window/door overlays
│   ├── climate-effect.ts        # Animated steam/fog
│   ├── charging-indicator.ts    # Green glow charging
│   └── tire-pressure.ts         # Red warning indicators
└── assets/
    └── default.PNG              # Base car image

dist/
└── volvo-visual-stats.js         # Built single file (auto-generated)

.github/workflows/
└── build.yml                     # GitHub Actions: auto-build on push
```

---

## Development Workflow

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Watch mode** (auto-rebuild on file changes)
   ```bash
   npm run watch
   ```

3. **Manual build**
   ```bash
   npm run build
   ```

### Adding Features

**To add a new visual indicator:**

1. Create component in `src/components/your-component.ts`
2. Export render function that takes `CarState` and returns SVG
3. Add state type to `CarState` interface in `types.ts`
4. Import and call in `src/components/svg-base.ts`
5. Add entity mapping in `volvo-stats-card.ts` getEntityId() method

**Example:** Adding headlights status
```typescript
// 1. In types.ts
export interface HeadlightsState {
  on: boolean;
}
// Add to CarState: headlights: HeadlightsState

// 2. In src/components/headlights.ts
export const createHeadlightsIndicator = (carState: CarState) => {
  return svg`<!-- SVG here -->`;
};

// 3. In src/components/svg-base.ts
${carState.headlights.on ? createHeadlightsIndicator() : ''}

// 4. In volvo-stats-card.ts
getEntityId(...): Add headlights case
updateCarState(): Add headlights state extraction
```

---

## Build Pipeline (GitHub Actions)

**Trigger:** Push to `main` branch with changes to `src/`, `package.json`, etc.

**Steps:**
1. Checkout code
2. Setup Node.js 18
3. Install dependencies (`npm install`)
4. Build TypeScript → JavaScript (`npm run build`)
5. Verify `dist/volvo-visual-stats.js` exists
6. Create GitHub release with build artifacts
7. Commit `dist/` folder back to repo (if changed)

**Output:** Single file `dist/volvo-visual-stats.js` ready for HACS

---

## HACS Distribution

**How users get this card:**

1. User adds repository: `nmatei/ha_volvo_visual_stats`
2. HACS reads `hacs.json` → finds `filename: volvo-visual-stats.js`
3. HACS downloads `dist/volvo-visual-stats.js` to user's HA installation
4. User adds to lovelace dashboard YAML with entity config
5. Card renders with real-time state updates

**User never sees** `src/` or `package.json` — only the compiled `dist/volvo-visual-stats.js`

---

## Testing Checklist

- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] `dist/volvo-visual-stats.js` is a single ES module file
- [ ] File size is reasonable (~50-100KB unminified)
- [ ] Test in Home Assistant dev environment:
  - [ ] Card loads without console errors
  - [ ] All entity mappings work with standard Volvo integration
  - [ ] Visual indicators (windows, climate, charging, tires) toggle correctly
  - [ ] Animations are smooth (steam, glow pulses)
  - [ ] Responsive on mobile/tablet

---

## Known Limitations & Future Improvements

**Current:**
- Placeholder SVG (base image not embedded yet)
- No UI editor (YAML-only configuration)
- Single car model layout
- No color customization

**Future Enhancements:**
- Embed actual `default.PNG` as WebP or optimized PNG
- Color theme customization via config
- Support multiple Volvo models with different layouts
- UI editor for entity selection
- Lock/unlock status indicator
- Battery level indicator
- Odometer/range display
- Geolocation pin (if available)

---

## Key Dependencies

- **Lit 3.0:** Web component library
- **custom-card-helpers:** Home Assistant integration utilities
- **Rollup 4:** Module bundler
- **TypeScript 5:** Static typing
- **Babel 7:** JavaScript transpilation for browser compatibility

---

## Troubleshooting

**Build fails with TypeScript errors:**
- Check `src/` files for type mismatches
- Run `npx tsc --noEmit` to see full errors

**Build succeeds but card doesn't load in HA:**
- Verify `dist/volvo-visual-stats.js` is valid ES module
- Check browser console for import errors
- Ensure custom card is registered with `@customElement('volvo-visual-stats')`

**Card loads but no data shows:**
- Verify entity IDs exist in HA: Settings → Developer Tools → States
- Check card config has correct `id_prefix` or entity overrides
- View browser console for state fetch errors

---

## References

- [Power Flow Card Plus](https://github.com/flixlix/power-flow-card-plus) - Architecture reference
- [Lit Documentation](https://lit.dev/)
- [Home Assistant Custom Cards](https://developers.home-assistant.io/docs/frontend/custom-cards)
- [HACS Documentation](https://hacs.xyz/)
