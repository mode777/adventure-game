import { System, ComponentKey as Key, HasPosition, HasImage, ComponentKey } from '../components';
import { EntityManager } from '../services/entity-manager';
import { Renderer } from '../services/renderer';
import { ResourceLoader } from '../services/resource-loader';
import { singleton } from 'tsyringe';
import { Entity } from '../entity';

@singleton()
export class RenderingSystem implements System {
  
  constructor(private renderer: Renderer, 
    private entityRepo: EntityManager,
    private resources: ResourceLoader){
  }
    
  async init(): Promise<void> {
    
  }
  
  update(time: number) {
    this.renderer.clear();
    const renderList: (Entity & HasPosition & HasImage)[] = [];

    for (const entity of this.entityRepo.iterate<Entity & HasPosition & HasImage>(Key.image | Key.position)) {
      renderList.push(entity);
    }    

    renderList.sort((a,b) =>  this.getZ(a.position, a.hasKey(ComponentKey.object)) - this.getZ(b.position, b.hasKey(ComponentKey.object)) )
    
    for (const entity of renderList) {
      const img = this.resources.getResource(entity.image);
      this.renderer.drawTile(img, 
        entity.position.x, 
        entity.position.y, 
        0, 
        0);
    }
  }

  private getZ(pos: {x:number, y: number}, isObject: boolean){
    return (pos.y << 16) | pos.x + (isObject ? 1 : 0);
  }

}