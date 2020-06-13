import {Username,
   GeonamesbaseURL,
   WeatherbitCurrentweatherURL,
   WeatherbitbaseURL,
   WeatherbitAPI,
   PixabaybaseURL,
   PixabayAPI } from './apikey';

var today = new Date();
/**Geonames API credentials */
let username =Username;
let geonamesbaseURL =GeonamesbaseURL;

/**weatherbit API credentials */
let weatherbitCurrentweatherURL =WeatherbitCurrentweatherURL;
let weatherbitbaseURL =WeatherbitbaseURL;
let weatherbitAPI = WeatherbitAPI;

/**pixabay API credentials */
let pixabaybaseURL = PixabaybaseURL;
let pixabayAPI = PixabayAPI;

/**Event handler for Generate button */
document.addEventListener('DOMContentLoaded', function () {
document.getElementById('generate').addEventListener('click',performaction);
});

/**Get weather details from weather API */
const getCordinates = async(city)=>{
 if(city ==""){
   alert("please enter city");
    return;
  }else{
 const getresponse = await fetch(geonamesbaseURL+"name="+city+ "&maxRows=1&username=" +username);    
 //const getData = await fetch(baseURL+'q='+zip+'&appid='+apiKey);
     try{
       const getData = await getresponse.json();
   
       document.getElementById("latitude").innerHTML = getData.geonames[0].lat;
      document.getElementById("longitude").innerHTML = getData.geonames[0].lng;  
      document.getElementById("country").innerHTML = getData.geonames[0].countryName;    
     }
    catch(error){
    console.log("i am error", error);
    }
   }
   
 }

/*POST DATA (user entered only) to server*/
const postData = async ( url = '', data = {})=>{

  const response = await fetch('http://localhost:8081/travel' ,{
   method: 'POST', // *GET, POST, PUT, DELETE, etc.
   credentials: 'same-origin', // include, *same-origin, omit
   headers: {
       'Content-Type': 'application/json',
   },
   body: JSON.stringify(data),  // body data type must match "Content-Type" header        
  });

   try {
          const newData = await response;
          return newData;
          }catch(error) {
          console.log("i am error", error);
        // appropriately handle the error
   }
}


/** GEtting data from weatherbit*/
const getWeatherDetails = async(longt,latd)=>{
    const Edate = document.getElementById("mydate").value;
   
    const dateToday = new Date().toISOString().slice(0,10);

  /**Calculating days between user entered date and current date */
    const date1 = new Date(Edate);
    const date2 = new Date(dateToday);
  
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
   

    /**if date enetered is less the 16 days */
    if(diffDays<16) {
       const getweatherbitresponse = await fetch(weatherbitbaseURL+"?key="+weatherbitAPI+"&lat="+latd+"&lon="+longt);    
        try{
            const getdetData = await getweatherbitresponse.json();
            console.log(getdetData.data[diffDays]);
            document.getElementById("temper").innerHTML = getdetData.data[diffDays].temp;
            document.getElementById("precip").innerHTML = getdetData.data[diffDays].precip;
            document.getElementById("snow").innerHTML = getdetData.data[diffDays].snow;
            return
        }
          catch(error){
            console.log("i am error", error);
        }
      }
     /** If date entered is more than 16 days */
     else if(diffDays>=16){
       alert("The start date you entered is more than 16 days from today.So the weather prediction might be inaccurate.Here displays the current weather forcast");
      const getweatherbitresponse = await fetch(weatherbitCurrentweatherURL+"?lat="+latd+"&lon="+longt+"&key="+weatherbitAPI);   
        try{
            const getdetData = await getweatherbitresponse.json();
            console.log(getdetData);
            document.getElementById("temper").innerHTML = getdetData.data[0].app_temp;
            document.getElementById("precip").innerHTML = getdetData.data[0].precip;
            document.getElementById("snow").innerHTML = getdetData.data[0].snow;
           }
          catch(error){
            console.log("i am error", error);
            }
        } 
 
    }



      /**Get Image */
      const getImage = async(city,country)=>{
        if(city ==""){
          alert("please enter city");
          return;
        }else{
        const getimageresponse = await fetch(pixabaybaseURL+"?key="+pixabayAPI+"&q="+city+"&image_type=photo");    
      
            try{
              const getimageData = await getimageresponse.json();
            // console.log(getimageData);
              if (getimageData.hits.length == 0){
                alert("Image of "+city+" is unavailable");
              }else{
              const imageURL =getimageData.hits[0].largeImageURL;
            
              document.getElementById("image").innerHTML = "<img src ="+imageURL+" width = 50%>";
              
            
            }
          }
          catch(error){
          console.log("i am error", error);
          }
          }
        }
     
      /**On button click */
function performaction(){
 const city = document.getElementById("city").value;
 const date = document.getElementById("mydate").value;
 const Ldate = document.getElementById("myenddate").value;
 
/** Calculating difference between Trip start date and end date */

const datestart = new Date(date);
const dateend = new Date(Ldate);


const tripdiffTime = Math.abs(dateend - datestart);
const tripdiffDays = Math.ceil(tripdiffTime / (1000 * 60 * 60 * 24)); 
 
 document.getElementById("totrdy").innerHTML = tripdiffDays;

 if(date == "" || city ==""){
   alert('please enter date & City');
   return;
 }else{
   getCordinates(city).then(function(country){
    postData('http://localhost:8081/travel',{Date:date});
    getImage(city,country);
  }).then(function(){
    const long = document.getElementById("longitude").innerHTML;
    const lat = document.getElementById("latitude").innerHTML;
   getWeatherDetails(long,lat)

  })
}
}


export { performaction,
  getCordinates,
  postData,
  getWeatherDetails
 }