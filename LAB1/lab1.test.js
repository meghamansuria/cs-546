// Megha Mansuria
// CS 546 A - Lab 1 Test
// I pledge my honor that I have abided by the Stevens Honor System.

const lab1 = require("./lab1");

// QUESTION 1 TEST CASES

console.log(lab1.questionOne()); 
// returns and outputs: {}
console.log(lab1.questionOne([])); 
// returns and outputs: {}

console.log(lab1.questionOne([0, 2, 9])); 
// should return and output {'0': false, '2': true, '9': false}
console.log(lab1.questionOne([1, 100, 97])); 
// returns and outputs: {'1': false, '97': true, '100': false }
console.log(lab1.questionOne([13, 21, 27, 29, 53])); 
// returns and outputs: {'13': true, '21': false, '27': false, '29': true, '53': true}
console.log(lab1.questionOne([12, 88, 34, 25, 55])); 
// returns and outputs: {'12': false, '25': false, '34': false, '55': false, '88': false}
console.log(lab1.questionOne([6, 17, 997, 1019])); 
// returns and outputs: {'6': false, '17': true, '997': true, '1019': true}


// QUESTION 2 TEST CASES
console.log(lab1.questionTwo()); 
// returns and outputs: 0
console.log(lab1.questionTwo([])); 
// returns and outputs: 0

console.log(lab1.questionTwo([3, 4, 5])); 
// should return and output 17677.67
console.log(lab1.questionTwo([2, 7, 12])); 
// returns and outputs: 544710.27
console.log(lab1.questionTwo([15, 13, 4, 3, 7])); 
// returns and outputs: 4738213.58
console.log(lab1.questionTwo([2, 1])); 
// returns and outputs: 55.9
console.log(lab1.questionTwo([4])); 
// returns and outputs: 1024


// QUESTION 3 TEST CASES

console.log(lab1.questionThree("")); 
// returns and outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

console.log(lab1.questionThree("I'm excited for this class. Are you!??")); 
// should return and output {consonants: 16, vowels: 11, numbers: 0, spaces: 6, punctuation: 5, specialCharacters: 0}
console.log(lab1.questionThree("If you have any questions, text me: 201-216-5105 (that's campus police heh)"));
// returns and outputs: {consonants: 28, vowels: 19, numbers: 10, spaces: 11, punctuation: 7, specialCharacters: 0}
console.log(lab1.questionThree("Smile for the camera!! :D :) Okay, now funny faces!! :P XP"));
// returns and outputs: {consonants: 25, vowels: 13, numbers: 0, spaces: 11, punctuation: 9, specialCharacters: 0}
console.log(lab1.questionThree("That'll be $5.99 + tax. Have a nice day (^.^)" ));
// returns and outputs: {consonants: 14, vowels: 9, numbers: 3, spaces: 9, punctuation: 6, specialCharacters: 4}
console.log(lab1.questionThree("Meet my friend, Prof. Hill: \\(^O^)\/"));
// returns and outputs: {consonants: 14, vowels: 7, numbers: 0, spaces: 5, punctuation: 5, specialCharacters: 4}


// QUESTION 4 TEST CASES

console.log(lab1.questionFour(5000, 3.75, 1)); 
// should return and output: 425.18
console.log(lab1.questionFour(38000, 2.32, 7)); 
// returns and outputs: 490.54
console.log(lab1.questionFour(16588, 4.3, 1)); 
// returns and outputs: 1414.74
console.log(lab1.questionFour(72005, 1.9, 8)); 
// returns and outputs: 809.09
console.log(lab1.questionFour(112000, 6.65, 11)); 
// returns and outputs: 1198.57
