const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define("recipe", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        timestamps: true,
    });
    return Recipe;
}