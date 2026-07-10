function AnelloDato({ etichetta, icona, valore, massimo = 100, unita = "%" }) {
  const percento = Math.min(Math.max((valore / massimo) * 100, 0), 100);

  return (
    <div className="grafico-tile">
      <svg
        viewBox="0 0 80 80"
        role="img"
        aria-label={`${etichetta}: ${valore}${unita}`}
      >
        <circle className="traccia-anello" cx="40" cy="40" r="32" />
        {percento > 0 && (
          <circle
            className="riempimento-anello"
            cx="40"
            cy="40"
            r="32"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset={100 - percento}
            transform="rotate(-90 40 40)"
          />
        )}
        <text className="valore-grafico" x="40" y="46">
          {valore}
          {unita}
        </text>
      </svg>
      <span className="grafico-etichetta">
        {icona} {etichetta}
      </span>
    </div>
  );
}

export default AnelloDato;
