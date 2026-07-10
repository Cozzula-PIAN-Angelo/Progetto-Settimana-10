import { useState, useEffect } from "react";

export function useMonete() {
  const [monete, setMonete] = useState(() => {
    const salvate = localStorage.getItem("monete");
    return salvate !== null ? JSON.parse(salvate) : 100;
  });

  useEffect(() => {
    localStorage.setItem("monete", JSON.stringify(monete));
  }, [monete]);

  return { monete, setMonete };
}
