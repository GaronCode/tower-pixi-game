export default class Rnd {

    static intLen(fromInclude, length) { //  fromInclude=5, length = 3 -> 5, 6, 7
        return fromInclude + this.int(length);
    }
    static int(toNoInc = 1) {  //  toNoInc=4 -> 0, 1, 2, 3
        return Math.floor(Math.random() * toNoInc);
    }
}