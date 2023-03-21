import Lib from "../gameClasses/Lib.js"
import BaseUnit from '../elements/units/BaseUnit.js'
import Spawner from "./Spawner.js";


export default class Team extends Lib {
    constructor({ name }) {
        super({ errName: "Team " + name });
        this.color;
        this.name = name;
        this.spawners = []
        this.members = []
        this.friendTeams = []
    }

    addMember({ member }) {
        this.addToArr(
            this.members,
            member,
            "addMember",
            BaseUnit,
            () => member.addTeam(this)
        );
    }

    deleteMember({ member }) {

        this.delFromArr(
            this.members,
            member,
            "deleteMember",
            "Members",
            "Member"
        );


    }
    setColor({color}) {
        this.color = color;
    }

    addSpawner({ spawner }) {

        this.addToArr(
            this.spawners,
            spawner,
            "addSpawner",
            Spawner,
            () => spawner.addTeam(this)
        );

    }

    deleteSpawner({ spawner }) {
        this.delFromArr(
            this.spawners,
            spawner,
            "deleteSpawner",
            "spawners",
            "spawner"
        );
    }

    addFriendTeam({ team }) {

        this.addToArr(
            this.friendTeams,
            team,
            "addFriendTeam",
            Team
        );

    }

    deleteFriendTeam({ team }) {
        this.delFromArr(
            this.friendTeams,
            team,
            "deleteFriendTeam",
            "Friend teams",
            "Friend team"
        );
    }
}