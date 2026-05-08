import { html, svg } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { CarState } from '../types';
import { createWindowsDoorOverlay } from './windows-doors';
import { createClimateEffect } from './climate-effect';
import { createChargingIndicator } from './charging-indicator';
import { createTirePressureIndicators } from './tire-pressure';
import { defaultSvgContent } from '../assets/car-svg';

// SVG coordinate system for the car
// Volvo XC40 top-down view: 300x612 (portrait aspect ratio)
const SVG_WIDTH = 300;
const SVG_HEIGHT = 612;


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

      <!-- Car body (SVG illustration from default.svg) -->
      ${unsafeSVG(defaultSvgContent || '')}

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
