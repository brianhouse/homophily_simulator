const GRID_SIZE = 20
const CELL_WIDTH = 20
const CELL_HEIGHT = 20
const DENSITY = 20

let cells = []



function setup() { 

    let canvas = createCanvas(CELL_WIDTH * GRID_SIZE, CELL_HEIGHT * GRID_SIZE) 
    console.log(width, height)
    canvas.parent('p5')    

    for (let y=0; y<GRID_SIZE; y++) {    
        for (let x=0; x<GRID_SIZE; x++) {
            cells.push(new Cell((y * GRID_SIZE) + x, x, y))
        }
    }

    for (let cell of cells) {
        cell.neighbors
    }

    let open_cells = []
    for (let i=0; i<cells.length; i++) {
        open_cells.push(i)
    }

    let num_agents = floor((CELL_HEIGHT * CELL_WIDTH) * (DENSITY / 100))
    for (let i=0; i<num_agents; i++) {
        let agent = null
        if (i < num_agents / 2) {
            agent = new Agent(0)
        } else {
            agent = new Agent(1)
        }
        let index = floor(random() * open_cells.length)
        let cell_num = open_cells[index]
        open_cells.splice(index, 1)        
        cells[cell_num].agent = agent
    }

    frameRate(15)

} 

function draw() { 

    background(220, 100, 100)

    for (let cell of cells) {
        cell.draw(0)
    }

}

function mousePressed() {

    for (let cell of cells) {
        cell.mousePressed()
    }

}

