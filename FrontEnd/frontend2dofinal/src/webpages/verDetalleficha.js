import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css';
import { useParams } from 'react-router-dom';

const DetalleList = props => {
    const { id } = useParams();
    const [detalles, setDetalles] = useState([]);
    const [textoBuscar, setTextoBuscar] = useState('');

    const [filters, setFilters] = useState({
        motivo: '',
        diagnostico: '',
        tratamiento: ''
    });

    //Para el buscador

    const filteredData = detalles.filter((item) => {
        const { motivo, diagnostico, tratamiento } = item;
        const { idDetalle, motivo: motivoFilter, diagnostico: diagnosticoFilter, tratamiento: tratamientoFilter } = filters;
        return (
            idDetalle ? item.id.toLowerCase().includes(idDetalle) : true  &&
            motivo.toLowerCase().includes(motivoFilter.toLowerCase()) &&
            diagnostico.toLowerCase().includes(diagnosticoFilter.toLowerCase()) &&
            tratamiento.toLowerCase().includes(tratamientoFilter.toLowerCase())
        );
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    //Fin del buscador

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

            
            FILTRAR LISTA
            <hr />
            <div id="buscadorId">
                <label>Id:</label>
                <input type="text" name="idDetalle" value={filters.idDetalle} onChange={handleFilterChange} placeholder="Filtre por Id" />
                <label>Motivo:</label>
                <input type="text" name="motivo" value={filters.motivo} onChange={handleFilterChange} placeholder="Filtre por Paciente Motivo" />
                <label>Diagnostico:</label>
                <input type="text" name="diagnostico" value={filters.diagnostico} onChange={handleFilterChange} placeholder="Filtre por Diagnostico" />
                <label>Tratamiento:</label>
                <input type="text" name="tratamiento" value={filters.tratamiento} onChange={handleFilterChange} placeholder="Filtre por Tratamiento" />
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
                    {filteredData.map(detalle => (
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