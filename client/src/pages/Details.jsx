import React, { PureComponent, memo } from "react";
import "./styles/details.css";

// TODO: Fix price and its functionality + use
class Details extends PureComponent {
    /* we are receiving web3 and contract as props and storing 
    all data as local states for UI. */
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

    // TODO: Add functionality to handleWithdraw and handleUnlockRequest
    // TODO: Add a function in smart contract to empty the requests array/reopen a request -- just for testing purposes.
    async handleWithdraw(index) {
        console.log('clicked withdraw button', index);
        
        const current_address = await this.props.web3.currentProvider.selectedAddress;
        const index_local = parseInt(index);
        console.log(current_address);

        try {
            console.log('calling withdraw function');
            await this.props.contract.methods.withdraw(index_local).send({from: current_address});
            alert('successfully withdraw payment for the request');

            const updatedRequests = await this.props.contract.methods.getAllRequest().call();
            console.log('successfully fetched updated requests');

            const contract_address_local = this.props.contract._address;
            const updatedBalance = await this.props.web3.eth.getBalance(contract_address_local);
            const ineth = await this.props.web3.utils.fromWei(updatedBalance, 'ether');
            this.setState({requests: updatedRequests, balance: updatedBalance, etherBalance: ineth});
            console.log('successfully updated state');
        }
        catch(error){
            alert('error occured. check log for more details.');
            console.log(error);
        }
    }

    async handleUnlockRequest(index) {
        console.log('clicked unlocked button', index);
        console.log(this.props.contract);

        const current_address = await this.props.web3.currentProvider.selectedAddress;
        const index_local = parseInt(index);
        console.log(current_address);

        try {
            console.log('calling unlock request function');
            await this.props.contract.methods.unlockRequest(index_local).send({from: current_address});
            alert('successfully unlocked request');
            
            const updatedRequests = await this.props.contract.methods.getAllRequest().call();
            console.log('successfully fetched updated array');
            this.setState({requests: updatedRequests});
        }
        catch(error){
            alert('error occured while processing. check log for more details');
            console.log(error);
        }
    }

    // TODO: Map the request list to buttons
    printRequest(request, index){
        // const buttonindex = index;
        return (
            <tr key={index} className="table-row">
                <td> {index} </td>
                <td> {request[0]} </td>
                <td> {request[1]} </td>
                <td> {request[2] ? "True" : "False"} </td>
                <td> {request[3] ? "True" : "False"} </td>
                <td><button  onClick={ () => this.handleUnlockRequest(index) }> Unlock </button></td>
                <td><button onClick={ () => this.handleWithdraw(index) }> Withdraw </button></td>
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
                    <th>Locked</th>
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
                    {/* TODO: Display deadline in proper format */}
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