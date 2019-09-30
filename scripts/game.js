const playfield = [];

export const FLOOR = 0;
export const WALL = 1;
export const WATER = 2;
export const GOAL = 3;
export const STONE = 4;
export const TILE_TYPES = 5;

const FIELD_W = 9;
const FIELD_H = 6;

export function initPlayfield() {
  for (let y = 0; y < FIELD_H; y++) {
    playfield.push([]);
    for (let x = 0; x < FIELD_W; x++) {
      playfield[y][x] = FLOOR;
    }
  }
}

export function setTile(x, y, tile) {
  if (x >= 0 && x < FIELD_W && y >= 0 && y < FIELD_H) {
    playfield[y][x] = tile;
  }
}

export function getPlayfield(){
  return playfield;
}

export function update(){

}