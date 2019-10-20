import { System } from 'src/components';
import { inject, singleton } from 'tsyringe';
import { RenderingSystem } from './systems/rendering.system';
import { ResourceLoaderSystem } from './systems/resource-loader.system';
import { PlayfieldSystem } from './systems/playfield-system';

@singleton()
export class SystemManager implements System {
  private systems: System[] = [];

  constructor(renderSys: RenderingSystem, 
    resSys: ResourceLoaderSystem, pfSys: PlayfieldSystem){
    this.systems = [
      resSys,
      pfSys,
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