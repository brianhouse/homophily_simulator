const GRID_SIZE = 20
const CELL_WIDTH = 20
const CELL_HEIGHT = 20
const DENSITY = 40

let grid = null
let agents = []

function setup() { 

    let canvas = createCanvas(CELL_WIDTH * GRID_SIZE, CELL_HEIGHT * GRID_SIZE) 
    console.log(width, height)
    canvas.parent('p5')    

    grid = new Grid(GRID_SIZE)

    let open_cells = grid.indexOpen()
    let num_agents = floor((GRID_SIZE * GRID_SIZE) * (DENSITY / 100))
    for (let i=0; i<num_agents; i++) {
        let agent = null
        if (i < num_agents / 2) {
            agent = new Agent(0)
        } else {
            agent = new Agent(1)
        }
        agents.push(agent)
        let index = floor(random() * open_cells.length)
        let cell_num = open_cells[index]
        open_cells.splice(index, 1)    
        agent.move(grid.cells[cell_num])    
    }
    for (let agent of agents) {
        agent.updateStatus()
    }

    frameRate(10)

} 

function draw() { 
    background(220, 100, 100)
    grid.draw()
    for (let agent of agents) {
        agent.updatePosition()
    }
    for (let agent of agents) {
        agent.updateStatus()
    }    
}

function mousePressed() {
    grid.mousePressed()
}
