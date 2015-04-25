
export default class state {
    constructor(name) {
        this.name = name;
    }
    init() {
        console.log(`STATE activated: ${this.name}`);
    }
}
