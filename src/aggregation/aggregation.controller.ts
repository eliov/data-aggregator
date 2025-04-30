import { Controller, Get, Param } from '@nestjs/common';
import { AggregationService } from './aggregation.service';

@Controller('aggregation')
export class AggregationController {
  constructor(private readonly aggregationService: AggregationService) {}

  @Get('user/:userId')
  getUserAggregation(@Param('userId') userId: string) {
    const aggregation = this.aggregationService.getUserAggregation(userId);
    return aggregation || { error: 'User not found' };
  }

  @Get('payouts')
  getPayoutRequests() {
    return this.aggregationService.getPayoutRequests();
  }
}