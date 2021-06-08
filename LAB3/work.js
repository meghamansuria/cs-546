// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 3 - work.js
const axios = require('axios');
const people = require('./people');

async function getWork() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    const parsedData = data; // parse the data from JSON into a normal JS Object
    return parsedData; // this will be the array of people objects
}

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    const parsedData = data; // parse the data from JSON into a normal JS Object
    return parsedData; // this will be the array of people objects
}

function checkString(input) {
    if (input == undefined) {
        throw 'input does not exist'
    }
    else if (typeof input !== 'string') {
        throw 'input is not a string'
    }
}

function checkPhone(phoneNumber) {
    // check input is in XXX-XXX-XXXX format
    if (phoneNumber.length != 12) {
        throw 'phone number input is not in valid format ###-###-####';
    }
    if (phoneNumber.charAt(3) != '-' || phoneNumber.charAt(7) != '-') {
        throw 'phone number input is not in valid format ###-###-####';
    }
    for (i = 0; i < phoneNumber.length; i++) {
        // skip for '-'
        if (i == 3 || i == 7) {
            continue;
        }
        if (phoneNumber[i] != '1' && phoneNumber[i] != '2' && phoneNumber[i] != '3' && phoneNumber[i] != '4' && phoneNumber[i] != '5' && 
        phoneNumber[i] != '6' && phoneNumber[i] != '7' && phoneNumber[i] != '8' && phoneNumber[i] != '9' && phoneNumber[i] != '0') {
            throw 'phone number input is not in valid format ###-###-####';
        }
    }
}

function checkSSN(ssn) {
    // check input is in XXX-XXX-XXXX format
    if (ssn.length != 11) {
        throw 'ssn input is not in valid format ###-##-####';
    }
    if (ssn.charAt(3) != '-' || ssn.charAt(6) != '-') {
        throw 'ssn input is not in valid format ###-##-####';
    }
    for (i = 0; i < ssn.length; i++) {
        // skip for '-'
        if (i == 3 || i == 6) {
            continue;
        }
        if (ssn[i] != '1' && ssn[i] != '2' && ssn[i] != '3' && ssn[i] != '4' && ssn[i] != '5' && 
        ssn[i] != '6' && ssn[i] != '7' && ssn[i] != '8' && ssn[i] != '9' && ssn[i] != '0') {
            throw 'ssn input is not in valid format ###-##-####';
        }
    }
}

async function listEmployees() {
    const work = await getWork();
    let list = [];
    
    for (let i = 0; i < work.length; i++) {
        // make object for company_name and later, add employees
        let company = {};
        company['company_name'] = work[i]['company_name'];
        company['employees'] = [];
        let employeesList = work[i]['employees'];
        
        // iterate through work.json employees array and find person's first and last name
        for (let j = 0; j < employeesList.length; j++) {
            let person = await people.getPersonById(employeesList[j]);
            let employee = {};
            employee['first_name'] = person['first_name'];
            employee['last_name'] = person['last_name'];
            company['employees'].push(employee);
        }
        list.push(company);
    }
    return list;
}

async function fourOneOne(phoneNumber) {
    // check input is string and valid phone number
    checkString(phoneNumber);
    checkPhone(phoneNumber);

    const work = await getWork();
    
    // find company phone number in work.js
    let info = {};
    let found = false;
    for (i = 0; i < work.length; i++) {
        if (work[i]['company_phone'] == phoneNumber) {
            found = true;
            info['company_name'] = work[i]['company_name'];
            info['company_address'] = work[i]['company_address'];
        }
    }
    if (!found) {
        throw 'company cannot be found for given phone number'
    }

    return info;
}

async function whereDoTheyWork(ssn) {
    // check input is string and valid ssn
    checkString(ssn);
    checkSSN(ssn);

    const work = await getWork();
    const people = await getPeople();
    
    // find person in people.json based on ssn
    let found = false;
    let id;
    let name;
    for (let i = 0; i < people.length; i++) {
        if (people[i]['ssn'] == ssn) {
            found = true;
            id = people[i]['id'];
            name = people[i]['first_name'] + ' ' + people[i]['last_name'];
        }
    }
    if (!found) {
        throw 'person with given ssn does not exist'
    }
    // find workplace using id
    let workplace;
    for (let j = 0; j < work.length; j++) {
        let employeesList = work[j]['employees'];
        for (let k = 0; k < employeesList.length; k++) {
            if (employeesList[k] == id) {
                workplace = work[j]['company_name'];
            }
        }
    }
    return `${name} works at ${workplace}.`
}

module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
}