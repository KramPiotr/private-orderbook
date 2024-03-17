import chalk from "chalk";
import hre from "hardhat";
import { FHERC20, OrderBook } from "../types";

async function main() {
  const { fhenixjs, ethers } = hre;
  const [signer] = await ethers.getSigners();

  //   const tokenAddress = "0xAf17c42d8a3A8aC4a1743B047655BA2fffb9A1a9";
  //  const tokenAddress = "0x731f33D92812FD38a1Fbe38Bcf73fd87129d5087";

  //  const tokenAddress = "0xbeb4eF1fcEa618C6ca38e3828B00f8D481EC2CC2";
  //  const tokenAddress = "0x5c93e3B7824035B375E373FaC1578D4089dcE77A";

  const tokenAddresses = [
    "0xbeb4eF1fcEa618C6ca38e3828B00f8D481EC2CC2",
    "0x5c93e3B7824035B375E373FaC1578D4089dcE77A",
  ];

  if ((await ethers.provider.getBalance(signer.address)).toString() === "0") {
    if (hre.network.name === "localfhenix") {
      await fhenixjs.getFunds(signer.address);
    } else {
      console.log(
        chalk.red(
          "Please fund your account with testnet FHE from https://faucet.fhenix.zone"
        )
      );
      return;
    }
  }

  const fherc20Factory = await hre.ethers.getContractFactory("FHERC20");

  for (const tokenAddress of tokenAddresses) {
    const tokenContract = (await fherc20Factory.attach(
      tokenAddress
    )) as FHERC20;

    const mintTx = await tokenContract.mint(signer, ethers.parseUnits("1"));
    await mintTx.wait();
  }
  console.log("Minting completed");

//   console.log("Mint result " + JSON.stringify(mintTx, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
