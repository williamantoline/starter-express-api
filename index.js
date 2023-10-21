require("dotenv").config();
const express = require("express");
const sqlite3 = require('sqlite3');
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const recipeRouter = require("./routes/RecipeRouter");
const testRouter = require("./routes/TestRouter");
const userRouter = require("./routes/UserRouter");


const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    credentials: true,
    origin: process.env.CORS_ALLOWED || 'http://localhost:3000',
}));


const db = require("./model");

db.run('CREATE TABLE users( \
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    name NVARCHAR(255) NOT NULL,\
    email NVARCHAR(255) NOT NULL,\
    image_path NVARCHAR(255),\
    created_at INTEGER\
)', (err) => {
    let insert = 'INSERT INTO users (name, email, image_path, created_at) VALUES (?,?,?,?)';
    db.run(insert, ["Andi", "andi@gmail.com", null, 1000]);
    db.run(insert, ["Budi", "budi@gmail.com", null, 1000]);
    db.run(insert, ["Chaneka", "chaneka@gmail.com", null, 1000]);
});

db.run('CREATE TABLE recipes( \
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    user_id INTEGER NOT NULL,\
    title NVARCHAR(255) NOT NULL,\
    description NVARCHAR(255),\
    created_at INTEGER NOT NULL,\
    FOREIGN KEY (user_id) REFERENCES users(id)\
)', (err) => {
    let insert = 'INSERT INTO recipes (user_id, title, description, created_at) VALUES (?,?,?,?)';
    db.run(insert, [1, "Resep 2", "Description 1", 1004]);
    db.run(insert, [1, "Resep 3", "Description 2", 1000]);
    db.run(insert, [2, "Resep 1", "Description 3", 1002]);
});

db.run('CREATE TABLE recipe_steps( \
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    recipe_id INTEGER NOT NULL,\
    content NVARCHAR(255) NOT NULL,\
    type NVARCHAR(255),\
    timer INTEGER,\
    created_at INTEGER NOT NULL,\
    FOREIGN KEY (recipe_id) REFERENCES recipes(id)\
)', (err) => {
    let insert = 'INSERT INTO recipe_steps (recipe_id, content, type, timer, created_at) VALUES (?,?,?,?,?)';
    db.run(insert, [1, "Step 1", "Description 1", "tip", 1000]);
    db.run(insert, [1, "Step 2", "Description 2", "tip", 1000]);
    db.run(insert, [2, "Step 1", "Description 1", "tip", 1000]);
    db.run(insert, [2, "Step 2", "Description 2", "tip", 1000]);
    db.run(insert, [3, "Step 1", "Description 1", "tip", 1000]);
});



// main routing
app.use('/api/tests', testRouter);
app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter);

// handle 404
app.use((req, res, next) => {
    res.status(404).send({message: "Not Found"});
});

// handle error
app.use((err, req, res, next) => {
    res.status(500).send({message: "Internal Server Error"});
});

// db.close();

const host = process.env.HOST || "http://127.0.0.1";
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Running on ${host}:${port}`);
