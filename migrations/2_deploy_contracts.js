// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Delance = artifacts.require("./Delance.sol");

module.exports = function(deployer) {
  // deployer.deploy(SimpleStorage);

  // let accounts = await web3.eth.getAccounts();
  let freelancer = "0x99b390Adc2FD6f176cb476529A8E54BBe12984Ee";
  let deadline = 1200000000;
  let initialBalance = "" + 10;
  
  deployer.deploy(Delance, freelancer, deadline, {value: web3.utils.toWei(initialBalance, "ether")});
};
