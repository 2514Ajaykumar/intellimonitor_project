import {
  createContext,
  useState,
  useEffect,
} from "react";

export const AuthContext =
  createContext();

export function AuthProvider({
  children,
}) {

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  const [user, setUser] =
    useState(null);

  /*
   * LOGIN
   */

  const login = (
    jwtToken,
    userData
  ) => {

    localStorage.setItem(
      "token",
      jwtToken
    );

    setToken(jwtToken);

    setUser(userData);
  };

  /*
   * LOGOUT
   */

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    setToken(null);

    setUser(null);
  };

  /*
   * RESTORE SESSION
   */

  useEffect(() => {

    const savedToken =
      localStorage.getItem("token");

    if (savedToken) {

      setToken(savedToken);
    }

  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated:
          !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}