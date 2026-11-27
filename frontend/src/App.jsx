import { useState } from 'react';
import './App.css'
import CadastroPiloto from './pages/CadastroPiloto';
import CadastroUsuario from './pages/CadastroUsuario';
import Login from './pages/Login';


function App() {
  const [telaRenderizar, setTelaRenderizar] = useState("Login");

  return (
    <div>
      {telaRenderizar === "Login" && (
        <Login
          irParaCadastroUsuario={() => setTelaRenderizar("CadastroUsuario")}
          irParaCadastroPiloto={() => setTelaRenderizar("CadastroPiloto")}
        />
      )}

      {telaRenderizar === "CadastroPiloto" && (
        <CadastroPiloto
          irParaLogin={() => setTelaRenderizar("Login")}
        />
      )}

      {telaRenderizar === "CadastroUsuario" && (
        <CadastroUsuario
          irParaLogin={() => setTelaRenderizar("Login")}
        />  
      )}
    </div>
  )
}

export default App;
