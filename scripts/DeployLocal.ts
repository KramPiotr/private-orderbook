import chalk from "chalk";
import hre from "hardhat";

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