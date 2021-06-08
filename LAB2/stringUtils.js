// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 2 - stringUtils.js 

function checkInputExists(input) { // check parameter exists
    if (input == undefined) {
        throw 'input does not exist'
    }
}

function checkString(input) { // check parameter is string
    if (typeof input != 'string') {
        throw 'provided input is not a string';
    }
}

function checkStringEmpty(input) { // check parameter is empty string (length == 0)
    if (input.length == 0) {
        throw 'provided input is empty string';
    }
}

function checkStringBlank(input) { // check parameter is string of spaces
    if (input.trim().length == 0) {
        throw 'provided input is string of empty spaces';
    }
}

module.exports = {
    camelCase: (str) => {
        checkInputExists(str);
        checkString(str);
        checkStringEmpty(str);
        checkStringBlank(str);

        // trim spaces before and after first and last words
        let string = str.trim();
        
        // camel case words following spaces
        let camelword = '';

        // split words by spaces and put into array
        let splitwords = string.split(/\s+/); // used regex - i hope this is okay?? lol
        
        camelword += splitwords[0].toLowerCase(); // first word should be lowercase
        // rest of the words formatted to camelCase
        for (i = 1; i < splitwords.length; i++) {
            camelword += splitwords[i][0].toUpperCase() + splitwords[i].slice(1).toLowerCase();
        }
        return camelword;
    },
    replaceChar: (str) => {
        checkInputExists(str);
        checkString(str);
        checkStringEmpty(str);
        checkStringBlank(str);

        // establish char to look to for (the STARTING CHARACTER)
        str = str.trim(); // remove leading and trailing white space
        let char = str.charAt(0).toLowerCase();
        let result = str.charAt(0);
        let count = 0; // keep count of how many repeats
        for (i = 1; i < str.length; i++) {
            if (str[i].toLowerCase() == char) {
                count++;
                if (count % 2 == 0) {
                    result += '$';
                }
                else {
                    result += '*';
                }
            }
            else {
                result += str[i];
            }
        }
        return result;
    },
    mashUp: (str1, str2) => {
        checkInputExists(str1);
        checkInputExists(str2);
        checkString(str1);
        checkString(str2);
        checkStringBlank(str1);
        checkStringBlank(str2);
        // check strings have at least 2 characters each
        if (str1.trim().length < 2 || str2.trim().length < 2) {
            throw 'provided input has less than 2 characters';
        }

        // get first 2 characters of both strings
        let ch1 = str1.slice(0,2);
        let ch2 = str2.slice(0,2);
        
        // get rest of the characters of both strings
        let rest1 = str1.slice(2);
        let rest2 = str2.slice(2);

        // concatenate strings and swap first two characters
        let concatted = `${ch2}${rest1} ${ch1}${rest2}`;

        return concatted;
    }
};