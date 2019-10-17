import { HasPosition } from '../components';

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

  remove(entity: HasPosition){
    const hash = this.hashLookup.get(entity.id);

    if(!hash)
      return;

    const bucket = this.getOrCreateBucket(hash);
    bucket.delete(entity.id);
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