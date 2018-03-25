/**
 * Created by bagjeongtae on 2018. 2. 15..
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var transactionWaits = sequelize.define("transactionWaits", {
        priceCondition : { // 시세
            type: DataTypes.DOUBLE
        },
        coinType : { // 코인종류
            type: DataTypes.STRING
        },
        price: {  // 구매금액
            type: DataTypes.DOUBLE
        },
        coinCount: { // 주문수량
            type: DataTypes.DOUBLE
        },
        status: {
            type: DataTypes.STRING(1) // s: 판매등록, b: 구매등록
        }
    })
    ;
    transactionWaits.associate = (models) =>{
        transactionWaits.belongsTo(models.users)
    }
    return transactionWaits;
};