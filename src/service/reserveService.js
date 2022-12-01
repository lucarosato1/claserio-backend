const Reserve = require('../model/reserve');
const jwt = require('jsonwebtoken');
const ClassService = require('../service/classService');
const StudentService = require('../service/studentService');
const TeacherService = require('../service/teacherService');

exports.createReserve = async function (reserve, tokenSubject) {
    let student = await StudentService.getStudentById(tokenSubject);
    if(!student){throw Error("Student not found"); }
    let lesson = await ClassService.getClassById(reserve.classId);
    if(!lesson){throw Error("Lesson not found"); }

    let newReserve = new Reserve({
        classId: reserve.classId,
        studentId: tokenSubject,
        teacherId: lesson.teacherId,
        date: reserve.date,
        time: reserve.time,
        status: 'requested',
        timeRange: reserve.timeRange,
        contactMail: student.email,
        contactPhone: student.phone,
        message: reserve.message
    })
    // validate if the class is already reserved
    if (await Reserve.find({classId: reserve.classId, studentId: tokenSubject}).countDocuments() > 0){
        throw Error("The class is already reserved");
    }

    try {
        // Saving the Reserve
        let savedReserve = await newReserve.save();
        return jwt.sign({
            id: savedReserve._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
    } catch (e) {
        // return an Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Reserve")
    }
}

exports.getReservesByTeacherId = async function (query, page, limit) {
    // Try Catch the awaited promise to handle the error 
    try {
        const reserves = await Reserve.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        
        const count = await Reserve.countDocuments;
        // Return the Userd list that was retured by the mongoose promise
        return {
            reserves,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        };

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Reserves');
    }
}

exports.getPendingReservesByTeacher = async function (teacherId) {
    // Try Catch the awaited promise to handle the error
    try {
        return await Reserve.find({teacherId: teacherId, state: 'requested'});
    } catch (e) {
        throw Error("Error while getting reserves by teacher id");
    }
}

exports.getReservesByStudentId = async function (studentId) {
    console.log("Validating student...");
    if (!await StudentService.getStudentById(studentId)){
        console.log("Student not found");
        throw Error("Student not found");
    }
    try {
        console.log("Getting reserves...");
        return await Reserve.find({studentId: studentId, state: 'requested'});
    } catch (e) {
        throw Error('Error while retrieving reserves');
    }
}

exports.getAllReservesByStudentId = async function (studentId) {
    console.log("Validating student...");
    if (!await StudentService.getStudentById(studentId)){
        console.log("Student not found");
        throw Error("Student not found");
    }
    try {
        console.log("Getting reserves...");
        return await Reserve.find({studentId: studentId});
    } catch (e) {
        throw Error('Error while retrieving reserves');
    }
}

exports.getReservesWhereNotStudentId = async function (id) {
    console.log("StudentId: " + id);
    if (!await StudentService.getStudentById(id)){
        console.log("Student not found");
        throw Error("Student not found");
    }
    try {
        return await Reserve.find({studentId: {$ne: id}});
    } catch (e) {
        throw Error('Error while retrieving reserves');
    }
}

exports.getReservesApprovedByStudentId = async function (studentId) {
    console.log("Validating student...");
    if (!await StudentService.getStudentById(studentId)){
        console.log("Student not found");
        throw Error("Student not found");
    }
    console.log("Student found");
    try {
        console.log("Getting reserves...");
        return await Reserve.find({studentId: studentId, state: 'approved'});
    } catch (e) {
        throw Error('Error while retrieving reserves');
    }
}

exports.updateReserve = async function (id, state, tokenSubject) {
    let reserve = await Reserve.findById(id);
    console.log("tokenSubject: " + tokenSubject);
    console.log("Reserve: \n"+ JSON.stringify(reserve));

    let student = await StudentService.getStudentById(tokenSubject);
    let teacher = await TeacherService.getTeacherById(tokenSubject);

    if (student){
        console.log("Student case")
        student = await StudentService.getStudentById(reserve.studentId);
        console.log("Student in reserve...")
        console.log("Student del reserve: " + reserve.studentId + "y es del type: " + typeof reserve.studentId);
        console.log("Student: " + student._id + "y es del type: " + typeof(student._id))
        if ( !student._id.equals(reserve.studentId) ){
            console.log("Student not found");
            throw Error("Student not authorized");
        }
        console.log("Student authorized")
    } else {
        console.log("Teacher case")
        teacher = await TeacherService.getTeacherById(reserve.teacherId);
        console.log("Teacher in reserve...")
        if (!teacher._id.equals(reserve.teacherId)){
            throw Error("Teacher not authorized");
        }
        console.log("Teacher authorized")
    }

    try {
        //Find the old Reserve Object by the Id
        let oldReserve = await Reserve.findById(id);

        if (oldReserve == null){
            return false;
        }
        oldReserve.state = state.state;
        switch (state.state) {
            case 'accepted': await acceptReserve(oldReserve);
            break;
            case 'canceled': await cancelReserve(oldReserve);
            break;
            case 'finished': await finishReserve(oldReserve);
            break;
        }
        console.log("NewReserve: \n"+ JSON.stringify(oldReserve));

        return Reserve.updateOne({_id: id},
            {   
                $set: {
                    state: oldReserve.state
                }
            });
    } catch (e) {
        throw Error("Error occured while Finding the Reserve")
    }
}

const acceptReserve = async function (reserve) {
    try {
        //Find the old Reserve Object by the Id
        let oldReserve = await Reserve.findById(reserve._id);

        if (oldReserve == null){
            return false;
        }
        oldReserve.state = 'accepted';

        console.log("NewReserve: \n"+ JSON.stringify(oldReserve));

        return Reserve.updateOne({_id: reserve._id},
            {   
                $set: {
                    state: oldReserve.state
                }
            });
    } catch (e) {
        throw Error("Error occured while Finding the Reserve")
    }
}

const cancelReserve = async function (reserve) {
    try {
        //Find the old Reserve Object by the Id
        let oldReserve = await Reserve.findById(reserve._id);

        if (oldReserve == null){
            return false;
        }
        oldReserve.state = 'canceled';

        console.log("NewReserve: \n"+ JSON.stringify(oldReserve));

        return Reserve.updateOne({_id: reserve._id},
            {   
                $set: {
                    state: oldReserve.state
                }
            });
    } catch (e) {
        throw Error("Error occured while Finding the Reserve")
    }
}

const finishReserve = async function (reserve) {
    try {
        //Find the old Reserve Object by the Id
        let oldReserve = await Reserve.findById(reserve._id);

        if (oldReserve == null){
            return false;
        }
        oldReserve.state = 'finished';

        console.log("NewReserve: \n"+ JSON.stringify(oldReserve));

        return Reserve.updateOne({_id: reserve._id},
            {   
                $set: {
                    state: oldReserve.state
                }
            });
    } catch (e) {
        throw Error("Error occured while Finding the Reserve")
    }
}
