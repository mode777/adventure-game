export enum ComponentKey {
  position = 1 << 0,
  offset = 1 << 1,
  image = 1 << 2,
  object = 1 << 3,
  ground = 1 << 4,
}

export class Entity implements IEntity {

  key: ComponentKey = 0;
  
  constructor(public readonly id: number, private data: any){
    Object.assign(this, data);

    for (const strVal in ComponentKey) {
      if(data[strVal]){
        this.key += <ComponentKey><unknown>ComponentKey[strVal];
      } 
    }
  }

  hasKey(key: number){
    return (key & this.key) > 0;
  }
}

export interface IEntity {
  id: number
}

export interface HasPosition extends IEntity {
  position: {
    x: number,
    y: number
  }
}

export interface System {
  update(time: number);
}