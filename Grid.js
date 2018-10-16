class Cell {

    static grid(x, y) {
        if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
            return null
        } else {
            return cells[(y * GRID_SIZE) + x]
        }
    }    

    constructor(id, x, y) {
        // console.log("Cell: " + id + " at " + x + "," + y)
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
    }

    mousePressed() {
        if (mouseX > this.x * CELL_WIDTH && mouseX < ((this.x * CELL_WIDTH) + CELL_WIDTH) && mouseY > this.y * CELL_HEIGHT && mouseY < ((this.y * CELL_HEIGHT) + CELL_HEIGHT)) {
            console.log("hit!", this.id)
        }
    }

    get neighbors() {
        if (this._neighbors == null) {
            this._neighbors = [Cell.grid(this.x + 1, this.y), Cell.grid(this.x - 1, this.y), Cell.grid(this.x, this.y + 1), Cell.grid(this.x, this.y - 1), Cell.grid(this.x + 1, this.y + 1), Cell.grid(this.x + 1, this.y - 1), Cell.grid(this.x - 1, this.y + 1), Cell.grid(this.x - 1, this.y - 1)]
            this._neighbors = this._neighbors.filter(function(obj) { return obj })
        }
        return this._neighbors
    }

}