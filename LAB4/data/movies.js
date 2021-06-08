// Megha Mansuria
// I pledge my honor that I have abided by the Stevens Honor System.
// Lab 4 - movies.js

const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb')

function checkString(input) {
    if (typeof input != 'string' || input.trim().length == 0) {
        throw 'input should be a non-empty string'
    }
}

function checkArray(input) {
    if (!Array.isArray(input) || input.length == 0) {
        throw 'input should not be a non-empty array'
    }
    for (i = 0; i < input.length; i++) {
        if (typeof input[i] != 'string' || input[i].trim().length == 0) {
            throw 'array should have non-empty string elements'
        }
    }
}

function checkObject(input) {
    if (typeof input != 'object' && input !== null) {
        throw 'input should be an object';
    }
}

async function create(title, plot, rating, runtime, genre, cast, info) {
    // check all inputs exist
    if (!title || !plot || !rating || !runtime || !genre || !cast || !info) {
        throw 'All fields need to have valid values'
    }
    // check string inputs
    checkString(title);
    checkString(plot);
    checkString(rating);
    checkString(runtime);
    checkString(genre);
    // check array input, cast
    checkArray(cast);
    // check object input, info
    checkObject(info);
    if (!info.director || typeof info.director != 'string' || info.director.trim().length == 0) {
        throw 'info.director must be a valid value'
    }
    if (!info.yearReleased || typeof info.yearReleased != 'number' || info.yearReleased.toString().length != 4) {
        throw 'info.director must be a valid value'
    }
    let year = new Date().getFullYear()
    if (info.yearReleased < 1930 || info.yearReleased > year + 5) {
        throw 'info.yearReleased must be a valid value'
    }
    // create movie
    const moviesCollection = await movies();
    let newMovie = {
        title: title,
        plot: plot,
        rating: rating,
        genre: genre,
        cast: cast,
        info: info
    };

    const insertInfo = await moviesCollection.insertOne(newMovie);
    if (insertInfo.insertedCount === 0) throw 'could not add movie';

    const newId = insertInfo.insertedId;
    const movie = await get(newId.toString());
    movie._id = movie._id.toString();
    return movie;
}

async function get(id) {
    if (!id) throw 'no id given to search for';
    if (typeof id != 'string') throw 'id given is not a string';
    if (!ObjectId.isValid(id)) throw 'id given is not a valid ObjectId';

    const moviesCollection = await movies();
    const movie = await moviesCollection.findOne({ _id: ObjectId(id) });
    if (movie === null) throw 'no movie with that id';
    movie._id = movie._id.toString();
    return movie;
}

async function getAll() {
    const moviesCollection = await movies();

    const movieList = await moviesCollection.find({}).toArray();

    return movieList;
}

async function remove(id) {
    if (!id) throw 'no id given to search for';
    if (typeof id != 'string') throw 'id given is not a string';
    if (!ObjectId.isValid(id)) throw 'id given is not a valid ObjectId';

    const moviesCollection = await movies();
    const movie = await get(id);

    const deletionInfo = await moviesCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
      throw `could not delete movie with id of ${id}`;
    }
    return movie.title + " has been successfully deleted";
}

async function rename(id, newTitle) {
    // error check for id
    if (!id) throw 'no id given to search for';
    if (typeof id != 'string') throw 'id given is not a string';
    if (!ObjectId.isValid(id)) throw 'id given is not a valid ObjectId';

    // error check for newTitle
    if (!newTitle) throw 'no title given to rename movie to';
    if (typeof newTitle != 'string') throw 'title given is not a string';

    const moviesCollection = await movies();
    const updatedMovie = {
      title: newTitle
    };

    const updatedInfo = await moviesCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedMovie }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update movie successfully';
    }
    return await get(id);
}

module.exports = {
    create,
    getAll,
    get,
    remove,
    rename
}