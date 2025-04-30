import { Injectable } from '@nestjs/common';
import { TransactionApiResponse, Transaction } from './transaction.types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MockTransactionApiService {
  private generateMockTransactions(
    startDate: string,
    endDate: string,
    page: number,
    limit: number,
  ): TransactionApiResponse {
    const transactions: Transaction[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const userIds = ['074092', '074093', '074094'];
    const types: Transaction['type'][] = ['earned', 'spent', 'payout'];

    for (let i = 0; i < limit; i++) {
      const randomDate = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
      );
      transactions.push({
        id: uuidv4(),
        userId: userIds[Math.floor(Math.random() * userIds.length)],
        createdAt: randomDate.toISOString(),
        type: types[Math.floor(Math.random() * types.length)],
        amount: parseFloat((Math.random() * 100).toFixed(2)),
      });
    }

    return {
      items: transactions,
      meta: {
        totalItems: 1200,
        itemCount: transactions.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(1200 / limit),
        currentPage: page,
      },
    };
  }

  async getTransactions(
    startDate: string,
    endDate: string,
    page: number = 1,
    limit: number = 1000,
  ): Promise<TransactionApiResponse> {
    // Simulate API rate limit (5 requests per minute)
    await new Promise((resolve) => setTimeout(resolve, 200));
    return this.generateMockTransactions(startDate, endDate, page, limit);
  }
}
