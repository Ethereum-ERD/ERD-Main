export const Errors: Record<string, string> = {
    "100": 'Invalid contract entry',
    "101": 'Protocol suspended',
    "102": 'Mismatched input length',
    "103": 'Failed ETH transaction',

    "200": 'Failed permission. Caller must be ActivePool',
    "201": 'Failed permission. Caller must be BorrowerOperations',
    "202": 'Failed permission. Caller must be CollateralManager',
    "203": 'Failed permission. Caller must be StabilityPool',
    "204": 'Failed permission. Caller must be TroveManager',
    "205": 'Failed permission. Caller must be TroveManagerLiquidations',
    "206": 'Failed permission. Caller must be TroveManagerRedemptions',
    "207": 'Failed permission. Caller must be either TroveManagerLiquidations or TroveManagerRedemptions',
    "208": 'Failed permission. Caller must be either BorrowerOperations or TroveManager',
    "209": 'Failed permission. Caller must be either BorrowerOperations, TroveManagerLiquidations, or TroveManagerRedemptions',
    "210": 'Failed permission. Caller must be either BorrowerOperations or TroveManagerRedemptions',
    "211": 'Failed permission. Caller must be either BorrowerOperations, Trove Manager, StabilityPool, TMR, or TML',

    "1": 'Trove is activated',
    "2": 'Debt increase requires non-zero debtChange',
    "3": "Repayment amount should not be larger than total Trove debt",
    "4": 'Operation is not permitted during Recovery Mode',
    "5": 'Length is zero',
    "6": 'ETH is not activated or paused',
    "7": 'Collateral is not activated or suspended',
    "8": 'The amount of collateral is 0',
    "9": 'ETH is not activated',
    "10": 'Collateral is not activated or suspended',
    "11": 'Overlapping collateral transaction request',
    "12": 'Duplicate collateral transaction request',
    "13": 'Collateral cannot be withdrawn or added',
    "14": 'Collateral or debt change must occur when adjusting Trove',
    "15": 'Trove does not exist or has already been closed',
    "16": 'Collateral withdrawals are not permitted during Recovery Mode',
    "17": "Decreasing Trove's ICR is not permitted during Recovery Mode",
    "18": 'An operation that results in ICR < MCR is not permitted',
    "19": 'Operation should make Trove ICR >= CCR',
    "20": 'An operation that results in TCR < CCR is not permitted',
    "21": "Trove's net debt must be greater than minimum debt requirement",
    "22": 'Insufficient USDE for repayment',
    "23": 'Maximum fee percentage must be set less than or equal to 100%',
    "24": 'Maximum fee percentage should be set between 0.25% and 100%',
    "30": 'Collateral has been previously deposited',
    "31": 'Collateral is suspended for open Trove or debt creation transactions',
    "32": 'Need at least one supported collateral type',
    "33": 'Unsupported collateral type',
    "34": 'Collateral Ratio must be less than 100%',

    "35": 'Operation cannot be performed with inactivated collateral',

    "40": 'No collateral available to claim',

    "50": "Invalid transfer amount",

    "60": "Size must be greater than zero",
    "61": 'List is full',
    "62": 'List already includes this node',
    "63": 'ID input cannot be zero',
    "64": 'ICR must be a positive number',
    "65": 'List does not include the ID',

    "70": 'USDE loss < 1',
    "71": 'P == 0',
    "72": 'Trove withdrawals not permitted when ICR < MCR',
    "73": 'SP deposits must be greater than 0',
    "74": 'Existing SP deposits must be equal to zero',
    "75": 'Deposit amount must be greater than zero',
    "76": "Must have an active Trove to claim SP rewards",
    "77": 'Must have collateral rewards',
    "78": 'This operational address has already been registered',
    "79": 'Provided address must null or previously registered',

    "80": 'Kickback rate must be a value between [0,1]',
    "81": 'Increase/decrease in debt value must be a number other than 0',
    "82": 'Excessive Borrowing rate',
    "83": 'Excessive Borrowing index',
    "84":  'There must be at least one active Trove on record',
    "85":  'New Base Rate must be > 0',
    "86":  'Service fee must be lower than total collateral value',
    "87":  'Trove does not exist or has been previously closed',
    "88": 'Redemption not allowed',
    "89": "Redemption amount must be less than or equal to $USDE balance",

    "90": 'Amount must be greater than 0',
    "91": 'Cannot redeem when TCR < MCR',
    "92": 'Redemptions not allowed during recovery mode',
};
