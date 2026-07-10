import { useState, useEffect } from "react";
import { getSuggerimenti } from "../api/MeteoApi";

function SearchBar({ onCerca }) {
  const [citta, setCitta] = useState("");
  const [suggerimenti, setSuggerimenti] = useState([]);

  useEffect(() => {
    if (citta.trim().length < 3) {
      setSuggerimenti([]);
      return;
    }
    const timer = setTimeout(() => {
      getSuggerimenti(citta)
        .then((risultati) => setSuggerimenti(risultati))
        .catch(() => setSuggerimenti([]));
    }, 400);

    return () => clearTimeout(timer);
  }, [citta]);

  function handleSubmit(e) {
    e.preventDefault();
    if (citta.trim() === "") return;
    onCerca(citta);
  }
  function scegli(suggerimento) {
    setSuggerimenti([]);
    onCerca(suggerimento.name, {
      lat: suggerimento.lat,
      lon: suggerimento.lon,
    });
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-box">
        <input
          value={citta}
          onChange={(e) => setCitta(e.target.value)}
          placeholder="Cerca una città..."
        />
        {suggerimenti.length > 0 && (
          <ul className="suggerimenti">
            {suggerimenti.map((s) => (
              <li key={`${s.lat}-${s.lon}`}>
                <button type="button" onClick={() => scegli(s)}>
                  {s.name}
                  {s.state ? ` (${s.state})` : ""}, {s.country}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">Cerca</button>
    </form>
  );
}

export default SearchBar;
