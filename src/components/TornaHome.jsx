import { Link, useLocation } from "react-router-dom";

function TornaHome() {
  const { pathname } = useLocation();
  if (pathname === "/") return null;

  return (
    <Link to="/" className="torna-home">
      🏠 Torna alla home
    </Link>
  );
}

export default TornaHome;
