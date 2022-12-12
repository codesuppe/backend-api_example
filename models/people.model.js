const mongoose = require('mongoose')

const peopleSchema = new mongoose.Schema({

    firstName: {
        type: String,
        minlength: [2, 'Firstname must be at least 2 characters'],
        required: [true, 'Skriv et fornavn']
    },
    lastName: {
        type: String,
        required: [true, 'Skriv et efternavn']
    },
    email: {
        type: String,
        index: { unique: true } //der må ikke være to med samme emaii-addresse
        
    },
    
})

module.exports = mongoose.model('People', peopleSchema, 'people')

