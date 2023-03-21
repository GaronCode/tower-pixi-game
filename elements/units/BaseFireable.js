import Unit from "./BaseUnit";


export default class FireableUnit extends Unit {
    constructor({ unitName, shape, projectileCreateScr }) {
        super({unitName, shape});

        this.projectileCreateScr = projectileCreateScr
    }


    fire() {
        this.team.addMember({
            member: this.projectileCreateScr({mainUnit: this}) 
        })
    }
}