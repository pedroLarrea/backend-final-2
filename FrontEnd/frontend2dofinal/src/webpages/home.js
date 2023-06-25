import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


function ListaConsultas() {
    const [fichas, setFichas] = useState([]);

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
    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div id="mainDivId">
            <table id="listaConsultasId">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Medico</th>
                        <th>Paciente</th>
                        <th><center>Opciones</center></th>
                    </tr>
                </thead>
                <tbody>
                    {fichas.map(ficha => (
                        <tr key={ficha.id}>
                            <td>{ficha.id}</td>
                            <td>{ficha.fecha}</td>
                            <td>{ficha.Medico.nombre} {ficha.Medico.apellido}</td>
                            <td>{ficha.Paciente.nombre} {ficha.Paciente.apellido}</td>
                            <td>
                                <div>
                                    <center>
                                        <Link to={`ficha/${ficha.id}`}><button>Editar</button></Link>
                                        <Link to={`ficha/${ficha.id}`}><button>Ver</button></Link>
                                        <Link to={`detalle/${ficha.id}`}><button>Agregar Detalle</button></Link>
                                        <button onClick={() => handleDelete(ficha.id)}>Eliminar</button>
                                    </center>
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
            <h1><center>Listado de consultas</center></h1>
            <ListaConsultas />
        </div>
    );
}

export default App;