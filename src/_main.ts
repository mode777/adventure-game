
// import { Task } from './task';
// import { ResourceLoader } from './resource-loader';
// import { Renderer } from './renderer';
// import { tweenValue, EaseFuncs } from './easing';

// const TILE_W = 100;
// const TILE_H = 82;
// const OFFSET_X = 60;
// const OFFSET_Y = 0;

// (async function main(){
//   const loader = new ResourceLoader();
//   const renderer = new Renderer(<HTMLCanvasElement>document.getElementById('canvas'));

//   const wall = await loader.loadImage('assets/Plain Block.png');

//   let last = 0;
  
//   const data = seedData();
//   const task = createAnimation(data);
//   task.start();

//   function loop(time){
//     const delta = time - last;
    
//     task.update(delta);

//     renderer.clear();
//     draw(data);
//     //renderer.drawImage(wall, x, y);

//     window.requestAnimationFrame(loop);
//     last = time;
//   }

//   function seedData() {
//     const arr = [];
//     let delay = 100;
//     for (let y = 0; y < 6; y++) {
//       for (let x = 0; x < 9; x++) {
//         arr.push({
//           x: x,
//           y: y,
//           ox: 0,
//           oy: 500,
//           delay: x * delay + (y * delay * 2)
//         });
//       }      
//     }
//     return arr;
//   }

//   function createAnimation(arr){
//     const map = arr.map(x => Task.chain(
//       Task.wait(x.delay),
//       tweenValue(x.oy, 0, 1000, EaseFuncs.easeOutCubic, v => x.oy = v)
//     ));
//     return Task.chain(
//       Task.wait(1000), 
//       Task.parallel(...map)
//     );
//   }

//   function draw(arr){
//     for (const item of arr) {
//       drawTile(wall, item.x, item.y, item.ox, item.oy);
//     }
//   }

//   function drawTile(image: HTMLImageElement, x: number, y: number, ox: number, oy: number) {
//     renderer.drawImage(image, OFFSET_X + ox + (x * TILE_W), OFFSET_Y + oy + (y * TILE_H));
//   }

//   window.requestAnimationFrame(loop);
// })();

