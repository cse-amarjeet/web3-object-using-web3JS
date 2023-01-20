const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const provider = new HDWalletProvider(
  "tortoise uphold assume theme daring unfold cheese erode margin picnic heavy coach",
  // remember to change this to your own phrase!
  "https://goerli.infura.io/v3/6d91b4f97959471fb5046ce94d105475"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);
};
deploy();
