import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard, Login, Register } from "./views";
import { User } from "./interfaces/user.interface";
import { AnimatePresence } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";
import UserContext from "./contexts/user.context";
import axios from "axios";

function App() {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    isLogged: false,
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:8000/api";
  });

  const location = useLocation();

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <div className="App">
      <ChakraProvider>
        <UserContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AnimatePresence>
        </UserContext.Provider>
      </ChakraProvider>
    </div>
  );
}

export default App;
