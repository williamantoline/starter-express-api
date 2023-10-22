class RecipeRequest {
    constructor(req) {
        this.userId = req.body.userId;
        this.title = req.body.title;
        this.description = req.body.description;
    }
}

module.exports = RecipeRequest;