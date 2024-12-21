import { Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Index from './index';
import Time from './Time';
import AddTime from './AddTime.jsx';
import UptTime from './uptTime';
import Campeonato from './Campeonato';
import AddCampeonato from './AddCampeonato';
import UptCampeonato from './uptCampeonato';
import Partida from './Partida';
import AddPartida from './AddPartida';
import UptPartida from './uptPartida';
import Usuario from './Usuario';
import AddUsuario from './AddUsuario';
import UptUsuario from './uptUsuario';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/index" element={<Index/>} />
      <Route path="/Time" element={<Time/>} />
      <Route path="/Time/AddTime" element={<AddTime/>} />
      <Route path="/Time/UptTime/:id" element={<UptTime/>} />
      <Route path="/Campeonato" element={<Campeonato/>} />
      <Route path="/Campeonato/addCampeonato" element={<AddCampeonato/>} />
      <Route path="/Campeonato/uptCampeonato/:id" element={<UptCampeonato/>} />
      <Route path="/Partida" element={<Partida/>} />
      <Route path="/Partida/addPartida" element={<AddPartida/>} />
      <Route path="/Partida/UptPartida/:id" element={<UptPartida/>} />
      <Route path="/Usuario" element={<Usuario/>} />
      <Route path="/Usuario/addUsuario" element={<AddUsuario/>} />
      <Route path="/Usuario/uptUsuario/:id" element={<UptUsuario/>} />
    </Routes>
  );
}

export default App;
