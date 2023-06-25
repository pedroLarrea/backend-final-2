import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { Link } from 'react-router-dom';


function ListaConsultas() {
    const [fichas, setFichas] = useState([]);
    const [textoBuscar, setTextoBuscar] = useState('');
    const [filters, setFilters] = useState({
        fecha: '',
        medicoEspecialidad: '',
        medicoNombre: '',
        medicoApellido: '',
        pacienteNombre: '',
        pacienteApellido: ''
      });

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9090/api/ficha/${id}`)
            .then((response) => {
                console.log(response.data);
                fetchRecords();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const fetchRecords = () => {
        axios.get('http://localhost:9090/api/ficha')
            .then(response => {
                setFichas(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    //Para el buscador

    const filteredData = fichas.filter((item) => {
        const { Fecha, Medico, Paciente } = item;
        const { fecha, medicoEspecialidad, medicoNombre, medicoApellido, pacienteNombre, pacienteApellido } = filters;

        const formattedFecha = Fecha ? Fecha.toString() : '';

        return (
          formattedFecha.includes(fecha) &&
          Medico.especialidad.toLowerCase().includes(medicoEspecialidad.toLowerCase()) &&
          Medico.nombre.toLowerCase().includes(medicoNombre.toLowerCase()) &&
          Medico.apellido.toLowerCase().includes(medicoApellido.toLowerCase()) &&
          Paciente.nombre.toLowerCase().includes(pacienteNombre.toLowerCase()) &&
          Paciente.apellido.toLowerCase().includes(pacienteApellido.toLowerCase())
        );
      });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
      };

    //Fin del buscador

    useEffect(() => {
        fetchRecords();
    }, []);

    const search = event => {
        event.preventDefault();
        if (event.target.value) {

            let filtered = fichas.filter(item => {
                return (
                    item.id == event.target.value ||
                    item.fecha ==  event.target.value ||
                    item.Medico.nombre.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.Medico.apellido.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.Medico.especialidad.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.Paciente.nombre.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.Paciente.apellido.toLowerCase().includes(event.target.value.toLowerCase()) 
                );
            });
            setFichas(filtered);
            setTextoBuscar(event.target.value);

        } else {
            fetchRecords();
            setTextoBuscar("");
        }

        console.log("fichas:", fichas);
        console.log("event.target.value:", event.target.value);
    };

    return (
        <div id="mainDivId">
            <div id="filtrarTabla">
                <input type="search" placeholder="Buscar en todos los campos" value={textoBuscar} onChange={search} />
            </div>
            <div>
                <input type="text" name="fecha" value={filters.fecha} onChange={handleFilterChange} placeholder="Filtre por Fecha" />
                <input type="text" name="medicoEspecialidad" value={filters.medicoEspecialidad} onChange={handleFilterChange} placeholder="Filtre por especialidad" />
                <input type="text" name="medicoNombre" value={filters.medicoNombre} onChange={handleFilterChange} placeholder="Filtre por Medico Nombre" />
                <input type="text" name="medicoApellido" value={filters.medicoApellido} onChange={handleFilterChange} placeholder="Filtre por Medico Apellido" />
                <input type="text" name="pacienteNombre" value={filters.pacienteNombre} onChange={handleFilterChange} placeholder="Filtre por Paciente Nombre" />
                <input type="text" name="pacienteApellido" value={filters.pacienteApellido} onChange={handleFilterChange} placeholder="Filtre por Paciente Apellido" />
            </div>
            <table id="listaConsultasId">
                <thead className="cabecaraGeneral">
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Medico</th>
                        <th>Especialidad</th>
                        <th>Paciente</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody className="listaDetalle">
                    {filteredData.map(ficha => (
                        <tr key={ficha.id}>
                            <td>{ficha.id}</td>
                            <td>{ficha.fecha}</td>
                            <td>{ficha.Medico.nombre} {ficha.Medico.apellido}</td>
                            <td>{ficha.Medico.especialidad}</td>
                            <td>{ficha.Paciente.nombre} {ficha.Paciente.apellido}</td>
                            <td>
                                <div>
                                    <Link to={`ficha/editar/${ficha.id}`}><button className="botonEditar">Editar</button></Link>
                                    <Link to={`ficha/${ficha.id}`}><button className="botonVer">Ver</button></Link>
                                    <button className="botonEliminar" onClick={() => handleDelete(ficha.id)}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Link to={`ficha/`}><button>Crear Ficha</button></Link>
            </div>
        </div>
    );
}

function App() {
    return (
        <div>
            <h1><center>Listado de Fichas</center></h1>
            <ListaConsultas />
        </div>
    );
}

export default App;