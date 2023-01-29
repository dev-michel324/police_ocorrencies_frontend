import React, {useState, useEffect} from "react";
import { Spinner, Table, Row, Col } from "react-bootstrap";
import api from "../services/axios";
import {FaPencilAlt, FaTrashAlt} from "react-icons/fa";
import { Link } from "react-router-dom";

const OcorrenciesList = () => {
    const [ocorrencies, setOcorrencies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getOcorrencies = () => {
        api.get('/ocorrencies')
            .then((res) => {
                if(res.status >= 200 && res.status <= 299){
                    setOcorrencies(res.data);
                    setIsLoading(false);
                }else{
                    throw new Error(res);
                }
            }).catch((err) => console.log(err));
    }

    const deleteOcorrencie = (id) => {
        api.delete(`/ocorrencies/${id}`)
            .then((res) => {
                if(res.status >= 200 && res.status <= 299)
                    getOcorrencies();
                else
                    throw new Error(res);
            }).catch((err) => console.log(err));
    };

    useEffect(() => {
        getOcorrencies();
    }, []);

    if(isLoading){
        return <section>
            <Row className="justify-content-center">
                <Spinner animation="border" variant="primary" className="mt-5" />
            </Row>
        </section>
    }

    return <Table responsive striped bordered hover className="text-center">
        <thead>
            <tr>
                <th>Descrição</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            {ocorrencies.map((ocorrencie) => {
                return (
                    <tr key={ocorrencie.id}>
                        <td>{ocorrencie.description}</td>
                        <td>{ocorrencie.latitude}</td>
                        <td>{ocorrencie.longitude}</td>
                        <td>
                            <Row>
                                <Col>
                                    <Link to={`/ocorrencies/edit/${ocorrencie.id}`}><FaPencilAlt /></Link>
                                </Col>
                                <Col>
                                    <FaTrashAlt style={{color: "red"}} onClick={() => deleteOcorrencie(ocorrencie.id)} />
                                </Col>
                            </Row>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </Table>

};

export default OcorrenciesList;