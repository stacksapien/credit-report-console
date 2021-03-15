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
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
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

class UserLoanView extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = { 
            modal: false,
            user: getLoggedInUser(),
            activeTab: 0,
            pageNumber: null,
            loading: true,
            redirectingFrom: this.props.location.state.redirectingFrom,
            offerDetail: this.props.location.state.offerDetail,
            requestDetail: this.props.location.state.requestDetail,
        };
        this.toggle = this.toggle.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.clearSigPad = this.clearSigPad.bind(this);
        this.saveSignature = this.saveSignature.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.checkAllDocumentpresent = this.checkAllDocumentpresent.bind(this);
        // this.requestDocument = this.requestDocument.bind(this);
    }

    sigPad = {}

    clearSigPad = () => {
        this.sigPad.clear();
    }

    saveSignature = () => {
        if(!this.sigPad.isEmpty()) {
            console.log(this.sigPad.getTrimmedCanvas()
                .toDataURL('image/png'))
            this.setState({
                loading: true
            });

            let headers= {
                "Content-Type": 'multipart/form-data',
                "Authorization": 'JWT '+ this.state.user.token,
            };

            const data = new FormData();
            data.append("base64FileUrl", this.sigPad.getTrimmedCanvas().toDataURL('image/png'));
            data.append("requestId", this.state.requestDetail._id);
            data.append("offerId", this.state.offerDetail._id); 
            data.append("userId", this.state.user.id );
            data.append("signature", 'userSignature' );
            //Uploading Signature
            let param;
            if(this.state.requestDetail.agentId != null) {
                param = '&agentSignature=true'
            }
            servicePost(`api/v1/document/upload?isSignature=true${param}`, data, headers)
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
            "Authorization": 'JWT '+ this.state.user.token,
        };
        console.log(this.state.requestDetail._id);
        serviceGet(`api/v1/user/loan-request/${this.state.requestDetail._id}`, headers)
        .then((res) => {
            if(res.data){
                 let offer = res.data.offersId.find((offer) => offer._id === this.state.offerDetail._id)
                console.log(offer);
                this.setState({
                    requestDetail: res.data,
                    offerDetail: offer,
                    loading: false
                })
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

    componentWillUnmount() {
        // this.abortController.abort();
    }


    uploadFile = (files, offerId, documentType) => {
        this.setState({
            loading: true
        })
        let headers= {
            "Content-Type": 'multipart/form-data',
            "Authorization": 'JWT '+ this.state.user.token,
        };
        const data = new FormData();
        data.append("userId", this.state.user.id);
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

    getFileViewer = (documentKey) => {
        return (
            <React.Fragment>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
                    <div style={{ height: '400px' }}>
                        <Viewer fileUrl={`${ConstantUtility.SERVICE_URL}/api/v1/document/download/${documentKey}/${this.state.user.token}`} />
                    </div>
                </Worker>
            </React.Fragment>
        );
    };

    render() {
        var tabContents;
        if (this.state.offerDetail.requiredDocuments != null) {
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
                            <Button color="primary" onClick={this.saveSignature}>
                                Save
                            </Button>
                            <Button color="secondary" className="ml-1" onClick={this.clearSigPad}>
                                Clear
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
                                    <Row>
                                        <Col className="loan-view-header-card loan-view-horizontal-separator" md={3}>
                                            <div className="header-title mb-1 mt-0">Loan Amount</div>
                                            {this.state.requestDetail.principalAmount}
                                        </Col>
                                        <Col className="loan-view-header-card loan-view-horizontal-separator" md={3}>
                                            <div className="header-title mb-1 mt-0">Loan Tenure</div>
                                            {this.state.requestDetail.tenure} Month
                                        </Col>
                                        <Col className="loan-view-header-card loan-view-horizontal-separator" md={3}>
                                            <div className="header-title mb-1 mt-0">Rate Of Interest</div>
                                            -
                                        </Col>
                                        <Col className="loan-view-header-card" md={3}>
                                            <div className="header-title mb-1 mt-0">Loan Status</div>
                                            <span>{this.checkStatus(this.state.requestDetail.status)}</span>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* charts */}
                    <Row>
                        <Col xl={3}>
                            <OverviewWidget
                                title={'Offer'}
                                items={[
                                    { title: `${this.state.offerDetail.interestRate} %`, description: 'Interest Rate' },
                                    { title: `${this.state.offerDetail.tenure} Month`, description: 'Tenure' },
                                    { title: this.state.offerDetail.principalAmount, description: 'Principal Amount' },
                                ]}></OverviewWidget>
                            {/* <Card>
                                <CardBody>
                                    <div className="header-title mb-3 mt-0">Your Feedback</div>
                                    <Input type="textarea" className="form-control" placeholder="Your text here..."></Input>
                                    <div className="btn btn-primary btn-sm mt-2">Submit Feedback</div>
                                </CardBody>
                            </Card> */}
                        </Col>

                        <Col xl={9}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col md={6}>
                                            <div className="header-title mb-3 mt-0">Document Verification</div>
                                        </Col>
                                        {this.checkAllDocumentpresent() && this.state.requestDetail.acceptedOfferId == null && this.state.requestDetail.userSignature == null &&
                                            <Col style={{ textAlign: 'right' }} md={6}>
                                                <div className="btn btn-primary btn-sm" onClick={this.modalToggle}>
                                                    <PenTool style={{ height: '1rem' }} className="icon-sm"></PenTool>{' '}
                                                    E-Sign and Accept
                                                </div>
                                            </Col>
                                        }
                                    </Row>
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
                                        </TabContent></div>: <h4>No Document Requested</h4>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                        {/* <Col xl={3}>
                            <TargetChart />
                        </Col> */}
                    </Row>

                    {/* charts */}
                    {/* <Row>
                        <Col xl={5}>
                            <SalesChart />
                        </Col>
                        <Col xl={7}>
                            <Orders />
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={4}>
                            <Performers />
                        </Col>
                        <Col xl={4}>
                            <Tasks />
                        </Col>
                        <Col xl={4}>
                            <Chat />
                        </Col>
                    </Row> */}
                </div>
            </React.Fragment>
        );
    }
}

export default UserLoanView;
