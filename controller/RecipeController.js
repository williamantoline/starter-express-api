const { query } = require("express");
const db = require("../model");
const RecipeQueryBuilder = require("./querybuilder/RecipeQueryBuilder");
const RecipeResource = require("../resource/RecipeResource");
const RecipeRequest = require("./request/RecipeRequest");

exports.index = async (req, res) => {
    let builder = new RecipeQueryBuilder();
    let sql = builder.getQuery(req);

    try {
        return db.all(sql, [], async (err, rows) => {
            if (err) {
                res.status(500).json({
                    error: err.message,
                });
                return;
            }

            try {
                let data = RecipeResource.toCollection(rows);
                res.json({
                    message: "success",
                    data: data,
                });

            } catch (err) {
                return res.status(500).json({
                    error: err.message,
                });
            }
        });

    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
        return;
    }
}

exports.show = async (req, res) => {
    try {
        db.get(`
            SELECT 
                recipes.id AS id, 
                recipes.title AS title, 
                recipes.description AS description,
                recipes.createdAt AS createdAt,
                users.id AS user_id,
                users.name AS user_name,
                users.email AS user_email,
                users.imagePath AS user_imagePath, 
                users.createdAt AS user_createdAt
            FROM recipes 
            LEFT JOIN users ON recipes.userId = users.id
            WHERE recipes.id = ? 
        `, [req.params.id], (err, recipe) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            if (!recipe) {
                res.status(404).json({
                    error: "not found",
                });
                return;
            }
            db.get(`SELECT id AS user_id, name as user_name, email as user_email, imagePath as user_imagePath, createdAt as user_createdAt FROM users where id = ?`, [recipe.userId], (err, user) => {
                if (err) {
                    res.status(400).json({"error":err.message});
                    return;
                }
                db.all(`SELECT * FROM recipe_steps where recipeId = ?`, [req.params.id], (err, recipe_steps) => {
                    if (err) {
                        res.status(400).json({"error": err.message});
                        return;
                    }

                    try {
                        res.status(200).json({
                            message: "success",
                            data: new RecipeResource(recipe, recipe_steps),
                        });

                    } catch (err) {
                        res.status(500).json({
                            error: err.message,
                        });
                        return;
                    }
                });
            })
            
          });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}

exports.store = async (req, res) => {
    try {
        const validated = new RecipeRequest(req);
        
        let createdAt = Date.now();
        let insertQuery = `
            INSERT INTO recipes (userId, title, description, createdAt) 
            VALUES (${validated.userId}, '${validated.title}', '${validated.description}', '${createdAt}')`;

        db.run(insertQuery, [], function (err, res) {
            if (err) {
                res.status(500).json({
                    error: err.message,
                });
                return;
            }
        });
        

        res.status(200).json({
            message: "success",
        });

    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
        return;
    }
}

exports.update = async (req, res) => {
    try {
        let recipeId = req.params.id;
        const validated = new RecipeRequest(req);
        
        let updateQuery = `
            UPDATE recipes
            SET userId = '${validated.userId}',
            title = '${validated.title}',
            description = '${validated.description}'
            WHERE id = ${recipeId}
        `;

        db.run(updateQuery, [], function (err, res) {
            if (err) {
                res.status(500).json({
                    error: err.message,
                });
                return;
            }
        });
        

        res.status(200).json({
            message: "success",
        });

    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
        return;
    }
}


exports.destroy = async (req, res) => {
    try {
        let recipeId = req.params.id;
        
        let selectQuery = `
            SELECT * FROM recipes where id = ?
        `;
        let deleteQuery = `
            DELETE FROM recipes
            WHERE id = ${recipeId}
        `;

        db.get(selectQuery, [recipeId], (err, recipe) => {
            if (err) {
                res.status(500).json({
                    error: err.message,
                });
                return;
            }
            if (!recipe) {
                res.status(404).json({
                    error: "not found",
                });
                return;
            } else {
                db.run(deleteQuery, [], function (err, del) {
                    if (err) {
                        res.status(500).json({
                            error: err.message,
                        });
                        return;
                    }

                    res.status(200).json({
                        message: "success",
                    });
                });
            }
        });
       

    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
        return;
    }
}