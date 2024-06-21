async function main() {
    const hre = require("hardhat");
    const MyContract = await hre.ethers.getContractFactory("MyContract");
    console.log("MyContract: ", MyContract);
    
   

    console.log("Deploying contract...");
    const myContract = await MyContract.deploy();
    

    // Correctly wait for the contract to be deployed
    await myContract.waitForDeployment();
    console.log(`MyContract deployed to: ${myContract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});