import { localUserInfo, useAuth } from "../../context/auth-context";
import { Navigate, useLocation } from "react-router";
import { useMount } from "../../hooks/useMount";
import { firstMount } from "../../utils/auth";

function AuthGuard({ children }) {
  const { user } = useAuth();
  const userInfo = window.localStorage.getItem(localUserInfo);

  // console.log(userInfo);
  let location = useLocation();
  if (!userInfo) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  if (!user) {
    return <></>;
  } else {
    return children;
  }
}

export default AuthGuard;
