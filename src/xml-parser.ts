export interface XmlOptions {
  components: string,
  entities: string,
  prototypes: string,
  systems: string
}

export class XmlLoader {
  
  constructor(private options: XmlOptions){}

  async loadXml(){
    await this.loadComponents();
  }

  private async loadComponents(){
    const doc = await this.fetchXml(this.options.components);
    const children = doc.getElementsByTagName('component');
    const componentMap = {};
    
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      const name = node.getAttribute('name');
      const flag = parseInt(node.getAttribute('flag'));
      const mask = 1 << flag;

      componentMap[name] = mask;
      componentMap[mask] = name;
    }
    
    console.log(componentMap);
  }
  
  private async fetchXml(path: string){
    const content = await (await fetch(path)).text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(content, "text/xml");

    return xmlDoc;
  }
}