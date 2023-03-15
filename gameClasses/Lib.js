export default class Lib {
    /**
     * 
     * @param {Object} obj 
     * @param {String} [obj.errName] - name of class for log mess
     */
    constructor({ errName }) {
        this.errName = errName ? errName : "Lib";
    }

    static intRange(fromInclude, toInclude) {
        return this.intLen(fromInclude, toInclude - fromInclude);
    }

    static intLen(fromInclude, length) { //  fromInclude=5, length = 3 -> 5, 6, 7
        if (length === undefined) {
            length = fromInclude;
            fromInclude = 0;
        }
        return fromInclude + this.int(length);
    }

    static int(toNoInc = 1) {  //  toNoInc=4 -> 0, 1, 2, 3
        return Math.floor(Math.random() * toNoInc);
    }




    /**
     * Returns true, if data is undefined and deal log messange
     * @param {*} data - data to be checked
     * @param {string} [fxName] - launched function name for log
     * @param {string} [dataName] - data name for log
     * @returns {boolean}
     */
    checkUndefined(data, fxName = "checkUndefined", dataName = "data") {
        if (data === undefined) {
            this.printErr(fxName + ": " + dataName + " is undefined");
            return true;
        }
        return false;
    }
    /**
     * return true if object is checkClass 
     * @param {Object} object - object what need to be checked
     * @param {Class} checkClass - class for checking
     * @param {string} [fxName] - launched function name for log
     */
    checkClass(object, checkClass, fxName = "checkKey") {
        if (object instanceof checkClass) return true;
        if (this.checkUndefined(object, fxName, "object")) return false;
        if (this.checkUndefined(object, fxName, "checked Class")) return false;
        this.printErr(fxName + ": object isn't \"" + checkClass.name + "\", is \"" + object.constructor.name + "\"");
    }

    /**
     * Check is the data an array and create log mess. True - if data is array
     * @param {*} data - data to be checked
     * @param {string} [fxName] - launched function name for log
     * @param {string} [arrName] - data name for log
     * @returns {boolean}
     */
    checkArray(data, fxName = "checkArray", arrName = "data") {
        if (Array.isArray(data)) return true;

        this.printErr(fxName + ": " + arrName + " is not an array");
        this.checkUndefined(data, fxName, arrName);
        return false;
    }

    /**
     * Print method for logs
     * @param {string} text 
     */
    printErr(text) {
        this.print(text, "ERR");
    }

    printLog(text) {
        this.print(text, "LOG");
    }

    print(text, mod = "INF") {
        console.log(mod + " | " + this.errName + " -> " + text);
    }

    /**
     * fx for add element to any array
     * can check elem for a key in there
     * return true if done
     * @param {Array} arr - source array 
     * @param {*} elem - element need to add
     * @param {string} [fxName] - for log information, which fx name is trigger an error
     * @param {Object} [isObj] - type of data, that need to be added
     * @param {Function} [fxExec] - fx for trigger then adding is complete
     * @returns {Boolean}
     */
    addToArr(arr, elem, fxName = "addToArr", isObj = null, fxExec = () => { }) {

        if (!this.checkArray(arr, fxName, "array")) return false;
        if (this.checkUndefined(elem, fxName)) return false;


        if (isObj !== null && !this.checkClass(elem, isObj, fxName)) return false;
        arr.push(elem);
        fxExec();
        return true;
    }
    /**
     * Delete element from array. Return True if done
     * @param {Array} arr 
     * @param {Object} elem 
     * @param {String} [fxName] - for log information, which fx name is trigger an error
     * @param {string} [arrName] - array name for log
     * @param {string} [elemName] - element name for log
     * @returns {Boolean}
     */
    delFromArr(arr, elem, fxName = "addToArr", arrName = "array", elemName = "element") {
        if (!this.checkArray(arr, fxName)) return false;
        if (this.checkUndefined(elem, fxName)) return false;


        const findedIndex = arr.indexOf(elem);
        if (findedIndex === -1) { this.printErr(fxName + ": " + arrName + " dosen't contains an " + elemName); return false; }


        arr.splice(findedIndex, 1);
        return true;
    }



}

