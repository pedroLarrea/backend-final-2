import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

function ListaConsultas() {
    const [fichas, setFichas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9090/api/ficha')
            .then(response => {
                setFichas(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <table id="listaConsultasId">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Fecha</th>
                    <th>Medico</th>
                    <th>Paciente</th>
                    <th>Opciones</th>
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
                                <Link to={`ficha/${ficha.id}`}><button>Editar</button></Link>
                                <Link to={`ficha/${ficha.id}`}><button>Ver</button></Link>
                                <button>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
}

function App() {
    return (
        <div>
            <div>
                <Link to={`ficha/`}><button>Crear Ficha</button></Link>
            </div>
            <h1><center>Listado de consultas</center></h1>
            <ListaConsultas />
        </div>
    );
}

export default App;