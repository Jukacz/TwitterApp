import "./Login.scss";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../contexts/user.context";
import Cookies from "cookies-js";
import { User } from "../../interfaces/user.interface";
import requestToApi from "../../components/axios";

const Login: React.FC = () => {
  Cookies.get("csrftoken");
  const context = useContext(UserContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [isPhone] = useMediaQuery("(min-width: 951px)");

  const toast = useToast({ isClosable: true });

  const navigateTo = useNavigate();

  useEffect(() => {
    document.title = "Twitter | Logowanie";
    if (context?.user.isLogged) {
      navigateTo("/");
      toast({
        title: "Jesteś już zalogowany",
        status: "info",
      });
    }
  }, []);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await requestToApi
      .post("/login/", {
        username,
        password,
      })
      .catch((err) => err.response);

    if (response.data.success) {
      toast({
        title: "Logowanie Udane",
        status: "success",
      });
      const userFromRequest: User = response.data.user;
      context?.setUser({ ...userFromRequest, isLogged: true });
      navigateTo("/");
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
      <div className="login-box">
        <div className="twitter-icon">
          <FontAwesomeIcon icon={faTwitter} />
          {isPhone && <p>Twitter</p>}
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
            <button className="submit-button" type="submit" disabled={loading}>
              Zaloguj się!
            </button>
          </form>
        </div>
        <div className="register-side">
          {isPhone ? (
            <div className="text-side">
              <h2>Jesteś nowy?</h2>
              <p>
                Zarejestruj się, aby móc korzystać z naszych usług, a także
                dodawać własne ogłoszenia.
              </p>
              <NavLink className="button-register" to="/register">
                Zarejestru j się
              </NavLink>
            </div>
          ) : (
            <NavLink to="/register" className="register-phone-link">
              Nie masz konta? Zarejestruj sie!
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
