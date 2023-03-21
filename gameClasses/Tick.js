import Lib from "./Lib.js"

export default class Tick extends Lib {
    constructor({ app }) {
        super({ errName: "Tick" });
        this.app = app;
        this.teams = []
    }


    addTeam({ team, teams }) {
        if (teams !== undefined && Array.isArray(teams)) {
            teams.forEach(e => {
                this.teams.push(e);
            })
        }
        else if (team !== undefined) {
            this.teams.push(team);
        }

    }

    start() {
        this.app.ticker.add((data) => {
            this.oneTick(data)
        })
    }

    oneTick(data) {

        this.forEachUnit((team, member)=>{
            if (!member._isRendered()) {
                //this.printLog("Element " + member.name + " add to renderer")
                this.app.stage.addChild(member._getRenderObj());
                member.prepareScripts({})
            }


            this.inRadius(member)


            member.tick({ cursorPosition: this.app.renderer.plugins.interaction.mouse.global })


            if (member.status.dead) {
                //this.printLog("Element " + member.name + " del from renderer")
                member._stopRender()
                this.app.stage.removeChild(member._getRenderObj());
                team.deleteMember({ member });
            }
        })



    }

    forEachUnit(func) {
        this.teams.forEach(team => {
            team.members.forEach(member => {
                func(team, member)
            })
        })
    }

    inRadius(unit) {
        this.forEachUnit((team, anotherUnit)=>{
            if (unit === anotherUnit) return
            let x1 = Math.abs(unit.position.x - anotherUnit.position.x),
                y1 = Math.abs(unit.position.y - anotherUnit.position.y);

                
            if (Math.sqrt(x1*x1 + y1*y1) < (unit.collisionRadius + anotherUnit.collisionRadius)) {
                
                unit.collisionFx(anotherUnit)
            }
        })
    }
}