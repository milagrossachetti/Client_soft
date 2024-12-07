import { useNavigate } from 'react-router-dom';
import { FileText, NotepadTextDashed, Microscope, Pill, CirclePlus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import SearchMedicamentos from '../components/SearchMedicamentos';
import '../styles/addevolution.css';

const AddEvolution = ({ patient, diagnosticoId, onPatientUpdate }) => {
    const [medicamentosSeleccionado, setMedicamentosSeleccionado] = useState([]);
    const diagnostico = patient?.historiaClinica?.diagnosticos.find(
        (d) => d.id === diagnosticoId
    );
    const labs = [
        { name: "Hemograma", items: ["Eritrocitos", "Hemoglobina", "Hematocrito", "Leucocitos", "Plaquetas", "Diferencial leucocitario"] },
        { name: "Perfil Lipídico", items: ["Colesterol total", "HDL (colesterol bueno)", "LDL (colesterol malo)", "Triglicéridos"] },
        { name: "Perfil Tiroideo", items: ["TSH (Hormona estimulante de la tiroides)", "T4 libre (Tiroxina libre)", "T3 libre (Triyodotironina libre)", "Anticuerpos anti-TPO"] },
        { name: "Perfil Renal", items: ["Creatinina sérica", "Nitrógeno ureico en sangre (BUN)", "Tasa de filtración glomerular (TFG)", "Ácido úrico"] },
        { name: "Electrolitos", items: ["Sodio (Na⁺)", "Potasio (K⁺)", "Cloro (Cl⁻)", "Calcio (Ca²⁺)", "Magnesio (Mg²⁺)"] },
        { name: "Coproparasitoscopía", items: ["Presencia de parásitos", "Leucocitos", "Presencia de sangre oculta", "Grasas fecales", "Consistencia y color"] },
        { name: "Pruebas de función hepática", items: ["Bilirrubina total y fraccionada", "ALT (Alanina aminotransferasa)", "AST (Aspartato aminotransferasa)", "Fosfatasa alcalina (ALP)", "Albúmina sérica", "Tiempo de protrombina (TP)"] }
    ];
    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            texto: "",
            plantillaControl: {
                peso: 0.0,
                altura: 0.0,
                presion: '',
                pulso: 0,
                saturacion: 0,
                nivelAzucar: 0
            },
            laboratorio: {
                tiposEstudios: [],
                items: []
            },
            receta: [{
                medicamentos: []
            }]
        }
    });
    const [labSelected, setLabSelected] = useState(null);
    const nombreDiagnostico = diagnostico?.nombreDiagnostico;
    const [selectedItems, setSelectedItems] = useState([]);
    const [buttonSelected, setButtonSelected] = useState(null);
    const itemsLabSelected = labs.find(lab => lab.name == labSelected)?.items;
    const data = watch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const selectedLab = event.target.value;
        setLabSelected(selectedLab);
        setValue('laboratorio.tiposEstudios', [selectedLab]);
    };

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        setSelectedItems((prevState) => {
            const updatedItems = isChecked
                ? [...prevState, value]
                : prevState.filter((item) => item !== value);
            addItemsLabs(updatedItems);
            return updatedItems;
        });
    };

    const addItemsLabs = (updatedItems) => {
        setValue('laboratorio.items', updatedItems);
    };

    const addMedicamentoSeleccionado = (medicamento) => {
        if (medicamentosSeleccionado.length < 2) {
            setMedicamentosSeleccionado((prev) => [...prev, medicamento]);
        } else {
            alert("Solo puedes seleccionar hasta 2 medicamentos.");
        }
    };

    const deleteMedicamentoSeleccionado = (medicamento) => {
        setMedicamentosSeleccionado((prevMedicamentos) =>
            prevMedicamentos.filter((m) => m.codigo !== medicamento.codigo)
        );
    };
    
    useEffect(() => {
        setValue('receta[0].medicamentos', medicamentosSeleccionado);
    }, [medicamentosSeleccionado, setValue]);

    const onSubmit = async (formData) => { 
        const dataToSend = { 
            texto: formData.texto.trim(), 
            plantillaControl: formData.plantillaControl, 
            laboratorio: { 
                tiposEstudios: formData.laboratorio.tiposEstudios, 
                items: formData.laboratorio.items 
            }, 
            receta: [ { 
                medicamentos: medicamentosSeleccionado.map(medicamento => medicamento.descripcion) 
            } ] 
        }; 
    
        const hasSignificantControl = Object.keys(formData.plantillaControl).some(key => formData.plantillaControl[key] !== 0 && formData.plantillaControl[key] !== ""); 
        const hasSignificantLaboratory = formData.laboratorio && (formData.laboratorio.tiposEstudios.length > 0 || formData.laboratorio.items.length > 0); 
        
        if (!dataToSend.texto && !hasSignificantControl && !hasSignificantLaboratory && !dataToSend.receta) { 
            alert("La evolución debe tener al menos texto, plantilla de control, plantilla de laboratorio o receta."); 
            return; 
        } 
        
        console.log("Evoluciones guardadas:", JSON.stringify(dataToSend)); 
        
        try { 
            console.log("Cuil:", patient.cuil, "Diagnostico ID:", diagnosticoId); 
            const response = await fetch(`http://localhost:8080/api/evoluciones/${patient.cuil}/${diagnosticoId}`, 
                { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json', }, 
                    credentials: "include", body: JSON.stringify(dataToSend) 
                });
                
                if (!response.ok) { 
                    const errorText = await response.text(); 
                    console.error("Error en la respuesta del servidor:", errorText); 
                    alert(`Error: ${errorText}`); 
                } else { 
                    const responseData = await response.json(); 
                    alert("Evolución agregada con éxito"); 
                    if (onPatientUpdate) { 
                        onPatientUpdate();
                    } 
                    navigate('/evolutions', { state: { patient, diagnosticoId: diagnostico.id } }); 
                } 
            } catch (error) { 
                console.error("Error en la comunicación con el backend:", error); 
                alert("Error en la comunicación con el backend: " + error.message); 
            }
        };

        return (
            <div className="evolutions">
                <div className="buttons-evolutions">
                    <h2>
                        Agregar evolución a{" "}
                        <span style={{ color: "#4a4aa1" }}>{nombreDiagnostico}</span>
                    </h2>
                </div>
                <div className="e-buttons">
                    <button onClick={() => setButtonSelected("texto")} className='button-content-add'>
                        <FileText size={18} style={{ marginRight: "8px" }} />
                        Texto
                    </button>
                    <button onClick={() => setButtonSelected("control")} className='button-content-add'>
                        <NotepadTextDashed size={18} style={{ marginRight: "8px" }} />
                        Control
                    </button>
                    <button onClick={() => setButtonSelected("laboratorio")} className='button-content-add'>
                        <Microscope size={18} style={{ marginRight: "8px" }} />
                        Laboratorio
                    </button>
                    <button onClick={() => setButtonSelected("receta")} className='button-content-add'>
                        <Pill size={18} style={{ marginRight: "8px" }} />
                        Receta
                    </button>
                </div>
    
                <form onSubmit={handleSubmit(onSubmit)} className="content-add-evolution">
                    <div className="content-add">
                        {buttonSelected === "texto" && (
                            <div className='texto-libre'>
                                <h4>Texto libre</h4>
                                <input
                                    type="text"
                                    {...register("texto")}
                                    placeholder="Ingrese una descripción..."
                                    className='input-texto-libre' />
                            </div>
                        )}
                        {buttonSelected === "control" && (
                            <div className='control'>
                                <h4>Plantilla de control</h4>
                                <div className='input-control'>
                                    <label htmlFor="peso" className='label-control'>Peso (kg)</label>
                                    <input id="peso" type="number" step="0.01" {...register('plantillaControl.peso')} className='input-button-control' />
                                </div>
                                <div className="input-control">
                                    <label htmlFor="altura" className='label-control'>Altura (m)</label>
                                    <input id="altura" type="number" step="0.01" {...register('plantillaControl.altura')} className='input-button-control' />
                                </div>
                                <div className="input-control">
                                    <label htmlFor="presion" className='label-control'>Presión arterial</label>
                                    <input id="presion" type="text" {...register('plantillaControl.presion')} className='input-button-control' />
                                </div>
                                <div className="input-control">
                                    <label htmlFor="pulso" className='label-control'>Pulso</label>
                                    <input id="pulso" type="number" {...register('plantillaControl.pulso')} className='input-button-control' />
                                </div>
                                <div className="input-control">
                                    <label htmlFor="saturacion" className='label-control'>Saturación de oxígeno (%)</label>
                                    <input id="saturacion" type="number" {...register('plantillaControl.saturacion')} className='input-button-control' />
                                </div>
                                <div className="input-control">
                                    <label htmlFor="azucar" className='label-control'>Nivel de azúcar (mg/dL)</label>
                                    <input id='azucar' type="number" {...register('plantillaControl.nivelAzucar')} className='input-button-control' />
                                </div>
                            </div>
                        )}
                        {buttonSelected === "laboratorio" && (
                            <div className='lab'>
                                <h4>Plantilla de laboratorio</h4>
                                <select name="type-labs" id="type-labs" onChange={handleChange} className='select-lab'>
                                    {labs.map((lab, index) => (
                                        <option value={lab.name} key={index}>{lab.name}</option>
                                    ))}
                                </select>
                                <div className="lab-container">
                                    {itemsLabSelected && itemsLabSelected.map(item => (
                                        <div key={item} className='input-lab'>
                                            <label htmlFor={item} className='label-lab'>{item}</label>
                                            <input
                                                type="checkbox"
                                                id={item}
                                                value={item}
                                                onChange={(e) => { handleCheckboxChange(e) }}
                                                checked={selectedItems.includes(item)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {buttonSelected === "receta" && (
                            <div className='receta'>
                                <SearchMedicamentos onSelectMedicamentos={addMedicamentoSeleccionado} />
                                <div className='container-list-medicamentos'>
                                    <h4>Medicamentos seleccionados</h4>
                                    {medicamentosSeleccionado.length > 0 && medicamentosSeleccionado.map(
                                        (medicamentoSeleccionado) => (
                                            <div key={medicamentoSeleccionado.codigo} className='list-medicamentos'>
                                                <p>{medicamentoSeleccionado.descripcion}</p>
                                                <button
                                                    onClick={() => deleteMedicamentoSeleccionado(medicamentoSeleccionado)}
                                                    className='button-delete-medicamento'
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="content-add content-evolution">
                        <div className='container-button-add-evolution'>
                            <h3>Contenido de la evolución</h3>
                            <button type="submit" className='button-evolutions button-add-evolution'>
                                <CirclePlus size={18} style={{ marginRight: '10px' }} />Agregar evolución
                            </button>
                        </div>
                        <div>
                            <p className='data-texto-libre'>{data.texto}</p>
                            {data.plantillaControl && (
                                <>
                                    <p><strong>Plantilla de control</strong></p>
                                    <div className='data-plantilla-laboratorio'>
                                        <p className='data-plantilla-laboratorio'>Peso: {data.plantillaControl.peso}</p>
                                        <p className='data-plantilla-laboratorio'>Altura: {data.plantillaControl.altura}</p>
                                        <p className='data-plantilla-laboratorio'>Presión arterial: {data.plantillaControl.presion}</p>
                                        <p className='data-plantilla-laboratorio'>Pulso: {data.plantillaControl.pulso}</p>
                                        <p className='data-plantilla-laboratorio'>Saturación: {data.plantillaControl.saturacion}</p>
                                        <p className='data-plantilla-laboratorio'>Nivel azucar: {data.plantillaControl.nivelAzucar}</p>
                                    </div>
                                </>
                            )}
                            {data.laboratorio && (
                                <>
                                    <p><strong>Plantilla de laboratorio: </strong>{data.laboratorio.tiposEstudios[0]}</p>
                                    {data.laboratorio.items.map(item => (
                                        <p key={item}>{item}</p>
                                    ))}
                                </>
                            )}
                            {data.receta && data.receta.length > 0 && (
                                <>
                                    <p><strong>Receta</strong></p>
                                    {data.receta[0].medicamentos && data.receta[0].medicamentos.map((medicamento, index) => (
                                        <p key={index}>{medicamento.descripcion}</p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        );
    };
    
    export default AddEvolution;
    