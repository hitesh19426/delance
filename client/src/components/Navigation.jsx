import React, {Component, memo} from "react";
import {Link, withRouter} from "react-router-dom";
import "./styles/navbar.css";

class Navigation extends Component{
    render() {
        return (
            <div>
                <nav className="">
                    {/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_topnav_right */}
                    <ul className="topnav">
                        <li><Link to={{pathname: "/", state:{} }}> Home </Link></li>
                        <li><Link to={{pathname: "/requests", state:{} }}> Requests </Link></li>
                        <li><Link to={{pathname: "/details", state:{} }}> Details </Link></li>
                        {/* <li><Link> Current Account: {this.props.web3} </Link></li> */}
                    </ul>
                </nav>
            </div>
            
        );
    }
}

export default withRouter(memo(Navigation));