class Agent {

    constructor(identity) {
        this.homogeneity_min = 1/3
        this.identity = identity
        this.cell = null
        this.happy = true
    }

    updateStatus() {
        let owns = 0
        for (let neighbor of this.neighbors) {
            if (neighbor.identity == this.identity) {
                owns += 1
            }
        }
        if ((owns / this.neighbors.length) < this.homogeneity_min) {
            this.happy = false
        } else {
            this.happy = true
        }
    }   

    updatePosition() {
        // returns whether moved or not
        if (this.happy) {
            return false
        }
        let original_cell = this.cell
        let open_cells = grid.openCells()
        let c = 0
        while (!this.happy && c < open_cells.length) {
            this.move(open_cells[c++])
            this.updateStatus()
        }
        if (!this.happy) {
            this.move(original_cell)        // interesting
            return false
        } else {
            return true
        }
    }

    move(cell) {
        if (this.cell != null) {
            this.cell.agent = null
        }
        this.cell = cell
        this.cell.agent = this
    }

    get neighbors() {
        let neighbors = []
        for (let cell of this.cell.neighbors) {
            if (cell.agent != null) {
                neighbors.push(cell.agent)
            }
        }    
        return neighbors        
    }

}