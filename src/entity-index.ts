import { IEntity } from './components';

export abstract class EntityIndex<TEntity extends IEntity, TSelector> {
  
  private entityByHash = new Map<number, TEntity>();
  
  constructor(){

  }

  clear(){
    this.entityByHash.clear();
  }

  add(entity: TEntity){
    if(this.isElegible(entity)){
      const h = this.hashEntity(entity);
      this.entityByHash.set(h, entity);
    }
  }

  get(selector: TSelector){
    const hash = this.hash(selector);
    return this.entityByHash.get(hash);
  }

  protected abstract hash(selector: TSelector): number;
  protected abstract select(entity: TEntity): TSelector;
  protected abstract filter(entity: TEntity): boolean;

  private isElegible(entity: TEntity){
    return this.filter(entity)
  }
  
  private hashEntity(entity: TEntity){
    const selector = this.select(entity);
    const h = this.hash(selector);
    return h;
  }
}