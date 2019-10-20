import { IEntity, HasPosition } from './components';
import { Entity } from './entity';
import { singleton } from 'tsyringe';

@singleton()
export class Playfield {
  
  private floors = new Map<number,Entity>();
  private objects = new Map<number,Entity>();
  
  constructor(){}

  clear(){
    this.floors.clear();
    this.objects.clear();
  }

  setFloor(entity: HasPosition){
    const hash = this.hashPosition(entity.position.x, entity.position.y);
    this.floors.set(hash, <any>entity);
  }
  
  getFloor<T>(x: number, y: number, componentKey: number = 0){
    const hash = this.hashPosition(x, y);
    const e = <Entity & T>this.floors.get(hash);
    if(e && e.hasKey(componentKey)){
      return e;
    }
  }
  
  setObject(entity: HasPosition){
    const hash = this.hashPosition(entity.position.x, entity.position.y);
    this.objects.set(hash, <any>entity);
  } 
  
  getObject<T>(x: number, y: number, componentKey: number = 0){
    const hash = this.hashPosition(x, y);
    const e = <Entity & T>this.objects.get(hash);
    if(e && e.hasKey(componentKey)){
      return e;
    }
  }
  
  private hashPosition(x: number, y: number){
    return (y << 16) + x;
  }
}