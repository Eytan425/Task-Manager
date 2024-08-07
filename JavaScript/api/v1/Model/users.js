const mongoose = require('mongoose');
mongoose.pluralize(null);



const User_Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Email: { type: String, trim: true, required: [true, 'DefaultEmail'] },
    UserName: { type: String, trim: true, required: [true, 'DefaultUser'] },
    UserPassword: { type: String, trim: true, required: [true, 'DefaultPassword'] },
    PhoneNumber: { type: String, trim: true, required: [true, 'DefaultPhone'] },
    
});

module.exports = mongoose.model('task', User_Schema);


