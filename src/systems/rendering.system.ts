import { System, ComponentKey as Key, HasPosition, HasImage } from 'src/components';
import { EntityRepository } from 'src/entity-repository';
import { Renderer } from 'src/renderer';
import { ResourceLoader } from 'src/resource-loader';

export class RenderingSystem implements System {

  constructor(private renderer: Renderer, 
    private entityRepo: EntityRepository,
    private resources: ResourceLoader){

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