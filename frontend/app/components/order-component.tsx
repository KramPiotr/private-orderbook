"use client";
import Link from "next/link";
// import { Button } from "@/app/components/ui/button";
import { CardHeader, CardContent, Card } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TokenSelector } from "./token-selector";
import { tokens } from "@/lib/tokens";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { FhenixClient } from "fhenixjs";
import { ethers } from "ethers";
import { useEthersSigner } from "@/lib/ethers";
import { orderbookABI } from "@/abi/orderbookABI";

const ORDERBOOK_ADDRESS = "0xAf17c42d8a3A8aC4a1743B047655BA2fffb9A1a9";
const A_TOKEN_ADDRESS = "0x731f33D92812FD38a1Fbe38Bcf73fd87129d5087";
const B_TOKEN_ADDRESS = "0xbDdA27903B576F424E22D6c72E222F673a32b439";


export function OrderComponent() {
  const [baseToken, setBaseToken] = useState<any>(tokens[0]);
  const [tradeToken, setTradeToken] = useState<any>(tokens[1]);
  const [price, setPrice] = useState<string>('0');
  const [qty, setQty] = useState<string>('0');

  const provider = new ethers.BrowserProvider(window.ethereum);
  const fhenix = new FhenixClient({ provider });
  const signer: any = useEthersSigner();

  async function buy() {
    const numPrice = Math.round(Number(price)); //In the future multiply by 10^x and then round, currently price and qty need to be uint8 because of computational complexity
    const numQty = Math.round(Number(qty));

    if (numPrice == 0 || numQty == 0) {
      console.error("Price or qty are invalid");
      return;
    }

    console.log("Price is " + numPrice);
    console.log("Qty is " + numQty);

    const encryptedPrice = await fhenix.encrypt_uint8(numPrice);
    const encryptedQty = await fhenix.encrypt_uint8(numQty);

    console.log("Encrypted price is " + JSON.stringify(encryptedPrice, null, 2));
    console.log("Encrypted qty is " + JSON.stringify(encryptedQty, null, 2));

    const OrderBookContract = {
      contract: new ethers.Contract(
        ORDERBOOK_ADDRESS,
        orderbookABI,
        signer as any
      ),
      address: ORDERBOOK_ADDRESS
    };

    const buyOrder = await OrderBookContract.contract.placeBuyOrder(encryptedPrice, encryptedQty);
    buyOrder.wait();
  }

  async function sell() {
    const numPrice = Math.round(Number(price)); //In the future multiply by 10^x and then round, currently price and qty need to be uint8 because of computational complexity
    const numQty = Math.round(Number(qty));

    if (numPrice == 0 || numQty == 0) {
      console.error("Price or qty are invalid");
      return;
    }

    console.log("Price is " + numPrice);
    console.log("Qty is " + numQty);

    const encryptedPrice = await fhenix.encrypt_uint8(numPrice);
    const encryptedQty = await fhenix.encrypt_uint8(numQty);

    console.log("Encrypted price is " + JSON.stringify(encryptedPrice, null, 2));
    console.log("Encrypted qty is " + JSON.stringify(encryptedQty, null, 2));

    const OrderBookContract = {
      contract: new ethers.Contract(
        ORDERBOOK_ADDRESS,
        orderbookABI,
        signer as any
      ),
      address: ORDERBOOK_ADDRESS
    };

    const sellOrder = await OrderBookContract.contract.placeSellOrder(encryptedPrice, encryptedQty);
    sellOrder.wait();
  }
  return (
    <div>
      <div>
        <div className="px-4 space-y-4">
          <div className="space-y-2">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Place an Order</h1>
            </div>
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="space-y-1">
                  <h2 className="text-base font-semibold tracking-wider uppercase">
                    Order Form
                  </h2>
                  <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    Buy and sell assets privately
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="trading-pair">Base Token</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <TokenSelector
                        selectedToken={baseToken}
                        onSelectToken={setBaseToken}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>tokens</DialogTitle>
                        <DialogDescription>tokens</DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trading-pair">Traded Token</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <TokenSelector
                        selectedToken={tradeToken}
                        onSelectToken={setTradeToken}
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>tokens</DialogTitle>
                        <DialogDescription>tokens</DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" value={price} onChange={(e) => toNumber(e, setPrice)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" value={qty} onChange={(e) => toNumber(e, setQty)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order-type">Order Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label
                        className="flex items-center space-x-2 cursor-pointer"
                        htmlFor="market"
                      >
                        <Input
                          id="market"
                          name="order-type"
                          type="radio"
                          value="market"
                        />
                        <span>Market</span>
                      </Label>
                    </div>
                    <div>
                      <Label
                        className="flex items-center space-x-2 cursor-pointer"
                        htmlFor="limit"
                      >
                        <Input
                          id="limit"
                          name="order-type"
                          type="radio"
                          value="limit"
                        />
                        <span>Limit</span>
                      </Label>
                    </div>
                    <div>
                      <Label
                        className="flex items-center space-x-2 cursor-pointer"
                        htmlFor="stop-limit"
                      >
                        <Input
                          id="stop-limit"
                          name="order-type"
                          type="radio"
                          value="stop-limit"
                        />
                        <span>Stop Limit</span>
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                {/* <Button>Place Order</Button> */}
                <Button
                  mt={2}
                  px={6}
                  py={4}
                  fontSize="lg"
                  rounded="lg"
                  _hover={{ bg: "black" }}
                  transition="colors 300ms ease-in-out"
                  bg="green.700"
                  color="white"
                  width="200px"
                  onClick={buy}
                >
                  Buy
                </Button>
                <Button
                  mt={2}
                  px={6}
                  py={4}
                  fontSize="lg"
                  rounded="lg"
                  _hover={{ bg: "black" }}
                  transition="colors 300ms ease-in-out"
                  bg="red.600"
                  color="white"
                  width="200px"
                  onClick={sell}
                >
                  Sell
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function toNumber(e: any, setVal: any) {
  const stringVal = e.target.value;
  let numberVal = Number(stringVal);
  if (!isNaN(numberVal) && numberVal >= 0) {
    setVal(stringVal);
  }
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
