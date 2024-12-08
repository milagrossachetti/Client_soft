import { Outlet, useLocation } from 'react-router-dom';
import Signin from './components/Signin';
import './index.css';

function App() {
  const location = useLocation();

  // Mostrar Signin solo si estamos en la ruta raíz
  return (
    <>
      {location.pathname === '/' ? (
        <Signin />
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default App;
