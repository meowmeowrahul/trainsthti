//Libraries
import { useContext } from "react";
import { AppContext } from "./Context";
import { Routes, Route } from "react-router-dom";
//CSS
import "./tailwind.css";
//Pages
import Login from "./Components/Login";
import Home from "./Components/Home";

function App() {
  const { isLogged } = useContext(AppContext);
  return (
    <Routes>
      <Route path="/" element={isLogged ? <Home /> : <Login />} />
    </Routes>
  );
}

export default App;
