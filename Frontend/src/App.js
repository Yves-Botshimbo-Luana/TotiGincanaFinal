import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
import About from "./pages/About";
import Login from "./pages/Login";

const App = () => {
 
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />

        {/* Exibe o Header apenas se o usuário estiver autenticado */}
        {isAuthenticated && <Header />}

        <Routes>
          {/* Exibe a página de Login se não estiver autenticado, senão redireciona para /home */}
          <Route exact path="/" element={isAuthenticated ? <Login /> : <Navigate to="/" />} />

          {/* Rotas protegidas - acessíveis apenas se autenticado */}
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/add" element={isAuthenticated ? <AddEdit /> : <Navigate to="/" />} />
          <Route path="/update/:id" element={isAuthenticated ? <AddEdit /> : <Navigate to="/" />} />
          <Route path="/view/:id" element={isAuthenticated ? <View /> : <Navigate to="/" />} />
          <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;




