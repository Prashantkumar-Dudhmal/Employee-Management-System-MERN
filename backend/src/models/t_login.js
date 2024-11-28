const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserCredentials = new mongoose.Schema({
    sno : {type:Number},
    username: { type: String, required: true, unique: true },
    password:{type:String,required:true},
    createdAt: { type: Date, default: Date.now }
  });
UserCredentials.plugin(AutoIncrement, { inc_field: 'sno' });


const t_login = mongoose.model('t_login', UserCredentials);
module.exports = t_login;