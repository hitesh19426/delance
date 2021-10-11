import React, {memo} from "react";
import "./styles/home.css";

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", amount: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // FIXME: error on submitting form
    async handleSubmit(event) {
        event.preventDefault();

        const current_address = await this.props.web3.currentProvider.selectedAddress;
        console.log(current_address);

        console.log(this.state.title);
        console.log(this.state.amount);
        const title = this.state.title;
        const amount = parseInt(this.state.amount);
        
        console.log('calling create request function');
        try {
            await this.props.contract.methods.createRequest(title, amount).send({from: current_address});
            console.log('succesfully executed create request function');
            alert('succesfully executed create request function');
        }
        catch(error){
            console.log(error);
            alert('error occured. try again or check account or parameters');
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
};

export default memo(Requests);