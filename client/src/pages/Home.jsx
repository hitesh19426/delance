import React, {memo} from "react";
import "./styles/home.css";

class Home extends React.Component {
    /* we are receiving web3 and contract as props and storing 
    address and deadline as local states. We are then binding handleSubmit to 
    this to make the form controlled (not sure why this is necessary but you 
    receive an error if you dont do this) */
    constructor(props) {
        super(props);
        this.state = {address: '', deadline: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* this function is used to manage home form. The form is controlled 
    (react handle the input of the form fields at every instance).
    
    The function does not do anything of significane right now. It just logs 
    some value to show it is working. */
    // TODO: add functionality to actually deploy contract from this function.
    async handleSubmit(event){
        event.preventDefault();

        console.log('address input:'  + this.state.address);
        console.log('date input:', this.state.deadline);

        const balance = await this.props.web3.eth.getBalance(this.props.contract._address);
        console.log(this.props.contract._address);
        console.log(balance);
        const ineth = await this.props.web3.utils.fromWei(balance, 'ether');
        console.log(ineth);

        try{
            alert('successfully submitted form. Check log for details');
        }
        catch(error){
            alert('error. please check details.');
        }
    }
    
    /* we are rendering the header and applying gradient to it. Then we render
    a controlled form to allow user to deploy form from the UI itself. 
    We are using arrow function with onChange to allow short code. 
    We do not need to bind the function and "this" this way. 
    */
    render() {
        return (
            <div >
                {/* TODO: Change div to header to avoid confusion between gradient and header. */}
                <div className="gradient1">
                    <h1> New Project </h1>
                    <h2> Create your new contract </h2>
                </div>

                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <label> Freelancer Address: 
                        <input 
                            type="text"
                            name="address"
                            placeholder="Enter Freelancer Address:" 
                            value={this.state.address}
                            onChange={ (event) => this.setState({address: event.target.value}) }
                            required    
                        />
                    </label>
                    
                    <label className="date"> Deadline:
                        <input 
                            type="date"
                            name="deadline"
                            value={this.state.deadline} 
                            onChange={ (event) => this.setState({deadline: event.target.value}) }
                        />
                    </label>
                    
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
};

export default memo(Home);