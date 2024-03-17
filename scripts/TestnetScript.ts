import chalk from "chalk";
import { getPermit } from "fhenixjs";
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

const permit = await getPermit(orderBook.target, ethers.provider);
  fhenixjs.storePermit(permit); 

  const orderId = 1;
  const price = 3;
  const qty = 4;

  const encryptedOrderId = await fhenixjs.encrypt_uint8(orderId);
  const encryptedPrice = await fhenixjs.encrypt_uint8(price);
  const encryptedQty = await fhenixjs.encrypt_uint8(qty);

    // console.log("Encrypted price is " + JSON.stringify(encryptedPrice, null, 2));
    // console.log("Encrypted qty is " + JSON.stringify(encryptedQty, null, 2));

    const buyOrder = await orderBook.placeBuyOrder(encryptedOrderId, encryptedPrice, encryptedQty);
    await buyOrder.wait();

    // const doShift = await orderBook.shiftSellBook({gasLimit: 90_000_000});
    // await doShift.wait();

    const insertBuyOrder = await orderBook.insertBuyOrder(encryptedOrderId, encryptedPrice);
    await insertBuyOrder.wait();

    // const lastFills = await orderBookContract.lastFills();
    // const lastShiftBy = await orderBookContract.lastShiftBy();

    // const shiftByDecrypted = await fhenixjs.unseal(orderBookAddress, lastShiftBy.toString());

    // console.log(shiftByDecrypted);
    // console.log(JSON.stringify(buyOrder, null, 2));
    console.log("Placed order successfully!");
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})