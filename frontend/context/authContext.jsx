import { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [success, setSuccess] = useState(true);

  const context = useMemo(
    () => ({
      userInfo,
      setUserInfo,
      success,
      setSuccess,
    }),
    [userInfo, setUserInfo, success, setSuccess]
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth, AuthContext };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
