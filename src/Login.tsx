import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const validUsername = "admin";
    const validPassword = "1234";

    if (username === validUsername && password === validPassword) {
      setError("");
      navigate("/home");
    } else {
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-username">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label="Username"
            aria-describedby="addon-username"
          />
        </div>

        <div className="input-group flex-nowrap mb-3">
          <span className="input-group-text" id="addon-password">
            $
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            aria-describedby="addon-password"
          />
        </div>
        {error && (
          <div className="alert alert-danger text-center py-1 mb-3">
            {error}
          </div>
        )}

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
