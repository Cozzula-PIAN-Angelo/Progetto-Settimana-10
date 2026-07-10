import { useEffect, useState } from "react";

export function useTema() {
  const [temporale, setTemporale] = useState(
    () => localStorage.getItem("tema") === "temporale",
  );

  useEffect(() => {
    document.body.classList.toggle("tema-temporale", temporale);
    localStorage.setItem("tema", temporale ? "temporale" : "sereno");
  }, [temporale]);

  return { temporale, setTemporale };
}
