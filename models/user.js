const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    full_name:{
        type: String,
        required: ['Full name is required']
    },
    email:{
        type: String,
        required: ['Email is required']
    },
    password:{
        type: String,
        required: ['Password is required']
    }
}) 

module.exports = mongoose.model('User', userSchema);