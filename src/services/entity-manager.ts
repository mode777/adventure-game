import { IEntity, Prototypes } from '../components';
import {injectable, inject, singleton} from "tsyringe";
import { Entity } from '../entity';
import { EntityIndex } from '../entity-index';
import { Prototype } from 'src/prototype';

export const ENTITY_OPTIONS = 'entity_options';

export interface EntityRepoOptions {
  entities?: Entity[];
}

@singleton()
export class EntityManager {
 
  entities = new Map<number, Entity>();
  tags = new Map<string, Set<Entity>>();
  indices = new Map<string, EntityIndex<any, any>>();
  commandBuffer: (()=>void)[] = [];

  constructor(@inject(ENTITY_OPTIONS) options: EntityRepoOptions){
    for (const entity of options.entities || []) {
      this.addEntity(entity);
    }
    this.update();
  }

  createEntity(prototypeId: string, data: any){
    const entity = Prototypes[prototypeId]
      .createEntity(data);

    this.addEntity(entity);
  }

  addEntity(entity: Entity){
    this.commandBuffer.push(() => this.entities.set(entity.id, entity));
  }

  removeEntity(entity: Entity){
    this.commandBuffer.push(() => this.entities.delete(entity.id));
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

  indexLookup<T extends IEntity>(index: string, selector: any){
    return <T>this.indices
      .get(index)
      .get(selector);
  }

  update(){
    for (const command of this.commandBuffer) {
      command();
    }
    this.commandBuffer = [];

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