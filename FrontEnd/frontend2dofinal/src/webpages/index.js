import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from './home';
import Ficha from './ficha';
const Webpages = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/ficha/:id" element={<Ficha/>} />
            </Routes>
        </BrowserRouter>
    );
};
export default Webpages;