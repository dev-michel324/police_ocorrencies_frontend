import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import OcorrenciesList from "../components/ocorrenciesList";

const Home = () => {
    return <>
        <header>
            <h1 className="text-center"><b>Registro de ocorrências</b></h1>
        </header>
        <section>
            <div className="text-center mt-5 mb-5">
                <Link to="/ocorrencies/create">
                    <Button variant="primary">Registrar nova ocorrência</Button>
                </Link>
            </div>
        </section>
        <section>
            <h1 className="text-center mt-2">Ocorrências registradas</h1>
            <OcorrenciesList />
        </section>
    </>
};

export default Home;