const DENSITY = 80

let grid_size = null

let grid = null
let agents = []
let a = 0

let grid_size_field = null
let steps_checkbox = null
let running = false

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
    grid_size = parseInt(grid_size_field.value())

    steps_checkbox = select('#show_steps')

    frameRate(60)
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

    if (running) {  // if not running, this is just a one-time grid draw
        for (let i=0; i<max(1, (floor((grid_size * grid_size * grid_size) / 1600))); i++) {
            if (!update()) {
                noLoop()
                running = false
                break
            }
        }
    }
    background(256)
    grid.draw()
}

function update() {

    // find an agent who can make a happy change
    let i = 0
    while (i < agents.length) {
        if (agents[a++ % agents.length].updatePosition()) break
        i += 1 
    }

    // update everyone else's status
    for (let agent of agents) {
        agent.updateStatus()
    }    

    // if no one changed position, then game is over
    return i == agents.length ? false : true

}

function mousePressed() {
    grid.mousePressed()
}

function runClicked() {
    running = true
    loop()
}

function resetClicked() {
    running = false
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

