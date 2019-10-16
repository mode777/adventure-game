import { Entity, IEntity } from './components';

export class EntityRepository {
 
  entities = new Map<number, Entity>();
  tags = new Map<string, Set<Entity>>();

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