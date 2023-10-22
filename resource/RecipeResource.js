const db = require("../model");
const UserResource = require("./UserResource");

class RecipeResource {
    constructor(recipe, recipe_steps) {
        this.id = recipe.id;
        let user = (Object.fromEntries(Object.entries(recipe).filter(([key, value]) => {
            return key.toString().split("_")[0] == "user";
        })));
        let newuser = {};
        Object.keys(user).forEach(key => {
            let newkey = key.toString().split("_")[1];
            newuser[newkey] = user[key];
        });
        user = newuser;
        this.user = new UserResource(user);
        this.title = recipe.title;
        this.description = recipe.description;
        this.createdAt = recipe.createdAt;
        if (recipe_steps) {
            this.recipeSteps = recipe_steps;
        }
    };

    static toCollection(recipes) {
        let data = [];
        recipes.forEach(recipe => {
            data.push(new RecipeResource(recipe, null));
        });
        return data;
    }

}

module.exports = RecipeResource;