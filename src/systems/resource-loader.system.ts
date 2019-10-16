import { System, HasImage, Entity, ComponentKey } from 'src/components';
import { ResourceLoader } from 'src/resource-loader';
import { EntityRepository } from 'src/entity-repository';

export class ResourceLoaderSystem implements System {
  
  constructor(private loader: ResourceLoader, private entities: EntityRepository){}
  
  async update(time: number) {
    
    for (const entity of this.entities.iterate<HasImage>(ComponentKey.image)) {
      await this.loader.loadImage(entity.image);
    }

  }

}