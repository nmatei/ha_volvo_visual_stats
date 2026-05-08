import { svg } from 'lit';
import { CarState } from '../types';

// Wheel positions for 300x612 viewBox (top-down view of Volvo XC40)
// Wheels are typically at corners of the car body
// Positions estimated from the car structure in default.svg
const WHEEL_POSITIONS = {
  front_left:  { cx: 35,  cy: 80  },
  front_right: { cx: 265, cy: 80  },
  back_left:   { cx: 35,  cy: 520 },
  back_right:  { cx: 265, cy: 520 },
};

const PRESSURE_INDICATOR_RADIUS = 12;

export const createTirePressureIndicators = (carState: CarState) => {
  const { tire_pressure } = carState;

  return svg`
    <g class="tire-pressure-indicators">
      <!-- Front Left -->
      ${tire_pressure.front_left_warning 
        ? createPressureIndicator(WHEEL_POSITIONS.front_left) 
        : ''}
      
      <!-- Front Right -->
      ${tire_pressure.front_right_warning 
        ? createPressureIndicator(WHEEL_POSITIONS.front_right) 
        : ''}
      
      <!-- Back Left -->
      ${tire_pressure.back_left_warning 
        ? createPressureIndicator(WHEEL_POSITIONS.back_left) 
        : ''}
      
      <!-- Back Right -->
      ${tire_pressure.back_right_warning 
        ? createPressureIndicator(WHEEL_POSITIONS.back_right) 
        : ''}
    </g>
  `;
};

const createPressureIndicator = (pos: { cx: number; cy: number }) => {
  return svg`
    <!-- Outer glow (red pulsing) -->
    <circle cx="${pos.cx}" cy="${pos.cy}" 
            r="${PRESSURE_INDICATOR_RADIUS}"
            fill="none" stroke="#ff0000" stroke-width="2"
            opacity="0.8" class="glow" />
    
    <!-- Inner red circle -->
    <circle cx="${pos.cx}" cy="${pos.cy}" 
            r="${PRESSURE_INDICATOR_RADIUS - 2}"
            fill="#ff0000" opacity="0.6" />
    
    <!-- Warning symbol (!) -->
    <text x="${pos.cx}" y="${pos.cy + 2}" 
          text-anchor="middle" font-size="8" 
          fill="#ffffff" font-weight="bold">!</text>
  `;
};
