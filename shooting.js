import * as PIXI from "pixi.js"
import Victor from "victor";

export default class Shooting {
    constructor({ app, player, shootSpeed }) {
        this.app = app;
        this.player = player;
        this.bulletSpeed = 8;
        this.bullets = [];
        this.bulletsRadius = 8;
        this.maxBullets = 300;
        this.shootSpeed = shootSpeed ? shootSpeed : 100;


        this.shooting = false;
        this.timerIsStarted = false;
    }


    fire() {
        if (this.bullets.length >= this.maxBullets) {
            let b = this.bullets.shift();
            this.app.stage.removeChild(b);
        }

        this.bullets = this.bullets.filter((b) => {
            if (
                b.position.x > this.app.screen.width ||
                b.position.x < 0 ||
                b.position.y > this.app.screen.height ||
                b.position.y < 0
            ) {
                this.app.stage.removeChild(b);
                return false;
            }
            return true; 
        }
            

        );

        const bullet = new PIXI.Sprite(this.app.resources['bullet'].texture);
        bullet.position.set(this.player.pixi.position.x, this.player.pixi.position.y);
        bullet.anchor.set(0.5);
        // bullet.beginFill(0x001100, 1);
        // bullet.drawCircle(0, 0, this.bulletsRadius);
        // bullet.endFill();
        bullet._bulletRadius = this.bulletsRadius;

        let angle = this.player.pixi.rotation - Math.PI / 2;
        bullet.velocity = new Victor(Math.cos(angle), Math.sin(angle)).multiplyScalar(this.bulletSpeed);

        this.bullets.push(bullet);
        this.app.stage.addChild(bullet);
    }

    update() {
        this.bullets.forEach(b => b.position.set(b.position.x + b.velocity.x, b.position.y + b.velocity.y));
    }

    set shoot(userInput) {
        this.shooting = userInput;
        if (userInput && !this.timerIsStarted) {


            this.fire();
            this.interval = setInterval(() => {
                if (!this.shooting) {
                    
                    clearInterval(this.interval);
                    this.timerIsStarted = false;
                    return;
                }
                this.fire()
            }, this.shootSpeed);
            this.timerIsStarted = true;

        }

    }
}