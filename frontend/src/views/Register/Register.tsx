import React, { useState } from "react";
import "./Register.scss";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useMediaQuery } from "@chakra-ui/react";
import { animationFormConfig } from "../../animationsConfig/login-animations";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  let [isGoingToRegister, setIsGoingToRegister] = useState<boolean>(false);
  const [isPhone] = useMediaQuery("(min-width: 951px)");
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
          <form>
            <motion.div
              initial="initial"
              animate="animate"
              exit={!isGoingToRegister ? "exit" : ""}
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
              exit={!isGoingToRegister ? "exit" : ""}
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
