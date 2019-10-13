import { Task } from './task';
import { AnimationHelper } from './interfaces';

export type BlockFactory = (x: number, y: number) => GameBlock;

export class Field {
  private static singleton : Field;
  
  public static get instance(){
    return Field.singleton;
  }

  public static init(w: number, h: number, factory: BlockFactory){
    Field.singleton = new Field(w, h, factory);
  }

  private blocks: GameBlock[] = [];
  private entities: GameEntity[] = [];
  private objects: {[key: string]: Position}

  private constructor(private w: number, private h: number, factory: BlockFactory){
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const block = factory(x,y);
        this.setBlock(block);
      }  
    }
  }

  blockAt(pos: Position){
    return this.blocks[this.getOffset(pos)] || null;
  }

  private getOffset(pos: Position){
    return pos.y * this.w + pos.x;
  }

  entityAt(pos: Position){
    return this.entities[this.getOffset(pos)] || null;
  }

  moveTo(entity: GameEntity, pos: Position){
    const oldPos = this.entities[entity.id];
    if(!oldPos){
      throw new Error('Entity is not part of game field');
    }

    this.objects[entity.id] = pos;
    this.entities[this.getOffset(pos)] = entity;
  }

  insert(entity: GameEntity){
    this.entities[this.getOffset(entity.postion)] = entity;
    this.objects[entity.id] = entity.postion;
  }

  remove(entity: GameEntity){
    this.entities[this.getOffset(entity.postion)] = null;
    delete this.objects[entity.id];
  }

  setBlock(block: GameBlock){
    this.blocks[this.getOffset(block.postion)] = block;
    this.objects[block.id] = block.postion;
  }

  unsetBlock(block: GameBlock){
    this.blocks[this.getOffset(block.postion)] = null;
    delete this.objects[block.id];
  }
}

export interface GameObjectState {
  x: number;
  y: number;
  id: string;
  defaultImage: string;
}

export class Position {
  
  constructor(public readonly x: number, public readonly y: number) { }
  
  neighbour(dir: Direction) {
    switch (dir) {
      case Direction.North:
        return new Position(this.x, this.y - 1)
      case Direction.East:
        return new Position(this.x + 1, this.y)
      case Direction.South:
        return new Position(this.x, this.y + 1)
      case Direction.West:
        return new Position(this.x - 1, this.y)
      default:
        throw new Error('Invalid direction')
    }
  }
}

export class GameObject {
  constructor(protected state: GameObjectState) { }
  
  get postion() { return new Position(this.state.x, this.state.y); }
  get id() { return this.state.id; }
  get image() { return this.state.defaultImage; }
}

export enum Direction {
  North,
  East,
  South,
  West
}

export class GameBlock extends GameObject {
  constructor(protected state: GameObjectState, private entity: GameEntity = null) {
    super(state);
  }

  canBeEntered(entity: GameEntity, from: Direction) {
    return true;
  }

  enter(entity: GameEntity) { }

  canBeLeft(entity: GameEntity, to: Direction) {
    return true;
  }

  leave(entity: GameEntity) { }
}

export class PlainBlock extends GameBlock {
  constructor(protected state: GameObjectState) {
    super(state);
  }
}

export class WallBlock extends GameBlock {
  constructor(protected state: GameObjectState) {
    super(state);
  }

  canBeEntered(entity: GameEntity, from: Direction) {
    return true;
  }
}

export class WaterBlock extends GameBlock {
  constructor(protected state: GameObjectState) {
    super(state);
  }

  enter(entity: GameEntity){

  }
}

export class GameEntity extends GameObject {
  constructor(protected state: GameObjectState) {
    super(state);
  }

  move(dir: Direction){
    const to = this.postion.neighbour(dir);
    Field.instance.moveTo(this, to);
  }

  drop() {

  }

  remove() {
    Field.instance.remove(this);
  }
}



