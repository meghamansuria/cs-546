// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 4 - index.js

const movies = require("./data/movies");
const connection = require('./config/mongoConnection');

async function main() {
    // 1+2. add first movie and log
    const billAndTed = await movies.create("Bill and Ted Face the Music","Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.","PG-13", "1hr 31min","Comedy",["Keanu Reeves","Alex Winter"],{director: "Dean Parisot", yearReleased: 2020});
    console.log(billAndTed);
    
    // 3. add second movie
    const up = await movies.create("Up", "Carl Fredricksen, a 78-year-old balloon salesman, is about to fulfill a lifelong dream.", "PG","1hr 36min","Family/Adventure",["Ed Asner","Jordan Nagai"],{director: "Pete Docter", yearReleased: 2009});
    
    // 4. query and log all movies
    const allMovies = await movies.getAll();
    console.log(allMovies);
    
    // 5+6. add third movie and log
    const insideOut = await movies.create("Inside Out", "Riley (Kaitlyn Dias) is a happy, hockey-loving 11-year-old Midwestern girl, but her world turns upside-down when she and her parents move to San Francisco.", "PG","1hr 42min","Family/Comedy",["Kaitlyn Dias","Amy Poehler"],{director: "Pete Docter", yearReleased: 2015});
    console.log(insideOut);
    
    // 7+8. rename first movie and log
    const rename1 = await movies.rename(billAndTed._id.toString(), "Ted and Bill Reversed");
    console.log(rename1);
    
    // 9. remove second movie
    const remove2 = await movies.remove(up._id.toString());

    // 10. query and log all movies
    const allMovies2 = await movies.getAll();
    console.log(allMovies2);

    // 11. try to create a movie with bad input parameters, throws errors
    try {
       await movies.create("soul", "Joe is a middle-school band teacher whose life hasn't quite gone the way he expected.", "PG", 1.5, "Family/Comedy", ["actor 1", "actor 2"], {director: "director", yearReleased: 2020});
    }catch (e) {
        console.log(e);
    }
    // 12. try to remove a movie that does not exist, throws errors
    try {
        await movies.remove('6046b7abf116ee30cd3b01b1');
    }catch (e) {
        console.log(e);
    }
    // 13. try to rename a movie that does not exist, throws errors
    try {
       await movies.rename('6046cb08069c7432601330b1', 'boo');
    }catch (e) {
        console.log(e);
    }
    // 14. try to rename a movie passing in invalid data for the parameter, throws errors
    try {
       await movies.rename('6046b7abf116ee30cd3b01b1', 111);
    }catch (e) {
        console.log(e);
    }
    // 15. try getting a movie by ID that does not exist, throws errors
    try {
        await movies.get('6046b7abf116ee30cd3b01b1');
    }catch (e) {
        console.log(e);
    }

    // close collection
    const db = await connection();
    await db.serverConfig.close();

    console.log('Done!');
}

main().catch((e) => {
    console.log(e);
});