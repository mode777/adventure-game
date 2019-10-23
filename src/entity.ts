import { ComponentKey, IEntity } from './components';

export class Entity implements IEntity {

  private static Id = 0;

  public readonly id: number = ++Entity.Id; 
  key: number = 0;

  constructor(data: object){
    Object.assign(this, data);

    for (const strVal of Object.keys(ComponentKey)) {
      if(data[strVal]){
        this.key |= ComponentKey[strVal];
      } 
    }
  }

  hasKey(key: number){
    return (key & this.key) === key;
  }

  addComponent(name: string, data: any){
    this.key |= ComponentKey[name];
    this[name] = data;
  }

  removeComponent(name: string){
    this.key &= (~ComponentKey[name]);
    delete this[name];
  }
}