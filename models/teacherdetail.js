import Sequelize from 'sequelize';
import DB from '../DB/connection';


export default DB.define('TeacherDetail', {
    teacher_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        
    }
});

