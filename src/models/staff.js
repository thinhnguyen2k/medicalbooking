'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
   
    static associate(models) {
      Staff.belongsTo(models.Role, {foreignKey: 'idRole'});
      Staff.hasMany(models.Booking, {foreignKey: 'idStaff'});
      Staff.hasOne(models.Doctor_Info, {foreignKey: 'idStaff'});
      Staff.hasMany(models.Re_Examination, {foreignKey: 'idStaff'});
  
    }
  }
  Staff.init({
    name: DataTypes.STRING, 
    email: DataTypes.STRING,  
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    idRole: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING,
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};

