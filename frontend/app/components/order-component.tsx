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

export function OrderComponent() {
  const [baseToken, setBaseToken] = useState<any>(tokens[0]);
  const [tradeToken, setTradeToken] = useState<any>(tokens[1]);
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
                    Buy and sell assets on the market
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
                  <Input id="quantity" placeholder="0.0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" placeholder="0.0000" />
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
                  // bg={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random background color
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
