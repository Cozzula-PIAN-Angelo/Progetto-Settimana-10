import CartaMeteo from "../components/CartaMeteo.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMeteoCorrente,
  getMeteoDaCoordinate,
  getRegione,
} from "../api/MeteoApi.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { usePreferiti } from "../hooks/usePreferiti.js";

function DettagliMeteo() {
  const { preferiti, togglePreferito } = usePreferiti();
  const { nome } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const [dati, setDati] = useState(null);
  const [regione, setRegione] = useState(null);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    setDati(null);
    setRegione(null);
    setErrore(null);
    // con le coordinate la ricerca è univoca; il nome da solo è ambiguo
    // tra località omonime (es. più "Springfield")
    const richiesta =
      lat && lon ? getMeteoDaCoordinate(lat, lon) : getMeteoCorrente(nome);
    richiesta
      .then((risultato) => {
        setDati(risultato);
        return getRegione(risultato.coord.lat, risultato.coord.lon);
      })
      .then((statoRegione) => setRegione(statoRegione))
      .catch((err) => setErrore(err.message));
  }, [nome, lat, lon]);

  if (errore) return <ErrorMessage messaggio={errore} />;
  if (!dati) return <Loader />;
  return (
    <div>
      <CartaMeteo dati={dati} nome={nome} regione={regione} />
      <button className="btn-preferito" onClick={() => togglePreferito(nome)}>
        {preferiti.includes(nome)
          ? "★ Rimuovi dai preferiti"
          : "☆ Aggiungi ai preferiti"}
      </button>
    </div>
  );
}

export default DettagliMeteo;
