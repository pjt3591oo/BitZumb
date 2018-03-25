"use strict";

module.exports = function(sequelize, DataTypes) {
    var userCoins = sequelize.define("userCoins", {
        krw: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        BTC: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        ETH: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        DASH: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        LTC: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        ETC: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        XRP: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        BCH: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        XMR: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        ZEC: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        QTUM: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        BTG: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        EOS: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },

    })
    ;
    userCoins.associate = (models) => {
        userCoins.belongsTo(models.users)
    }
    return userCoins;
};