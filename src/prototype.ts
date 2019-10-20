import { Entity } from './entity';

export class Prototype {
  constructor(public readonly id: string, private data: object){}

  createEntity(additional: object){
    return new Entity({
      ...this.data,
      ...additional
    });
  }
}