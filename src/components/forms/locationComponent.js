import React from "react";
import { Form, Col } from "react-bootstrap";

const LocationComponent = ({ latitude, longitude, register, errors }) => {
    return (
      <>
        <Col>
          <Form.Control
            {...register("latitude")}
            type="text"
            placeholder="Latitude"
            value={latitude}
            readOnly={latitude}
          />
          <p>{errors.latitude ? errors.latitude.message : null}</p>
        </Col>
        <Col>
          <Form.Control
            {...register("longitude")}
            type="text"
            placeholder="Longitude"
            value={longitude}
            readOnly={longitude}
          />
          <p>{errors.longitude ? errors.longitude.message : null}</p>
        </Col>
      </>
    );
  };

export default LocationComponent;