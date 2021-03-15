import React, { Component } from 'react';
import {
    Row,
    Col,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Card,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    Input,
    TabContent,
    TabPane,
    Modal,
    ModalBody,
    Button,
    ModalHeader,
    ModalFooter
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import {
    ChevronDown,
    Mail,
    Printer,
    File,
    Users,
    Image,
    ShoppingBag,
    DollarSign,
    Calendar,
    Check,
    CheckCircle,
    PenTool,
} from 'react-feather';

import SignaturePad from 'react-signature-canvas';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { getLoggedInUser } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import OverviewWidget from '../../components/OverviewWidget';

import Statistics from './Statistics';
import TargetChart from './TargetChart';
import SalesChart from './SalesChart';
import Orders from './Orders';
import Performers from './Performers';
import Tasks from './Tasks';
import Chat from './Chat';
import StatisticsChartWidget from '../../components/StatisticsChartWidget';
import FeatherIcons from '../uikit/Icons/Feather';
import Chart from 'react-apexcharts';
import classnames from 'classnames';

import * as ConstantUtility from '../../constants/utility';
import * as layout from '../../constants/layout';  
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import FileUploader from '../../components/FileUploader';
import { serviceGet, servicePost } from '../../helpers/api';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = { 
            modal: false,
            user: this.props.location.state.userDetail,
            userCred: getLoggedInUser(),
            activeTab: 0,
            pageNumber: null,
            loading: true,
            redirectingFrom: this.props.location.state.redirectingFrom,
            offerDetail: this.props.location.state.acceptedOffer,
            requestDetail: this.props.location.state.requestDetail,
            requestData: null,
        };
        this.toggle = this.toggle.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.clearSigPad = this.clearSigPad.bind(this);
        this.saveSignatureAndApproveRequest = this.saveSignatureAndApproveRequest.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.checkAllDocumentpresent = this.checkAllDocumentpresent.bind(this);
        this.checkAcceptedOffer = this.checkAcceptedOffer.bind(this);
        // this.requestDocument = this.requestDocument.bind(this);
    }

    sigPad = {}

    clearSigPad = () => {
        this.sigPad.clear();
    }

    rejectRequest = () => {
        this.setState({
            loading: true
        });

        let headers= {
            "Content-Type": 'multipart/form-data',
            "Authorization": 'JWT '+ this.state.userCred.token,
        };
        const data = new FormData()
            data.append('userId', this.state.user.id);
            data.append('requestId', this.state.requestDetail._id);
        console.log(data);
        servicePost(`api/v1/admin/reject-request`, data, headers)
            .then((res) => {
                console.log(res);
                this.setState({
                    loading: false,
                    requestDetail: res.data
                })
                this.sigPad.clear();
                this.modalToggle();
                console.log(" updated requestDetail detail  ");
                console.log(this.state.request);
            }).catch((err) => {
                this.setState({
                    loading: false,
                })
                this.sigPad.clear();
                console.log(err);
            })
    }

    saveSignatureAndApproveRequest = () => {
        if(!this.sigPad.isEmpty()) {
            console.log(this.sigPad.getTrimmedCanvas()
                .toDataURL('image/png'))
            this.setState({
                loading: true
            });

            let headers= {
                "Content-Type": 'multipart/form-data',
                "Authorization": 'JWT '+ this.state.userCred.token,
            };

            const data = new FormData();
            data.append("base64FileUrl", this.sigPad.getTrimmedCanvas().toDataURL('image/png'));
            data.append("requestId", this.state.requestDetail._id);
            data.append("offerId", this.state.offerDetail._id); 
            data.append("userId", this.state.userCred.id );
            data.append("signature", 'adminSignature' );
            //Uploading Signature
            servicePost(`api/v1/document/upload?isSignature=true`, data, headers)
            .then((res) => {
                console.log(res);
                this.setState({
                    loading: false,
                    requestDetail: res.data
                })
                this.sigPad.clear();
                this.modalToggle();
                console.log(" updated requestDetail detail  ");
                console.log(this.state.request);
            }).catch((err) => {
                this.setState({
                    loading: false,
                })
                this.sigPad.clear();;
                console.log(err);
            })
        }
    }

    modalToggle = () => {
        this.setState((prevState) => ({
            modal: !prevState.modal,
        }));
        console.log("inside modal toggle" + this.state.modal);
    };

    componentDidMount() {
        let headers= {
            "Content-Type": 'application/json',
            "Authorization": 'JWT '+ this.state.userCred.token,
        };
        console.log(this.state.requestDetail._id);
        serviceGet(`api/v1/admin/loan-request/${this.state.requestDetail._id}`, headers)
        .then((res) => {
            if(res.data){
                try {
                    let offer = res.data.offersId.find((offer) => offer._id === this.state.offerDetail._id)
                    console.log(offer);
                this.setState({
                    requestDetail: res.data,
                    offerDetail: offer,
                    loading: false
                })
                } catch (error) {
                    this.setState({
                        requestDetail: res.data,
                        
                        loading: false
                    })   
                }
                
            }
            console.log("Loan Request Data  => ");
            console.log(res.data);
            console.log(this.state.requestDetail);
            console.log(res.data.offersId);
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    sigPad = {}

    clearSigPad = () => {
        this.sigPad.clear();
    }

    componentWillUnmount() {
        // this.abortController.abort();
    }


    uploadFile = (files, offerId, documentType) => {
        this.setState({
            loading: true
        })
        let headers= {
            "Content-Type": 'multipart/form-data',
            "Authorization": 'JWT '+ this.state.userCred.token,
        };
        const data = new FormData();
        data.append("userId", this.state.userCred.id );
        data.append("document", files[0]);
        data.append("offerId", offerId);
        data.append("documentType", documentType);
    
        servicePost(`api/v1/document/upload`, data, headers)
        .then((res) => {
            console.log(res);
            let updatedOffer = this.state.offerDetail;
            updatedOffer.requiredDocuments = res.data.requiredDocuments
            console.log(updatedOffer);
            this.setState({
                loading: false,
                offerDetail: updatedOffer
            })
            console.log(" updated offer detail  ");
            console.log(this.state.offerDetail);
        }).catch((err) => {
            this.setState({
                loading: false
            })
            console.log(err);
        })
    }

    onError = (e) => {
        console.log(e, 'error in file-viewer');
    };

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

    page = (pageNumber) => {
        this.setState({
            pageNumber: pageNumber,
        });
    };

    checkAllDocumentpresent = () => {
        console.log('inside check');
        let documentCount = 0;
        let totalDocumentCount = this.state.offerDetail.requiredDocuments.length;
        if (this.state.offerDetail.requiredDocuments != null) {
            this.state.offerDetail.requiredDocuments.forEach(document => {
                if(document.key !== ''){
                    ++documentCount;
                }
            });
            if(documentCount !== totalDocumentCount)
                return false;
        }
        console.log(documentCount);
        console.log(totalDocumentCount);
        return true;
    }

    checkAcceptedOffer = () => {
        console.log(this.state.requestDetail.acceptedOfferId);
        console.log(this.state.offerDetail._id);
        if(this.state.requestDetail.acceptedOfferId == this.state.offerDetail._id) {
            return true;
        }
        return false;
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

    getFileViewer = (documentKey) => {
        return (
            <React.Fragment>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                    <div style={{ height: '400px' }}>
                        <Viewer fileUrl={`${ConstantUtility.SERVICE_URL}/api/v1/document/download/${documentKey}/${this.state.userCred.token}`} />
                    </div>
                </Worker>
            </React.Fragment>
        );
    };

    render() {
        console.log(this.state.offerDetail);
        var tabContents;
        if (this.state.requestDetail.acceptedOfferId != null && this.state.requestDetail.userSignature != null) {
            tabContents = this.state.offerDetail.requiredDocuments.map((document, index) => {
                return { 
                    id: index,
                    title: document.type,
                    component: document.key != ""  ? this.getFileViewer(document.key.split('/')[1]) : 
                        <FileUploader text={'Drop your Document image/pdf here'} data={{type: document.type, offerId: this.state.offerDetail._id}} uploadFile={this.uploadFile}/>
                }
            });
        } else if(this.state.offerDetail){
            tabContents = this.state.offerDetail.requiredDocuments.map((document, index) => {
                return { 
                    id: index,
                    title: document.type,
                    component: document.key != ""  ? this.getFileViewer(document.key.split('/')[1]) : 
                        <FileUploader text={'Drop your Document image/pdf here'} data={{type: document.type, offerId: this.state.offerDetail._id}} uploadFile={this.uploadFile}/>
                }
            });
        }

        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.modalToggle}
                    className="dialog"
                    size={this.state.size}>
                    <ModalHeader toggle={this.modalToggle}>Sign Here</ModalHeader>
                    <AvForm onValidSubmit={this.submitDetails}>
                        <ModalBody>
                            <SignaturePad 
                                ref={(ref) => { this.sigPad = ref }}
                                canvasProps={{className: 'sign-canvas'}}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.saveSignatureAndApproveRequest}>
                                Approve
                            </Button>
                            <Button color="secondary" className="ml-1" onClick={this.rejectRequest}>
                                Reject
                            </Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
                <div className="">
                    {/* preloader */}
                    {this.state.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0">Loan Request</h4>
                        </Col>
                    </Row>

                    {/* stats */}
                    {/* <Statistics></Statistics> */}
                    <Row>
                        <Col md={12} xl={12}>
                            <Card>
                                <CardBody>
                                    <Col className="pl-0">
                                    <div className="header-title mt-2 mb-3 mt-0">
                                        <i class="uil uil-layer-group"></i>
                                        <span className="ml-2">Request Details</span>
                                    </div>
                                        <hr className="mb-4"/>
                                    </Col>
                                    <Row className="pl-3 pr-3">
                                        <Col className="loan-view-horizontal-separator" md={3}>
                                            <div className="header-title mb-1 mt-0">Loan Amount</div>
                                            {this.state.requestDetail.principalAmount}
                                        </Col>
                                        <Col className="loan-view-horizontal-separator" md={3}>
                                            <div className="header-title mb-1 mt-0">Loan Tenure</div>
                                            {this.state.requestDetail.tenure} Month
                                        </Col>
                                        <Col className="loan-view-horizontal-separator" md={3}>
                                            <div className="header-title mb-1 mt-0">Rate Of Interest</div>
                                            -
                                        </Col>
                                        <Col className="" md={3}>
                                            <div className="header-title mb-1 mt-0">Loan Status</div>
                                            <span>{this.checkStatus(this.state.requestDetail.status)}</span>
                                        </Col>
                                    </Row>
                                    <Col className="pl-0">
                                        <div className="header-title mt-5 mb-3 mt-0">
                                            <i class="uil uil-user"></i>
                                            <span className="ml-2">Request Details</span>
                                        </div>
                                        <hr className="mb-4"/>
                                    </Col>
                                    {this.state.redirectingFrom === "request" ?
                                        <Row className="pl-3 pr-3">
                                            <Col className="loan-view-horizontal-separator" md={6}>
                                                <div className="header-title mb-1 mt-0">Name</div>
                                                {this.state.user.name}
                                                <div className="header-title mb-1 mt-4">Email Adress</div>
                                                {this.state.user.username}
                                                <div className="header-title mb-1 mt-4">Age</div>
                                                {this.state.user.age}
                                            </Col>
                                            {/* <Col className="loan-view-header-card loan-view-horizontal-separator" md={3}>
                                                <div className="header-title mb-1 mt-0">Email Adress</div>
                                                {this.state.user.username}
                                            </Col> */}
                                            <Col className="" md={6}>
                                                <div className="header-title mb-1 mt-0">Gender</div>
                                                {this.state.user.gender}
                                            </Col>
                                            {/* <Col className="" md={3}>
                                                <div className="header-title mb-1 mt-0">Credit Score</div>
                                                <span>{this.state.requestDetail.creditScore}</span>
                                            </Col> */}
                                        </Row> :
                                        <Row>
                                            <Col className="loan-view-header-card loan-view-horizontal-separator" md={3}>
                                                <div className="header-title mb-1 mt-0">Loan Amount</div>
                                                {this.state.offerDetail.principalAmount}
                                            </Col>
                                            <Col className="loan-view-header-card loan-view-horizontal-separator" md={3}>
                                                <div className="header-title mb-1 mt-0">Loan Tenure</div>
                                                {this.state.offerDetail.tenure} Month
                                            </Col>
                                            <Col className="loan-view-header-card loan-view-horizontal-separator" md={3}>
                                                <div className="header-title mb-1 mt-0">Rate Of Interest</div>
                                                {this.state.offerDetail.interestRate}
                                            </Col>
                                        </Row>}

                                        {/* /////Credit History */}
                                        <Col className="pl-0">
                                            <div className="header-title mt-5 mb-3 mt-0">
                                                <i className="uil uil-pound-circle"></i>
                                                <span className="ml-2">Credit History</span>
                                            </div>
                                            <hr className="mb-4"/>
                                        </Col>
                                        <Row className="pl-3 pr-3">
                                            <Col className="loan-view-horizontal-separator" md={6}>
                                                <div className="header-title mb-1">Annual Salary</div>
                                                    {this.state.requestDetail.annualIncome}
                                                <div className="header-title mb-1 mt-4">Credit Score</div>
                                                    505
                                            </Col>
                                            <Col className="loan-view-horizontal-separator" md={6}>
                                                <div className="header-title mb-1">Total No. of Loans</div>
                                                    {this.state.requestDetail.annualIncome}
                                                <div className="header-title mb-1 mt-4">Total Open Loans</div>
                                                    505
                                            </Col>
                                        </Row>
                                </CardBody>
                            </Card>
                            {/* <Card>
                                <CardBody>
                                    <div className="header-title mb-3 mt-0">Your Feedback</div>
                                    <Input type="textarea" className="form-control" placeholder="Your text here..."></Input>
                                    <div className="btn btn-primary btn-sm mt-2">Submit Feedback</div>
                                </CardBody>
                            </Card> */}
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12}>
                            <Card>
                                <CardBody>

                                        {/* more information */}
                                        <Col className="pl-0">
                                            <div className="header-title mt-2 mb-3 mt-0">
                                                <i className="uil uil-info-circle"></i>
                                                <span className="ml-2">More Information</span>
                                            </div>
                                            <hr className="mb-4"/>
                                        </Col>
                                        <Row className="pl-3 pr-3">
                                            {this.state.requestDetail.acceptedOfferId != null &&
                                            <Col className="" md={6}>
                                                {!this.checkAllDocumentpresent() && <div className="header-title mb-4">Document Pending
                                                    {this.state.offerDetail.requiredDocuments ? 
                                                    this.state.offerDetail.requiredDocuments.map((document,index) => {
                                                        if (document.key == null) 
                                                            return <span class="ml-4 badge badge-primary">{document.type}</span>
                                                    }): "No Document Requested"  }
                                                </div>}
                                            </Col>}                                       
                    
                                            <Col md={12}>
                                                <div className="header-title mb-3 mt-2">Document Verification</div>
                                            
                                        {/* {tabContents != null &&
                                            <Col style={{ textAlign: 'right' }} md={6}>
                                                <div className="btn btn-primary btn-sm" onClick={this.modalToggle}>
                                                    <PenTool style={{ height: '1rem' }} className="icon-sm"></PenTool>{' '}
                                                    Request e-Sign
                                                </div>
                                            </Col>
                                        } */}
                               
                                            {console.log(tabContents)}
                                            {tabContents != null ? <div>
                                                <Nav className="nav nav-pills navtab-bg nav-justified">
                                                    {tabContents.map((tab, index) => {
                                                        return (
                                                            <NavItem key={index}>
                                                                <NavLink
                                                                    href="#"
                                                                    className={classnames({
                                                                        active: this.state.activeTab === tab.id,
                                                                    })}
                                                                    onClick={() => {
                                                                        this.toggle(tab.id);
                                                                    }}>
                                                                    <i
                                                                        className={classnames(
                                                                            tab.icon,
                                                                            'd-sm-none',
                                                                            'd-block',
                                                                            'mr-1'
                                                                        )}></i>
                                                                    <span className="d-none d-sm-block">{tab.title}</span>
                                                                </NavLink>
                                                            </NavItem>
                                                        );
                                                    })}
                                                </Nav>
                                                <TabContent activeTab={this.state.activeTab}>
                                                    {tabContents.map((tab, index) => {
                                                        return (
                                                            <TabPane tabId={tab.id} key={index}>
                                                                <Row>
                                                                    <Col sm="12">
                                                                        {tab.component}
                                                                        {/* <p className="mt-2"></p> */}
                                                                    </Col>
                                                                </Row>
                                                            </TabPane>
                                                        );
                                                    })}
                                                </TabContent>
                                                <Row className="mt-3 button-right">
                                                    {!layout.STATUS_TYPES_APPROVED_DECLINED.includes(this.state.requestDetail.status) && 
                                                    this.checkAllDocumentpresent() && this.checkAcceptedOffer() &&
                                                    <Button type="button" color="primary" className="btn-sm" onClick={this.modalToggle}>
                                                        Approve Request
                                                    </Button>}
                                                </Row></div>: <h5 className="ml-2">No Offer Quoted yet</h5>
                                            }
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        {/* <Col xl={3}>
                            <TargetChart />
                        </Col> */}
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
