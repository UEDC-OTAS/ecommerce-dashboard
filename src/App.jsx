import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/auth/Login";
import Home from "./pages/Home";
// import PrivateRoute from "./PrivateRoute";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Router>
        <Toaster position="top-center" richColors duration={5000} />
        <Routes>
          {/* <Route path="/auth/sign-in" element={<Login />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}
