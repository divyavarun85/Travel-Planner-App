var today = new Date();

let username ='divyavarun';
let geonamesbaseURL ="http://api.geonames.org/searchJSON?";
let weatherbitbaseURL ="http://api.weatherbit.io/v2.0/forecast/daily";
let weatherbitAPI = '1192a6cfe0c3400eafe550b3a620c0ff';

document.getElementById('generate').addEventListener('click',performaction);


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



const getWeatherDetails = async(longt,latd)=>{
 const getweatherbitresponse = await fetch(weatherbitbaseURL+"?key="+weatherbitAPI+"&lat="+latd+"&lon="+longt);    
  /*https://api.weatherbit.io/v2.0/forecast/daily?key=1192a6cfe0c3400eafe550b3a620c0ff&lat=38.0&lon=-78.0&
  "HTTP: http://api.weatherbit.io/v2.0/forecast/daily";*/
      try{
        const getData = await getweatherbitresponse.json();
      
      }
     catch(error){
     console.log("i am error", error);
     }
   
  }


function performaction(){
 const city = document.getElementById("city").value;
 const date = document.getElementById("mydate").value;
 console.log(date);
  getCordinates(city).then(function(){
    postData('http://localhost:8081/travel',{Date:date});
    
  }).then(function(){
    const long = document.getElementById("longitude").innerHTML;
    const lat = document.getElementById("latitude").innerHTML;
   getWeatherDetails(long,lat)

  })
}
export { performaction,
  getCordinates,
  postData
 }