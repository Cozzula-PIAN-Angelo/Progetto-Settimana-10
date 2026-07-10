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

export async function getPrevisioneDomani(lat, lon) {
  const risposta = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=it&appid=${API_KEY}`,
  );
  if (!risposta.ok)
    throw new Error(`Errore ${risposta.status}: previsioni non disponibili`);
  const dati = await risposta.json();

  // cerca la previsione di domani più vicina a mezzogiorno
  const domani = new Date();
  domani.setDate(domani.getDate() + 1);
  const giornoDomani = domani.toLocaleDateString("sv"); // formato AAAA-MM-GG
  const slotDiDomani = dati.list.filter((p) =>
    p.dt_txt.startsWith(giornoDomani),
  );
  return (
    slotDiDomani.find((p) => p.dt_txt.includes("12:00:00")) ??
    slotDiDomani[Math.floor(slotDiDomani.length / 2)] ??
    dati.list[0]
  );
}

export async function getSuggerimenti(testo) {
  const risposta = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${testo}&limit=10&appid=${API_KEY}`,
  );
  if (!risposta.ok) throw new Error(`Errore ${risposta.status}`);
  return risposta.json();
}
