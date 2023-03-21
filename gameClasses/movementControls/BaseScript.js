export default class BaseScript {
    constructor() {
        this.unit;
        this.halfPI = Math.PI/2
        this.afterScript = ()=>{}
    }
    tick() {


    }

    once() {

    }

    addUnit(unit) {
        this.unit = unit;
    }

    addAfterScript(script) {this.afterScript = script}
}