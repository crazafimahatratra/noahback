'use strict';

module.exports = {
    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface 
     * @param {Sequelize} Sequelize
     */
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Categories', [
            { label: 'Sakafo', color: '#f44336', createdAt: new Date(), updatedAt: new Date() },
            { label: 'Trano', color: '#e91e63', createdAt: new Date(), updatedAt: new Date() },
            { label: 'Jiro sy Rano', color: '#ba68c8', createdAt: new Date(), updatedAt: new Date() },
            { label: 'Fahasalamana', color: '#9575cd', createdAt: new Date(), updatedAt: new Date() },
            { label: 'Samihafa', color: '#7986cb', createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface 
     * @param {Sequelize} Sequelize
     */
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categories', null, {});
    }
};

// 032 62 424 69