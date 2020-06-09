
The project home page has two fields. 'City'-where you enter the location you are traveling to and the 'date' you are leaving.
If user enters location name and a date within 16 days from current date,displays weather forcast with the image related to the city.But if the date is more then 16days from current date, weather will not be accurate and it shows current forcast.
Service workers are configured.

Details

When user enter city name and date, longitude,latitude and country are fetched(geonames API) and the number of days between the 'date entered' and 'current date' is calculated.
If number of days is less than 16 days, then 16 day / daily forecasts will be fetched( Weatherbit API).If the number of days is more than 16 days, weather prediction will be inaccurate and hence current weather will be displayed.
Finally an image related to the city entered will be fetched(pixabay API) using location name.




