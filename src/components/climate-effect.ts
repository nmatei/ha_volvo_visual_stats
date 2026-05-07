import { svg } from 'lit';

// Interior cabin area (approximate)
const CABIN_AREA = {
  x: 50,
  y: 80,
  width: 100,
  height: 120,
};

// Steam particle positions (will animate)
const STEAM_PARTICLES = [
  { cx: 80, cy: 120, r: 12, delay: 0 },
  { cx: 100, cy: 140, r: 10, delay: 0.3 },
  { cx: 120, cy: 110, r: 14, delay: 0.6 },
  { cx: 90, cy: 160, r: 11, delay: 0.9 },
  { cx: 110, cy: 150, r: 13, delay: 1.2 },
  { cx: 75, cy: 180, r: 12, delay: 1.5 },
];

export const createClimateEffect = () => {
  return svg`
    <g class="climate-effect">
      <!-- Semi-transparent overlay indicating climate is running -->
      <rect x="${CABIN_AREA.x}" y="${CABIN_AREA.y}" 
            width="${CABIN_AREA.width}" height="${CABIN_AREA.height}"
            fill="#4fc3f7" opacity="0.15" rx="4" />
      
      <!-- Animated steam/fog particles -->
      ${STEAM_PARTICLES.map((particle, index) => 
        svg`
          <circle cx="${particle.cx}" cy="${particle.cy}" r="${particle.r}"
                  fill="url(#steamGradient)" opacity="0.6"
                  class="steam-particle"
                  style="animation-delay: ${particle.delay}s;" />
        `
      )}
    </g>
  `;
};
