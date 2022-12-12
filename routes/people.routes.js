
const express = require( 'express' )
const router = express.Router()

//modellen for people-data
const People = require( '../models/people.model' )

const formData = require('express-form-data')
router.use(formData.parse() )          //multipart formdata

//GET til endpointet people

router.get( '/', async ( req, res ) => {

    console.log( "route people" )

    try {

        let people = await People.find()
        return res.status( 200 ).json( people )

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl" } )
    }




} )


//GET til endpointet people MED ID

router.get( '/:id', async ( req, res ) => {
    console.log( "route people GET with ID" )

    try {
        let id = req.params.id

        let udvalgtPeople = await People.findById(id)
        return res.status( 200 ).json( udvalgtPeople )

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl" } )
    }




} )

//POST til endpoint people

router.post( '/', async ( req, res ) => {

    console.log( "route people - POST" )

    try {
        let people = new People( req.body ) //opret en ny "people" ud fra daata i req body -> modellen
        await people.save(); //gem ny data i databasen

        return res.status( 201 ).json( { message: 'Ny er oprettet', created: people } )

    } catch ( error ) {
        return res.status( 400 ).json( { message: "Der er sket en fejl" } )
    }




} )

//PUT til endpoint people

router.put( '/:id', async ( req, res ) => {

    console.log( "route people - PUT" )

    try {

        let people = await People.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        if (people == null) { return res.status(404).json({ message: "data kunne ikke findes/rettes" } )}
        return res.status(201).json({ message: "der er rettet", updated: people })

    } catch (error) {

        return res.status( 400 ).json( { message: "Der er sket en fejl" } ) + error.message

    }
    


} )

router.delete( '/:id', async ( req, res ) => {

    console.log( "route people -  DELETE" )

    try {
        let people = await People.findByIdAndDelete(req.params.id)
        if (people == null) { return res.status(404).json({ message: "data kunne ikke findes/slettes" } )}
        return res.status(200).json({ message: "people er slettet" })
    } catch (error) {

        return res.status( 400 ).json( { message: "Der er sket en fejl" } ) + error.message

    }

} )


module.exports = router;