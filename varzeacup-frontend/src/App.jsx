import { Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Index from './index';
import Time from './Time';
import Campeonato from './Campeonato';
import Partida from './Partida';
import Usuario from './Usuario';
import AddUsuario from './AddUsuario';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/index" element={<Index/>} />
      <Route path="/Time" element={<Time/>} />
      <Route path="/Campeonato" element={<Campeonato/>} />
      <Route path="/Partida" element={<Partida/>} />
      <Route path="/Usuario" element={<Usuario/>} />
      <Route path="/Usuario/addUsuario" element={<AddUsuario/>} />
    </Routes>
  );
}

export default App;
