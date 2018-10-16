class Agent {

    constructor(identity) {
        this.identity = identity
        this.cell = null
    }

    move(cell) {
        this.cell.agent = null
        this.cell = cell
        this.cell.agent = this
    }

    get neighbors() {
        return this.cell.neighbors
    }

}