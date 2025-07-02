import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import handleTokenExpiration from "./TokenExpired";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  //   handleTokenExpiration();
  const token = localStorage.getItem("piper-token");
  if (token) {
    return children;
  } else {
    console.log("error");
    return useEffect(() => {
      navigate("/auth/sign-in");
    }, []);
  }
}

export default PrivateRoute;
