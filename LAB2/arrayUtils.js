// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 2 - arrayUtils.js 

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

function checkArrayEmpty(input) { // check array is not empty
    if (input == undefined || input.length == 0) {
        throw 'provided array is empty'
    }
}

function checkArrayNumbers(input) {
    for (i = 0; i < input.length; i++) {
        if (typeof input[i] !== 'number') {
            throw 'array elements are not all numbers'
        }
    }
}

module.exports = {
    mean: (arr) => {
        checkInputExists(arr);
        checkArray(arr);
        checkArrayEmpty(arr);
        checkArrayNumbers(arr);

        let sum = 0;
        for (i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return Number((sum / arr.length).toFixed(2)); // do i need to round decimals?
    },
    medianSquared: (arr) => {
        checkInputExists(arr);
        checkArray(arr);
        checkArrayEmpty(arr);
        checkArrayNumbers(arr);

        let sorted = arr.sort((a,b)=> a-b);
        let result = 0;
        // find median squared in odd number of elements array 
        if (sorted.length % 2 !== 0) {
            let median = sorted[Math.floor(sorted.length/2)];
            result = Math.pow(median, 2);
        }
        // find median squared in even number of elements array 
        else { 
            let median = (sorted[Math.floor((sorted.length - 1)/2)] + sorted[(sorted.length)/2]) / 2;
            result = Math.pow(median, 2);
        }
        return Number(result.toFixed(2)); // round to 2 decimals
    },
    maxElement: (arr) => {
        checkInputExists(arr);
        checkArray(arr);
        checkArrayEmpty(arr);
        checkArrayNumbers(arr);

        // scan array to find largest element and its index
        let maxObj = {};
        let max = arr[0];
        let index = 0;
        for (i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
                index = i;
            }
        }
        maxObj[max] = index; // does this print object of the key = variable max and value = index 
        return maxObj;
    },
    fill: (end, value) => {
        checkInputExists(end);
        // check type of end
        if (typeof end !== 'number') {
            throw 'provided end value is not a number'
        }
        // check end value > 0
        if (end <= 0) {
            throw 'provided end value is not greater than 0'
        }
        // if only end input is supplied
        let filledArr = [];
        if (value === undefined){
            for (i = 0; i < end; i++) {
                filledArr[i] = i;
            }
        }
        // end and value input is supplied
        else {
            for (i = 0; i < end; i++) {
                filledArr[i] = value;
            }
        }
        return filledArr;  
    },
    countRepeating: (arr) => {
        checkInputExists(arr);
        checkArray(arr);
        
        let repeatsObj = {};
        // check is empty array
        if (arr.length == 0) {
            return repeatsObj;
        }
        // check if any element in array is not number or string type
        // checkArrayNumStr(arr);
        for (i = 0; i < arr.length; i++) {
            if (typeof arr[i] !== 'number' && typeof arr[i] !== 'string') {
                throw 'array elements are not all numbers or string'
            }
        }

        // count all elements and add respectively to object key
        arr.forEach(element => {
            element = element.toString();
            if (element in repeatsObj) {
                repeatsObj[element] += 1;
            }
            else {
                repeatsObj[element] = 1; // not a repeat, remove later
            }
        });
        // remove all the elements that are count of 1 (not repeat)
        for (i = 0; i < arr.length; i++) {
            if (repeatsObj[arr[i]] == 1) {
                delete repeatsObj[arr[i]];
            }
        }
        return repeatsObj;
    },
    isEqual: (arr1, arr2) => {
        checkInputExists(arr1);
        checkInputExists(arr2);
        checkArray(arr1);
        checkArray(arr2);

        // check the lengths of both arrays
        if (arr1.length != arr2.length) {
            return false;
        }

        // sort arrays
        // sort array of arrays in arr1 if there
        for (i = 0; i < arr1.length; i++) {
            if (Array.isArray(arr1[i])) {
                arr1[i].sort();
            }
        }
        arr1.sort();
        // sort array of arrays in arr2 if there
        for (i = 0; i < arr2.length; i++) {
            if (Array.isArray(arr2[i])) {
                arr2[i].sort();
            }
        }
        arr2 = arr2.sort();
        
        // check if the arrays are equal
        for (i = 0; i < arr1.length; i++) {
            if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
                for (j = 0; j < arr1[i].length; j++) {
                    if (arr1[i][j] !== arr2[i][j]) {
                        return false;
                    }
                }
            }
            else {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            } 
        }

        return true;
    }
};