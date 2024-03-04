let search=document.getElementById('search');
let searchbtn=document.getElementById('searchbtn');
let temp=document.getElementById('temp');
let cityName=document.getElementById('city');
let humidity=document.getElementById('humidity');
let wind=document.getElementById('wind');
let weatherImg=document.getElementById('weatherimg');
let errorHandle=document.getElementById('errorM');
let contianer=document.querySelector('.contain1');
let count=0;
contianer.style.display='none';
function showWeather(weatherResult){
      errorHandle.innerHTML='';
      temp.innerHTML=`${weatherResult.main.temp}°C`
      cityName.innerHTML=`${weatherResult.name}`
      humidity.innerHTML=`${weatherResult.main.humidity}%`
      wind.innerHTML=`${weatherResult.wind.speed}Km/Hr`
    if(weatherResult.weather[0].main=='Clouds')
        weatherImg.src='./images/clouds.png';
    else if(weatherResult.weather[0].main=='Clear')
        weatherImg.src='./images/clear.png';
    else if(weatherResult.weather[0].main=='Snow')
        weatherImg.src='./images/snow.png';
    else if(weatherResult.weather[0].main=='Rain')
        weatherImg.src='./images/rain.png';
    else if(weatherResult.weather[0].main=='Mist')
        weatherImg.src='./images/mist.png';
    else if(weatherResult.weather[0].main=='Drizzle')
        weatherImg.src='./images/drizzle.png';
}
function getWeatherInfo(city){
    const weather=async()=>{ 
     const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a5e1f5a254b0fb80d2d6c35aab686717&units=metric`
    try{
        contianer.style.display='block';
        let response =await fetch(url);
        if(response.status==404){
            errorHandle.innerHTML='City not found. Please enter a valid city name.';  
            contianer.style.display='none';
        }
        else{
            let result= await response.json();
            showWeather(result);
        }
    }
    catch(error){
        errorHandle.innerHTML='Network error!! Please reconnect to better network.';  
        contianer.style.display='none';
        }
    }
    weather();
}
function searchWeather(){
    let cityName=search.value;
    console.log(cityName)
    getWeatherInfo(cityName);
}
searchbtn.onclick=()=>searchWeather();
