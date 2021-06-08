// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 2 - index.js 

const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

// MEAN
try {
    // Should Pass
    const meanOne = arrayUtils.mean([1, 2, 3, 4, 5]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    // Should Fail
    const meanTwo = arrayUtils.mean(1234);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

// MEDIAN SQUARED
try {
    // Should Pass
    const medianSquaredOne = arrayUtils.medianSquared([1, 2, 34, 66, 18, 4, 5]);
    console.log('medianSquared passed successfully');
} catch (e) {
    console.error('medianSquared failed test case');
}
try {
    // Should Fail
    const medianSquaredTwo = arrayUtils.medianSquared("silly rabbit");
    console.error('medianSquared did not error');
} catch (e) {
    console.log('medianSquared failed successfully');
}

// MAX ELEMENT
try {
    // Should Pass
    const maxElementOne = arrayUtils.maxElement([5, 4, 0, 62, 7, 39, -3]);
    console.log('maxElement passed successfully');
} catch (e) {
    console.error('maxElement failed test case');
}
try {
    // Should Fail
    const maxElementTwo = arrayUtils.maxElement([2, "silly rabbit"]);
    console.error('maxElement did not error');
} catch (e) {
    console.log('maxElement failed successfully');
}

// FILL
try {
    // Should Pass
    const fillOne = arrayUtils.fill(7, "silly rabbit");
    console.log('fill passed successfully');
} catch (e) {
    console.error('fill failed test case');
}
try {
    // Should Fail
    const fillTwo = arrayUtils.fill([2, "silly rabbit"]);
    console.error('fill did not error');
} catch (e) {
    console.log('fill failed successfully');
}

// COUNT REPEATING
try {
    // Should Pass
    const countRepeatingOne = arrayUtils.countRepeating([7, '7', '7', 13, 'hello', 7, 13, "Hello","Hello", "hello"]);
    console.log('countRepeating passed successfully');
} catch (e) {
    console.error('countRepeating failed test case');
}
try {
    // Should Fail
    const countRepeatingTwo = arrayUtils.countRepeating([(message)=>message, true, undefined, null]);
    console.error('countRepeating did not error');
} catch (e) {
    console.log('countRepeating failed successfully');
}

// IS EQUAL
try {
    // Should Pass
    const isEqualOne = arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]);
    console.log('isEqual passed successfully');
} catch (e) {
    console.error('isEqual failed test case');
}
try {
    // Should Fail
    const isEqualTwo = arrayUtils.isEqual([1,2]);
    console.error('isEqual did not error');
} catch (e) {
    console.log('isEqual failed successfully');
}

// CAMEL CASE
try {
    // Should Pass
    const camelCaseOne = stringUtils.camelCase("   HOw     now brown   cow  Moooo ");
    console.log('camelCase passed successfully');
} catch (e) {
    console.error('camelCase failed test case');
}
try {
    // Should Fail
    const camelCaseTwo = stringUtils.camelCase(1234);
    console.error('camelCase did not error');
} catch (e) {
    console.log('camelCase failed successfully');
}

// REPLACE CHAR
try {
    // Should Pass
    const replaceCharOne = stringUtils.replaceChar("babbbbble");
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error('replaceChar failed test case');
}
try {
    // Should Fail
    const replaceCharTwo = stringUtils.replaceChar("");
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully');
}

// MASH UP
try {
    // Should Pass
    const mashUpOne = stringUtils.mashUp("Hello", "World");
    console.log('mashUp passed successfully');
} catch (e) {
    console.error('mashUp failed test case');
}
try {
    // Should Fail
    const mashUpTwo = stringUtils.mashUp("Megha");
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully');
}

// MAKE ARRAYS
try {
    // Should Pass
    const makeArraysOne = objUtils.makeArrays([{ x: 0, y: 9, q: 10 }, { x: 2, y: 3 }, { a: 70, x: 4, z: 5 }]);
    console.log('makeArrays passed successfully');
} catch (e) {
    console.error('makeArrays failed test case');
}
try {
    // Should Fail
    const makeArraysTwo = objUtils.makeArrays([{1:2}]);
    console.error('makeArrays did not error');
} catch (e) {
    console.log('makeArrays failed successfully');
}

// IS DEEP EQUAL
try {
    // Should Pass
    const forth = {a: {sA: "Hello", sB: "There", sC: "Megha", sD: "steven"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sD: "steven", sB: "There", sC: "Megha", sA: "Hello"}}
    const isDeepEqualOne = objUtils.isDeepEqual(forth, fifth);
    console.log('isDeepEqual passed successfully');
} catch (e) {
    console.error('isDeepEqual failed test case');
}
try {
    // Should Fail
    const isDeepEqualTwo = objUtils.isDeepEqual(1,2);
    console.error('isDeepEqual did not error');
} catch (e) {
    console.log('isDeepEqual failed successfully');
}

// COMPUTE OBJECT
try {
    // Should Pass
    const computeObjectOne = objUtils.computeObject({a: 16, b: 23, c: 98 }, n => n / -7);
    console.log('computeObject passed successfully');
} catch (e) {
    console.error('computeObject failed test case');
}
try {
    // Should Fail
    const computeObjectTwo = objUtils.computeObject({1:"string"}, []);
    console.error('computeObject did not error');
} catch (e) {
    console.log('computeObject failed successfully');
}