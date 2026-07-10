function BussolaVento({ gradi = 0, velocita }) {
  return (
    <div className="grafico-tile">
      <svg
        viewBox="0 0 80 80"
        role="img"
        aria-label={`Vento: ${velocita} m/s, direzione ${gradi}°`}
      >
        <circle className="traccia-anello" cx="40" cy="40" r="32" />
        <text className="punto-cardinale" x="40" y="17">
          N
        </text>
        <text className="punto-cardinale" x="66" y="43">
          E
        </text>
        <text className="punto-cardinale" x="40" y="70">
          S
        </text>
        <text className="punto-cardinale" x="14" y="43">
          O
        </text>
        <g className="freccia-vento" style={{ transform: `rotate(${gradi}deg)` }}>
          <path d="M40 16 L46 38 L40 33 L34 38 Z" />
          <circle cx="40" cy="40" r="3" />
        </g>
      </svg>
      <span className="grafico-etichetta">💨 Vento · {velocita} m/s</span>
    </div>
  );
}

export default BussolaVento;
