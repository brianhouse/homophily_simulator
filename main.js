const DENSITY = 80

let grid_size = 20

let cell_size = null
let grid = null
let agents = []
let a = 0
let grid_size_field = null

function setup() { 

    let canvas = createCanvas(600, 600) 
    console.log(width, height)
    canvas.parent('p5')    

    let run_button = select('#run')
    run_button.mousePressed(runClicked)

    let reset_button = select('#reset')
    reset_button.mousePressed(resetClicked)

    let grid_button = select('#grid')
    grid_size_field = select('#grid_size')
    grid_button.mousePressed(setGrid)

    // frameRate(60)
    noLoop()
    init()
} 

function init() {    
    agents = []
    a = 0        
    grid = new Grid(grid_size)
    let open_cells = grid.openCells()
    let num_agents = floor((grid_size * grid_size) * (DENSITY / 100))
    for (let i=0; i<num_agents; i++) {
        let agent = null
        if (i < num_agents / 2) {
            agent = new Agent(0)
        } else {
            agent = new Agent(1)
        }
        agents.push(agent)
        let c = floor(random() * open_cells.length)
        agent.move(open_cells[c])    
        open_cells.splice(c, 1)   
    }
    for (let agent of agents) {
        agent.updateStatus()
    }
}

function draw() { 
    background(256)
    grid.draw()
    let i = 0
    while (i < agents.length && !agents[a % agents.length].updatePosition()) {
        a += 1
        i += 1 // dont check an agent more than once per frame
    }
    for (let agent of agents) {
        agent.updateStatus()
    }    
    if (i == agents.length) {
        noLoop()   
    }    
}

function mousePressed() {
    grid.mousePressed()
}

function runClicked() {
    loop()
}

function resetClicked() {
    init()
    redraw()
}

function setGrid() {
    let gs = parseInt(grid_size_field.value())
    if (gs != grid_size) {
        grid_size = gs
        init()
        redraw()        
    }
}

