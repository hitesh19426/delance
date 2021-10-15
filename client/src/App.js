import React, { Component, memo } from "react";
import DelanceContract from "./contracts/Delance.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Navigation} from "./components";
import {Home, Requests, Details} from "./pages";

class App extends Component {
  /* initial state of the app, storing web3, accounts and contracts */
  state = { web3: null, accounts: null, contract: null };

  /* componenetDidMount is a react function, it is called after render() and only once
  when the object renders first time. We use this to update the value of state variables
  from server (async) */
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DelanceContract.networks[networkId];
      const instance = new web3.eth.Contract(
        DelanceContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance });
    }
    catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  render() {
    // If web3 is not loaded, show if, otherwise return part.
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    {/* we are using router to build multi-route app like in flutter. <Navigation />
      renders a navbar to the screen, then render address and after that switch to actually
      allow switching between different routes. */}
    return (
      <div className="App">
        <Router >
          <Navigation />

          <div className="address">
            Current Address: {this.state.web3.currentProvider.selectedAddress}
          </div>

          <Switch>
            <Route exact path="/" component={() => <Home contract={this.state.contract} web3={this.state.web3}/>} />
            <Route exact path="/requests" component={() => <Requests contract={this.state.contract} web3={this.state.web3} />} />
            <Route exact path="/details" component={() => <Details contract={this.state.contract} web3={this.state.web3} />} />
          </Switch>

          {/* <Footer /> */}
        </Router>
      </div>
    );
  }
}

/* memo is used to improve rendering perfomance of the app. check w3schools */
export default memo(App);
