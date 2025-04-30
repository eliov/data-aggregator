import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MockTransactionApiService } from './mock-transaction-api';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [TransactionController],
  providers: [TransactionService, MockTransactionApiService],
  exports: [TransactionService],
})
export class TransactionModule {}