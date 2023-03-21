import Lib from "./Lib.js";
import BaseUnit from '../elements/units/BaseUnit.js'


export default class Spawner extends Lib {
    constructor() {
        super("Spawner")
        this.interval = 500;
        this.areas = [
            
        ]

        this.spawnType = "all";
        this.spawnCount = 10;

        this.team;
        this.unitsForSpawn = []
        this.intervalId;

    }

    setSpawnInterval(interval) {
        this.interval = interval
    }

    startSpawning() {
        this.spanwnsLeft = this.spawnCount;
        this.intervalId = setInterval(() => {
            if (this.spanwnsLeft <= 0) {
                clearInterval(this.intervalId);
                return;
            }
            this.spawnOnce();
            this.spanwnsLeft--;
        }, this.interval);
    }

    setArea({ x, y }) {
        this.areas.push({
            x: { 
                min: x.min ? x.min : 0, 
                max: x.max ? x.max : 0 
            },
            y: { 
                min: y.min ? y.min : 0, 
                max: y.max ? y.max : 0
            }
        })
        return this
    }

    setCount(i) {
        this.spawnCount = i;
    }

    addTeam(team) {
        this.team = team;
    }

    addUnitFx(unitFx) {
        if (!this.checkClass(unitFx, Function, 'addUnit')) return false;
        this.unitsForSpawn.push(unitFx)

    }

    spawnOnce() {
        if (this.unitsForSpawn.length < 1) {
            this.printErr("spawnOnce: not enough units for spawn");
            return false;
        }

        switch (this.spawnType) {
            case "all":
                this.unitsForSpawn.forEach(unitFx => {
                    const member = unitFx();
                    if (!this.checkClass(member, BaseUnit, "spawnOnce All")) return;

                    const areaId = Lib.int(this.areas.length);
                    member.position.x = Lib.intRange(this.areas[areaId].x.min, this.areas[areaId].x.max);
                    member.position.y = Lib.intRange(this.areas[areaId].y.min, this.areas[areaId].y.max);

                    this.team.addMember({ member })
                    
                });
                break;

            default:
                break;
        }



    }



}