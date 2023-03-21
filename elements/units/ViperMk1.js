import BaseFireable from "./BaseFireable.js"
import UserControl from "../../gameClasses/movementControls/UserControl.js";
import DeathInTime from "../../gameClasses/movementControls/DeathInTime.js";
import gBox from "../shapes.js";
import LightPlasma from "../bullets/LightPlasma.js";


export default class ViperMk1 extends BaseFireable {

    constructor() {
        super({
            unitName: "Viper Mk1",
            shape: new gBox(50, "unit01"),
            projectileCreateScr: ({mainUnit}) => new LightPlasma({mainUnit})
        })
        
        this.status.maxHP = 250;
        this.controlScripts.push(new UserControl({ unit: this }))
        //this.controlScripts.push(new DeathInTime({ unit: this, time: 1000}))

        
    }
}