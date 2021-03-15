import React, {Component  } from 'react';

import { Row, Col, Label, Card, CardBody, Container, Button, FormGroup } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import PageTitle from '../../components/PageTitle';
import { connect } from 'react-redux';
import { servicePost } from "../../helpers/api";
import { Redirect, withRouter } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { KYC_STATUS_DONE } from '../../constants/utility'

class KycForm extends Component{
    constructor(props){
        super(props)

        this.state= {
            adharNumber: '',
            panNumber: '',
            ifscCode: '',
            accountNumber: '',
            bankName: '',
            name: '',
            redirect: false
        }   
        this.handleChange = this.handleChange.bind(this);  
        this.submitDetails = this.submitDetails.bind(this);   
    }

    componentDidMount() {
        this._isMounted = true;
        // GET ADMIN DATA USING API
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+this.props.user.token,
        };
        servicePost('adminSetting',{}, headers)
        .then((res) => {
            if(res.data){
                this.setState({
                    adminData: res.data
                })
            }
            
            
        })
        .catch((err)=> {
            console.log(err);
        })
        // console.log(this.props);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitDetails(event) {
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+this.props.user.token,
        };

        let kycDetails = {
            adharNumber: this.state.adharNumber,
            panNumber: this.state.panNumber,
            ifscCode: this.state.ifscCode,
            accountNumber: this.state.accountNumber,
            bankName: this.state.bankName,
            name: this.state.name,
            userId: this.props.user.id
        }
        servicePost('api/v1/user/kyc-details', kycDetails, headers)
        .then((res) => {
            if(res.data){
                console.log("data");
                this.setState({
                    redirect: true
                })
            }            
        })
        .catch((err)=> {
            console.log(err);
        })
    }
    renderRedirectToRoot = () => {
        if (this.state.redirect) {
            let cookies = new Cookies();
            let user = cookies.get('user');
            let userCookie = user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
            if (userCookie) {
                userCookie.kycStatus = KYC_STATUS_DONE;
                cookies.remove('user', { path: '/' });
                if (userCookie) cookies.set('user', JSON.stringify(user), { path: '/' });
            }
            return <Redirect to={{
                pathname: '/user/dashboard'
                // state: {kycStatus: `submitted`}
            }} />
        }
    }

    render() {
        return(
            <React.Fragment>
                {this.renderRedirectToRoot()}

                <Row className="page-title">
                    <Col md={12}>
                        <PageTitle
                            // breadCrumbItems={[
                            //     { label: '', path: '/user/kyc-details', active: true },
                            // ]}
                            title={'KYC Details'}
                        />
                    </Col>
                </Row>
                <Container className="center-container">
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>                                    
                                    <AvForm onValidSubmit={this.submitDetails}>
                                        <AvGroup>
                                            <Label for="accountNumber">Account Number</Label>
                                            <AvField type="text" name="accountNumber" id="" placeholder="Enter Account Number" autoComplete="false" value={this.state.accountNumber} onChange={this.handleChange}
                                                validate = {{required: {value: true}, pattern: {value: '^[0-9]+$',  errorMessage: 'Your name must be composed only with numbers'}}}/>
                                        </AvGroup>

                                        <AvGroup>
                                        <Label for="name">Account Holder Name</Label>
                                            <AvField type="text" name="name" id="" placeholder="Enter Account Holder Name" autoComplete="false" value={this.state.name} onChange={this.handleChange}
                                                validate = {{required: {value: true}, pattern: {value: '^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$',  errorMessage: 'Your name must be composed only with letters'}}}/>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label for="ifscCode">IFSC Code</Label>
                                            <AvField type="text" name="ifscCode" id="" placeholder="Enter IFSC Code" value={this.state.ifscCode} autoComplete="false" onChange={this.handleChange}
                                                validate = {{required: {value: true}, pattern: {value: '^[A-Za-z0-9]+$',  errorMessage: 'Your name must be composed only with letters and numbers'}}}/>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label for="bankName">Bank Name</Label>
                                            <AvField type="text" name="bankName" id="" placeholder="Enter Bank Name" value={this.state.bankName} autoComplete="false" onChange={this.handleChange}
                                                validate = {{required: {value: true}, pattern: {value: '^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$',  errorMessage: 'Your name must be composed only with letters'}}}/>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label for="panNumber">PAN Card Number</Label>
                                            <AvField type="text" name="panNumber" id="" placeholder="Enter PAN Card Number" value={this.state.panNumber} autoComplete="false" onChange={this.handleChange}
                                                validate = {{required: {value: true}, pattern: {value: '^[A-Za-z0-9]+$',  errorMessage: 'Your name must be composed only with letters and numbers'}}}/>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label for="adharNumber">Adhar Card Number</Label>
                                            <AvField type="text" name="adharNumber" id="" placeholder="Enter Adhar Card Number" value={this.state.adharNumber} autoComplete="false" onChange={this.handleChange}
                                                validate = {{required: {value: true}, pattern: {value: '^[0-9]+$',  errorMessage: 'Your name must be composed only with numbers'}}}/>
                                        </AvGroup>
                                        <FormGroup className="form-group mb-0 text-center">
                                            <Button color="primary" className="btn-block">Submit</Button>
                                        </FormGroup>
                                    </AvForm>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    // const { user, loading, error } = state.Auth;
    return state.Auth;
};
export default withRouter(connect(mapStateToProps)(KycForm));