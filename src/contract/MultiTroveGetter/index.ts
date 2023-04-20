export default {
    abi: [
        {
          "inputs": [
            {
              "internalType": "contract TroveManager",
              "name": "_troveManager",
              "type": "address"
            },
            {
              "internalType": "contract ISortedTroves",
              "name": "_sortedTroves",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "int256",
              "name": "_startIdx",
              "type": "int256"
            },
            {
              "internalType": "uint256",
              "name": "_count",
              "type": "uint256"
            }
          ],
          "name": "getMultipleSortedTroves",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "debt",
                  "type": "uint256"
                },
                {
                  "internalType": "address[]",
                  "name": "collaterals",
                  "type": "address[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "colls",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "shares",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "stakes",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "snapshotColls",
                  "type": "uint256[]"
                },
                {
                  "internalType": "uint256[]",
                  "name": "snapshotEUSDDebts",
                  "type": "uint256[]"
                }
              ],
              "internalType": "struct MultiTroveGetter.CombinedTroveData[]",
              "name": "_troves",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "sortedTroves",
          "outputs": [
            {
              "internalType": "contract ISortedTroves",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "troveManager",
          "outputs": [
            {
              "internalType": "contract TroveManager",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
    addr: '0x1440F1ED93861F780EF3678dD77010832e1DE490'
}