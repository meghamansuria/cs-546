// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 2 - objUtils.js 

function checkInputExists(input) { // check parameter exists
    if (input == undefined) {
        throw 'input does not exist'
    }
}

function checkArray(input) { // check parameter is array
    if (!Array.isArray(input)) {
        throw 'provided input is not an array';
    }
}

function checkEmptyObjects(input) { // check each object is not empty
    for (i = 0; i < input.length; i++) {
        if (input[i] == {}) {
            throw 'array has empty object'
        }
    }
}

function checkArrayObjects(input) {
    for (i = 0; i < input.length; i++) {
        if (input[i] === null || input[i] === undefined) {
            throw 'array elements are not all objects'
        }
        if (typeof input[i] !== 'object') {
            throw 'array elements are not all objects'
        }
    }
}

function isDeepEqual(obj1, obj2) {
    checkInputExists(obj1);
    checkInputExists(obj2);

    // check if both objects are object types
    if (typeof obj1 !== 'object') {
        throw 'provided input is not an object'
    }
    if (typeof obj2 !== 'object') {
        throw 'provided input is not an object'
    }

    // check if both objects are empty
    if (obj1.length == 0 && obj2.length == 0) {
        return true;
    }

    // make arrays of keys of both objects
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    // keys are not same length, so objects cannot be equal
    if (keys1.length !== keys2.length) {
        return false;
    }
    // start checking the objects for equality
    for (let key of keys1) {
        // get values of the key
        let value1 = obj1[key];
        let value2 = obj2[key];
        // check if the current key's value is another object (object of objects)
        let bothObjects = false;
        if (typeof value1 == 'object' && typeof value2 == 'object') {
            bothObjects = true;
        }
        // if both values are not objects and they do not equal
        if (!bothObjects && value1 !== value2) {
            return false;
        }
        // if both values are objects, but the recursive call returns false (because no key/value matches found AKA objs are not equal)
        if ((bothObjects && !isDeepEqual(value1, value2))) {
            return false;
        }
    }
    // otherwise, every key/value was found AKA objs are deep equal
    return true;
}

module.exports = {
    makeArrays: (objArr) => {
        checkInputExists(objArr);
        checkArray(objArr);
        checkArrayObjects(objArr);
        checkEmptyObjects(objArr);
        // check  array has at least 2 elements (objects)
        if (objArr.length < 2) {
            throw 'object needs at least 2 elements in the array'
        }

        let resultArr = [];
        // make the array of arrays
        for (i = 0; i < objArr.length; i++) {
            // make 2 separate arrays for keys and values
            keys = Object.keys(objArr[i]);
            values = Object.values(objArr[i]);
            // iterate through keys/values making a pair array
            for (j = 0; j < keys.length; j++) {
                let pair = new Array(2);
                pair[0] = (keys[j]);
                pair[1] = (values[j]);
                resultArr.push(pair); // push pair array onto resultArr
            }
        }
        return resultArr;
    },
    isDeepEqual,
    computeObject: (obj, fun) => {
        checkInputExists(obj);
        checkInputExists(fun);
        // check obj input is actually an object
        if (typeof obj !== 'object') {
            throw 'provided input is not an object'
        }
        // check input is object and has at least one key/value
        keys = Object.keys(obj);
        if (keys.length < 1) {
            throw 'object needs at least one key/value'
        }
        // check object's values are typeof numbers
        values = Object.values(obj);
        for (i = 0; i < values.length; i++) {
            if (typeof values[i] !== 'number') {
                throw 'object keys must be number values'
            }
        }
        // check input fun is of function type
        if (typeof fun !== 'function') {
            throw 'provided input is not a function'
        }

        // compute function and return new object
        keys.forEach(function (key) {
            obj[key] = Number(fun(obj[key]).toFixed(2));
        });
        return obj;
    }
};