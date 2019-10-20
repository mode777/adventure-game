import 'reflect-metadata';

import { EntityRepoOptions, ENTITY_OPTIONS } from './entity-repository';
import { SystemManager } from './system-manager';
import { container } from 'tsyringe';
import { RendererOptions, RENDERER_OPTIONS } from './renderer';
import { XmlLoader } from './xml-loader';

(async function main(){



  const entities = await loadEntities();
  const canvas =  <HTMLCanvasElement>document.getElementById('canvas');

  container.register<RendererOptions>(RENDERER_OPTIONS, { 
    useValue: { canvas } 
  });
  container.register<EntityRepoOptions>(ENTITY_OPTIONS, {
    useValue: { entities }
  });

  console.log(entities);

  const manager = container.resolve(SystemManager);

  await manager.init();

  function loop(time: number){
    manager.update(time);

    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
})();

async function loadEntities() {
  const xml = new XmlLoader({
    components: 'config/components.xml',
    entities: 'config/entities.xml',
    prototypes: 'config/prototypes.xml',
    systems: 'config/systems.xml'
  });

  return await xml.loadEntities();
}