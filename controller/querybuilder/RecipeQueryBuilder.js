
class RecipeQueryBuilder {
    constructor() {
        this.sql = "SELECT * FROM recipes WHERE TRUE";
    };

    availableFilters = {
        user_id: "user_id",
        title: "title",
        description: "description",
    };

    availableSorts = {
        title: "title",
        created_at: "created_at",
    };

    getQuery(req) {
        this.filter = req.query.filter;
        this.sort = req.query.sort;

        if (this.filter) {
            if (this.filter in this.availableFilters) {
                    this.sql += ` AND ${this.availableFilters[key]} = ${this.filters[key]}`;
                }
            Object.keys(this.filters).forEach(key => {
                if (key in this.availableFilters) {
                    this.sql += ` AND ${this.availableFilters[key]} = ${this.filters[key]}`;
                }
            });
        }

        if (this.sort && (this.sort in this.availableSorts)) {
            let type = "ASC";
            if (sort[0] == '-') {
                type = "DESC";
                this.sort = this.sort.substring(1, this.sort.length);
            }
            this.sql += ` ORDER BY ${sort} ${type}`;
        }

        return this.sql;
    };
}

module.exports = RecipeQueryBuilder;