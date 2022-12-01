// Getting the Newly created Mongoose Model we just created
const Class = require("../model/class");
const TeacherService = require('../service/teacherService');
const reserveService = require("./reserveService");

// Saving the context of this module inside the _the variable
_this = this;

exports.createClass = async function (classParam, tokenSubject) {
    let teacher = await TeacherService.getTeacherById(tokenSubject);

    if(!teacher) { return null;}

    let newClass = new Class({
        name: classParam.name,
        description: classParam.description,
        duration: classParam.duration,
        type: classParam.type,
        frequency: classParam.frequency,
        subject: classParam.subject,
        price: classParam.price,
        teacherId: tokenSubject,
        image: classParam.image
    })

    try {
        // Saving the Class
        return await newClass.save();
    } catch (e) {
        // return an Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Classes")
    }
}

//update class by id
exports.updateClassById = async function (id, classParam, tokenSubject) {
    //Find the old Class Object by the Id
    let oldClass = await Class.findById(id);

    if(oldClass.teacherId !== tokenSubject) {
        throw Error("You are not authorized to update this class");
    }

    if (!oldClass){
        throw Error("Class not found");
    }

    try {
        oldClass.name = classParam.name;
        oldClass.description = classParam.description;
        oldClass.duration = classParam.duration;
        oldClass.type = classParam.type;
        oldClass.frequency = classParam.frequency;
        oldClass.subject = classParam.subject;
        oldClass.price = classParam.price;
        oldClass.teacherId = classParam.teacherId;
        oldClass.image = classParam.image;

        console.log("NewClass: \n"+ JSON.stringify(oldClass));

        return Class.updateOne({_id: id},
            {
                $set: {
                    name: oldClass.name,
                    description: oldClass.description,
                    duration: oldClass.duration,
                    type: oldClass.type,
                    frequency: oldClass.frequency,
                    subject: oldClass.subject,
                    price: oldClass.price,
                    teacherId: oldClass.teacherId,
                    image: oldClass.image
                }
            });

    } catch (e) {
        throw Error("Error occured while Finding the Class")
    }
}

exports.getAllClasses = async function (query, page, limit) {
    try {
        const classes = await Class.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = Class.countDocuments
        return {
            classes,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        };
    } catch (e) {
        throw Error("Error while getting classes")
    }
}

exports.getClassesByStudentReserve = async function (tokenSubject) {
    console.log("Getting reserves by student id...")
    const reserves = await reserveService.getReservesByStudentId(tokenSubject);

    console.log("Reserves: " + JSON.stringify(reserves));
    let classes = [];

    console.log("Getting classes by student reserve...")

    try {
        for (let i = 0; i < reserves.length; i++) {
            console.log("Getted", i + 1, "classes...");
            classes.push(await Class.findById(reserves[i].classId));
        }
        return classes;
    } catch (e) {
        throw Error("Error while getting classes by student reserve")
    }
}

exports.getClassesNotReservedByStudent = async function (tokenSubject) {
    console.log("Getting reserves by student id...")
    const reserves = await reserveService.getAllReservesByStudentId(tokenSubject);

    const allClasses = await this.getAllPublishedClasses();
    const allClassesIds = allClasses.map((item) => item._id.toString());

    const reservesClassesIds = reserves.map((item) => item.classId.toString());
    console.log("All Classes: " + JSON.stringify(allClassesIds));
    console.log("Reserves Classes: " + JSON.stringify(reservesClassesIds));

    let classes = [];

    console.log("Getting classes by student reserve...")
    try {
        for (let i = 0; i < allClassesIds.length; i++) {

            if (reservesClassesIds.indexOf(allClassesIds[i]) === -1) {

                console.log("Adding class",allClassesIds[i] );
                classes.push(await Class.findById(allClassesIds[i]));
            }
        }
        console.log("Classes: " + JSON.stringify(classes));

        return classes;
    } catch (e) {
        throw Error("Error while getting classes by student reserve")
    }

}

exports.getClassesByStudentReserveApproved = async function (tokenSubject) {
    console.log("Getting reserves by student id...")
    const reserves = await reserveService.getReservesApprovedByStudentId(tokenSubject);

    console.log("Reserves: " + JSON.stringify(reserves));
    let classes = [];

    console.log("Getting classes by student reserve...")

    try {
        for (let i = 0; i < reserves.length; i++) {
            console.log("Getted", i + 1, "classes...");
            classes.push(await Class.findById(reserves[i].classId));
        }
        return classes;
    } catch (e) {
        throw Error("Error while getting classes by student reserve")
    }
}
// find a class by id
exports.getClassById = async function (id) {
    console.log()
    try {
        return await Class.findById(id);
    } catch (e) {
        throw Error("Error while getting class by id")
    }
}

exports.getAllPublishedClasses = async function () {
    try {
        return await Class.find({state: true})
    } catch (e) {
        throw Error("Error while getting classes")
    }
}

exports.getAllPublishedClassesByTeacher = async function (tokenSubject) {
    try {
        return await Class.find({state: true, teacherId: tokenSubject})
    } catch (e) {
        throw Error("Error while getting classes")
    }
}

exports.getAllUnpublishedClassesByTeacher = async function (tokenSubject) {
    try {
        return await Class.find({state: false, teacherId: tokenSubject})
    } catch (e) {
        throw Error("Error while getting classes")
    }
}