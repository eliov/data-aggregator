import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { Transaction } from '../transaction/transaction.types';
import { UserAggregation, PayoutRequest } from './aggregation.types';

 
@Injectable()
export class AggregationService {
  private userAggregations = new Map<string, UserAggregation>();
  private payoutRequests = new Map<string, number>();

  constructor(private readonly transactionsService: TransactionService) {
    this.updateAggregations();
  }

  private updateAggregations() {
    const transactions = this.transactionsService.getTransactions();
    this.userAggregations.clear();
    this.payoutRequests.clear();

    transactions.forEach((transaction: Transaction) => {
      const { userId, type, amount } = transaction;

      // Initialize user aggregation if not exists
      if (!this.userAggregations.has(userId)) {
        this.userAggregations.set(userId, {
          balance: 0,
          earned: 0,
          spent: 0,
          payout: 0,
          paidOut: 0,
        });
      }

      const aggregation = this.userAggregations.get(userId)!;

      // Update aggregations based on transaction type
      switch (type) {
        case 'earned':
          aggregation.earned += amount;
          aggregation.balance += amount;
          break;
        case 'spent':
          aggregation.spent += amount;
          aggregation.balance -= amount;
          break;
        case 'payout':
          aggregation.payout += amount;
          aggregation.balance -= amount;
          aggregation.paidOut += amount; // Assuming payout is completed
          // Update payout requests
          this.payoutRequests.set(
            userId,
            (this.payoutRequests.get(userId) || 0) + amount,
          );
          break;
      }

      this.userAggregations.set(userId, aggregation);
    });
  }

  getUserAggregation(userId: string): UserAggregation | null {
    this.updateAggregations();
    return this.userAggregations.get(userId) || null;
  }

  getPayoutRequests(): PayoutRequest[] {
    this.updateAggregations();
    const requests: PayoutRequest[] = [];
    this.payoutRequests.forEach((payoutAmount, userId) => {
      requests.push({ userId, payoutAmount });
    });
    return requests;
  }
}
