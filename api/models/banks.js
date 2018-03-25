/**
 * Created by bagjeongtae on 2018. 2. 21..
 */
module.exports = function(sequelize, DataTypes) {
    var banks = sequelize.define("banks", {
        firstFinance: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        secondFinance: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        },
        thirdFinance: {
            type: DataTypes.DOUBLE,
            defaultValue: 0.0
        }
    })
    ;
    banks.associate = (models) =>{
        banks.belongsTo(models.users)
    }
    return banks;
};