import React, { Component } from 'react';
import { CENTER_LAYOUT_PAGE_URLS } from "../constants/layout";

/**
 * Renders the Footer
 */
class Footer extends Component {

    render() {
        const footerCss = CENTER_LAYOUT_PAGE_URLS.includes(this.props.match.url) ? "footer left-footer" : "footer";
        return (
            <footer className={footerCss}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            2020 &copy; Micro-Lending. All Rights Reserved. 
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;