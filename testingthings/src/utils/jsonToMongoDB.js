const fs = require('fs');
const scheduleModel = require('../models/schedule');
const kidModel = require('../models/kid');

const scheduleToMongoDB = (filepath) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
        console.error('Error reading the file:', err);
        return;
        }
    
        const jsonObject = JSON.parse(data);
    
        console.log(jsonObject);

        jsonObject.schedules.forEach(element => {
            schedule = new scheduleModel({
                time: element.time,
                className: element.className,
                Teacher: element.Teacher,
                roomNumber: element.roomNumber
            });
            schedule.save();
            console.log('Schedule saved to database:', schedule);
        });
    });
}

const kidToMongoDB = (filepath) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
        console.error('Error reading the file:', err);
        return;
        }
    
        const jsonObject = JSON.parse(data);
    
        jsonObject.kids.forEach(element => {
            kid = new kidModel({
                name: element.name,
                schedule: element.schedule,
                age: element.age,
                emergancyContact: element.emergancyContact,
                school: element.school
            });
            kid.save();
            console.log('Kid saved to database:', kid);
        });
    });
}

module.exports = { scheduleToMongoDB, kidToMongoDB };