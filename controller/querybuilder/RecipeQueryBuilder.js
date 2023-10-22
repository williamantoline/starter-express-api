class RecipeQueryBuilder {
    constructor() {
        this.sql = `SELECT 
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
        WHERE TRUE`;
    };

    availableFilters = {
        userId: "userId",
        title: "title",
        description: "description",
    };

    availableSorts = {
        title: "title",
        createdAt: "createdAt",
    };

    getQuery(req) {
        this.filters = req.query.filter ?? {};
        this.sort = req.query.sort;
        this.page = req.query.page ?? 1;
        this.limit = req.query.limit ?? 15;
        this.search = req.query.search;

        Object.keys(this.filters).forEach(key => {
            if (key in this.availableFilters) {
                this.sql += ` AND ${this.availableFilters[key]} = ${this.filters[key]}`;
            }
        });

        if (this.search) {
            this.sql += ` AND title LIKE '%${this.search}%'`;
        }

        if (this.sort && (this.sort in this.availableSorts)) {
            let type = "ASC";
            if (sort[0] == '-') {
                type = "DESC";
                this.sort = this.sort.substring(1, this.sort.length);
            }
            this.sql += ` ORDER BY ${sort} ${type}`;
        }

        this.sql += ` LIMIT ${this.limit} OFFSET ${this.limit * (this.page - 1)}`;

        return this.sql;
    };
}

module.exports = RecipeQueryBuilder;