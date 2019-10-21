import { ComponentKey, ComponentName, Prototypes } from '../components';
import { Prototype } from '../prototype';
import { Entity } from '../entity';

export interface XmlOptions {
  components: string,
  entities: string,
  prototypes: string,
  systems: string
}

export class XmlLoader {
  
  constructor(private options: XmlOptions){}

  async loadEntities(){
    await this.loadComponents();
    await this.loadPrototypes();
    return await this.loadEntitiesInternal();
  }

  private async loadComponents(){
    const doc = await this.fetchXml(this.options.components);
    const children = doc.getElementsByTagName('component');
    
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      const name = node.getAttribute('name');
      const flag = parseInt(node.getAttribute('flag'));
      const mask = 1 << flag;

      ComponentKey[name] = mask;
      ComponentName[mask] = name;
    }
  }
  
  private async loadEntitiesInternal(){
    const doc = await this.fetchXml(this.options.entities);
    const entities: Entity[] = [];

    const children = doc.getElementsByTagName('entity');
    for (let i = 0; i < children.length; i++) {
      const entityElement = children[i];
      
      const entityData = {};
      let entity: Entity;

      const componentChildren = entityElement.children;
      for (let j = 0; j < componentChildren.length; j++) {
        const componentElement = componentChildren[j];
        const name = componentElement.nodeName;
        
        entityData[name] = this.parseComponent(componentElement);
      }    
            
      const prototypeId = entityElement.getAttribute('prototype');
      if(prototypeId){
        const prototype = Prototypes[prototypeId];
        entity = prototype.createEntity(entityData);
      }
      else {
        entity = new Entity(entityData);
      }

      entities.push(entity);            
    }

    return entities;
  }

  private async loadPrototypes(){
    const doc = await this.fetchXml(this.options.prototypes);
    
    const children = doc.getElementsByTagName('prototype');
    for (let i = 0; i < children.length; i++) {
      const prototypeElement = children[i];
      
      const prototypeId = prototypeElement.getAttribute('id');
      const prototype = {};
      
      const componentChildren = prototypeElement.children;
      for (let j = 0; j < componentChildren.length; j++) {
        const componentElement = componentChildren[j];
        const name = componentElement.nodeName;
        
        prototype[name] = this.parseComponent(componentElement);
      }      

      Prototypes[prototypeId] = new Prototype(prototypeId, prototype);      
    }
  }

  private parseComponent(element: Element){
    let component: any = {};
        
    const attributes = element.attributes;
    if(attributes.length === 0){
      component = true;          
    }        
    
    for (let k = 0; k < attributes.length; k++) {
      const attribute = attributes[k];
      const name = attribute.nodeName;
      
      if(name === 'value'){
        component = this.parseValue(attribute.nodeValue);
        break;
      }
      else {
        component[name] = this.parseValue(attribute.nodeValue)
      }
    }

    return component;
  }

  private parseValue(val: string): any{
    if(val === 'true'){
      return true;
    }
    else if(val == 'false'){
      return false;
    } 
    else {
      return parseFloat(val) || val;
    }
  }
  
  private async fetchXml(path: string){
    const content = await (await fetch(path)).text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, "text/xml");

    return xmlDoc;
  }
}