class Grid {

    constructor(grid_size) {
        this.grid_size = grid_size
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

    indexOpen() {
        let open_cells = []
        for (let i=0; i<grid.cells.length; i++) {
            open_cells.push(i)
        }
        return open_cells
    }    

    draw() {
        for (let cell of this.cells) {
            cell.draw()
        }
    }

    mousePressed() {
        for (let cell of this.cells) {
            cell.mousePressed()
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
    }

    draw() {
        if (this.agent != null) {
            fill(this.agent.identity * 256)
        } else {
            fill(128)
        }
        stroke(0)
        strokeWeight(1)
        rect(this.x * CELL_WIDTH, this.y * CELL_HEIGHT, CELL_WIDTH - 1, CELL_HEIGHT - 1)
        if (this.agent != null && !this.agent.happy) {
            strokeWeight(0)
            fill(256, 50, 50)
            ellipse((this.x * CELL_WIDTH) + (CELL_WIDTH / 2), (this.y * CELL_HEIGHT) + (CELL_HEIGHT / 2), 8, 8)
        }
    }

    mousePressed() {
        if (mouseX > this.x * CELL_WIDTH && mouseX < ((this.x * CELL_WIDTH) + CELL_WIDTH) && mouseY > this.y * CELL_HEIGHT && mouseY < ((this.y * CELL_HEIGHT) + CELL_HEIGHT)) {
            console.log("hit!", this.id)
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