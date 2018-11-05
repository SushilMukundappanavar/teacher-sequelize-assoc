'use strict';
module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define('notification', {
    teacherstudent_id: DataTypes.INTEGER,
    notification: DataTypes.STRING
  }, {});
  notification.associate = function(models) {
    notification.belongsTo(models.teacherstudents, {
      foreignKey: 'teacherstudent_id'
    });
  };
  return notification;
};