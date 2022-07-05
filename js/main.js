var weatherImg = document.getElementById("weathersvg");
var sW = screen.width;
var d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fillData(data){
    if(data){
        document.getElementById("t").innerHTML = "Temperature: " + Math.round(data.main.temp) + "&degF " + Math.round((data.main.temp-32)*5/9) + "&degC";
        document.getElementById("f").innerHTML = "Feels Like: " + Math.round(data.main.feels_like) + "&degF " + Math.round((data.main.feels_like-32)*5/9) + "&degC" ;
        document.getElementById("v").innerHTML = "Visibility: " + Math.round(data.visibility/1000) + "mi";
        document.getElementById("w").innerHTML = "High: " + Math.round(data.main.temp_max) + "&degF " + Math.round((data.main.temp_max-32)*5/9) + "&degC";
        document.getElementById("c").innerHTML = "Low: " + Math.round(data.main.temp_min) + "&degF " + Math.round((data.main.temp_min-32)*5/9) + "&degC";
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
        var sunriseTime = new Date(data.sys.sunrise*1000);
        var sunsetTime = new Date(data.sys.sunset*1000);
        document.getElementById("riseTime").style.transform = "translate(" + sW * (sunriseTime.getHours()*60+sunriseTime.getMinutes())/1440 + "px, 0)";
        document.getElementById("setTime").style.transform = "translate(" + sW * (sunsetTime.getHours()*60+sunsetTime.getMinutes())/1440 + "px, 0)";
        if(sunriseTime.getMinutes() < 10) var rTT = "0" + sunriseTime.getMinutes();
        else var rTT = sunriseTime.getMinutes();
        if(sunsetTime.getMinutes() < 10) var sTT = "0" + sunsetTime.getMinutes();
        else var sTT = sunsetTime.getMinutes();
        document.getElementById("rT").innerHTML = sunriseTime.getHours()+":"+rTT+" AM";
        document.getElementById("sT").innerHTML = sunsetTime.getHours()-12+":"+sTT+" PM";
        document.getElementById("arrow").style.transform = "rotate(" + data.wind.deg + "deg)";
        document.getElementById("arrow").style.fontSize = (15 + data.wind.speed/30 * 100) + "px";
        document.getElementById("arrow").style.color = "rgb(" + (255*data.wind.speed/30) + ", " + (255-255*data.wind.speed/30) + ", 0)";
        document.getElementById("wd").innerHTML = "Direction: " + data.wind.deg + "&deg";
        document.getElementById("ws").innerHTML = "Speed: " + data.wind.speed + "mph";
    }
    
    if(d.getMinutes() < 10) var cTM = "0" + d.getMinutes();
    else var cTM = d.getMinutes();
    if(d.getHours() < 13) var cTH = d.getHours();
    else var cTH = d.getHours()-12;
    if(d.getHours() < 12) var cTA = " AM";
    else var cTA = " PM";
    document.getElementById("cT").innerHTML = cTH+":"+cTM+cTA;
    if(((d.getDate()%10)==1) && (d.getDate()!=11)) {
        var att = "st";
    } 
    else if(((d.getDate()%10)==2) && (d.getDate()!=12)) {
        var att = "nd";
    } 
    else if(((d.getDate()%10)==3) && (d.getDate()!=13)) {
        var att = "rd";
    } 
    else {
        var att = "th";
    }
    document.getElementById("tD").innerHTML = DOW[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + att;
    document.getElementById("sun").style.transform = "translate(" + sW * (d.getHours()*60+d.getMinutes())/1440 + "px, 18px)";
   
};

window.onload = function(){
    getWeather();
}

setInterval(() => {
    d=new Date();
    getWeather();
},180000);

setInterval(() => {
    d=new Date();
    fillData();
},5000);

/*I DONT KNOW WHOS API KEY IM USING, PROBABLY WHOEVER MADE THE ORIGINAL HELLO KITTY SIGN
IT DOES HAVE A LIMIT OF 1000 CALLS/DAY. DO NOT EXCEED THIS AMOUNT AS I DONT
KNOW IF IT BEGINS CHARGING WHOEVER SET UP THE KEY. THAT IS WHY THERE IS TWO
INTERVAL TIMERS ABOVE, ONE TO CALL THE API AND ONE TO SMOOTHLY UPDATE THE TIME*/
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

