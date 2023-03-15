import Lib from "../../gameClasses/Lib.js";
import UserControl from "../../gameClasses/movementControls/UserControl.js";
import DeathInTime from "../../gameClasses/movementControls/DeathInTime.js";
import gBox from "../shapes.js";
import Team from "../../gameClasses/Team.js"
import BaseScript from "../../gameClasses/movementControls/BaseScript.js";

export default class Unit extends Lib {

    constructor({ unitName, shape }) {
        super({ errName: "Unit " + unitName })
        this.shape = shape;
        this.team;
        this.name = unitName;
        this.weapons = []
        this.status = {
            set maxHP(v) {
                this.nowHP = this.nowHP === this._maxHP ? v : this.nowHP;
                this._maxHP = v;
            },
            get maxHP() {
                return this._maxHP
            },
            _maxHP: 100,
            nowHP: 100,
            dead: false
        }
        this.position = {
            set x(v) { shape.position.x = v },
            get x() { return shape.position.x },
            set y(v) { shape.position.y = v },
            get y() { return shape.position.y },
            
            
            set: function (x, y) {
                this.x = x;
                this.y = y;
            }
        }
        this.controlScripts = []
    }


    addControlScript(script) {
        this.addToArr(
            this.controlScripts,
            script,
            "addControlScript",
            BaseScript,
            () => { script.addUnit(this) }
        );

    }

    removeControlScript(script) {
        this.delFromArr(
            this.controlScripts,
            script,
            "removeControlScript",
            "Scripts",
            "Script"
        );
    }


    addTeam(team) {
        if (this.checkClass(team, Team, "addTeam")) return false
        this.team = team;
    }

    set rotation(v) { this.shape.unitRotation = v }
    get rotation() { return this.shape.unitRotation }



    tick({ cursorPosition }) {
        this.controlScripts.forEach(control => control.tick(({ cursorPosition })));
        if (this.status.hp <= 0) {
            this.status.dead = true;
        }
    }
    prepareScripts({ cursorPosition }) {
        this.controlScripts.forEach(control => control.once(({ cursorPosition })));
    }
}