import { Link } from "react-router-dom";

function ListaCitta({ citta }) {
  return (
    <ul>
      {citta.map((nomeCitta) => (
        <li key={nomeCitta}>
          <Link to={`/citta/${nomeCitta}`}>{nomeCitta}</Link>
        </li>
      ))}
    </ul>
  );
}

export default ListaCitta;
