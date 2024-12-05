import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Avvvatars from "avvvatars-react";
import '../styles/search.css';

const SearchComponent = ({ onSelectPatient }) => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(null);
    const [patients, setPatients] = useState(null);
    const [cuil, setCuil] = useState('');
    const [showList, setShowList] = useState(null)


    useEffect(() => {
        if (!cuil.trim()) {
            setPatients(null);
            setShowList(false);
            return;
        }
        const debounceTimer = setTimeout(() => {
            fetchPatient();
        }, 200);
        return () => clearTimeout(debounceTimer);
    }, [cuil]);

    const fetchPatient = async () => {
        try {
            const response = await fetch(`http://localhost:8080/paciente?cuil=${cuil}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                setMessage("No hay coincidencias...")
                setShowMessage(true)
                setPatients(null);
                setShowList(null);
            } else {
                const patient = await response.json();
                if (patient.length > 0) {
                    setPatients(patient);
                    setShowList(true);
                    setShowMessage(false)
                } else {
                    setMessage("No hay coincidencias...")
                    setShowMessage(true)
                }
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleSelectPatient = (patient) => {
        onSelectPatient(patient); ///lo asigno así lo puedo mostrar en la otra página
        setShowList(false);
    };

    return (
        <>
            <div className="search-container">
                <div className="input-wrapper">
                    <Search color="#9ca3af" size={20} style={{ padding: '10px' }} />
                    <input
                        placeholder="Buscar paciente por CUIL"
                        value={cuil}
                        onChange={(e) => {
                            setCuil(e.target.value)
                            onSelectPatient(null)
                            setShowList(true);
                        }}
                    />
                </div>
            </div>
            {showList && patients && patients.length > 0 && (
                patients.map(patient => (
                    <div className='options' key={patient.cuil}>
                        <ul className="suggestions-list" onClick={() => handleSelectPatient(patient)}>
                            <li>
                                <Avvvatars
                                    value={patient.nombreCompleto}
                                    size={40}
                                    bgColor="#4CAF50"
                                    fgColor="#FFFFFF" />
                            </li>
                            <div style={{ marginLeft: '15px' }}>
                                <li id='name'>
                                    {patient.nombreCompleto}
                                </li>
                                <li id='info'>
                                    <span>cuil: {patient.cuil}</span>
                                    <span>dni: {patient.dni}</span>
                                    <span>id historia clínica: {patient.historiaClinica.id}</span>
                                </li>
                            </div>
                        </ul>
                    </div>
                ))
            )}
            {showMessage && message && (
                <div className='options' >
                    <ul className="suggestions-list">
                        <li className='error-search'>
                            {message}
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default SearchComponent;

