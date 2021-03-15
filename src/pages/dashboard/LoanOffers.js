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
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { servicePost, serviceGet } from '../../helpers/api';
import Flatpickr from 'react-flatpickr';
import { ChevronDown, Mail, Printer, File, Users, Image, ShoppingBag } from 'react-feather';
import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import LoanOffer from '../../components/LoanOffer';
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

class LoanOffers extends Component {
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
            commission: null,
            interestRate: null,
            adhaarCard: true,
            panCard: true,
            salarySlip: true,
            documentsRequired: [],
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        // GET LOAN OFFER DATA USING API
        let headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + this.state.user.token,
        };
        serviceGet(`api/v1/admin/${this.state.user.id}/get-offers`, headers)
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
    handleCheckboxChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked,
        });
    };

    submitDetails = (event) => {
        this.toggle();
        let headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + this.state.user.token,
        };

        let documents = [];
        if (this.state.adhaarCard) documents.push('adhaarCard');
        if (this.state.panCard) documents.push('panCard');
        if (this.state.salarySlip) documents.push('salarySlip');
        let loanOffer = {
            adminId: this.state.user.id,
            principalAmount: this.state.principalAmount,
            tenure: this.state.tenure,
            commission: this.state.commission,
            interestRate: this.state.interestRate,
            documentsRequired: documents,
        };
        console.log(loanOffer);
        this.setState({
            loading: true,
        });

        servicePost('api/v1/admin/add-offer', loanOffer, headers)
            .then((res) => {
                if (res.data) {
                    console.log('data');
                    this.setState({
                        loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.state.className}
                    size={this.state.size}>
                    <ModalHeader toggle={this.toggle}>Add Loan Offers</ModalHeader>
                    <AvForm onValidSubmit={this.submitDetails}>
                        <ModalBody>
                            <AvGroup>
                                <Label for="principalAmount">Principal Amount</Label>
                                <AvField
                                    type="text"
                                    name="principalAmount"
                                    id="principalAmount"
                                    placeholder="Enter Principal Amount"
                                    autoComplete="false"
                                    value={this.state.principalAmount}
                                    onChange={this.handleChange}
                                    validate={{
                                        required: { value: true },
                                        pattern: {
                                            value: '^[0-9]+$',
                                            errorMessage: 'Your name must be composed only with numbers',
                                        },
                                    }}
                                />
                            </AvGroup>

                            <AvGroup>
                                <Label for="tenure">Tenure (Months)</Label>
                                <AvField
                                    type="text"
                                    name="tenure"
                                    id="tenure"
                                    placeholder="Enter Tenure"
                                    autoComplete="false"
                                    value={this.state.tenure}
                                    onChange={this.handleChange}
                                    validate={{
                                        required: { value: true },
                                        pattern: {
                                            value: '^[0-9]+$',
                                            errorMessage: 'Your name must be composed only with numbers',
                                        },
                                    }}
                                />
                            </AvGroup>

                            <AvGroup>
                                <Label for="commission">Commission (%)</Label>
                                <AvField
                                    type="text"
                                    name="commission"
                                    id="commission"
                                    placeholder="Enter Commission"
                                    autoComplete="false"
                                    value={this.state.commission}
                                    onChange={this.handleChange}
                                    validate={{
                                        required: { value: true },
                                        pattern: {
                                            value: '^[0-9]+$',
                                            errorMessage: 'Your name must be composed only with numbers',
                                        },
                                        maxLength: { value: 2, errorMessage: 'Commission must be less than 100%' },
                                    }}
                                />
                            </AvGroup>

                            <AvGroup>
                                <Label for="interestRate">Interest Rate (%)</Label>
                                <AvField
                                    type="text"
                                    name="interestRate"
                                    id="interestRate"
                                    placeholder="Enter Interest Rate"
                                    autoComplete="false"
                                    value={this.state.interestRate}
                                    onChange={this.handleChange}
                                    validate={{
                                        required: { value: true },
                                        pattern: {
                                            value: '^[0-9]+$',
                                            errorMessage: 'Your name must be composed only with numbers',
                                        },
                                        maxLength: { value: 2, errorMessage: 'Interest Rate must be less than 100%' },
                                    }}
                                />
                            </AvGroup>

                            <FormGroup>
                                <Label for="exampleColor">Required Documents </Label> <br />
                                <CustomInput
                                    type="checkbox"
                                    name="adhaarCard"
                                    id="adhaarCard"
                                    defaultChecked="true"
                                    onChange={this.handleCheckboxChange}
                                    required
                                    className="pl-4"
                                    label="Adhaar Card"
                                    inline
                                />
                                <CustomInput
                                    type="checkbox"
                                    name="panCard"
                                    id="panCard"
                                    defaultChecked="true"
                                    onChange={this.handleCheckboxChange}
                                    required
                                    className="pl-4"
                                    label="Pan Card"
                                    inline
                                />
                                <CustomInput
                                    type="checkbox"
                                    name="salarySlip"
                                    id="salarySlip"
                                    defaultChecked="true"
                                    onChange={this.handleCheckboxChange}
                                    required
                                    className="pl-4"
                                    label="Salary Slip"
                                    inline
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <FormGroup className="form-group mb-0 text-center">
                                {/* <Button color="primary" className="btn-block">Submit</Button> */}
                                <Button color="primary">Add</Button>
                                <Button color="secondary" className="ml-1" onClick={this.toggle}>
                                    Cancel
                                </Button>
                            </FormGroup>
                        </ModalFooter>
                    </AvForm>
                </Modal>

                <div className="">
                    {/* preloader */}
                    {this.state.loading && <Loader spinner />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-4 mt-0">Loan Offers</h4>
                        </Col>
                        <Col className={''} md={12}>
                            <Card className="mb-0">
                                <CardBody className="bg-light">
                                    {this.state.user.role[0] === ADMIN_ROLE ? (
                                        <React.Fragment>
                                            {this.state.offerData.length == 0 && (
                                                <div style={{textAlign : "center"}} className="mt-4 mb-4">
                                                    <h4>No offers present currently.<br/>Attach loan offers to loan requests.</h4>
                                                    {/* <Button
                                                        
                                                        size={'md'}
                                                        onClick={(e) => {
                                                            this.toggle();
                                                        }}
                                                        color="primary">
                                                        <i className="uil  uil-plus-circle ml-1"></i> Add Loan Offers
                                                    </Button> */}
                                                </div>
                                            )}
                                            {this.state.offerData.length > 0 && (
                                                <div className="">
                                                   
                                                    {/* <Button
                                                        className="float-right"
                                                        size={'sm'}
                                                        onClick={(e) => {
                                                            this.toggle();
                                                        }}
                                                        color="primary">
                                                        <i className="uil  uil-plus-circle ml-1"></i> Add Loan Offers
                                                    </Button> */}
                                                    {this.state.offerData.map((data) => <LoanOffer data={data} user={this.state.user} />)}
                                                </div>
                                                
                                            )}
                                        </React.Fragment>
                                    ) : null}
                                </CardBody>
                            </Card>
                            
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default LoanOffers;
