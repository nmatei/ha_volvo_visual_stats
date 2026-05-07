import { svg } from 'lit';

// Interior cabin area — matches the dark rect in SVG (x:25-175, y:120-232)
const CABIN_AREA = {
  x: 37,
  y: 130,
  width: 126,
  height: 100,
};

// Steam particle positions within the cabin
const STEAM_PARTICLES = [
  { cx: 65,  cy: 155, r: 10, delay: 0   },
  { cx: 100, cy: 170, r: 9,  delay: 0.3 },
  { cx: 135, cy: 150, r: 11, delay: 0.6 },
  { cx: 80,  cy: 200, r: 10, delay: 0.9 },
  { cx: 120, cy: 210, r: 9,  delay: 1.2 },
  { cx: 100, cy: 195, r: 12, delay: 1.5 },
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
