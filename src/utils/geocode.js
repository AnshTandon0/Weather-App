const request = require ( "request" )


const geocode = ( address , callback ) =>
{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent (address) + ".json?access_token=pk.eyJ1IjoiYW5zaHRhbmRvbiIsImEiOiJja3RxMWlibDYwYXF5Mm5xb3E1NWlmeXA1In0.md8CisvPTP2mKrpBi3famA&limit=1"

    request ( { url , json : true } , ( error , { body }  ) =>
    {
        if ( error )
        {
            callback ( "Unable to connect to location services !" , undefined )
        } else if ( body.features.length === 0 ){
            callback("Location could not be found !" , undefined )
        }else {
            callback ( undefined , {
                name: body.features[0].place_name ,
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0]
            } )
        }
    } )
}

module.exports = geocode