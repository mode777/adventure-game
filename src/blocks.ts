// export interface GameObjectState {
//   x: number;
//   y: number;
//   id: string;
//   defaultImage: string;
// }

// export class Position {
  
//   constructor(public readonly x: number, public readonly y: number) { }
  
//   neighbour(dir: Direction) {
//     switch (dir) {
//       case Direction.North:
//         return new Position(this.x, this.y - 1)
//       case Direction.East:
//         return new Position(this.x + 1, this.y)
//       case Direction.South:
//         return new Position(this.x, this.y + 1)
//       case Direction.West:
//         return new Position(this.x - 1, this.y)
//       default:
//         throw new Error('Invalid direction')
//     }
//   }
// }

// export class GameObject {
//   constructor(protected state: GameObjectState) { }
  
//   get postion() { return new Position(this.state.x, this.state.y); }
//   get id() { return this.state.id; }
//   get image() { return this.state.defaultImage; }
// }

// export enum Direction {
//   North,
//   East,
//   South,
//   West
// }

// export class GameBlock extends GameObject {
//   constructor(protected state: GameObjectState, private entity: GameEntity = null) {
//     super(state);
//   }

//   canBeEntered(entity: GameEntity, from: Direction) {
//     return true;
//   }

//   enter(entity: GameEntity) { }

//   canBeLeft(entity: GameEntity, to: Direction) {
//     return true;
//   }

//   leave(entity: GameEntity) { }
// }

// export class PlainBlock extends GameBlock {
//   constructor(protected state: GameObjectState) {
//     super(state);
//   }
// }

// export class WallBlock extends GameBlock {
//   constructor(protected state: GameObjectState) {
//     super(state);
//   }

//   canBeEntered(entity: GameEntity, from: Direction) {
//     return true;
//   }
// }

// export class WaterBlock extends GameBlock {
//   constructor(protected state: GameObjectState) {
//     super(state);
//   }

//   enter(entity: GameEntity){

//   }
// }

// export class GameEntity extends GameObject {
//   constructor(protected state: GameObjectState) {
//     super(state);
//   }

//   move(dir: Direction){
//     const to = this.postion.neighbour(dir);
//     Field.instance.moveTo(this, to);
//   }

//   drop() {

//   }

//   remove() {
//     Field.instance.remove(this);
//   }
// }



