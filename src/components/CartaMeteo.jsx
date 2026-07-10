function formattaOra(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function CartaMeteo({ dati }) {
  return (
    <div>
      <h1>
        Meteo di {dati.name}, {dati.sys.country}
      </h1>
      <img
        src={`https://openweathermap.org/img/wn/${dati.weather[0].icon}@2x.png`}
        alt={dati.weather[0].description}
      />
      <p>{Math.round(dati.main.temp)}°C</p>
      <p>Percepita: {Math.round(dati.main.feels_like)}°C</p>
      <p>
        Min {Math.round(dati.main.temp_min)}°C / Max{" "}
        {Math.round(dati.main.temp_max)}°C
      </p>
      <p>{dati.weather[0].description}</p>
      <ul>
        <li>💧 Umidità: {dati.main.humidity}%</li>
        <li>💨 Vento: {dati.wind.speed} m/s</li>
        <li>🌡️ Pressione: {dati.main.pressure} hPa</li>
        <li>☁️ Nuvolosità: {dati.clouds.all}%</li>
        <li>👁️ Visibilità: {dati.visibility / 1000} km</li>
      </ul>
      <p>🌅 Alba: {formattaOra(dati.sys.sunrise)}</p>
      <p>🌇 Tramonto: {formattaOra(dati.sys.sunset)}</p>
      {dati.rain && <p>🌧️ Pioggia: {dati.rain["1h"]} mm nell'ultima ora</p>}
    </div>
  );
}

export default CartaMeteo;
