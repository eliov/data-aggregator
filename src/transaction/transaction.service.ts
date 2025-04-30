import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MockTransactionApiService } from './mock-transaction-api';
import { Transaction, TransactionApiResponse } from './transaction.types';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);
  private transactions: Transaction[] = [];
  private lastFetchTime: Date | null = null;

  constructor(private readonly mockTransactionApi: MockTransactionApiService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async fetchTransactions() {
    try {
      const now = new Date();
      const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);
      const startDate = this.lastFetchTime
        ? new Date(this.lastFetchTime.getTime() + 1)
        : twoMinutesAgo;
      const endDate = now;

      this.logger.log(
        `Fetching transactions from ${startDate.toISOString()} to ${endDate.toISOString()}`,
      );

      let page = 1;
      let hasMore = true;
      let fetchedTransactions: Transaction[] = [];

      // Fetch up to 5 pages (5000 transactions) within rate limit
      while (hasMore && page <= 5) {
        const response: TransactionApiResponse =
          await this.mockTransactionApi.getTransactions(
            startDate.toISOString(),
            endDate.toISOString(),
            page,
            1000,
          );

        fetchedTransactions = fetchedTransactions.concat(response.items);
        hasMore = page < response.meta.totalPages;
        page++;
      }

      this.transactions = this.transactions.concat(fetchedTransactions);
      this.lastFetchTime = now;
      this.logger.log(`Fetched ${fetchedTransactions.length} transactions`);
    } catch (error) {
      this.logger.error(`Failed to fetch transactions: ${error.message}`);
    }
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }
}
