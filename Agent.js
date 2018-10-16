class Agent {

    constructor(identity) {
        this.homogeneity_min = 1/3
        this.identity = identity
        this.cell = null
        this.happy = true
    }

    update() {
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