const kidsModel = require('../models/kid');
const Nurse = require('../models/nurse');


// function that is async
const getListofKids = async (req, res) => {
    try {
        const nurse = await Nurse.findById(req.nurseId).exec();
        if (!nurse) return res.status(404).json({ message: 'User/Nurse was not found' });
        
        const students = [];

        nurse.students.forEach(async (studentId) => {
            const student = await kidsModel.findById(studentId).exec();
            students.push(student);
        });

        res.status(200).json({ students });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getListofKids };
