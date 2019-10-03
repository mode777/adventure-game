export class ResourceLoader {

  async loadImage(filename: string) {
    return new Promise<HTMLImageElement>((res, rej) => {
      const image = new Image();
      image.onload = () => res(image);
      image.onerror = e => rej(e);
      image.src = filename;
    });
  }
  
}