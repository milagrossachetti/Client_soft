import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Avvvatars from "avvvatars-react";
import '../styles/search.css';

const SearchComponent = ({ onSelectPatient }) => {
    const [patient, setPatient] = useState(null);
    const [cuil, setCuil] = useState('');
    const [showList, setShowList] = useState(null)

    useEffect(() => {
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
                const errorMessage = await response.text();
                setPatient(null);
                setShowList(null);
                console.log(errorMessage);
            } else {
                const patient = await response.json();
                setPatient(patient);
                setShowList(true);
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleSelectPatient = (patient) => {
        onSelectPatient(patient);
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
            {showList && patient && (
                <div className='options'>
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
            )}
        </>
    );
};

export default SearchComponent;

