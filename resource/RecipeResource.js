const db = require("../model");
const UserResource = require("./UserResource");

class RecipeResource {
    constructor(recipe, user, recipe_steps) {
        this.id = recipe.id;
        this.user = new UserResource(user);
        this.title = recipe.title;
        this.description = recipe.description;
        this.createdAt = recipe.created_at;
        this.recipe_steps = recipe_steps;
    };
}

module.exports = RecipeResource;