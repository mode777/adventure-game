import { System, ComponentKey as Key, HasPosition, HasImage } from '../components';
import { EntityRepository } from '../entity-repository';
import { Renderer } from '../renderer';
import { ResourceLoader } from '../resource-loader';
import { singleton } from 'tsyringe';

@singleton()
export class RenderingSystem implements System {
  
  constructor(private renderer: Renderer, 
    private entityRepo: EntityRepository,
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