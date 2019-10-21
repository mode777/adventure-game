import { System, ComponentKey as Key, HasPosition, HasImage } from '../components';
import { EntityManager } from '../services/entity-manager';
import { Renderer } from '../services/renderer';
import { ResourceLoader } from '../services/resource-loader';
import { singleton } from 'tsyringe';

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
    for (const entity of this.entityRepo.iterate<HasPosition & HasImage>(Key.image | Key.position)) {
      const img = this.resources.getResource(entity.image);
      this.renderer.drawTile(img, 
        entity.position.x, 
        entity.position.y, 
        0, 
        0);
    }    
  }

}