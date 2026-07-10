import CartaMeteo from "../components/CartaMeteo.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMeteoCorrente } from "../api/MeteoApi.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function DettagliMeteo() {
  const { nome } = useParams();
  const [dati, setDati] = useState(null);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    setDati(null);
    setErrore(null);
    getMeteoCorrente(nome)
      .then((risultato) => setDati(risultato))
      .catch((err) => setErrore(err.message));
  }, [nome]);

  if (errore) return <ErrorMessage messaggio={errore} />;
  if (!dati) return <Loader />;
  return <CartaMeteo dati={dati} />;
}

export default DettagliMeteo;
