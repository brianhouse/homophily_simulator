class Agent {

    constructor(group, attitude) {
        this.attitude = attitude
        this.group = group
        this.cell = null
        this.happy = true
        this.homogeneity = 0
        this.attitude_difference = 1
    }

    updateAttitude() {
        if (this.happy) return
        this.attitude += this.attitude_difference * 0.001
        if (this.attitude > 1) this.attitude = 1
        if (this.attitude < 0) this.attitude = 0
    }    

    updateStatus() {
        let attitude_sum = 0
        if (this.neighbors.length == 0) {
            this.attitude_difference = 1
        } else {
            for (let neighbor of this.neighbors) {
                attitude_sum += neighbor.attitude
            }
            this.attitude_difference = this.attitude - (attitude_sum / this.neighbors.length)
        }
        if (Math.abs(this.attitude_difference) < .01) {
            this.happy = true
        } else {
            this.happy = false
        }
    }   

    updatePosition() {
        // returns bool: moved?
        if (this.happy) {
            return false
        }
        let original_cell = this.cell
        let open_cells = grid.openCells()
        let least_attitude_difference = this.attitude_difference
        let best_unhappy_cell = this.cell
        let c = 0
        while (!this.happy && c < open_cells.length) {
            this.move(open_cells[c++])
            this.updateStatus()
            if (this.attitude_difference < least_attitude_difference) {
                least_attitude_difference = this.attitude_difference
                best_unhappy_cell = this.cell
            }
        }        
        if (!this.happy) {
            this.move(best_unhappy_cell)
        }
        return true
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