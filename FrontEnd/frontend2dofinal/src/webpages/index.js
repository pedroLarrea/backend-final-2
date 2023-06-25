import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from './home';
import Ficha from './ficha';
import Crear from './crear';
import Detalle from './detalle'

const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/ficha/:id" element={<Ficha/>} />
                <Route path="/ficha/" element={<Crear/>} />
                <Route path="/detalle/:id" element={<Detalle/>} />
            </Routes>
        </BrowserRouter>
    );
};
export default Webpages;