import { singleton } from "tsyringe";

export enum Direction {
  North,
  East,
  South,
  West
}

export interface InputState {
  direction?: Direction,
  interact?: boolean;
}

@singleton()
export class InputService {

  public state: InputState = {};

  constructor(){    
    window.addEventListener('keydown', (e) => this.handleKeyUp(e.key));
    //window.addEventListener('keyup', (e) => this.state = {});
  }
  
  private handleKeyUp(key: string){
    switch (key) {
      case 'w':
        this.state = { direction: Direction.North  }
        break;
      case 'a':
        this.state = { direction: Direction.West  }
        break;
      case 's':
        this.state = { direction: Direction.South  }
        break;
      case 'd':
        this.state = { direction: Direction.East  }
        break;
      case 'e':
        this.state = { interact: true  }
        break;
      default:
        break;
    }
  }
}