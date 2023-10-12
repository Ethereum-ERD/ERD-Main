export default {
    abi: [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newActivePoolAddress",
              "type": "address"
            }
          ],
          "name": "ActivePoolAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newBorrowerOperationsAddress",
              "type": "address"
            }
          ],
          "name": "BorrowerOperationsAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_account",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "_hasBalance",
              "type": "bool"
            }
          ],
          "name": "CollBalanceUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_collSurplusPoolAddress",
              "type": "address"
            }
          ],
          "name": "CollSurplusPoolAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newCollateralManagerAddress",
              "type": "address"
            }
          ],
          "name": "CollateralManagerAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "_account",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "_shares",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "_amounts",
              "type": "uint256[]"
            }
          ],
          "name": "CollateralSent",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "_amount",
              "type": "uint256[]"
            }
          ],
          "name": "CollateralSent",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "CollateralSent",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newCommunityIssuanceAddress",
              "type": "address"
            }
          ],
          "name": "CommunityIssuanceAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newDefaultPoolAddress",
              "type": "address"
            }
          ],
          "name": "DefaultPoolAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint8",
              "name": "version",
              "type": "uint8"
            }
          ],
          "name": "Initialized",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newLiquidityIncentiveAddress",
              "type": "address"
            }
          ],
          "name": "LiquidityIncentiveAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newPriceFeedAddress",
              "type": "address"
            }
          ],
          "name": "PriceFeedAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newSortedTrovesAddress",
              "type": "address"
            }
          ],
          "name": "SortedTrovesAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newStabilityPoolAddress",
              "type": "address"
            }
          ],
          "name": "StabilityPoolAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newTreasuryAddress",
              "type": "address"
            }
          ],
          "name": "TreasuryAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newTroveManagerAddress",
              "type": "address"
            }
          ],
          "name": "TroveManagerAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newTroveManagerRedemptionsAddress",
              "type": "address"
            }
          ],
          "name": "TroveManagerLiquidationsAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newTroveManagerLiquidationsAddress",
              "type": "address"
            }
          ],
          "name": "TroveManagerRedemptionsAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_newUSDETokenAddress",
              "type": "address"
            }
          ],
          "name": "USDETokenAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_wethAddress",
              "type": "address"
            }
          ],
          "name": "WETHAddressChanged",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "NAME",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_account",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "_amount",
              "type": "uint256[]"
            }
          ],
          "name": "accountSurplus",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "activePoolAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "borrowerOperationsAddress",
          "outputs": [
            {
              "internalType": "address",
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
              "internalType": "address",
              "name": "_account",
              "type": "address"
            }
          ],
          "name": "claimColl",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "collateralManager",
          "outputs": [
            {
              "internalType": "contract ICollateralManager",
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
              "internalType": "address",
              "name": "_account",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            }
          ],
          "name": "getCollateral",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            }
          ],
          "name": "getCollateralAmount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getTotalCollateral",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "total",
              "type": "uint256"
            },
            {
              "internalType": "address[]",
              "name": "collaterals",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_borrowerOperationsAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_collateralManagerAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_troveManagerAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_troveManagerLiquidationsAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_troveManagerRedemptionsAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_activePoolAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_wethAddress",
              "type": "address"
            }
          ],
          "name": "setAddresses",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "troveManagerAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "troveManagerLiquidationsAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "troveManagerRedemptionsAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "wethAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
    ],
    addr: '0xF9B45960310bB5f7436eCF644f7FCBbF65e8bb5d'
}
