export default {
    abi: [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "BO_BadMaxFee",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_CannotDecreaseICRInRM",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_CollAmountZero",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_CollNotActive",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_CollNotActiveOrNotSupported",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_CollsCannotContainWETH",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_CollsCannotWithdrawalInRM",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_CollsDuplicate",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_CollsOverlap",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_DebtIncreaseZero",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_ETHNotActive",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_ExceedMarketCap",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_ICRLessThanCCR",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_ICRLessThanMCR",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_LengthZero",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_MaxFeeExceed100",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_MustChangeForCollOrDebt",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_NotPermitInRM",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_TCRLessThanCCR",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_TroveDebtLessThanMinDebt",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_TroveIsActive",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_TroveNotExistOrClosed",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "BO_USDEInsufficient",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Caller_NotBorrowerOrSP",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Caller_NotCM",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Caller_NotSP",
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
          "name": "ProtocolPaused",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ZeroValue",
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
              "name": "_newMarketCap",
              "type": "uint256"
            }
          ],
          "name": "MarketCapChanged",
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
              "indexed": true,
              "internalType": "address",
              "name": "_referrer",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "address",
              "name": "_referee",
              "type": "address"
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
              "name": "_amounts",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_compositeDebt",
              "type": "uint256"
            }
          ],
          "name": "Referrer",
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
              "name": "_USDEFee",
              "type": "uint256"
            }
          ],
          "name": "USDEBorrowingFeePaid",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_usdeTokenAddress",
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
              "name": "_USDEChange",
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_marketCap",
              "type": "uint256"
            }
          ],
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "marketCap",
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
              "name": "_USDEAmount",
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
              "internalType": "address",
              "name": "_referrer",
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
              "name": "_USDEAmount",
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
          "name": "repayUSDE",
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
              "name": "_usdeTokenAddress",
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
              "name": "_marketCap",
              "type": "uint256"
            }
          ],
          "name": "setMarketCap",
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
              "internalType": "bool",
              "name": "_val",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "updateUSDEGas",
          "outputs": [],
          "stateMutability": "nonpayable",
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
              "name": "_USDEAmount",
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
          "name": "withdrawUSDE",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
    addr: '0x27433b79EeC5350162b116F8f18016624de1471A'
}
