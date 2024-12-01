import { useState } from 'react';
import { useForm } from "react-hook-form";
import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css';

const Signin = () => {
    const navigate = useNavigate();
    const values = {
        email: '',
        contrasenia: ''
    };
    const [message, setMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: values });
    const onSubmit = async (values) =>{
        try{
            const body = {
                email: values.email,
                contrasenia: values.contrasenia
            };
            const response = await fetch('http://localhost:8080/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(body)
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                setMessage(errorMessage || 'Error desconocido');
            } else{
                console.log("usuario autenticado");
                navigate('/menu', { replace: true });
            }
        }catch(error){
            setMessage('Error de conexión con el servidor. Intenta nuevamente.');
            console.log(error);
        }
    }

    const [focusedInput, setFocusedInput] = useState(null);

    const handleFocus = (inputName) => setFocusedInput(inputName);
    const handleBlur = () => setFocusedInput(null);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p>Iniciar sesión</p>
            </div>
            <div className="input-container">
                <div className="item-form item">
                    <div className={`input-wrapper ${focusedInput === 'email' ? 'focused' : ''}`}>
                        <User color="#9ca3af" size={30} style={{ padding: '10px' }} />
                        <input
                            {...register('email', { required: 'Email es requerido' })}
                            className="custom-input"
                            placeholder="Email"
                            onFocus={() => handleFocus('email')}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>
                <p className="error-message">{errors.email?.message}</p>
            </div>
            <div className="input-container">
                <div className="item-form item">
                    <div className={`input-wrapper ${focusedInput === 'password' ? 'focused' : ''}`}>
                        <Lock color="#9ca3af" size={28} style={{ padding: '10px' }} />
                        <input
                            {...register('contrasenia', { required: 'La contraseña es requerida' })}
                            type='password'
                            className="custom-input"
                            placeholder="Contraseña"
                            onFocus={() => handleFocus('password')}
                            onBlur={handleBlur}
                        />
                    </div>
                </div>
                <p className="error-message">{errors.contrasenia?.message}</p>
            </div>
            <div className="item-form">
                <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <div className='input-container'>
                <button type="submit" className="item-form">Iniciar sesión</button>
                {message && (
                    <p className='error-auth'>
                        {message}
                    </p>
                )}
            </div>
        </form>
        </div>
    );
};

export default Signin;
