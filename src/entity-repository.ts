import { IEntity } from './components';
import {injectable, inject, singleton} from "tsyringe";
import { Entity } from './entity';

export const ENTITY_OPTIONS = 'entity_options';

export interface EntityRepoOptions {
  entities?: Entity[];
}

@singleton()
export class EntityRepository {
 
  entities = new Map<number, Entity>();
  tags = new Map<string, Set<Entity>>();

  constructor(@inject(ENTITY_OPTIONS) options: EntityRepoOptions){
    for (const entity of options.entities || []) {
      this.addEntity(entity);
    }
  }

  addEntity(entity: Entity){
    this.entities.set(entity.id, entity);
  }

  removeEntity(entity: Entity){
    this.entities.delete(entity.id);
  }

  getById(id: number){
    return this.entities.get(id);
  }

  *iterate<T extends IEntity>(key: number) : IterableIterator<T>{
    for (const entity of this.entities.values()) {      
      if(entity.hasKey(key)){
        yield <T><unknown>entity;
      }
    }
  }

}

// class EntityIterator<T extends IEntity> implements Iterator<T>{
  
//   private res: IteratorResult<T> = {
//     done: true,
//     value: undefined
//   }

//   constructor(private iterator: Iterator<IEntity>){}
  
//   next(value?: any): IteratorResult<T> {
//     const res = <IteratorResult<T>>this.iterator.next();
//     while()
    
//     if(res.done){
//       return res;
//     }
    
//   } 
  
  
//}