export interface XmlOptions {
  components: string,
  entities: string,
  prototypes: string,
  systems: string
}

export class XmlLoader {
  
  private componentMap: any = {};

  constructor(private options: XmlOptions){}

  async loadXml(){
    await this.loadComponents();
    await this.loadPrototypes();
  }

  private async loadComponents(){
    const doc = await this.fetchXml(this.options.components);
    const children = doc.getElementsByTagName('component');
    
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      const name = node.getAttribute('name');
      const flag = parseInt(node.getAttribute('flag'));
      const mask = 1 << flag;

      this.componentMap[name] = mask;
      this.componentMap[mask] = name;
    }
  }
  
  private async loadPrototypes(){
    const doc = await this.fetchXml(this.options.prototypes);
    
    const children = doc.getElementsByTagName('prototype');
    for (let i = 0; i < children.length; i++) {
      const prototypeElement = children[i];
      
      const prototype = {
        key: 0
      };
      
      const componentChildren = prototypeElement.children;
      for (let j = 0; j < componentChildren.length; j++) {
        const componentElement = componentChildren[j];
        const name = componentElement.nodeName;
        prototype.key += this.componentMap[name];
        let component: any = {};
        
        const attributes = componentElement.attributes;
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

        prototype[name] = component;
      }      

      console.log(prototype)
    }

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