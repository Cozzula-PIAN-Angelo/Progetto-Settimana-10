import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import ListaCitta from "../components/ListaCitta.jsx";

function HomeMeteo() {
  const navigate = useNavigate();
  const cittaRapide = ["Roma", "Milano", "Napoli", "Londra", "Tokyo"];

  return (
    <div>
      <h1>Che tempo fa?</h1>
      <SearchBar onCerca={(citta) => navigate(`/citta/${citta}`)} />
      <ListaCitta citta={cittaRapide} />
    </div>
  );
}

export default HomeMeteo;
