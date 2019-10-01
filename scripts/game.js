import {Layer} from './layer.js'

let ground, objects, characters;

let inputDisabled = false;
let dir = [0,0]

export const FLOOR = 0;
export const WALL = 1;
export const WATER = 2;
export const GOAL = 3;
export const STONE = 4;
export const TILE_TYPES = 5;
export const PLAYER = 6;

const FIELD_W = 9;
const FIELD_H = 6;

let playerPos = [0,0];

export function initPlayfield() {
  ground = new Layer(FIELD_W, FIELD_H, FLOOR);
  objects = new Layer(FIELD_W, FIELD_H);
  characters = new Layer(FIELD_W, FIELD_H);

  characters.set(playerPos[0],playerPos[1],PLAYER);
}

export function getGround() {
  return ground;
}

export function getObjects(){
  return objects;
}

export function getCharacters(){
  return characters;
}

export function update(){
  if(dir[0] !== 0 || dir[1] !== 0){
    movePlayer();
    dir = [0,0]
  }
} 

function movePlayer(){
  characters.unset(playerPos[0], playerPos[1]);

  const newPos = [playerPos[0] + dir[0],playerPos[1] + dir[1]]

  if(canPlayerMoveTo(newPos[0], newPos[1])){
    playerPos = newPos;
  }

  characters.set(playerPos[0], playerPos[1], PLAYER);
}

function canPlayerMoveTo(x,y){
  return characters.isInside(x,y) && ground.get(x,y) !== WALL && objects.get(x,y) === null;
}

export function initControls(){
  window.addEventListener('keyup', (e) => handleKeyUp(e.key));
}

function handleKeyUp(key){
  switch (key) {
    case 'w':
      dir = [0,-1]
      break;
    case 'a':
      dir = [-1,0]
      break;
    case 's':
      dir = [0,1];
      break;
    case 'd':
      dir = [1,0];
      break;
    default:
      break;
  }
}