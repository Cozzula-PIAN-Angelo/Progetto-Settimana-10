import { Link, useLocation } from "react-router-dom";
import { House } from "lucide-react";

function TornaHome() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  return (
    <Link to="/" className="torna-home">
      <House size={16} /> Torna alla home
    </Link>
  );
}

export default TornaHome;
