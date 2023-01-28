import React, {useEffect, useState} from "react";
import { Button, Col, Form, Row, Spinner} from "react-bootstrap";
import ocorrencieSchema from "../validation/schemas/ocorrencieSchema";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const LocationComponent = ({latitude, longitude, register, errors}) => {
    return <>
        <Col>
            <Form.Control
                {...register('latitude')}
                type="text"
                placeholder="Latitude"
                value={latitude}
                readOnly={latitude}
            />
            <p>{errors.latitude ? (errors.latitude.message) : null}</p>
        </Col>
        <Col>
            <Form.Control
                {...register('longitude')}
                type="text"
                placeholder="Longitude"
                value={longitude}
                readOnly={longitude}
            />
            <p>{errors.longitude ? (errors.longitude.message) : null}</p>
        </Col>
    </>
}

const CreateOcorrencie = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [isLoadingLocation, setIsLoadingLocation] = useState(true);
    const {register, handleSubmit, formState : {errors}, reset} = useForm({
        resolver: yupResolver(ocorrencieSchema)
    });

    const getCurrentLocation = async () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setIsLoadingLocation(false);
            });
        }else{
            alert("Seu dispotivo não dá suporte para localização, desculpe!");
        }
    }

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const onSubmit = async (data) => {
        console.log(data);
        window.location.reload();
        reset();
    }

    return <section>
        <h1 className="text-center">Registrar ocorrência</h1>
        <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    {...register('description')}
                    type="text"
                    placeholder="Descrição da ocorrência"
                />
                <p>{errors.description ? (errors.description.message) : null}</p>
            </Form.Group>
            <h2 className="text-center">Localização (automático)</h2>
            <Row>
                {!isLoadingLocation
                    ? <LocationComponent
                        register={register}
                        latitude={latitude}
                        longitude={longitude}
                        errors={errors}
                        />
                    : <Row className="justify-content-center">
                        <Spinner className="text-center mt-2 mb-2" variant="primary" animation="border" />
                        </Row>
                }
            </Row>
            <Row className="justify-content-center">
                <Button variant="success" type="submit">
                    Salvar ocorrência
                </Button>
            </Row>
        </Form>
    </section>
};

export default CreateOcorrencie;