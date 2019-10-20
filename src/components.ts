import { Prototype } from './prototype';

export const ComponentKey: {[id: string]: number} = {};
export const ComponentName: {[id: number]: string} = {};

export const Prototypes: {[id: string]: Prototype} = {};

export interface IEntity {
  id: number
}

export interface HasPosition extends IEntity {
  position: {
    x: number,
    y: number
  }
}

export interface HasImage extends IEntity {
  image: string
}

export interface System {
  init(): Promise<void>;
  update(time: number): void;
}