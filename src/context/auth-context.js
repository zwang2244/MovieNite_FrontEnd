import React, { createContext, useContext, useState } from "react";
import * as passport from "../api/passport";
import { useMount } from "../hooks/useMount";
import { firstMount, logoutLocal } from "../utils/auth";

const AuthContext = createContext({
  user: null,
});
AuthContext.displayName = "AuthContext";
export const localUserInfo = "__user_info__";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // set User
  // console.log("AuthProvider!!!!");
  const logout = () => {
    logoutLocal().then(() => setUser(null));
  };
  useMount(() => {
    // const Ans = window.localStorage.getItem(localUserInfo);
    firstMount().then((userInfo) => {
      setUser(JSON.parse(userInfo));
      // console.log("AuthProvider!!!serting");
    });
  });
  // console.log("AuthProvider222!!!!");
  return (
    <AuthContext.Provider
      value={{ user, logout, setUser }}
      children={children}
    />
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
