const db = require("../model");

class UserResource {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.imagePath = user.imagePath ?? null;
        this.createdAt = user.createdAt;
    };
}

module.exports = UserResource;