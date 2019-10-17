import { System } from 'src/components';
import { inject, singleton } from 'tsyringe';
import { RenderingSystem } from './systems/rendering.system';
import { ResourceLoaderSystem } from './systems/resource-loader.system';

@singleton()
export class SystemManager implements System {
  private systems: System[] = [];

  constructor(renderSys: RenderingSystem, 
    resSys: ResourceLoaderSystem){
    this.systems = [
      resSys,
      renderSys
    ];
  }

  enqueue(system: System){
    this.systems.push(system);
  }

  async init(){
    for (const system of this.systems) {
      await system.init();
    }
  }

  update(time: number){
    for (const system of this.systems) {
      system.update(time);
    }
  }
  
}