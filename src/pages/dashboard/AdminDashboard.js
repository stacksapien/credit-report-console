import React, { Component } from 'react';
import {
    Row,
    Col,
    UncontrolledButtonDropdown,
    Button,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Card,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    Table,
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
            name: 'Revenue',
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

                <h5 className="card-title mb-0 header-title">Revenue Activity</h5>

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
                        <Col sm={4} xl={6}>
                            <h4 className="mb-1 mt-0">Dashboard</h4>
                        </Col>
                        <Col sm={8} xl={6}>
                            <form className="form-inline float-sm-right mt-3 mt-sm-0">
                                <div className="form-group mb-sm-0 mr-2">
                                    <Flatpickr
                                        value={this.state.filterDate}
                                        onChange={(date) => {
                                            this.setState({ filterDate: date });
                                        }}
                                        options={{ mode: 'range' }}
                                        className="form-control"
                                    />
                                </div>
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="primary" className="dropdown-toggle">
                                        <i className="uil uil-file-alt mr-1"></i>Download Report
                                        <i className="icon ml-1">
                                            <ChevronDown />
                                        </i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <Mail className="icon-dual icon-xs mr-2"></Mail>
                                            <span>Email</span>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Printer className="icon-dual icon-xs mr-2"></Printer>
                                            <span>Print</span>
                                        </DropdownItem>
                                        {/* <DropdownItem divider />
                                        <DropdownItem>
                                            <File className="icon-dual icon-xs mr-2"></File>
                                            <span>Re-Generate</span>
                                        </DropdownItem> */}
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </form>
                        </Col>
                    </Row>

                    {/* stats */}
                    {/* <Statistics></Statistics> */}
                    <Row>
                        <Col md={6} xl={3}>
                            <StatisticsChartWidget
                                description="Total Investment"
                                title="$2,22,000"
                                data={[1000, 500, 50000, 2000, 222000]}
                                trend={{
                                    textClass: 'text-success',
                                    icon: 'uil uil-arrow-up',
                                    value: '300.21%',
                                }}></StatisticsChartWidget>
                        </Col>
                        <Col md={6} xl={3}>
                            <StatisticsChartWidget
                                description="Total Returns"
                                title="$5,00,000"
                                colors={['#f77e53']}
                                data={[1300, 500, 300, 2900, 400, 100]}
                                trend={{
                                    textClass: 'text-danger',
                                    icon: 'uil uil-arrow-down',
                                    value: '5.05%',
                                }}></StatisticsChartWidget>
                        </Col>
                        <Col md={6} xl={3}>
                            <StatisticsChartWidget
                                description="Total Agents"
                                title="12"
                                colors={['#f77e53']}
                                data={[1300, 500, 300, 2900, 400, 100]}
                                hideChart
                                trend={{
                                    textClass: 'text-danger',
                                    icon: 'uil uil-arrow-down',
                                    value: '5.05%',
                                }}></StatisticsChartWidget>
                        </Col>
                        <Col md={6} xl={3}>
                            <StatisticsChartWidget
                                description="Total Investors"
                                title="5"
                                colors={['#f77e53']}
                                data={[1300, 500, 300, 2900, 400, 100]}
                                hideChart
                                trend={{
                                    textClass: 'text-danger',
                                    icon: 'uil uil-arrow-down',
                                    value: '5.05%',
                                }}></StatisticsChartWidget>
                        </Col>
                    </Row>

                    {/* charts */}
                    <Row>
                        <Col xl={3}>
                            <OverviewWidget
                                items={[
                                    { title: 'Rs. 10,500', description: 'Last Returns', icon: DollarSign },
                                    { title: '15+', description: 'New Users', icon: Users },
                                    { title: '10', description: 'Total Loans Approved', icon: CheckCircle },
                                ]}></OverviewWidget>
                        </Col>

                        <Col xl={9}>
                            <Card>
                                <CardBody className="pb-0">
                                    <Button className="float-right" size={'sm'} color="primary">
                                        <i className="uil uil-export ml-1"></i> Export
                                    </Button>

                                    <h5 className="card-title mt-0 mb-0 header-title">Recent Loan Request</h5>

                                    <Table hover responsive className="mt-4">
                                        <thead>
                                            <tr>
                                                <th scope="col">#Request ID</th>
                                                <th scope="col">Amount(Rs)</th>
                                                <th scope="col">Tenure</th>
                                                <th scope="col">Interest Rate</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#98754</td>
                                                <td>50,000</td>
                                                <td>6 Months</td>
                                                <td>12%</td>
                                                <td>2 Hours ago</td>
                                                <td>
                                                    <span className="badge badge-soft-warning py-1">Pending</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>#98756</td>
                                                <td>10,000</td>
                                                <td>3 Months</td>
                                                <td>10%</td>
                                                <td>3 Hours ago</td>
                                                <td>
                                                    <span className="badge badge-soft-success py-1">Approved</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>#98756</td>
                                                <td>20,000</td>
                                                <td>4 Months</td>
                                                <td>10%</td>
                                                <td>4 Days ago</td>
                                                <td>
                                                    <span className="badge badge-soft-danger py-1">Declined</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            <td>#99756</td>
                                                <td>70,000</td>
                                                <td>8 Months</td>
                                                <td>15%</td>
                                                <td>1 Week ago</td>
                                                <td>
                                                    <span className="badge badge-soft-success py-1">Approved</span>
                                                </td>
                                            </tr>
                                            <tr>
                                            <td>#99757</td>
                                                <td>5,000</td>
                                                <td>8 Months</td>
                                                <td>9%</td>
                                                <td>1 Week ago</td>
                                                <td>
                                                    <span className="badge badge-soft-danger py-1">Declined</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                            {/* <RevenueChart /> */}
                        </Col>
                        {/* <Col xl={3}>
                            <TargetChart />
                        </Col> */}
                        <Col md={12}>
                            <RevenueChart />
                        </Col>
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

export default Dashboard;
