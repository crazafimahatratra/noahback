'use strict';
module.exports = (sequelize, DataTypes) => {
    const Operation = sequelize.define('Operation', {
        date: DataTypes.DATE,
        productId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        pu: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,
        label: DataTypes.STRING,
        amount: DataTypes.INTEGER,
    }, {});
    Operation.associate = function (models) {
        Operation.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        })
    };
    return Operation;
};