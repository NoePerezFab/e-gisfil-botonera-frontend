import { useState } from "react";
import {HashRouter as Router, Route, Routes } from "react-router-dom";
import Atencion from "./modules/Atencion";
import Llamados from "./modules/Llamados";
import Login from "./modules/Login";



function App() {
  const [sucursal, setsucursal] = useState({})
  const [mostrador, setmostrador] = useState({})


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setsucursal={setsucursal} setmostrador={setmostrador}/>}/>
        <Route path="/llamados" element={<Llamados mostrador={mostrador}/>}/>
        <Route path="/atencion" element={<Atencion mostrador={mostrador} sucursal={sucursal}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
