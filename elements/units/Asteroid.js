import BaseUnit from "./BaseUnit.js"
import MoveThroughTarget from "../../gameClasses/movementControls/MoveThroughTarget";
import DeathInTime from "../../gameClasses/movementControls/DeathInTime.js";
import gBox from "../shapes.js";
import Lib from "../../gameClasses/Lib.js"
import MoveToTarget from "../../gameClasses/movementControls/MoveToTarget";



export default class Asteroid extends BaseUnit {

    constructor() { 
        
        super({
            unitName: "Asteroid",
            shape: new gBox( Lib.intRange(20,50), "aster_"+Lib.intLen(7)),
        })
        

        this.controlScripts.push(new DeathInTime({ unit: this, time: 1000}))

        
    }
}