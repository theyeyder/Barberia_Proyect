import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const login = (usuarioData, tokenData) => {
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
    localStorage.setItem("token", tokenData);
    setUsuario(usuarioData);
    setToken(tokenData);
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);