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
            "name": "BOOTSTRAP_PERIOD",
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
            "name": "BORROWING_FEE_FLOOR",
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
            "name": "CCR",
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "L_Coll",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "L_EUSDDebt",
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
            "name": "MAX_BORROWING_FEE",
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
            "name": "MCR",
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
            "name": "MINUTE_DECAY_FACTOR",
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
            "name": "MIN_NET_DEBT",
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
            "name": "RECOVERY_FEE",
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
            "name": "REDEMPTION_FEE_FLOOR",
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
            "name": "SECONDS_IN_ONE_MINUTE",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "TroveOwners",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "Troves",
            "outputs": [
                {
                    "internalType": "enum DataTypes.Status",
                    "name": "status",
                    "type": "uint8"
                },
                {
                    "internalType": "uint128",
                    "name": "arrayIndex",
                    "type": "uint128"
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "addTroveOwnerToArray",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
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
                }
            ],
            "name": "adjustIn",
            "outputs": [
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
                    "internalType": "address[]",
                    "name": "_collaterals",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "adjustOut",
            "outputs": [
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
                    "internalType": "address",
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "applyPendingRewards",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "baseRate",
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
                    "name": "_troveArray",
                    "type": "address[]"
                }
            ],
            "name": "batchLiquidateTroves",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "name": "calcDecayedBaseRate",
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
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "checkRecoveryMode",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "closeTrove",
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
                }
            ],
            "name": "closeTroveLiquidation",
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
                }
            ],
            "name": "closeTroveRedemption",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decayBaseRateFromBorrowing",
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
                    "name": "_collaterals",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "decreaseTroveColl",
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
                    "internalType": "uint256",
                    "name": "_debtDecrease",
                    "type": "uint256"
                }
            ],
            "name": "decreaseTroveDebt",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_EUSDDebt",
                    "type": "uint256"
                }
            ],
            "name": "getBorrowingFee",
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
            "name": "getBorrowingFeeFloor",
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
                    "internalType": "uint256",
                    "name": "_EUSDDebt",
                    "type": "uint256"
                }
            ],
            "name": "getBorrowingFeeWithDecay",
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
            "name": "getBorrowingRate",
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
            "name": "getBorrowingRateWithDecay",
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
            "name": "getCCR",
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
            "name": "getCollateralParams",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "oracle",
                            "type": "address"
                        },
                        {
                            "internalType": "enum DataTypes.CollStatus",
                            "name": "status",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct DataTypes.CollateralParams",
                    "name": "",
                    "type": "tuple"
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "getCurrentICR",
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
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "getCurrentTroveAmounts",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
            "name": "getDelayTime",
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
            "name": "getEUSDGasCompensation",
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
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "getEntireDebtAndColl",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
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
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
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
            "name": "getMCR",
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
            "name": "getMinNetDebt",
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
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "getPendingCollReward",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "getPendingEUSDDebtReward",
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
            "name": "getRecoveryFee",
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
            "name": "getRedemptionFeeFloor",
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
                    "internalType": "uint256",
                    "name": "_collDrawn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_collDrawns",
                    "type": "uint256[]"
                }
            ],
            "name": "getRedemptionFeeWithDecay",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
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
            "name": "getRedemptionRate",
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
            "name": "getRedemptionRateWithDecay",
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
                    "name": "_borrower",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_collateral",
                    "type": "address"
                }
            ],
            "name": "getRewardSnapshotColl",
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
                    "name": "_borrower",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_collateral",
                    "type": "address"
                }
            ],
            "name": "getRewardSnapshotEUSD",
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
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "getTCR",
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
            "name": "getTotalValue",
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
                    "name": "_borrower",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_collateral",
                    "type": "address"
                }
            ],
            "name": "getTroveColl",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "getTroveColl",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "getTroveDebt",
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
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "getTroveFromTroveOwnersArray",
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
            "name": "getTroveNormalizedDebt",
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
            "name": "getTroveOwnersCount",
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
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "getTroveStake",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
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
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_borrower",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_collateral",
                    "type": "address"
                }
            ],
            "name": "getTroveStake",
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
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "getTroveStatus",
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
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "hasPendingRewards",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
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
                    "name": "_collaterals",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "increaseTroveColl",
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
                    "internalType": "uint256",
                    "name": "_debtIncrease",
                    "type": "uint256"
                }
            ],
            "name": "increaseTroveDebt",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_troveDebtAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_interestRateAddress",
                    "type": "address"
                }
            ],
            "name": "initTrove",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "lastCollError_Redistribution",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "lastEUSDDebtError_Redistribution",
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
            "name": "lastFeeOperationTime",
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
                    "name": "_borrower",
                    "type": "address"
                }
            ],
            "name": "liquidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_n",
                    "type": "uint256"
                }
            ],
            "name": "liquidateTroves",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IActivePool",
                    "name": "_activePool",
                    "type": "address"
                },
                {
                    "internalType": "contract IDefaultPool",
                    "name": "_defaultPool",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_EUSD",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_collAmounts",
                    "type": "uint256[]"
                }
            ],
            "name": "movePendingTroveRewardsToActivePool",
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
                    "name": "_EUSDAmount",
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
                }
            ],
            "name": "redeemCollateral",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IActivePool",
                    "name": "_activePool",
                    "type": "address"
                },
                {
                    "internalType": "contract IDefaultPool",
                    "name": "_defaultPool",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_debt",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "_collaterals",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_colls",
                    "type": "uint256[]"
                }
            ],
            "name": "redistributeDebtAndColl",
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
                }
            ],
            "name": "removeStake",
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
                    "name": "_collateralManagerAddress",
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
                    "internalType": "uint256",
                    "name": "_period",
                    "type": "uint256"
                }
            ],
            "name": "setBootstrapPeriod",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_borrowingFloor",
                    "type": "uint256"
                }
            ],
            "name": "setBorrowingFeeFloor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_ccr",
                    "type": "uint256"
                }
            ],
            "name": "setCCR",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_gas",
                    "type": "uint256"
                }
            ],
            "name": "setGasCompensation",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_mcr",
                    "type": "uint256"
                }
            ],
            "name": "setMCR",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_maxBorrowingFee",
                    "type": "uint256"
                }
            ],
            "name": "setMaxBorrowingFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_minDebt",
                    "type": "uint256"
                }
            ],
            "name": "setMinDebt",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_redemptionFloor",
                    "type": "uint256"
                }
            ],
            "name": "setRecoveryFee",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_redemptionFloor",
                    "type": "uint256"
                }
            ],
            "name": "setRedemptionFeeFloor",
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
                    "internalType": "uint256",
                    "name": "_num",
                    "type": "uint256"
                }
            ],
            "name": "setTroveStatus",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "totalCollateralSnapshot",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "totalStakes",
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
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "totalStakesSnapshot",
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
            "name": "troveData",
            "outputs": [
                {
                    "internalType": "uint128",
                    "name": "liquidityIndex",
                    "type": "uint128"
                },
                {
                    "internalType": "uint128",
                    "name": "borrowIndex",
                    "type": "uint128"
                },
                {
                    "internalType": "uint128",
                    "name": "currentLiquidityRate",
                    "type": "uint128"
                },
                {
                    "internalType": "uint128",
                    "name": "currentBorrowRate",
                    "type": "uint128"
                },
                {
                    "internalType": "uint40",
                    "name": "lastUpdateTimestamp",
                    "type": "uint40"
                },
                {
                    "internalType": "address",
                    "name": "troveManagerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "troveDebtAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "interestRateAddress",
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
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "newBaseRate",
                    "type": "uint256"
                }
            ],
            "name": "updateBaseRate",
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
                }
            ],
            "name": "updateStakeAndTotalStakes",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract IActivePool",
                    "name": "_activePool",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "_collaterals",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_collRemainder",
                    "type": "uint256[]"
                }
            ],
            "name": "updateSystemSnapshots_excludeCollRemainder",
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
                    "name": "_collaterals",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "_amounts",
                    "type": "uint256[]"
                }
            ],
            "name": "updateTroveCollTMR",
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
                }
            ],
            "name": "updateTroveRewardSnapshots",
            "outputs": [],
            "stateMutability": "nonpayable",
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
        }
    ],
    addr: '0x40Df0b82834a91617033Ad1FF92251CA5b09D521'
}
