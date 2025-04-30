import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { AggregationModule } from './aggregation/aggregation.module';

@Module({
  imports: [TransactionModule, AggregationModule],
})
export class AppModule {}
