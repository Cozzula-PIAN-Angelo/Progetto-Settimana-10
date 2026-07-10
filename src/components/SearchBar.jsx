import { useState } from "react";

function SearchBar({ onCerca }) {
  const [citta, setCitta] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (citta.trim() === "") return;
    onCerca(citta);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={citta}
        onChange={(e) => setCitta(e.target.value)}
        placeholder="Cerca una città..."
      />
      <button type="submit">Cerca</button>
    </form>
  );
}

export default SearchBar;
