import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Detalle.css';

const DetalleForm = props => {
  const { id } = useParams();
  const [fichaId, setFichaId] = useState(id);
  const [tratamiento, setTratamiento] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [motivo, setMotivo] = useState('');


  const [fichas, setFichas] = useState([]);
  const [ficha, setFicha] = useState('');
  

  const fetchFichaDetails = () => {
      axios.get(`http://localhost:9090/api/ficha/${id}`)
          .then(response => {
            console.log(response.data);
            setFicha(response.data);
          })
          .catch(error => {
              console.error(error);
          });
  }

  const [formData, setFormData] = useState({
    fichaId: id,
    motivo: '',
    diagnostico: '',
    tratamiento: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepara el dato para enviar al backend
    const data = {
      fichaId,
      motivo,
      diagnostico,
      tratamiento
    };
    
    
    setFichaId(id);
    console.log(JSON.stringify(data));
    fetch('http://127.0.0.1:9090/api/ficha/detalle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response from the backend
        console.log(result);
        console.log(result.id);
        // Resetea campos del form
        setMotivo('');
        setDiagnostico('');
        setTratamiento('');
        //navigate(`/detalle/${result.id}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchFichaDetails();
  }, []);

  return (
    <div id="CrearDetalleId">
        <p>Ficha ID: {id}</p>
        <p>Medico ID: {ficha.medicoId} </p>
        <p>Paciente ID: {ficha.pacienteId}</p>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="motivoField">Motivo:</label>
            <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} required/>
        </div>
        <div>
            <label htmlFor="diagnosticoField">Diagnostico:</label>
            <textarea value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} required/>
        </div>
        <div>
            <label htmlFor="tratamientoField">Tratamiento:</label>
            <textarea value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} required/>
        </div>
        <button type="submit">Agregar</button>
        </form>
    </div>
  );
};

export default DetalleForm;