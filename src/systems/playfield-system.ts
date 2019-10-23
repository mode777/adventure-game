import { singleton } from 'tsyringe';
import { System, ComponentKey, HasPosition } from '../components';
import { EntityManager } from '../services/entity-manager';
import { Entity } from '../entity';
import { EntityIndex } from '../entity-index';

class SpatialIndex extends EntityIndex<Entity & HasPosition, {x: number, y: number}>{
  
  constructor(private filterFunc: (e: Entity & HasPosition) => boolean = (_) => true){
    super();
  }

  protected hash(s: { x: number; y: number; }): number {
    return (s.y << 16) + s.x;
  }  
  
  protected select(entity: HasPosition): { x: number; y: number; } {
    return entity.position;
  }
  
  protected filter(entity: HasPosition & Entity) {
    return this.filterFunc(entity);
  }
}

@singleton()
export class PlayfieldSystem implements System {
  
  private floor = new SpatialIndex(x => x.hasKey(ComponentKey.ground));
  private objects = new SpatialIndex(x => x.hasKey(ComponentKey.object));

  constructor(private repo: EntityManager){

  }
  
  async init(): Promise<void> {
    this.repo.registerIndex('floor', this.floor);
    this.repo.registerIndex('objects', this.objects);
  }  
  
  update(time: number): void {
  }


}