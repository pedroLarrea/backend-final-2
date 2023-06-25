import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { Link } from 'react-router-dom';


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
            <tr class="header">
                <th style={{ width: "10%" }}>Id</th>
                <th style={{ width: "40%" }}>Fecha</th>
                <th style={{ width: "20%" }}>Medico</th>
                <th style={{ width: "20%" }}>Paciente</th>
                <th style={{ width: "10%" }}>Opciones</th>
            </tr>
            {fichas.map(ficha => (
                <tr>
                    <td>{ficha.id}</td>
                    <td>{ficha.fecha}</td>
                    <td>{ficha.Medico.nombre} {ficha.Medico.apellido}</td>
                    <td>{ficha.Paciente.nombre} {ficha.Medico.apellido}</td>
                    <td><div>
                        <Link to={`ficha/${ficha.id}`}><button>Editar</button></Link>
                        <Link to={`ficha/${ficha.id}`}><button>Ver</button></Link>
                        <button>Eliminar</button>
                    </div></td>
                </tr>
            ))}
        </table>

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