export default {
    abi: [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "CM_BadValue",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "CM_CollExists",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "CM_CollNotActive",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "CM_CollNotPaused",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "CM_CollNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "CM_NoMoreColl",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Caller_NotBO",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Caller_NotBOOrTM",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Caller_NotTM",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Caller_NotTMR",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "LengthMismatch",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "NotContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "OwnershipCannotBeRenounced",
          "type": "error"
        },
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
              "name": "_collateral",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_E_Coll",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_E_USDEDebt",
              "type": "uint256"
            }
          ],
          "name": "ETermsUpdated",
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
              "name": "_USDEGasCompensation",
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
              "internalType": "uint256",
              "name": "_attemptedUSDEAmount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_actualUSDEAmount",
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
              "name": "_newUSDETokenAddress",
              "type": "address"
            }
          ],
          "name": "USDETokenAddressChanged",
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
          "name": "USDE_GAS_COMPENSATION",
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
          "inputs": [
            {
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            }
          ],
          "name": "activeCollateral",
          "outputs": [],
          "stateMutability": "nonpayable",
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
              "name": "_collateral",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_oracle",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_eTokenAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_ratio",
              "type": "uint256"
            }
          ],
          "name": "addCollateral",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256[]",
              "name": "_initialAmounts",
              "type": "uint256[]"
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
              "internalType": "address[]",
              "name": "_collsOut",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "_amountsOut",
              "type": "uint256[]"
            }
          ],
          "name": "adjustColls",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "newAmounts",
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
            },
            {
              "internalType": "uint256[]",
              "name": "_pendingRewards",
              "type": "uint256[]"
            }
          ],
          "name": "applyRewards",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
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
              "internalType": "address",
              "name": "_account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "burnEToken",
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
            }
          ],
          "stateMutability": "nonpayable",
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
              "internalType": "enum DataTypes.Status",
              "name": "closedStatus",
              "type": "uint8"
            }
          ],
          "name": "clearEToken",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            }
          ],
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
              "name": "",
              "type": "address"
            }
          ],
          "name": "collateralParams",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "ratio",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "eToken",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "oracle",
              "type": "address"
            },
            {
              "internalType": "enum DataTypes.CollStatus",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "index",
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
          "name": "collateralSupport",
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
          "name": "collateralsCount",
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
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_share",
              "type": "uint256"
            }
          ],
          "name": "getAmount",
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
              "name": "_shares",
              "type": "uint256[]"
            }
          ],
          "name": "getAmounts",
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
          "inputs": [],
          "name": "getBootstrapPeriod",
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
          "name": "getCollateralOracle",
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
          "name": "getCollateralOracles",
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
              "name": "_collateral",
              "type": "address"
            }
          ],
          "name": "getCollateralParams",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "ratio",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "eToken",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "oracle",
                  "type": "address"
                },
                {
                  "internalType": "enum DataTypes.CollStatus",
                  "name": "status",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "index",
                  "type": "uint256"
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
          "inputs": [
            {
              "internalType": "address",
              "name": "_borrower",
              "type": "address"
            }
          ],
          "name": "getCollateralShares",
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
          "name": "getCollateralsAmount",
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
          "name": "getEntireCollValue",
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "getEntireCollValue",
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
          "inputs": [],
          "name": "getFactor",
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
          "name": "getIndex",
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
          "name": "getIsActive",
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
              "name": "_collateral",
              "type": "address"
            }
          ],
          "name": "getIsSupport",
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
          "name": "getMaxBorrowingFee",
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
              "name": "_collateral",
              "type": "address"
            }
          ],
          "name": "getRatio",
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
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "getShare",
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
            }
          ],
          "name": "getShares",
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
          "name": "getTotalValue",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "totalValue",
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
          "name": "getTroveColls",
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
          "inputs": [],
          "name": "getUSDEGasCompensation",
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
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "getValue",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "totalValue",
              "type": "uint256"
            },
            {
              "internalType": "uint256[]",
              "name": "values",
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
              "internalType": "address",
              "name": "_account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "mintEToken",
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
            }
          ],
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
          "inputs": [
            {
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            }
          ],
          "name": "pauseCollateral",
          "outputs": [],
          "stateMutability": "nonpayable",
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
          "name": "priceUpdate",
          "outputs": [],
          "stateMutability": "nonpayable",
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
          "name": "removeCollateral",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
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
          "name": "resetEToken",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_activePoolAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_borrowerOperationsAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_defaultPoolAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_priceFeedAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_troveManagerAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_troveManagerRedemptionsAddress",
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
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_newIndex",
              "type": "uint256"
            }
          ],
          "name": "setCollateralPriority",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_eTokenAddress",
              "type": "address"
            }
          ],
          "name": "setEToken",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_factor",
              "type": "uint256"
            }
          ],
          "name": "setFactor",
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
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_oracle",
              "type": "address"
            }
          ],
          "name": "setOracle",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_collateral",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_ratio",
              "type": "uint256"
            }
          ],
          "name": "setRatio",
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
          "name": "usdeToken",
          "outputs": [
            {
              "internalType": "contract IUSDEToken",
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
        }
      ],
    addr: '0x025Cc3ba80Cb7D34c21ce0C1cBD78Cc64771A8B5'
}
