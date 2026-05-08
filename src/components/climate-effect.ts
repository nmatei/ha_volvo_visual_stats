import { svg } from 'lit';

// Interior cabin area — interior section of the car (approximate for 300x612 viewBox)
const CABIN_AREA = {
  x: 50,
  y: 180,
  width: 200,
  height: 250,
};

// Steam particle positions within the cabin
const STEAM_PARTICLES = [
  { cx: 100,  cy: 250, r: 15, delay: 0   },
  { cx: 150, cy: 280, r: 14,  delay: 0.3 },
  { cx: 200, cy: 240, r: 16, delay: 0.6 },
  { cx: 120,  cy: 320, r: 15, delay: 0.9 },
  { cx: 180, cy: 340, r: 14,  delay: 1.2 },
  { cx: 150, cy: 310, r: 17, delay: 1.5 },
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
