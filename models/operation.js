'use strict';
module.exports = (sequelize, DataTypes) => {
    const Operation = sequelize.define('Operation', {
        date: DataTypes.DATE,
        productId: DataTypes.INTEGER,
        pu: DataTypes.INTEGER,
        qty: DataTypes.INTEGER
    }, {});
    Operation.associate = function (models) {
        Operation.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        })
    };
    return Operation;
};