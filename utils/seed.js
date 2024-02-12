const { User, Thought, Reaction } = require("../models");
const mongoose = require("mongoose");
const connection = require("../config/connection");

const users = [
    {
        username: "spadilla",
        email: "spadilla@gmail.com",
        thought: [],
    },
];

//connect to mongoose and drop existing database
connection.once('open', async () => {
    console.log('connected');
    //dropping existing database and recreates it
    await User.deleteMany({});
    //add users to database
    await User.collection.insertMany(users);

    //log out seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete');
    process.exit(0);
});