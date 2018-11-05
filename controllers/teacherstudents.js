const teacherstudent = require('../models').teacherstudents;
const notification = require('../models').notification;

module.exports = {
  list(req, res) {
    return teacherstudent
      .findAll({
        include: [{
          model: notification,
          as: 'notifications'
        }],
      })
      .then((teacherstudent) => res.status(200).send(teacherstudent))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return teacherstudent
      .findById(req.params.id, {
        include: [{
          model: notification,
          as: 'notifications'
        }],
      })
      .then((teacherstudent) => {
        if (!teacherstudent) {
          return res.status(404).send({
            message: 'teacherstudent Not Found',
          });
        }
        return res.status(200).send(teacherstudent);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return teacherstudent
      .create({
        teacher_email: req.body.teacher_email,
        student_email: req.body.student_email,
        status: req.body.status,
      })
      .then((teacherstudent) => res.status(201).send(teacherstudent))
      .catch((error) => res.status(400).send(error));
  },

  addWithnotifications(req, res) {
    return teacherstudent
      .create({
        teacher_email: req.body.teacher_email,
        student_email: req.body.student_email,
        status: req.body.status,
        notifications: req.body.notifications,
      }, {
          include: [{
          model: notification,
          as: 'notifications'
        }]
      })
      .then((teacherstudent) => res.status(201).send(teacherstudent))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    console.log(req.body);
    return teacherstudent
      .findById(req.params.id, {
        include: [{
          model: notification,
          as: 'notifications'
        }],
      })
      .then(teacherstudent => {
        if (!teacherstudent) {
          return res.status(404).send({
            message: 'teacherstudent Not Found',
          });
        }
        return teacherstudent
          .updateAttributes({
            teacher_email: req.body.teacher_email || teacherstudent.teacher_email,
            student_email: req.body.student_email || teacherstudent.student_email,
            status: req.body.status || teacherstudent.status,
            notifications: req.body.notifications || teacherstudent.notifications,
          }, {
              include: [{
              model: notification,
              as: 'notifications'
            }]
          })
          .then(() => res.status(200).send(teacherstudent))
          .catch((error) => {console.log(error);res.status(400).send(error);});
      })
      .catch((error) => {console.log(error);res.status(400).send(error);});
  },

  delete(req, res) {
    return teacherstudent
      .findById(req.params.id)
      .then(teacherstudent => {
        if (!teacherstudent) {
          return res.status(400).send({
            message: 'teacherstudent Not Found',
          });
        }
        return teacherstudent
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};