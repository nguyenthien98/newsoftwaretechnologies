const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const productSchema = Schema({
    name: {
        type: String,
        trim: true,
        require: 'vui long nhap ten san pham'
    },
    soluong: {
        type: Number,
        trim: true
    },
    gia: {
        type: Number,
        trim: true
    },
    ngaysx: {
        type: String,
        trim: true
    },
    baohanh: {
        type: Number,
        trim: true
    },
    mota: {
        type: String,
        trim: true
    },
    anh: {
        type: String,
        trim: true
    },
    cate_id:{
        type: Schema.Types.ObjectId,
        ref: 'categories'
        // ref: 'Category'
    }
    // category: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category'
    // }
})
module.exports = mongoose.model('products', productSchema);