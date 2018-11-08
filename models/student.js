import Sequelize from 'sequelize';
import DB from '../DB/connection';



export default DB.define('Student', {
    student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
 
    },
    suspended: {
        type: Sequelize.BOOLEAN,
    }
});