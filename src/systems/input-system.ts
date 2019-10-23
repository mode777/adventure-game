import { singleton } from "tsyringe";
import { System, ComponentKey } from '../components';
import { InputService, Direction } from '../services/input-service';
import { EntityManager } from '../services/entity-manager';
import { Entity } from '../entity';

@singleton()
export class InputSystem implements System {
  
  constructor(private entities: EntityManager, private input: InputService){

  }

  async init(): Promise<void> {
    
  }  
  
  update(time: number): void {
    const state = this.input.pop();

    if(state.direction !== undefined){
      
      const player = this.getPlayer();

      const dir = { x: 0, y: 0 }

      switch (state.direction) {
        case Direction.East:
          dir.x++;
          break;
        case Direction.North:
          dir.y--;
          break;
        case Direction.South:
          dir.y++;
          break;
        case Direction.West:
          dir.x--;
          break;
        default:
          break;
      }

      player.addComponent('direction', dir);
    }
  }

  private getPlayer(){
    for (const entity of this.entities.iterate<Entity>(ComponentKey.player)) {
      return entity;
    }
  }


}