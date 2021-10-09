import React, {memo} from "react";
import "./styles/home.css";

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3: this.props.web3,
            contract: this.props.contract,
            title: "",
            amount: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        console.log(this.state.title);
        console.log(this.state.amount);

        const current_address = await this.state.web3.currentProvider.selectedAddress;
        console.log(current_address);
        console.log(this.state.contract);

        const title = this.state.title;
        const amount = parseInt(this.state.amount);
        // const freelancer = await this.state.contract.methods.freelancer().call();
        // console.log( typeof freelancer );
        // const currentAddress = await this.state.web3.currentProvider.selectedAddress;

        console.log('calling create request function');

        try {
            await this.state.contract.methods.createRequest(title, amount).send({from: current_address});
        }
        catch(error){
            console.log(error);
        }
        
    }

    render() {
        return (
            <div>
                <div className="gradient1">
                    <h1> New Request </h1>
                    <h2> Create your new request </h2>
                </div>

                {/* check this: https://www.w3schools.com/react/react_forms.asp */}
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <label> Title:
                        <input 
                            type="text"
                            name="title"
                            placeholder="enter job title"
                            value={this.state.title}
                            onChange={(event) => this.setState({title: event.target.value})}
                            
                        />
                    </label>
                    
                    <label> Amount:
                        <input 
                            type="text"
                            name="amount"
                            placeholder="Enter amount:"
                            value={this.state.amount}
                            onChange={(event) => this.setState({amount: event.target.value})}
                        />
                    </label>

                    <input type="submit" value="Submit" />

                </form>

            </div>
        );
    }

    async didComponentMount(){

    }
};

export default memo(Requests);