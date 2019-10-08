import { Task } from './task';
import { AnimationHelper } from './interfaces';

export interface GameBlock {
  moveToward(fromX: number, fromY: number): [boolean, Task]
  moveAway(toX: number, toY: number): Task
}

export class BaseBlock {
  constructor(
    public readonly x: number, 
    public readonly y: number){}
}

export class FloorBlock extends BaseBlock implements GameBlock {
  
  constructor(x: number, y: number){
    super(x,y);
  }

  moveToward(fromX: number, fromY: number): [boolean, Task] {
    return [
      true,
      Task.chain(
        // move animation,
        // set player postion
      )
    ]
  }

  moveAway(toX: number, toY: number): Task {
    return Task.completed;
  }

}

const loop = () => {
  // const player = field.getPlayer();
  // const state = input.getState();
  // if(state.hasInput()){
  //   const dir = state.getDirection();
  //   const target = [ player.x + dir[0], player.y + dir[1] ];
  //   const block = field.getBlock(target[0], target[1]);
  //   const [success, task] = block.moveToward(target[0], target[1]);
  //   if(success){
  //     taskQueue.enqueue(task)
  //   }
  //   else {
  //     const oldBlock = field.getBlock(player.x, player.y);
  //     const awayTask = oldBlock.moveAway(target[0], target[1]);
  //     taskQueue.enqueue(Task.chain(task, awayTask));
  //   }
  // }
}