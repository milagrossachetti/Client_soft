import { useForm } from "react-hook-form";
import { User, Lock } from 'lucide-react';
import '../styles/signin.css'



const Signin = () => {
    const values = {
        email: '',
        password: ''
    };
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: values})
    const onSubmit = (data) => console.log(data)
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p>Iniciar sesión</p>
            </div>
            <div className="item-form item">
                <User color="#9ca3af" size={30} style={{ padding: '10px' }}/> 
                <input {...register('email', {
                    required: 'Email es requerido'
                })} placeholder="Email"/>
                <p>{errors.email?.required}</p>
            </div>
            <div className="item-form item">
                <Lock color="#9ca3af" size={28} style={{ padding: '10px' }}/>
                <input {...register('password', {
                    required: 'La contraseña es requerido'
                })} placeholder="Contraseña"/>
                <p>{errors.password?.required}</p>
            </div>
            <div className="item-form">
                <a href="#">
                ¿Olvidaste tu contraseña?
                </a>
            </div>
            <button type='submit' className="item-form">Iniciar sesión</button>
        </form>
    )};

export default Signin;