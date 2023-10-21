const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const RecipeStep = sequelize.define("recipe_step", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        recipe_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
        },
        content: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        timer: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        timestamps: true,
    });
    return RecipeStep;
}