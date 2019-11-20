const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = Schema({
    ten: {
        type: String,
        trim: true,
        require: 'Vui long nhap username'
    },
    gioitinh: {
        type: String,
        trim: true
    },
    ngaysinh: {
        type: String,
        trim: true   
    },
    diachi: {
        type: String,
        trim: true
    },
    dienthoai: {
        type: String,
        trim: true
    },
    vung: {
        type: String,
        trim: true
    },
    acc_id: {
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    }
})
module.exports = mongoose.model('users', userSchema);