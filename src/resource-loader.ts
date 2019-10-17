import { injectable, singleton } from 'tsyringe';

@singleton()
export class ResourceLoader {

  private resources = new Map<string, HTMLImageElement>();

  async loadImage(filename: string) {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const image = new Image();
      image.onload = () => res(image);
      image.onerror = e => rej(e);
      image.src = filename;
    });
    this.resources.set(filename, img);
  }

  getResource(filename: string){
    return this.resources.get(filename);
  }
  
}