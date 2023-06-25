import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const DetalleForm = props => {
  const [formData, setFormData] = useState({
    id: '',
    motivo: '',
    diagnostico: '',
    tratamiento: ''
  });
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
        <p>Ficha ID: {id}</p>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="idField">ID:</label>
            <input
            type="text"
            id="idField"
            name="id"
            value={formData.id}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="motivoField">Motivo:</label>
            <textarea
            id="motivoField"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="diagnosticoField">Diagnostico:</label>
            <textarea
            id="diagnosticoField"
            name="diagnostico"
            value={formData.diagnostico}
            onChange={handleChange}
            />
        </div>
        <div>
            <label htmlFor="tratamientoField">Tratamiento:</label>
            <textarea
            id="tratamientoField"
            name="tratamiento"
            value={formData.tratamiento}
            onChange={handleChange}
            />
        </div>
        <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default DetalleForm;