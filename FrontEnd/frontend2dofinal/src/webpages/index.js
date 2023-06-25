import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from './home';
import Ficha from './ficha';
import Crear from './crear';
const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/ficha/:id" element={<Ficha/>} />
                <Route path="/ficha/" element={<Crear/>} />
            </Routes>
        </BrowserRouter>
    );
};
export default Webpages;