var today = new Date();

let username ='divyavarun';
let geonamesbaseURL ="http://api.geonames.org/searchJSON?";

let weatherbitCurrentweatherURL ="http://api.weatherbit.io/v2.0/current";
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
  const Edate = document.getElementById("mydate").value;
  const dateToday = new Date().toISOString().slice(0,10);
 
 const date1 = new Date(Edate);
 const date2 = new Date(dateToday);
 const diffTime = Math.abs(date2 - date1);
 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
 alert(diffDays + " days");

 /**Less the 7 days */
 if(diffDays<=7){
alert('hey its less than 7');
const getweatherbitresponse = await fetch(weatherbitCurrentweatherURL+"?lat="+latd+"&lon="+longt+"&key="+weatherbitAPI);   
  try{
      const getdetData = await getweatherbitresponse.json();
      console.log(getdetData);
      document.getElementById("mxtemper").innerHTML = getdetData.data[0].max_temp;
      document.getElementById("mintemper").innerHTML = getdetData.data[0].min_temp;
      document.getElementById("precip").innerHTML = getdetData.data[0].precip;
      document.getElementById("snow").innerHTML = getdetData.data[0].snow;
      document.getElementById("mxtemper").innerHTML = getdetData.data[0].app_max_temp;
    }
    catch(error){
      console.log("i am error", error);
    }
      } 
/**between 7 and 16 days */
      else if (diffDays>7 && diffDays <=16) {
        alert('more than 7');
      const getweatherbitresponse = await fetch(weatherbitbaseURL+"?key="+weatherbitAPI+"&lat="+latd+"&lon="+longt);    
        try{
         
            const getdetData = await getweatherbitresponse.json();
         
            console.log(getdetData.data[diffDays]);
            document.getElementById("mxtemper").innerHTML = getdetData.data[diffDays].max_temp;
            document.getElementById("mintemper").innerHTML = getdetData.data[diffDays].min_temp;
            document.getElementById("precip").innerHTML = getdetData.data[diffDays].precip;
            document.getElementById("snow").innerHTML = getdetData.data[diffDays].snow;
            document.getElementById("mxtemper").innerHTML = getdetData.data[diffDays].app_max_temp;
            return
            
         }
          catch(error){
          console.log("i am error", error);
        }
     }
     /** More than 16 days */
     else if(diffDays>16){
       alert('Weather is inaccurate if the date entered is more than 16 days from now');

     }
   
    /* document.getElementById("latitude").innerHTML = getdetData.geonames[0].lat;
     document.getElementById("latitude").innerHTML = getdetData.geonames[0].lat;
     document.getElementById("latitude").innerHTML = getdetData.geonames[0].lat;*/
     

    }


function performaction(){
 const city = document.getElementById("city").value;
 const date = document.getElementById("mydate").value;
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