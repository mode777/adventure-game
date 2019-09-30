import * as game from './game.js'; 

let ctx;
let canvas;

let tileImages = [];
const TILE_W = 100;
const TILE_H = 82;
const OFFSET_X = 60;
const OFFSET_Y = 0;


export function initRenderer() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
}

export async function loadAssets() {
  tileImages[game.FLOOR] = await loadImage('assets/Plain Block.png');
  tileImages[game.WALL] = await loadImage('assets/Wall Block Alt.png');
  tileImages[game.WATER] = await loadImage('assets/Water Alt.png');
  tileImages[game.GOAL] = await loadImage('assets/Selector Alt.png');
  tileImages[game.STONE] = await loadImage('assets/Stone Block Alt.png');
}

export function clear(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawPlayfield(){
  const playfield = game.getPlayfield();

  for (let y = 0; y < playfield.length; y++) {
    const row = playfield[y];
    for (let x = 0; x < row.length; x++) {
      const tile = row[x];
      drawTile(tileImages[tile], x, y);
    }
  }
}

function loadImage(filename) {
  return new Promise((res, rej) => {
    const image = new Image();
    image.onload = () => res(image);
    image.onerror = e => rej(e);
    image.src = filename;
  });
}

function drawTile(image,x,y) {
  ctx.drawImage(image, OFFSET_X + (x * TILE_W), OFFSET_Y + (y * TILE_H));
}

function getGameCoordinates(x, y){
  return [Math.floor((x - OFFSET_X) / TILE_W), 
    Math.floor(((y - OFFSET_Y - 42) / TILE_H))];
}

export function getContext(){
  return ctx;
}
let editorTile = 0;

export function enableEditor() {
  canvas.onclick = e => handleClick(e.offsetX, e.offsetY);
  canvas.onwheel = e => handleWheel(e.deltaY < 0);
}

function handleClick(x, y) {
  const [gx, gy] = getGameCoordinates(x, y);
  game.setTile(gx, gy, editorTile);
}

function handleWheel(isUp) {
  editorTile = Math.abs((editorTile + (isUp ? -1 : 1))) % game.TILE_TYPES;
}

export function drawEditorControls() {
  const img = tileImages[editorTile];
  ctx.drawImage(img, 0, 0, 50, 80);
}