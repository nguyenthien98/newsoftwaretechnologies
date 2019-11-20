const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const categorySchema = Schema({
    name: {
        type: String,
        trim: true,
        require: 'vui long nhap ten danh muc'
    }
})
module.exports = mongoose.model('categories', categorySchema);