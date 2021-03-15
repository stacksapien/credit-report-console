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
    CustomInput,
} from 'reactstrap';
import Flatpickr from 'react-flatpickr';
import { ChevronDown, Mail, Printer, File, Users, Image, ShoppingBag } from 'react-feather';

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
import ReactSignatureCanvas from 'react-signature-canvas';

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
                            <h4 className="mb-1 mt-0">Consent For Borrowing</h4>
                        </Col>
                    </Row>

                    {/* stats */}

                    {/* charts */}
                    <Row>
                        <Col sm={12} xl={12}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col sm={12} xl={12} className="mt-2">
                                            
                                            Please read terms & conditions carefully
                                        </Col>
                                        <Col className={'mt-2'} sm={12} xl={12}>
                                            <div class="sub-container terms-and-condition">
                                                <div>
                                                    <ol class="toc">
                                                        <li>Introduction</li> <li>EM Role</li>{' '}
                                                        <li>Becoming a Lender</li> <li>Username and Password</li>{' '}
                                                        <li>Cancellation Rights</li> <li>The Lending Process</li>{' '}
                                                        <li>Diversification</li> <li>The Loan Contract</li>{' '}
                                                        <li>Interest and repayments</li> <li>Loan Management</li>{' '}
                                                        <li>Security</li> <li>Cashing in your Loans</li>{' '}
                                                        <li>Borrower event of default and enforceability</li>{' '}
                                                        <li>Lender’s agreements with Credit Report</li>{' '}
                                                        <li>No advice or responsibility to repay from Credit Report</li>{' '}
                                                        <li>Back-up Servicer Arrangements</li>{' '}
                                                        <li>
                                                            Terminating your Participation on the Credit Report Website
                                                        </li>{' '}
                                                        <li>Credit Report plus membership</li>{' '}
                                                        <li>International Payments</li> <li>General terms</li>{' '}
                                                        <li>Privacy</li> <li>Intellectual property rights</li>{' '}
                                                        <li>Your liability to us</li> <li>Our liability to you</li>{' '}
                                                        <li>Contacting us</li>{' '}
                                                        <li>Amendments to these terms and conditions</li>{' '}
                                                        <li>Complaints</li> <li>Other important terms</li>{' '}
                                                        <li>Contacting us</li>
                                                    </ol>{' '}
                                                    <ol>
                                                        <li class="title">
                                                            Introduction
                                                            <ol>
                                                                <li>
                                                                    Please read these terms and conditions and our
                                                                    privacy and cookie policy (each as amended from time
                                                                    to time), which are accessible online at{' '}
                                                                    <a href="http://www.Credit Report.com">
                                                                        www.Credit Report.com
                                                                    </a>{' '}
                                                                    (the "Terms"). Please print a copy for your future
                                                                    reference. If you decide to lend on the Micro
                                                                    lending website, you must comply with these terms
                                                                    and conditions.
                                                                </li>{' '}
                                                                <li>
                                                                    By using these systems and the services provided via
                                                                    the Credit Report website, you confirm that you have
                                                                    read, understood and agree to the Terms and where
                                                                    you are acting on behalf of a limited company, LLP,
                                                                    partnership or public body (a "Corporate Entity")
                                                                    that they agree to the Terms. If you do not agree to
                                                                    the Terms you must stop using the Credit Report
                                                                    website immediately.
                                                                </li>{' '}
                                                                <li>
                                                                    References in the Terms to "we", "us", "our" and
                                                                    Credit Report mean E-Money Capital Ltd. References
                                                                    to "systems", or "platform" means the Credit Report
                                                                    website, any other online services provided by us
                                                                    and any data managed by, displayed on or transmitted
                                                                    from such services. References to "you", "your" and
                                                                    "lender" mean a registered user of the platform and
                                                                    the services provided via our systems, whether as an
                                                                    individual or on behalf of an entity which meets the
                                                                    lender criteria set out below.
                                                                </li>{' '}
                                                                <li>
                                                                    Each agreement ("Loan Contract") between each lender
                                                                    and borrower comprises our standard Loan Conditions
                                                                    and Term Sheet. There will generally be more than
                                                                    one lender and loan in respect of each borrower. The
                                                                    Loan Contract is a separate agreement between you
                                                                    and the borrower and is governed by separate terms
                                                                    and conditions. If there is a conflict between the
                                                                    Terms and the Loan Contract, the Loan Contract will
                                                                    prevail.
                                                                </li>{' '}
                                                                <li>
                                                                    Please note that under clause 10 of these terms and
                                                                    conditions in certain circumstances you grant us the
                                                                    authority to amend the Loan Contract without the
                                                                    need for your agreement to those changes and you
                                                                    will be bound by those amendments
                                                                </li>{' '}
                                                                <li>
                                                                    If you are using our systems and the services
                                                                    provided via the platform, agreeing to these terms
                                                                    and conditions or entering into a Loan Contract on
                                                                    behalf of a Corporate Entity you warrant that you
                                                                    are duly authorised to act on the Corporate Entity's
                                                                    behalf.
                                                                </li>{' '}
                                                                <li>
                                                                    E-Money Capital Ltd is a company incorporated in
                                                                    England and Wales whose registered office is 5 Fleet
                                                                    Place, London, EC4M 7RD with company number
                                                                    04861007. E-Money Capital Ltd is authorised and
                                                                    regulated by the Financial Conduct Authority ("FCA")
                                                                    with firm registration number 231680.
                                                                </li>{' '}
                                                                <li>
                                                                    We will act as agent on behalf of the lender in
                                                                    relation to the Loan Contract and hold the security
                                                                    on trust for the benefit of all lenders lending
                                                                    through the website to a borrower.
                                                                </li>{' '}
                                                                <li>
                                                                    In the event that another person (agent) is acting
                                                                    on the lender’s behalf, then the agent must disclose
                                                                    the fact of the agency and provide such information
                                                                    about it as we may require. The agent must have
                                                                    authority to accept these Terms and Conditions and
                                                                    the Privacy Policy (including arrangements to these
                                                                    conditions as part of the agreement; see section 3.
                                                                    Becoming a lender) both on its own behalf and on
                                                                    behalf of the lender. The agent and the lender will
                                                                    both be subject to the identity checks carried out
                                                                    on lenders under these terms.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Credit Report's Role
                                                            <ol>
                                                                <li>
                                                                    Credit Report's principal role is to identify
                                                                    lenders and borrowers, to select a portfolio of
                                                                    Loans that meet the criteria disclosed to the
                                                                    lender, to enter into those Loans on behalf of the
                                                                    lender and the borrower, to facilitate the payment
                                                                    and collection of sums due under or in connection
                                                                    with those Loans and to enter into and manage Loan
                                                                    Contracts on behalf of lenders.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Becoming a Lender
                                                            <ol>
                                                                <li>
                                                                    To be a lender on Credit Report you must meet the
                                                                    following criteria:
                                                                    <ol>
                                                                        <li value="a">
                                                                            you must be an individual, partnership, LLP,
                                                                            limited company or public body;
                                                                        </li>{' '}
                                                                        <li value="b">
                                                                            if you are lending in your capacity as an
                                                                            individual or member of a
                                                                            partnership&nbsp;you must be over 18 years
                                                                            old;
                                                                        </li>{' '}
                                                                        <li value="c">
                                                                            you must have a valid bank or building
                                                                            society account;
                                                                        </li>{' '}
                                                                        <li value="d">
                                                                            you must register your details on the Micro
                                                                            lending Website;
                                                                        </li>{' '}
                                                                        <li value="e">
                                                                            you must only lend your own monies or hold a
                                                                            lasting Power of Attorney on behalf of an
                                                                            underlying lender; and
                                                                        </li>{' '}
                                                                        <li value="f">
                                                                            you must not be a credit broker or lend
                                                                            money to other persons in the course of any
                                                                            business.
                                                                        </li>
                                                                    </ol>
                                                                    Where a prospective lender does not meet the
                                                                    criteria listed above, the lender may be otherwise
                                                                    permitted to become a lender on the Credit Report
                                                                    website by written confirmation from Credit Report.
                                                                </li>{' '}
                                                                <li>
                                                                    Credit Report may at its sole discretion refuse any
                                                                    prospective lender from becoming a lender on the
                                                                    Credit Report website.
                                                                </li>{' '}
                                                                <li>
                                                                    You warrant to Credit Report that all information
                                                                    provided to us in the course of the registration and
                                                                    lending process is true and accurate in all
                                                                    respects. You will update us as soon as possible if
                                                                    any of the information you provide to us changes.
                                                                </li>{' '}
                                                                <li>
                                                                    Once you are registered on the platform and have
                                                                    applied to lend through Credit Report, we may carry
                                                                    out identity and fraud checks (including for
                                                                    business lenders, the proprietors, members or
                                                                    directors of the business) at any time, including
                                                                    prior to satisfying withdrawal requests. Micro
                                                                    lending uses its own internal guidelines and
                                                                    policies when assessing applications but has
                                                                    complete discretion as to whether to allow you to be
                                                                    a lender on the Credit Report platform. If we cannot
                                                                    get adequate information from the credit reference
                                                                    agency, we will ask you to send us certified copies
                                                                    of relevant passports or other identification
                                                                    documents plus a utility bill no more than 3 months
                                                                    old for your home address and anything else that we
                                                                    may require. If you do not provide all appropriate
                                                                    identification documents, you will not be able to
                                                                    lend on the Credit Report platform. We may also
                                                                    suspend or place limitations on trading on your
                                                                    account at any time if we believe it is appropriate
                                                                    in order to comply with our legal obligations. For
                                                                    more details about how we use your information,
                                                                    please refer to our privacy and cookie policy at{' '}
                                                                    <a href="http://www.Credit Report.com/">
                                                                        www.Credit Report.com.{' '}
                                                                    </a>
                                                                    We will then set up an Credit Report lender account
                                                                    for you.
                                                                </li>{' '}
                                                                <li>
                                                                    It is important that you quote your Credit Report
                                                                    lender account number in the narrative box when you
                                                                    transfer money using a bank transfer. We require you
                                                                    to use an account held with a bank or building
                                                                    society maintained in your sole or joint name.
                                                                </li>{' '}
                                                                <li>
                                                                    There are no fees payable to set up an Credit Report
                                                                    lender account, except as stated in the Appendix
                                                                    'Charges Table'. We may update our fees and charges
                                                                    from time to time by providing 1 month’s written
                                                                    notice to lenders. We will not apply fees or charges
                                                                    we have newly introduced to any part of your
                                                                    portfolio that you seek to sell within one month of
                                                                    receiving notice of the introduction of the new fees
                                                                    or charges.
                                                                </li>{' '}
                                                                <li>
                                                                    We shall hold your money, including your lending
                                                                    commitments and interest and capital payments
                                                                    received from borrowers in a segregated client
                                                                    account with National Westminster Bank prior to
                                                                    being transferred to the relevant borrower or
                                                                    returned to you. In accordance with FCA client money
                                                                    rules, we do not hold our own money in the client
                                                                    account. You will not earn interest on money held in
                                                                    the client account. Your money in the client account
                                                                    shall be pooled with the money of other clients and
                                                                    you may suffer a loss in the event of a default by
                                                                    the bank.
                                                                </li>{' '}
                                                                <li>
                                                                    Where we require the borrower to pay a sum
                                                                    representing interest they owe prior to drawing down
                                                                    the loan, we shall hold this money as security for
                                                                    the borrower's obligations to you in a separate
                                                                    trust account (which is not operated as a client
                                                                    account under the rules of the Financial Conduct
                                                                    Authority). We will pay sums out of this account
                                                                    into your client account when the corresponding
                                                                    payment becomes due to you (or, where the borrower
                                                                    repays the Loan early, we shall pay it to the
                                                                    borrower and you in proportion to your respective
                                                                    entitlements).
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Username and password
                                                            <ol>
                                                                <li>
                                                                    On registering with us, you must provide an email
                                                                    address (which will be used as your user name) and
                                                                    enter a password. These must be used in order to
                                                                    access certain restricted parts of the platform.
                                                                    Each time you access your Credit Report lender
                                                                    account you will need to enter your username and
                                                                    password. Your username and password are unique to
                                                                    your Credit Report lender account and are not
                                                                    transferable.
                                                                </li>{' '}
                                                                <li>
                                                                    Your username and password (and PIN, if applicable)
                                                                    are how we identify you, and so you must keep them
                                                                    secure at all times. You are responsible for all
                                                                    information and activity on the platform by anyone
                                                                    using your username and password (and PIN, if
                                                                    applicable). If you authorise an employee,
                                                                    sub-contractor or agent to use your Credit Report
                                                                    lender account you will be responsible for their
                                                                    activity on the platform. Any breach of security,
                                                                    loss, theft or unauthorised use of a username,
                                                                    password or PIN must be notified to us immediately
                                                                    using the <a href="/contact-us">contact us</a> form,
                                                                    e-mailing contactus@Credit Report.com or by
                                                                    telephoning us on 02038587269. Until you notify us
                                                                    you will be responsible for any unauthorised access
                                                                    to confidential information on the platform.
                                                                </li>{' '}
                                                                <li>
                                                                    You agree not to adapt or circumvent the systems in
                                                                    place in connection with the platform, nor access
                                                                    our systems other than by using the credentials
                                                                    assigned to you and by following the instructions
                                                                    that we have provided for that type of connection.
                                                                </li>{' '}
                                                                <li>
                                                                    We reserve the right not to act on your instructions
                                                                    where we suspect that the person logged into your
                                                                    Credit Report lender account is not you, or we
                                                                    suspect illegal or fraudulent activity or
                                                                    unauthorised use.
                                                                </li>{' '}
                                                                <li>
                                                                    We can refuse to act on any instruction that we
                                                                    believe is unclear, not given by you, might cause us
                                                                    to breach a legal or other duty or if we think the
                                                                    platform is being used for an illegal purpose.
                                                                </li>{' '}
                                                                <li>
                                                                    Your Credit Report lender account will show:
                                                                    <ol>
                                                                        <li value="a">
                                                                            the amount of credit in your Credit Report
                                                                            lender account and the amount you have
                                                                            loaned;
                                                                        </li>{' '}
                                                                        <li value="b">
                                                                            details, of any assets borrowers have
                                                                            pledged as security for Loan Contracts, a
                                                                            short description of borrower's
                                                                            requirements;
                                                                        </li>{' '}
                                                                        <li value="c">certain personal details; and</li>{' '}
                                                                        <li value="d">
                                                                            information about the platform.
                                                                        </li>
                                                                    </ol>
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Cancellation Rights
                                                            <ol>
                                                                <li>
                                                                    If you are a consumer, you have a legal right to
                                                                    cancel your registration with Credit Report, these
                                                                    terms and conditions and any Loan Contract within 14
                                                                    days after the date that you receive an e-mail from
                                                                    Credit Report to confirm that you have registered
                                                                    with the website. Advice about your legal right to
                                                                    cancel is available from your local Citizens' Advice
                                                                    Bureau or Trading Standards office.
                                                                </li>{' '}
                                                                <li>
                                                                    In the event that any monies have been paid by you
                                                                    to Credit Report, these shall not be capable of
                                                                    being reimbursed if they have been committed to be
                                                                    lent to a borrower through our website ('a Loan').
                                                                    In such circumstances, you would need to sell your
                                                                    Loan(s), which will be subject to the availability
                                                                    of purchasers. We will not charge fees in respect of
                                                                    selling your Loan(s) in connection with a
                                                                    cancellation pursuant to clause 5.1. To the extent
                                                                    that your money has not yet been committed to Loans,
                                                                    it will be reimbursed to you in full without charge
                                                                    if you notify us of your desire to withdraw it at
                                                                    any time.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            The Lending Process
                                                            <ol>
                                                                <li>
                                                                    You can lend money by funding your account and
                                                                    applying to invest. We will then use our reasonable
                                                                    endeavours to invest your cash into a number of
                                                                    Loans in accordance with clause 7.
                                                                </li>{' '}
                                                                <li>
                                                                    Requests to lend are treated on a first-come,
                                                                    first-served basis, by reference to the time stamp
                                                                    automatically attributed to your order. We reserve
                                                                    the right to remove applications to invest from the
                                                                    platform at any time for any reason.
                                                                </li>{' '}
                                                                <li>
                                                                    Credit Report will make statements available to you
                                                                    electronically via the My Transactions Page.
                                                                </li>{' '}
                                                                <li>
                                                                    You can select to receive interest and capital
                                                                    repayments as cash or to have them automatically
                                                                    re-invested into new loans. If you wish to make a
                                                                    change to your selection you can do this via 'My
                                                                    Account'.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Diversification
                                                            <ol>
                                                                <li>
                                                                    We shall use our reasonable endeavours to diversify
                                                                    your portfolio of loans. We do this by selling part
                                                                    of your initial loan portfolio and re-investing into
                                                                    new loans coming onto the platform over time. The
                                                                    diversification level may change from time to time
                                                                    according to the number of loans available and their
                                                                    performance. The diversification process may take a
                                                                    period of months to achieve. Until then, your money
                                                                    will be concentrated in a smaller number of loans,
                                                                    meaning the that impact of any individual
                                                                    non-performing loan on your overall investment will
                                                                    be greater. You can view your loan portfolio and any
                                                                    cash held on your ‘My Portfolio’ page.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            The Loan Contract
                                                            <ol>
                                                                <li>
                                                                    Once you have paid funds into your Credit Report
                                                                    lender account you can stipulate how much you wish
                                                                    us to lend to borrowers on your behalf. This
                                                                    provides us with authority to enter into a number of
                                                                    standard form Loan Contracts on your behalf with
                                                                    borrowers that meet our lending criteria. The Loan
                                                                    Contract comprises several documents:
                                                                    <ol>
                                                                        <li value="a">
                                                                            a Term Sheet will be automatically generated
                                                                            setting out the particulars that are
                                                                            specific to that Loan (for example, the time
                                                                            the Loan Contract is entered into; and the
                                                                            identity of the lender and borrower);
                                                                        </li>{' '}
                                                                        <li value="b">
                                                                            standard Loan Conditions which are common to
                                                                            each lender and borrower; and
                                                                        </li>{' '}
                                                                        <li value="c">
                                                                            the Security Document, which specifies the
                                                                            security the borrower will supply to
                                                                            mitigate the risk of default.
                                                                        </li>
                                                                    </ol>
                                                                </li>{' '}
                                                                <li>
                                                                    Once we have made an offer to lend to a borrower on
                                                                    your behalf, your money will be committed to that
                                                                    Loan and you will not be able to access it unless
                                                                    the Loan does not complete. A Loan may not complete
                                                                    because a borrower does not take up the offer (for
                                                                    example, because a property sale does not complete);
                                                                    or if we determine that the Loan cannot complete for
                                                                    any legal or commercial reason (for example because
                                                                    our further due diligence reveals that the borrower
                                                                    does not match our lending criteria).
                                                                </li>{' '}
                                                                <li>
                                                                    Once the borrower draws down on the Loan offer, your
                                                                    money is transferred from your Credit Report lender
                                                                    account to the Credit Report account of the
                                                                    borrower.
                                                                </li>{' '}
                                                                <li>
                                                                    Until the monies in your lender account have been
                                                                    drawn down by the borrower, no interest will be
                                                                    earned by you or paid to you on monies in your Micro
                                                                    lending lender account. Your money goes into a queue
                                                                    with other lenders and will typically be lent out
                                                                    within 30 days. All notices and communications from
                                                                    a borrower may be sent to Credit Report acting as
                                                                    agent on your behalf.
                                                                </li>{' '}
                                                                <li>
                                                                    Each Loan will be for the period specified in the
                                                                    Loan Contract applying to it and subject to the
                                                                    borrower's right to withdraw from the Loan or repay
                                                                    it early. The status of the Loans in your portfolio
                                                                    is available through the My Portfolio page on our
                                                                    website.
                                                                </li>{' '}
                                                                <li>
                                                                    A Loan Contract is between the lender and the
                                                                    borrower. Credit Report will, where it is
                                                                    appropriate to do so, enforce the terms of the Loan
                                                                    Contract; arrange for payments to be made and
                                                                    collected under it; and receive and provide notices
                                                                    under it, but has no other responsibility for
                                                                    discharging the obligations of lenders and
                                                                    borrowers.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Interest and repayments
                                                            <ol>
                                                                <li>
                                                                    The Loan Contract governs the terms of repayment and
                                                                    payment of interest by the borrower. All Loans
                                                                    provide for the payment of monthly interest to you,
                                                                    which you can elect to receive as cash or have us
                                                                    automatically re-invest into new Loans pursuant to
                                                                    clause 6.4.
                                                                </li>{' '}
                                                                <li>
                                                                    Borrowers are liable to repay Loans to lenders and
                                                                    pay any interest on such Loans and Credit Report has
                                                                    no liability in respect of the repayment of Loans
                                                                    and payment of any interest, other than to the
                                                                    extent it has received the same from the borrower.
                                                                </li>{' '}
                                                                <li>
                                                                    Borrowers may pay off their Loans in full, or in
                                                                    part, at any time during the term of the Loan
                                                                    Contract. Interest and charges will be calculated on
                                                                    a daily basis up to the date the Loan is repaid
                                                                    (which is the date all repayments due under the Loan
                                                                    Contract have been made to your Credit Report lender
                                                                    account). The outstanding balance on the Loans is
                                                                    updated monthly on your Credit Report lender
                                                                    account. The Loan Contract governs the payment of
                                                                    these amounts and whether interest is payable
                                                                    monthly, or when the Loan is repaid.
                                                                </li>{' '}
                                                                <li>
                                                                    All repayments and any interest received which is
                                                                    due to you will be paid to your Credit Report lender
                                                                    account.
                                                                </li>{' '}
                                                                <li>
                                                                    On some Loans, the borrower pays advance security
                                                                    for its monthly interest. We will hold this money
                                                                    for the borrower until it becomes due to you, at
                                                                    which point, we shall deal with it in accordance
                                                                    with your instructions pursuant to clause 6.4.
                                                                </li>{' '}
                                                                <li>
                                                                    All repayments and interest paid will be made to
                                                                    lenders without deduction of income tax. It is your
                                                                    responsibility to account for any income tax and
                                                                    other personal taxes that may be payable to the
                                                                    appropriate authorities.
                                                                </li>{' '}
                                                                <li>
                                                                    Typically, any capital repayments due under the Loan
                                                                    Contract will be paid to the Credit Report Client
                                                                    Account and credited to your User Account balance
                                                                    within 3 Business Days of receipt from the borrower.
                                                                    Any interest repayments will be paid to the Micro
                                                                    lending Client Account and credited to your User
                                                                    Account balance on the anniversary date of each loan
                                                                    (pro rata for the first and last month) and in
                                                                    accordance with the terms of the relevant Loan
                                                                    Contract.
                                                                </li>{' '}
                                                                <li>
                                                                    A borrower may require some flexibility in its
                                                                    payments under its Loan Contract. For example, a
                                                                    borrower might come to us to say that they are
                                                                    anticipating being late on a payment and have an
                                                                    acceptable explanation for this. If, having assessed
                                                                    the facts and the evidence provided to us (we
                                                                    usually require an updated valuation of the
                                                                    property, amongst other things), and we are
                                                                    comfortable with the delay, we and may be willing
                                                                    (at our absolute discretion) to allow the borrower
                                                                    some temporary flexibility on its repayments.
                                                                    <ol>
                                                                        <li>
                                                                            In this situation, rather than causing
                                                                            unnecessary payment delays to you (at our
                                                                            absolute discretion) we may opt to pay you
                                                                            the interest due to you on time in advance
                                                                            under the Loan Contract (always at our
                                                                            discretion).
                                                                        </li>{' '}
                                                                        <li>
                                                                            If the delay later becomes an actual
                                                                            non-payment by the borrower, or we pay the
                                                                            interest up-front to you in this way for six
                                                                            months in a row, we would mark the Loan as
                                                                            being in default on the Loans page and look
                                                                            to enforce the terms of the Loan Contract.
                                                                            Any amounts paid by us to you under this
                                                                            clause will be deducted out of recoveries
                                                                            before making payment as set out in the Loan
                                                                            Contract in respect of any other amounts due
                                                                            or owing to you.
                                                                        </li>
                                                                    </ol>
                                                                </li>{' '}
                                                                <li>
                                                                    The target return is the interest rate we are
                                                                    currently targeting to achieve on loans in a
                                                                    portfolio. There will typically be periods during
                                                                    which your money will be held in cash before we are
                                                                    able to fully allocate it to loans (known as “cash
                                                                    drag”). This can happen both when you invest
                                                                    initially and once a loan is repaid and we need to
                                                                    re-invest the proceeds. The actual rate of return
                                                                    you receive will be lower than the loan interest
                                                                    rate where cash drag occurs. The actual rate of
                                                                    return will also be adversely affected if for
                                                                    example: there are any defaults; if there is a fall
                                                                    in the value of the property; or you have to pay tax
                                                                    on the interest you receive. Any changes to the
                                                                    current target rates will be advertised on our
                                                                    website.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Loan Management
                                                            <ol>
                                                                <li>
                                                                    When you lend money on the platform you:
                                                                    <ol>
                                                                        <li value="a">
                                                                            appoint Credit Report, and Credit Report
                                                                            accepts, to act as agent on your behalf in
                                                                            relation to the administration of each Loan;
                                                                            exercising and enforcing your rights under
                                                                            each Loan; and procuring the payment of sums
                                                                            due under each Loan (subject to Micro
                                                                            lending's discretion to act fairly towards
                                                                            borrowers in managing the Loan);
                                                                        </li>{' '}
                                                                        <li value="b">
                                                                            appoint Credit Report, and Credit Report
                                                                            accepts, to act as security trustee on your
                                                                            behalf in relation to the Security Document,
                                                                            as further described in clause 11.
                                                                        </li>
                                                                    </ol>
                                                                </li>{' '}
                                                                <li>
                                                                    Notwithstanding any other clause in these terms you
                                                                    agree that, in certain circumstances, for example a
                                                                    change in the borrower's circumstances, and, subject
                                                                    to clause 10.3 at its absolute discretion, Micro
                                                                    lending (acting as agent on your behalf) may agree
                                                                    with the borrower to restructure the Loan and amend
                                                                    the Loan Contract and you will be bound by these
                                                                    amendments.
                                                                </li>{' '}
                                                                <li>
                                                                    You agree that Credit Report will be acting as your
                                                                    agent on your behalf in
                                                                    <ol>
                                                                        <li value="a">
                                                                            negotiating and agreeing amendments to the
                                                                            Loan Contract; and
                                                                        </li>{' '}
                                                                        <li value="b">
                                                                            negotiating and settling any dispute
                                                                            relating to the Loan Contract.
                                                                        </li>
                                                                    </ol>
                                                                </li>{' '}
                                                                <li>
                                                                    You hereby appoint Credit Report, for as long as you
                                                                    are a lender, as your agent on your behalf with full
                                                                    power to carry out those amendments without your
                                                                    specific agreement. You will then be bound by those
                                                                    amendments. You agree and acknowledge that Micro
                                                                    lending shall take on no liabilities, obligations or
                                                                    rights under the Loan Contract as a result of such
                                                                    agency, and you agree that you will continue to be
                                                                    solely liable and responsible for the rights and
                                                                    obligations under the Loan Contract (as amended) and
                                                                    Credit Report will not be liable for any amendments
                                                                    to the Loan Contract.
                                                                </li>{' '}
                                                                <li>
                                                                    Credit Report may enter into agreements with third
                                                                    parties, such as valuers and agents, for your
                                                                    benefit in connection with the Loan Contract. You
                                                                    will not have any right to enforce the provisions of
                                                                    our agreement with any valuer or other agent
                                                                    directly against that other person.
                                                                </li>{' '}
                                                                <li>
                                                                    Credit Report will collect sums due and distribute
                                                                    them to lenders. We may pass on to lenders available
                                                                    data on borrowers from credit reference agencies to
                                                                    assist each lender's analysis of each Loan request.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Security
                                                            <ol>
                                                                <li>
                                                                    Credit Report may require directors or members of
                                                                    the borrower to provide personal guarantees as
                                                                    security for the Loan.
                                                                </li>{' '}
                                                                <li>
                                                                    All Loans are secured pursuant to the terms of a
                                                                    Security Document, and the following provisions
                                                                    apply to each Loan:
                                                                    <ol>
                                                                        <li value="a">
                                                                            If the borrower is a Corporate Entity, the
                                                                            borrower's obligation under the Loan
                                                                            Contract to you will be secured by a legal
                                                                            charge over the property and/or a debenture
                                                                            and any other security held by Credit Report
                                                                            on trust for the lenders and in the event
                                                                            that a borrower fails to make a payment when
                                                                            due or defaults in meeting any material
                                                                            obligations of the Loan you agree that Micro
                                                                            lending may (as security trustee on your
                                                                            behalf) enforce the security on your behalf
                                                                            constituted by the Security Document.
                                                                        </li>{' '}
                                                                        <li value="b">
                                                                            If the borrower is an individual, the
                                                                            borrower's obligation under the Loan
                                                                            Contract to you will be secured by a legal
                                                                            charge over the property, and any other
                                                                            security held by Credit Report. In the event
                                                                            that a borrower fails to make a payment when
                                                                            due, or defaults in meeting any material
                                                                            obligations of the Loan, you agree that
                                                                            Credit Report may (as security trustee on
                                                                            your behalf) enforce the security on your
                                                                            behalf constituted by the Security Document.
                                                                        </li>{' '}
                                                                        <li value="c">
                                                                            If a borrower has existing liabilities in
                                                                            place, which are secured by existing
                                                                            security, then the existing security holder
                                                                            may require Credit Report (as security
                                                                            trustee) to enter into a deed of priority or
                                                                            inter-creditor deed and you agree that Micro
                                                                            lending may enter into such deed and
                                                                            acknowledge that Credit Report's security
                                                                            may rank behind the existing security.
                                                                        </li>
                                                                    </ol>
                                                                </li>{' '}
                                                                <li>
                                                                    In the circumstances described at clause 11.2, you
                                                                    agree that Credit Report will act on your behalf as
                                                                    security trustee in respect of any borrower's
                                                                    liabilities to you under each Loan. All
                                                                    communications to a borrower in connection with any
                                                                    such security will be made through Credit Report.
                                                                </li>{' '}
                                                                <li>
                                                                    Where we have been provided with information by a
                                                                    relevant borrower, we may provide to you as a lender
                                                                    certain information about the assets of that
                                                                    borrower and/or an asset register detailing such
                                                                    assets together with estimated sale value of such
                                                                    assets on enforcement. In such circumstances, any
                                                                    asset valuation provided will be indicative of the
                                                                    value of the asset or assets only and realisation on
                                                                    enforcement in connection with the sale of such
                                                                    asset or assets may be lower (or higher) than the
                                                                    value set out in the asset register. Credit Report
                                                                    accepts no liability for any information provided in
                                                                    the assets register.
                                                                </li>{' '}
                                                                <li>
                                                                    Credit Report will hold the assets charged under any
                                                                    security upon trust for itself and for all lenders
                                                                    to that borrower (including you) and to itself (in
                                                                    respect of any amounts due to Credit Report). From
                                                                    time to time Credit Report may perform (before or
                                                                    after any enforcement under the terms of the
                                                                    security) all obligations, rights and benefits given
                                                                    to it by any Security Document. Credit Report (as
                                                                    security trustee) shall have certain powers and
                                                                    discretions conferred upon trustees and may also
                                                                    rely on any representation, notice or document
                                                                    believed by it to be genuine, correct and
                                                                    appropriately authorised and any statement made by
                                                                    any director, authorised signatory or employee of
                                                                    any person regarding any matters which may
                                                                    reasonably be assumed to be within his knowledge or
                                                                    within his power to verify. All costs incurred by
                                                                    Credit Report will be deducted from any amounts
                                                                    recovered by Credit Report before the monies are
                                                                    paid to lenders.
                                                                </li>{' '}
                                                                <li>
                                                                    The security Credit Report holds in respect of a
                                                                    particular Loan or the liabilities of a particular
                                                                    borrower (such as legal charge and/or debenture),
                                                                    operates to secure all monies due from that borrower
                                                                    to lenders on the Credit Report platform from time
                                                                    to time. If Credit Report is required to enforce any
                                                                    Security Document, and any proceeds of recovery
                                                                    become available (after allowing for all of Micro
                                                                    lending's costs of enforcement), it is possible that
                                                                    the available proceeds will not be sufficient to
                                                                    discharge all obligations owed by the borrower at
                                                                    that time to lenders on the Credit Report platform.
                                                                    If that is the case, then the lenders shall only be
                                                                    entitled to recover their proportionate share of
                                                                    such recoveries. In addition, it is possible that
                                                                    there may be other creditors of the borrower that
                                                                    have claims that may be recovered in priority to
                                                                    those of Credit Report and the Credit Report
                                                                    lenders, so the existence of such security should
                                                                    not be considered to be a guarantee of certain
                                                                    repayment in the event of failure by the borrower in
                                                                    meeting its payments.
                                                                </li>{' '}
                                                                <li>
                                                                    You agree that Credit Report shall be entitled to be
                                                                    repaid and reimbursed out of the proceeds of any
                                                                    recovery under any Security Document and that you
                                                                    will pay all reasonable costs incurred by Micro
                                                                    lending in enforcing the security or in complying
                                                                    with any instructions from you in connection with
                                                                    any security agreement. You will only be responsible
                                                                    for payment of such costs out of the proceeds of any
                                                                    recovery and to the extent that such costs cannot be
                                                                    recovered by Credit Report from the relevant
                                                                    borrower.
                                                                </li>{' '}
                                                                <li>
                                                                    You agree that Credit Report will in its sole
                                                                    discretion and subject to any regulatory obligations
                                                                    it may owe to borrowers determine whether to pursue
                                                                    any recovery.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Cashing in your loans
                                                            <ol>
                                                                <li>
                                                                    You can, pursuant to clause 6.4, elect to receive
                                                                    interest and re-paid capital paid into your account
                                                                    in cash when we receive it from the borrowers. You
                                                                    can withdraw cash from your account at any time.
                                                                </li>{' '}
                                                                <li>
                                                                    If you want to cash in your portfolio of outstanding
                                                                    Loans, you can request to do so at any time by
                                                                    clicking on 'Sell Loans' on the My Portfolio page or
                                                                    by contacting us via e-mail or in writing. Upon
                                                                    receipt of your instruction, we will attempt to sell
                                                                    your Loans to new lenders. We cannot guarantee that
                                                                    there will be new lenders willing to buy your Loans.
                                                                    In this scenario, you may have to wait until the
                                                                    borrowers pay off the Loans and/or we pursue
                                                                    recovery in respect of any defaults.
                                                                </li>{' '}
                                                                <li>
                                                                    Loans will be sold at a price that reflects the
                                                                    interest and capital due to you at the point of
                                                                    sale. If the interest rate has changed since you
                                                                    acquired a Loan you may receive, or have to pay, a
                                                                    premium reflecting the difference between the terms
                                                                    of your Loan and the terms of a new Loan a lender
                                                                    could acquire on the website at current interest
                                                                    rates. In other words, you will pay a premium if the
                                                                    interest rate has gone up and you will receive one
                                                                    if it has gone down. The level of the premium will
                                                                    be disclosed to you before you provide your
                                                                    instructions to sell.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Borrower event of default and enforceability
                                                            <ol>
                                                                <li>
                                                                    Credit Report (acting as agent on behalf of the
                                                                    lenders) shall, where it determines such action to
                                                                    be desirable in the interests of lenders and
                                                                    proportionate and fair to the borrower and in
                                                                    compliance with any other regulatory obligations we
                                                                    owe to borrowers, enforce payment of the debt and
                                                                    enforce the security against the borrower.
                                                                </li>{' '}
                                                                <li>
                                                                    We may appoint any third party to administer loans
                                                                    on our behalf and to enforce the provisions of the
                                                                    Loan Contract and these Terms and Conditions for
                                                                    your benefit. These rights will, unless we notify
                                                                    you otherwise, survive our insolvency. Any third
                                                                    party shall not be responsible for anything done
                                                                    prior to their appointment.
                                                                </li>{' '}
                                                                <li>
                                                                    If we are required to sell any asset, the borrower
                                                                    or another person has provided as Security, the
                                                                    proceeds of recovery shall be applied in the
                                                                    following order:
                                                                    <ol>
                                                                        <li value="a">
                                                                            first to pay the expenses of any third party
                                                                            involved in the recovery process;
                                                                        </li>{' '}
                                                                        <li value="b">
                                                                            second to pay our expenses (or the expenses
                                                                            of the appointed third party, as the case
                                                                            may be) for pursuing recovery, as set out in
                                                                            the Tariff and, if relevant to pay any other
                                                                            fees of the appointed third party;
                                                                        </li>{' '}
                                                                        <li value="c">
                                                                            third to pay interest on your Loan
                                                                        </li>{' '}
                                                                        <li value="d">
                                                                            fourth to pay capital on your Loan;
                                                                        </li>{' '}
                                                                        <li value="e">
                                                                            fifth to pay our fees, other than those set
                                                                            out in clause 13.3(b);
                                                                        </li>{' '}
                                                                        <li value="f">
                                                                            any residue will be payable to the borrower
                                                                            or any other person with an interest in the
                                                                            asset.
                                                                        </li>
                                                                    </ol>
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Agreements with Credit Report
                                                            <ol>
                                                                <li>
                                                                    You agree that Credit Report is making no warranty
                                                                    or representation as to the ability of borrowers to
                                                                    repay Loans or pay interest or fees on those Loans,
                                                                    and their credit risk, and that we are in no way
                                                                    liable for the debts of borrowers to you. You
                                                                    acknowledge that you are lending entirely at your
                                                                    own risk.
                                                                </li>{' '}
                                                                <li>
                                                                    You acknowledge that Credit Report has only
                                                                    undertaken limited investigation on each Loan. You
                                                                    are responsible for making your assessment of the
                                                                    viability of each Loan.
                                                                </li>{' '}
                                                                <li>
                                                                    Where Credit Report has implemented any form of
                                                                    personal guarantee or other personal security in
                                                                    support of a Loan on your behalf as a lender, you
                                                                    accept that the enforceability of such personal
                                                                    guarantee shall be subject to normal legal risks and
                                                                    limitations and that Credit Report will not have
                                                                    ensured that any individual providing such a
                                                                    guarantee has been independently advised on the
                                                                    impact of such a personal guarantee. Such guarantees
                                                                    can be open to challenge in circumstances where the
                                                                    individual granting the guarantee has been subject
                                                                    to undue pressure or influence from a third party.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            No advice or responsibility to repay from Credit Report
                                                            <ol>
                                                                <li>
                                                                    Nothing Credit Report does, and nothing on the
                                                                    platform, is intended to operate or be construed as
                                                                    advice or recommendation by Credit Report to enter
                                                                    into a particular Loan. A lender must form their own
                                                                    opinion regarding the risk of a particular product,
                                                                    including the lending criteria and risks disclosed
                                                                    on the website. They should undertake their own
                                                                    research, analysis and assessment of each borrower
                                                                    for each Loan and, where appropriate, seek their own
                                                                    independent financial and legal advice.
                                                                </li>{' '}
                                                                <li>
                                                                    The information on the platform does not constitute
                                                                    advice, recommendation or an endorsement of Loan
                                                                    requests or borrowers. The information is not
                                                                    intended to be relied upon as a sole basis for
                                                                    deciding whether or not to lend to a particular
                                                                    Loan.
                                                                </li>{' '}
                                                                <li>
                                                                    We make no representation or warranty as to the
                                                                    accuracy of the data displayed for Loan requests,
                                                                    where applicable, nor whether the information is up
                                                                    to date or error free.
                                                                </li>{' '}
                                                                <li>
                                                                    We do not guarantee that Loans will be fully funded,
                                                                    that there will be sufficient borrowers for you to
                                                                    lend.
                                                                </li>{' '}
                                                                <li>
                                                                    While Credit Report believes that the security
                                                                    documents might provide additional comfort as to the
                                                                    likelihood of repayment, Credit Report accepts no
                                                                    responsibility for the likelihood of a borrower
                                                                    meeting its financial obligations to lenders through
                                                                    the Credit Report platform in circumstances where
                                                                    such recourse to the assets of the borrower is
                                                                    available.
                                                                </li>{' '}
                                                                <li>
                                                                    Credit Report accepts no responsibility and
                                                                    disclaims all liability for any information received
                                                                    from third parties (including the borrower) about a
                                                                    borrower made available to prospective lenders
                                                                    through the Credit Report platform. Credit Report
                                                                    may from time to time, but accepts no obligation to,
                                                                    update or amend at any time loan information
                                                                    (including between when the loan request is first
                                                                    made and when it is entered into, and during the
                                                                    term of any loan).
                                                                </li>{' '}
                                                                <li>
                                                                    Information we may provide on the platform of the
                                                                    likely rate of return on Loans are for guidance
                                                                    purposes only and are not guaranteed.
                                                                </li>{' '}
                                                                <li>
                                                                    Lending money on the platform involves risk to your
                                                                    capital. If you suffer a loss, either by the
                                                                    borrower not repaying the Loan or as a result of our
                                                                    insolvency, you are not entitled to compensation
                                                                    from the Financial Services Compensation Scheme
                                                                    ("FSCS"). If, however, the bank holding the client
                                                                    account becomes insolvent and you are an eligible
                                                                    claimant, you may be entitled to compensation from
                                                                    the Financial Services Compensation Scheme in
                                                                    respect of any of your money held in the account at
                                                                    that time. Further details, including the
                                                                    "Eligibility Rules", are available at{' '}
                                                                    <a href="http://www.fscs.org.uk/">
                                                                        www.fscs.org.uk.
                                                                    </a>
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Back-up Servicer Arrangements
                                                            <ol>
                                                                <li>
                                                                    We may make arrangements for the transfer our
                                                                    obligations to you in respect of outstanding loans
                                                                    to a back-up loan servicer if we believe this to be
                                                                    in your interests. You confirm that you authorise
                                                                    any back-up servicer that we may appoint from time
                                                                    to time to perform each of the functions ascribed to
                                                                    Credit Report on your behalf. Please note that the
                                                                    back-up servicer's role would be strictly limited to
                                                                    dealing with borrowers on behalf of lenders to
                                                                    administer and w ind up existing loans, rather than
                                                                    effecting new loans or loan transfers.
                                                                </li>{' '}
                                                                <li>
                                                                    As part of transferring our obligations, we may
                                                                    transfer cash balances in your client account to any
                                                                    back-up service provider and arrange for the back-up
                                                                    servicer to open accounts for the purposes of
                                                                    collecting and distributing monies due to you. In
                                                                    normal circumstances, we will try to return cash
                                                                    balances to you as part of entering into back-up
                                                                    service arrangements, but if this is not possible
                                                                    for any reason, you expressly consent to us paying
                                                                    or procuring the payment of client money balances to
                                                                    your client money account with a back-up service
                                                                    provider that is permitted to hold client money in
                                                                    accordance with FCA rules.
                                                                </li>{' '}
                                                                <li>
                                                                    &nbsp;As at the date of these Terms, we have not
                                                                    appointed a back-up loan servicer, but have instead
                                                                    appointed an internal Wind Down Coordinator with
                                                                    responsibility for administering and, if necessary
                                                                    enforcing loans, in the event that Credit Report
                                                                    winds down.&nbsp; The Wind Down Coordinator’s
                                                                    appointment includes a commitment to make himself
                                                                    available to work with any insolvency practitioner
                                                                    in order to wind-down loans in the unlikely event of
                                                                    Credit Report’s insolvency.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Terminating your Participation on the Credit Report Website
                                                            <ol>
                                                                <li>
                                                                    If you no longer want to be a lender with Micro
                                                                    lending, and provided you have no Loan Contracts
                                                                    currently in force, you can let us know and we will
                                                                    terminate your registration.
                                                                </li>{' '}
                                                                <li>
                                                                    We may terminate your registration with Micro
                                                                    lending at any time without notice for any reason
                                                                    relating to your conduct or our continued ability to
                                                                    provide the services. Where reasonably possible, we
                                                                    shall give you at least one month’s written notice
                                                                    prior to termination. The following is a
                                                                    non-exhaustive list of factors relating to your
                                                                    conduct that could influence our decision:
                                                                    <ol>
                                                                        <li value="a">
                                                                            you breach any part of the Lender Terms and
                                                                            Conditions;
                                                                        </li>{' '}
                                                                        <li value="b">you breach any Loan Contract;</li>{' '}
                                                                        <li value="c">
                                                                            we suspect that you have committed fraud,
                                                                            been involved in money laundering or other
                                                                            criminal activities;
                                                                        </li>{' '}
                                                                        <li value="d">
                                                                            you suspend, or threaten to suspend, payment
                                                                            of your debts, or are unable to pay your
                                                                            debts as they fall due or admit inability to
                                                                            pay your debts, or (being a company or
                                                                            limited liability partnership) are deemed
                                                                            unable to pay your debts within the meaning
                                                                            of section 123 of the Insolvency Act 1986,
                                                                            or (being an individual) are deemed either
                                                                            unable to pay your debts or as having no
                                                                            reasonable prospect of so doing, in either
                                                                            case, within the meaning of section 268 of
                                                                            the Insolvency Act 1986, or (being a
                                                                            partnership) have any partner to whom any of
                                                                            the foregoing apply;
                                                                        </li>{' '}
                                                                        <li value="e">
                                                                            you commence negotiations with all or any
                                                                            class of your creditors with a view to
                                                                            rescheduling any of your debts, or make a
                                                                            proposal for or enter into any compromise or
                                                                            arrangement with your creditors other than
                                                                            (where you are a company) where these events
                                                                            take place for the sole purpose of a scheme
                                                                            for your solvent amalgamation with one or
                                                                            more other companies or your solvent
                                                                            reconstruction;
                                                                        </li>{' '}
                                                                        <li value="f">
                                                                            (being a company) a petition is filed, a
                                                                            notice is given, a resolution is passed, or
                                                                            an order is made, for or in connection with
                                                                            your winding up, other than for the sole
                                                                            purpose of a scheme for your solvent
                                                                            amalgamation with one or more other
                                                                            companies or your solvent reconstruction;
                                                                        </li>{' '}
                                                                        <li value="g">
                                                                            (being a company or an LLP) an application
                                                                            is made to court, or an order is made, for
                                                                            the appointment of an administrator or if a
                                                                            notice of intention to appoint an
                                                                            administrator is given or if an
                                                                            administrator is appointed over you;
                                                                        </li>{' '}
                                                                        <li value="h">
                                                                            a person becomes entitled to appoint a
                                                                            receiver over your assets or a receiver is
                                                                            appointed over your assets;
                                                                        </li>{' '}
                                                                        <li value="i">
                                                                            (being an individual) you are the subject of
                                                                            a bankruptcy petition or order;
                                                                        </li>{' '}
                                                                        <li value="j">
                                                                            a creditor or encumbrancer attaches or takes
                                                                            possession of, or a distress, execution,
                                                                            sequestration or other such process is
                                                                            levied or enforced on or sued against, the
                                                                            whole or any part of your assets and such
                                                                            attachment or process is not discharged
                                                                            within 10 business days;
                                                                        </li>{' '}
                                                                        <li value="k">
                                                                            any event occurs, or proceeding is taken, in
                                                                            any jurisdiction to which you are subject
                                                                            that has an effect equivalent or similar to
                                                                            any of the events mentioned in clause
                                                                            17.2(iv) to clause 17.2(x) (inclusive);
                                                                        </li>{' '}
                                                                        <li value="l">
                                                                            you suspend, threaten to suspend, cease or
                                                                            threaten to cease to carry on all or a
                                                                            substantial part of your business, if
                                                                            applicable;
                                                                        </li>{' '}
                                                                        <li value="m">
                                                                            your financial position deteriorates to such
                                                                            an extent that in Credit Report's opinion
                                                                            your capability to adequately fulfil your
                                                                            obligations under these terms and conditions
                                                                            has been placed in jeopardy;
                                                                        </li>{' '}
                                                                        <li value="n">
                                                                            (being an individual) you die or, by reason
                                                                            of illness or incapacity (whether mental or
                                                                            physical), are incapable of managing your
                                                                            own affairs or become a patient under any
                                                                            mental health legislation;
                                                                        </li>{' '}
                                                                        <li value="o">
                                                                            you use the Credit Report platform or any
                                                                            information accessible on or obtained from
                                                                            it for the purpose of canvassing or
                                                                            soliciting any person or enticing any person
                                                                            away from Credit Report;
                                                                        </li>{' '}
                                                                        <li value="p">
                                                                            you use the Credit Report platform in any of
                                                                            the following ways:
                                                                            <ol>
                                                                                <li value="i">
                                                                                    in any way that causes, or is likely
                                                                                    to cause, the platform or access to
                                                                                    it to be interrupted or damaged in
                                                                                    any way;
                                                                                </li>{' '}
                                                                                <li value="ii">
                                                                                    for fraudulent purposes, or in
                                                                                    connection with a criminal offence;
                                                                                </li>{' '}
                                                                                <li value="iii">
                                                                                    to send, use or reuse any material
                                                                                    that is illegal, offensive, abusive,
                                                                                    indecent, defamatory, obscene or
                                                                                    menacing; or in breach of copyright,
                                                                                    trademark, confidence, privacy or
                                                                                    any other right; or is otherwise
                                                                                    injurious to third parties; or
                                                                                    objectionable; or which consists of
                                                                                    or contains software viruses,
                                                                                    political campaigning, commercial
                                                                                    solicitation, chain letters, mass
                                                                                    mailings or any "spam";
                                                                                </li>{' '}
                                                                                <li value="iv">
                                                                                    causing annoyance, inconvenience or
                                                                                    needless anxiety; or
                                                                                </li>{' '}
                                                                                <li value="v">
                                                                                    there is no activity in your Micro
                                                                                    lending lender account within a
                                                                                    12-month period.
                                                                                </li>
                                                                            </ol>
                                                                        </li>
                                                                    </ol>
                                                                </li>{' '}
                                                                <li>
                                                                    Within 10 business days of termination, we will
                                                                    credit your bank or building society account with
                                                                    any cash left in your Credit Report lender account.
                                                                </li>{' '}
                                                                <li>
                                                                    Termination under clause 17.2 shall not affect your
                                                                    right to receive payments under existing loans and
                                                                    we will keep your account open for the purposes of
                                                                    winding up these loans until all sums due to you
                                                                    have been repaid unless we reasonably believe there
                                                                    is a legal or regulatory reason preventing us from
                                                                    continuing to make such payments to you.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Credit Report plus membership
                                                            <ol>
                                                                <li>
                                                                    By registering as a user of the platform and the
                                                                    services provided via our systems, you are
                                                                    automatically entitled to Credit Report plus
                                                                    membership if you invest a minimum of £1,000.
                                                                </li>{' '}
                                                                <li>
                                                                    Credit Report plus membership entitles members to
                                                                    certain benefits which are detailed on the Micro
                                                                    lending website. Membership and any benefits
                                                                    provided by the membership are strictly personal and
                                                                    cannot be gifted or sold.
                                                                </li>{' '}
                                                                <li>
                                                                    The Credit Report plus membership benefits available
                                                                    to members will be organized by Lifeworks and will
                                                                    be subject to the terms and conditions of Lifeworks.
                                                                    To enjoy the benefits available to you under the
                                                                    Credit Report plus membership you will need to
                                                                    register an account with Lifeworks. Credit Report
                                                                    will send you details of how to set up your account
                                                                    with Lifeworks when you first register with Micro
                                                                    lending.
                                                                </li>{' '}
                                                                <li>
                                                                    Credit Report may refuse membership to any person
                                                                    and may terminate membership at any time. If
                                                                    membership is terminated for any reason then all
                                                                    benefits relating to that membership will cease to
                                                                    be available entirely.
                                                                </li>{' '}
                                                                <li>
                                                                    If your registration with Credit Report is
                                                                    terminated under clause 17 or for any other reason
                                                                    whatsoever, your Credit Report plus membership (and
                                                                    any third party memberships that you have given
                                                                    under our refer a friend scheme) will automatically
                                                                    be terminated at the same time.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            International Payments
                                                            <ol>
                                                                <li>
                                                                    We may, but are not required to, offer a currency
                                                                    conversion facility that enables you to convert
                                                                    money held in a non-Sterling account into Sterling
                                                                    prior to investing.
                                                                </li>{' '}
                                                                <li>
                                                                    When you apply to make a currency conversion, we
                                                                    will provide you with an indicative exchange rate
                                                                    quote on the payments screen representing the rate
                                                                    available through our foreign exchange partners at
                                                                    the time of the quote. Exchange rates fluctuate
                                                                    rapidly and the actual rate will be determined at
                                                                    the time your money arrives with us. Any change
                                                                    between the rate at the time of providing you with
                                                                    the indicative quote and the rate you receive when
                                                                    you have funded your account will result in you
                                                                    investing a different amount to the Sterling figure
                                                                    we provided in our indicative quote.
                                                                </li>{' '}
                                                                <li>
                                                                    Where exchange rates have moved so that you have
                                                                    invested less than the amount required to secure an
                                                                    interest rate for the product you applied to invest
                                                                    in, we will email you to let you know of the
                                                                    shortfall. You will be provided with at least [14
                                                                    days] in which to top-up your subscription to
                                                                    achieve the minimum investment level. If you do not
                                                                    top-up your account within this time window, you
                                                                    shall receive the lower rate unless and until you
                                                                    bring the account level up to the minimum investment
                                                                    amount.
                                                                </li>{' '}
                                                                <li>
                                                                    If you want to avoid the risk of needing to top up,
                                                                    you can choose to invest more at the point of
                                                                    application.
                                                                </li>{' '}
                                                                <li>
                                                                    We will not be able to reverse a currency conversion
                                                                    with our foreign chosen exchange partner once you
                                                                    have authorised us to enter into it and if you wish
                                                                    to convert the money back into the source currency,
                                                                    you must enter into a new transaction at the
                                                                    prevailing rate.
                                                                </li>{' '}
                                                                <li>
                                                                    You are responsible for paying all currency
                                                                    conversion fees.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            General terms
                                                            <ol>
                                                                <li>
                                                                    The information provided on the platform is directed
                                                                    solely at and is for use solely by persons and
                                                                    organisations that meet the criteria set out in
                                                                    clause 3. The content provided through the platform
                                                                    is not intended for distribution to, or use by, any
                                                                    person or entity in any jurisdiction where such
                                                                    distribution or use would be contrary to applicable
                                                                    law or regulation.
                                                                </li>{' '}
                                                                <li>
                                                                    You are permitted to download and print content from
                                                                    this platform solely for your own personal use, or
                                                                    in the course of your business, to the extent
                                                                    required to use the services provided on this
                                                                    platform. Credit Report supplied content must not be
                                                                    copied or reproduced, modified, redistributed, used
                                                                    or otherwise dealt with for any other reason without
                                                                    our express written consent.
                                                                </li>{' '}
                                                                <li>
                                                                    We are not responsible for content downloaded or
                                                                    posted by lenders on the platform.
                                                                </li>{' '}
                                                                <li>
                                                                    We will endeavour to allow uninterrupted access to
                                                                    the platform, but access to the platform may be
                                                                    suspended, restricted or terminated at any time.
                                                                </li>{' '}
                                                                <li>
                                                                    You agree to use the platform only for lawful
                                                                    purposes and in a way which does not infringe the
                                                                    rights of any anyone else or restrict or inhibit
                                                                    anyone else's use and enjoyment of the platform.
                                                                </li>{' '}
                                                                <li>
                                                                    You agree not to use the Credit Report platform, or
                                                                    any information accessible on or obtained from it,
                                                                    for the purpose of canvassing or soliciting any
                                                                    person or enticing any person away from Micro
                                                                    lending.
                                                                </li>{' '}
                                                                <li>
                                                                    You warrant that you have taken all reasonable
                                                                    precautions to ensure that any data you upload or
                                                                    otherwise submit to the platform is free from
                                                                    viruses and anything else which may have a
                                                                    contaminating or destructive effect on any part of
                                                                    the platform or any other technology.
                                                                </li>{' '}
                                                                <li>
                                                                    The content and material available through the
                                                                    platform is for informational purposes only and
                                                                    should not be regarded as an offer, solicitation,
                                                                    invitation, advice or recommendation to buy or sell
                                                                    investments, securities or any other financial
                                                                    services or banking product. If you are unsure about
                                                                    whether a product is suitable you should contact an
                                                                    independent financial adviser.
                                                                </li>{' '}
                                                                <li>
                                                                    You are responsible for all costs incurred by you in
                                                                    accessing the platform.
                                                                </li>{' '}
                                                                <li>
                                                                    We accept no responsibility or liability for your
                                                                    use of content on the platform and such use is
                                                                    entirely at your own risk. While we take reasonable
                                                                    precautions to prevent the existence of computer
                                                                    viruses or other malicious programs on the platform,
                                                                    we accept no liability for them if they do exist. It
                                                                    is your responsibility to use, update and maintain
                                                                    appropriate antivirus software on your computer.
                                                                </li>{' '}
                                                                <li>
                                                                    Information transmitted via our systems will pass
                                                                    over public telecommunications networks. We accept
                                                                    no liability if communications sent via the platform
                                                                    are intercepted by third parties or incorrectly
                                                                    delivered or not delivered.
                                                                </li>{' '}
                                                                <li>
                                                                    The platform may contain links to third party
                                                                    websites. We accept no responsibility or liability
                                                                    for any material supplied by or contained on any
                                                                    third-party website which is linked from or to the
                                                                    platform, or any use of personal data by such third
                                                                    party.
                                                                </li>{' '}
                                                                <li>
                                                                    We may update the Credit Report website from time to
                                                                    time. However, please note that any of the content
                                                                    on the platform may be out of date at any given
                                                                    time, and we are under no obligation to update it.
                                                                    We do not guarantee that the platform, or any
                                                                    content on it, will be free from errors or
                                                                    omissions.
                                                                </li>{' '}
                                                                <li>
                                                                    You cannot include a link to the platform on any
                                                                    other website, computer or network without our prior
                                                                    written consent.
                                                                </li>{' '}
                                                                <li>
                                                                    We are responsible for managing conflicts of
                                                                    interest between you and other clients and between
                                                                    you and us. A copy of our conflicts of interest
                                                                    policy is available upon request. We act for both
                                                                    lenders and borrowers. Whilst our primary obligation
                                                                    is to enforce the terms of the Loan Contract for
                                                                    your benefit, we have regulatory obligations towards
                                                                    some borrowers and must treat those borrowers
                                                                    fairly. Where we exercise discretion to permit
                                                                    borrowers to extend the term of a Loan, we will do
                                                                    so where we believe this is most likely to result in
                                                                    a quicker or fuller recovery than by enforcing your
                                                                    rights under the Security Document.
                                                                </li>{' '}
                                                                <li>
                                                                    We may use the services of professional lenders in
                                                                    order to originate loans prior to making them
                                                                    available to P2P lenders. Professional lenders
                                                                    typically make larger amounts of cash available that
                                                                    enables us to conclude loan agreements with
                                                                    borrowers with speed and certainty, which in turn
                                                                    improves the quality and diversity of Loans that we
                                                                    can acquire for you. The professional lenders may be
                                                                    subject to longer notice periods for withdrawing
                                                                    their cash, higher minimum investment levels and
                                                                    requirements to sell their loans and hold cash with
                                                                    P2P lender money is available. Accordingly, they may
                                                                    receive preferential interest rates.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Privacy
                                                            <ol>
                                                                <li>
                                                                    You agree that any and all personal information you
                                                                    provide to us via this platform may be collected,
                                                                    stored, processed and used in accordance with our
                                                                    current privacy policy (accessible online at{' '}
                                                                    <a href="/privacy">www.Credit Report.com/privacy</a>
                                                                    ).
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Intellectual property rights
                                                            <ol>
                                                                <li>
                                                                    Subject to clause 21.3 below, as between you and us,
                                                                    we own all present and future copyright, registered
                                                                    and unregistered trademarks, design rights,
                                                                    unregistered designs, database rights and all other
                                                                    present and future intellectual property rights and
                                                                    rights in the nature of intellectual property rights
                                                                    existing in or in relation to the Credit Report
                                                                    platform.
                                                                </li>{' '}
                                                                <li>
                                                                    If, and to the extent that any such intellectual
                                                                    property rights vest in you by operation of law or
                                                                    otherwise, you agree to do any and all such acts and
                                                                    execute any and all such documents as we may
                                                                    reasonably request in order to assign such
                                                                    intellectual property rights back to us.
                                                                </li>{' '}
                                                                <li>
                                                                    You shall retain ownership of all copyright in data
                                                                    you upload or submit to the platform. You grant us a
                                                                    world-wide exclusive, royalty-free, non-terminable
                                                                    license to use, copy, distribute, publish and
                                                                    transmit such data in any manner.
                                                                </li>{' '}
                                                                <li>
                                                                    We do not warrant or represent that the content of
                                                                    the platform does not infringe the rights of any
                                                                    third party.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Your liability to us
                                                            <ol>
                                                                <li>
                                                                    You shall be liable to us for any loss or damage
                                                                    suffered by Credit Report as a result of any breach
                                                                    of the Terms or any Loan Contract, or any fraudulent
                                                                    use of the Credit Report platform.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Our liability to you
                                                            <ol>
                                                                <li>
                                                                    Credit Report shall not be liable to you for any
                                                                    loss or damage which you may suffer as a result of
                                                                    being a member of Credit Report or using the
                                                                    services provided via the platform, except where
                                                                    such loss or damage arises from our breach of these
                                                                    terms and conditions or was caused by negligence,
                                                                    willful default, breach of our regulatory duty to
                                                                    you or fraud by us or our employees. We are not
                                                                    responsible for any breach of these terms and
                                                                    conditions arising from circumstances outside our
                                                                    reasonable control.
                                                                </li>{' '}
                                                                <li>
                                                                    Nothing in these terms and conditions shall limit
                                                                    Credit Report's liability for personal injury or
                                                                    death, fraud, or for any other liability the
                                                                    exclusion or limitation of which is not permitted by
                                                                    the rules of the Financial Conduct Authority or any
                                                                    applicable law or regulation.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Amendments to these terms and conditions
                                                            <ol>
                                                                <li>
                                                                    We expect to need to update or amend these terms and
                                                                    conditions from time to time to comply with the
                                                                    Financial Conduct Authority rules and any other laws
                                                                    or regulations or to meet our changing business
                                                                    requirements. We may make such changes without your
                                                                    specific agreement and we may not always be able to
                                                                    give you advanced notice of such updates or
                                                                    amendments, but we will always post them on the
                                                                    platform, so you can view them when you next log in.
                                                                    By continuing to use the platform, or our services
                                                                    in allocating funds you have deposited, you agree to
                                                                    be bound by the terms of any updates and amendments
                                                                    implemented in accordance with this clause 24.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Complaints
                                                            <ol>
                                                                <li>
                                                                    If you wish to complain about the service we
                                                                    provide, you should contact us on 0203 858 7269,
                                                                    email us at complaints@Credit Report.com, or write
                                                                    to us at 158-164 Fulham Rd, London, SW10 9PR. A copy
                                                                    of our Complaints Handling Procedures is available
                                                                    on request. If we are unable to resolve your
                                                                    complaint, you may be eligible to refer it to the
                                                                    Financial Ombudsman Service. Further information is
                                                                    available at{' '}
                                                                    <a href="https://www.financial-ombudsman.org.uk/">
                                                                        www.financial-ombudsman.org.uk/
                                                                    </a>
                                                                    .
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Other important terms
                                                            <ol>
                                                                <li>
                                                                    If any of these terms and conditions is found to be
                                                                    illegal, invalid or unenforceable by any court of
                                                                    competent jurisdiction, the remainder shall continue
                                                                    in full force and effect.
                                                                </li>{' '}
                                                                <li>
                                                                    All disclaimers, indemnities and exclusions in these
                                                                    terms and conditions shall survive termination of
                                                                    the agreement between us for any reason.
                                                                </li>{' '}
                                                                <li>
                                                                    We may, in whole or in part, release, compound,
                                                                    compromise, waive or postpone, in our absolute
                                                                    discretion, any liability owed to us or right
                                                                    granted to us in these terms and conditions without
                                                                    in any way prejudicing or affecting our rights in
                                                                    respect of that or any other liability or right not
                                                                    so released, compounded, compromised, waived or
                                                                    postponed. A waiver of any right is only effective
                                                                    if it is in writing and shall not been deemed to be
                                                                    a waiver of any subsequent breach or default.
                                                                </li>{' '}
                                                                <li>
                                                                    No single or partial exercise, or failure or delay
                                                                    in exercising any right, power or remedy by us shall
                                                                    constitute a waiver by us of, or impair or preclude
                                                                    any further exercise of, that or any right, power or
                                                                    remedy arising under these terms and conditions or
                                                                    otherwise.
                                                                </li>{' '}
                                                                <li>
                                                                    These terms and conditions and the Loan Contracts
                                                                    set out the entire agreement between you and us with
                                                                    respect to your use of the platform and the services
                                                                    provided via the platform and supersede any and all
                                                                    representations, communications and prior agreements
                                                                    (written or oral) made by you or us.
                                                                </li>{' '}
                                                                <li>
                                                                    Credit Report may exercise any of its rights under
                                                                    these terms and conditions by itself or through any
                                                                    company or other legal entity which is under the
                                                                    control or ownership of Credit Report.
                                                                </li>{' '}
                                                                <li>
                                                                    Any notice of other communication given to a party
                                                                    under or in connection with these terms and
                                                                    conditions shall be in writing, addressed to that
                                                                    party at its registered office (if it is a company
                                                                    or LLP), its principal place of business or address
                                                                    provided in writing and shall be delivered
                                                                    personally, by pre-paid first-class post or e-mail.
                                                                    The notice shall be deemed to have been received, if
                                                                    sent by post at 9.00am on the second business day
                                                                    after posting and if sent by e-mail, one business
                                                                    day after transmission.
                                                                </li>{' '}
                                                                <li>
                                                                    Nothing in these terms and conditions is intended
                                                                    to, or shall be deemed to, establish any partnership
                                                                    or joint venture between the parties, nor constitute
                                                                    either party the agent of the other party for any
                                                                    purpose.
                                                                </li>{' '}
                                                                <li>
                                                                    A person who is not party to these terms and
                                                                    conditions shall not have any rights to enforce its
                                                                    terms.
                                                                </li>{' '}
                                                                <li>
                                                                    These terms and conditions and any dispute or claim
                                                                    arising out of or in connection with it or its
                                                                    subject matter or formation (including
                                                                    non-contractual disputes or claims) shall be
                                                                    governed by and construed in accordance with the
                                                                    laws of England and Wales.
                                                                </li>{' '}
                                                                <li>
                                                                    Each party irrevocably agrees that the courts of
                                                                    England and Wales shall have exclusive jurisdiction
                                                                    over any dispute or claim that arises out of, or in
                                                                    connection with this agreement or its subject matter
                                                                    or formation (including non-contractual disputes or
                                                                    claims). Nothing in this clause shall limit the
                                                                    right of the Agent (in its own right or as agent for
                                                                    the lenders) to take proceedings against the
                                                                    borrower in any other court of competent
                                                                    jurisdiction, nor shall the taking of proceedings in
                                                                    any one or more jurisdictions preclude the taking of
                                                                    proceedings in any other jurisdictions, whether
                                                                    concurrently or not, to the extent permitted by the
                                                                    law of such other jurisdiction.
                                                                </li>
                                                            </ol>
                                                        </li>{' '}
                                                        <li class="title">
                                                            Contacting Us
                                                            <p>
                                                                If you have any questions about these Terms and
                                                                Conditions, or wish to contact us for any other reason,
                                                                you can contact us on{' '}
                                                                <a href="mailto:contactus@Credit Report.com">
                                                                    contactus@Credit Report.com
                                                                </a>{' '}
                                                                or 0203 858 7269.
                                                            </p>
                                                        </li>
                                                    </ol>{' '}
                                                    <p></p>{' '}
                                                    
                                                    
                                                    
                                                </div>
                                            </div>
                                            <CustomInput type="checkbox" className="mt-2" id="exampleCustomCheckbox" label="I have read & accept Terms & Conditions" />
                                        </Col>
                                        <Col sm={12} xl={12} className="mt-2">
                                            Please sign inside the below box:
                                        </Col>
                                        <Col sm={12} xl={12}>
                                            <ReactSignatureCanvas
                                                penColor="#5C71F8"
                                                canvasProps={{
                                                    width: '500',
                                                    height: 'auto',
                                                    className: 'signature',
                                                    backgroundColor: 'white',
                                                }}
                                            />
                                        </Col>
                                        <Col xl={4}>
                                            <div className="btn btn-primary mt-2">Submit</div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    {/* charts */}
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
