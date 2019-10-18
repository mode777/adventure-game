import { System, HasImage, Entity, ComponentKey } from '../components';
import { ResourceLoader } from '../resource-loader';
import { EntityRepository } from '../entity-repository';
import { singleton } from 'tsyringe';

@singleton()
export class ResourceLoaderSystem implements System {
  
  constructor(private loader: ResourceLoader, private entities: EntityRepository){}

  async init(): Promise<void> {
    for (const entity of this.entities.iterate<HasImage>(ComponentKey.image)) {
      
      await this.loader.loadImage(entity.image);
    }
  }
  
  async update(time: number) {}

}