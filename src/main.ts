import { ResourceLoader } from "./resource-loader";
import { Entity, System } from './components';

(async function main(){
  const loader = new ResourceLoader();

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

  console.log(entities);

  function loop(time){
    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
})();

class RendererSystem extends System {
  
  updateEntity(entity: Entity) {
    console.log(entity['position']);
    console.log(entity['image'])
  }

}