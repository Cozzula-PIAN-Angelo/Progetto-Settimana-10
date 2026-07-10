import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import ListaCitta from "../components/ListaCitta.jsx";
import CartaMini from "../components/CartaMini.jsx";
import { usePreferiti } from "../hooks/usePreferiti.js";
import { urlIconaMeteo } from "../assets/iconeMeteo.js";
import { useTema } from "../hooks/useTema.js";

function HomeMeteo() {
  const navigate = useNavigate();
  const cittaRapide = ["Roma", "Milano", "Napoli", "Londra", "Tokyo"];
  const { preferiti } = usePreferiti();
  const { temporale, setTemporale } = useTema();

  return (
    <div>
      <h1 className="titolo-home">
        Che tempo fa?
        <button
          className="btn-tema"
          onClick={() => setTemporale(!temporale)}
          aria-label="Attiva o disattiva la modalità temporale"
        >
          <img
            className="sole-titolo"
            src={urlIconaMeteo(temporale ? "11d" : "01d")}
            alt=""
          />
        </button>
      </h1>
      <SearchBar
        onCerca={(citta, coordinate) =>
          navigate(
            coordinate
              ? `/citta/${citta}?lat=${coordinate.lat}&lon=${coordinate.lon}`
              : `/citta/${citta}`,
          )
        }
      />
      <ListaCitta citta={cittaRapide} />
      {preferiti.length > 0 && (
        <div>
          <h2>⭐ Le tue preferite</h2>
          <div className="griglia-preferiti">
            {preferiti.map((nomeCitta) => (
              <CartaMini key={nomeCitta} nome={nomeCitta} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeMeteo;
