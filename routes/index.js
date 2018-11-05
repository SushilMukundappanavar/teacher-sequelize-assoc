var express = require('express');
var router = express.Router();

const notificationController = require('../controllers').notification;
const teacherStudentController = require('../controllers').teacherstudents;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Company Router */
router.get('/api/teacherStudent', teacherStudentController.list);
router.get('/api/teacherStudent/:id', teacherStudentController.getById);
router.post('/api/teacherStudent', teacherStudentController.add);
router.put('/api/teacherStudent/:id', teacherStudentController.update);
router.delete('/api/teacherStudent/:id', teacherStudentController.delete);

/* Branch Router */
router.get('/api/notification', notificationController.list);
router.get('/api/notification/:id', notificationController.getById);
router.post('/api/notification', notificationController.add);
router.put('/api/notification/:id', notificationController.update);
router.delete('/api/notification/:id', notificationController.delete);

module.exports = router;
