import chalk from "chalk";
import hre from "hardhat";


/*
LOCAL

Base token address 0xbeb4eF1fcEa618C6ca38e3828B00f8D481EC2CC2
Trade token address 0x5c93e3B7824035B375E373FaC1578D4089dcE77A
OrderBook contract:  0xD30C778F7Fd47CCfB93Caa589195eb288FC768c8

TESTNET

Base token address 0xAf17c42d8a3A8aC4a1743B047655BA2fffb9A1a9
Trade token address 0x731f33D92812FD38a1Fbe38Bcf73fd87129d5087
OrderBook contract:  0xbDdA27903B576F424E22D6c72E222F673a32b439
*/

async function main() {

  const { fhenixjs, ethers } = hre;
  const { deploy } = hre.deployments;
  const [signer] = await ethers.getSigners();

  if ((await ethers.provider.getBalance(signer.address)).toString() === "0") {
    if (hre.network.name === "localfhenix") {
      await fhenixjs.getFunds(signer.address);
    } else {
        console.log(
            chalk.red("Please fund your account with testnet FHE from https://faucet.fhenix.zone"));
        return;
    }
  }

  const fherc20Factory = await hre.ethers.getContractFactory("FHERC20");

  const baseToken = await fherc20Factory.deploy("A_token", "A");
  await baseToken.waitForDeployment();

  console.log("Base token address " + baseToken.target);

  const tradeToken = await fherc20Factory.deploy("B_token", "B");
  await tradeToken.waitForDeployment();

  console.log("Trade token address " + tradeToken.target);

  const orderBookFactory = await hre.ethers.getContractFactory("OrderBook");

  const orderBook = await orderBookFactory.deploy(tradeToken.target, baseToken.target);
  await orderBook.waitForDeployment();

  console.log(`OrderBook contract: `, orderBook.target);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})