export default {
    abi: [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "Caller_NotBO",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Caller_NotBOOrTMR",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "Caller_NotTM",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "NotContract",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ST_ListContainsNode",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ST_ListFull",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ST_ListNotContainsNode",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ST_SizeZero",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ST_ZeroAddress",
          "type": "error"
        },
        {
          "inputs": [],
          "name": "ST_ZeroICR",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_borrowerOperationsAddress",
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
              "name": "_id",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "_NICR",
              "type": "uint256"
            }
          ],
          "name": "NodeAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "_id",
              "type": "address"
            }
          ],
          "name": "NodeRemoved",
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
              "name": "_sortedDoublyLLAddress",
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
              "name": "_troveManagerRedemptionsAddress",
              "type": "address"
            }
          ],
          "name": "TroveManagerRedemptionsAddressChanged",
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
              "name": "_id",
              "type": "address"
            }
          ],
          "name": "contains",
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
          "name": "data",
          "outputs": [
            {
              "internalType": "address",
              "name": "head",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "tail",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "maxSize",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "size",
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
              "name": "_ICR",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_prevId",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_nextId",
              "type": "address"
            }
          ],
          "name": "findInsertPosition",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            },
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
          "name": "getFirst",
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
              "name": "_id",
              "type": "address"
            }
          ],
          "name": "getICR",
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
          "name": "getLast",
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
          "name": "getMaxSize",
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
              "name": "_id",
              "type": "address"
            }
          ],
          "name": "getNext",
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
              "name": "_id",
              "type": "address"
            }
          ],
          "name": "getPrev",
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
          "name": "getSize",
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
          "name": "initialize",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_id",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_ICR",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_prevId",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_nextId",
              "type": "address"
            }
          ],
          "name": "insert",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "isEmpty",
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
          "name": "isFull",
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
              "name": "_id",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_newICR",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_prevId",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_nextId",
              "type": "address"
            }
          ],
          "name": "reInsert",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_id",
              "type": "address"
            }
          ],
          "name": "remove",
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
              "internalType": "uint256",
              "name": "_size",
              "type": "uint256"
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
              "name": "_borrowerOperationsAddress",
              "type": "address"
            }
          ],
          "name": "setParams",
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
              "internalType": "uint256",
              "name": "_ICR",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_prevId",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_nextId",
              "type": "address"
            }
          ],
          "name": "validInsertPosition",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
    addr: '0x7E56482fa89600cFb991082aEF6E31d32dE18F5C'
}
