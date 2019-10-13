export enum ComponentKey {
  position = 1 << 0,
  offset = 1 << 1,
  image = 1 << 2,
  object = 1 << 3,
  ground = 1 << 4,
}

export class Entity {

  key: ComponentKey = 0;
  
  constructor(public readonly id: number, private data: any){
    Object.assign(this, data);
    
    for (const strVal in ComponentKey) {
      if(data[strVal]){
        this.key += <ComponentKey><unknown>ComponentKey[strVal];
      } 
    }
  }

  component<T>(key: ComponentKey){
    return this.data[ComponentKey[key]];
  }  
}

export abstract class System {
  constructor(private key: ComponentKey){

  }
  
  update(entity: Entity){
    if((entity.key & this.key) > 0){
      this.updateEntity(entity);
    }
  }

  abstract updateEntity(entity: Entity);
}