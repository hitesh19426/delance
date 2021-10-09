import React, { Component, memo } from "react";
import "./styles/details.css";


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: this.props.web3,
            contract: this.props.contract,
            address: "initial address",
            freelancer: "initial freelancer address",
            employer: "initial employer address",
            balance: "initial balance",
            etherBalance: "initial balance in eth",
            deadline: "initial deadline",
            requests: [],
        };
    }

    printRequests(){
        // return this.state.requests.map((request, index) => <p key={index}> {index},  {request[0]}, {request[1]}, {request[2] ? "True" : "False"}, {request[3]? "True" : "False"} </p>);
    }

    render() {
        return (
            <div>
                <div className="gradient1">
                    <h1> Project Details </h1>
                    <h4> Find this contract at: {this.state.address} </h4>
                    <h4> The remaining payment is: {this.state.etherBalance} eth </h4>
                    <h4> Status: _________ </h4>
                </div>

                <div className="card-holder">
                    <div className="card">
                        <p>Employer: {this.state.employer} </p>
                    </div>

                    <div className="card">
                        <p>FreeLancer: {this.state.freelancer} </p>
                    </div>

                    <div className="card">
                        <p>Price: {} </p>
                    </div>

                    <div className="card">
                        <p>Deadline: {this.state.deadline} </p>
                    </div>
                </div>

                <div>
                    <h2> Project Requests </h2>
                    {/* {this.printRequests} */}
                    {this.state.requests.map((request, index) => <p key={index}> {index},  {request[0]}, {request[1]}, {request[2] ? "True" : "False"}, {request[3]? "True" : "False"} </p>)}
                </div>

            </div>
        );
    }

    async componentDidMount(){
        console.log(this.state.contract);

        const addresslocal = this.state.contract._address;
        console.log(addresslocal);

        let accounts = await this.state.web3.eth.getAccounts();
        console.log(accounts);

        const employer = await this.state.contract.methods.employer().call();
        console.log(employer);
        
        const freelancer = await this.state.contract.methods.freelancer().call();
        console.log(freelancer);

        const balance = await this.state.web3.eth.getBalance(addresslocal);
        console.log(balance);
        const ineth = await this.state.web3.utils.fromWei(balance, 'ether');
        console.log(ineth);

        const deadline = await this.state.contract.methods.deadline().call();
        console.log(deadline);

        const requests = await this.state.contract.methods.getAllRequest().call();
        console.log(requests);

        // const freelancer = "freelancer address";
        // const employer = "employer address";
        // const balance = 1234567;
        // const ineth = 0.123;

        this.setState({address: addresslocal, freelancer: freelancer, employer: employer, balance: balance, etherBalance: ineth, deadline: deadline, requests: requests});
    }
}

export default memo(Details);