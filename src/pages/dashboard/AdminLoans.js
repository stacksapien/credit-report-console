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
import { serviceGet, serviceDelete } from '../../helpers/api';
import AdminLoan from '../../components/AdminLoan';
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
            modal: false,
            loading: true,
            requestData: null
        };
        this.toggle = this.toggle.bind(this);
        this.deleteLoanRequest = this.deleteLoanRequest.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        // GET LOAN OFFER DATA USING API
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+ this.state.user.token,
        };
        serviceGet(`api/v1/admin/loan-requests?sort=updatedAt&order=desc`, headers)
        .then((res) => {
            if(res.data){
                this.setState({
                    requestData: res.data,
                    loading: false
                })
            }
            console.log(res.data);
            console.log(this.state.requestData);
        })
        .catch((err)=> {
            console.log(err);
        })
    }    

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };


    ///DELTE LOAN REQUEST
    deleteLoanRequest = (requestId) => {
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+ this.state.user.token,
        };
        
        this.setState({
            loading: true
        })

        serviceDelete(`api/v1/admin/loan-requests/${requestId}`, headers)
        .then((res) => {
            if(res.data){
                let updatedRequestsData = this.state.requestData.filter((data) => data._id !== requestId);
                this.setState({
                    requestData: updatedRequestsData,
                    loading: false
                })
            }
            console.log(res.data);
            console.log(this.state.requestData);
        })
        .catch((err)=> {
            console.log(err);
        }) 
    }

    render() {
        return (
            <React.Fragment>
                
                {/* <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.state.className}
                    size={this.state.size}>
                    <ModalHeader toggle={this.toggle}>View Loan Request</ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                                <Label for="exampleColor">Loan Amount</Label>
                                <Input
                                style={{ background : "darkgray"}}
                                    type="number"
                                    name="amount"
                                    id="exampleColor"
                                    placeholder="Enter your amount"
                                    min={0}
                                    value={this.state.requestData.principalAmount}
                                    disabled
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleColor">Tenure</Label>
                                <Input
                                style={{ background : "darkgray"}}
                                    type="select"
                                    name="amount"
                                    id="exampleColor"
                                    placeholder={this.state.requestData.tenure}
                                    min={0}
                                    disabled
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleRange">Loan Interest</Label>
                                <input
                                    className="custom-range"
                                    type="range"
                                    name="range"
                                    id="exampleRange"
                                    placeholder="range placeholder"
                                />
                                 <div className="mt-2" style={{textAlign : "center", fontWeight : "700"}}><Label style={{fontWeight : "700"}}>12 %</Label></div>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="exampleColor">Status</Label>
                                <Input
                                
                                    type="select"
                                    name="amount"
                                    id="exampleColor"
                                    placeholder={this.state.requestData.status}
                                    min={0} 
                                    disabled
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>
                            Update
                        </Button>
                        <Button color="secondary" className="ml-1" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal> */}

                <div className="">
                    {/* preloader */}
                    {this.state.loading && <Loader spinner/>}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-3 mt-0">Loan Requests (Click on Loan request to view it)</h4>
                        </Col>
                        <Col className={''} md={12}>
                            {this.state.requestData != null ? 
                                    this.state.requestData.map((data) => <AdminLoan key={data._id} data={data} user={data.createdBy} userCred={this.state.user} deleteRequest={this.deleteLoanRequest}/>):
                                    <Card className="mb-0">
                                        <CardBody className="bg-light">
                                            <div style={{textAlign : "center"}} className="mt-4 mb-4">
                                                <h4>No Requests Present Currently</h4> 
                                            </div>
                                        </CardBody>
                                    </Card>}
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
