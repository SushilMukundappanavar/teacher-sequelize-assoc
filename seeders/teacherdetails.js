'use strict';

const getSeedData = require('../helper/seed').getTeachersData

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TeacherDetails', getSeedData(), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TeacherDetails', null, {});
  }
};
