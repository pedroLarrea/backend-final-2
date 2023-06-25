import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { useParams } from 'react-router-dom';

const DetalleList = props => {
    const { id } = useParams();
    const [detalles, setDetalles] = useState([]);
    const [textoBuscar, setTextoBuscar] = useState('');

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

    const search = event => {
        event.preventDefault();
        if (event.target.value) {

            let filtered = detalles.filter(item => {
                return (
                    item.id == event.target.value ||
                    item.motivo.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.diagnostico.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    item.tratamiento.toLowerCase().includes(event.target.value.toLowerCase())
                );
            });
            setDetalles(filtered);
            setTextoBuscar(event.target.value);

        } else {
            fetchRecords();
            setTextoBuscar("");
        }

        console.log("detalles:", detalles);
        console.log("event.target.value:", event.target.value);
    };

    return (
        <div id="mainDivId">
            <div id="filtrarTabla">
                <input type="search" placeholder="Buscar en todos los campos" value={textoBuscar} onChange={search} />
            </div>
            <table id="listaConsultasId">
                <thead className="cabecaraVerDetalle">
                    <tr>
                        <th>Id</th>
                        <th>Motivo</th>
                        <th>Diagnostico</th>
                        <th>Tratamiento</th>
                    </tr>
                </thead>
                <tbody className="listaDetalle">
                    {detalles.map(detalle => (
                        <tr key={detalle.id}>
                            <td>{detalle.id}</td>
                            <td>{detalle.motivo}</td>
                            <td>{detalle.diagnostico}</td>
                            <td>{detalle.tratamiento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
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