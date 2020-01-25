import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'C:/Users/user/Desktop/react projects/weathet app _using react API/weather/src/weather-icons/css/weather-icons.css';
import './App.css';
import Weather from './App_component/weather.component';
import Form from './App_component/form.component';

//api.openweathermap.org/data/2.5/weather?q=London,uk
const Api_key = "45bb89010f3c3db6da3d5d899406d2d3";


class App extends React.Component{

constructor()
{
  super();
  this.state ={
    city :undefined,
    country : undefined,
    icon :undefined,
    main :undefined,
    celsius :undefined,
    temp_max :undefined,
    temp_min :undefined,
    description : "",
    error :false
  };

  this.weatherIcon ={
thunderstrom :"wi-thunderstrom",
drizzel :"wi-sleet",
rain :"wi-strom_shower",
snow :"wi-snow",
atmospher :"wi-fog",
clear :"wi-day-sunny",
cloud :"wi-day-fog"
  
};

 

}

calCelsius (temp)
{
  let cell = Math.floor(temp -273.15);
  return cell;
};

get_weatherIcon(icons,rangeId)
{
  // eslint-disable-next-line default-case
  switch(true)
  {
    case rangeId >=200 && rangeId <=232:
      this.setState({icon:this.weatherIcon.thunderstrom});
      break;

      // eslint-disable-next-line no-duplicate-case
    case rangeId >=300 && rangeId <=321:
      this.setState({icon:this.weatherIcon.drizzel});
      break;

    case rangeId >=500 && rangeId <=531:
      this.setState({icon:this.weatherIcon.rain});
      break;

    case rangeId >=600 && rangeId <=622:
      this.setState({icon:this.weatherIcon.snow});
      break;

    case rangeId >=701 && rangeId <=781:
      this.setState({icon:this.weatherIcon.atmospher});
      break;
    case rangeId === 800:
      this.setState({icon:this.weatherIcon.clear});
      break;

      case rangeId >=801 && rangeId <=804:
        this.setState({icon:this.weatherIcon.cloud});
        break;

      default:
        this.setState({icon:this.weatherIcon.cloud});

  }
}

getWeather = async(e)=>{
  e.preventDefault();

  const city = e.target.elements.city.value;
  const country = e.target.elements.city.value;
  
if(city && country)
{
  const Api_call = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appID=${Api_key}`
  );
  const response = await Api_call.json();
  console.log(response);
  this.setState({
    city:`${response.name},${response.sys.country}`,
    celsius : this.calCelsius(response.main.temp),
    temp_min :this.calCelsius(response.main.temp_min),
    temp_max :this.calCelsius(response.main.temp_max),
    description : response.weather[0].description
  });
  
  this.get_weatherIcon(this.weatherIcon,response.weather[0].id);
  
}
else
{
  this.setState({error:true});
}
};

  render()
  {
    return(
      <div className="App">
      <Form 
      loadWeather ={this.getWeather} 
      Error = {this.state.errors}
      />

      <Weather 
      city ={this.state.city} 
      country ={this.state.country}
      temp_celsius ={this.state.celsius}
      temp_min ={this.state.temp_min}
      temp_max = {this.state.temp_max}
      description ={this.state.description}
      weatherIcon = {this.state.icon}
      />
    </div>
    );
  }
}

export default App;
