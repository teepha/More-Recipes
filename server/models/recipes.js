/** Define recipes database model with foreign associations
 * @param  {obj} sequelize
 * @param  {obj} DataTypes
 * @returns {obj} Recipes model
 */
export default (sequelize, DataTypes) => {
    const Recipes = sequelize.define('Recipes', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false
        },
        procedures: {
            type: DataTypes.STRING,
            allowNull: false
        },
        upvotes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        downvotes: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
                as: 'userId',
            }
        }
    });
    Recipes.associate = (models) => {
        Recipes.belongsTo(models.Users, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Recipes.hasMany(models.Reviews, {
            foreignKey: 'recipeId',
            as: 'recipeId'
        });
        Recipes.hasMany(models.Favorites, {
            foreignKey: 'recipeId',
            as: 'recipeId'
        });
        Recipes.hasMany(models.Upvotes, {
            foreignKey: 'recipeId',
            as: 'recipeId'
        });
        Recipes.hasMany(models.Downvotes, {
            foreignKey: 'recipeId',
            as: 'recipeId'
        });
    };
    return Recipes;
};