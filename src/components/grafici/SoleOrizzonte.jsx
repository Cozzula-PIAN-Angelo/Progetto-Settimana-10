import { Sunrise, Sunset } from "lucide-react";

function formattaOra(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ORIZZONTE = 42;

function SoleOrizzonte({ alba, tramonto }) {
  const adesso = Date.now() / 1000;
  const progresso = (adesso - alba) / (tramonto - alba);
  const giorno = progresso >= 0 && progresso <= 1;
  const p = Math.min(Math.max(progresso, 0), 1);

  // il sole viaggia da sinistra a destra e si alza a campana:
  // all'alba e al tramonto è mezzo sotto l'orizzonte
  const soleX = 16 + 88 * p;
  const soleY = ORIZZONTE + 6 - Math.sin(p * Math.PI) * 30;

  return (
    <div className="sole-orizzonte">
      <svg
        viewBox="0 0 120 56"
        role="img"
        aria-label={`Alba alle ${formattaOra(alba)}, tramonto alle ${formattaOra(tramonto)}`}
      >
        <defs>
          {/* tutto ciò che scende sotto l'orizzonte sparisce */}
          <clipPath id="sopra-orizzonte">
            <rect x="0" y="0" width="120" height={ORIZZONTE} />
          </clipPath>
        </defs>
        <g clipPath="url(#sopra-orizzonte)">
          {giorno ? (
            <g transform={`translate(${soleX} ${soleY})`}>
              <g className="sole-scena">
                <circle r="7" />
                <line x1="0" y1="-10" x2="0" y2="-13.5" />
                <line x1="0" y1="10" x2="0" y2="13.5" />
                <line x1="-10" y1="0" x2="-13.5" y2="0" />
                <line x1="10" y1="0" x2="13.5" y2="0" />
                <line x1="-7" y1="-7" x2="-9.5" y2="-9.5" />
                <line x1="7" y1="-7" x2="9.5" y2="-9.5" />
                <line x1="-7" y1="7" x2="-9.5" y2="9.5" />
                <line x1="7" y1="7" x2="9.5" y2="9.5" />
              </g>
            </g>
          ) : (
            <g transform="translate(60 24)">
              <g className="luna-scena">
                <circle r="7" />
                <circle className="cratere" cx="-2.5" cy="-1.5" r="1.8" />
                <circle className="cratere" cx="2.5" cy="2" r="1.3" />
              </g>
            </g>
          )}
        </g>
        <line
          className="linea-orizzonte"
          x1="6"
          y1={ORIZZONTE}
          x2="114"
          y2={ORIZZONTE}
        />
      </svg>
      <div className="orari-sole">
        <span>
          <Sunrise size={15} /> {formattaOra(alba)}
        </span>
        <span>
          <Sunset size={15} /> {formattaOra(tramonto)}
        </span>
      </div>
    </div>
  );
}

export default SoleOrizzonte;
