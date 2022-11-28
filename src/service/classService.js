// Getting the Newly created Mongoose Model we just created
const Class = require("../model/class");
const jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this;

exports.createClass = async function (classParam) {
    let newClass = new Class({
        name: classParam.name,
        description: classParam.description,
        duration: classParam.duration,
        type: classParam.type,
        frequency: classParam.frequency,
        subject: classParam.subject,
        price: classParam.price,
        teacherId: classParam.teacherId,
        image: classParam.image
    })

    try {
        // Saving the Class
        let savedClass = await newClass.save();
        return jwt.sign({
            id: savedClass._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
    } catch (e) {
        // return an Error message describing the reason
        console.log(e)
        throw Error("Error while Creating Classes")
    }
}

//update class by id
exports.updateClassById = async function (id, classParam) {
    try {
        //Find the old Class Object by the Id
        var oldClass = await Class.findById(id);
        console.log("OldStudent: \n"+ JSON.stringify(oldStudent));

        if (oldClass == null){
            return false;
        }
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

// find a class by id
exports.getClassById = async function (id) {
    try {
        return await Class.findById(id);
    } catch (e) {
        throw Error("Error while getting class by id")
    }
}