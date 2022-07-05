var weatherImg = document.getElementById("weathersvg");
var sW = screen.width;
var d = new Date();

function fillData(data){
    console.log(data);
    document.getElementById("t").innerHTML = "Temperature: " + Math.round(data.main.temp) + "&degF";
    document.getElementById("f").innerHTML = "Feels Like: " + Math.round(data.main.feels_like) + "&degF";
    document.getElementById("v").innerHTML = "Visibility: " + Math.round(data.visibility/1000) + "mi";
    document.getElementById("w").innerHTML = "High: " + Math.round(data.main.temp_max) + "&degF";
    document.getElementById("c").innerHTML = "Low: " + Math.round(data.main.temp_min) + "&degF";
    document.getElementById("h").innerHTML = "Humidity: " + data.main.humidity + "%";
    document.getElementById("weather").innerHTML = data.weather[0].description;
    switch(data.weather[0].icon) {
        case "01d": //Clear Day
            weatherImg.src = "images/weathersvg/sunny.svg";
            break;
        case "02d": //Few Clouds Day
            weatherImg.src = "images/weathersvg/partly-cloudy.svg";
            break;
        case "03d": //Scattered Clouds Day
            weatherImg.src = "images/weathersvg/partly-cloudy.svg";
            break;
        case "04d": //Broken Clouds Day
            weatherImg.src = "images/weathersvg/cloudy.svg";
            break;
        case "50d": //Mist Day
            weatherImg.src = "images/weathersvg/cloudy.svg";
            break;
        case "09d": //Shower Rain Day
            weatherImg.src = "images/weathersvg/rainy-sun.svg";
            break;
        case "10d": //Rain Day
            weatherImg.src = "images/weathersvg/rainy.svg";
            break;
        case "11d": //Thunderstorm Day
            weatherImg.src = "images/weathersvg/thunder.svg";
            break;
        case "13d": //Snow Day
            weatherImg.src = "images/weathersvg/snowy-1.svg";
            break;
    }
    document.getElementById("sun").style.transform = "translate(" + sW * (d.getHours()*60+d.getMinutes())/1440 + "px, 18px)";
    var sunriseTime = new Date(data.sys.sunrise*1000);
    var sunsetTime = new Date(data.sys.sunset*1000);
    document.getElementById("riseTime").style.transform = "translate(" + sW * (sunriseTime.getHours()*60+sunriseTime.getMinutes())/1440 + "px, 0)";
    document.getElementById("setTime").style.transform = "translate(" + sW * (sunsetTime.getHours()*60+sunsetTime.getMinutes())/1440 + "px, 0)";
    if(sunriseTime.getMinutes() < 10) var rTT = "0" + sunriseTime.getMinutes();
    else var rTT = sunriseTime.getMinutes();
    if(sunsetTime.getMinutes() < 10) var sTT = "0" + sunsetTime.getMinutes();
    else var sTT = sunsetTime.getMinutes();
    if(d.getMinutes() < 10) var cTT = "0" + d.getMinutes();
    else var cTT = d.getMinutes();
    if(d.getHours() < 13) var cTH = d.getHours();
    else var cTT = d.getHours()-12;
    if(d.getHours() < 12) var cTA = " AM";
    else var cTA = " PM";
    document.getElementById("rT").innerHTML = sunriseTime.getHours()+":"+rTT+" AM";
    document.getElementById("sT").innerHTML = sunsetTime.getHours()-12+":"+sTT+" PM";
    document.getElementById("cT").innerHTML = cTH+":"+cTT+cTA;
    document.getElementById("arrow").style.transform = "rotate(" + (-60 + data.wind.deg) + "deg)";
    document.getElementById("arrow").style.width = (20 + data.wind.speed/30 * 130) + "px";
    document.getElementById("wd").innerHTML = "Direction: " + data.wind.deg + "&deg";
    document.getElementById("ws").innerHTML = "Speed: " + data.wind.speed + "mph";
};

window.onload = function(){
    getWeather();
}

setTimeout(() => {
    d=new Date();
    getWeather();
},180000);

setTimeout(() => {
    d=new Date();
    fillData;
},5000);

function getWeather() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=minneapolis&units=imperial&appid=67975210d69828dd5fa681b6216543d0")
        .then((response) => { 
            response.json().then((data) => {
                fillData(data);
            }).catch((err) => {
                console.log(err);
            }) 
        });
}
