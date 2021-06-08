// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 3 - people.js
const axios = require('axios');
function checkNum(input) {
    if (input == undefined) {
        throw 'input does not exist'
    }
    else if (typeof input !== 'number') {
        throw 'input is not a number'
    }
}

function checkString(input) {
    if (input == undefined) {
        throw 'input does not exist'
    }
    else if (typeof input !== 'string') {
        throw 'input is not a string'
    }
}

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    const parsedData = data; // parse the data from JSON into a normal JS Object
    return parsedData; // this will be the array of people objects
}

async function getPersonById(id) {
    // check id is a number
    checkNum(id);
    if (id < 0) {
        throw 'input is not in bounds'
    }
    // get the array of people
    const people = await getPeople();
    // find lowest and highest id for range and throw if id out of bounds
    let low = people[0]["id"];
    let high = people[0]["id"];
    for (i = 0; i < people.length; i++) {
        if (people[i]["id"] < low) {
            low = people[i]["id"];
        }
        if (people[i]["id"] > high) {
            high = people[i]["id"];
        }
    }
    // console.log(low + ' ' + high) see if range was found, it was
    if (id < low || id > high) {
        throw 'input is not in bounds';
    }
    // get person by id
    let personFound = false;
    let personObj = {};
    for (i = 0; i < people.length; i++) {
        if (people[i]["id"] == id) {
            personObj = people[i];
            personFound = true;
        }
    }
    // if within range, but still not found
    if (!personFound) {
        throw 'input is not found in bounds'
    }
    return personObj;
}

async function howManyPerState(stateAbbrv) {
    // check stateAbbrv is a string
    checkString(stateAbbrv);
    stateAbbrv = stateAbbrv.toUpperCase();

    // CHECK IF ARGUMENT IS VALID STATE
    if (stateAbbrv != 'AL' && stateAbbrv != 'AK' && stateAbbrv != 'AZ' && stateAbbrv != 'AR' && stateAbbrv != 'CA' && stateAbbrv != 'CO' && stateAbbrv != 'CT' && stateAbbrv != 'DE' && stateAbbrv != 'FL' && stateAbbrv != 'GA' && 
    stateAbbrv != 'HI' && stateAbbrv != 'ID' && stateAbbrv != 'IL' && stateAbbrv != 'IN' && stateAbbrv != 'IA' && stateAbbrv != 'KS' && stateAbbrv != 'KY' && stateAbbrv != 'LA' && stateAbbrv != 'ME' && stateAbbrv != 'MD' && 
    stateAbbrv != 'MI' && stateAbbrv != 'MA' && stateAbbrv != 'MN' && stateAbbrv != 'MS' && stateAbbrv != 'MO' && stateAbbrv != 'MT' && stateAbbrv != 'NE' && stateAbbrv != 'NV' && stateAbbrv != 'NH' && stateAbbrv != 'NJ' && 
    stateAbbrv != 'NM' && stateAbbrv != 'NY' && stateAbbrv != 'NC' && stateAbbrv != 'ND' && stateAbbrv != 'OH' && stateAbbrv != 'OK' && stateAbbrv != 'OR' && stateAbbrv != 'PA' && stateAbbrv != 'RI' && stateAbbrv != 'SC' && 
    stateAbbrv != 'SD' && stateAbbrv != 'TN' && stateAbbrv != 'TX' && stateAbbrv != 'UT' && stateAbbrv != 'VT' && stateAbbrv != 'VA' && stateAbbrv != 'WA' && stateAbbrv != 'WV' && stateAbbrv != 'WI' && stateAbbrv != 'WY' ) {
        throw 'state abbreviation is not valid'
    }

    // get the array of people
    const people = await getPeople();

    // count people in given state
    let count = 0;
    for (i = 0; i < people.length; i++) {
        if (people[i]["address"]["state"] == stateAbbrv) {
            count++;
        }
    }
    if (count == 0) {
        throw 'no people live in that state :('
    }
    return count;
}

async function personByAge(index) {
    // check index is a number
    checkNum(index);
    // get the array of people
    const people = await getPeople();
    // if index out of bounds
    if (index < 0 || index > people.length - 1) {
        throw 'input is not in bounds'
    }
    // sort people by birthday, oldest to youngest
    people.sort(function age(person1, person2) {
        return new Date(person1.date_of_birth).getTime() - new Date(person2.date_of_birth).getTime();
    })
    // make new object of found person
    personByAgeObj = {}
    personByAgeObj['first_name'] = people[index]['first_name'];
    personByAgeObj['last_name'] = people[index]['last_name'];
    personByAgeObj['date_of_birth'] = people[index]['date_of_birth'];
    // calculate age and add it to object
    let today = new Date();
    let bday = new Date(personByAgeObj['date_of_birth']);
    let age = today.getFullYear() - bday.getFullYear(); // compare today's year to bday's year
    let month = today.getMonth() - bday.getMonth(); // compare today's month to bday's month
    if (month < 0 || (month == 0 && (today.getDate() - bday.getDate() < 0))) {
        age--;
    }
    personByAgeObj['age'] = age;

    return personByAgeObj;
}

async function peopleMetrics() {
    // check that parameter IS empty???

    // get the array of people
    const people = await getPeople();
    // go through each object and find relevant metrics
    let total = 0;
    let vowels = 0;
    let consonants = 0;
    let longestName = (people[0]['first_name'] + people[0]['last_name']).replace(/\s/g,''); // remove spaces for comparison
    let shortestName = (people[0]['first_name'] + people[0]['last_name']).replace(/\s/g,''); // remove spaces for comparison
    let cities = {};
    let totalAge = 0;

    for (i = 0; i < people.length; i++) {
        let name = people[i]['first_name'] + ' ' + people[i]['last_name']; // add space for final return
        let fullname = (people[i]['first_name'] + people[i]['last_name']).replace(/\s/g,''); // remove spaces for comparison
        // increment vowels, consonants, total. skip spaces in name
        for (j = 0; j < name.length; j++) {
            if (name[j] == ' ') {
                continue;
            }
            else if (name[j] == 'a' || name[j] == 'e' || name[j] == 'i' || name[j] == 'o' || name[j] == 'u') {
                vowels++;
                total++;
            }
            else {
                consonants++;
                total++;
            }
        }
        // check if it's the longest/shortest name, used fullname and longest/shortest with whitespaces trimmed
        if (fullname.length > longestName.length) {
            longestName = name;
        }
        if (fullname.length < shortestName.length) {
            shortestName = name;
        }
        // start count of cities seen
        if (!(people[i]['address']['city'] in cities)) {
            cities[people[i]['address']['city']] = 0;
        }
        cities[people[i]['address']['city']] += 1;
        // calculate and add age
        // person = await personByAge(i); this took way too long, easier to copy code from previous function
        let today = new Date();
        let bday = new Date(people[i]['date_of_birth']);
        let age = today.getFullYear() - bday.getFullYear(); // compare today's year to bday's year
        let month = today.getMonth() - bday.getMonth(); // compare today's month to bday's month
        if (month < 0 || (month == 0 && (today.getDate() - bday.getDate() < 0))) {
            age--;
        }
        totalAge += age;
    }

    // find largest count of cities
    let cityentries = Object.entries(cities);
    let citycount = cityentries[0][1];
    let city = cityentries[0][0];
    for (k = 0; k < cityentries.length; k++) {
        if (cityentries[k][1] > citycount) {
            citycount = cityentries[k][1];
            city = cityentries[k][0];
        }
    }
    // find average age
    let averageAge = totalAge / people.length;
    // make object of metrics
    let metrics = {};
    metrics['totalLetters'] = total;
    metrics['totalVowels'] = vowels;
    metrics['totalConsonants'] = consonants;
    metrics['longestName'] = longestName;
    metrics['shortestName'] = shortestName;
    metrics['mostRepeatingCity'] = city;
    metrics['averageAge'] = Number(averageAge.toFixed(2));
    return metrics;
}

module.exports = {
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
}