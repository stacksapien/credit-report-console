import React, { Component } from 'react';
import {
    Row,
    Col,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Card,
    CardBody,
    CustomInput,
    Label,
    InputGroupAddon,
    FormGroup,
    Button,
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { ChevronDown, Mail, Printer, File, Users, Image, ShoppingBag } from 'react-feather';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import OverviewWidget from '../../components/OverviewWidget';

import Statistics from './Statistics';
import RevenueChart from './RevenueChart';
import TargetChart from './TargetChart';
import SalesChart from './SalesChart';
import Orders from './Orders';
import Performers from './Performers';
import Tasks from './Tasks';
import Chat from './Chat';
import ReactSignatureCanvas from 'react-signature-canvas';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import FileUploader from '../../components/FileUploader';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()],
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="">
                    {/* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0">KYC</h4>
                        </Col>
                    </Row>

                    {/* stats */}

                    {/* charts */}
                    <Row>
                        <Col sm={12} xl={12}>
                            <Card>
                                <CardBody>
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
                                                <AvField name="City" label="PAN No." type="text" required />
                                                <AvField name="City" label="Aadhar Card No." type="number" required />
                                                <AvField
                                                    name="c-address"
                                                    label="Permanent Address"
                                                    type="textarea"
                                                    required
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <FormGroup>
                                                    <AvInput
                                                        tag={CustomInput}
                                                        type="checkbox"
                                                        name="customCheckbox"
                                                        label="Agree to terms and conditions"
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FileUploader text={'Drop your aadhar card image/pdf here'} />
                                            </Col>
                                            <Col md={6}>
                                            <FileUploader text={'Drop your PAN card image/pdf here'} />
                                            </Col>
                                        </Row>

                                        <Button color="primary" className="mt-4" type="submit">
                                            Submit
                                        </Button>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* charts */}
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
