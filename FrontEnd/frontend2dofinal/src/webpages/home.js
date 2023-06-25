import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { Link } from 'react-router-dom';


function ListaConsultas() {
    const [fichas, setFichas] = useState([]);
    //query
    const[query, setQuery]=useState();
    console.log(fichas.filter(ficha=>ficha.Medico.nombre.toLowerCase().includes("g")));

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
            
            <input type="text" placeholder='Search...' 
            className='search' 
            onChange={e=>setQuery(e.target.value)}/>

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
                    {fichas.filter(ficha=>
                    ficha.id.toLowerCase().includes(query)).map(ficha => (
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

            
            <ul className='list'>
                {}
            </ul>
        </div>

    );
}

export default App;