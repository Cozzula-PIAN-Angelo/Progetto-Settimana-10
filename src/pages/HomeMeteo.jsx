import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import ListaCitta from "../components/ListaCitta.jsx";
import CartaMini from "../components/CartaMini.jsx";
import { usePreferiti } from "../hooks/usePreferiti.js";

function HomeMeteo() {
  const navigate = useNavigate();
  const cittaRapide = ["Roma", "Milano", "Napoli", "Londra", "Tokyo"];
  const { preferiti } = usePreferiti();

  return (
    <div>
      <h1>Che tempo fa?</h1>
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
