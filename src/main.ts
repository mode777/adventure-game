import { ResourceLoader } from "./resource-loader";
import { Entity, System, HasPosition, IEntity } from './components';

(async function main(){
  const loader = new ResourceLoader();

  const entities = await loadEntities();

  function loop(time){
    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
})();

export class RendererSystem implements System {
  
  update(time: number) {
    throw new Error("Method not implemented.");
  }

}

export class EntityRepository {
  entities = new Map<number, Entity>();
  
  getById(id: number){
    return this.entities.get(id);
  }

  iterate<T extends IEntity>(key: number, action: (x: T) => void){
    for (const entity of this.entities.values()) {
      if(entity.hasKey(key)){
        action(<T><unknown>entity);
      }
    }
  }

}

export class SpatialHash {
  
  private lookup = new Map<number, Set<number>>();
  private hashLookup = new Map<number, number>();

  addOrUpdate(entity: HasPosition){
    const newHash = this.hashPosition(entity.position.x, entity.position.y);
    const oldHash = this.hashLookup.get(entity.id);
    
    if(oldHash === undefined){
      const bucket = this.getOrCreateBucket(newHash);
      bucket.add(entity.id);
      this.hashLookup.set(newHash, entity.id);
    }
    else if(newHash !== oldHash) {
      const oldBucket = this.getOrCreateBucket(oldHash);
      oldBucket.delete(entity.id);
      const newBucket = this.getOrCreateBucket(newHash);
      newBucket.add(entity.id);
      this.hashLookup.delete(oldHash);
      this.hashLookup.set(newHash, entity.id);
    }
  }

  getEntityIdsAt(x: number, y: number): Iterable<number> {
    return this.getOrCreateBucket(this.hashPosition(x,y))
  }

  private hashPosition(x: number, y: number){
    return (y << 16) + x;
  }

  private getOrCreateBucket(hash: number){
    let bucket = this.lookup.get(hash);
    if(!bucket){
      bucket = new Set<number>();
      this.lookup.set(hash, bucket);
    }
    return bucket;
  }

}

async function loadEntities() {
  const data = await (await fetch('assets/entities.json')).json();

  const entities = data.entities.map(x => {
    if(x['_bp']){
      return {
        ...data.blueprints[x['_bp']],
        ...x
      }
    }
    return x;
  }).map(x => new Entity(0, x));

  return entities;
}