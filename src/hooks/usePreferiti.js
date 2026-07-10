import { useState, useEffect } from "react";

export function usePreferiti() {
  const [preferiti, setPreferiti] = useState(() => {
    const salvati = localStorage.getItem("preferiti");
    return salvati ? JSON.parse(salvati) : [];
  });

  useEffect(() => {
    localStorage.setItem("preferiti", JSON.stringify(preferiti));
  }, [preferiti]);

  function togglePreferito(nome) {
    if (preferiti.includes(nome)) {
      setPreferiti(preferiti.filter((p) => p !== nome));
    } else {
      setPreferiti([...preferiti, nome]);
    }
  }

  return { preferiti, togglePreferito };
}
