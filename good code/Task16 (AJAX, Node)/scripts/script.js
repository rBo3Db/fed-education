window.onload = function() { 
  var london = document.getElementById("london");
  london.onclick = function () {
    let city = "London";
    updatecity(city);
  }
  var ryazan = document.getElementById("ryazan");
  ryazan.onclick = function () {
    let city = "Ryazan";
    updatecity(city);
  }
  var ny = document.getElementById("ny");
  ny.onclick = function () {
    let city = "New York";
    updatecity(city);
  }
  var moscow = document.getElementById("moscow");
  moscow.onclick = function () {
    let city = "Moscow";
    updatecity(city);
  }
  var vladivostok= document.getElementById("vladivostok");
  vladivostok.onclick = function () {
    let city = "vladivostok";
    updatecity(city);
  }
  var dubai = document.getElementById("dubai");
  dubai.onclick = function () {
    let city = "dubai";
    updatecity(city);
  }
  var tokyo = document.getElementById("tokyo");
  tokyo.onclick = function () {
    let city = "tokyo";
    updatecity(city);
  }

  function updatecity(city) {
    var rootUrl;
    if (city === "dubai" || city === "tokyo" || city === "vladivostok") {
      rootUrl = 'http://localhost:3000/';
    } else {
      rootUrl = "http://api.openweathermap.org/data/2.5/forecast?appid=e33262cd6a432b1c3dc5181a736dbc41&q=";
    }
    var url = rootUrl + encodeURIComponent(city);
    fetch(url)
      .then(async function(response) {
        var myjson = await response.json();
        return myjson;
      })
      .then(update)
      .catch(error);  
  }

  function error(error) {
  console.log(error); 
  }

  function update(myjson) {
    var h1 = document.getElementById("h1");
    var p = document.getElementById("p");
    var pp = document.getElementById("pp");
    var today_temp = document.querySelector(".today-widget__value");
    var today_img = document.querySelector(".today-widget__icon-wrapper");
    var img = document.querySelectorAll(".daily-row__icon-wrapper");
    var degree_high = document.querySelectorAll(".degree-high");
    var degree_min = document.querySelectorAll(".degree-min");
    var precipitation = document.getElementById("precipitation");
    var humidity = document.getElementById("humidity");
    var pressure = document.getElementById("pressure");
    var daily_pressure = document.querySelectorAll(".daily-row__pollen");
    var wind = document.getElementById("wind");
    var next_date = document.querySelectorAll(".daily-row__day");
    var temp_max = [];
    var temp_min = [];
    var weather_id = [];
    var day_pressure = [];
    var weekaday = [];
    
    var date = new Date();
    
    var day = (date.toLocaleString("en", {day: 'numeric'}))%10;
    var hour = date.toLocaleString("ru", {hour: 'numeric'});
    
    pp.innerHTML = myjson.list[0].weather[0].main;
    h1.innerHTML = myjson.city.name;
    p.innerHTML = date.toLocaleString('en', {weekday: 'long'})+ ', ' + date.toLocaleString("en", {month: 'long', day: 'numeric'}) + endOfday(day);

    function endOfday(day) {
      if(day == 2){
        return "nd";
      } else if(day == 1){
        return "st"; 
      } else if(day == 3){
          return "rd";
        } else return "th";
    }                                                                                                                                                                                                                                                                              
    today_temp.innerHTML = Math.round(myjson.list[0].main.temp) + "°K";
    precipitation.innerHTML = "Precipitation: " + myjson.list[0].clouds.all + " %";
    humidity.innerHTML = "Humidity: " + myjson.list[0].main.humidity + " %";
    pressure.innerHTML = "Pressure: " +  Math.round(myjson.list[0].main.pressure) + " hPA";
    wind.innerHTML = "Wind: " +  Math.round(myjson.list[0].wind.speed) + " m/s";
    var today_weather = myjson.list[0].weather[0].id;
    if (today_weather == 800){
      if((hour == 21)||(hour <= 3)){
        today_img.innerHTML = "<img class='today-widget__icon' src='img/38.png'/>";
      } else
        today_img.innerHTML = "<img class='today-widget__icon' src='img/33.png'/>";
    } else if (today_weather == 801){
      if((hour == 21)||(hour <= 3)){
        today_img.innerHTML = "<img class='today-widget__icon' src='img/13.png'/>";
      } else
        today_img.innerHTML = "<img class='today-widget__icon' src='img/32.png'/>";  
    } else if (today_weather == 802){
      today_img.innerHTML = "<img class='today-widget__icon' src='img/37.png'/>";  
    } else if ((today_weather == 803)||(today_weather == 804)){
      today_img.innerHTML = "<img class='today-widget__icon' src='img/37_1.png'/>";  
    } else if (Math.trunc(today_weather/100) == 3){
      today_img.innerHTML = "<img class='today-widget__icon' src='img/34.png'/>";  
    } else if (Math.trunc(today_weather/100) == 5){
      if((hour == 21)||(hour <= 3)){
        today_img.innerHTML = "<img class='today-widget__icon' src='img/12.png'/>";
      } else
      today_img.innerHTML = "<img class='today-widget__icon' src='img/25.png'/>";  
    } else if (Math.trunc(today_weather/100) == 2){
      if((hour == 21)||(hour <= 3)){
        today_img.innerHTML = "<img class='today-widget__icon' src='img/22.png'/>";
      } else
        today_img.innerHTML = "<img class='today-widget__icon' src='img/27.png'/>";  
    } else if (Math.trunc(today_weather/100) == 6){
      if((hour == 21)||(hour <= 3)){
        today_img.innerHTML = "<img class='today-widget__icon' src='img/17.png'/>";
      } else
        today_img.innerHTML = "<img class='today-widget__icon' src='img/24.png'/>";  
    } else if (Math.trunc(today_weather/100) == 7){
      today_img.innerHTML = "<img class='today-widget__icon' src='img/21.png'/>";  
    };              
    for (var i = 0; i <= 32; i+=8){ 
      for (var j = 0; j <= 4; j++){
        weather_id[i] = myjson.list[i].weather[0].id;
        if ((weather_id[i] == 800)&&(j*8 == i)){
          img[j].innerHTML = "<img class='daily-row__icon' src='img/33.png'/>";
        } else if ((weather_id[i] == 801)&&(j*8 == i)){
          img[j].innerHTML = "<img class='daily-row__icon' src='img/32.png'/>";  
        } else if ((weather_id[i] == 802)&&(j*8 == i)){
          img[j].innerHTML = "<img class='daily-row__icon' src='img/37.png'/>";  
        } else if (((weather_id[i] == 803)||(weather_id[i] == 804))&&(j*8 == i)){
          img[j].innerHTML = "<img class='daily-row__icon' src='img/37_1.png'/>";  
        } else if ((Math.trunc(weather_id[i]/100) == 3)&&(j*8 == i)){
          img[j].innerHTML = "<img class='daily-row__icon' src='img/34.png'/>";  
        } else if ((Math.trunc(weather_id[i]/100) == 5)&&(j*8 == i)){
          img[j].innerHTML = "<img class='daily-row__iconn' src='img/25.png'/>";  
        } else if ((Math.trunc(weather_id[i]/100) == 2)&&(j*8 == i)){
          img[j].innerHTML = "<img class='daily-row__icon' src='img/27.png'/>";  
        } else if ((Math.trunc(weather_id[i]/100) == 6)&&(j*8 == i)){
          img[j].innerHTML = "<img class='daily-row__icon' src='img/24.png'/>";  
        } else if ((Math.trunc(weather_id[i]/100) == 7)&&(j*8 == i)){
          img[j].innerHTML = "<img class='daily-row__icon' src='img/21.png'/>";  
        };
      }                       
    }   
    for (var k = 0; k <= 32; k+=8){         
      for (var l = 0; l <= 4; l++){
        temp_max[k] = myjson.list[k].main.temp_max;
        temp_min[k] = myjson.list[k].main.temp_min;
        day_pressure[k] = myjson.list[k].main.pressure;
        next_date[0].innerHTML = "Today";
        weekaday[k] = new Date(myjson.list[k].dt_txt);
        if (l*8 == k){
          degree_high[l].innerHTML = Math.round(temp_max[k]) + "°";
          degree_min[l].innerHTML = Math.round(temp_min[k]) + "°";
          daily_pressure[l].innerHTML = "<p>Pressure: "+ Math.round(day_pressure[k])+ " hPA</p> ";
          next_date[l].innerHTML = weekaday[k].toLocaleString('en', {weekday: 'long'});
        }            
      }
    }
  }
}
