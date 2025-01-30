import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Sklep z Książkami</Link>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          {user ? (
            <>
              <li className="nav-item"><Link className="nav-link" to="/cart">Koszyk</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/orders">Historia zamówień</Link></li>
              <li className="nav-item"><button className="btn btn-danger" onClick={logout}>Wyloguj</button></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link className="nav-link" to="/login">Logowanie</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Rejestracja</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
