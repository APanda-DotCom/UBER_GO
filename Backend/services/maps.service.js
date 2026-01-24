const axios = require("axios");

const getCoordinates = async (address) => {
    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            
            return {
                lat: location.lat,  
                lng: location.lng
            };
        } else {
            throw new Error(`Unable to fetch coordinates: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
};


module.exports.getDistanceTime=async(origin, destination)=>{
    if(!origin ||!destination){
        throw new Error('origin and destination are required');
    }

    const apikey = process.env.GOOGLE_MAPS_API;

    const url=`https://maps.googleapis.com/maps/api/distancematrix/json?address=${encodeURIComponent(address)}&key=${apikey}`

    try{

        const response = await axios.get(url);
        if(response.data.status === 'ok'){
            if(response.data.rows[0].elements[0].status === "ZERO_RESULTS"){
                throw new Error('No routes found')
            }
            return response.data.rows[0].elements[0];
        }

    }catch(err){
        console.error(err);
        throw err;
    }
}

module.exports.getAutoSuggestion = async (input)=>{
    if(!input){
        throw new Error('query  is required')
    }
    const apikey=process.env.GOOGLE_MAPS_API;

    const url=`https://maps.googleapis.com/maps/api/place/autocomplate/json?address=${encodeURIComponent(address)}&key=${apikey}`
 
   try{

        const response = await axios.get(url);
        if(response.data.status === 'ok'){
             
            return response.data.predictions;
        }else{
                throw new Error('unable to fetch suggestions')
            }
    }catch(err){
        console.error(err);
        throw err;
    }
}



module.exports = { getCoordinates };