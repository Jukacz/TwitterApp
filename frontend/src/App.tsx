import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./views";
import UserContext from "./contexts/user.context";
import { User } from "./interfaces/user.interface";
import axios from "axios";

function App() {
  const [user, setUser] = React.useState<User>({
    id: 0,
    name: "",
    email: "",
    isLogged: false,
  });

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:8000/api";
  })

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          ...user,
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
