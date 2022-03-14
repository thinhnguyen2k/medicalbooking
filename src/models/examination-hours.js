'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Examination_Hours extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Examination_Hours.hasOne(models.Booking, {foreignKey: 'idTime'});
            Examination_Hours.belongsTo(models.Re_Examination, {foreignKey: 'idTime'});
            
        }
    }
    Examination_Hours.init({
        slotTime: DataTypes.STRING,
        active: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Examination_Hours',
    });
    return Examination_Hours;
};