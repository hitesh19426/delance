import React, {memo} from "react";
import "./styles/home.css";

class Home extends React.Component {
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

        const balance = await this.props.web3.eth.getBalance(this.props.contract._address);
        console.log(balance);
        const ineth = await this.props.web3.utils.fromWei(balance, 'ether');
        console.log(ineth);
    }
    
    render() {
        return (
            <div >
                <div className="gradient1">
                    <h1> New Project </h1>
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
                    
                </form>
            </div>
        );
    }
};

export default memo(Home);