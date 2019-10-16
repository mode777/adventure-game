import { ResourceLoader } from "./resource-loader";
import { Entity, System, HasPosition, IEntity } from './components';

(async function main(){
  const loader = new ResourceLoader();

  const entities = await loadEntities();

  function loop(time){
    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
})();

export class RendererSystem implements System {
  
  update(time: number) {
    throw new Error("Method not implemented.");
  }

}

async function loadEntities() {
  const data = await (await fetch('assets/entities.json')).json();

  const entities = data.entities.map(x => {
    if(x['_bp']){
      return {
        ...data.blueprints[x['_bp']],
        ...x
      }
    }
    return x;
  }).map(x => new Entity(0, x));

  return entities;
}