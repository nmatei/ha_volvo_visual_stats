import { svg } from 'lit';
import { CarState } from '../types';

// Window positions (x, y, width, height) - adjusted to match car image
const WINDOW_POSITIONS = {
  front_left: { x: 30, y: 40, width: 45, height: 40 },
  front_right: { x: 125, y: 40, width: 45, height: 40 },
  back_left: { x: 25, y: 130, width: 50, height: 45 },
  back_right: { x: 125, y: 130, width: 50, height: 45 },
};

// Door positions (simplified as rectangles on the sides)
const DOOR_POSITIONS = {
  front_left: { x: 10, y: 70, width: 20, height: 50 },
  front_right: { x: 170, y: 70, width: 20, height: 50 },
  back_left: { x: 5, y: 140, width: 20, height: 60 },
  back_right: { x: 175, y: 140, width: 20, height: 60 },
};

// Special doors
const SPECIAL_DOOR_POSITIONS = {
  trunk: { x: 85, y: 270, width: 30, height: 20 },
  frunk: { x: 85, y: 10, width: 30, height: 15 },
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
