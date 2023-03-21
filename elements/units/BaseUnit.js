import Lib from "../../gameClasses/Lib.js";
import UserControl from "../../gameClasses/movementControls/UserControl.js";
import DeathInTime from "../../gameClasses/movementControls/DeathInTime.js";
import gBox from "../shapes.js";
import Team from "../../gameClasses/Team.js"
import BaseScript from "../../gameClasses/movementControls/BaseScript.js";
import { Container, Sprite, Texture } from 'pixi.js'


export default class Unit extends Lib {

    constructor({ unitName, shape }) {
        super({ errName: "Unit " + unitName })
        this.shape = shape;
        let container = new Container();
        
        container.addChild(shape);
        container.pivot.x = container.width / 2;
        container.pivot.y = container.height / 2;
        container.isRendered = false;
        this.container = container;
        
        let bg = new Sprite(Texture.WHITE);
        bg.width = container.width;
        bg.height = container.height;
        bg.alpha = 0.1;
        bg.zIndex = 100;

        container.addChild(bg);
        this.bgItem = bg;

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
            set nowHP(v) {
                if (v > 0) this._nowHP = v;
                else {
                    this.dead = true;
                }
            },
            get nowHP() {
                return this._nowHP; 
            },
            takeDamage({damage}) {
                this.nowHP = this.nowHP - damage;
            },
            _maxHP: 100,
            _nowHP: 100,
            dead: false
        }


        this.controlScripts = []


        this.position = {
            set x(v) { container.position.x = v },
            get x() { return container.position.x },
            set y(v) { container.position.y = v },
            get y() { return container.position.y },


            set: function (x, y) {
                this.x = x;
                this.y = y;
            },

            add: function (x,y) {
                this.x += x;
                this.y += y;
            }
        }
        
    }
    set rotation(v) { 
        // let angle = v % Math.PI*2;
        // if (angle < 0) {
        //     angle = angle + Math.PI*2;
        // }
        this.container.rotation= v;
    }
    get rotation() { return this.container.rotation }
    
    get collisionRadius() {
        let max = 0;
        this.container.children.forEach((e)=>{
            if (e.collisionRadius > max) max = e.collisionRadius
        })
        return max;

    }

    collisionFx(anotherUnit) {
        if (this.team === anotherUnit.team) return;
        
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
        if (!this.checkClass(team, Team, "addTeam")) return false
        
        this.team = team;
        this.changeColor(team.color)
    }

    changeColor(color = 0xff0000, alpha = 0.1) {
        this.bgItem.tint = color;
        this.bgItem.alpha = alpha;
    }

    

////////////////////////////////////////////////////////////////////////

    tick({ cursorPosition }) {
        this.controlScripts.forEach(control => control.tick(({ cursorPosition })));
        if (this.status.hp <= 0) {
            this.status.dead = true;
        }
    }
    prepareScripts({ cursorPosition }) {
        this.controlScripts.forEach(control => control.once(({ cursorPosition })));
    }
////////////////////////////////////////////////////////////////////////




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