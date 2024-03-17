import { ethers } from "ethers";
import { OrderBook, OrderBook__factory } from "../types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const { fhenixjs, ethers } = hre;
  const [signer] = await ethers.getSigners();

//  const orderBookAddress = "0xAf17c42d8a3A8aC4a1743B047655BA2fffb9A1a9"; //TESTNET

 const orderBookAddress = "0xD30C778F7Fd47CCfB93Caa589195eb288FC768c8"; //LOCAL

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

  const orderBookFactory = await hre.ethers.getContractFactory("OrderBook");
  const orderBookContract = (await orderBookFactory.attach(
    orderBookAddress
  )) as OrderBook;

  const orderId = 1;
  const price = 3;
  const qty = 4;

  const encryptedOrderId = await fhenixjs.encrypt_uint8(orderId);
  const encryptedPrice = await fhenixjs.encrypt_uint8(price);
  const encryptedQty = await fhenixjs.encrypt_uint8(qty);

    // console.log("Encrypted price is " + JSON.stringify(encryptedPrice, null, 2));
    // console.log("Encrypted qty is " + JSON.stringify(encryptedQty, null, 2));

    const buyOrder = await orderBookContract.placeBuyOrder(encryptedOrderId, encryptedPrice, encryptedQty);
    await buyOrder.wait();

    // console.log(JSON.stringify(buyOrder, null, 2));
    console.log("Placed order successfully!");

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
