import { Module } from '@nestjs/common';
import { AggregationService } from './aggregation.service';
import { AggregationController } from './aggregation.controller';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TransactionModule],
  controllers: [AggregationController],
  providers: [AggregationService],
})
export class AggregationModule {}