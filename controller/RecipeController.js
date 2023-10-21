const { query } = require("express");
const db = require("../model");
const RecipeQueryBuilder = require("./querybuilder/RecipeQueryBuilder");
const RecipeResource = require("../resource/RecipeResource");

exports.index = async (req, res) => {
    let builder = new RecipeQueryBuilder();
    let sql = builder.getQuery(req);

    return db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({
                error: err.message,
            });
        }
        res.json({
            message: "success",
            data: rows,
        });
    });
}

exports.show = async (req, res) => {
    db.get(`SELECT * FROM recipes where id = ?`, [req.params.id], (err, recipe) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        db.get(`SELECT * FROM users where id = ?`, [recipe.user_id], (err, user) => {
            if (err) {
                res.status(400).json({"error":err.message});
                return;
            }
            db.all(`SELECT * FROM recipe_steps where recipe_id = ?`, [req.params.id], (err, recipe_steps) => {
                if (err) {
                    res.status(400).json({"error":err.message});
                    return;
                }
                res.status(200).json({
                    message: "success",
                    data: new RecipeResource(recipe, user, recipe_steps),
                });
            });
        })
        
      });
}
