## Error code list

In order to conserve gas usage and code size, ERD contracts return numbered errors. Use this guide when making calls to the protocol to verify any potential error codes. Alternatively, you can also check specific error code in the <code>Errors.sol</code>

### Reference Guide
All error codes returned as <b>string</b>:

| ERROR CODE (string) | ORIGINATOR | ERROR DESCRIPTION |
| :-: | :-: | :-:|
|1|BorrowerOperations|Trove is activated|
|2|BorrowerOperations|Debt increase requires non-zero debtChange|
|3|BorrowerOperations|Repayment amount should not be larger than total Trove debt|
|4|BorrowerOperations|Operation is not permitted during Recovery Mode|
|5|BorrowerOperations|Length is zero|
|6|BorrowerOperations|ETH is not activated or paused|
|7|BorrowerOperations|Collateral is not activated or suspended|
|8|BorrowerOperations|The amount of collateral is 0|
|9|BorrowerOperations|ETH is not activated|
|10|BorrowerOperations|Collateral is not activated or suspended|
|11|BorrowerOperations|Overlapping collateral transaction request|
|12|BorrowerOperations|Duplicate collateral transaction request|
|13|BorrowerOperations|Collateral cannot be withdrawn or added|
|14|BorrowerOperations|Collateral or debt change must occur when adjusting Trove|
|15|BorrowerOperations|Trove does not exist or has already been closed|
|16|BorrowerOperations|Collateral withdrawals are not permitted during Recovery Mode|
|17|BorrowerOperations|Decreasing Trove's ICR is not permitted during Recovery Mode|
|18|BorrowerOperations|An operation that results in ICR < MCR is not permitted|
|19|BorrowerOperations|Operation should make Trove ICR >= CCR|
|20|BorrowerOperations|An operation that results in TCR < CCR is not permitted|
|21|BorrowerOperations|Trove's net debt must be greater than minimum debt requirement|
|22|BorrowerOperations|Insufficient USDE for repayment|
|23|BorrowerOperations|Maximum fee percentage must be set less than or equal to 100%|
|24|BorrowerOperations|Maximum fee percentage should be set between 0.25% and 100%|
|-|-|-|
|30|CollateralManager|Collateral has been previously deposited|
|31|CollateralManager|Collateral is suspended for open Trove or debt creation transactions|
|32|CollateralManager|Need at least one supported collateral type|
|33|CollateralManager|Unsupported collateral type|
|34|CollateralManager|Collateral Ratio must be less than 100%|
|35|CollateralManager|Operation cannot be performed with inactivated collateral|
|-|-|-|
|40|CollSurplusPool|No collateral available to claim|
|-|-|-|
|50|EToken|Invalid transfer amount|
|-|-|-|
|60|SortedTroves|Size must be greater than zero|
|61|SortedTroves|List is full|
|62|SortedTroves|List already includes this node|
|63|SortedTroves|ID input can not be zero|
|64|SortedTroves|ICR must be a positive number|
|65|SortedTroves|List does not include the ID|
|-|-|-|
|70|StabilityPool|USDE loss < 1|
|71|StabilityPool|P == 0|
|72|StabilityPool|Trove withdrawals not permitted when ICR < MCR|
|73|StabilityPool|SP deposits must be greater than 0|
|74|StabilityPool|Existing SP deposits must be equal to zero|
|75|StabilityPool|Deposit amount must be greater than zero|
|76|StabilityPool|Must have an active Trove to claim SP rewards|
|77|StabilityPool|Must have collateral rewards|
|78|StabilityPool|This operational address has already been registered|
|79|StabilityPool|Provided address must null or previously registered|
|80|StabilityPool|Kickback rate must be a value between [0,1]|
|-|-|-|
|81|TroveDebt|Increase/decrease in debt value must be a number other than 0|
|-|-|-|
|82|TroveManager|Excessive Borrowing rate|
|83|TroveManager|Excessive Borrowing index|
|84|TroveManager|There must be at least one active Trove on record|
|85|TroveManager|New Base Rate must be > 0|
|86|TroveManager|Service fee must be lower than total collateral value|
|87|TroveManager|Trove does not exist or has been previously closed|
|-|-|-|
|88|TroveManagerRedemptions|Redemption not allowed|
|89|TroveManagerRedemptions|Redemption amount must be less than or equal to $USDE balance|
|90|TroveManagerRedemptions|Amount must be greater than 0|
|91|TroveManagerRedemptions|Cannot redeem when TCR < MCR|
|92|TroveManagerRedemptions|Redemptions not allowed during recovery mode|
|-|-|-|
|100|Common Error|Invalid contract entry|
|101|Common Error|Protocol suspended|
|102|Common Error|Mismatched input length|
|103|Common Error|Failed ETH transaction|
|200|Common Error|Failed permission. Caller must be ActivePool|
|201|Common Error|Failed permission. Caller must be BorrowerOperations|
|202|Common Error|Failed permission. Caller must be CollateralManager|
|203|Common Error|Failed permission. Caller must be StabilityPool|
|204|Common Error|Failed permission. Caller must be TroveManager|
|205|Common Error|Failed permission. Caller must be TroveManagerLiquidations|
|206|Common Error|Failed permission. Caller must be TroveManagerRedemptions|
|207|Common Error|Failed permission. Caller must be either TroveManagerLiquidations or TroveManagerRedemptions|
|208|Common Error|Failed permission. Caller must be either BorrowerOperations or TroveManager|
|209|Common Error|Failed permission. Caller must be either BorrowerOperations, TroveManagerLiquidations, or TroveManagerRedemptions|
|210|Common Error|Failed permission. Caller must be either BorrowerOperations or TroveManagerRedemptions|
|211|Common Error|Failed permission. Caller must be either BorrowerOperations, Trove Manager, StabilityPool, TMR, or TML|
