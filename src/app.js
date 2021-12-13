const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Path  for Express Config
const public = path.join(__dirname , "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, "../templates/partials")


// Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(public))

app.get ( '' , ( request , response ) => {
    response.render("index" , {
        title : 'Weather App' ,
        name: 'Ansh Tandon'
    })
} )

app.get ( '/help' , ( request , response ) => {

    response.render( 'help' ,{
        title: 'Help',
        message: 'Contact : - anshtandonlmp@gmail.com',
        name: 'Ansh Tandon'
    })

} )

app.get ( '/about' , ( request , response ) => {
    response.render("about" , {
        title: 'About Me',
        name: 'Ansh Tandon'
    })
} )

app.get ( '/weather' , ( request , response ) => {

    
    if (!request.query.address)
    {
        response.send({
            error: "Address is required"
        })
        return
    }

    var location = request.query.address

    geocode ( location , ( error , {latitude , longitude , name} = {} ) =>
    {
        if ( error )
        {
            response.send({
                error: error
            })
            return
        }
        if ( latitude ){
        forecast ( latitude , longitude , ( error , forecastData  ) => {
    
            if ( error )
            {
                response.send({
                    error: error
                })
                return
            }
            response.send({
                location : name,
                forecast : forecastData,
                address : request.query.address
            })
        })}
    } )
    
} )

app.get ( '/products' , ( req , res ) => {

    if (!req.query.search)
    {
        res.send({
            error: "Must provide the search query"
        })
        return
    }
    res.send ({
        products: []
    })


} )

app.get ('/help/*', ( request , response ) => {
    response.render("404", {
        title: "404 Not Found",
        name : "Ansh Tandon",
        message : "Help Page Not Found"
    })
})

app.get( '*' , ( request , response ) => {
    response.render("not_found", {
        title: "404 Not Found",
        name : "Ansh Tandon",
        message : "Page Not Found"
    })
})

app.listen ( port , ( ) => {
    console.log ( " Server started at " + port )
} )