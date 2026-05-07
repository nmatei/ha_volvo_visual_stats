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

// SVG car illustration as a Lit svg template (not a plain string — Lit would escape it)
const CAR_SVG = svg`
  <!-- === CAR OUTER BODY === -->
  <path d="M 44,12 C 70,6 130,6 156,12 Q 180,22 183,58 L 183,242 Q 180,268 156,278 C 130,284 70,284 44,278 Q 20,268 17,242 L 17,58 Q 20,22 44,12 Z"
        fill="#3d7298" />

  <!-- Hood highlight/sheen -->
  <path d="M 50,13 C 72,7 128,7 150,13 Q 173,21 178,52 L 178,90 Q 153,82 100,81 Q 47,82 22,90 L 22,52 Q 27,21 50,13 Z"
        fill="#5a8fb5" opacity="0.35" />

  <!-- === HEADLIGHTS === -->
  <path d="M 28,18 L 72,15 L 72,30 L 28,33 Z" fill="#c8dde8" opacity="0.85" />
  <rect x="30" y="18" width="40" height="3" rx="1" fill="white" opacity="0.75" />
  <rect x="30" y="22" width="40" height="2" rx="1" fill="#ffffcc" opacity="0.55" />
  <path d="M 128,15 L 172,18 L 172,33 L 128,30 Z" fill="#c8dde8" opacity="0.85" />
  <rect x="130" y="18" width="40" height="3" rx="1" fill="white" opacity="0.75" />
  <rect x="130" y="22" width="40" height="2" rx="1" fill="#ffffcc" opacity="0.55" />

  <!-- Hood grille / logo -->
  <rect x="88" y="13" width="24" height="5" rx="1" fill="#2a5a78" opacity="0.7" />

  <!-- Hood panel lines (subtle) -->
  <line x1="65" y1="16" x2="62" y2="88" stroke="#2d6288" stroke-width="0.5" opacity="0.35" />
  <line x1="135" y1="16" x2="138" y2="88" stroke="#2d6288" stroke-width="0.5" opacity="0.35" />

  <!-- === WINDSHIELD === -->
  <path d="M 36,92 Q 100,85 164,92 L 160,120 Q 130,116 100,115 Q 70,116 40,120 Z"
        fill="#7ab5cf" opacity="0.6" />
  <path d="M 53,94 Q 100,88 147,94 L 144,106 Q 100,101 56,106 Z"
        fill="white" opacity="0.09" />
  <!-- Windshield wipers -->
  <line x1="52" y1="117" x2="97" y2="93" stroke="#111" stroke-width="1" opacity="0.45" />
  <line x1="97" y1="93" x2="142" y2="117" stroke="#111" stroke-width="1" opacity="0.45" />

  <!-- A-pillars -->
  <rect x="25" y="90" width="14" height="32" rx="1" fill="#3d7298" />
  <rect x="161" y="90" width="14" height="32" rx="1" fill="#3d7298" />

  <!-- === INTERIOR AREA === -->
  <rect x="25" y="120" width="150" height="112" rx="2" fill="#0d0d0d" />

  <!-- Door trim panels -->
  <rect x="25" y="120" width="12" height="112" fill="#181818" />
  <rect x="163" y="120" width="12" height="112" fill="#181818" />
  <rect x="26" y="121" width="2" height="110" rx="1" fill="#222" />
  <rect x="172" y="121" width="2" height="110" rx="1" fill="#222" />

  <!-- === DASHBOARD === -->
  <rect x="37" y="120" width="126" height="20" rx="1" fill="#141414" />
  <rect x="42" y="122" width="116" height="14" rx="1" fill="#1c1c1c" />
  <!-- Instrument cluster -->
  <rect x="46" y="123" width="26" height="10" rx="2" fill="#0a0a0a" />
  <ellipse cx="59" cy="128" rx="9" ry="4" fill="#111" stroke="#252525" stroke-width="0.5" />
  <circle cx="59" cy="128" r="2" fill="#1a1a1a" />
  <!-- Center info screen -->
  <rect x="83" y="122" width="34" height="10" rx="1" fill="#0d1a2e" />
  <rect x="84" y="123" width="32" height="8" rx="1" fill="#1a3456" opacity="0.9" />
  <!-- HVAC knobs -->
  <circle cx="127" cy="127" r="3" fill="#222" stroke="#2a2a2a" stroke-width="0.5" />
  <circle cx="137" cy="127" r="3" fill="#222" stroke="#2a2a2a" stroke-width="0.5" />
  <circle cx="147" cy="127" r="3" fill="#222" stroke="#2a2a2a" stroke-width="0.5" />

  <!-- === STEERING WHEEL === -->
  <circle cx="65" cy="142" r="13" fill="none" stroke="#1e1e1e" stroke-width="4" />
  <circle cx="65" cy="142" r="5" fill="#1e1e1e" />
  <line x1="65" y1="129" x2="65" y2="137" stroke="#1e1e1e" stroke-width="2.5" />
  <line x1="65" y1="147" x2="65" y2="155" stroke="#1e1e1e" stroke-width="2.5" />
  <line x1="52" y1="142" x2="60" y2="142" stroke="#1e1e1e" stroke-width="2.5" />
  <line x1="70" y1="142" x2="78" y2="142" stroke="#1e1e1e" stroke-width="2.5" />

  <!-- === CENTER CONSOLE === -->
  <rect x="86" y="138" width="28" height="56" rx="3" fill="#181818" />
  <rect x="89" y="142" width="22" height="14" rx="2" fill="#141414" />
  <circle cx="100" cy="149" r="4" fill="#252525" />
  <!-- Armrest -->
  <rect x="87" y="160" width="26" height="20" rx="3" fill="#121212" />
  <rect x="89" y="162" width="22" height="16" rx="2" fill="#161616" />

  <!-- === FRONT LEFT SEAT === -->
  <rect x="37" y="138" width="44" height="26" rx="3" fill="#1a1a1a" />
  <rect x="39" y="140" width="40" height="22" rx="2" fill="#1f1f1f" />
  <rect x="37" y="165" width="44" height="26" rx="3" fill="#181818" />
  <rect x="39" y="167" width="40" height="22" rx="2" fill="#1d1d1d" />
  <!-- Bolsters -->
  <rect x="37" y="140" width="4" height="48" rx="2" fill="#161616" />
  <rect x="77" y="140" width="4" height="48" rx="2" fill="#161616" />
  <!-- Headrest -->
  <rect x="49" y="130" width="20" height="10" rx="3" fill="#181818" />

  <!-- === FRONT RIGHT SEAT === -->
  <rect x="119" y="138" width="44" height="26" rx="3" fill="#1a1a1a" />
  <rect x="121" y="140" width="40" height="22" rx="2" fill="#1f1f1f" />
  <rect x="119" y="165" width="44" height="26" rx="3" fill="#181818" />
  <rect x="121" y="167" width="40" height="22" rx="2" fill="#1d1d1d" />
  <rect x="119" y="140" width="4" height="48" rx="2" fill="#161616" />
  <rect x="159" y="140" width="4" height="48" rx="2" fill="#161616" />
  <rect x="131" y="130" width="20" height="10" rx="3" fill="#181818" />

  <!-- Floor between seats -->
  <rect x="81" y="165" width="38" height="26" rx="2" fill="#0f0f0f" />

  <!-- === REAR BENCH SEAT === -->
  <rect x="37" y="194" width="126" height="22" rx="3" fill="#1a1a1a" />
  <rect x="39" y="196" width="122" height="18" rx="2" fill="#1f1f1f" />
  <line x1="84" y1="196" x2="84" y2="214" stroke="#111" stroke-width="1" />
  <line x1="116" y1="196" x2="116" y2="214" stroke="#111" stroke-width="1" />
  <rect x="37" y="217" width="126" height="14" rx="3" fill="#181818" />
  <rect x="39" y="218" width="122" height="11" rx="2" fill="#1d1d1d" />
  <!-- Rear headrests -->
  <rect x="46" y="187" width="20" height="10" rx="3" fill="#181818" />
  <rect x="90" y="187" width="20" height="10" rx="3" fill="#181818" />
  <rect x="134" y="187" width="20" height="10" rx="3" fill="#181818" />

  <!-- === REAR WINDOW === -->
  <path d="M 38,232 Q 100,225 162,232 L 158,253 Q 130,257 100,258 Q 70,257 42,253 Z"
        fill="#7ab5cf" opacity="0.55" />

  <!-- B/C pillars (between doors) -->
  <rect x="17" y="192" width="10" height="6" fill="#3d7298" />
  <rect x="173" y="192" width="10" height="6" fill="#3d7298" />

  <!-- === TRUNK === -->
  <path d="M 42,253 L 158,253 Q 178,259 181,272 Q 174,280 156,282 C 130,286 70,286 44,282 Q 26,280 19,272 Q 22,259 42,253 Z"
        fill="#3d7298" />
  <!-- Trunk lid line -->
  <line x1="100" y1="253" x2="100" y2="282" stroke="#2d6288" stroke-width="0.5" opacity="0.4" />

  <!-- === TAILLIGHTS === -->
  <path d="M 22,258 L 64,254 L 64,270 L 22,274 Z" fill="#990000" />
  <path d="M 24,259 L 62,255 L 62,268 L 24,272 Z" fill="#cc0000" opacity="0.9" />
  <path d="M 26,260 L 54,256 L 54,266 L 26,270 Z" fill="#ff2222" opacity="0.65" />
  <path d="M 136,254 L 178,258 L 178,274 L 136,270 Z" fill="#990000" />
  <path d="M 138,255 L 176,259 L 176,272 L 138,268 Z" fill="#cc0000" opacity="0.9" />
  <path d="M 146,256 L 174,260 L 174,268 L 146,264 Z" fill="#ff2222" opacity="0.65" />

  <!-- === WHEELS === -->
  <!-- Front Left -->
  <circle cx="18" cy="88" r="15" fill="#0f0f0f" />
  <circle cx="18" cy="88" r="11" fill="#1a1a1a" />
  <circle cx="18" cy="88" r="6" fill="#262626" />
  <circle cx="18" cy="88" r="2" fill="#333" />
  <line x1="18" y1="77" x2="18" y2="99" stroke="#2a2a2a" stroke-width="1.5" />
  <line x1="7"  y1="88" x2="29" y2="88" stroke="#2a2a2a" stroke-width="1.5" />
  <!-- Front Right -->
  <circle cx="182" cy="88" r="15" fill="#0f0f0f" />
  <circle cx="182" cy="88" r="11" fill="#1a1a1a" />
  <circle cx="182" cy="88" r="6" fill="#262626" />
  <circle cx="182" cy="88" r="2" fill="#333" />
  <line x1="182" y1="77" x2="182" y2="99" stroke="#2a2a2a" stroke-width="1.5" />
  <line x1="171" y1="88" x2="193" y2="88" stroke="#2a2a2a" stroke-width="1.5" />
  <!-- Rear Left -->
  <circle cx="18" cy="218" r="15" fill="#0f0f0f" />
  <circle cx="18" cy="218" r="11" fill="#1a1a1a" />
  <circle cx="18" cy="218" r="6" fill="#262626" />
  <circle cx="18" cy="218" r="2" fill="#333" />
  <line x1="18" y1="207" x2="18" y2="229" stroke="#2a2a2a" stroke-width="1.5" />
  <line x1="7"  y1="218" x2="29" y2="218" stroke="#2a2a2a" stroke-width="1.5" />
  <!-- Rear Right -->
  <circle cx="182" cy="218" r="15" fill="#0f0f0f" />
  <circle cx="182" cy="218" r="11" fill="#1a1a1a" />
  <circle cx="182" cy="218" r="6" fill="#262626" />
  <circle cx="182" cy="218" r="2" fill="#333" />
  <line x1="182" y1="207" x2="182" y2="229" stroke="#2a2a2a" stroke-width="1.5" />
  <line x1="171" y1="218" x2="193" y2="218" stroke="#2a2a2a" stroke-width="1.5" />

  <!-- === MIRRORS === -->
  <path d="M 14,108 Q 8,113 8,121 Q 8,129 14,133 L 26,133 L 26,108 Z" fill="#3d7298" stroke="#2d6288" stroke-width="0.5" />
  <path d="M 10,112 Q 8,116 8,121 Q 8,126 10,130 L 20,130 L 20,112 Z" fill="#4d82a8" opacity="0.7" />
  <path d="M 186,108 Q 192,113 192,121 Q 192,129 186,133 L 174,133 L 174,108 Z" fill="#3d7298" stroke="#2d6288" stroke-width="0.5" />
  <path d="M 190,112 Q 192,116 192,121 Q 192,126 190,130 L 180,130 L 180,112 Z" fill="#4d82a8" opacity="0.7" />

  <!-- === SIDE WINDOW GLASS (subtle tint on door panels) === -->
  <rect x="25" y="120" width="12" height="72" fill="#7ab5cf" opacity="0.12" />
  <rect x="163" y="120" width="12" height="72" fill="#7ab5cf" opacity="0.12" />
  <rect x="25" y="192" width="12" height="40" fill="#7ab5cf" opacity="0.10" />
  <rect x="163" y="192" width="12" height="40" fill="#7ab5cf" opacity="0.10" />
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
