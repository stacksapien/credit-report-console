import React, { Component } from 'react';
import {
    Row,
    Col,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Table,
    CardBody,
    Card,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Modal,
    Form,
    FormGroup,
    Label,
    Input
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


class Dashboard extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()],
            modal: true,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.state.className}
                    size={this.state.size}>
                    <ModalHeader toggle={this.toggle}>Add Loan Request</ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                                <Label for="exampleColor">Loan Amount</Label>
                                <Input
                                    type="number"
                                    name="amount"
                                    id="exampleColor"
                                    placeholder="Enter your amount"
                                    min={0}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleColor">User</Label>
                                <Input
                                    type="select"
                                    name="amount"
                                    id="exampleColor"
                                    placeholder="Select User"
                                    min={0}
                                >
                                    <option>User 1</option>
                                    <option>User 2</option>
                                    <option>User 3</option>
                                    </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleRange">Preferred Loan Tenure</Label>
                                <input
                                    className="custom-range"
                                    type="range"
                                    name="range"
                                    id="exampleRange"
                                    placeholder="range placeholder"
                                />
                                 <div className="mt-2" style={{textAlign : "center", fontWeight : "700"}}><Label style={{fontWeight : "700"}}>6 Months</Label></div>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>
                            Apply
                        </Button>
                        <Button color="secondary" className="ml-1" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

                <div className="">
                    {/* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        {/* <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0">Dashboard</h4>
                        </Col> */}
                        <Col className={'mt-4'} md={12}>
                            <Card>
                                <CardBody className="pb-0">
                                    <Button className="float-right" size={'sm'} onClick={e=>{
                                        this.toggle()
                                    }}  color="primary">
                                        <i className="uil  uil-plus-circle ml-1"></i> Apply For Loan
                                    </Button>

                                    <h5 className="card-title mt-0 mb-0 header-title">Loan Requests</h5>

                                    <Table hover responsive className="mt-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">Request ID</th>
                                                <th scope="col">Amount ($)</th>
                                                <th scope="col">Tenure</th>
                                                <th scope="col">Interest Rate</th>
                                                <th scope="col">User's Email</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#98754</td>
                                                <td>5,000</td>
                                                <td>6 Months</td>
                                                <td>12%</td>
                                                <td>shalom@gmail.com</td>
                                                <td>
                                                    <span className="badge badge-soft-warning py-1">Pending</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>#98753</td>
                                                <td>12,000</td>
                                                <td>1 Year</td>
                                                <td>10%</td>
                                                <td>tom@gmail.com</td>
                                                <td>
                                                    <span className="badge badge-soft-success py-1">Approved</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>#98752</td>
                                                <td>12,000</td>
                                                <td>3 Months</td>
                                                <td>7%</td>
                                                <td>max@gmail.com</td>
                                                <td>
                                                    <span className="badge badge-soft-danger py-1">Declined</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>#98751</td>
                                                <td>5,000</td>
                                                <td>8 Months</td>
                                                <td>10%</td>
                                                <td>ramen@gmail.com</td>
                                                <td>
                                                    <span className="badge badge-soft-success py-1">Approved</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>#98750</td>
                                                <td>12,000</td>
                                                <td>6 Months</td>
                                                <td>7%</td>
                                                <td>tom@gmail.com</td>
                                                <td>
                                                    <span className="badge badge-soft-danger py-1">Declined</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
