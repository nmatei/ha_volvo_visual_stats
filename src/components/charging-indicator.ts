import { svg } from 'lit';

// Charging port — Volvo XC40 typically has it on the left front fender (driver side)
// Position scaled for 300x612 viewBox
const CHARGING_PORT = {
  cx: 25,   // Left side of car, between front wheel and mirror
  cy: 160,
  outerRadius: 15,
  innerRadius: 9,
};

export const createChargingIndicator = () => {
  return svg`
    <g class="charging-indicator">
      <!-- Outer glow circle -->
      <circle cx="${CHARGING_PORT.cx}" cy="${CHARGING_PORT.cy}" 
              r="${CHARGING_PORT.outerRadius}"
              fill="none" stroke="#00ff00" stroke-width="2"
              opacity="0.8" class="glow" />
      
      <!-- Inner circle -->
      <circle cx="${CHARGING_PORT.cx}" cy="${CHARGING_PORT.cy}" 
              r="${CHARGING_PORT.innerRadius}"
              fill="#00ff00" opacity="0.6" />
      
      <!-- Charge bolt symbol -->
      <g transform="translate(${CHARGING_PORT.cx}, ${CHARGING_PORT.cy})">
        <path d="M 0,-4 L -2,0 L 0,2 L 2,0 Z"
              fill="#ffffff" opacity="0.9" />
      </g>
    </g>
  `;
};
