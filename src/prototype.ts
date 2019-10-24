import { Entity } from './entity';

export class Prototype {
  constructor(public readonly id: string, public data: any){}

  createEntity(additional: object){
    return new Entity({
      ...this.data,
      ...additional
    });
  }
}