
import { Task } from './task';
import { ResourceLoader } from './resource-loader';
import { Renderer } from './renderer';

const TILE_W = 100;
const TILE_H = 82;
const OFFSET_X = 60;
const OFFSET_Y = 0;

type EaseFunc = (c: number, t: number, d: number, b: number) => number;

const linear: EaseFunc = (c,t,d,b) => c * t / d + b;
const easeOutCubic: EaseFunc = (c,t,d,b) => c * ((t = t / d - 1) * t * t + 1) + b;
const easeInQuad: EaseFunc = (c,t,d,b) => c * (t /= d) * t + b;
const easeOutQuad: EaseFunc = (c,t,d,b) => -c * (t /= d) * (t - 2) + b;
const easeInOutQuad: EaseFunc = (c,t,d,b) => ((t /= d / 2) < 1) 
  ? c / 2 * t * t + b 
  : -c / 2 * ((--t) * (t - 2) - 1) + b;
const easeInCubic: EaseFunc = (c,t,d,b) => c * (t /= d) * t * t + b;
const easeInOutCubic: EaseFunc = (c,t,d,b) => ((t /= d / 2) < 1) 
  ? c / 2 * t * t * t + b 
  : c / 2 * ((t -= 2) * t * t + 2) + b;


function tweenValue(from: number, to: number, duration: number, func: EaseFunc, setter: (x) => void){
  const delta = to - from;
  let time = 0;
  return new Task(t => {
    const val = func(delta, time, duration, from);
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

  const wall = await loader.loadImage('assets/Plain Block.png');

  let last = 0;
  // let x = 100;
  // let y = 100;

  // const task = Task.chain(
  //   tweenValue(100, 400, 2000, v => x = v), 
  //   Task.wait(2000),
  //   tweenValue(100, 300, 1000, v => y = v),
  //   Task.parallel(
  //     tweenValue(400, 100, 2000, v => x = v), 
  //     tweenValue(300, 100, 2000, v => y = v),      
  //   )
  // );
  // task.start();

  const data = seedData();
  const task = createAnimation(data);
  task.start();

  function loop(time){
    const delta = time - last;
    
    task.update(delta);

    renderer.clear();
    draw(data);
    //renderer.drawImage(wall, x, y);

    window.requestAnimationFrame(loop);
    last = time;
  }

  function seedData() {
    const arr = [];
    let delay = 100;
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 9; x++) {
        arr.push({
          x: x,
          y: y,
          ox: 0,
          oy: 800,
          delay: x * delay + (y * delay * 2)
        });
      }      
    }
    return arr;
  }

  function createAnimation(arr){
    const map = arr.map(x => Task.chain(
      Task.wait(x.delay),
      tweenValue(x.oy, 0, 1000, easeOutQuad, v => x.oy = v)
    ));
    return Task.chain(
      Task.wait(1000), 
      Task.parallel(...map)
    );
  }

  function draw(arr){
    for (const item of arr) {
      drawTile(wall, item.x, item.y, item.ox, item.oy);
    }
  }

  function drawTile(image: HTMLImageElement, x: number, y: number, ox: number, oy: number) {
    renderer.drawImage(image, OFFSET_X + ox + (x * TILE_W), OFFSET_Y + oy + (y * TILE_H));
  }

  window.requestAnimationFrame(loop);
})();

