class Grid {

    constructor(s, grid_size) {
        this.s = s
        this.grid_size = grid_size
        this.cell_size = s.width / this.grid_size
        this.cells = []
        for (let y=0; y<this.grid_size; y++) {    
            for (let x=0; x<this.grid_size; x++) {
                this.cells.push(new Cell(this, (y * this.grid_size) + x, x, y))
            }
        }
        for (let cell of this.cells) {
            cell.neighbors
        }
    }

    find(x, y) {
        if (x < 0 || x >= this.grid_size || y < 0 || y >= this.grid_size) {
            return null
        } else {
            return this.cells[(y * this.grid_size) + x]
        }
    }

    openCells() {
        let open_cells = []
        for (let cell of this.cells) {
            if (cell.agent == null) {
                open_cells.push(cell)
            }
        }
        shuffleArray(open_cells)
        return open_cells
    }    

    draw() {
        for (let cell of this.cells) {
            cell.draw(this.s)
        }
    }

    mousePressed(s) {
        for (let cell of this.cells) {
            cell.mousePressed(s)
        }
    }

}

class Cell {

    constructor(grid, id, x, y) {
        // console.log("Cell: " + id + " at " + x + "," + y)
        this.grid = grid
        this.id = id
        this.x = x
        this.y = y
        this._neighbors = null
        this.agent = null
        this.color = null
    }

    draw(s) {
        if (this.agent == null) return

        // set stroke
        s.stroke(256)
        if (this.grid.grid_size > 30) {
            s.strokeWeight(1)
        } else {
            s.strokeWeight(2)
        }

        // set color to interpolate based on attitude
        this.color = s.lerpColor(c1, c2, this.agent.attitude)
        s.fill(this.color)

        // set shape
        if (this.agent.group) {
        // if (this.agent.attitude > 0.5) {            
            s.rect(this.x * this.grid.cell_size, this.y * this.grid.cell_size, this.grid.cell_size, this.grid.cell_size)
        } else {
            s.ellipse(this.x * this.grid.cell_size + this.grid.cell_size / 2, this.y * this.grid.cell_size + this.grid.cell_size / 2, this.grid.cell_size, this.grid.cell_size)            
        }

        // add happiness indicator
        if (!this.agent.happy) {
            s.strokeWeight(0)
            s.fill("#d74c34")
            s.ellipse((this.x * this.grid.cell_size) + (this.grid.cell_size / 2), (this.y * this.grid.cell_size) + (this.grid.cell_size / 2), this.grid.cell_size / 4, this.grid.cell_size / 4)
        }

    }

    mousePressed(s) {
        if (s.mouseX > this.x * this.grid.cell_size && s.mouseX < ((this.x * this.grid.cell_size) + this.grid.cell_size) && s.mouseY > this.y * this.grid.cell_size && s.mouseY < ((this.y * this.grid.cell_size) + this.grid.cell_size)) {
            console.log("hit!", this.id)
            if (this.agent != null) {
                console.log(this.agent.attitude, this.agent.neighbors_attitude, this.agent.attitude_adjustment)
            }
        }
    }

    get neighbors() {
        if (this._neighbors == null) {
            this._neighbors = [this.grid.find(this.x + 1, this.y), this.grid.find(this.x - 1, this.y), this.grid.find(this.x, this.y + 1), this.grid.find(this.x, this.y - 1), this.grid.find(this.x + 1, this.y + 1), this.grid.find(this.x + 1, this.y - 1), this.grid.find(this.x - 1, this.y + 1), this.grid.find(this.x - 1, this.y - 1)]
            this._neighbors = this._neighbors.filter(function(obj) { return obj })
        }
        return this._neighbors
    }

}