import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from './home';
import VerFicha from './verDetalleficha';
import EditarFicha from './editarDetalleficha';
import CrearFicha from './crear';
import Detalle from './detalle'

const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/ficha/:id" element={<VerFicha/>} />
                <Route path="/ficha/editar/:id" element={<EditarFicha/>} />
                <Route path="/ficha/" element={<CrearFicha/>} />
                <Route path="/detalle/:id" element={<Detalle/>} />
            </Routes>
        </BrowserRouter>
    );
};
export default Webpages;