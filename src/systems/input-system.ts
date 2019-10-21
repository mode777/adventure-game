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
    if(this.input.state.direction){
      console.log(this.input.state);
      const player = this.getPlayer();
      player.addComponent('direction', { 
        x: (this.input.state === Direction.East) 
          ? 1
          : (this.input.state === Direction.West ? -1 : 0),
        y: (this.input.state === Direction.South) 
          ? 1
          : (this.input.state === Direction.North ? -1 : 0)
      });
    }
  }

  private getPlayer(){
    for (const entity of this.entities.iterate<Entity>(ComponentKey.player)) {
      return entity;
    }
  }


}