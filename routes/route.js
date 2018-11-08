const express  = require('express');
const registercontroller = require('../controller/register');
const notificationcontroller = require('../controller/notification');

let router = express.Router();

router.get('/commonstudents', registercontroller.commonstudents);
router.post('/register', registercontroller.registerdetails);
router.put('/suspend', registercontroller.suspend);
router.post('/retrievefornotifications', notificationcontroller.retrieveForNotifications);

export default router;
