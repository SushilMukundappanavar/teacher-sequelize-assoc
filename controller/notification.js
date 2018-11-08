import teacherdb from '../models/teacherdetail';
import studentdb from '../models/student';
import notificationdb from '../models/notification';

export const retrieveForNotifications = async (req, res, next) => {
    if (req.body.teacher === '' || !req.body.teacher) {
        return next('teacher param not available');
    }
    if (req.body.notification === '' || !req.body.notification) {
        return next('notification param not available');
    }

    const teacherEmail = req.body.teacher;
    let notificationMessage = req.body.notification.split(' @', 1)[0];
    const studentsEmail = req.body.notification.substr(notificationMessage.length).split(' @').filter(email => !!email.length)
    try {

        let email = teacherEmail; 
        const teacher = await teacherdb.findOne({ where: { email } });
        
        let id = teacher.teacher_id;
        const notification = async (notificationMessage, id) => {
            let columns = { message: notification };
            if (id) {
                columns.senderEmployeeId = id;

            }
            return await notificationdb.create(columns);
        };

        const students = await  studentdb.findAll({ where: { email: studentsEmail } });
        let registeredStudents;
        if (studentsEmail && studentsEmail.length) {
          
            email = studentsEmail ;
           registeredStudents =  async (teacher, email) => {
            return await teacher.getStudents({
                where: {
                    [Op.not]: [
                        email
                    ]
                }
            });
        }

        } else {
            registeredStudents = await teacher.getStudents();
        }
        const allStudents = students.concat(registeredStudents);
        const recipients = allStudents
            .filter(record => !record.suspended)
            .map(record => record.email);
        res.json({ recipients });
    } catch (error) {
        next(error);
    }
}