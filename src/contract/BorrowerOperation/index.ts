export default {
    abi: [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_activePoolAddress",
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
              "indexed": false,
              "internalType": "address",
              "name": "_defaultPoolAddress",
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
              "indexed": true,
              "internalType": "address",
              "name": "_borrower",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_EUSDFee",
              "type": "uint256"
            }
          ],
          "name": "EUSDBorrowingFeePaid",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_eusdTokenAddress",
              "type": "address"
            }
          ],
          "name": "EUSDTokenAddressChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_gasPoolAddress",
              "type": "address"
            }
          ],
          "name": "GasPoolAddressChanged",
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
          "inputs": [],
          "name": "Paused",
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
              "name": "_sortedTrovesAddress",
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
              "name": "_stabilityPoolAddress",
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
              "name": "_treasuryAddress",
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
              "indexed": true,
              "internalType": "address",
              "name": "_borrower",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "arrayIndex",
              "type": "uint256"
            }
          ],
          "name": "TroveCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_troveDebtAddress",
              "type": "address"
            }
          ],
          "name": "TroveDebtAddressChanged",
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
              "indexed": true,
              "internalType": "address",
              "name": "_borrower",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_debt",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "address[]",
              "name": "_colls",
              "type": "address[]"
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
            },
            {
              "indexed": false,
              "internalType": "enum IBorrowerOperations.BorrowerOperation",
              "name": "operation",
              "type": "uint8"
            }
          ],
          "name": "TroveUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [],
          "name": "Unpaused",
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
          "name": "DECIMAL_PRECISION",
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
          "name": "EUSD_GAS_COMPENSATION",
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
          "inputs": [],
          "name": "PERCENT_DIVISOR",
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
          "name": "WETH",
          "outputs": [
            {
              "internalType": "contract IWETH",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "_100pct",
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
              "internalType": "address[]",
              "name": "_collaterals",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "_amounts",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "_adjustArray",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "activePool",
          "outputs": [
            {
              "internalType": "contract IActivePool",
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
              "internalType": "address[]",
              "name": "_collsIn",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "_amountsIn",
              "type": "uint256[]"
            },
            {
              "internalType": "address",
              "name": "_upperHint",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lowerHint",
              "type": "address"
            }
          ],
          "name": "addColl",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "_collsIn",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "_amountsIn",
              "type": "uint256[]"
            },
            {
              "internalType": "address[]",
              "name": "_collsOut",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "_amountsOut",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256",
              "name": "_maxFeePercentage",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_EUSDChange",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "_isDebtIncrease",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "_upperHint",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lowerHint",
              "type": "address"
            }
          ],
          "name": "adjustTrove",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "claimCollateral",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "closeTrove",
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
          "inputs": [],
          "name": "defaultPool",
          "outputs": [
            {
              "internalType": "contract IDefaultPool",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "eusdToken",
          "outputs": [
            {
              "internalType": "contract IEUSDToken",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "gasPoolAddress",
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
              "internalType": "uint256",
              "name": "_debt",
              "type": "uint256"
            }
          ],
          "name": "getCompositeDebt",
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
          "name": "getEntireSystemColl",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "getEntireSystemColl",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            },
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
          "name": "getEntireSystemDebt",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "entireSystemDebt",
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
              "name": "_wethAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_treasuryAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_troveDebtAddress",
              "type": "address"
            }
          ],
          "name": "init",
          "outputs": [],
          "stateMutability": "nonpayable",
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
          "inputs": [
            {
              "internalType": "address",
              "name": "_borrower",
              "type": "address"
            },
            {
              "internalType": "address[]",
              "name": "_collsIn",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "_amountsIn",
              "type": "uint256[]"
            },
            {
              "internalType": "address",
              "name": "_upperHint",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lowerHint",
              "type": "address"
            }
          ],
          "name": "moveCollGainToTrove",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "_colls",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "_amounts",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256",
              "name": "_maxFeePercentage",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_EUSDAmount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_upperHint",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lowerHint",
              "type": "address"
            }
          ],
          "name": "openTrove",
          "outputs": [],
          "stateMutability": "payable",
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
          "name": "priceFeed",
          "outputs": [
            {
              "internalType": "contract IPriceFeed",
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
              "internalType": "uint256",
              "name": "_EUSDAmount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_upperHint",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lowerHint",
              "type": "address"
            }
          ],
          "name": "repayEUSD",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_troveManagerAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_collateralManagerAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_activePoolAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_defaultPoolAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_stabilityPoolAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_gasPoolAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_collSurplusPoolAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_priceFeedAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_sortedTrovesAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_eusdTokenAddress",
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
              "internalType": "bool",
              "name": "val",
              "type": "bool"
            }
          ],
          "name": "setPause",
          "outputs": [],
          "stateMutability": "nonpayable",
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
          "name": "treasuryAddress",
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
          "name": "troveDebt",
          "outputs": [
            {
              "internalType": "contract ITroveDebt",
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
              "internalType": "contract ITroveManager",
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
              "internalType": "address[]",
              "name": "_collsOut",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "_amountsOut",
              "type": "uint256[]"
            },
            {
              "internalType": "address",
              "name": "_upperHint",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lowerHint",
              "type": "address"
            }
          ],
          "name": "withdrawColl",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_EUSDAmount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_upperHint",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_lowerHint",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_maxFeePercentage",
              "type": "uint256"
            }
          ],
          "name": "withdrawEUSD",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
    addr: '0xa22913032940655d713ea5471e94330729dd675e'
}
