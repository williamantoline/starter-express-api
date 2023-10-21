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
    imagePath NVARCHAR(255),\
    createdAt INTEGER\
)', (err) => {
    // let insert = 'INSERT INTO users (name, email, imagePath, createdAt) VALUES (?,?,?,?)';
    // let createdAt = Date.now();
    // db.run(insert, ["Andi", "andi@gmail.com", null, createdAt]);
    // db.run(insert, ["Budi", "budi@gmail.com", null, createdAt]);
    // db.run(insert, ["Chaneka", "chaneka@gmail.com", null, createdAt]);
    // db.run(insert, ["Deni", "deni@gmail.com", null, createdAt]);
    // db.run(insert, ["Eka", "eka@gmail.com", null, createdAt]);
});

db.run('CREATE TABLE recipes( \
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    userId INTEGER NOT NULL,\
    title NVARCHAR(255) NOT NULL,\
    description NVARCHAR(255),\
    createdAt INTEGER NOT NULL,\
    FOREIGN KEY (userId) REFERENCES users(id)\
)', (err) => {
    // let insert = 'INSERT INTO recipes (userId, title, description, createdAt) VALUES (?,?,?,?)';
    // let createdAt = Date.now();
    // db.run(insert, [1, "Resep 1", "Description 1", createdAt]);
    // db.run(insert, [1, "Resep 2", "Description 2", createdAt]);
    // db.run(insert, [2, "Resep 3", "Description 3", createdAt]);
    // db.run(insert, [3, "Resep 4", "Description 3", createdAt]);
    // db.run(insert, [4, "Resep 5", "Description 3", createdAt]);
    // db.run(insert, [4, "Resep 6", "Description 3", createdAt]);
    // db.run(insert, [5, "Resep 7", "Description 3", createdAt]);
    // db.run(insert, [5, "Resep 8", "Description 8", createdAt]);
    // db.run(insert, [5, "Resep 9", "Description 9", createdAt]);
});

db.run('CREATE TABLE recipe_steps( \
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
    recipeId INTEGER NOT NULL,\
    content NVARCHAR(255) NOT NULL,\
    type NVARCHAR(255),\
    timer INTEGER,\
    createdAt INTEGER NOT NULL,\
    FOREIGN KEY (recipeId) REFERENCES recipes(id)\
)', (err) => {
    // let insert = 'INSERT INTO recipe_steps (recipeId, content, type, timer, createdAt) VALUES (?,?,?,?,?)';
    // let createdAt = Date.now();
    // db.run(insert, [1, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [1, "Step 2", "Description 2", "tip", createdAt]);
    // db.run(insert, [2, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [2, "Step 2", "Description 2", "tip", createdAt]);
    // db.run(insert, [3, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [3, "Step 2", "Description 2", "tip", createdAt]);
    // db.run(insert, [3, "Step 3", "Description 3", "tip", createdAt]);
    // db.run(insert, [3, "Step 4", "Description 4", "tip", createdAt]);
    // db.run(insert, [4, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [5, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [6, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [7, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [8, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [9, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [9, "Step 2", "Description 2", "tip", createdAt]);
    // db.run(insert, [9, "Step 3", "Description 3", "tip", createdAt]);
    // db.run(insert, [10, "Step 1", "Description 1", "tip", createdAt]);
    // db.run(insert, [10, "Step 2", "Description 2", "tip", createdAt]);
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
