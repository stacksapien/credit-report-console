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
    UncontrolledTooltip
} from 'reactstrap';
import * as layout from '../constants/layout';  
import { servicePost } from '../helpers/api';
import { withRouter } from 'react-router-dom';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { serviceGet } from './../helpers/api';
import Loader from './Loader';
// import { servicePost, serviceGet } from "../../helpers/api";
// import Flatpickr from 'react-flatpickr';
// import { ChevronDown, Mail, Printer, File, Users, Image, ShoppingBag } from 'react-feather';
// import { getLoggedInUser } from '../../helpers/authUtils';
// import Loader from '../../components/Loader';
// import OverviewWidget from '../../components/OverviewWidget';



class AdminLoan extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            loading: false,
            modalType: "attachOffer", 
            tooltipOpen: false,
            userCred: this.props.userCred,
            user: this.props.user,
            requestData: this.props.data,
            offerData: [],
            principalAmount: null,
            tenure: null,
            commission: null,
            interestRate: null,
            adhaarCard: true,
            panCard: true,
            salarySlip: true,
            documentsRequired: []
        };
        this.checkStatus = this.checkStatus.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.handleChange = this.handleChange.bind(this);  
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);  
        this.submitDetails = this.submitDetails.bind(this);  
        this.redirectToRequestView = this.redirectToRequestView.bind(this); 
        this.renderRedirectToLoanView = this.renderRedirectToLoanView.bind(this);
        this.getOffers = this.getOffers.bind(this);
    }

    getOffers = (requestId) => {
        let headers = {
            'Content-Type': 'application/json',
            Authorization: 'JWT ' + this.state.userCred.token,
        };

        this.toggle("viewOffer");

        this.setState({
            loading: true,
        });

        serviceGet(`api/v1/admin/get-offers/${requestId}`, headers)
            .then((res) => {
                if (res.data) {
                    let updatedRequestsData = this.state.requestData;
                    let updatedOfferData = res.data;
                    updatedRequestsData.offersId = updatedOfferData;
                    this.setState({
                        requestData: updatedRequestsData,
                        loading: false,
                    });
                }
                console.log(res.data);
                console.log(this.state.requestData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    toggle = (modal) => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
            modalType: modal
        }));
        console.log(this.state.modal);
    };

    toggleTooltip = () => {
        this.setState((prevState) => ({
            tooltipOpen: !prevState.tooltipOpen,
        }));
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleCheckboxChange = (event) => {
        this.setState({
            [event.target.name]: event.target.checked
        });
    }
    
    submitDetails = (event) => {
        this.toggle();
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+ this.state.userCred.token,
        };

        let documents = [];
        if (this.state.adhaarCard) documents.push('adhaarCard');
        if (this.state.panCard) documents.push('panCard');
        if (this.state.salarySlip) documents.push('salarySlip');
        let loanOffer = {
            adminId: this.state.userCred.id,
            principalAmount: this.state.principalAmount,
            tenure: this.state.tenure,
            commission: this.state.commission,
            interestRate: this.state.interestRate,
            documentsRequired: documents
        }
        console.log(loanOffer);
        this.setState({
            loading: true
        })
        
        servicePost(`api/v1/admin/add-offer/request/${this.state.requestData._id}`, loanOffer, headers)
        .then((res) => {
            if(res.data){
                let updatedData = this.state.requestData;
                updatedData.offersId.push(res.data);
                this.setState({
                    requestData: updatedData,
                    loading: false
                })
            }            
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    redirectToRequestView = () => {
        console.log("inside redirect loan request ");
        var acceptedOffer;
        const offers = [...this.state.requestData.offersId];
        if(this.state.requestData.acceptedOfferId != null) {
            acceptedOffer =  offers.find((offer) => offer._id === this.state.requestData.acceptedOfferId);
        }
        console.log(this.state.user);
        console.log(this.state.userCred);
        this.props.history.push({
            pathname: '/admin/loan/view',
            state: {requestDetail: this.state.requestData, userDetail: this.state.user, redirectingFrom: 'request', acceptedOffer: acceptedOffer}
        })
    }
    
    renderRedirectToLoanView = (offer) => {
        console.log("inside redirect loan view ");
        console.log(this.props);
        this.props.history.push({
            pathname: '/admin/loan/view',
            state: {requestDetail: this.state.requestData, userDetail: this.state.user, redirectingFrom: 'offer', acceptedOffer: offer}
        })
        // this.props.history.push({
        //     pathname: '/user/loan/view',
        //     state: {requestDetail: this.state.requestData, offerDetail: offer, redirectingFrom: 'adminLoan'}
        // })
    }

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

    render() {
        let  offers = this.state.requestData.offersId;
        return (
            <React.Fragment>
                {/* Attach Offer Modal  */}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="dialog"
                    size={this.state.size}>
                        {this.state.loading && <Loader/>}
                     {this.state.modalType === "attachOffer" ? <ModalHeader toggle={this.toggle}>Add Loan Offers</ModalHeader>: <ModalHeader toggle={this.toggle}>Offers</ModalHeader>}
                    {this.state.modalType === "attachOffer" ?
                            <AvForm onValidSubmit={this.submitDetails}>
                                <ModalBody>
                                    <AvGroup>
                                        <Label for="principalAmount">Principal Amount</Label>
                                        <AvField type="text" name="principalAmount" id="principalAmount" placeholder="Enter Principal Amount" autoComplete="false" value={this.state.principalAmount} onChange={this.handleChange}
                                                            validate = {{required: {value: true}, pattern: {value: '^[0-9]+$',  errorMessage: 'Your name must be composed only with numbers'}}}/>
                                    </AvGroup>

                                    <AvGroup>
                                        <Label for="tenure">Tenure (Months)</Label>
                                        <AvField type="text" name="tenure" id="tenure" placeholder="Enter Tenure" autoComplete="false" value={this.state.tenure} onChange={this.handleChange}
                                                            validate = {{required: {value: true}, pattern: {value: '^[0-9]+$',  errorMessage: 'Your name must be composed only with numbers'}}}/>
                                    </AvGroup>

                                    <AvGroup>
                                        <Label for="commission">Commission (%)</Label>
                                        <AvField type="text" name="commission" id="commission" placeholder="Enter Commission" autoComplete="false" value={this.state.commission} onChange={this.handleChange}
                                                            validate = {{required: {value: true}, pattern: {value: '^[0-9]+$',  errorMessage: 'Your name must be composed only with numbers'},
                                                            maxLength: {value: 2, errorMessage: 'Commission must be less than 100%'}}}/>
                                    </AvGroup>

                                    <AvGroup>
                                        <Label for="interestRate">Interest Rate (%)</Label>
                                        <AvField type="text" name="interestRate" id="interestRate" placeholder="Enter Interest Rate" autoComplete="false" value={this.state.interestRate} onChange={this.handleChange}
                                                            validate = {{required: {value: true}, pattern: {value: '^[0-9]+$',  errorMessage: 'Your name must be composed only with numbers'},
                                                            maxLength: {value: 2, errorMessage: 'Interest Rate must be less than 100%'}}}/>
                                    </AvGroup>

                                    <FormGroup>
                                        <Label for="exampleColor">Required Documents </Label> <br />
                                            <CustomInput type="checkbox" name="adhaarCard" id="adhaarCard" defaultChecked="true" onChange={this.handleCheckboxChange} required className="pl-4" label="Adhaar Card" inline/>
                                            <CustomInput type="checkbox" name="panCard" id="panCard" defaultChecked="true"  onChange={this.handleCheckboxChange} required className="pl-4" label="Pan Card" inline />
                                            <CustomInput type="checkbox" name="salarySlip" id="salarySlip" defaultChecked="true" onChange={this.handleCheckboxChange} required className="pl-4" label="Salary Slip" inline />
                                    </FormGroup>                                    
                                </ModalBody>
                                <ModalFooter>
                                    <FormGroup className="form-group mb-0 text-center">
                                                    {/* <Button color="primary" className="btn-block">Submit</Button> */}
                                        <Button color="primary">
                                            Add
                                        </Button>
                                        <Button color="secondary" className="ml-1" onClick={this.toggle}>
                                            Cancel
                                        </Button>
                                    </FormGroup>
                                </ModalFooter>
                            </AvForm> :
                        (this.state.modalType == "viewOffer" && offers.length > 0) ?            
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
                                        <th scope="col">Action</th>
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
                                        <td> 
                                            <Button type="button" color="primary" className="btn-sm" onClick={() => this.renderRedirectToLoanView(offer)}>
                                                View
                                            </Button>
                                        </td>
                                    </tr> )}
                                </tbody>
                            </Table> 
                                
                            </ModalBody>
                        </AvForm> : <h4 className="m-3 pb-4 pt-2">No Offer Submitted</h4>}
                </Modal>

                <Card>
                    <CardBody className="pb-0">
                        <Table hover responsive className="mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Amount ($)</th>
                                    <th scope="col">Tenure</th>
                                    <th scope="col">User Email</th>
                                    <th scope="col">Request Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{cursor: "pointer"}}>
                                    <td onClick={() => this.redirectToRequestView()}>{this.state.requestData.createdBy.name}</td>
                                    <td onClick={() => this.redirectToRequestView()}>{this.state.requestData.principalAmount}</td>
                                    <td onClick={() => this.redirectToRequestView()}>{this.state.requestData.tenure}</td>
                                    <td onClick={() => this.redirectToRequestView()}>{this.state.requestData.createdBy.email}</td>
                                    <td onClick={() => this.redirectToRequestView()}>{this.state.requestData.createdAt}</td>
                                    <td onClick={() => this.redirectToRequestView()}>{this.checkStatus(this.state.requestData.status)}</td>   
                                    <td>
                                        <i className="ui uil-eye ml-2 cursor" id="viewOffer" onClick={() => this.getOffers(this.state.requestData._id)}></i>
                                        <UncontrolledTooltip placement="top" target="viewOffer">View All Offers</UncontrolledTooltip>
                                        <i className="ui uil-edit ml-2 cursor" id="attachOffer" onClick={() => this.toggle("attachOffer")}></i>
                                        <UncontrolledTooltip placement="top" target="attachOffer">Attach Offer</UncontrolledTooltip>
                                        <i className="ui uil-trash-alt ml-2 cursor" id="deleteRequest" onClick={() => this.props.deleteRequest(this.state.requestData._id)}></i>
                                        <UncontrolledTooltip placement="top" target="deleteRequest">Delete Request</UncontrolledTooltip>
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

export default withRouter(AdminLoan);
