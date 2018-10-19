let population_field = null
let density_field = null
let grid_size = null
let population_size = null

let running = false

let grid = null
let agents = []
let a = 0

function setup() { 

    let canvas = createCanvas(600, 600) 
    console.log(width, height)
    canvas.parent('p5')    

    let run_button = select('#run')
    run_button.mousePressed(runClicked)

    let reset_button = select('#reset')
    reset_button.mousePressed(resetClicked)

    let population_button = select('#population_button')
    population_field = select('#population_field')

    let density_button = select('#density_button')
    density_field = select('#density_field')

    population_button.mousePressed(setGrid)
    density_button.mousePressed(setGrid)    

    frameRate(60)
    noLoop()
    setGrid()    
    init()
} 

function init() {    
    agents = []
    a = 0        
    grid = new Grid(grid_size)
    let open_cells = grid.openCells()
    for (let i=0; i<population_size; i++) {

        // loading will go here
        let agent = null
        if (i < population_size / 2) {
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
    let density = parseInt(density_field.value())
    let ps = parseInt(population_field.value())
    let gs = ceil(sqrt((ps / density) * 100))
    console.log(density, ps, gs)
    if (gs != grid_size || ps != population_size) {
        grid_size = gs
        population_size = ps
        init()
        redraw()        
    }
}
