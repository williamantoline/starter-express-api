class RecipeQueryBuilder {
    constructor() {
        this.sql = "SELECT recipes.*, users.* FROM recipes LEFT JOIN users ON recipes.userId = users.id WHERE TRUE";
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
        const limit = 15;

        Object.keys(this.filters).forEach(key => {
            if (key in this.availableFilters) {
                this.sql += ` AND ${this.availableFilters[key]} = ${this.filters[key]}`;
            }
        });

        if (this.sort && (this.sort in this.availableSorts)) {
            let type = "ASC";
            if (sort[0] == '-') {
                type = "DESC";
                this.sort = this.sort.substring(1, this.sort.length);
            }
            this.sql += ` ORDER BY ${sort} ${type}`;
        }

        this.sql += ` LIMIT ${limit} OFFSET ${limit * this.page}`;

        return this.sql;
    };
}

module.exports = RecipeQueryBuilder;