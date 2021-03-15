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

import AvField from 'availity-reactstrap-validation/lib/AvField';
import AvForm from 'availity-reactstrap-validation/lib/AvForm';
import { serviceGet, servicePost } from '../../helpers/api';
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


class AgentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: getLoggedInUser(),
            modal: false,
            loading: true,
            agentList: [],
            name: '',
            emailAdress: '',
            commissionRate: 10
        };
        this.toggle = this.toggle.bind(this);
        this.createSubAgent = this.createSubAgent.bind(this);
    }

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    componentDidMount() {
        // GET LOAN OFFER DATA USING API
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+ this.state.user.token,
        };
        serviceGet(`api/v1/agent/agents`, headers)
        .then((res) => {
            if(res.data){
                this.setState({
                    agentList: res.data,
                    loading: false
                })
            }
            console.log(res.data);
            console.log(this.state.agentList);
        })
        .catch((err)=> {
            this.setState({
                loading: false
            })
            console.log(err);
        })
        // console.log(this.props);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    createSubAgent = () => {
        console.log('inside create Sub Agent')
        this.toggle();
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+ this.state.user.token,
        };

        let userObject = {
            name: this.state.name,
            emailAdress: this.state.emailAdress,
            commissionRate: this.state.commissionRate
        }
        console.log(userObject);
        this.setState({
            loading: true
        })
        
        servicePost(`api/v1/agent/add-subagent`, userObject, headers)
        .then((res) => {
            if(res.data){
                let updatedSubAgentList = [...this.state.agentList];
                updatedSubAgentList.push(res.data);
                this.setState({
                    agentList: updatedSubAgentList,
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

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.state.className}
                    size={this.state.size}>
                    <ModalHeader toggle={this.toggle}>Add Agent</ModalHeader>
                    <AvForm onValidSubmit={this.createSubAgent}>
                        <ModalBody>
                            <Row>
                                <Col md={12}>
                                    <AvField name="name" label="Name" type="text" required placeholder="Enter Name" autoComplete="false" value={this.state.name} onChange={this.handleChange}
                                                            validate = {{required: {value: true}, pattern: {value: "^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$",  errorMessage: 'Your Name atleast has 4 character and contain ony Alphabets'}}}/>
                                </Col>
                                <Col md={12}>
                                    <AvField name="emailAdress" label="Email Adress" type="text" required placeholder="Enter Email Adress" autoComplete="false" value={this.state.emailAdress} onChange={this.handleChange}
                                                            validate = {{required: {value: true}, email: true /*pattern: {value: [ConstantUtility.EMAIL_REGEX],  errorMessage: 'Enter Valid Email Adress'}*/}}/>
                                </Col>
                                <Col md={12}>
                                    <AvField name="commissionRate" className="custom-range" label="Commission Rate" type="range" required placeholder="Range Placeholder" value={this.state.commissionRate} onChange={this.handleChange}
                                                            validate={{max: {value: 20}, min: {value: 0}}}/>
                                    <div className="mt-2" style={{textAlign : "center", fontWeight : "700"}}><Label style={{fontWeight : "700"}}>{this.state.commissionRate}%</Label></div>
                                </Col>
                            </Row>

                            {/* <FormGroup>
                                <Label for="exampleRange">Commission Rate</Label>
                                <input
                                    className="custom-range"
                                    type="range"
                                    name="range"
                                    id="exampleRange"
                                    placeholder="range placeholder"
                                />
                                 <div className="mt-2" style={{textAlign : "center", fontWeight : "700"}}><Label style={{fontWeight : "700"}}>8%</Label></div>
                            </FormGroup> */}
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
                            <h4 className="mb-1 mt-0">Sub-Agent</h4>
                        </Col>
                        <Col className={'mt-4'} md={12}>
                            <Card>
                                <CardBody className="pb-0">
                                {this.state.agentList.length == 0 && (
                                        <div style={{ textAlign: 'center' }} className="mt-4 mb-4">
                                            <h4>No Agent Present Currently</h4>
                                            <Button
                                                className=""
                                                size={'sm'}
                                                onClick={(e) => {
                                                    this.toggle();
                                                }}
                                                color="primary">
                                                <i className="uil  uil-plus-circle ml-1"></i> Add Sub-Agent
                                            </Button>
                                        </div>
                                    )}

                                    {this.state.agentList.length > 0 && (
                                        <React.Fragment>
                                            <div >
                                                <Button
                                                    className="float-right"
                                                    size={'sm'}
                                                    onClick={(e) => {
                                                        this.toggle();
                                                    }}
                                                    color="primary">
                                                    <i className="uil  uil-plus-circle ml-1"></i> Add Sub-Agent
                                                </Button>                                        
                                            </div>
                                            <br/><br/>
                                            {
                                                <Table hover responsive className="mt-4">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Commission Rate</th>
                                                            <th scope="col">Agent Created</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.agentList.map((agent) => 
                                                        <tr>
                                                        
                                                            <td>{agent.name}</td>
                                                            <td>{agent.email}</td>
                                                            <td>{agent.commissionRate}</td>
                                                            <td>{agent.createdAt}</td>
                                                            <td>
                                                                <i className="ui uil-eye"></i>
                                                                <i className="ui uil-edit ml-2"></i>
                                                                <i className="ui uil-trash-alt ml-2"></i>
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

export default AgentList;
