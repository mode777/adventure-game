import { ResourceLoader } from './resource-loader';

const TILE_W = 100;
const TILE_H = 82;
const OFFSET_X = 60;
const OFFSET_Y = 0;

export class Renderer {

  private static singleton : Renderer;
  
  public static get instance(){
    return Renderer.singleton;
  }

  public static init(canvas: HTMLCanvasElement){
    Renderer.singleton = new Renderer(canvas);
  }

  private ctx: CanvasRenderingContext2D;

  private constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d');
  }

  clear(){
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImage(image: HTMLImageElement, x: number, y: number) {
    this.ctx.drawImage(image, x, y);
  }

  drawTile(image: HTMLImageElement, x: number, y: number, ox: number, oy: number) {
    this.drawImage(image, OFFSET_X + ox + (x * TILE_W), OFFSET_Y + oy + (y * TILE_H));
  }
}