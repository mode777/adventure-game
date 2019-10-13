// import { Renderer } from './renderer';
// import { ResourceLoader as ResourceManager } from './resource-loader';



// export interface CharacterBehaviour {
//   update(c: Character);
//   onCollision(c: Character);
// }


// export class RenderController {

//   constructor(private renderer: Renderer, private resources: ResourceManager){}
  
//   render(renderable: Renderable){
//     const image = this.resources.getResource(renderable.image);
//     this.renderer.drawTile(image, 
//       renderable.x, 
//       renderable.y, 
//       renderable.ox, 
//       renderable.oy);
//   }
// }