const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname , '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secret-Key',
    resave: false,
    saveUninitialized: false
}));

app.set('views', path.join(__dirname, '../views'));
app.set("view engine", "hbs");

const collections = require("./collections");
app.use("/", collections);

const card = require("./card");
app.use("/", card);

const login = require("./login");
app.use("/", login);


module.exports = {app}