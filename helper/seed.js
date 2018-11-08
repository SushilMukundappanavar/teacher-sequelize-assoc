'use strict';

const seedData = require('../config/seed-data.json');

const getData = (data) => data.map((email) => {
    const date = new Date();
    return { email, createdAt: date, updatedAt: date };
});

const getStudentData = () => getData(seedData.students);
const getTeachersData = () => getData(seedData.teacherdetails);

module.exports = {
    getStudentData,
    getTeachersData,
};