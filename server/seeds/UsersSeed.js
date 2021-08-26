require("dotenv").config({ path: __dirname + "/./../.env" });
const userModel = require("../models/User");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs"); // for pwd encryption.
saltRounds = 10;

const users = [{
        username: "toto",
        email: "toto@gmail.com",
        password: bcryptjs.hashSync("12345", saltRounds), // encryption
        isAdmin: true,
    },
    {
        username: "Mariadb",
        email: "maria@gmail.com",
        password: bcryptjs.hashSync("12345", saltRounds), // encryption
        isAdmin: false,
    },
    {
        username: "Roger",
        email: "roger@gmail.com",
        password: bcryptjs.hashSync("12345", saltRounds), // encryption
        isAdmin: false,
    },
];

mongoose
    .connect('mongodb+srv://Ghada:00120AG@cluster0.kem78.mongodb.net/glutenReactdB?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .then(() => {
        return userModel.deleteMany();
    })
    .then(() => {
        userModel
            .create(users)
            .then((createdUsers) => {
                console.log(
                    `seed users done : ${createdUsers.length} documents inserted !`
                );
            })
            .catch((error) => {
                console.log(error);
            });
    })
    .catch((error) => {
        console.log(error);
    });