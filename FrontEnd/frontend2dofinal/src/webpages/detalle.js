import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Detalle.css';

const DetalleForm = props => {
  
  const [fichas, setFichas] = useState([]);
  const [ficha, setFicha] = useState('');
  const { id } = useParams();

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

  useEffect(() => {
      fetchFichaDetails();
  }, []);

  const [formData, setFormData] = useState({
    id: '',
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
    console.log(formData);
  };

  return (
    <div id="CrearDetalleId">
        <p>Ficha ID: {id}</p>
        <p>Medico ID: {ficha.Medico.nombre} </p>
        <p>Paciente ID: {ficha.Paciente.nombre}</p>
        <form onSubmit={handleSubmit}>
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
        <button type="submit">Agregar</button>
        </form>
    </div>
  );
};

export default DetalleForm;