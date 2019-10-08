import { finished } from 'stream';

export enum TaskState {
  Pending,
  Running,
  Finished
}

export class Task {

  public static completed = new Task(t => true);

  public static wait(ms: number){
    return new Task(time => {
      ms -= time;
      return ms <= 0;
    })
  }

  public static once(exec: () => void){
    return new Task(t => {
      exec();
      return true;
    });
  }

  public static chain(...tasks: Task[]){
    let current = 0;
    return new Task(t => {
      if(tasks.length === current){
        console.log('[Chain] complete');
        return true;
      }
      else if(tasks[current].getState() === TaskState.Finished){
        console.log(`[Chain] Task ${current + 1}/${tasks.length} complete`)
        current++;
        return false;
      }
      tasks[current].start();
      tasks[current].update(t);
    })
  }

  public static parallel(...tasks: Task[]){
    return new Task(t => {
      tasks = tasks.filter(x => x.getState() !== TaskState.Finished);
      tasks.forEach(x => {
        x.start(); 
        x.update(t)
      });
      return tasks.length === 0;
    });
  }

  private state: TaskState = TaskState.Pending;
  private res: (() => void)[] = [];

  constructor(private predicate: (time: number) => boolean){
  }

  pause() {
    if(this.state !== TaskState.Finished){
      this.state = TaskState.Pending;
    }
  }

  start() {
    if(this.state !== TaskState.Finished){
      this.state = TaskState.Running;
    }
  }

  getState(): TaskState {
    return this.state;
  }
  
  toPromise(): Promise<void> {
    return new Promise<void>((res,rej) => {
      this.res.push(res);      
    });
  } 

  public update(time: number){
    if(this.state === TaskState.Running){
      const res = this.predicate(time);
      if(res === true){
        this.finishTask();
      }
    }
  }
  
  private finishTask(){
    this.res.forEach(x => x());
    this.res = []; 
    this.state = TaskState.Finished;
  }
}