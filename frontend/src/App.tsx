import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard, Login } from "./views";
import { User } from "./interfaces/user.interface";
import { AnimatePresence } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";
import UserContext from "./contexts/user.context";
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
  });

  const location = useLocation();

  return (
    <div className="App">
      <ChakraProvider>
        <UserContext.Provider
          value={{
            ...user,
          }}
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AnimatePresence>
        </UserContext.Provider>
      </ChakraProvider>
    </div>
  );
}

export default App;
