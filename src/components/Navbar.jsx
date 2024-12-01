import { Stethoscope } from 'lucide-react';
import { useState, useEffect } from 'react';
import Avvvatars from "avvvatars-react";
import '../styles/navbar.css';



const Navbar = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:8080/usuario', {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                console.log(errorMessage);
            } else {
                const user = await response.json();
                setUser(user.email);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container-navbar'>
            <div className='container-logo'>
                <Stethoscope color="#1f2937" size={35}
                    style={{
                        padding: '10px',
                        transform: 'rotate(-45deg)'
                    }} />
                <p className='name'>Policonsultorio</p>
            </div>
            <div className='user-data'>
                <p className='name-user'>{user}</p>
                <Avvvatars
                    value={user}
                    size={40}
                    bgColor="#4CAF50"
                    fgColor="#FFFFFF" />
            </div>
        </div>
    )
}

export default Navbar;