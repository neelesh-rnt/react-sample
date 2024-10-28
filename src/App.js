import "./App.css";
import Login from "./modules/login/login.jsx";
import NotFound from "./core/not-found/not-found.jsx";
import Registration from "./modules/registration/registration.jsx";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
