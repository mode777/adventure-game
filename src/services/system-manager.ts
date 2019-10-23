import { System } from '../components';
import { inject, singleton } from 'tsyringe';
import { RenderingSystem } from '../systems/rendering.system';
import { ResourceLoaderSystem } from '../systems/resource-loader.system';
import { PlayfieldSystem } from '../systems/playfield-system';
import { InputSystem } from '../systems/input-system';
import { GroundSystem } from '../systems/ground-system';
import { PushableSystem } from '../systems/pushable-system';

@singleton()
export class SystemManager implements System {
  private systems: System[] = [];

  constructor(renderSys: RenderingSystem, 
    resSys: ResourceLoaderSystem, 
    pfSys: PlayfieldSystem, 
    iSys: InputSystem,
    pSys: PushableSystem,
    gSys: GroundSystem){
    this.systems = [
      resSys,
      pfSys,
      iSys,
      pSys,
      gSys,
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