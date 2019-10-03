import { ResourceLoader } from './resource-loader';

export class Renderer {

  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d');
  }

  clear(){
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImage(image: HTMLImageElement, x: number, y: number) {
    this.ctx.drawImage(image, x, y);
  }
}