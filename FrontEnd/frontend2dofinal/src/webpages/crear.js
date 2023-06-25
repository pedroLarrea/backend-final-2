import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [pacienteId, setPacienteId] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const fetchMedicos = () => {
    axios.get('http://localhost:9090/api/medico')
      .then((response) => {
        setMedicos(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const fetchPacientes = () => {
    axios.get('http://localhost:9090/api/paciente')
      .then((response) => {
        setPacientes(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
      fetchMedicos();
      fetchPacientes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepara el dato para enviar al backend
    const data = {
      fecha,
      pacienteId,
      medicoId,
    };

    fetch('http://127.0.0.1:9090/api/ficha', {
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
        
        // Resetea campos del form
        setFecha('');
        setPacienteId('');
        setMedicoId('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleMedicoSeleccionado = (e) => {
    setMedicoId(e.target.value);
  };

  const handlePacienteSeleccionado = (e) => {
    setPacienteId(e.target.value);
  };

  return (
    <div>
      <h1><center>Crear Ficha</center></h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="pacienteId">Paciente ID:</label>
          <select id="picklist" value={pacienteId} onChange={handlePacienteSeleccionado}>
            <option value="">-- Seleccione --</option>
            {pacientes.map((paciente) => (
              <option key={paciente.id} value={paciente.id}>{paciente.nombre} {paciente.apellido}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="medicoId">Medico ID:</label>
          <select id="picklist" value={medicoId} onChange={handleMedicoSeleccionado}>
            <option value="">-- Seleccione --</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>{medico.nombre} {medico.apellido}</option>
            ))}
          </select>
        </div>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default Form;
