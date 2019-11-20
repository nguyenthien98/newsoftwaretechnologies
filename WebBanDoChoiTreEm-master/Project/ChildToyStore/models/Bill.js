const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const billSchema = Schema({
    acc_id: {
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    },
    prod_id: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    ngay: {
        type: String,
        trim: true
    }
})
module.exports = mongoose.model('bills', billSchema);