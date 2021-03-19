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
    Button,
    Badge,
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
} from 'react-feather';

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
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import './../../../node_modules/react-circular-progressbar/dist/styles.css';

const RevenueChart = () => {
    const getDaysInMonth = (month, year) => {
        var date = new Date(year, month, 1);
        var days = [];
        var idx = 0;
        while (date.getMonth() === month && idx < 15) {
            var d = new Date(date);
            days.push(d.getDate() + ' ' + d.toLocaleString('en-us', { month: 'short' }));
            date.setDate(date.getDate() + 1);
            idx += 1;
        }
        return days;
    };

    var now = new Date();
    var labels = getDaysInMonth(now.getMonth(), now.getFullYear());

    const apexLineChartWithLables = {
        chart: {
            height: 296,
            type: 'area',
            toolbar: {
                show: false,
            },
            parentHeightOffset: 0,
        },
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 4,
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#43d39e'],
        xaxis: {
            type: 'string',
            categories: labels,
            tooltip: {
                enabled: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {},
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return val + 'k';
                },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [45, 100],
            },
        },
        tooltip: {
            theme: 'dark',
            x: { show: false },
        },
    };

    const apexLineChartWithLablesData = [
        {
            name: 'Payment Activity',
            data: [10, 20, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40, 30, 50, 35],
        },
    ];

    return (
        <Card>
            <CardBody className="pb-0">
                <Nav className="card-nav float-right">
                    <NavItem>
                        <NavLink className="text-muted" href="#">
                            Today
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="text-muted" href="#">
                            7d
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="" active href="#">
                            15d
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="text-muted" href="#">
                            1m
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="text-muted" href="#">
                            1y
                        </NavLink>
                    </NavItem>
                </Nav>

                <h5 className="card-title mb-0 header-title">Payment Activity</h5>

                <Chart
                    options={apexLineChartWithLables}
                    series={apexLineChartWithLablesData}
                    type="area"
                    className="apex-charts mt-3"
                    height={296}
                />
            </CardBody>
        </Card>
    );
};

class Dashboard extends Component {
    constructor(props) {
        super(props);

        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 15);

        this.state = {
            user: getLoggedInUser(),
            filterDate: [oneWeekAgo, new Date()],
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="">
                    {/* preloader */}
                    {this.props.loading && <Loader />}

                    <Row className="page-title align-items-center">
                        <Col sm={12} xl={12}>
                            <form className="form-inline float-sm-left mt-3 mt-sm-0">
                                <Button color="primary">
                                    <i className="uil uil-file-download-alt mr-1"></i>Add Quick Lead
                                </Button>

                                <Button color="success" className="ml-2">
                                    <i className="uil uil-user-plus mr-1"></i>Add New Customer
                                </Button>

                                <Button color="info" className="ml-2">
                                    <i className="uil uil-search-alt mr-1"></i>Customer Search
                                </Button>

                                <Button color="danger" className="ml-2">
                                    <i className="uil uil-ticket mr-1"></i>Dispute Status
                                </Button>
                            </form>
                        </Col>

                        <Col md={12} className="mt-4">
                            <Row>
                                <Col md={4}>
                                    <Card>
                                        <CardBody>
                                            <Row className="pb-1 border-bottom">
                                                <Col>
                                                    <h3 style={{ textAlign: 'center' }}>Customer Overview</h3>
                                                </Col>
                                            </Row>
                                            <Col>
                                                <Row>
                                                    <Col md={5}>
                                                    <CircularProgressbarWithChildren
                                                    strokeWidth={16}
                                                    styles={buildStyles({
                                                        // Rotation of path and trail, in number of turns (0-1)
                                                        rotation: 0.25,

                                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                        strokeLinecap: 'butt',

                                                        // Text size
                                                        textSize: '16px',

                                                        // How long animation takes to go from one percentage to another, in seconds
                                                        pathTransitionDuration: 0.5,

                                                        // Can specify path transition in more detail, or remove it entirely
                                                        // pathTransition: 'none',

                                                        // Colors
                                                        pathColor: `#FAB718`,
                                                        trailColor: '#d6d6d6',
                                                        backgroundColor: '#F4F5F9',
                                                    })}
                                                    value={10}>
                                                    
                                                </CircularProgressbarWithChildren> 
                                                    </Col>
                                                    <Col md={7}>
                                                       
                                                            <Button color={`soft-primary`} className="mr-1 badge-lg">Active Client : 0</Button>
                                                            <Button color={`soft-secondary`} className="mr-1 mt-2 badge-lg">No Portal : 0</Button>
                                                            <Button color={`soft-success`} className="mr-1 mt-2 badge-lg">Current Leads : 0</Button>
                                                           
                                                    </Col>
                                                </Row>
                                                
                                            </Col>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
