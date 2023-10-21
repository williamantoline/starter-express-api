const { query } = require("express");
const db = require("../model");
const RecipeQueryBuilder = require("./querybuilder/RecipeQueryBuilder");
const RecipeResource = require("../resource/RecipeResource");

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
                console.log(2,err);
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
        db.get(`SELECT * FROM recipes where id = ?`, [req.params.id], (err, recipe) => {
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
            db.get(`SELECT * FROM users where id = ?`, [recipe.userId], (err, user) => {
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
