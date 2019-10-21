import { IEntity } from '../components';
import {injectable, inject, singleton} from "tsyringe";
import { Entity } from '../entity';
import { EntityIndex } from '../entity-index';

export const ENTITY_OPTIONS = 'entity_options';

export interface EntityRepoOptions {
  entities?: Entity[];
}

@singleton()
export class EntityManager {
 
  entities = new Map<number, Entity>();
  tags = new Map<string, Set<Entity>>();
  indices = new Map<string, EntityIndex<any, any>>();

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

  registerIndex(name: string, index: EntityIndex<any, any>){
    this.indices.set(name, index);
  }

  indexLookup(index: string, selector: any){
    return this.indices
      .get(index)
      .get(selector);
  }

  update(){
    for (const index of this.indices.values()) {
      index.clear();  
      for (const entity of this.entities.values()) {
        index.add(entity);      
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