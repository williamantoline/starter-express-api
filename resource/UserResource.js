const db = require("../model");

class UserResource {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.image_path = user.image_path;
        this.created_at = user.created_at;
    };
}

module.exports = UserResource;