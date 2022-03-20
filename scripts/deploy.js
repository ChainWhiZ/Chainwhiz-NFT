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
  // const BountyHunterContract = await hre.ethers.getContractFactory(
  //   "Chainwhiz_Solver_NFT"
  // );
  // const bountyhuntercontract = await BountyHunterContract.deploy(
  //   "Bounty Hunters",
  //   "https://gateway.pinata.cloud/ipfs/QmPMndMBVgLzs4taU9oE1FxfatNHGtssn8B5Dx5caTtqw7"
  // );

  // await bountyhuntercontract.deployed();
  // console.log(
  //   "Chainwhiz Bounty Hunters NFT deployed to:",
  //   bountyhuntercontract.address
  // );

  const BountyPosterContract = await hre.ethers.getContractFactory(
    "Chainwhiz_Poster_NFT"
  );
  const bountypostercontract = await BountyPosterContract.deploy(
    "Bounty Poster",
    "https://gateway.pinata.cloud/ipfs/QmZ8KqE4omJsZfvnNaUKxWyZDwmuxJGz3yZiuetLVSSqgA"
  );

  await bountypostercontract.deployed();

  console.log(
    "Chainwhiz Bounty Poster NFT deployed to:",
    bountypostercontract.address
  );

  const ChainwhizFollowers = await hre.ethers.getContractFactory(
    "Chainwhiz_200_Followers_NFT"
  );
  const chainwhizFollowers = await ChainwhizFollowers.deploy(
    "Chainwhiz Followers",
    "https://gateway.pinata.cloud/ipfs/QmSBfECD3LvBLdWT73AMXjnQfyr9euRZh6wiwfRDAzf4QC"
  );

  await chainwhizFollowers.deployed();

  console.log(
    "Chainwhiz Followers NFT deployed to:",
    chainwhizFollowers.address
  );
  // const txn =
  // await bountyhuntercontract.mintCharacterNFT("0x25ccED8002Da0934b2FDfb52c98356EdeBBA00B9");
  // await contract.mintCharacterNFT(1,"0x25ccED8002Da0934b2FDfb52c98356EdeBBA00B9");

  // await txn.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
