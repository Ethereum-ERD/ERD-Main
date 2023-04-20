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
                    "internalType": "uint256",
                    "name": "_baseRate",
                    "type": "uint256"
                }
            ],
            "name": "BaseRateUpdated",
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
                    "name": "_collateral",
                    "type": "address"
                }
            ],
            "name": "CollateralAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_collateralManagerAddress",
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
                    "name": "_collateral",
                    "type": "address"
                }
            ],
            "name": "CollateralRemoved",
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
                    "indexed": false,
                    "internalType": "address",
                    "name": "_newEUSDTokenAddress",
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
                    "internalType": "address",
                    "name": "_collateral",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_L_Coll",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_L_EUSDDebt",
                    "type": "uint256"
                }
            ],
            "name": "LTermsUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_lastFeeOpTime",
                    "type": "uint256"
                }
            ],
            "name": "LastFeeOpTimeUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_liquidatedDebt",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_liquidatedColls",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_collGasCompensations",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_EUSDGasCompensation",
                    "type": "uint256"
                }
            ],
            "name": "Liquidation",
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
                    "internalType": "uint256",
                    "name": "_attemptedEUSDAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_actualEUSDAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address[]",
                    "name": "_collaterals",
                    "type": "address[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_collSents",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_collFees",
                    "type": "uint256[]"
                }
            ],
            "name": "Redemption",
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
                    "internalType": "uint256[]",
                    "name": "_totalStakesSnapshot",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_totalCollateralSnapshot",
                    "type": "uint256[]"
                }
            ],
            "name": "SystemSnapshotsUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_collateral",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_newTotalStakes",
                    "type": "uint256"
                }
            ],
            "name": "TotalStakesUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_newTotalStakes",
                    "type": "uint256[]"
                }
            ],
            "name": "TotalStakesUpdated",
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
                    "indexed": false,
                    "internalType": "address",
                    "name": "_borrower",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "_newIndex",
                    "type": "uint256"
                }
            ],
            "name": "TroveIndexUpdated",
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
                    "name": "_collaterals",
                    "type": "address[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "_colls",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "enum DataTypes.TroveManagerOperation",
                    "name": "_operation",
                    "type": "uint8"
                }
            ],
            "name": "TroveLiquidated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_troveManagerAddress",
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
                    "name": "_troveManagerLiquidationsAddress",
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
                    "name": "_troveManagerRedemptionsAddress",
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
                    "internalType": "uint256",
                    "name": "_unix",
                    "type": "uint256"
                }
            ],
            "name": "TroveSnapshotsUpdated",
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
                    "internalType": "enum DataTypes.TroveManagerOperation",
                    "name": "_operation",
                    "type": "uint8"
                }
            ],
            "name": "TroveUpdated",
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
            "name": "BETA",
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
            "name": "getCollateralSupport",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_EUSDamount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_firstRedemptionHint",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_upperPartialRedemptionHint",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_lowerPartialRedemptionHint",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_partialRedemptionHintICR",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_maxIterations",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_maxFeePercentage",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_redeemer",
                    "type": "address"
                }
            ],
            "name": "redeemCollateral",
            "outputs": [],
            "stateMutability": "nonpayable",
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
                    "name": "_eusdTokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_sortedTrovesAddress",
                    "type": "address"
                },
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
                    "name": "_treasuryAddress",
                    "type": "address"
                }
            ],
            "name": "setAddresses",
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
            "inputs": [],
            "name": "stabilityPool",
            "outputs": [
                {
                    "internalType": "contract IStabilityPool",
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
        }
    ],
    addr: '0xfC4ED7269Ed4256c7F10d24377A161F9D2eF5050'
}
