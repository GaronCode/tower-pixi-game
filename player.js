import * as PIXI from "pixi.js";
import Shooting from "./shooting.js"

export default class Player {
    constructor({ app }) {
        this.app = app;

        const playerWidth = 32;
        const player = new PIXI.Sprite(app.resources['player'].texture);
        player.anchor.set(0.5); /// что считать центром ( 0.5, 0.5)
        player.position.set(app.screen.width / 2, app.screen.height / 2);
        player.width = player.height = playerWidth;
        //player.tint = 0xea985d; //оттенок

        app.stage.addChild(player);
        this.pixi = player;
        this.damaged = 0;

        this.lastMouseButton = 0;
        this.shooting = new Shooting({app, player: this, shootSpeed: 300})

        this.damageUI = ()=>{}
    }

    update() {


        const mouse = this.app.renderer.plugins.C.mouse;

        const cursorPosition = mouse.global;
        let y = cursorPosition.y - this.pixi.position.y,
            x = cursorPosition.x - this.pixi.position.x;
        let angle = Math.atan2(y, x) + Math.PI / 2;
        this.pixi.rotation = angle;

        if (mouse.buttons !== this.lastMouseButton) {
            this.shooting.shoot = mouse.buttons !== 0;
            this.lastMouseButton = mouse.buttons;
        }

        this.shooting.update();
       
    }

    addDamageUI(fx) {
        this.damageUI = fx;
    }

    takeDamage(damage) {
        this.damaged += damage;
        this.damageUI(this.damaged);
    }


}