import teacherdb from '../models/teacherdetail';
import studentdb from '../models/student';

export const commonstudents = async (req, res, next) => {
    let { teacher } = req.query;
    if (!teacher || !teacher.length) {
        res.json('no teacher param in request body');       
    }
    if (typeof teacher === 'string') {
        teacher = [teacher];
    }  

    try {
        let email = teacher;
        const teachers = await Promise.all(teacher.map(email => teacherdb.findOne({ where: { email } })));
        let students = await getAllCommonStudents(teachers);
        students = students.map(record => record.email);
        res.json(students);
    } catch (error) {
        next(error);
    }
}

const getAllCommonStudents = async (teacher) => {  
    console.log(studentdetails);      
    let studentdetails = await teacher.pop().getStudents(); 
    
    let StudentIDs = studentdetails.map(record => record.student_id)       
    while (teacher.length && StudentIDs.length > 0) {
        if (StudentIDs && StudentIDs.length > 0) {
        return await teacher.pop().getStudents({ where: { student_id: StudentIDs } });
        }
    }
    return await studentdetails;
}

export const registerdetails = async (req, res, next) => {
    const { teacher, students } = req.body;
    if (teacher === '' || !teacher) {
        return next(`No teacher value`);
    }
    if (!students || !students.length) {
        return next(`no students param in request body`);
    }
     try {
        let email = teacher;
        let teacherdeatils = await teacherdb.findOne({ where: { email } });
        let emails = students;
        let studentdetails = await studentdb.findAll({ where: { email: emails } });
        let recorddetails = await teacherdeatils.addStudents(studentdetails); 
        let registeredStudents;       
        if(recorddetails[0]){
            registeredStudents = recorddetails[0].map(record => record.StudentStudentId);
        }else{
            registeredStudents = []; 
        }
        let result = getoutput(students, registeredStudents);       
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

const getoutput = (total, selected) => { total
    .filter(student => selected.includes(total.student_id))
    .map(total => total.email);
}

export const suspend = async (req, res, next) => {
    const { student } = req.body;
    let email = student;
    
    if (student === '' ||!student ) {
       res.json('student email not available');
    }
    try {        
       // await doSuspend(student);
    
       let studentdetails = await studentdb.findOne({ where: { email } }) 
       studentdetails.update({ suspended: true });

        res.status(204).json();
    } catch (error) {
        next(error);
    }
}