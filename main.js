let population_field = null
let density_field = null
let attitude_field = null

let grid_size = null
let population_size = null

let running = false

let loaded_population = null
let grid = null
let agents = []
let a = 0

function setup() { 

    let canvas = createCanvas(600, 600) 
    canvas.parent('p5')    

    let run_button = select('#run')
    run_button.mousePressed(runClicked)

    let reset_button = select('#reset')
    reset_button.mousePressed(resetClicked)

    population_field = select('#population_field')
    population_field.changed(setGrid)

    density_field = select('#density_field')
    density_field.changed(setGrid)    

    //

    attitude_field = select('#attitude_field')
    attitude_field.changed(setAttitude)

    //

    population_file = createFileInput(loadPopulation)
    population_file.position(250, 750)
    // loadJSON("temp_pop_0.json", loadPopulation)

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
        let agent = new Agent(round(random(0, 1)), random(0, 1))

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
    if (gs != grid_size || ps != population_size) {
        grid_size = gs
        population_size = ps
        init()
        redraw()        
    }
}

function loadPopulation(json) {
    console.log(json)
    loaded_population = []
    for (let key in json) {
        let group = json[key]['group'] == 'A' ? 0 : 1
        let attitude = json[key]['attitude']
        console.log(group, attitude)
        loaded_population.push({group: group, attitude: attitude})
    }
    population_field.value(loaded_population.length)
    // console.log(file)
    // console.log(JSON)    
    // console.log(JSON.parse(file.data))
}

function setPopulation() {


}

function setAttitude() {
    let attitude = parseFloat(attitude_field.value())
    for (let agent of agents) {
        agent.attitude = attitude
        agent.updateStatus()
    }
    redraw()    
}
