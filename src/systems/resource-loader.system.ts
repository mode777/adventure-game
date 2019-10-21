import { System, HasImage, ComponentKey } from '../components';
import { ResourceLoader } from '../services/resource-loader';
import { EntityManager } from '../services/entity-manager';
import { singleton } from 'tsyringe';

@singleton()
export class ResourceLoaderSystem implements System {
  
  constructor(private loader: ResourceLoader, private entities: EntityManager){}

  async init(): Promise<void> {
    for (const entity of this.entities.iterate<HasImage>(ComponentKey.image)) {
      
      await this.loader.loadImage(entity.image);
    }
  }
  
  update(time: number) {}

}