import React from "react";
// import DalanceContract from "./contracts/Delance.json";
// import getWeb3 from "./getWeb3";
import "./Home.css";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {address: '', deadline: ''};

        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAddressChange(event){
        this.setState({address: event.target.value});
    }

    handleDeadlineChange(event){
        this.setState({'deadline': event.target.value});
    }
    
    async handleSubmit(event){
        event.preventDefault();
        event.persist();
        console.log('submit button clicked');
        console.log('address input:'  + this.state.address);
        console.log('date input:', this.state.deadline);
        // alert('kuch bhi1');

        const balance = await this.props.web3.eth.getBalance(this.props.contract._address);
        // const balance = 1;
        console.log(balance);
        const ineth = await this.props.web3.utils.fromWei(balance, 'ether');
        console.log(ineth);

        
    }

    render() {
        return (
            <div>
                {/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_topnav_right */}
                <ul className="topnav">
                    <li><a className="active" href="#delance">Delance</a></li>
                    <li><a className="" href="#projects">Projects</a></li>
                    <li className="right"><a href="#account">Current Account: {this.props.web3.currentProvider.selectedAddress}</a></li>
                </ul>

                <div className="gradient1">
                    <h1> New Request </h1>
                    <h2> Create your new contract </h2>
                </div>

                {/* action: what to do on submitting the form
                target: where to open result, current window, new window etc
                for: link label for with input id to specify which label belong to which input
                name: data field name when form is sent, like name column in database
                placeholder: hint text 
                */}
               
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <label> Freelancer Address: 
                        <input 
                            type="text"
                            name="address"
                            placeholder="Enter Freelancer Address:" 
                            value={this.state.address} 
                            onChange={this.handleAddressChange} 
                            required    
                        />
                    </label>
                    

                    <label className="date"> Deadline:
                        <input 
                            type="date"
                            name="deadline"
                            value={this.state.deadline} 
                            onChange={this.handleDeadlineChange}
                        />
                    </label>
                    
                    <input type="submit" value="Submit" />
                    {/* <input type="reset"> </input> */}
                </form>
            </div>
        );
    }
}

export default HomePage;