const Reserve = require('../model/reserve');
const jwt = require('jsonwebtoken');
const studentService = require('../service/studentService');

exports.createReserve = async function (reserve) {
    let student = await studentService.getStudentById(reserve.studentId);
    let newReserve = new Reserve({
        classId: reserve.classId,
        studentId: reserve.studentId,
        teacherId: reserve.teacherId,
        date: reserve.date,
        time: reserve.time,
        status: 'requested',
        timeRange: reserve.timeRange,
        contactMail: student.email,
        contactPhone: student.phone,
        message: reserve.message
    })

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

exports.getReservesByStudentId = async function (query, page, limit) {
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

exports.updateReserve = async function (id, reserveParam) {
    try {
        //Find the old Reserve Object by the Id
        var oldReserve = await Reserve.findById(id);

        if (oldReserve == null){
            return false;
        }
        oldReserve.state = reserveParam.state;

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