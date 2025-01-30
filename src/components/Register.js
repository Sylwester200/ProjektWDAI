import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password) {
      if (register(username, password)) {
        navigate("/login");
      } else {
        setError("Użytkownik o tej nazwie już istnieje.");
      }
    } else {
      setError("Wypełnij wszystkie pola.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Rejestracja</h2>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Login" onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" placeholder="Hasło" onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-success w-100" onClick={handleRegister}>Zarejestruj</button>
    </div>
  );
};

export default Register;
