import { singleton } from 'tsyringe';
import { System, ComponentKey, HasPosition } from '../components';
import { EntityRepository } from '../entity-repository';
import { Playfield } from '../playfield';
import { Entity } from '../entity';

@singleton()
export class PlayfieldSystem implements System {
  
  constructor(private repo: EntityRepository, private field: Playfield){

  }
  
  async init(): Promise<void> {
  }  
  
  update(time: number): void {
    this.field.clear();

    for (const entity of this.repo.iterate<Entity & HasPosition>(ComponentKey.position)) {
      if(entity.hasKey(ComponentKey.ground)){
        this.field.setFloor(entity);
      }
      else if(entity.hasKey(ComponentKey.object)){
        this.field.setObject(entity);
      }
    }
  }


}