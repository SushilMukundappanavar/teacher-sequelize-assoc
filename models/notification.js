import Sequelize from 'sequelize';
import DB from '../DB/connection';
import TeacherDetails from './teacherdetail';
import Student from './student';


const Notification = DB.define('Notification', { message: Sequelize.STRING });
Notification.belongsTo(TeacherDetails, { as: 'sender', otherKey: 'senderId' });


export default Notification;