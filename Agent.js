class Agent {

    constructor(group, attitude) {
        this.attitude = attitude
        this.group = group
        this.cell = null
        this.homogeneity = 0
        this.happy = true   
        // this.attitude_difference = 1                     

        this.neighbors_attitude = 0
        this.attitude_adjustment = 0
    }

    updateAttitude() {
        if (!this.neighbors.length) return
        let attitude_sum = 0
        for (let neighbor of this.neighbors) {
            attitude_sum += neighbor.attitude
        }
        this.neighbors_attitude = (attitude_sum / this.neighbors.length)
        let attitude_difference = this.neighbors_attitude - this.attitude
        this.attitude_adjustment = attitude_difference * 0.01
        this.attitude += this.attitude_adjustment
        if (this.attitude > 1) this.attitude = 1
        if (this.attitude < 0) this.attitude = 0
    }    

    updateHappiness() {

        // // happiness based on attitude
        // let attitude_sum = 0
        // if (this.neighbors.length == 0) {
        //     this.attitude_difference = 1        // really doesnt like to be alone
        // } else {
        //     for (let neighbor of this.neighbors) {
        //         attitude_sum += neighbor.attitude
        //     }
        //     this.attitude_difference = this.attitude - (attitude_sum / this.neighbors.length)
        // }
        // if (Math.abs(this.attitude_difference) < .01) {
        //     this.happy = true
        // } else {
        //     this.happy = false
        // }

        // happiness based on groups
        if (this.neighbors.length < 4) {        // dont like to have fewer than half neighbors
            this.happy = false
            return
        }
        let own = 0
        for (let neighbor of this.neighbors) {
            if (neighbor.group == this.group) {
                own += 1
            }
        }
        this.homogeneity = own / this.neighbors.length
        this.happy = this.homogeneity < this.attitude ? false : true

    }   

    updatePosition() {
        // returns bool: moved?
        // this moves to the first acceptable cell, not necessarily the optimuum cell available        
        if (this.happy) {
            return false
        }
        let original_cell = this.cell
        let open_cells = grid.openCells()
        // let least_attitude_difference = this.attitude_difference
        let most_homogeneity = this.homogeneity
        let best_unhappy_cell = this.cell
        let c = 0
        while (!this.happy && c < open_cells.length) {
            this.move(open_cells[c++])
            this.updateHappiness()
            // if (this.attitude_difference < least_attitude_difference) {
            //     least_attitude_difference = this.attitude_difference
            //     best_unhappy_cell = this.cell
            // }
            if (most_homogeneity > this.homogeneity) {
                most_homogeneity = this.homogeneity
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