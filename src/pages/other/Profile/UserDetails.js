import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';

const Activities = () => {
    return (
        <React.Fragment>
            <AvForm>
                <Row>
                    <Col md={6}>
                        <AvField name="firstname" label="First Name" type="text" required />
                    </Col>
                    <Col md={6}>
                        <AvField name="lastname" label="Last Name" type="text" required />
                    </Col>
                    <Col md={6}>
                        <AvField name="City" label="City" type="text" required />
                        <AvField name="State" label="State" type="text" required />
                        <AvField name="Zip" label="Zip" type="text" required />
                    </Col>
                    <Col md={6}>
                        <AvField name="City" label="Field 1." type="text" required />
                        <AvField name="City" label="Field 2." type="number" required />
                        <AvField name="c-address" label="Permanent Address" type="textarea" required />
                    </Col>
                    <Col md={6}>
                        <div className="btn btn-primary">Update</div>
                    </Col>
                </Row>
            </AvForm>
        </React.Fragment>
    );
};

export default Activities;
