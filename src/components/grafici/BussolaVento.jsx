import { Wind } from "lucide-react";

function BussolaVento({ gradi = 0, velocita }) {
  return (
    <div className="grafico-tile">
      <svg
        viewBox="0 0 80 80"
        role="img"
        aria-label={`Vento: ${velocita} m/s, direzione ${gradi}°`}
      >
        <circle className="traccia-bussola" cx="40" cy="40" r="32" />
        <text className="punto-cardinale" x="40" y="20">
          N
        </text>
        <text className="punto-cardinale" x="62" y="43">
          E
        </text>
        <text className="punto-cardinale" x="40" y="66">
          S
        </text>
        <text className="punto-cardinale" x="18" y="43">
          O
        </text>
        <g className="freccia-vento" style={{ transform: `rotate(${gradi}deg)` }}>
          <path d="M40 24 L45 38 L40 34 L35 38 Z" />
          <circle cx="40" cy="40" r="2.5" />
        </g>
      </svg>
      <span className="grafico-etichetta">
        <Wind size={15} /> Vento · {velocita} m/s
      </span>
    </div>
  );
}

export default BussolaVento;
