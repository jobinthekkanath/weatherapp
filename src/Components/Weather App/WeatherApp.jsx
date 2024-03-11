import React,{useState} from 'react'
import './WeatherApp.css'
import search_icon from '../Asset/search.png';
import clear_icon from '../Asset/clear.png';
import cloud_icon from '../Asset/cloud.png';
import drizzle_icon from '../Asset/drizzle.png';
import rain_icon from '../Asset/rain.png';
import snow_icon from '../Asset/snow.png';
import wind_icon from '../Asset/wind.png';
import humidity_icon from '../Asset/humidity.png';

function WeatherApp() {

    let api_key="dd94f859a0e52d6e4767fddf735f04a7";
    const [wicon, setWicon] = useState(cloud_icon);
    const [errorMessage, setErrorMessage] = useState(false);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value === "") {
            setErrorMessage(true);
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    
        try {
            
            let response = await fetch(url)
            let data = await response.json();
            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");
            const temprature = document.getElementsByClassName("weather-temp")
            const location = document.getElementsByClassName("weather-location")

            if (data.main && data.main.humidity) {
                humidity[0].innerHTML = data.main.humidity + "%";
            } else {
                humidity[0].innerHTML = "N/A";

                   
            }
    
            if (data.wind && data.wind.speed) {
                wind[0].innerHTML = Math.floor(data.wind.speed) + "Km/h";
            } else {
                wind[0].innerHTML = "N/A";
            }
    
            if (data.main && data.main.temp) {
                temprature[0].innerHTML = Math.floor(data.main.temp) + "°C";
            } else {
                temprature[0].innerHTML = "N/A";
                
            }
    
            if (data.name) {
                location[0].innerHTML = data.name;
            } else {
                location[0].innerHTML = "N/A";
            }
    
            if (data.weather && data.weather[0] && data.weather[0].icon) {
                const icon = data.weather[0].icon;
                if (icon === "01d" || icon === "01n") {
                    setWicon(clear_icon);
                } else if (icon === "02d" || icon === "02n") {
                    setWicon(cloud_icon);
                } else if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n") {
                    setWicon(drizzle_icon);
                } else if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n") {
                    setWicon(rain_icon);
                } else if (icon === "13d" || icon === "13n") {
                    setWicon(snow_icon);
                } else {
                    setWicon(clear_icon);
                }
            } else {
                setWicon(clear_icon);
            }
            if (data.cod === "404") {
                // Display error message when city is not found
                setErrorMessage(true);
                return;
            }
            setErrorMessage(false);
           
        }
        
        catch (error) {
            console.error("Error fetching weather data:", error);
            setErrorMessage(true);
           
        }
    }
    
    

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Search' />
            <div className='search-icon' onClick={()=>{search()}}>
                <img src={search_icon}  alt=''  />
            </div>
        </div>
        {errorMessage && <div className="error" style={{ color: "red",fontSize:"22px",textAlign:"center" }}>Please enter a valid place name</div>}
        <div className="weather-image">
            <img src={wicon} alt=''   />
        </div>
        <div className='weather-temp'>24°C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate">18 km/hr</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp
