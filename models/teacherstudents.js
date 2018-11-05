'use strict';
module.exports = (sequelize, DataTypes) => {
  const teacherstudents = sequelize.define('teacherstudents', {
    teacher_email: DataTypes.STRING,
    student_email: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  teacherstudents.associate = function(models) {
    teacherstudents.hasMany(models.notification, {
      foreignKey: 'teacherstudent_id',
      as: 'notifications'
    });
  };
  return teacherstudents;
};