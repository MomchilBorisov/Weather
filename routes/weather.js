var express = require('express');
var router = express.Router();
const townData = require('../json-data/bg-cities.json');
const weatherApiKey = "7b11f3d3e69001e94d9d738ccba67e2e";
const absoluteZero = 273.15;

/* GET home page. */
router.get('/chooseTown', function(req, res, next) {
  res.render('weather/chooseTown', { towns: townData, });
});


router.post('/weatherDetails', async function(req, res, next){
  const town = req.body.town;
  const coordinates = town.split(" ").map(Number);
  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${weatherApiKey}`);
  response = await response.json();
  const roundCelsius = (kelvins) => {
    return Math.round(kelvins - absoluteZero);
  };
  response.main.temp = roundCelsius(response.main.temp);
  response.main.temp_min = roundCelsius(response.main.temp_min);
  response.main.temp_max = roundCelsius(response.main.temp_max);
  response.main.feels_like = roundCelsius(response.main.feels_like);
  console.log(response);
  //res.send('hahaha');
  try{
    res.render('weather/forcast', { response });
  } catch(error){
    console.log(error);
    res.send(error);
  }
  
});
 module.exports = router;














































