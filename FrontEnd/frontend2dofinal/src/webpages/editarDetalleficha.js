import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { useParams, Link } from 'react-router-dom';

const DetalleList = props => {
    const { id } = useParams();
    const [detalles, setDetalles] = useState([]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9090/api/ficha/detalle/${id}`)
            .then((response) => {
                console.log(response.data);
                fetchRecords();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const fetchRecords = () => {
        axios.get(`http://localhost:9090/api/ficha/completo/${id}`)
            .then(response => {
                setDetalles(response.data.Detalles);
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
                <thead className="cabecaraEditarDetalle">
                    <tr>
                        <th>Id</th>
                        <th>Motivo</th>
                        <th>Diagnostico</th>
                        <th>Tratamiento</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody className="listaDetalle">
                    {detalles.map(detalle => (
                        <tr key={detalle.id}>
                            <td>{detalle.id}</td>
                            <td>{detalle.motivo}</td>
                            <td>{detalle.diagnostico}</td>
                            <td>{detalle.tratamiento}</td>
                            <td>
                                <div>
                                    <button className="botonEliminar" onClick={() => handleDelete(detalle.id)}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Link to={`/detalle/${id}`}><button>Agregar Detalle</button></Link>
            </div>
        </div>
    );
}


function App() {
    return (
        <div>
            <h1><center>Listado de Consultas</center></h1>
            <DetalleList />
        </div>
    );
}

export default App;