export class Playfield<T> {
  private data: {[key: number]: T};
  
  constructor(public readonly width, public readonly height){
  }

  get(x: number, y: number){
    return this.data[]
  }
}