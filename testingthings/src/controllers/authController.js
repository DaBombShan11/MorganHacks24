const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const kidsModel = require('../models/kid');
const Nurse = require('../models/nurse');

const registerNurse = async (req, res) => {
    
    try {
        const { name, email, password, username, school } = req.body;

        const existingNurse = await Nurse.findOne({ email });
        if (existingNurse) {
            return res.status(400).json({ message: 'A Nurse with this email already exists!' });
        }

        const uniqueUsername = await Nurse.findOne({ username });
        if (uniqueUsername) {
            return res.status(400).json({ message: 'Someone Already has this Username!' });
        }

        const kids = await kidsModel.find({ school: school }).exec();
        if (kids.length === 0) {
            return res.status(400).json({ message: 'No kids in this school' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nurse = new Nurse({
            name,
            username,
            email,
            password: hashedPassword,
            school,
            students: kids
        });

        await nurse.save();

        const token = jwt.sign({ nurseId: nurse._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginNurse = async (req, res) => {
    try {
        const { email, password } = req.body;
        const nurse = await Nurse.findOne({ email: email });
        console.log(nurse);
        if (!nurse) return res.status(400).json({ message: 'Invalid email or password' });

        const isPasswordValid = await bcrypt.compare(password, nurse.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ nurseId: nurse._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { registerNurse, loginNurse };