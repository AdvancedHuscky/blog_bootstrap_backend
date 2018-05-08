const mongoose = require('mongoose')
let userSchema = require('../schemas/users')

module.exports = mongoose.model('User',userSchema);