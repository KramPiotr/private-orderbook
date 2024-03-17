import { ethers } from "ethers";
import { OrderBook, OrderBook__factory } from "../types";
import * as dotenv from "dotenv";
dotenv.config();

function setupProvider() {}

async function main() {
  console.log("Deploying Order Book Contract");
  const provider = setupProvider();
  const privateKey = process.env.PRIVATE_KEY_0 ?? "";
  const wallet = new ethers.Wallet(privateKey, provider); //ethers.Wallet.fromPhrase() for mnemonic
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  const subId = Number(process.env.VRF_SUBSCRIPTION_ID);
  const coordinator = process.env.VRF_COORDINATOR ?? "";
  const keyHash = process.env.VRF_KEY_HASH ?? "";
  const requiredReviewers = 1;

  const orderbookFactory = new Review__factory(wallet);
  const orderBookContract = (await orderbookFactory.deploy(
    "MIT License",
    1000,
    subId,
    coordinator,
    keyHash,
    requiredReviewers
  )) as Review;
  await orderBookContract.waitForDeployment();
  const orderBookContractAddress = await orderBookContract.getAddress();
  console.log(
    `Review contract deployed to the address ${orderBookContractAddress}`
  );

  const author = process.env.WALLET_ADDRESS_0 ?? "";
  await orderBookContract.addAuthor(author);
  await orderBookContract.addReviewer(author);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
