import "./Register.scss";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useMediaQuery, useToast } from "@chakra-ui/react";
import { animationFormConfig } from "../../animationsConfig/login-animations";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Joi from "joi";
import { JoiInput } from "../../components";
import UserContext from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast({ isClosable: true });

  const navigateTo = useNavigate();

  const context = useContext(UserContext);

  let [isGoingToRegister, setIsGoingToRegister] = useState<boolean>(false);
  const [isPhone] = useMediaQuery("(min-width: 951px)");

  const schemas = {
    username: Joi.string().min(3).max(30).required().alphanum().messages({
      "string.min": "Nazwa użytkownika musi mieć minimum 3 znaki",
      "string.max": "Nazwa użytkownika może mieć maksymalnie 30 znaków",
      "string.empty": "Nazwa użytkownika nie może być pusta",
      "string.alphanum": "Nazwa użytkownika może zawierać tylko litery i cyfry",
      "any.required": "Nazwa użytkownika jest wymagana",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "Hasło musi mieć minimum 8 znaków",
      "string.empty": "Hasło nie może być puste",
      "any.required": "Hasło jest wymagane",
    }),
    repeatPassword: Joi.string().min(8).valid(password).required().messages({
      "string.min": "Hasło musi mieć minimum 8 znaków",
      "string.empty": "Hasło nie może być puste",
      "any.required": "Hasło jest wymagane",
      "any.only": "Hasła muszą być takie same",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Niepoprawny adres email",
        "string.empty": "Email nie może być pusty",
        "any.required": "Email jest wymagany",
      }),
    firstName: Joi.string().min(3).max(30).required().messages({
      "string.min": "Imie musi mieć minimum 3 znaki",
      "string.max": "Imie może mieć maksymalnie 30 znaków",
      "string.empty": "Imie nie może być puste",
      "any.required": "Imie jest wymagane",
    }),
    lastName: Joi.string().min(3).max(30).required().messages({
      "string.min": "Nazwisko musi mieć minimum 3 znaki",
      "string.max": "Nazwisko może mieć maksymalnie 30 znaków",
      "string.empty": "Nazwisko nie może być puste",
    }),
  };

  const addAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkSchema = Joi.object(schemas).validate({
      username,
      password,
      repeatPassword,
      email,
      firstName,
      lastName,
    });
    if (checkSchema.error) {
      toast({
        title: "Nie udało sie dodać konta",
        description: checkSchema.error.message,
        status: "error",
      });
      return;
    }
  };

  useEffect(() => {
    if (context?.user.isLogged) {
      navigateTo("/");
      toast({
        title: "Jesteś już zalogowany",
        description: "Nie możesz utworzyć nowego konta",
        status: "error",
      });
    }
  }, []);
  return (
    <div className="register-container">
      <motion.div className="register-box">
        <motion.div
          className="twitter-icon"
          exit={isGoingToRegister ? "exit" : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FontAwesomeIcon icon={faTwitter} />
          {isPhone && <p>Twitter</p>}
        </motion.div>
        <div className="form-side">
          <motion.div
            initial="initial"
            animate="animate"
            exit={!isGoingToRegister ? "exit" : ""}
            variants={animationFormConfig()}
          >
            <h1>Tworzenie nowego konta!</h1>
          </motion.div>
          <form onSubmit={addAccount}>
            <motion.div
              initial="initial"
              animate="animate"
              exit={!isGoingToRegister ? "exit" : ""}
              variants={animationFormConfig(0.1, 0.1)}
            >
              <div className="input-group">
                <p>Imie</p>
                <JoiInput
                  schema={schemas.firstName}
                  type="text"
                  placeholder="Twoja nazwa użytkownika"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit={!isGoingToRegister ? "exit" : ""}
              variants={animationFormConfig(0.2, 0.2)}
            >
              <div className="input-group">
                <p>Nazwisko</p>
                <JoiInput
                  schema={schemas.lastName}
                  type="text"
                  placeholder="Twoja nazwa użytkownika"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit={!isGoingToRegister ? "exit" : ""}
              variants={animationFormConfig(0.2, 0.2)}
            >
              <div className="input-group">
                <p>Adres E-mail</p>
                <JoiInput
                  schema={schemas.email}
                  type="text"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit={!isGoingToRegister ? "exit" : ""}
              variants={animationFormConfig(0.3, 0.3)}
            >
              <div className="input-group">
                <p>Nazwa Użytkownika</p>
                <JoiInput
                  schema={schemas.username}
                  type="text"
                  placeholder="Twoja nazwa użytkownika"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </motion.div>
            <motion.div
              initial="initial"
              animate="animate"
              exit={!isGoingToRegister ? "exit" : ""}
              variants={animationFormConfig(0.4, 0.4)}
            >
              <div className="input-group">
                <p>Hasło</p>
                <JoiInput
                  schema={schemas.password}
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
              exit={!isGoingToRegister ? "exit" : ""}
              variants={animationFormConfig(0.5, 0.5)}
            >
              <div className="input-group">
                <p>Powtorz Hasło</p>
                <JoiInput
                  schema={schemas.repeatPassword}
                  type={showPassword ? "text" : "password"}
                  placeholder="Powtórz hasło"
                  onChange={(e) => setRepeatPassword(e.target.value)}
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
              exit={!isGoingToRegister ? "exit" : ""}
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
      </motion.div>
    </div>
  );
};

export default Register;
