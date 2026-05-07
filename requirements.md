# Volvo Visual Stats - Home Assistant Custom Card

A custom Home Assistant card for displaying Volvo vehicle status with real-time visual indicators.

## Requirements (Implemented)

### Functional Requirements
- **Volvo Integration Integration:** Works with Home Assistant's Volvo integration (entity: `volvo_*`)
- **Entity Auto-Discovery:** Scans available `binary_sensor.*` and `sensor.*` entities from Volvo integration
- **Visual Status Indicators:**
  - ✅ **Windows/Doors:** Orange lines around windows when open (front-left, front-right, back-left, back-right)
  - ✅ **Doors:** Visual indicators for door open state (front-left, front-right, back-left, back-right, trunk, frunk)
  - ✅ **Climate:** Animated steam/fog effect inside cabin when climate is active
  - ✅ **Charging:** Green pulsing glow around charging port when charging
  - ✅ **Tire Pressure:** Red warning indicators at each wheel when pressure alert active

### Visual Design
- ✅ SVG-based overlays on base car image (`default.PNG`)
- ✅ Realistic colors: multiple blues for depth
- ✅ Smooth animations: glow pulses, steam rise effects
- ✅ Drop shadows for depth perception

### Configuration
- ✅ **Prefix-based Entity Mapping:** `id_prefix: volvo_xc40_` auto-generates entity IDs
- ✅ **Selective Overrides:** Users can override specific entity IDs if different
- ✅ **Zero-Config for Standard Users:** Works out-of-box with standard Volvo integration naming
- ✅ **YAML-Only Configuration:** No UI editor needed (simpler, faster)

### Build & Distribution
- ✅ **Single Repository:** Sources (`src/`) + build output (`dist/`) in one repo
- ✅ **Automated Build Pipeline:** GitHub Actions auto-builds on every commit
- ✅ **HACS Compatible:** Registered via `hacs.json`, single `volvo-visual-stats.js` file distributed
- ✅ **Single Bundle:** Compiled to single ES module file for HACS compatibility

---

## Architecture Overview

### Technology Stack
- **Framework:** Lit (LitElement) - lightweight, HACS-proven
- **Language:** TypeScript 5
- **Build Tool:** Rollup 4 + Babel 7
- **Distribution:** GitHub + HACS

### File Structure
```
src/
├── volvo-stats-card.ts              # Main custom card component
├── types.ts                          # TypeScript interfaces & types
├── components/
│   ├── svg-base.ts                  # SVG rendering container
│   ├── windows-doors.ts             # Window/door overlay component
│   ├── climate-effect.ts            # Animated climate effect (steam/fog)
│   ├── charging-indicator.ts        # Charging status indicator (green glow)
│   └── tire-pressure.ts             # Tire pressure warning indicators (red)
└── assets/
    └── default.PNG                  # Base car image (reference)

.github/
├── workflows/
│   └── build.yml                    # GitHub Actions: auto-build on push
└── copilot-instructions.md          # Development guidelines

hacs.json                            # HACS registry configuration
package.json                         # Dependencies & build scripts
tsconfig.json                        # TypeScript configuration
rollup.config.js                     # Bundler configuration
```

### Entity Configuration Strategy

**Prefix-Based Mapping:**
Users provide `id_prefix` (e.g., `volvo_xc40_`), card auto-generates:
- `binary_sensor.{prefix}window_front_left_open`
- `binary_sensor.{prefix}climate_active`
- `sensor.{prefix}charging_status`
- `sensor.{prefix}tire_pressure_front_left_warning`

**Selective Overrides:**
Users can override specific entity IDs in config if their naming differs.

**Example Config:**
```yaml
type: custom:volvo-visual-stats
id_prefix: volvo_xc40_
entities:
  windows_doors: {}  # Uses defaults
  climate: {}        # Uses defaults
  charging: {}       # Uses defaults
  tire_pressure: {}  # Uses defaults
```

---

## Build & Distribution Process

### 1. Local Development
```bash
npm install          # Install dependencies
npm run watch        # Auto-rebuild on file changes
npm run build        # Manual build
```

### 2. GitHub Actions Workflow
- **Trigger:** Push to `main` branch with changes to `src/` or config files
- **Steps:**
  1. Checkout code
  2. Install Node.js 18 + dependencies
  3. Build TypeScript → JavaScript
  4. Verify `dist/volvo-visual-stats.js` exists
  5. Create GitHub release with build artifacts
  6. Commit `dist/` back to repo

### 3. User Installation (via HACS)
1. User adds repository: `nmatei/ha_volvo_visual_stats`
2. HACS reads `hacs.json` → downloads `dist/volvo-visual-stats.js`
3. User adds to Home Assistant dashboard YAML
4. Card loads and displays real-time Volvo status

**User never sees source code** — only the compiled single-file bundle.

---

## Visual Indicators Implementation

### Windows & Doors
- **Orange lines** drawn around window/door boundaries when open
- **Dashed rectangles** for doors
- SVG `<line>` and `<rect>` elements with stroke styling

### Climate Effect
- **Semi-transparent blue overlay** on cabin area
- **Animated particles** (circles) that fade upward (steam/fog rise animation)
- Uses `@keyframes steam-rise` CSS animation

### Charging Indicator
- **Green pulsing glow** around charging port area
- **Concentric circles:** outer glow + inner solid dot
- White lightning bolt symbol in center
- Uses `@keyframes glow-pulse` for animation

### Tire Pressure Warnings
- **Red warning indicators** at each wheel position
- **Animated glow pulse** similar to charging
- **Exclamation mark (!)** symbol in center
- Only visible when pressure warning sensor is "on"

---

## Configuration Examples

### Minimal (Standard Volvo Integration)
```yaml
type: custom:volvo-visual-stats
id_prefix: volvo_xc40_
```

### With Title
```yaml
type: custom:volvo-visual-stats
id_prefix: volvo_
title: "My Volvo XC40"
```

### With Entity Overrides
```yaml
type: custom:volvo-visual-stats
id_prefix: volvo_
entities:
  windows_doors:
    window_front_left: binary_sensor.custom_front_left_window
    trunk: binary_sensor.tailgate_open
  charging:
    status: binary_sensor.is_charging  # Different entity type
```

---

## Features & Status

### Implemented ✅
- SVG overlay rendering with animations
- Window/door open indicators (orange lines)
- Climate effect (animated steam)
- Charging indicator (green glow)
- Tire pressure warnings (red indicators)
- Prefix-based entity mapping
- Selective entity overrides
- GitHub Actions auto-build
- HACS registration
- TypeScript + Lit component
- Single-file bundle output

### Future Enhancements 🔄
- Embed actual car PNG image
- UI editor for entity selection
- Color theme customization
- Lock/unlock status
- Battery level indicator
- Odometer/range display
- Support multiple car models
- Geolocation visualization

---

## References

- **Power Flow Card Plus:** Architecture inspiration - https://github.com/flixlix/power-flow-card-plus
- **Lit Documentation:** https://lit.dev/
- **Home Assistant Custom Cards:** https://developers.home-assistant.io/docs/frontend/custom-cards
- **HACS Distribution:** https://hacs.xyz/

---

## Development

See `.github/copilot-instructions.md` for detailed development guidelines, troubleshooting, and contribution instructions.

