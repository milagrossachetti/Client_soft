import Card from '../components/Card.jsx';
import Navbar from '../components/Navbar.jsx';
import { Users } from 'lucide-react';
import { UserCog } from 'lucide-react';
import { FileText } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import '../styles/mainmenu.css';

const MainMenu = () => {
    return (
        <>
        <Navbar/>
        <p id='menu'>Menú Principal</p>
        <div id="container-menu">
            <Card title="Gestionar Pacientes" icon={<Users color="#1f2937" size={40} style={{paddingTop:'20px' }} />} description="Administre la información de los pacientes"/>
            <Card title="Gestionar Usuarios" icon={<UserCog color="#1f2937" size={40} style={{paddingTop:'20px' }} />} description="Administre las cuentas de usuario del sistema"/>
            <NavLink to='/medicalRecord'>
                <Card title="Gestionar Historia Clínica" icon={<FileText  color="#1f2937" size={40} style={{paddingTop:'20px' }}/>} description="Acceda y administra historias clínicas"/>
            </NavLink>
        </div>
        </>
    );
};

export default MainMenu;
