import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox'
import { useCallback, useState } from 'react';

const WeatherBox = () => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handeCityChange = useCallback(city => {

    setError(false)
    setPending(true);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1e91f5e2fe4ad2fdb99917793e6a09d9&units=metric`)
      .then(res => {
        if(res.status === 200) {
          return res.json()
          .then(data => {  
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            };
            setWeather(weatherData)
            setPending(false)
          });
        } else {
          setWeather('')
          setPending(false)
          setError(true)
        }
      });          
  });

  return (
    <section>
      <PickCity action={handeCityChange}/>
      { weather && <WeatherSummary {...weather}/> }
      { pending && <Loader /> } 
      { error && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;