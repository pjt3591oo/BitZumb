"use strict";

module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
        password : {
            type: DataTypes.STRING,
            allowNull : false
        },
        username : {
            type: DataTypes.STRING,
            allowNull : false
        }

    })
    ;
    users.associate = (models) =>{
        users.hasMany(models.userCoins)
        users.hasMany(models.transactionComplete)
        users.hasMany(models.transactionWaits)
        users.hasMany(models.banks)

    }
    return users;
};