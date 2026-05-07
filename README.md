# Volvo Visual Stats

A Home Assistant custom card that displays your Volvo vehicle status with beautiful real-time visual indicators.

![Volvo Visual Stats Card](https://raw.githubusercontent.com/nmatei/ha_volvo_visual_stats/main/images/default.PNG)

## Features

- 🚗 **Real-time Vehicle Status:** Displays windows, doors, climate, charging, and tire pressure
- 🎨 **Beautiful SVG Overlays:** Animated visual indicators with smooth transitions
- 🪟 **Window/Door Indicators:** Orange lines when windows/doors are open
- ❄️ **Climate Effect:** Animated steam/fog when climate is active
- ⚡ **Charging Status:** Green glowing indicator when vehicle is charging
- ⚠️ **Tire Pressure Alerts:** Red warnings at wheels when pressure is low
- ⚙️ **Zero-Config:** Works out-of-box with standard Volvo integration naming
- 🔧 **Flexible:** Override entity IDs if your setup differs

## Installation

### 1. Install via HACS Custom Repository (Easiest)

1. Open Home Assistant → **HACS** (Community Store)
2. Click the **three dots** (⋯) in the top-right corner
3. Select **"Custom repositories"**
4. Paste the repository URL: `https://github.com/nmatei/ha_volvo_visual_stats`
5. Select **Category:** `Lovelace`
6. Click **"Create"**
7. The repository will appear in HACS
8. Click on **"Volvo Visual Stats"** → Click **"Download"**
9. Follow the prompts and **restart Home Assistant**

### 2. Install via HACS Official (Once approved)

Once the repository is added to the official HACS list:

1. Open Home Assistant → **HACS**
2. Search for **"Volvo Visual Stats"**
3. Click **"Download this repository"**
4. Follow the prompts and restart Home Assistant

### 3. Manual Installation

1. Download `dist/volvo-visual-stats.js` from [Latest Release](https://github.com/nmatei/ha_volvo_visual_stats/releases)
2. Copy to: `config/www/volvo-visual-stats.js`
3. Add to your `ui-lovelace.yaml` or dashboard YAML:
```yaml
resources:
  - url: /local/volvo-visual-stats.js
    type: module
```

## Prerequisites

1. **Home Assistant** 2024.1.0 or later
2. **HACS** installed (see [HACS installation](https://hacs.xyz/docs/setup/prerequisites))
3. **Volvo Integration** installed and configured
   - Settings → Devices & Services → Create Automation → Search "Volvo"
   - Follow the OAuth flow to connect your Volvo account

## How HACS Discovers Repositories

### Option A: Custom Repository (Fastest for New Projects)
- Users manually add your GitHub repo URL in HACS → Custom repositories
- **No approval needed** - works immediately after you push to GitHub
- This is the easiest way to start

### Option B: Official HACS List (More Discoverable)
- Your repo is added to the official [HACS manifests](https://github.com/hacs/integration)
- Users can find it by searching in HACS without adding custom repo
- **Requires:** Your repo must meet HACS standards:
  - `README.md` with clear installation instructions ✅
  - `hacs.json` with correct metadata ✅
  - Proper file structure and release artifacts ✅

**To add to official HACS:**
1. Ensure your repo meets requirements (it does!)
2. Go to [HACS Manifests Repository](https://github.com/hacs/integration)
3. Create a new file: `manifest/YOUR_REPO_NAME.json`
4. Submit a pull request with your repo details
5. HACS team reviews and approves

For now, **use Option A** (custom repo) for testing and distribution!

## Configuration

### Basic Configuration (Recommended)

```yaml
type: custom:volvo-visual-stats
id_prefix: volvo_xc40_
title: My Volvo
```

Replace `volvo_xc40_` with your Volvo integration's entity prefix:
- Standard Volvo integration uses: `volvo_` or `volvo_xc40_` (check Developer Tools → States)

### Advanced Configuration (with overrides)

If your entity names differ from the standard, override specific ones:

```yaml
type: custom:volvo-visual-stats
id_prefix: volvo_
entities:
  windows_doors:
    window_front_left: binary_sensor.my_car_front_left_window
    trunk: binary_sensor.tailgate_open
  climate:
    active: binary_sensor.climate_running
  charging:
    status: binary_sensor.is_charging
  tire_pressure:
    front_left_warning: sensor.fl_pressure_warning
    front_right_warning: sensor.fr_pressure_warning
    back_left_warning: sensor.bl_pressure_warning
    back_right_warning: sensor.br_pressure_warning
```

### Full Configuration Options

```yaml
type: custom:volvo-visual-stats

# REQUIRED: Entity ID prefix (e.g., volvo_xc40_, volvo_)
id_prefix: volvo_xc40_

# OPTIONAL: Card title
title: My Volvo

# OPTIONAL: Override specific entity mappings
entities:
  windows_doors:
    window_front_left: binary_sensor.custom_window_fl
    window_front_right: binary_sensor.custom_window_fr
    window_back_left: binary_sensor.custom_window_bl
    window_back_right: binary_sensor.custom_window_br
    door_front_left: binary_sensor.custom_door_fl
    door_front_right: binary_sensor.custom_door_fr
    door_back_left: binary_sensor.custom_door_bl
    door_back_right: binary_sensor.custom_door_br
    trunk: binary_sensor.custom_trunk
    frunk: binary_sensor.custom_frunk
  
  climate:
    active: binary_sensor.custom_climate_status
  
  charging:
    status: sensor.custom_charging_status
  
  tire_pressure:
    front_left_warning: sensor.custom_tire_fl_warning
    front_right_warning: sensor.custom_tire_fr_warning
    back_left_warning: sensor.custom_tire_bl_warning
    back_right_warning: sensor.custom_tire_br_warning
```

## Entity Mapping Reference

### Auto-Generated Entity Names (from id_prefix)

With `id_prefix: volvo_xc40_`, the card automatically looks for:

| Component | Entity ID |
|-----------|-----------|
| Window Front Left | `binary_sensor.volvo_xc40_window_front_left_open` |
| Window Front Right | `binary_sensor.volvo_xc40_window_front_right_open` |
| Window Back Left | `binary_sensor.volvo_xc40_window_back_left_open` |
| Window Back Right | `binary_sensor.volvo_xc40_window_back_right_open` |
| Door Front Left | `binary_sensor.volvo_xc40_door_front_left_open` |
| Door Front Right | `binary_sensor.volvo_xc40_door_front_right_open` |
| Door Back Left | `binary_sensor.volvo_xc40_door_back_left_open` |
| Door Back Right | `binary_sensor.volvo_xc40_door_back_right_open` |
| Trunk/Boot | `binary_sensor.volvo_xc40_trunk_open` |
| Frunk (Hood) | `binary_sensor.volvo_xc40_frunk_open` |
| Climate Active | `binary_sensor.volvo_xc40_climate_active` |
| Charging Status | `sensor.volvo_xc40_charging_status` |
| Tire Pressure FL Warning | `sensor.volvo_xc40_tire_pressure_front_left_warning` |
| Tire Pressure FR Warning | `sensor.volvo_xc40_tire_pressure_front_right_warning` |
| Tire Pressure BL Warning | `sensor.volvo_xc40_tire_pressure_back_left_warning` |
| Tire Pressure BR Warning | `sensor.volvo_xc40_tire_pressure_back_right_warning` |

### Finding Your Entity IDs

1. Open Home Assistant
2. Go to **Settings** → **Developer Tools** → **States**
3. Filter for `binary_sensor.volvo` or `sensor.volvo`
4. Note your actual entity IDs (they may vary by Volvo model)

## Visual Indicators

### Windows & Doors
- **Orange lines** appear around the window/door outline when open
- All windows (front-left, front-right, back-left, back-right) are tracked individually

### Climate Status
- **Semi-transparent blue overlay** with **animated steam/fog particles** when climate is running
- Particles fade upward smoothly for realistic effect

### Charging Status
- **Green pulsing glow** around the charging port (right side of vehicle)
- Glow pulses to indicate active charging

### Tire Pressure Alerts
- **Red warning indicators** at each wheel corner when pressure alert is active
- Exclamation mark (!) symbol in each warning dot
- Independently shows status of each wheel

## Dashboard Examples

### Minimal Setup
```yaml
type: custom:volvo-visual-stats
id_prefix: volvo_xc40_
```

### With Other Cards
```yaml
type: custom:layout-card
cards:
  - type: custom:volvo-visual-stats
    id_prefix: volvo_xc40_
    title: My Volvo
  
  - type: entities
    title: Vehicle Details
    entities:
      - binary_sensor.volvo_xc40_window_front_left_open
      - binary_sensor.volvo_xc40_climate_active
      - sensor.volvo_xc40_charging_status
      - sensor.volvo_xc40_battery_level
```

## Troubleshooting

### Card Not Loading

**Check 1: Verify resources**
- Settings → Dashboards → Edit Dashboard (click three dots)
- Check that resource is added: `/local/volvo-visual-stats.js`

**Check 2: Browser console**
- Press F12, check Console tab for errors
- Common error: "Custom element not defined" → card file not loading

**Check 3: Clear cache**
- Force refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### No Data Shows

**Check 1: Entity IDs exist**
- Developer Tools → States
- Filter `volvo` and verify entities exist
- Copy actual entity IDs into your card config

**Check 2: Entity ID prefix**
- Some Volvo integrations use different prefixes
- Try `volvo_`, `volvo_v90_`, `volvo_xc40_`, etc.
- Check **Developer Tools → States** for the exact prefix

**Check 3: Override missing entities**
```yaml
type: custom:volvo-visual-stats
id_prefix: volvo_
entities:
  windows_doors:
    window_front_left: binary_sensor.my_actual_entity_id
```

### Indicators Not Updating

1. Verify entity state changes in **Developer Tools → States**
2. Check entity state is `on`/`off` or `open`/`closed`
3. Try full page refresh (Ctrl+Shift+R)

## Feature Requests & Issues

- **GitHub Issues:** https://github.com/nmatei/ha_volvo_visual_stats/issues
- **Discussions:** https://github.com/nmatei/ha_volvo_visual_stats/discussions

## Development

See `.github/copilot-instructions.md` for development setup and architecture details.

### Build Locally

```bash
git clone https://github.com/nmatei/ha_volvo_visual_stats.git
cd ha_volvo_visual_stats
npm install
npm run build
```

## License

MIT License - See LICENSE file for details

## Credits

- Inspired by [Power Flow Card Plus](https://github.com/flixlix/power-flow-card-plus)
- Built with [Lit](https://lit.dev/)
- For use with [Home Assistant](https://www.home-assistant.io/)
