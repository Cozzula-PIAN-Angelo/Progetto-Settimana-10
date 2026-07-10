const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getMeteoCorrente(citta) {
  const risposta = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${citta}&units=metric&lang=it&appid=${API_KEY}`,
  );
  if (!risposta.ok)
    throw new Error(`Errore ${risposta.status}: città non trovata`);
  return risposta.json();
}
export async function getMeteoDaCoordinate(lat, lon) {
  const risposta = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`,
  );
  if (!risposta.ok)
    throw new Error(`Errore ${risposta.status}: località non trovata`);
  return risposta.json();
}

export async function getRegione(lat, lon) {
  try {
    const risposta = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`,
    );
    if (!risposta.ok) return null;
    const risultati = await risposta.json();
    return risultati[0]?.state ?? null;
  } catch {
    // la regione è un extra: se fallisce non blocchiamo la pagina
    return null;
  }
}

export async function getSuggerimenti(testo) {
  const risposta = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${testo}&limit=10&appid=${API_KEY}`,
  );
  if (!risposta.ok) throw new Error(`Errore ${risposta.status}`);
  return risposta.json();
}
