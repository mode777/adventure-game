import { ResourceLoader } from './resource-loader';
import { injectable, singleton, inject } from 'tsyringe';

const TILE_W = 100;
const TILE_H = 82;
const OFFSET_X = 60;
const OFFSET_Y = 0;

export const RENDERER_OPTIONS = 'renderer_options';

export interface RendererOptions {
  canvas: HTMLCanvasElement; 
}

@singleton()
export class Renderer {

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  constructor(@inject(RENDERER_OPTIONS) options: RendererOptions) {
    this.canvas = options.canvas;
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