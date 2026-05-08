import { svg } from 'lit';
import { CarState } from '../types';

// Window positions for 300x612 viewBox (top-down view)
// Windows are side glass strips on the left and right of the car
// Scaled from original 200x300 coordinates to match default.svg dimensions
const WINDOW_POSITIONS = {
  front_left:  { x: 25, y: 120, width: 12, height: 72 },
  front_right: { x: 263, y: 120, width: 12, height: 72 },
  back_left:   { x: 25, y: 192, width: 12, height: 40 },
  back_right:  { x: 263, y: 192, width: 12, height: 40 },
};

// Door positions (full door panel highlight)
const DOOR_POSITIONS = {
  front_left:  { x: 14, y: 92,  width: 28, height: 102 },
  front_right: { x: 258, y: 92,  width: 28, height: 102 },
  back_left:   { x: 14, y: 192, width: 28, height: 42 },
  back_right:  { x: 258, y: 192, width: 28, height: 42 },
};

// Special doors (trunk and frunk)
const SPECIAL_DOOR_POSITIONS = {
  trunk: { x: 38, y: 252, width: 224, height: 90 },
  frunk: { x: 38, y: 12,  width: 224, height: 80 },
};

const ORANGE_LINE_COLOR = '#ff9800';
const ORANGE_LINE_WIDTH = 2;

export const createWindowsDoorOverlay = (carState: CarState) => {
  const { windows_doors } = carState;

  return svg`
    <!-- Window overlays (orange lines when open) -->
    ${windows_doors.window_front_left ? createWindowLine(WINDOW_POSITIONS.front_left) : ''}
    ${windows_doors.window_front_right ? createWindowLine(WINDOW_POSITIONS.front_right) : ''}
    ${windows_doors.window_back_left ? createWindowLine(WINDOW_POSITIONS.back_left) : ''}
    ${windows_doors.window_back_right ? createWindowLine(WINDOW_POSITIONS.back_right) : ''}

    <!-- Door overlays (highlight when open) -->
    ${windows_doors.door_front_left ? createDoorHighlight(DOOR_POSITIONS.front_left) : ''}
    ${windows_doors.door_front_right ? createDoorHighlight(DOOR_POSITIONS.front_right) : ''}
    ${windows_doors.door_back_left ? createDoorHighlight(DOOR_POSITIONS.back_left) : ''}
    ${windows_doors.door_back_right ? createDoorHighlight(DOOR_POSITIONS.back_right) : ''}

    <!-- Special doors (trunk/frunk) -->
    ${windows_doors.trunk ? createDoorHighlight(SPECIAL_DOOR_POSITIONS.trunk) : ''}
    ${windows_doors.frunk ? createDoorHighlight(SPECIAL_DOOR_POSITIONS.frunk) : ''}
  `;
};

const createWindowLine = (pos: { x: number; y: number; width: number; height: number }) => {
  // Draw orange border/lines around the window
  return svg`
    <!-- Top line -->
    <line x1="${pos.x}" y1="${pos.y}" x2="${pos.x + pos.width}" y2="${pos.y}" 
          stroke="${ORANGE_LINE_COLOR}" stroke-width="${ORANGE_LINE_WIDTH}" opacity="0.8" />
    <!-- Right line -->
    <line x1="${pos.x + pos.width}" y1="${pos.y}" x2="${pos.x + pos.width}" y2="${pos.y + pos.height}" 
          stroke="${ORANGE_LINE_COLOR}" stroke-width="${ORANGE_LINE_WIDTH}" opacity="0.8" />
    <!-- Bottom line -->
    <line x1="${pos.x + pos.width}" y1="${pos.y + pos.height}" x2="${pos.x}" y2="${pos.y + pos.height}" 
          stroke="${ORANGE_LINE_COLOR}" stroke-width="${ORANGE_LINE_WIDTH}" opacity="0.8" />
    <!-- Left line -->
    <line x1="${pos.x}" y1="${pos.y + pos.height}" x2="${pos.x}" y2="${pos.y}" 
          stroke="${ORANGE_LINE_COLOR}" stroke-width="${ORANGE_LINE_WIDTH}" opacity="0.8" />
  `;
};

const createDoorHighlight = (pos: { x: number; y: number; width: number; height: number }) => {
  return svg`
    <rect x="${pos.x}" y="${pos.y}" width="${pos.width}" height="${pos.height}"
          fill="none" stroke="${ORANGE_LINE_COLOR}" stroke-width="${ORANGE_LINE_WIDTH}"
          opacity="0.6" stroke-dasharray="3,3" />
  `;
};
