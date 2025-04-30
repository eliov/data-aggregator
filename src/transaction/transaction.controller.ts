import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.types';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionService) {}

  @Get()
  getTransactions(): Transaction[] {
    return this.transactionsService.getTransactions();
  }
}