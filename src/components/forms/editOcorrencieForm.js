import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ocorrencieSchema from "../../validation/schemas/ocorrencieSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Row, Spinner, Col } from "react-bootstrap";
import api from "../../services/axios";

const EditOcorrencieForm = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [ocorrencie, setOcorrencie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ocorrencieSchema),
  });

  const getOcorrencie = () => {
    api.get(`/ocorrencies/${id}`)
        .then((res) => {
            if(res.status >= 200 && res.status <= 299){
                setOcorrencie(res.data);
                setIsLoading(false);
            }else
                throw new Error(res);
        }).catch((err) => console.log(err));
  };

  useEffect(() => {
    getOcorrencie();
  }, []);

  const editOcorrencieSubmit = (data) => {
    console.log(data);
    api.put(`/ocorrencies/${id}`, data)
        .then((res) => {
            if(res.status >= 200 && res.status <= 299)
                navigator('/');
            else
                throw new Error(res);
        }).catch(err => console.log(err));
  };

  if(isLoading){
    return <section>
            <Row className="justify-content-center">
                <Spinner animation="border" variant="primary" className="mt-5" />
            </Row>
        </section>
  }

  return (
    <Form onSubmit={handleSubmit(editOcorrencieSubmit)}>
      <Form.Group controlId="descriptionForm">
        <Form.Label>Descrição</Form.Label>
        <Form.Control {...register('description')} type="text" defaultValue={ocorrencie.description}/>
        <p>{errors.description?.message}</p>
      </Form.Group>
      <h2 className="text-center">Localização</h2>
      <Row>
      <Col>
          <Form.Control
            {...register("latitude")}
            type="text"
            placeholder="Latitude"
            value={ocorrencie.latitude}
            readOnly={ocorrencie.latitude}
          />
          <p>{errors.latitude ? errors.latitude.message : null}</p>
        </Col>
        <Col>
          <Form.Control
            {...register("longitude")}
            type="text"
            placeholder="Longitude"
            value={ocorrencie.longitude}
            readOnly={ocorrencie.longitude}
          />
          <p>{errors.longitude ? errors.longitude.message : null}</p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Button type="submit" variant="success">Salvar</Button>
      </Row>
    </Form>
  );
};

export default EditOcorrencieForm;
