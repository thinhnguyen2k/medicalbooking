'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Booking.belongsTo(models.Patient, {foreignKey: 'idPatient'});
            Booking.belongsTo(models.Staff, {foreignKey: 'idStaff'});
            Booking.belongsTo(models.Examination_Hours, {foreignKey: 'idTime'});
            Booking.belongsTo(models.Status, {foreignKey: 'idStatus'});
            Booking.belongsTo(models.Specialist, {foreignKey: 'idSpecialist'});
            Booking. hasOne(models.History, {foreignKey: 'idHistory'});
            
        }
    }
    Booking.init({
        idTime: DataTypes.INTEGER,
        idStaff: DataTypes.INTEGER,
        idStatus: DataTypes.INTEGER,
        idPatient: DataTypes.INTEGER,
        date: DataTypes.DATE,
        idSpecialist: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};

