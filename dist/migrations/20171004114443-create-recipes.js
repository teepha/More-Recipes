'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        queryInterface.createTable('Recipes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ingredients: {
                type: Sequelize.STRING,
                allowNull: false
            },
            procedures: {
                type: Sequelize.STRING,
                allowNull: false
            },
            upvotes: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            downvotes: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },
    down: function down(queryInterface) {
        queryInterface.dropTable('Recipes');
    }
};