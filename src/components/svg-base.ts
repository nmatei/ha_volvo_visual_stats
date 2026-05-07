import { html, svg } from 'lit';
import { CarState } from '../types';
import { createWindowsDoorOverlay } from './windows-doors';
import { createClimateEffect } from './climate-effect';
import { createChargingIndicator } from './charging-indicator';
import { createTirePressureIndicators } from './tire-pressure';

// SVG coordinate system for the car
// Base: 200x300 (portrait, roughly 9:16 aspect ratio)
const SVG_WIDTH = 200;
const SVG_HEIGHT = 300;

// SVG car illustration (top-down view, simple but realistic Volvo)
const CAR_SVG = `
  <!-- Car body (realistic shape) -->
  <g class="car-body">
    <!-- Main chassis -->
    <path d="M 50 30 L 150 30 Q 165 35 165 50 L 165 250 Q 165 265 150 270 L 50 270 Q 35 265 35 250 L 35 50 Q 35 35 50 30 Z" 
          fill="#5a6b7d" stroke="#3d4551" stroke-width="2" />
    
    <!-- Front windshield -->
    <ellipse cx="100" cy="45" rx="45" ry="20" fill="#7fb3d5" opacity="0.6" stroke="#4a6fa5" stroke-width="1.5" />
    
    <!-- Rear window -->
    <ellipse cx="100" cy="255" rx="40" ry="18" fill="#7fb3d5" opacity="0.6" stroke="#4a6fa5" stroke-width="1.5" />
    
    <!-- Side windows (left and right) -->
    <rect x="32" y="85" width="12" height="50" rx="2" fill="#7fb3d5" opacity="0.5" stroke="#4a6fa5" stroke-width="1" />
    <rect x="156" y="85" width="12" height="50" rx="2" fill="#7fb3d5" opacity="0.5" stroke="#4a6fa5" stroke-width="1" />
  </g>
  
  <!-- Wheels (dark circles at corners) -->
  <g class="wheels">
    <circle cx="42" cy="50" r="7" fill="#222" stroke="#000" stroke-width="1" />
    <circle cx="158" cy="50" r="7" fill="#222" stroke="#000" stroke-width="1" />
    <circle cx="42" cy="250" r="7" fill="#222" stroke="#000" stroke-width="1" />
    <circle cx="158" cy="250" r="7" fill="#222" stroke="#000" stroke-width="1" />
    
    <!-- Wheel hubs -->
    <circle cx="42" cy="50" r="3" fill="#555" />
    <circle cx="158" cy="50" r="3" fill="#555" />
    <circle cx="42" cy="250" r="3" fill="#555" />
    <circle cx="158" cy="250" r="3" fill="#555" />
  </g>
`;

export const renderSvgOverlay = (carState: CarState) => {
  return svg`
    <svg
      viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <style>
          @keyframes steam-rise {
            0% { transform: translateY(0px); opacity: 0.6; }
            50% { opacity: 0.4; }
            100% { transform: translateY(-20px); opacity: 0; }
          }
          
          @keyframes glow-pulse {
            0%, 100% { filter: drop-shadow(0 0 4px); }
            50% { filter: drop-shadow(0 0 8px); }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .steam-particle {
            animation: steam-rise 2s infinite ease-out;
          }
          
          .glow {
            animation: glow-pulse 1.5s infinite;
          }
          
          .rotating {
            animation: rotate 20s linear infinite;
            transform-origin: center;
          }
        </style>
        <radialGradient id="steamGradient">
          <stop offset="0%" style="stop-color:#e3f2fd;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#90caf9;stop-opacity:0" />
        </radialGradient>
        <radialGradient id="chargeGlow">
          <stop offset="0%" style="stop-color:#00ff00;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#00aa00;stop-opacity:0" />
        </radialGradient>
        <radialGradient id="pressureGlow">
          <stop offset="0%" style="stop-color:#ff0000;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#aa0000;stop-opacity:0" />
        </radialGradient>
      </defs>

      <!-- Car body (SVG illustration) -->
      ${CAR_SVG}

      <!-- Windows and doors overlay -->
      ${createWindowsDoorOverlay(carState)}

      <!-- Climate effect (steam/fog) -->
      ${carState.climate.active ? createClimateEffect() : ''}

      <!-- Charging indicator -->
      ${carState.charging.isCharging ? createChargingIndicator() : ''}

      <!-- Tire pressure warnings -->
      ${createTirePressureIndicators(carState)}
    </svg>
  `;
};
