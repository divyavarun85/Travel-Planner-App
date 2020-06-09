var today = new Date();

let username ='divyavarun';
let geonamesbaseURL ="http://api.geonames.org/searchJSON?";

let weatherbitCurrentweatherURL ="http://api.weatherbit.io/v2.0/current";
let weatherbitbaseURL ="http://api.weatherbit.io/v2.0/forecast/daily";

let weatherbitAPI = '1192a6cfe0c3400eafe550b3a620c0ff';


let pixabaybaseURL = "https://pixabay.com/api/";
let pixabayAPI = "16947604-4a7a0accc8b9117d01d2ecc60";


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


/** GEtting data from weatherbit*/
const getWeatherDetails = async(longt,latd)=>{
    const Edate = document.getElementById("mydate").value;
    const dateToday = new Date().toISOString().slice(0,10);

  /**Calculating days between user entered date and current date */
    const date1 = new Date(Edate);
    const date2 = new Date(dateToday);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    alert(diffDays + " days");

    /**if date enetered is less the 16 days */
    if(diffDays<16) {
      alert('less than 16');
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
      alert('more than 16');
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
const getImage = async(city)=>{
  if(city ==""){
    alert("please enter city");
     return;
   }else{
  const getimageresponse = await fetch(pixabaybaseURL+"?key="+pixabayAPI+"&q="+city+"&image_type=photo");    
 
      try{
        const getimageData = await getimageresponse.json();
        console.log(getimageData);
        if (getimageData.hits.length == 0){
          alert("Image unavailable");
          return;
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
 





function performaction(){
 const city = document.getElementById("city").value;
 const date = document.getElementById("mydate").value;
 if(date == ""){
   alert('please enter date');
   return;
 }else{
   getCordinates(city).then(function(){
    postData('http://localhost:8081/travel',{Date:date});
    getImage(city);
  }).then(function(){
    const long = document.getElementById("longitude").innerHTML;
    const lat = document.getElementById("latitude").innerHTML;
   getWeatherDetails(long,lat)

  })
}
}
export { performaction,
  getCordinates,
  postData
 }