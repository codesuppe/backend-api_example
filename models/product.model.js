const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Udfyld produktnavn']
    },

    price: {
        type: Number,
        required: [true, 'Udfyld prisen']
    },

    image: {
        type: String,
        default: "photo-loading.png"
    }
})

module.exports = mongoose.model('Product', productSchema, 'products')