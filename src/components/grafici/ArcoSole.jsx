function formattaOra(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ArcoSole({ alba, tramonto }) {
  const adesso = Date.now() / 1000;
  const progresso = Math.min(
    Math.max((adesso - alba) / (tramonto - alba), 0),
    1,
  );

  // semicerchio con centro (44, 46) e raggio 34: da (10, 46) a (78, 46)
  const angolo = Math.PI * progresso;
  const soleX = 44 - 34 * Math.cos(angolo);
  const soleY = 46 - 34 * Math.sin(angolo);

  return (
    <div className="arco-sole">
      <svg
        viewBox="0 0 88 52"
        role="img"
        aria-label={`Alba alle ${formattaOra(alba)}, tramonto alle ${formattaOra(tramonto)}`}
      >
        <path className="traccia-sole" d="M 10 46 A 34 34 0 0 1 78 46" />
        <path
          className="riempimento-sole"
          d="M 10 46 A 34 34 0 0 1 78 46"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - progresso * 100}
        />
        <circle className="sole" cx={soleX} cy={soleY} r="5" />
      </svg>
      <div className="orari-sole">
        <span>🌅 {formattaOra(alba)}</span>
        <span>🌇 {formattaOra(tramonto)}</span>
      </div>
    </div>
  );
}

export default ArcoSole;
