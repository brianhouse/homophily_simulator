let population_field = null
let density_field = null
let attitude_field = null

let grid_size = null
let population_size = null
let attitude = null

let running = false

let loaded_population = null
let grid = null
let agents = []
let a = 0

let c1 = "lightblue" //"#68b859"
let c2 = "darkblue" // "#34789a"
// let c1 = "blue"
// let c2 = "red"

let simulation = function(s) { 

    s.setup = function() {

        let canvas = s.createCanvas(600, 600) 
        canvas.parent('simulation')    

        let run_button = s.select('#run')
        run_button.mousePressed(s.runClicked)

        let reset_button = s.select('#reset')
        reset_button.mousePressed(s.resetClicked)

        population_field = s.select('#population_field')
        population_field.changed(s.setGrid)

        density_field = s.select('#density_field')
        density_field.changed(s.setGrid)    

        population_file = s.createFileInput(s.loadPopulation)
        population_file.id('file_select')

        c1 = s.color(c1)
        c2 = s.color(c2)    

        s.frameRate(60)
        s.noLoop()
        s.setGrid()
    } 

    s.init = function() {    
        agents = []
        a = 0        
        grid = new Grid(s, grid_size)
        let open_cells = grid.openCells()
        if (loaded_population) {
            console.log('Loading population from file')
        } else {
            console.log('Loading random population')
        }
        for (let i=0; i<population_size; i++) {

            // loading will go here
            let agent = null
            if (loaded_population == null) {
                let group = Math.round(Math.random(0, 1))
                // let attitude = group
                let attitude = Math.random(0, 1)
                agent = new Agent(group, attitude)
            } else {
                agent = new Agent(loaded_population[i].group, loaded_population[i].attitude)
            }

            agents.push(agent)
            let c = Math.floor(Math.random() * open_cells.length)
            agent.move(open_cells[c])    
            open_cells.splice(c, 1)   
        }
        for (let agent of agents) {
            agent.updateHappiness()
        }
    }

    s.draw = function() { 
        if (running) {  // if not running, this is just a one-time grid draw
            // for (let i=0; i<10; i++) {
            for (let i=0; i<Math.max(1, (Math.floor((grid_size * grid_size * grid_size) / 1600))); i++) {                
                if (!s.update()) {
                    s.noLoop()
                    running = false
                    break
                }
            }
        }
        s.background(256)
        grid.draw()
    }

    s.update = function() {

        // find an agent who can make a happy change
        let i = 0
        while (i < agents.length) {
            if (agents[a++ % agents.length].updatePosition()) break
            i += 1 
        }

        // update everyone else's status (could optimize)
        for (let agent of agents) {
            agent.updateHappiness()
        }    

        // update attitudes
        for (let agent of agents) {
            agent.updateAttitude()
        }    

        // if no one changed position, then game is over
        return true
        return i == agents.length ? false : true

    }

    s.mousePressed = function() {
        grid.mousePressed(s)
    }

    s.runClicked = function() {
        running = true
        s.loop()
    }

    s.resetClicked = function() {
        running = false
        s.init()
        s.redraw()
    }

    s.setGrid = function() {
        let density = parseInt(density_field.value())
        let ps = parseInt(population_field.value())
        if (loaded_population != null && ps != population_size) {
            ps = population_size
            population_field.value(ps)
        }
        let gs = Math.ceil(Math.sqrt((ps / density) * 100))
        if (gs != grid_size || ps != population_size) {
            grid_size = gs
            population_size = ps
            s.init()
            s.redraw()        
        }
    }

    s.loadPopulation = function(file) {
        let reader = new FileReader();
        reader.onload = function(event) {
            let json = JSON.parse(event.target.result);
            loaded_population = []
            for (let key in json) {
                let group = json[key]['group'] == 'A' ? 0 : 1
                let attitude = null
                if (json[key]['attitude'] == "liberal") {
                    attitude = 1/3
                // } else if (json[key]['attitude'] == "illberal") {
                //     attitude = 1
                // } else {
                //     attitude = random(0, 1)
                // }
                } else {
                    attitude = 2/3
                }
                loaded_population.push({group: group, attitude: attitude})
            }
            population_size = loaded_population.length
            population_field.value(population_size)     
            if (attitude_field != null) {
                attitude_field.value('--')
            }
            console.log('Parsed population file')
            s.setGrid()
        }
        reader.readAsText(file.file)
    }


}


let graphs = function(s) { 

    s.setup = function() {
        let canvas = s.createCanvas(300, 100)
        canvas.parent('graphs')                   
    }

    s.draw = function() {
        s.background(255)    
        s.stroke(0)
        s.strokeWeight(s.width / 101)
        let histogram = new Array(101)
        for (let i = 0; i<101; i++) {
            histogram[i] = 0
        }
        for (let agent of agents) {
            histogram[Math.floor(agent.attitude * 100)] += 1
        }
        let max = Math.max.apply(null, histogram)
        for (let h in histogram) {
            let x = (h / 101) * (s.width - 2)
            x += 2
            s.stroke(s.lerpColor(c1, c2, h / 101))
            let y = (1 - (histogram[h] / max)) * s.height            
            s.line(x, s.height, x, y)
        }        
    }

}



new p5(simulation)
new p5(graphs)

