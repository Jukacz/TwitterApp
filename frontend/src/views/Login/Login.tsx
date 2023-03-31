import "./Login.scss";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import {
  animationFormConfig,
  animationLoginBoxConfig,
  animationTextContainerConfig,
} from "./animationsConfig";
import axios, { Axios, AxiosStatic } from "axios";
import UserContext from "../../contexts/user.context";
import Cookies from "cookies-js";
import { JoiInput } from "../../components";
import { User } from "../../interfaces/user.interface";

const Login: React.FC = () => {
  Cookies.get("csrftoken");
  const context = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  let [isGoingToRegister, setIsGoingToRegister] = useState<boolean>(false);
  const [isPhone] = useMediaQuery("(min-width: 951px)");

  const toast = useToast({ isClosable: true });

  const navigateTo = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios
      .post(
        "/login/",
        {
          username,
          password,
        },
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      )
      .catch((err) => err.response);

    if (response.data.success) {
      toast({
        title: "Logowanie Udane",
        status: "success",
      });
      navigateTo("/");
      const userFromRequest: User = response.data.user;
      context?.setUser(userFromRequest);
      return;
    }
    toast({
      title: "Logowanie nieudane",
      status: "error",
    });
    setLoading(false);
  };
  return (
    <div className="login-container">
      <motion.div
        exit={!isGoingToRegister ? "exit" : "exitAlternative"}
        variants={animationLoginBoxConfig}
        transition={{ duration: 0.3, delay: 0.8, ease: "easeInOut" }}
        className="login-box"
      >
        <motion.div
          className="twitter-icon"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FontAwesomeIcon icon={faTwitter} />
          {isPhone && <p>Twitter</p>}
        </motion.div>
        <div className="form-side">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animationFormConfig()}
          >
            <h1>Witaj Ponownie!</h1>
          </motion.div>
          <form onSubmit={login}>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animationFormConfig(0.2, 0.2)}
            >
              <div className="input-group">
                <p>Nazwa Użytkownika</p>
                <input
                  type="text"
                  placeholder="Twoja nazwa użytkownika"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animationFormConfig(0.4, 0.4)}
            >
              <div className="input-group">
                <p>Hasło</p>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Twoje hasło"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="show-password-button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animationFormConfig(0.6, 0.6)}
            >
              <button
                className="submit-button"
                type="submit"
                disabled={loading}
              >
                Zaloguj się!
              </button>
            </motion.div>
          </form>
        </div>
        <div className="register-side">
          {isPhone ? (
            <motion.div
              className="text-side"
              exit={{ width: 0, padding: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
            >
              <motion.div
                exit="exit"
                variants={animationTextContainerConfig}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <h2>Jesteś nowy?</h2>
                <p>
                  Zarejestruj się, aby móc korzystać z naszych usług, a także
                  dodawać własne ogłoszenia.
                </p>
                <NavLink
                  className="button-register"
                  to="/register"
                  onClick={() => setIsGoingToRegister(true)}
                >
                  Zarejestru j się
                </NavLink>
              </motion.div>
            </motion.div>
          ) : (
            <NavLink
              to="/register"
              className="register-phone-link"
              onClick={() => setIsGoingToRegister(true)}
            >
              Nie masz konta? Zarejestruj sie!
            </NavLink>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
