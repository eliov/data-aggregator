export interface Transaction {
    id: string;
    userId: string;
    createdAt: string;
    type: 'earned' | 'spent' | 'payout';
    amount: number;
  }
  
  export interface TransactionApiResponse {
    items: Transaction[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  }