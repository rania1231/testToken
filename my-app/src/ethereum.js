/*import Web3 from 'web3';
import MyContractArtifact from './contracts/MyContract.json';

// Connect to local Ethereum node
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Replace with the address of your deployed contract
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const MyContract = new web3.eth.Contract(MyContractArtifact.abi, contractAddress);

export async function setCID(cid, fromAddress) {
  await MyContract.methods.setCID(cid).send({ from: fromAddress });
}

export async function getCID() {
  return await MyContract.methods.getCID().call();
}*/


import Web3 from 'web3';
import MyContractArtifact from './contracts/MyContract.json';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const contractAddress = '0x845606c98d69DAb8cA6626CAAd4282B3fc7A01e3'; 
const MyContract = new web3.eth.Contract(MyContractArtifact.abi, contractAddress);

export async function setCID(cid, fromAddress) {
  await MyContract.methods.setCID(cid).send({ from: fromAddress });
  await console.log("MyContract.storedCID",await MyContract.storedCID);
}

export async function getCID() {
  
  return await MyContract.methods.getCID().call();
}
