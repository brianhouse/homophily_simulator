class Grid {

    constructor(grid_size) {
        this.grid_size = grid_size
        this.cell_size = width / this.grid_size
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
            if (this.agent.group) {
                fill("#68b859")
            } else {
                fill("#34789a")
            }
        } else {
            fill(256)
        }
        stroke(256)
        if (this.grid.grid_size > 30) {
            strokeWeight(1)
        } else {
            strokeWeight(2)
        }
        rect(this.x * this.grid.cell_size, this.y * this.grid.cell_size, this.grid.cell_size, this.grid.cell_size)
        if (this.agent != null && !this.agent.happy) {
            strokeWeight(0)
            fill("#d74c34")
            ellipse((this.x * this.grid.cell_size) + (this.grid.cell_size / 2), (this.y * this.grid.cell_size) + (this.grid.cell_size / 2), this.grid.cell_size / 4, this.grid.cell_size / 4)
        }
    }

    mousePressed() {
        if (mouseX > this.x * this.grid.cell_size && mouseX < ((this.x * this.grid.cell_size) + this.grid.cell_size) && mouseY > this.y * this.grid.cell_size && mouseY < ((this.y * this.grid.cell_size) + this.grid.cell_size)) {
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