function BarraTemperatura({ temp, min, max }) {
  const intervallo = Math.max(max - min, 1);
  const posizione = Math.min(Math.max(((temp - min) / intervallo) * 100, 0), 100);

  return (
    <div
      className="barra-temperatura"
      role="img"
      aria-label={`Temperatura ${Math.round(temp)}°C, tra la minima di ${Math.round(min)}°C e la massima di ${Math.round(max)}°C`}
    >
      <span className="estremo-barra">{Math.round(min)}°</span>
      <div className="traccia-barra">
        <div
          className="riempimento-barra"
          style={{ width: `${posizione}%` }}
        />
        <div className="cursore-barra" style={{ left: `${posizione}%` }} />
      </div>
      <span className="estremo-barra">{Math.round(max)}°</span>
    </div>
  );
}

export default BarraTemperatura;
