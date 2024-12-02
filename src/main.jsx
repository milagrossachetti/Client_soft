import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import MainMenu from './pages/MainMenu.jsx';
import MedicalRecord from './pages/MedicalRecord.jsx';
import Evolutions from './pages/Evolutions.jsx';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/menu',
    element: <MainMenu />,
  },
  {
    path: '/medicalRecord',
    element: <MedicalRecord />,
  },
  {
    path: '/evolutions',
    element: <Evolutions />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
