// scripts/interact.js
const EfficiencyTokenArtifact = require('./contracts/EfficiencyToken.json');
const { ethers } = require("hardhat");

async function rewardBranch(contract, branchAddress) {
  const rewardTx = await contract.rewardBranch(branchAddress);
  await rewardTx.wait();
  console.log(`Rewarded branch: ${branchAddress}`);
}

async function convertToPoints(contract, tokenAmount) {
  const convertTx = await contract.convertToPoints(tokenAmount);
  await convertTx.wait();
  console.log(`Converted ${tokenAmount} tokens to points`);
}

async function redeemPoints(contract, points, reward) {
  const redeemTx = await contract.redeemPoints(points, reward);
  await redeemTx.wait();
  console.log(`Redeemed ${points} points for: ${reward}`);
}

async function getMaxSupply(contract) {
  const maxSupply = await contract.getMaxSupply();
  console.log(`Max Supply: ${maxSupply.toString()}`);
}

async function getPointsBalance(contract, address) {
  const pointsBalance = await contract.getPointsBalance(address);
  console.log(`Points Balance of ${address}: ${pointsBalance.toString()}`);
}

async function main() {
  // Replace with your contract's deployed address
  const contractAddress = "0xc2612F2c13e16C4494c8ef804053FCB6fbA11c42";
  
  // Replace with your contract's ABI
  const contractABI = EfficiencyTokenArtifact.abi;

  const [deployer] = await ethers.getSigners();

  console.log("Interacting with contracts with the account:", deployer.address);

  const efficiencyToken = new ethers.Contract(contractAddress, contractABI, deployer);

  // Example branch address and token amount for testing
  const branchAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const tokenAmount = ethers.parseUnits("1", 18); // 1 token
  const points = 10;
  const reward = "..";

  // Interact with the contract
  await rewardBranch(efficiencyToken, branchAddress);
  await convertToPoints(efficiencyToken, tokenAmount);
  await redeemPoints(efficiencyToken, points, reward);
  console.log(efficiencyToken);
 await efficiencyToken.getMaxSupply().then(res => console.log(res.toString()));
  console.log(maxSupply);
  
  await getPointsBalance(efficiencyToken, deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });