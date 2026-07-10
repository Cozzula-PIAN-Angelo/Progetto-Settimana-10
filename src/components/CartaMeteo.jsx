import AnelloDato from "./grafici/AnelloDato.jsx";
import BussolaVento from "./grafici/BussolaVento.jsx";
import BarraTemperatura from "./grafici/BarraTemperatura.jsx";
import ArcoSole from "./grafici/ArcoSole.jsx";

function CartaMeteo({ dati, nome, regione }) {
  return (
    <div className="carta-meteo">
      <h1>
        Meteo di {nome || dati.name}, {dati.sys.country}
      </h1>
      {regione && <p className="regione">{regione}</p>}
      <img
        src={`https://openweathermap.org/img/wn/${dati.weather[0].icon}@2x.png`}
        alt={dati.weather[0].description}
      />
      <p className="temp">{Math.round(dati.main.temp)}°C</p>
      <p>Percepita: {Math.round(dati.main.feels_like)}°C</p>
      <BarraTemperatura
        temp={dati.main.temp}
        min={dati.main.temp_min}
        max={dati.main.temp_max}
      />
      <p className="descrizione">{dati.weather[0].description}</p>
      <div className="griglia-grafici">
        <AnelloDato
          etichetta="Umidità"
          icona="💧"
          valore={dati.main.humidity}
        />
        <AnelloDato
          etichetta="Nuvolosità"
          icona="☁️"
          valore={dati.clouds.all}
        />
        <BussolaVento gradi={dati.wind.deg} velocita={dati.wind.speed} />
      </div>
      <ul>
        <li>🌡️ Pressione: {dati.main.pressure} hPa</li>
        <li>👁️ Visibilità: {dati.visibility / 1000} km</li>
      </ul>
      <ArcoSole alba={dati.sys.sunrise} tramonto={dati.sys.sunset} />
      {dati.rain && <p>🌧️ Pioggia: {dati.rain["1h"]} mm nell'ultima ora</p>}
    </div>
  );
}

export default CartaMeteo;
