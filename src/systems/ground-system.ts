import { System, ComponentKey, HasPosition, HasGround, HasDirection } from '../components';
import { singleton } from 'tsyringe';
import { EntityManager } from '../services/entity-manager';
import { Entity } from '../entity';

@singleton()
export class GroundSystem implements System {
  
  constructor(private entities: EntityManager){

  }

  async init(): Promise<void> {
  }  
  
  update(time: number): void {
    for (const player of this.entities.iterate<Entity & HasPosition & HasDirection>(ComponentKey.player | ComponentKey.direction)) {
      
      const floorPos = { 
        x: player.position.x + player.direction.x, 
        y: player.position.y + player.direction.y
      };      

      const floor = this.entities.indexLookup<HasGround>('floor', floorPos);
      
      if(floor !== undefined && floor.ground.type === 'passable'){
        player.position = floorPos;
      }
      
      player.removeComponent('direction');
    }
  }

}