import React from "react";
import EditOcorrencieForm from "../components/forms/editOcorrencieForm";

const EditOcorrencie = () => {
    return <>
        <h1 className="text-center"><b>Editar ocorrência</b></h1>
        <section>
            <EditOcorrencieForm />
        </section>
    </>
};

export default EditOcorrencie;