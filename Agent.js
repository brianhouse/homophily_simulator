class Agent {

    constructor(group, attitude) {
        this.attitude = attitude
        this.group = group
        this.cell = null
        this.happy = true   
        this.group_difference = 0
        this.attitude_difference = 1                     
    }

    updatePosition() {
        // returns bool: moved?
        // this moves to the first acceptable cell, not necessarily the optimuum cell available        
        if (this.happy) {
            return false
        }
        let original_cell = this.cell
        let open_cells = grid.openCells()
        let least_attitude_difference = this.attitude_difference
        let least_group_difference = this.group_difference
        let best_unhappy_cell = this.cell
        let c = 0
        while (!this.happy && c < open_cells.length) {
            this.move(open_cells[c++])
            this.updateHappiness()

            if (this.attitude_difference < least_attitude_difference) {
                least_attitude_difference = this.attitude_difference
                best_unhappy_cell = this.cell
            }
            // if (this.group_difference < least_group_difference) {
            //     least_group_difference = this.group_difference
            //     best_unhappy_cell = this.cell
            // }

        }        
        if (!this.happy) {
            this.move(best_unhappy_cell)
            this.updateHappiness()  // just to be sure attitude_difference is up to date
        }
        return true
    }    

    updateHappiness() {

        // if (this.neighbors.length < 4) {        // dont like to have fewer than half neighbors
        //     this.happy = false
        //     return
        // }        

        // calculate attitude difference
        let attitude_sum = 0
        if (this.neighbors.length == 0) {
            this.attitude_difference = 1
        } else {
            for (let neighbor of this.neighbors) {
                attitude_sum += neighbor.attitude
            }
            this.attitude_difference = this.attitude - (attitude_sum / this.neighbors.length)        
            // this.attitude_difference = (attitude_sum / this.neighbors.length) - this.attitude
        }

        // calculate group difference
        let own = 0
        if (this.neighbors.length == 0) {
            this.group_difference = 1
        } else {
            for (let neighbor of this.neighbors) {
                if (neighbor.group == this.group) {
                    own += 1
                }
            }
            this.group_difference = own / this.neighbors.length
        }

        // happiness is only attitude difference
        this.happy = Math.abs(this.attitude_difference) < .01 ? true : false

        // happiness is only group difference
        // this.happy = this.group_difference < this.attitude ? false : true        

        // happiness is both
        // this.happy = (this.group_difference >= this.attitude) && (Math.abs(this.attitude_difference) < 0.01) ? true : false

    }   

    updateAttitude() {
        if (!this.neighbors.length) return
        this.attitude += this.attitude_difference * 0.001
        if (this.attitude > 1) this.attitude = 1
        if (this.attitude < 0) this.attitude = 0
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