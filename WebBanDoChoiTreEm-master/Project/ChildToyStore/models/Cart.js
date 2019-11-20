const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const cartSchema = Schema({
    acc_id: {
        type: Schema.Types.ObjectId,
        ref: 'accounts'
    },
    prod_id: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    }
})
module.exports = mongoose.model('carts', cartSchema);