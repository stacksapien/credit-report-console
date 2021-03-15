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
    Input,
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { ChevronDown, Mail, Printer, File, Users, Image, ShoppingBag } from 'react-feather';

import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import OverviewWidget from '../../components/OverviewWidget';

import { serviceGet, servicePost } from '../../helpers/api';
import * as ConstantUtility from '../../constants/utility';
import Statistics from './Statistics';
import RevenueChart from './RevenueChart';
import TargetChart from './TargetChart';
import SalesChart from './SalesChart';
import Orders from './Orders';
import Performers from './Performers';
import Tasks from './Tasks';
import Chat from './Chat';
import FileUploader from '../../components/FileUploader';
import AvInput from 'availity-reactstrap-validation/lib/AvInput';
import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()],
            modal: false,
            loading: true,
            userList: [],
            name: '',
            emailAdress: '',
        };
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitDetails = this.submitDetails.bind(this);
        this.redirectToLoanRequests = this.redirectToLoanRequests.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        // GET LOAN OFFER DATA USING API
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+ this.state.user.token,
        };
        serviceGet(`api/v1/agent/${this.state.user.id}/get-users`, headers)
        .then((res) => {
            if(res.data){
                this.setState({
                    userList: res.data,
                    loading: false
                })
            }
            console.log(res.data);
            console.log(this.state.requestData);
        })
        .catch((err)=> {
            this.setState({
                loading: false
            })
            console.log(err);
        })
    }    

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitDetails = (event) => {
        console.log('inside submit')
        this.toggle();
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+ this.state.user.token,
        };

        let userObject = {
            agentId: this.state.user.id,
            name: this.state.name,
            emailAdress: this.state.emailAdress,
        }
        console.log(userObject);
        this.setState({
            loading: true
        })
        
        servicePost(`api/v1/agent/add-user`, userObject, headers)
        .then((res) => {
            if(res.data){
                let updatedUserList = [...this.state.userList];
                updatedUserList.push(res.data);
                this.setState({
                    userList: updatedUserList,
                    loading: false
                })
            }            
        })
        .catch((err)=> {
            this.setState({
                loading: false
            })
            console.log(err);
        })
    }

    redirectToLoanRequests = (userId) => {
        console.log("inside redirect user Loan Request ");
        console.log(this.props);
        this.props.history.push({
            pathname: '/agent/loan/request',
            state: {userId: userId}
        })
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={'modal-dialog modal-m'}
                    size={this.state.size}>
                    <ModalHeader toggle={this.toggle}>Add User</ModalHeader>
                    <AvForm onValidSubmit={this.submitDetails}>
                        <ModalBody>
                            <Row>
                                <Col md={6}>
                                    <AvField name="name" label="Name" type="text" required placeholder="Enter Name" autoComplete="false" value={this.state.name} onChange={this.handleChange}
                                                            validate = {{required: {value: true}, pattern: {value: '^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$',  errorMessage: 'Your Name must Contain ony Alphabets'}}}/>
                                </Col>
                                <Col md={6}>
                                    <AvField name="emailAdress" label="Email Adress" type="text" required placeholder="Enter Email Adress" autoComplete="false" value={this.state.emailAdress} onChange={this.handleChange}
                                                            validate = {{required: {value: true}, /*pattern: {value: [ConstantUtility.EMAIL_REGEX],  errorMessage: 'Enter Valid Email Adress'}*/}}/>
                                </Col>
                                {/* <Col md={4}>
                                    <AvField name="lastname" label="Last Name" type="text" required />
                                </Col>
                                <Col md={4}>
                                    <AvField name="City" label="City" type="text" required />
                                </Col>

                                <Col md={4}>
                                    
                                    <AvField name="State" label="State" type="text" required />
                                    <AvField name="Zip" label="Zip" type="text" required />
                                </Col>
                                <Col md={4}>
                                    <AvField name="City" label="PAN No." type="text" required />
                                    <AvField name="City" label="Aadhar Card No." type="number" required />
                                    
                                </Col>
                                <Col md={4}>
                                <AvField name="c-address" label="Permanent Address" type="textarea" required />
                                </Col> */}
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary">
                                Create
                            </Button>
                            <Button color="secondary" className="ml-1" onClick={this.toggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

                <div className="">
                    {/* preloader */}
                    {this.state.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-3 mt-0">Users</h4>
                        </Col>
                        <Col className={' '} md={12}>
                            <Card>
                                <CardBody className="pb-0">
                                {this.state.userList.length == 0 && (
                                        <div style={{ textAlign: 'center' }} className="mt-4 mb-4">
                                            <h4>No Users Present Currently</h4>
                                            <Button
                                                className=""
                                                size={'sm'}
                                                onClick={(e) => {
                                                    this.toggle();
                                                }}
                                                color="primary">
                                                <i className="uil  uil-plus-circle ml-1"></i> Add User
                                            </Button>
                                        </div>
                                    )}

                                    {this.state.userList.length > 0 && (
                                        <React.Fragment>
                                            <div >
                                                <Button
                                                    className="float-right"
                                                    size={'sm'}
                                                    onClick={(e) => {
                                                        this.toggle();
                                                    }}
                                                    color="primary">
                                                <i className="uil  uil-plus-circle ml-1"></i> Add User
                                                </Button>
                                                
                                            </div>
                                            <br/><br/>
                                            {
                                                <Table hover responsive className="mt-4">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">User Created</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.userList.map((user) => 
                                                <tr>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>

                                                    <td>
                                                        {user.createdAt}
                                                    </td>
                                                    <td>
                                                    <Button color="primary" size={'sm'} onClick={() => this.redirectToLoanRequests(user._id)}>
                                                        View Requests
                                                    </Button>
                                                    </td>
                                                </tr>)}
                                            </tbody>
                                        </Table>
                                            }
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

export default Dashboard;
