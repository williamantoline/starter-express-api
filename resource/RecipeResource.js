const db = require("../model");
const UserResource = require("./UserResource");

class RecipeResource {
    constructor(recipe, recipe_steps) {
        this.id = recipe.id;
        this.user = new UserResource(recipe);
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