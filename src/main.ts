
import { Task } from './task';
import { ResourceLoader } from './resource-loader';
import { Renderer } from './renderer';
import { timingSafeEqual } from 'crypto';

function tweenValue(from: number, to: number, duration: number, setter: (x) => void){
  const delta = to - from;
  let time = 0;
  return new Task(t => {
    const val = from + (delta * time / duration);
    time += t;
    if(time >= duration){
      setter(to);
      return true;
    }
    else {
      setter(val);
      return false;
    }
  })
}


(async function main(){
  const loader = new ResourceLoader();
  const renderer = new Renderer(<HTMLCanvasElement>document.getElementById('canvas'));

  const wall = await loader.loadImage('assets/Wall Block Alt.png');

  let last = 0;
  let x = 100;
  let y = 100;

  const task = Task.chain(
    tweenValue(100, 400, 2000, v => x = v), 
    Task.wait(2000),
    tweenValue(100, 300, 1000, v => y = v),
    Task.parallel(
      tweenValue(400, 100, 2000, v => x = v), 
      tweenValue(300, 100, 2000, v => y = v),      
    )
  );
  task.start();

  function loop(time){
    const delta = time - last;
    
    task.update(delta);

    renderer.clear();
    renderer.drawImage(wall, x, y);

    window.requestAnimationFrame(loop);
    last = time;
  }

  window.requestAnimationFrame(loop);
})();

