const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getMeteoCorrente(citta) {
  const risposta = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${citta}&units=metric&lang=it&appid=${API_KEY}`,
  );
  if (!risposta.ok)
    throw new Error(`Errore ${risposta.status}: città non trovata`);
  return risposta.json();
}
