import React, {Component, memo} from "react";
import {Link, withRouter} from "react-router-dom";
import "./styles/navbar.css";

class Navigation extends Component{
    render() {
        return (
            <nav className="">
                {/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_topnav_right */}
                <ul className="topnav">
                    <li><Link to="/"> Home </Link></li>
                    <li><Link to="/requests"> Requests </Link></li>
                    <li><Link to="/details"> Details </Link></li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(memo(Navigation));