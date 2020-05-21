'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    firstname: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    accessTokenExpires: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};