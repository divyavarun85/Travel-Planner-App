let username ='divyavarun';
let geonamesbaseURL ="http://api.geonames.org/searchJSON?";
let weatherbitAPI = '1192a6cfe0c3400eafe550b3a620c0ff';

document.getElementById('generate').addEventListener('click',performaction);


/**Get weather details from weather API */
const getWeatherDetails = async(city)=>{
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
  alert(url);
 console.log(data);
 const response = await fetch('http://localhost:8080/travel' ,{
   method: 'POST', // *GET, POST, PUT, DELETE, etc.
   credentials: 'same-origin', // include, *same-origin, omit
   headers: {
       'Content-Type': 'application/json',
   },
   body: JSON.stringify(data),  // body data type must match "Content-Type" header        
  });

   try {
          const newData = await response;
           console.log(newData);
          return newData
          }catch(error) {
          console.log("i am error", error);
        // appropriately handle the error
   }
}


function performaction(){
 const city = document.getElementById("city").value;
 const date = document.getElementById("mydate").value;
 console.log(date);
  getWeatherDetails(city).then(function(){
    postData('http://localhost:8080/travel',{Date:date});
  })
}
export { performaction }