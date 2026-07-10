import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMeteoCorrente } from "../api/MeteoApi.js";

function CartaMini({ nome }) {
  const [dati, setDati] = useState(null);

  useEffect(() => {
    getMeteoCorrente(nome)
      .then((risultato) => setDati(risultato))
      .catch(() => setDati(null));
  }, [nome]);

  if (!dati) return null;

  return (
    <Link to={`/citta/${nome}`} className="carta-mini">
      <strong>{dati.name}</strong>
      <img
        src={`https://openweathermap.org/img/wn/${dati.weather[0].icon}@2x.png`}
        alt={dati.weather[0].description}
      />
      <span className="mini-temp">{Math.round(dati.main.temp)}°C</span>
      <span className="mini-descrizione">{dati.weather[0].description}</span>
      <div
        className="mini-barra"
        role="img"
        aria-label={`Umidità ${dati.main.humidity}%`}
      >
        <span>💧</span>
        <div className="traccia-mini">
          <div
            className="riempimento-mini"
            style={{ width: `${dati.main.humidity}%` }}
          />
        </div>
        <span>{dati.main.humidity}%</span>
      </div>
    </Link>
  );
}

export default CartaMini;
