import Lib from "../../gameClasses/Lib.js";
import UserControl from "../../gameClasses/movementControls/UserControl.js";
import DeathInTime from "../../gameClasses/movementControls/DeathInTime.js";
import gBox from "../shapes.js";
import Team from "../../gameClasses/Team.js"
import BaseScript from "../../gameClasses/movementControls/BaseScript.js";
import { Container } from 'pixi.js'


export default class RenderableObject extends Lib {

    constructor({ unitName, shape }) {
        super({ errName: "Unit " + unitName })
        this.shape = shape;
        let container = new Container();
        
        if (shape !== undefined) {
            container.addChild(shape);
        }
        
        
        container.isRendered = false;
        this.container = container;




        this.position = {
            set x(v) { container.position.x = v },
            get x() { return container.position.x },
            set y(v) { container.position.y = v },
            get y() { return container.position.y },


            set: function (x, y) {
                this.x = x;
                this.y = y;
            }
        }
        
    }
    set rotation(v) { this.container.rotation = v }
    get rotation() { return this.container.rotation }



    normalizeContainer() {
        this.container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;
    }

    _getRenderObj() {
        this.container.isRendered = true;
        return this.container;
    }

    _isRendered() {
        return this.container.isRendered;
    }

    _stopRender() {
        this.container.isRendered = false;
    }
}