export enum ImageType {
  Floor,
  Wall,
  Water,
  Goal,
  Player
}

export enum EntityClass {
  Ground,
  Object,
  Character,
  Player
}

export interface DrawableComponent {
  image: ImageType;
}

export interface PositionComponent {
  x: number,
  y: number
}

export interface Entity {
  entityClass: EntityClass,
}

export interface Player extends Entity {
  drawable: DrawableComponent,
  entityClass: EntityClass.Player,
  position: PositionComponent
}

const p: Player = {
  entityClass: EntityClass.Player,
  position: {
    x: 1,
    y: 2
  },
  drawable: {
    image: ImageType.Floor
  }
}