import { useState } from "react";
import { Dices, Coins } from "lucide-react";
import { getPrevisioneDomani } from "../api/MeteoApi.js";
import { useMonete } from "../hooks/useMonete.js";
import { urlIconaMeteo } from "../assets/iconeMeteo.js";

const OPZIONI = [
  { id: "sereno", nome: "Sereno", quota: 2, icona: "01d" },
  { id: "nuvoloso", nome: "Nuvoloso", quota: 2.5, icona: "04d" },
  { id: "pioggia", nome: "Pioggia", quota: 3.5, icona: "10d" },
  { id: "neve", nome: "Neve", quota: 10, icona: "13d" },
];

function categoriaMeteo(main) {
  if (main === "Clear") return "sereno";
  if (main === "Snow") return "neve";
  if (["Rain", "Drizzle", "Thunderstorm"].includes(main)) return "pioggia";
  return "nuvoloso"; // Clouds, Mist, Fog, ecc.
}

function ScommessaMeteo({ lat, lon, nomeCitta }) {
  const { monete, setMonete } = useMonete();
  const [scelta, setScelta] = useState(null);
  const [puntata, setPuntata] = useState(10);
  const [stato, setStato] = useState("pronto"); // pronto | attesa | esito
  const [esito, setEsito] = useState(null);
  const [errore, setErrore] = useState(null);

  async function scommetti() {
    const opzione = OPZIONI.find((o) => o.id === scelta);
    if (!opzione || puntata < 1 || puntata > monete) return;
    setStato("attesa");
    setErrore(null);
    setMonete((m) => m - puntata);
    try {
      // la suspense: il risultato arriva insieme al timer, mai prima
      const [previsione] = await Promise.all([
        getPrevisioneDomani(lat, lon),
        new Promise((resolve) => setTimeout(resolve, 2200)),
      ]);
      const categoria = categoriaMeteo(previsione.weather[0].main);
      const vinto = categoria === scelta;
      const vincita = vinto ? Math.round(puntata * opzione.quota) : 0;
      if (vinto) setMonete((m) => m + vincita);
      setEsito({ vinto, vincita, categoria, previsione });
      setStato("esito");
    } catch (err) {
      // scommessa annullata: restituiamo la puntata
      setMonete((m) => m + puntata);
      setErrore(err.message);
      setStato("pronto");
    }
  }

  function giocaAncora() {
    setScelta(null);
    setEsito(null);
    setStato("pronto");
  }

  return (
    <div className="scommessa">
      <h2>
        <Dices size={20} /> Scommetti sul domani
      </h2>
      <p className="sottotitolo">
        Che tempo farà domani a {nomeCitta}? Punta le tue monete!
      </p>
      <div className="saldo-monete">
        <Coins size={16} /> {monete} monete
      </div>

      {stato === "pronto" && (
        <>
          <div className="opzioni-scommessa">
            {OPZIONI.map((opzione) => (
              <button
                key={opzione.id}
                className={`opzione-scommessa ${scelta === opzione.id ? "selezionata" : ""}`}
                onClick={() => setScelta(opzione.id)}
              >
                <img src={urlIconaMeteo(opzione.icona)} alt="" />
                {opzione.nome}
                <span className="quota">x{opzione.quota}</span>
              </button>
            ))}
          </div>
          {monete > 0 ? (
            <div className="riga-puntata">
              <label htmlFor="puntata">Puntata:</label>
              <input
                id="puntata"
                type="number"
                min="1"
                max={monete}
                value={puntata}
                onChange={(e) => setPuntata(Number(e.target.value))}
              />
              <button
                className="btn-scommetti"
                disabled={!scelta || puntata < 1 || puntata > monete}
                onClick={scommetti}
              >
                Scommetti
              </button>
            </div>
          ) : (
            <button className="btn-scommetti" onClick={() => setMonete(100)}>
              Sei al verde! Ricarica 100 monete gratis
            </button>
          )}
          {errore && <p className="errore-scommessa">{errore}</p>}
        </>
      )}

      {stato === "attesa" && (
        <div className="attesa-scommessa">
          <Dices size={48} className="dado" />
          <p>Consultiamo le stelle... e i meteorologi 🔮</p>
        </div>
      )}

      {stato === "esito" && esito && (
        <div className="esito-scommessa">
          <img
            src={urlIconaMeteo(esito.previsione.weather[0].icon)}
            alt={esito.previsione.weather[0].description}
          />
          <p>
            Domani a {nomeCitta}: <b>{esito.previsione.weather[0].description}</b>
            , circa {Math.round(esito.previsione.main.temp)}°C
          </p>
          {esito.vinto ? (
            <p className="esito-vinto">
              🎉 Hai vinto {esito.vincita} monete!
            </p>
          ) : (
            <p className="esito-perso">
              Niente da fare: era "{esito.categoria}". Hai perso {puntata}{" "}
              monete.
            </p>
          )}
          <button className="btn-scommetti" onClick={giocaAncora}>
            Gioca ancora
          </button>
        </div>
      )}
    </div>
  );
}

export default ScommessaMeteo;
