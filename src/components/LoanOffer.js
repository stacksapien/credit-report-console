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
import { ADMIN_ROLE } from '../constants/utility';
// import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
// import { servicePost, serviceGet } from "../../helpers/api";
// import Flatpickr from 'react-flatpickr';
// import { ChevronDown, Mail, Printer, File, Users, Image, ShoppingBag } from 'react-feather';
// import { getLoggedInUser } from '../../helpers/authUtils';
// import Loader from '../../components/Loader';
// import OverviewWidget from '../../components/OverviewWidget';



class LoanOffer extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: this.props.user,
            offerData: this.props.data
        };
        // this.handleChange = this.handleChange.bind(this);  
        // this.handleCheckboxChange = this.handleCheckboxChange.bind(this);  
        // this.submitDetails = this.submitDetails.bind(this);   
    }

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

    render() {
        return (
            <Card>
                <CardBody className="pb-0">
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
                            <tr>
                                <td>{this.state.offerData.principalAmount}</td>
                                <td>{this.state.offerData.tenure}</td>
                                <td>{this.state.offerData.interestRate}</td>
                                <td>{this.state.offerData.commission}</td>
                                <td>{this.state.offerData.createdAt}</td>
                                <td>
                                    {this.state.user.role[0] === ADMIN_ROLE ? 
                                        <Button type="button" color="warning" className="btn-sm">
                                            Edit
                                        </Button>:
                                        <Button color="primary" className="btn-sm">
                                            Take Offer
                                        </Button>}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        );
    }
}

export default LoanOffer;
