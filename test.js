const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const SpacePunkTokenABI = require("./space_punk_token");

const provider = new HDWalletProvider(
  "tortoise uphold assume theme daring unfold cheese erode margin picnic heavy coach",
  // remember to change this to your own phrase!
  "https://mainnet.infura.io/v3/6d91b4f97959471fb5046ce94d105475"
  //"https://goerli.infura.io/v3/6d91b4f97959471fb5046ce94d105475"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);  //this is the web3 object for direct use 
//before use add the node provider with appropriate network(ex infura and main-net in this example)

const contract = new web3.eth.Contract(
  SpacePunkTokenABI.a,
  "0x45DB714f24f5A313569c41683047f1d49e78Ba07"
);

const walletAddress = "0x0bc1ca13a06f6D13F0b67ce451379C9468CD5e4f";

const balance = async (address) => {
  //const accounts = await web3.eth.getAccounts();
  //console.log("first Account is:", accounts[0]);
  contract.defaultAccount = address;
  const bal = await contract.methods.balanceOf(address).call();
  console.log("Balance: ",bal);

  for (let i = 0; i < bal; i++) {
    const tokenId = await contract.methods
      .tokenOfOwnerByIndex(walletAddress, i)
      .call();
      
    console.log(tokenId);
    let tokenMetaDataUri = await contract.methods.tokenURI(tokenId).call();
    //console.log(tokenMetaDataUri);

    if (tokenMetaDataUri.startsWith("ipfs://")) {
      tokenMetaDataUri = `https://ipfs.io/ipfs/${
        tokenMetaDataUri.split("ipfs://")[1]
      }`;
    }

    const tokenMetaData = await fetch(tokenMetaDataUri).then((response) =>
      response.json()
    );
    console.log(tokenMetaData);
  }
};
balance(walletAddress);
//0xf69aBBFD84e6D2D1eeF78f6dA8cbF09B67a210b0

provider.engine.stop();
