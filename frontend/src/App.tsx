import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard, Login, Register, Hashtag } from "./views";
import { User } from "./interfaces/user.interface";
import { AnimatePresence } from "framer-motion";
import UserContext from "./contexts/user.context";
import axios from "axios";
import LoadingContext from "./contexts/loading.context";
import Loading from "./components/Loading/Loading";
import VerifyProfile from "./views/VerifyProfile/VerifyProfile";
import Profile from "./views/Profile/Profile";

function App() {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    isLogged: false,
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:8000/api";
    const getInfoAboutUser = async () => {
      const response = await axios
        .get("/my-informations")
        .catch((err) => err.response);
      if (response.data.success) {
        const userFromRequest: User = response.data.user;
        setUser({ ...userFromRequest, isLogged: true });
        setLoading(false);
        return;
      }
      setLoading(false);
    };
    getInfoAboutUser();
  }, []);

  const location = useLocation();

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <LoadingContext.Provider value={loading}>
        <Loading>
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<VerifyProfile />}>
                <Route index element={<Dashboard />} />
                <Route path="hashtag/:name" element={<Hashtag />} />
                <Route path="/:name" element={<Profile />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AnimatePresence>
        </Loading>
      </LoadingContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
