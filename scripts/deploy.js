// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("Chainwhiz_Solver_NFT");
  const contract = await Contract.deploy("Bounty Hunters","https://gateway.pinata.cloud/ipfs/QmPMndMBVgLzs4taU9oE1FxfatNHGtssn8B5Dx5caTtqw7","Solve bounties from Web3 projects, get paid in crypto, and collect this cool NFT");

  await contract.deployed();

  console.log("NFT deployed to:", contract.address);
  // const txn = 
  await contract.mintCharacterNFT("0x25ccED8002Da0934b2FDfb52c98356EdeBBA00B9");
  // await contract.mintCharacterNFT(1,"0x25ccED8002Da0934b2FDfb52c98356EdeBBA00B9");

  // await txn.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
