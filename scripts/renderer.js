import * as game from './game.js'; 

let ctx;
let canvas;

let tileImages = [];
let playerImage;
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
  tileImages[game.PLAYER] = await loadImage('assets/Character Boy Alt.png');
}

export function clear(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawPlayfield(){
  const ground = game.getGround();
  const objects = game.getObjects();
  const chars = game.getCharacters();

  for (let y = 0; y < ground.height; y++) {
    for (let x = 0; x < ground.width; x++) {
      const groundTile = ground.get(x,y);
      drawTile(tileImages[groundTile], x, y);

      const charTile = chars.get(x,y);
      if(charTile !== null)
        drawTile(tileImages[charTile], x,y); 
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
let editorTile = 1;

export function enableEditor() {
  canvas.addEventListener('click', e => handleClick(e.offsetX, e.offsetY));
  window.addEventListener('keyup', e => handleKey(e.key));
}

function handleClick(x, y) {
  const [gx, gy] = getGameCoordinates(x, y);
  const g = game.getGround();
  
  if(g.isInside(gx,gy))
    g.set(gx, gy, editorTile);
}

function handleKey(key) {
  console.log(key)
  switch (key) {
    case '1':
      editorTile = game.FLOOR;
      break;
    case '2':
      editorTile = game.WALL;
      break;
      case '3':
        editorTile = game.WATER;
      break;
    case 'y':
      const name = prompt('Enter map name', 'map');
      window.localStorage.setItem(name + '.ground', JSON.stringify(game.getGround().data));
      window.localStorage.setItem(name + '.objects', JSON.stringify(game.getObjects().data));
      window.localStorage.setItem(name + '.characters', JSON.stringify(game.getCharacters().data));
      break;
    case 'x':
      const loadname = prompt('Enter map name', 'map');
      game.getGround().data = JSON.parse(window.localStorage.getItem(loadname + '.ground'));
      game.getObjects().data = JSON.parse(window.localStorage.getItem(loadname + '.objects'));
      game.getCharacters().data = JSON.parse(window.localStorage.getItem(loadname + '.characters'));
      break;
    default:
      break;
  }
}

export function drawEditorControls() {
  const img = tileImages[editorTile];
  ctx.drawImage(img, 0, 0, 50, 80);
}