const GRID_SIZE = 20;
const CELL_WIDTH = 20;
const CELL_HEIGHT = 20;
let cells = [];

PERCENT = 20;

function setup() { 

    let canvas = createCanvas(CELL_WIDTH * GRID_SIZE, CELL_HEIGHT * GRID_SIZE); 
    console.log(width, height);
    canvas.parent('p5');    

    for (let y=0; y<GRID_SIZE; y++) {    
        for (let x=0; x<GRID_SIZE; x++) {
            cells.push(new Cell((y * GRID_SIZE) + x, x, y));
        }
    }

    for (let cell of cells) {
        cell.neighbors;
    }

    frameRate(15);

} 

function draw() { 

    background(220, 100, 100);

    for (let cell of cells) {
        cell.draw(0);
    }

}

function mousePressed() {

    for (let cell of cells) {
        cell.mousePressed();
    }

}



//////////


class Agent {

    constructor(identity) {
        this.identity = identity;
        this.cell = null;
    }

    move(cell) {
        this.cell.agent = null;
        this.cell = cell;
        this.cell.agent = this;
    }

    get neighbors() {
        return this.cell.neighbors;
    }

}


class Cell {

    static grid(x, y) {
        if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
            return null;
        } else {
            return cells[(y * GRID_SIZE) + x];
        }
    }    

    constructor(id, x, y) {
        // console.log("Cell: " + id + " at " + x + "," + y);
        this.id = id;
        this.x = x;
        this.y = y;
        this._neighbors = null;
        this.agent = null;
    }

    draw() {
        if (this.agent != null) {
            fill(this.agent.identity * 256);
        } else {
            fill(100);
        }
        stroke(0);
        strokeWeight(1);
        rect(this.x * CELL_WIDTH, this.y * CELL_HEIGHT, CELL_WIDTH - 1, CELL_HEIGHT - 1);
    }

    mousePressed() {
        if (mouseX > this.x * CELL_WIDTH && mouseX < ((this.x * CELL_WIDTH) + CELL_WIDTH) && mouseY > this.y * CELL_HEIGHT && mouseY < ((this.y * CELL_HEIGHT) + CELL_HEIGHT)) {
            // console.log("hit!", this.id);
            this.agent = new Agent(0);
        }
    }

    get neighbors() {
        if (this._neighbors == null) {
            this._neighbors = [Cell.grid(this.x + 1, this.y), Cell.grid(this.x - 1, this.y), Cell.grid(this.x, this.y + 1), Cell.grid(this.x, this.y - 1), Cell.grid(this.x + 1, this.y + 1), Cell.grid(this.x + 1, this.y - 1), Cell.grid(this.x - 1, this.y + 1), Cell.grid(this.x - 1, this.y - 1)];
            this._neighbors = this._neighbors.filter(function(obj) { return obj });
        }
        return this._neighbors;
    }

}

/*

is it agent-perspective or cell perspective?

cellular automata is cell

but in the experiment they are agents that move


need some concept of adjacency, in the cell. so we dont have to move by x, y.

do they move stepwise in the experiment?

*/