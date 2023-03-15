export default class BaseWeapon {

    constructor({unit}) {
        this.team;
        this.lib = new Lib("Weapon");
    }


    addTeam(team) {
        if (team === undefined) {console.log("addTeam: team undefined"); return;}
        this.team = team;
    }

    
}