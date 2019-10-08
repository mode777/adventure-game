import { Task } from './task';

export enum GroundKind {
  Floor,
  Wall, 
  Water
}

export interface HasPosition {
  x: number,
  y: number
}

export interface HasOffset {
  ox: number,
  oy: number
}

export interface HasImage {
  image: string;
}

export interface HasGroundProperties {
  passable: boolean;
  lethal: boolean;
  type: GroundKind;
}

export interface HasCharacterProperties {
  isPlayer: boolean
}

export type Character = HasPosition & HasOffset & HasCharacterProperties;
export type Renderable = HasOffset & HasImage & HasPosition;
export type Animatable = HasOffset;
export type Ground = HasOffset & HasImage & HasGroundProperties;

export interface RenderStore {
  getRenderList(): Renderable[];
}

export interface SpatialStore<T>{
  get(x: number, y: number) : T;
  move(item: T, x: number, y: number);
  remove(item: T, x: number, y: number);
}

export interface GroundStore extends RenderStore, SpatialStore<Ground> {
  isPassable(x:number,y:number) : boolean;
}

export interface CharacterStore extends RenderStore, SpatialStore<Character> {
  getPlayer(): Character;    
}

export interface AnimationHelper {
  move(item: Animatable, x: number, y: number);
}

export interface System {
  update();
}

export enum Input {
  none,
  up,
  down,
  left,
  right,
  interact
}

export interface InputStore {
  getInput(): Input;
  hasMovement() : boolean;
  hasInteraction(): boolean;
}

export interface TaskScheduler {
  enqueueTask(task: Task);
}

export class PlayerSystem implements System {

  private player: Character;
  private direction: [number,number];

  constructor(private input: InputStore, 
    private characters: CharacterStore, 
    private ground: GroundStore,
    private animations: AnimationHelper){}
  
  update() {
    this.player = this.characters.getPlayer();
    if(this.input.hasMovement()){
      this.direction = this.getDirection();
      if(this.canMove){
        this.move();
      }
    }
  }

  private getDirection(): [number, number]{
    switch (this.input.getInput()) {
      case Input.up:
        return [0,-1];
      case Input.down:
        return [0,1];
      case Input.left:
        return [-1,0];
      case Input.right:
        return [1,0];
      default:
        return [0,0];
    }
  }

  private canMove(){
    return this.ground
      .isPassable(this.direction[0], this.direction[1]);
  }

  private move(){
    Task.chain(this.animations.move(this.player, this.direction[0], this.direction[1]))
  }
}