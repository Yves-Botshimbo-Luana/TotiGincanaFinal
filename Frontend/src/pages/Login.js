
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.(com|fr|hotmail)$/;

    if (!emailPattern.test(email)) {
      setError("Email inválido. Use um formato válido como: @, .com, .fr, .hotmail");
    } else if (password !== "1234") {
      setError("Senha incorreta. Tente Novamente.");
    } else {
      setError("");
      
      localStorage.setItem("authenticated", "true");
      // Redireciona para a página inicial (Home) após login bem-sucedido
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <div className="input-field">
          <label htmlFor="email">Email:</label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="input-field">
          <label htmlFor="password">Senha:</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <p className="error">{error}</p>}
        
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

