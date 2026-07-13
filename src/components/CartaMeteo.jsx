import {
  Droplets,
  Cloud,
  Gauge,
  Eye,
  CloudRain,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import AnelloDato from "./grafici/AnelloDato.jsx";
import BussolaVento from "./grafici/BussolaVento.jsx";
import SoleOrizzonte from "./grafici/SoleOrizzonte.jsx";
import { urlIconaMeteo } from "../assets/iconeMeteo.js";

function CartaMeteo({ dati, nome, regione }) {
  return (
    <div className="carta-meteo">
      <h1>
        Meteo di {nome || dati.name}, {dati.sys.country}
      </h1>
      {regione && <p className="regione">{regione}</p>}
      <img
        className="icona-principale"
        src={urlIconaMeteo(dati.weather[0].icon)}
        alt={dati.weather[0].description}
      />
      <p className="temp">{Math.round(dati.main.temp)}°C</p>
      <p>Percepita: {Math.round(dati.main.feels_like)}°C</p>
      <p className="min-max">
        <span className="minima">
          <ArrowDown size={17} /> {Math.round(dati.main.temp_min)}°
        </span>
        <span className="massima">
          <ArrowUp size={17} /> {Math.round(dati.main.temp_max)}°
        </span>
      </p>
      <p className="descrizione">{dati.weather[0].description}</p>
      <div className="griglia-grafici">
        <AnelloDato
          etichetta="Umidità"
          icona={<Droplets size={15} />}
          valore={dati.main.humidity}
        />
        <AnelloDato
          etichetta="Nuvolosità"
          icona={<Cloud size={15} />}
          valore={dati.clouds.all}
        />
        <BussolaVento gradi={dati.wind.deg} velocita={dati.wind.speed} />
      </div>
      <ul>
        <li>
          <Gauge size={15} /> Pressione: {dati.main.pressure} hPa
        </li>
        <li>
          <Eye size={15} /> Visibilità: {dati.visibility / 1000} km
        </li>
      </ul>
      <SoleOrizzonte alba={dati.sys.sunrise} tramonto={dati.sys.sunset} />
      {dati.rain && (
        <p className="pioggia">
          <CloudRain size={15} /> Pioggia: {dati.rain["1h"]} mm nell'ultima ora
        </p>
      )}
    </div>
  );
}

export default CartaMeteo;
