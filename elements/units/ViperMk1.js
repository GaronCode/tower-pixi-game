import BaseUnit from "./BaseUnit.js"
import UserControl from "../../gameClasses/movementControls/UserControl.js";
import DeathInTime from "../../gameClasses/movementControls/DeathInTime.js";
import gBox from "../shapes.js";


export default class ViperMk1 extends BaseUnit {

    constructor() {
        super({
            unitName: "Viper Mk1",
            shape: new gBox(50, "unit01"),
        })
        
        this.status.maxHP = 120;
        this.controlScripts.push(new UserControl({ unit: this }))
        //this.controlScripts.push(new DeathInTime({ unit: this, time: 1000}))

        
    }
}