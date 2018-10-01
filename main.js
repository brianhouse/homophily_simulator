var DIMENSIONS = [10, 10];
var cells = [];
var cell_width;
var cell_height;

function setup() { 

    // var canvas = createCanvas(displayWidth, displayHeight);
    var canvas = createCanvas(300, 300); 
    canvas.parent('p5');    

    var c = 0;
    for (var x=0; x<DIMENSIONS[0]; x++) {
        for (var y=0; y<DIMENSIONS[1]; y++) {
            var adjacent = [];
            if (x > 0) adjacent.push(cells[(y * DIMENSIONS[1]) + x - 1]);
            if (x < DIMENSIONS[0] - 1) adjacent.push(cells[(y * DIMENSIONS[1]) + x + 1]);
            if (y > 0) adjacent.push(cells[((y - 1) * DIMENSIONS[1]) + x]);
            if (y < DIMENSIONS[1] - 1) adjacent.push(cells[((y + 1) * DIMENSIONS[1]) + x]);
            cells[(y * DIMENSIONS[1]) + x] = new Cell(c++, x, y, adjacent);
        }
    }

    // make a percentage of agents here, and distribute

    console.log(cells);

    frameRate(10);

} 

function draw() { 

    background(220, 100, 100);

    cell_width = width / DIMENSIONS[0];
    cell_height = height / DIMENSIONS[1];

    for (var c in cells) {
        cells[c].draw(0);
    }

    cells[55].color = 256;
    for (c in cells[55].adjacent) {
        cells[55][c].color = 0;
    }

}


function Agent(color) {

    this.color = color;
    this.cell = null;

    this.move = function(cell) {
        this.cell = cell;
        this.cell.color = this.color;
    };

}


function Cell(id, x, y, adjacent) {

    this.id = id;
    this.x = x;
    this.y = y;
    this.color = 128;
    this.adjacent = adjacent;

    this.draw = function() {
        fill(this.color);
        stroke(0);
        rect(this.x * cell_width, this.y * cell_height, (this.x + 1) * cell_width, (this.y + 1) * cell_height);
    };    

}

/*

is it agent-perspective or cell perspective?

cellular automata is cell

but in the experiment they are agents that move


need some concept of adjacency, in the cell. so we dont have to move by x, y.

do they move stepwise in the experiment?

*/