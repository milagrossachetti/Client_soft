import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import '../styles/searchMedicamentos.css';

const SearchMedicamentos = ({ onSelectMedicamentos }) => {
    const [descripcion, setDescripcion] = useState('');
    const [medicamentos, setMedicamentos] = useState([]);
    const [tempDescripcion, setTempDescripcion] = useState("");
    const [showListMedicamentos, setShowListMedicamentos] = useState(null);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchMedicamentos();
        }, 500);
        return () => clearTimeout(debounceTimer);
    }, [descripcion]);

    const fetchMedicamentos = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/servicio-salud/medicamentos?descripcion=${descripcion}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                const error = await response.text();
                console.log(error);
                setShowListMedicamentos(null);
            } else {
                const medicamentos = await response.json();
                setMedicamentos(medicamentos);
                setShowListMedicamentos(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setTempDescripcion(value);
        if (value.length >= 3) {
            setDescripcion(value);
        } else {
            console.log("Ingrese al menos 3 caracteres");
        }
    };

    const handleSelectMedicamento = (medicamento) => {
        onSelectMedicamentos(medicamento);
        setShowListMedicamentos(null);
    };

    return (
        <>
            <div className="search-container">
                <div className="input-wrapper">
                    <Search color="#9ca3af" size={20} style={{ padding: '10px' }} />
                    <input
                        placeholder="Buscar medicamento"
                        value={tempDescripcion}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='container-medicamentos'>
                {showListMedicamentos && medicamentos && medicamentos.length > 0 && (
                    medicamentos.map(medicamento => (
                        <div key={medicamento.codigo} className='item-medicamento' onClick={() => handleSelectMedicamento(medicamento)}>
                            {medicamento.descripcion}
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default SearchMedicamentos;
