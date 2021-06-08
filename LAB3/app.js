// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 3 - app.js
const people = require("./people");
const work = require("./work");

async function main(){
    // GET PERSON BY ID
    try{
        const peopledata = await people.getPersonById('52');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById(1001);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById(52);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    // HOW MANYPER STATE
    try{
        const peopledata = await people.howManyPerState('NY');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.howManyPerState('HE');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.howManyPerState(22);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.howManyPerState('RI');
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.howManyPerState();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    // PERSON BY AGE
    try{
        const peopledata = await people.personByAge(-3);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.personByAge(1000);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.personByAge();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.personByAge(500);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    // PEOPLE METRICS
    try{
        const peopledata = await people.peopleMetrics();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    // LIST EMPLOYEES
    try{
        const workdata = await work.listEmployees();
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
    // FOUR ONE ONE
    try{
        const workdata = await work.fourOneOne(56);
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
    try{
        const workdata = await work.fourOneOne('564-212-2222');
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
    try{
        const workdata = await work.fourOneOne('4567890000');
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
    try{
        const workdata = await work.fourOneOne('615-254-0630');
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
    // WHERE DO THEY WORK
    try{
        const workdata = await work.whereDoTheyWork();
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
    try{
        const workdata = await work.whereDoTheyWork('1234567890');
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
    try{
        const workdata = await work.whereDoTheyWork('264-67-0084');
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
    try{
        const workdata = await work.whereDoTheyWork("299-63-8866");
        console.log (workdata);
    }catch(e){
        console.log (e);
    }
}

//call main
main();