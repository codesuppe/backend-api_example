const express = require('express')
require('dotenv').config()

const app = express()

//MONGO
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', ( err ) => console.log( "FEJL" + err) ) 
db.once('open', () => console.log( "Mongo-Databasen kører!" ) )

//APP

app.use(express.json())             //json 
app.use(express.urlencoded({extended: true})) //urlencoded

// ROUTES
app.get('/', async(req, res) => {
    
    console.log("Serveren svarer")

    return res.status(200).json({message: "Hej fra backenden"})

})

app.use('/people', require('./routes/people.routes'))

app.get( '*', async ( req, res ) => {
    res.status(404).json( {
        message: 'Siden findes ikke - øv'
    })
})


//LISTEN TO PORT
app.listen(process.env.PORT, () => console.log("Serveren er startet - lytter til port: " + process.env.PORT ) )