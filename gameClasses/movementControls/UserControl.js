import BaseScript from "./BaseScript";

export default class UserControl extends BaseScript{
    constructor({unit}) {
        super();
        this.unit = unit;
        this.mouseControl = true;
    } 


    tick({cursorPosition}) {

        let y = cursorPosition.y - this.unit.position.y,
            x = cursorPosition.x - this.unit.position.x;
        let angle = Math.atan2(y, x) + Math.PI / 2;
        this.unit.rotation = angle;
      
    }
}