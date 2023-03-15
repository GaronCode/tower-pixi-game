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

        this.teams.forEach(team => {
            team.members.forEach(member => {
                if (!member.shape.isRendered) {
                    //this.printLog("Element " + member.name + " add to renderer")
                    this.app.stage.addChild(member.shape);
                    member.shape.isRendered = true;
                    member.prepareScripts({})
                }
                member.tick({ cursorPosition: this.app.renderer.plugins.interaction.mouse.global })


                if (member.status.dead) {
                    //this.printLog("Element " + member.name + " del from renderer")
                    this.app.stage.removeChild(member.shape);
                    team.deleteMember({ member });
                }
            })
        })



    }
}