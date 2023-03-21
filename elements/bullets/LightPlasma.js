import gBox from "../shapes"
import BaseBullet from "./BaseBullet"


export default class LightPlasma extends BaseBullet {
    constructor({ mainUnit}) {
        super({ 
            unitName: "Light Plasma Bullet", 
            shape: new gBox(20, "bullet01"), 
            speed: 10, 
            damage: 15, 
            mainUnit
        })
        
    }

    
}