import { System, HasPosition, HasDirection, ComponentKey, HasGround } from '../components';
import { singleton } from 'tsyringe';
import { Entity } from '../entity';
import { EntityManager } from '../services/entity-manager';

@singleton()
export class PushableSystem implements System {
  
  constructor(private entities: EntityManager){

  }

  async init(): Promise<void> {
  }  
  
  update(time: number): void {
    for (const player of this.entities.iterate<Entity & HasPosition & HasDirection>(
      ComponentKey.player | ComponentKey.direction | ComponentKey.position)) {
      
      const floorPos = { 
        x: player.position.x + player.direction.x, 
        y: player.position.y + player.direction.y
      };      

      const neighbourPos = {
        x: floorPos.x + player.direction.x,
        y: floorPos.y + player.direction.y
      };

      const obj = this.entities.indexLookup<Entity & HasPosition>('objects', floorPos);
      const floor = this.entities.indexLookup<HasGround & HasPosition>('floor', neighbourPos);

      console.log(obj, floor);

      if(obj && floor && obj.hasKey(ComponentKey.pushable)){
        if(floor.ground.type === 'solid'){
          player.removeComponent('direction');
        }  
        else if(floor.ground.type === 'passable'){
          obj.position = neighbourPos;
        }
        else if(floor.ground.type === 'hole') {
          player.removeComponent('direction');          
        }
      }      
    }
  }


}