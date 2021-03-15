import React, { Component } from 'react';
import {
    Row,
    Col,
    CustomInput,
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
    Input,
} from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { AvForm, AvGroup, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { servicePost, serviceGet, serviceDelete } from '../../helpers/api';
import Flatpickr from 'react-flatpickr';
import { ChevronDown, Mail, Printer, File, Users, Image, ShoppingBag } from 'react-feather';
import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import LoanRequest from '../../components/LoanRequest';
import { ADMIN_ROLE } from '../../constants/utility';
import OverviewWidget from '../../components/OverviewWidget';

import Statistics from './Statistics';
import RevenueChart from './RevenueChart';
import TargetChart from './TargetChart';
import SalesChart from './SalesChart';
import Orders from './Orders';
import Performers from './Performers';
import Tasks from './Tasks';
import Chat from './Chat';

class LoanRequests extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()],
            modal: false,
            loading: true,
            offerData: [],
            principalAmount: null,
            tenure: null,
            purposeOfLoan: '',
            annualIncome: 100000,
            employementStatus: '',
            age: null,
            gender: '',
            commission: null,
            interestRate: null,
            adhaarCard: true,
            panCard: true,
            salarySlip: true,
            documentsRequired: [],
            className: 'modal-lg modal-fullscreen',
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.deleteLoanRequest = this.deleteLoanRequest.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        // GET LOAN OFFER DATA USING API
        let headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + this.state.user.token,
        };
        serviceGet(`api/v1/user/${this.state.user.id}/loan-requests?sort=updatedAt&order=desc`, headers)
            .then((res) => {
                if (res.data) {
                    this.setState({
                        offerData: res.data,
                        loading: false,
                    });
                }
                console.log(res.data);
                console.log(this.state.offerData);
            })
            .catch((err) => {
                console.log(err);
            });
        // console.log(this.props);
    }

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    // handleCheckboxChange = (event) => {
    //     this.setState({
    //         [event.target.name]: event.target.checked
    //     });
    // }

    ///DELTE LOAN REQUEST
    deleteLoanRequest = (requestId) => {
        let headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + this.state.user.token,
        };

        this.setState({
            loading: true,
        });

        serviceDelete(`api/v1/user/loan-requests/${requestId}`, headers)
            .then((res) => {
                if (res.data) {
                    let updatedRequestsData = this.state.offerData.filter((data) => data._id !== requestId);
                    this.setState({
                        offerData: updatedRequestsData,
                        loading: false,
                    });
                }
                console.log(res.data);
                console.log(this.state.offerData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    ///ADD LOAN REQUEST
    submitDetails = (event) => {
        this.toggle();
        let headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + this.state.user.token,
        };

        let loanRequest = {
            principalAmount: this.state.principalAmount,
            tenure: this.state.tenure,
            purposeOfLoan: this.state.purposeOfLoan,
            annualIncome: this.state.annualIncome,
            employementStatus: this.state.employementStatus,
            age: this.state.age,
            gender: this.state.gender,
            userId: this.state.user.id,
        };
        console.log(loanRequest);
        this.setState({
            loading: true,
        });

        servicePost('api/v1/user/loan-request', loanRequest, headers)
            .then((res) => {
                if (res.data.saveLoanRequest) {
                    console.log('data');
                    let updatedRequestsData = [res.data.saveLoanRequest, ...this.state.offerData];
                    this.setState({
                        offerData: updatedRequestsData,
                        loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading: false,
                });
            });
    };

    render() {
        return (
            <React.Fragment>
                <Modal  isOpen={this.state.modal} toggle={this.toggle} className={this.state.className} size={this.state.size}>
                    <ModalHeader toggle={this.toggle}>Add Loan Request</ModalHeader>
                    <ModalBody>
                        <Wizard>
                            <Steps>
                                <Step
                                    id="login"
                                    render={({ next }) => (
                                        <AvForm
                                            onValidSubmit={(event, values) => {
                                                next();
                                            }}>
                                            <AvGroup>
                                                <Label for="principalAmount">Project Name & Background</Label>
                                                <AvField
                                                    type="textarea"
                                                    name="principalAmount"
                                                    id="principalAmount"
                                                    placeholder="Type here"
                                                    autoComplete="false"
                                                    value={this.state.principalAmount}
                                                    onChange={this.handleChange}
                                                />
                                            </AvGroup>

                                            <AvGroup>
                                                <Label for="tenure">Industry Sector</Label>
                                                <AvField
                                                    type="text"
                                                    name="tenure"
                                                    id="tenure"
                                                    placeholder="Relevant Industry Sector Type here"
                                                    autoComplete="false"
                                                    value={this.state.tenure}
                                                    onChange={this.handleChange}
                                                />
                                            </AvGroup>

                                            <AvGroup>
                                                <Label>Purpose of Amount</Label>
                                                <Row className="pl-4">
                                                    <Col md={6}>
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox"
                                                            label="Research & Development"
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="number"
                                                            name="tenure"
                                                            placeholder="Ratio"
                                                            autoComplete="false"
                                                        />
                                                    </Col>

                                                    <Col md={6}>
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox"
                                                            label="Acquisition"
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="number"
                                                            name="tenure"
                                                            placeholder="Ratio"
                                                            autoComplete="false"
                                                        />
                                                    </Col>

                                                    <Col md={6}>
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox"
                                                            label="Working Capital"
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="number"
                                                            name="tenure"
                                                            placeholder="Ratio"
                                                            autoComplete="false"
                                                        />
                                                    </Col>

                                                    <Col md={6}>
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox"
                                                            label="Series [A][B][C][D]"
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="number"
                                                            name="tenure"
                                                            placeholder="Ratio"
                                                            autoComplete="false"
                                                        />
                                                    </Col>

                                                    <Col md={6}>
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox"
                                                            label="Other"
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <AvField
                                                            type="number"
                                                            name="tenure"
                                                            placeholder="Ratio"
                                                            autoComplete="false"
                                                        />
                                                    </Col>
                                                </Row>
                                            </AvGroup>

                                            <AvGroup>
                                                <Label for="principalAmount">Other details on requested amount:</Label>
                                                <AvField
                                                    type="textarea"
                                                    name="principalAmount"
                                                    id="principalAmount"
                                                    placeholder="Other details here...."
                                                />
                                            </AvGroup>
                                            {/*
                                            <AvGroup>
                                                <Label for="purposeOfLoan">Purpose Of Loan</Label>
                                                <AvField type="select" name="purposeOfLoan" value={this.state.purposeOfLoan} onChange={this.handleChange} helpMessage="Select Atleast One!" validate={{required: { value: true }}}>
                                                    <option value="select" selected >Select</option>
                                                    <option value="Expansion of business">Expansion of business</option>
                                                    <option value="Working Capital- Line of credit">Working Capital- Line of credit</option>
                                                    <option value="Invoice Financing">Invoice Financing</option>
                                                    <option value="Invoice Factoring">Invoice Factoring</option>
                                                    <option value="Merchant Cash Advance">Merchant Cash Advance</option>
                                                    <option value="Equipment financing">Equipment financing</option>
                                                    <option value="Small Business loans">Small Business loans</option>
                                                    <option value="Mortgage Loan">Mortgage Loan</option>
                                                    <option value="Paying Payroll">Paying Payroll</option>
                                                    <option value="Professional Loan">Professional Loan</option>
                                                    <option value="Home Loan">Home Loan</option>
                                                    <option value="Personal Loan">Personal Loan</option>
                                                    <option value="Finance a car">Finance a car</option>
                                                    <option value="Buy out a business">Buy out a business</option>
                                                    <option value="Marketing and Promotions">Marketing and Promotions</option>
                                                    <option value="other">Other</option>
                                                </AvField>
                                            </AvGroup>

                                            <AvGroup>
                                                <Label for="employementStatus">What is Your Employement Status</Label>
                                                <AvRadioGroup inline name="employementStatus" value={this.state.employementStatus} required>
                                                    <AvRadio customInput label="Self Employed" value="Self Employed" checked={this.state.employementStatus === "Self Employed"} onChange={this.handleChange} />
                                                    <AvRadio customInput label="Employed" value="Employed" checked={this.state.employementStatus === "Employed"} onChange={this.handleChange}/>
                                                    <AvRadio customInput label="Other" value="Other" checked={this.state.employementStatus === "Other"} onChange={this.handleChange}/>
                                                </AvRadioGroup>
                                            </AvGroup>
*/}
                                            <ul className="list-inline wizard mb-0">
                                                <li className="next list-inline-item float-right">
                                                    <Button color="primary">Next</Button>
                                                </li>
                                            </ul>
                                        </AvForm>
                                    )}
                                />
                                <Step
                                    id="dumbledore"
                                    render={({ previous, next }) => (
                                        <AvForm
                                            onValidSubmit={(event, values) => {
                                                next();
                                            }}>
                                            <AvGroup>
                                                <Label for="principalAmount">Expected returns & incentives</Label>
                                                <AvField
                                                    type="number"
                                                    name="principalAmount"
                                                    id="principalAmount"
                                                    placeholder="-"
                                                />
                                            </AvGroup>

                                            <AvGroup>
                                                <Label for="principalAmount">Timeframe for exit or payback</Label>
                                                <AvField
                                                    type="date"
                                                    name="principalAmount"
                                                    id="principalAmount"
                                                    placeholder="-"
                                                />
                                            </AvGroup>

                                            <AvGroup>
                                                <Label for="principalAmount">Timeframe for disbursement</Label>
                                                <AvField
                                                    type="date"
                                                    name="principalAmount"
                                                    id="principalAmount"
                                                    placeholder="-"
                                                />
                                            </AvGroup>

                                            <AvGroup>
                                                <Label for="principalAmount">Key Factors to consider</Label>
                                                <AvField
                                                    type="textarea"
                                                    name="principalAmount"
                                                    id="principalAmount"
                                                    placeholder=""
                                                />
                                            </AvGroup>

                                            <AvGroup>
                                                <Label for="principalAmount">
                                                    Guarantees viable
                                                    <br />
                                                    (Project And Or/ Project)
                                                </Label>
                                                <AvField
                                                    type="textarea"
                                                    name="principalAmount"
                                                    id="principalAmount"
                                                    placeholder=""
                                                />
                                            </AvGroup>

                                            <AvGroup>
                                                <Label for="principalAmount">Types of Instrument</Label>
                                                <Row className="mt-2">
                                                    <Col md={3}>
                                                        <b>Type & Interest Rate</b>
                                                    </Col>
                                                    <Col md={3}>
                                                        <b>Preferred</b>
                                                    </Col>
                                                    <Col md={3}>
                                                        <b>Acceptable</b>
                                                    </Col>
                                                    <Col md={3}>
                                                        <b>Avoid</b>
                                                    </Col>
                                                    <Col style={{ textAlign: 'center' }} className={'mt-2'} md={3}>
                                                        Loan
                                                    </Col>

                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>

                                                    <Col style={{ textAlign: 'center' }} className={'mt-2'} md={3}>
                                                        Hard Money
                                                    </Col>

                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>

                                                    <Col style={{ textAlign: 'center' }} className={'mt-2'} md={3}>
                                                        Mezanine
                                                    </Col>

                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>

                                                    <Col style={{ textAlign: 'center' }} className={'mt-2'} md={3}>
                                                        Bridge
                                                    </Col>

                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>

                                                    <Col style={{ textAlign: 'center' }} className={'mt-2'} md={3}>
                                                        Equity
                                                    </Col>

                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>

                                                    <Col style={{ textAlign: 'center' }} className={'mt-2'} md={3}>
                                                        Partnership
                                                    </Col>

                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>

                                                    <Col style={{ textAlign: 'center' }} className={'mt-2'} md={3}>
                                                        Line of Credit
                                                    </Col>

                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>

                                                    <Col style={{ textAlign: 'center' }} className={'mt-2'} md={3}>
                                                        BG/LC
                                                    </Col>

                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                    <Col className={'mt-2'} md={3}>
                                                        <AvField
                                                            type="number"
                                                            name="principalAmount"
                                                            id="principalAmount"
                                                            placeholder="-"
                                                        />
                                                    </Col>
                                                </Row>
                                            </AvGroup>
                                            <ul className="list-inline wizard mb-0">
                                                <li className="previous list-inline-item">
                                                    <Button onClick={previous} color="primary">
                                                        Previous
                                                    </Button>
                                                </li>

                                                <li className="next list-inline-item float-right">
                                                    <Button color="primary">Next</Button>
                                                </li>
                                            </ul>
                                        </AvForm>
                                    )}
                                />
                                <Step
                                    id="login-2"
                                    render={({ previous, next }) => (
                                        <AvForm
                                            onValidSubmit={(event, values) => {
                                                next();
                                            }}>
                                            Coming soon....
                                            <ul className="list-inline wizard mb-0">
                                                <li className="previous list-inline-item">
                                                    <Button onClick={previous} color="primary">
                                                        Previous
                                                    </Button>
                                                </li>

                                                

                                                <li className="next list-inline-item float-right">
                                                    <Button color="secondary">Submit</Button>
                                                </li>
                                            </ul>
                                        </AvForm>
                                    )}
                                />
                            </Steps>
                        </Wizard>
                    </ModalBody>
                </Modal>

                <div className="">
                    {/* preloader */}
                    {this.state.loading && <Loader spinner />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-4 mt-0">Loan Requests</h4>
                        </Col>

                        <Col className={''} md={12}>
                            <Card className="mb-0">
                                <CardBody className="bg-light">
                                    {this.state.offerData.length == 0 && (
                                        <div style={{ textAlign: 'center' }} className="mt-4 mb-4">
                                            <h4>No Loan requests present currently</h4>
                                            <Button
                                                className=""
                                                size={'sm'}
                                                onClick={(e) => {
                                                    this.toggle();
                                                }}
                                                color="primary">
                                                <i className="uil  uil-plus-circle ml-1"></i> Add Loan Request
                                            </Button>
                                        </div>
                                    )}

                                    {this.state.offerData.length > 0 && (
                                        <React.Fragment>
                                            <div>
                                                <Button
                                                    className="float-right"
                                                    size={'sm'}
                                                    onClick={(e) => {
                                                        this.toggle();
                                                    }}
                                                    color="primary">
                                                    <i className="uil  uil-plus-circle ml-1"></i> Add Loan Request
                                                </Button>
                                            </div>
                                            <br />
                                            <br />
                                            {this.state.offerData.map((data) => (
                                                <LoanRequest
                                                    key={data._id}
                                                    data={data}
                                                    user={this.state.user}
                                                    deleteRequest={this.deleteLoanRequest}
                                                />
                                            ))}
                                        </React.Fragment>
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default LoanRequests;
