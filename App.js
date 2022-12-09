import { useState } from 'react'
import axios from 'axios';
import Student from './Student';
import './App.css';
const App = () => {
    const [records, setRecords] = useState([]);
    const [city, setCity] = useState("");

    const handlleClick = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3f2091bc177dc8b879845ec17f1eed52&units=metric`)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.main.temp);
                console.table(response.data.main.pressure);
                console.table(response.data.main.humidity);
                console.table(response.data.sys.country);
                console.table(response.data.sys.sunrise);
                console.table(response.data.sys.sunset);
                console.log(response.data.weather[0].description);
                console.log(response.data.weather[0].icon);
                console.log(response.data.weather[0].main);
                const rcds = [...records];
                const ic = response.data.weather[0].icon;
                const url = "http://openweathermap.org/img/wn/" + ic + "@2x.png";
                rcds.push({ city: city, icon: url, temp: response.data.main.temp, sunrise: response.data.sys.sunrise, sunset: response.data.sys.sunset, country: response.data.sys.country, description: response.data.weather[0].description });
                setRecords(rcds);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    const handleDel = (ind) => {
        const rcds = [...records];
        rcds.splice(ind, 1)
        setRecords(rcds)
    }
    return (
        <>
            <h1>weather app</h1>
            <input type="text" value={city} required="" onChange={(e) => setCity(e.target.value)} pattern="[a-zA-Z]" />
            <button type="submit" onClick={handlleClick}>Submit</button><br /><hr />
            {
                records.map((row, i) => {
                    return (
                        <div key={row.i} className="box">
                            <ul>
                                <li>
                                    City : {row.city}
                                </li>
                                <li>
                                    <img src={row.icon} alt={row.city} />
                                </li>
                                <li>
                                    Pressure:  {row.pressure}hPa
                                </li>
                                <li>
                                    temprature:  {row.temp}°C
                                </li>
                                <li>
                                    Humidity: {row.humidity}Ha
                                </li>
                                <li>
                                    Country: {row.country}
                                </li>
                                <li>
                                    Sunrise: {row.sunrise}
                                </li>
                                <li>
                                    Sunset: {row.sunset}
                                </li>
                                <li>
                                    Description: {row.description}
                                </li>
                            </ul>
                            <Student
                                del={() => handleDel(i)}
                            />
                        </div>
                    )
                })
            }
        </>
    );
}

export default App;
