// Megha Mansuria
// CS 546 A - Lab 1
// I pledge my honor that I have abided by the Stevens Honor System.

const questionOne = function questionOne(arr) {
    // Implement question 1 here
    // returns an object of keys (numbers in array) and values (true/false whether prime or not)
    let primesObj = {};

    // check if array is empty or parameter is not given
    if (arr == undefined || arr.length == 0) {
        return primesObj;
    }
    // loop through array determining primes and add to object 
    for (i = 0; i < arr.length; i++) {
        // negatives, 0 and 1 are not prime
        if (arr[i] < 2) {
            primesObj[arr[i]] = false;
        }
        // 2 is prime
        if (arr[i] == 2) {
            primesObj[arr[i]] = true;
        }
        // numbers greater than 2
        if (arr[i] > 2) {
            for (j = 2; j < arr[i]; j++) {
                if (arr[i] % j == 0) {
                    primesObj[arr[i]] = false;
                    break;
                }
                else {
                    primesObj[arr[i]] = true;
                }
            }
        }
    }
    return primesObj;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    // calculate sum of squares, raise to 5th power, and then, return the squareroot
    let result = 0;
    if (arr == undefined || arr.length == 0) {
        return result;
    }
    // loop through array to get sum of squares
    for (i = 0; i < arr.length; i++) {
        result += Math.pow(arr[i], 2);
    }
    // raise to 5th power & squareroot result
    result = Number(Math.sqrt(Math.pow(result, 5)).toFixed(2));
    return result;
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    // returns an object of consonants, vowels, numbers, spaces, punctuation, special characters, etc
    let strObj = {consonants: 0, vowels: 0, numbers: 0, spaces: 0, punctuation: 0, specialCharacters: 0}
    // undefined parameter and empty string case
    if (text == undefined || text == "") {
        return strObj;
    }
    // iterate through str and increment counts accordingly
    // capitalize whole string to make it easier to find consonants/vowels
    upper = text.toUpperCase();
    for (i = 0; i < text.length; i++) {
        character = upper.charAt(i);
        // increment vowels
        if (character == 'A' || character == 'E' || character == 'I' || character == 'O' || character == 'U') {
            strObj.vowels++;
        }
        // increment consonants
        else if (character > 'A' && character <= 'Z') {
            strObj.consonants++;
        }
        // increment numbers
        else if (character == '0' || character == '1' || character == '2' || character == '3' || character == '4' || character == '5' || character == '6' || character == '7' || character == '8' || character == '9') {
            strObj.numbers++;
        }
        // increment spaces
        else if (character == ' ') {
            strObj.spaces++;
        }
        // increment punctuation
        else if (character == '.' || character == ',' || character == '?' || character == '!' || character == '\'' || character == '\"' || character == ':' || character == ';' || character == '-' || character == '(' || character == ')' || character == '[' || character == ']' || character == '{' || character == '}') {
            strObj.punctuation++;
        }
        // increment special characters - any other characters will be counted
        else {
            strObj.specialCharacters++;
        }
    }
    return strObj;
}

const questionFour = function questionFour(num1, num2,num3) {
    // Implement question 4 here
    // return the monthly payment of a loan - num1 is loan amt, num2 is interest rate, num3 is # of years
    // M = (iP/N) / (1 - (i/N + 1)^(-NY)) i = interest, P = principal, N = # of payments per year, Y = # of years, M = monthly payments
    let numer = num1 * num2/100 / 12;
    let denom = 1 - Math.pow((num2/100 / 12 + 1), -12*num3);
    let result = numer / denom;

    return Number(result.toFixed(2));
}

module.exports = {
    firstName: "Megha", 
    lastName: "Mansuria", 
    studentId: "10440306",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};