import React, { Component, memo } from "react";
import "./styles/details.css";

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contractAddress: "0x0000",
            freelancer: "0x0000",
            employer: "0x0000",
            balance: 0,
            etherBalance: 0,
            deadline: 0,
            status: "pending",
            requests: [],
        };
    }

    handleUnlockRequest(index){
        console.log('clicked unlock button', index);
    }

    handleWithdraw(index) {
        console.log('clicked withdraw button', index);
    }

    // TODO: Map the request list to buttons
    printRequest(request, index){
        return (
            <tr key={index} className="table-row">
                <td> {index} </td>
                <td> {request[0]} </td>
                <td> {request[1]} </td>
                <td> {request[2] ? "true" : "false"} </td>
                <td> {request[3] ? "true" : "false"} </td>
                <td><button id={index} onClick={(id) => console.log(id)}>Unlock</button></td>
                <td><button onClick={(key) => this.handleWithdraw(key)}>Withdraw</button></td>
            </tr>
        );
    }

    // TODO: Add buttons to unlock and withdraw payment.
    printRequests(){
        return (
            <table className="center">
                <caption> Requests </caption>
                <thead><tr>
                    <th> # </th>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Unlocked</th>
                    <th>Paid</th>
                    <th>Unlock</th>
                    <th>Withdraw</th>
                </tr></thead>

                <tbody>
                    {this.state.requests.map( (request, index) => this.printRequest(request, index))}
                </tbody>

            </table>
        );
    }

    printCard(cardName, property){
        return (
            <div className="card">
                <p>{cardName}: </p>
                <p>{property}</p>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div className="gradient1">
                    <h1> Project Details </h1>
                    <h4> Find this contract at: {this.state.contractAddress} </h4>
                    <h4> The remaining payment is: {this.state.balance} eth </h4>
                    <h4> Status: {this.state.status} </h4>
                </div>

                {/* TODO: Add printCard function to generalize printing card */}
                <div className="card-holder">
                    {this.printCard('Employer', this.state.employer)}
                    {this.printCard('Freelancer', this.state.freelancer)}
                    {this.printCard('Price', 10)}
                    {this.printCard('Deadline', this.state.deadline)}
                </div>

                <div>
                    {this.printRequests()}
                </div>
            </div>
        );
    }

    async componentDidMount(){
        console.log(this.props.contract);

        const contract_address_local = this.props.contract._address;
        console.log(contract_address_local);

        // maybe not needed
        let accounts = await this.props.web3.eth.getAccounts();
        console.log(accounts);

        const employer = await this.props.contract.methods.employer().call();
        console.log(employer);
        
        const freelancer = await this.props.contract.methods.freelancer().call();
        console.log(freelancer);

        const balance = await this.props.web3.eth.getBalance(contract_address_local);
        console.log(balance);
        const ineth = await this.props.web3.utils.fromWei(balance, 'ether');
        console.log(ineth);

        const deadline = await this.props.contract.methods.deadline().call();
        console.log(deadline);

        const requests = await this.props.contract.methods.getAllRequest().call();
        console.log(requests);

        this.setState({contractAddress: contract_address_local, freelancer: freelancer, employer: employer, balance: balance, etherBalance: ineth, deadline: deadline, requests: requests});
    }
}

export default memo(Details);