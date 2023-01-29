import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CreateOcorrencie from "./pages/createOcorrencie";
import EditOcorrencie from "./pages/editOcorrencie";

import Home from "./pages/home";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" exact />
                <Route element={<CreateOcorrencie />} path="/ocorrencies/create" />
                <Route element={<EditOcorrencie/>} path="/ocorrencies/edit/:id" />
            </Routes>
        </BrowserRouter>
    )
};

export default AppRoutes;