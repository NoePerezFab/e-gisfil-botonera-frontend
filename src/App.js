import { useState } from "react";
import {HashRouter as Router, Route, Routes } from "react-router-dom";
import Atencion from "./modules/Atencion";
import Llamados from "./modules/Llamados";
import Login from "./modules/Login";



function App() {
  const [sucursal, setsucursal] = useState({})
  const [mostrador, setmostrador] = useState({})
  const [turnoAtencion, setturnoAtencion] = useState({})

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setsucursal={setsucursal} setmostrador={setmostrador}/>}/>
        <Route path="/llamados" element={<Llamados mostrador={mostrador} setturnoAtencion={setturnoAtencion} sucursal={sucursal}/>}/>
        <Route path="/atencion" element={<Atencion mostrador={mostrador} turnoAtencion={turnoAtencion}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
