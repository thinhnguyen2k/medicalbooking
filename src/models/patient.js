'use strict';
const {
    Model
} = require('sequelize');
// const { FOREIGNKEYS } = require('sequelize/types/query-types');
module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Patient.hasMany(models.Booking, {foreignKey: 'idPatient'});
            Patient.hasOne(models.Re_Examination, {foreignKey: 'idPatient'});
        }
    }
    Patient.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        address: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        date: DataTypes.STRING,
        active: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Patient',
    });
    return Patient;
};

