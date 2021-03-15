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
    Input
} from 'reactstrap';
import * as layout from '../constants/layout';  
import { Redirect, withRouter } from 'react-router-dom';

import { serviceGet } from './../helpers/api';
import Loader from './Loader';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
// import { servicePost, serviceGet } from "../../helpers/api";
// import Flatpickr from 'react-flatpickr';
// import { ChevronDown, Mail, Printer, File, Users, Image, ShoppingBag } from 'react-feather';
// import { getLoggedInUser } from '../../helpers/authUtils';
// import Loader from '../../components/Loader';
// import OverviewWidget from '../../components/OverviewWidget';



class AgentLoanRequest extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            modal: false,
            loading: false,
            user: this.props.user,
            offerData: this.props.data,
            agent: this.props.agent
        };
        this.checkStatus = this.checkStatus.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getOffers = this.getOffers.bind(this);
        // this.handleChange = this.handleChange.bind(this);  
        // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);  
        // this.submitDetails = this.submitDetails.bind(this);   
    }

    toggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
    };

    getOffers = (requestId) => {
        console.log(this.state.agent);
        let headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + this.state.agent.token,
        };

        this.toggle();

        this.setState({
            loading: true,
        });

        serviceGet(`api/v1/agent/get-offers/${requestId}`, headers)
            .then((res) => {
                if (res.data) {
                    let updatedRequestsData = this.state.offerData;
                    let updatedOfferData = res.data;
                    updatedRequestsData.offersId = updatedOfferData;
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
    }

    // changeRedirect = () => {
    //     this.setState((prevState) => ({
    //         redirect: !prevState.redirect,
    //     }));
    // };

    // handleChange = (event) => {
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     });
    // }
    // handleCheckboxChange = (event) => {
    //     this.setState({
    //         [event.target.name]: event.target.checked
    //     });
    // }
    
    // submitDetails = (event) => {
    //     this.toggle();
    //     let headers= {
    //         "Content-Type": 'application/json',
    //         "Authorization": 'JWT '+ this.state.user.token,
    //     };

    //     let documents = [];
    //     if (this.state.adhaarCard) documents.push('adhaarCard');
    //     if (this.state.panCard) documents.push('panCard');
    //     if (this.state.salarySlip) documents.push('salarySlip');
    //     let loanOffer = {
    //         adminId: this.state.user.id,
    //         principalAmount: this.state.principalAmount,
    //         tenure: this.state.tenure,
    //         commission: this.state.commission,
    //         interestRate: this.state.interestRate,
    //         documentsRequired: documents
    //     }
    //     console.log(loanOffer);
    //     this.setState({
    //         loading: true
    //     })
        
    //     servicePost('api/v1/admin/add-offer', loanOffer, headers)
    //     .then((res) => {
    //         if(res.data){
    //             console.log("data");
    //             this.setState({
    //                 loading: false
    //             })
    //         }            
    //     })
    //     .catch((err)=> {
    //         console.log(err);
    //     })
    // }

    checkStatus = (status) => {
        switch(status) {
            case layout.STATUS_APPROVED:
                return <span className="badge badge-soft-success py-1">{status}</span>;
            case layout.STATUS_IN_PROCESS:
                return <span className="badge badge-soft-warning py-1">{status}</span>;
            case layout.STATUS_UNDER_VERIFICATION:
                return <span className="badge badge-soft-info py-1">{status}</span>;
            case layout.STATUS_DECLINED:
                return <span className="badge badge-soft-danger py-1">{status}</span>;
            default:
                return <span className="badge badge-soft-secondary py-1">Not Present</span>;
        }
    }

    renderRedirectToLoanView = (offer) => {
        console.log("inside redirect loan view ");
        console.log(this.props);
        this.props.history.push({
            pathname: '/agent/loan/view',
            state: {requestDetail: this.state.offerData, offerDetail: offer, redirectingFrom: 'offer'}
        })
    }

    render() {
        let  offers = [...this.state.offerData.offersId];
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="dialog"
                    size={this.state.size}>
                    <ModalHeader toggle={this.toggle}>Offers</ModalHeader>
                    {this.state.loading && <Loader/>}
                    {offers.length > 0 ?
                    <AvForm onValidSubmit={this.submitDetails}>
                        <ModalBody>
                        <Table hover responsive className="mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Amount ($)</th>
                                    <th scope="col">Tenure (Month)</th>
                                    <th scope="col">Interest Rate (%)</th>
                                    <th scope="col">Commission (%)</th>
                                    <th scope="col">Offer Valid From</th>
                                    {!layout.STATUS_TYPES_APPROVED_DECLINED.includes(this.state.offerData.status) &&
                                    <th scope="col">Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                { offers.map((offer) => 
                                <tr key={offer.createdAt}>
                                    <td>{offer.principalAmount}</td>
                                    <td>{offer.tenure}</td>
                                    <td>{offer.interestRate}</td>
                                    <td>{offer.commission}</td>
                                    <td>{offer.createdAt}</td>
                                    {!layout.STATUS_TYPES_APPROVED_DECLINED.includes(this.state.offerData.status) &&
                                    <td> 
                                        <Button type="button" color="primary" className="btn-sm" onClick={() => this.renderRedirectToLoanView(offer)}>
                                            View
                                        </Button>
                                    </td>}
                                </tr> )}
                            </tbody>
                        </Table> 
                            
                        </ModalBody>
                        {/* <ModalFooter>
                            <FormGroup className="form-group mb-0 text-center"> */}
                                                {/* <Button color="primary" className="btn-block">Submit</Button> */}
                                {/* <Button color="primary">
                                    Add
                                </Button>
                                <Button color="secondary" className="ml-1" onClick={this.toggle}>
                                    Cancel
                                </Button>
                            </FormGroup>
                        </ModalFooter> */}
                    </AvForm> : <h4 className="m-3 pb-4 pt-2">Request is in Process</h4>}
                </Modal>
                <Card>
                    <CardBody className="pb-0">
                        <Table hover responsive className="mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Amount ($)</th>
                                    <th scope="col">Tenure (Month)</th>                                
                                    <th scope="col">Request Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.offerData.principalAmount}</td>
                                    <td>{this.state.offerData.tenure}</td>
                                    <td>{this.state.offerData.createdAt}</td>
                                    <td>{this.checkStatus(this.state.offerData.status)}</td>
                                    <td>
                                        <Button type="button" color="primary" className="btn-sm" onClick={() => this.getOffers(this.state.offerData._id)}>
                                            View Offers
                                        </Button>
                                        <Button onClick={() => this.props.deleteRequest(this.state.offerData._id)} color="secondary" className="btn-sm ml-1">
                                            Delete Request
                                        </Button> 
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default withRouter(AgentLoanRequest);
