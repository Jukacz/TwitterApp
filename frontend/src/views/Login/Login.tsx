import "./Login.scss";
import React, { useContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/user.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Cookies from "cookies-js";

const Login: React.FC = () => {

  Cookies.get("csrftoken")
  const context = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toast = useToast({ isClosable: true });

  const navigateTo = useNavigate();

  useEffect(() => {
    document.title = "Login";

    context?.isLogged && navigateTo("/");
  }, []);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios
      .post("/login/", {
        username,
        password,
      }, {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken")
        }
      })
      .catch((err) => err.response);

    if (response.data.status === "success") {
      navigateTo("/");
      toast({
        title: "Logowanie Udane",
        status: "success",
      });
      return;
    }
    toast({
      title: "Logowanie nieudane",
      status: "error",
    });
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="twitter-icon">
          <FontAwesomeIcon icon={faTwitter} />
          <p>Twitter</p>
        </div>
        <div className="form-side">
          <h1>Witaj Ponownie!</h1>
          <form onSubmit={login}>
            <div className="input-group">
              <p>Nazwa Użytkownika</p>
              <input
                type="text"
                placeholder="Twoja nazwa użytkownika"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <button className="submit-button" type="submit">
              Zaloguj się!
            </button>
          </form>
        </div>
        <div className="text-side">
          <h2>Jesteś nowy?</h2>
          <p>
            Zarejestruj się, aby móc korzystać z naszych usług, a także dodawać
            własne ogłoszenia.
          </p>
          <NavLink className="button-register" to="/register">
            Zarejestruj się
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
