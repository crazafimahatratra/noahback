'use strict';

let bcrypt = require('bcryptjs');

module.exports = {
    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface 
     * @param {Sequelize} Sequelize
     */
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            login: 'chris',
            password: 'chris',
            name: 'RAZAFIMAHATRATRA',
            firstname: 'Christophe',
            password: bcrypt.hashSync('chris', 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        }])
    },

    /**
     * @typedef {import('sequelize').QueryInterface} QueryInterface
     * @typedef {import('sequelize')} Sequelize
     * @param {QueryInterface} queryInterface 
     * @param {Sequelize} Sequelize
     */
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
