export const orderbookABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_tradeToken",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_baseToken",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "baseToken",
      "outputs": [
        {
          "internalType": "contract IFHERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct inEuint8",
          "name": "priceBytes",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct inEuint8",
          "name": "qtyBytes",
          "type": "tuple"
        }
      ],
      "name": "placeBuyOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tradeToken",
      "outputs": [
        {
          "internalType": "contract IFHERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];