// import { GameBlock, GameEntity, Position, GameObject } from './blocks';

// export type BlockFactory = (x: number, y: number) => GameBlock;

// export class Field {
//   private static singleton : Field;
  
//   public static get instance(){
//     return Field.singleton;
//   }

//   public static init(w: number, h: number, factory: BlockFactory){
//     Field.singleton = new Field(w, h, factory);
//   }

//   private blocks: GameBlock[] = [];
//   private entities: GameEntity[] = [];
//   private objects: {[key: string]: Position}

//   private constructor(private w: number, private h: number, factory: BlockFactory){
//     for (let y = 0; y < h; y++) {
//       for (let x = 0; x < w; x++) {
//         const block = factory(x,y);
//         this.setBlock(block);
//       }  
//     }
//   }

//   blockAt(pos: Position){
//     return this.blocks[this.getOffset(pos)] || null;
//   }

//   private getOffset(pos: Position){
//     return pos.y * this.w + pos.x;
//   }

//   entityAt(pos: Position){
//     return this.entities[this.getOffset(pos)] || null;
//   }

//   moveTo(entity: GameEntity, pos: Position){
//     const oldPos = this.entities[entity.id];
//     if(!oldPos){
//       throw new Error('Entity is not part of game field');
//     }

//     this.objects[entity.id] = pos;
//     this.entities[this.getOffset(pos)] = entity;
//   }

//   insert(entity: GameEntity){
//     this.entities[this.getOffset(entity.postion)] = entity;
//     this.objects[entity.id] = entity.postion;
//   }

//   remove(entity: GameEntity){
//     this.entities[this.getOffset(entity.postion)] = null;
//     delete this.objects[entity.id];
//   }

//   setBlock(block: GameBlock){
//     this.blocks[this.getOffset(block.postion)] = block;
//     this.objects[block.id] = block.postion;
//   }

//   unsetBlock(block: GameBlock){
//     this.blocks[this.getOffset(block.postion)] = null;
//     delete this.objects[block.id];
//   }

//   getRenderList() : GameObject[] {
//     return [ ...this.blocks, ...this.entities]
//   }
// }
