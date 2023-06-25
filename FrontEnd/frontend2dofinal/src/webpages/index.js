import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from './home';
import Ficha from './ficha';
import Crear from './crear';
import Detalles from './detalles'

const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/ficha/:id" element={<Ficha/>} />
                <Route path="/ficha/" element={<Crear/>} />
                <Route path="/ficha-detalles/:id" component={Detalles} />
            </Routes>
        </BrowserRouter>
    );
};
export default Webpages;