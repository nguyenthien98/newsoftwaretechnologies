const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const accountSchema = Schema({
    username: {
        type: String,
        trim: true,
        require: 'Vui long nhap username'
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
        
    }
})
module.exports = mongoose.model('accounts', accountSchema);