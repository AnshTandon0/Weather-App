const request = require ('request')

const forecast = ( latitude , longitude , callback ) =>
{

    const url = "http://api.weatherstack.com/current?access_key=9f9e052c762cac68ebab9ca957a9e687&query=" + latitude + "," + longitude +"&units=m"

    request ( { url , json : true } , ( err , { body } ) => {

        if ( err ){
            console.log("Unable to connect to Forecast Service!")
        }else if ( body.current == null ){
            console.log ( "Unable to find location" )
        }else {
            callback ( undefined ,
                 "It is " + body.current.temperature + " degrees out here and The sky is " + body.current.weather_descriptions[0])
        }

    } )

} 

module.exports = forecast