export interface UserAggregation {
  balance: number;
  earned: number;
  spent: number;
  payout: number;
  paidOut: number;
}

export interface PayoutRequest {
  userId: string;
  payoutAmount: number;
}