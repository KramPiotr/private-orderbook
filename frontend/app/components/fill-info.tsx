"use client";

import { CardHeader, CardContent, Card } from "@/app/components/ui/card";
import { useEthersSigner } from "@/lib/ethers";
import { ethers } from "ethers";
import { FhenixClient } from "fhenixjs";
import { useEffect, useState } from "react";
import { orderbookABI } from "@/abi/orderbookABI";
import { generatePermits } from "@/lib/permits";

const ORDERBOOK_ADDRESS = "0xa0F69bFA296A2eb65cF4fCC0cABfb265C0c8051a";
export function FillInfo() {
  const [lastFillQty, setLastFillQty] = useState<string>("-1");
  const [lastOrderId, setLastOrderId] = useState<string>("-1");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const fhenix = new FhenixClient({ provider });
  const signer: any = useEthersSigner();

  async function fetchLastFill() {
    const permit = await generatePermits(ORDERBOOK_ADDRESS, provider);
    fhenix.storePermit(permit);
    const permission = await fhenix!.extractPermitPermission(permit!);
    const OrderBookContract = {
      contract: new ethers.Contract(
        ORDERBOOK_ADDRESS,
        orderbookABI,
        signer as any
      ),
      address: ORDERBOOK_ADDRESS,
    };

    const eLastFillQty =
      await OrderBookContract.contract.getMostCompetitiveFillQty(permission);
    const lastFillQty = fhenix.unseal(ORDERBOOK_ADDRESS, eLastFillQty);

    const eLastOrderId =
      await OrderBookContract.contract.getMostCompetitiveFillQty(permission);
    const lastOrderId = fhenix.unseal(ORDERBOOK_ADDRESS, eLastOrderId);

    setLastFillQty(String(lastFillQty));
    setLastOrderId(String(lastOrderId));
  }

  useEffect(() => {
    fetchLastFill();
  }, []);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="p-4">
        <h2 className="text-lg font-bold">Most Competitive</h2>
        <p className="text-sm font-medium leading-none text-gray-500">
          Fill Quantity and Order ID
        </p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="text-base font-bold">Fill Quantity</h3>
          <p className="text-base font-medium">{lastFillQty}</p>
        </div>
        <div className="space-y-2 pt-3">
          <h3 className="text-base font-bold">Order ID</h3>
          <p className="text-base font-medium">{lastOrderId}</p>
        </div>
      </CardContent>
    </Card>
  );
}
