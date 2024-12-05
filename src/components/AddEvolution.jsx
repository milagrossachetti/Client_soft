import { FileText, NotepadTextDashed, Microscope, Pill, CirclePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import SearchMedicamentos from '../components/SearchMedicamentos'
import '../styles/addevolution.css';

const AddEvolution = ({ patient, diagnosticoId }) => {
    const [medicamentosSeleccionado, setMedicamentosSeleccionado] = useState([]);
    const diagnostico = patient.historiaClinica.diagnosticos.find(
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
                items: [],
                estado: 'Pendiente'
            },
            receta: [{
                medicamentos: ['', '']
            }]
        }
    });
    const [labSelected, setLabSelected] = useState(null);
    const nombreDiagnostico = diagnostico.nombreDiagnostico;
    const [selectedItems, setSelectedItems] = useState([]);
    const [buttonSelected, setButtonSelected] = useState(null);
    const itemsLabSelected = labs.find(lab => lab.name == labSelected)?.items;

    const handleChange = (event) => {
        setLabSelected(event.target.value);
        setValue('laboratorio.tiposEstudios', [event.target.value]);
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

    const onSubmit = (data) => {
        console.log("Evoluciones guardadas:", data);
    };

    const deleteMedicamentoSeleccionado = (medicamentoSeleccionado) => {
        setMedicamentosSeleccionado((prevMedicamentos) =>
            prevMedicamentos.filter((medicamento) => medicamento !== medicamentoSeleccionado)
        );
    };

    return (
        <div className="evolutions">
            <div className="buttons-evolutions">
                <h2>
                    Agregar evolución a{" "}
                    <span style={{ color: "#4a4aa1" }}>{nombreDiagnostico}</span>
                </h2>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="content-add-evolution">
                <div className="content-add">
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
                                <input id="peso" type="number" step="0.1" {...register('plantillaControl.peso')} className='input-button-control' />
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
                                <input id="puslo" type="number" {...register('plantillaControl.pulso')} className='input-button-control' />
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
                    {/*ver como agregar en la lista  */}
                    {buttonSelected === "laboratorio" && (
                        <div className='lab'>
                            <h4>Plantilla de laboratorio</h4>
                            <select name="type-labs" id="type-labs" onChange={handleChange} className='select-lab'>
                                {labs.map((lab, index) => (
                                    <option value={lab.name} key={index}>{lab.name}</option>
                                ))
                                }
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
                            <SearchMedicamentos onSelectMedicamentos={setMedicamentosSeleccionado} />
                            <div className='container-list-medicamentos'>
                                <h4>Medicamentos seleccionados</h4>
                                {medicamentosSeleccionado && medicamentosSeleccionado.length > 0 && medicamentosSeleccionado.map(
                                    medicamentoSeleccionado => (
                                        <div key={medicamentoSeleccionado.codigo} className='list-medicamentos'>
                                            <p >{medicamentoSeleccionado.descripcion}</p>
                                            <button onClick={() => { deleteMedicamentoSeleccionado(medicamentoSeleccionado) }} className='button-delete-medicamento'><Trash2 size={18} /></button>
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
                        <button type="submit" className='button-evolutions button-add-evolution'><CirclePlus size={18} style={{ marginRight: '10px' }} />Agregar evolución </button>
                    </div>
                    <pre>{JSON.stringify(watch(), null, 2)}</pre>

                </div>

            </form>
        </div >
    );
};

export default AddEvolution;
