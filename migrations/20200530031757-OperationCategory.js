'use strict';

module.exports = {
     /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface 
     * @param {Sequelize} Sequelize
     */
    up: (queryInterface, Sequelize) => {
        let c1 = queryInterface.addColumn("Operations", "label", {
            type: Sequelize.STRING,
        })
        let c2 = queryInterface.addColumn("Operations", "categoryId", {
            type: Sequelize.INTEGER,
            references: {
                key: "id",
                model: "Categories"
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        });
        let c3 = queryInterface.addColumn("Operations", "amount", {
            type: Sequelize.INTEGER
        })
        return Promise.all([c1, c2, c3]);
    },

     /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface 
     * @param {Sequelize} Sequelize
     */
    down: (queryInterface, Sequelize) => {
        let c1 = queryInterface.removeColumn("Operations", "label");
        let c2 = queryInterface.removeColumn("Operations", "categoryId");
        let c3 = queryInterface.removeColumn("Operations", "amount");
        return Promise.all([c1, c2, c3]);
    }
};
