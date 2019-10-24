import { System, HasImage, ComponentKey, Prototypes } from '../components';
import { ResourceLoader } from '../services/resource-loader';
import { EntityManager } from '../services/entity-manager';
import { singleton } from 'tsyringe';

@singleton()
export class ResourceLoaderSystem implements System {
  
  constructor(private loader: ResourceLoader, private entities: EntityManager){}

  async init(): Promise<void> {
    for (const key in Prototypes) {
      if(Prototypes[key].data.image){
        await this.loader.loadImage(Prototypes[key].data.image);
      }
    }
  }
  
  update(time: number) {}

}