export class Layer {
    data = [];
    width;
    height;

    constructor(width, height, defaultValue = null) {
        this.width = width;
        this.height = height;

        this.init(defaultValue);
    }

    init(defaultValue) {
        for (let y = 0; y < this.height; y++) {
            this.data.push([]);
            for (let x = 0; x < this.width; x++) {
                this.data[y][x] = defaultValue;
            }
        }
    }

    isOccupied(x, y) {
        this.ensureInside();
        return this.data[y][x] !== null;
    }

    set(x, y, value) {
        this.ensureInside(x,y);
        this.data[y][x] = value;
    }
    
    unset(x,y){
        this.ensureInside(x,y);
        this.data[y][x] = null;
    }

    get(x, y) {
        this.ensureInside(x,y);
        return this.data[y][x];
    }

    isInside(x,y){
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    ensureInside(x,y){
        if(!this.isInside(x,y)){
            throw `Index outside of layer: x ${x}, y ${y}`;
        }
    }
}