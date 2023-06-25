import React, { useState } from 'react';

const Form = () => {
  const [fecha, setFecha] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [medicoId, setMedicoId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare the data object to send to the backend
    const data = {
      fecha,
      pacienteId,
      medicoId,
    };
  
    // Make a POST request to your backend endpoint
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
        console.log(result); // You can customize this based on your requirements
        
        // Reset form fields
        setFecha('');
        setPacienteId('');
        setMedicoId('');
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      });
  };

  return (
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
        <input
          type="string"
          id="pacienteId"
          value={pacienteId}
          onChange={(e) => setPacienteId(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="medicoId">Medico ID:</label>
        <input
          type="string"
          id="medicoId"
          value={medicoId}
          onChange={(e) => setMedicoId(e.target.value)}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
