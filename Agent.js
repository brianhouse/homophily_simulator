class Agent {

    constructor(group, attitude) {
        this.attitude = attitude
        this.group = group
        this.cell = null
        this.happy = true   
        this.group_difference = 1
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

            // keep track of the best location vis-a-vis attitude
            if (this.attitude_difference < least_attitude_difference) {
                least_attitude_difference = this.attitude_difference
                best_unhappy_cell = this.cell
            }

            // keep track of the best location vis-a-vis group difference
            // if (this.group_difference < least_group_difference) {
            //     least_group_difference = this.group_difference
            //     best_unhappy_cell = this.cell
            // }

            // both of these have a similar effect, with attitude being a slightly clearer result
            // given that happiness is now a result of both, and attitude is the more continuous value, having it as the default will always have an appropriate effect, whereas group difference could maximize in the wrong direction if it's attitude that was off

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

        // // calculate total attitude difference
        // let attitude_sum = 0
        // if (this.neighbors.length == 0) {
        //     this.attitude_difference = 1
        // } else {
        //     for (let neighbor of this.neighbors) {
        //         attitude_sum += neighbor.attitude
        //     }
        //     // this.attitude_difference = this.attitude - (attitude_sum / this.neighbors.length)           // bug!
        //     this.attitude_difference = (attitude_sum / this.neighbors.length) - this.attitude
        // }

        // calculate in-group attitude difference
        let attitude_sum = 0
        let in_group_members = 0
        for (let neighbor of this.neighbors) {
            if (neighbor.group == this.group) {
                attitude_sum += neighbor.attitude
                in_group_members += 1
            }
        }
        if (in_group_members == 0) {
            this.attitude_difference = 1
        } else {
            this.attitude_difference = (attitude_sum / in_group_members) - this.attitude
        }

        // calculate intolerance of out-group
        attitude_sum = 0
        let out_group_members = 0
        for (let neighbor of this.neighbors) {
            if (neighbor.group != this.group) {
                attitude_sum += neighbor.attitude
                out_group_members += 1
            }
        }
        let intolerance
        if (out_group_members == 0) {
            intolerance = 0
        } else {
            intolerance = (attitude_sum / out_group_members)
        }
        // this.attitude_difference += intolerance * 0.03

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

        let happy_group = this.group_difference > this.attitude ? true : false
        let happy_attitude = Math.abs(this.attitude_difference) < .01 ? true : false
        let happy_intolerance = intolerance < 0.5 ? true : false    // should be relative to the actual group mix?


        this.happy = happy_attitude
        this.happy = happy_group        
        this.happy = happy_attitude && happy_group
        this.happy = happy_attitude && happy_group && happy_intolerance

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