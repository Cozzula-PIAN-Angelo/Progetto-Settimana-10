import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Droplets } from "lucide-react";
import { getMeteoCorrente } from "../api/MeteoApi.js";
import { urlIconaMeteo } from "../assets/iconeMeteo.js";

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
        src={urlIconaMeteo(dati.weather[0].icon)}
        alt={dati.weather[0].description}
      />
      <span className="mini-temp">{Math.round(dati.main.temp)}°C</span>
      <span className="mini-descrizione">{dati.weather[0].description}</span>
      <div
        className="mini-barra"
        role="img"
        aria-label={`Umidità ${dati.main.humidity}%`}
      >
        <Droplets size={14} />
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
