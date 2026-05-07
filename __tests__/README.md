# Integration Tests

This directory contains integration tests and preview pages for the Volvo Visual Stats card.

## test-page.html

A standalone HTML test page that allows you to preview how the card looks with different vehicle states.

### How to Use

1. Open `__tests__/test-page.html` in your web browser
2. Click the scenario buttons to simulate different vehicle states:
   - **Default (All Clear)** - All systems normal
   - **Windows Open** - Front windows open
   - **Doors Open** - Multiple doors open
   - **Climate Running** - Climate system active (shows animated steam)
   - **Charging** - Vehicle charging (shows green glow)
   - **Tire Warnings** - Tire pressure alerts (shows red indicators)
   - **All Active** - All systems active simultaneously

### Visual Elements to Check

- **Orange Lines**: Appear around windows/doors when open
- **Blue Overlay + Steam Animation**: Shows when climate is running
- **Green Glow**: Appears around charging port when charging
- **Red Indicators**: Appear at wheel positions when tire pressure warnings active
- **State Info**: Below each card shows real-time state values

### Scenarios

Each scenario simulates real Home Assistant entity states. The test page includes:

- Full mock Home Assistant states for each scenario
- Real-time state display below the card
- Button toggles for quick scene switching
- Responsive design that works on desktop and mobile

### Testing Checklist

- [ ] Windows open indicator shows orange lines
- [ ] Climate animation (steam particles) is smooth
- [ ] Charging glow pulses correctly
- [ ] Tire warnings appear at correct wheel positions
- [ ] State info updates when scenario changes
- [ ] Card is responsive (works on different screen sizes)
- [ ] Animations are smooth (no flickering)

### Future Test Enhancements

- Automated screenshot comparison tests
- Unit tests for state parsing logic
- E2E tests in actual Home Assistant sandbox
- Performance profiling for animation smoothness
