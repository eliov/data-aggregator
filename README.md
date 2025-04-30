Data Aggregation Microservice
This is an MVP implementation of a data aggregation microservice built with NestJS. The service collects transactions from a transaction API, aggregates them by user, and exposes API endpoints to retrieve user balance information and aggregated payout requests. It is designed to handle millions of requests per day with data updates within a 2-minute delay, adhering to the transaction API's rate limits (5 requests per minute, 1000 transactions per request).
Features

Fetches transactions every minute from a mock transaction API.
Aggregates user data: balance, earned, spent, payout, and paid-out amounts.
Provides API endpoints to retrieve user aggregations and payout requests.
Uses an in-memory store (Map) for fast data access and aggregation.
Handles pagination and rate limits of the transaction API.
Assumes an exchange rate of 1 SCR = 1 EUR.

Prerequisites

Node.js (version 18 or higher)
npm (included with Node.js)
Git (for cloning the repository)

Getting Started
Follow these steps to set up and run the microservice locally:

Clone the RepositoryPull the code from the repository to your local machine:
git clone <repository-url>
cd data-aggregation-service


Set Up the ProjectEnsure you have a package.json file with the required dependencies (see below for reference). If you initialized a new NestJS project, replace the src/ folder with the project code.

Install DependenciesInstall the required Node.js packages:
npm install


Start the ApplicationRun the application in development mode:
npm run start

The service will start on http://localhost:3000.


API Endpoints
The microservice exposes the following API endpoints:

GET /aggregation/user/:userIdRetrieves aggregated data for a specific user.  

Sample: http://localhost:3000/aggregation/user/074092  
Returns: {
  "balance": 10.2,
  "earned": 50.5,
  "spent": 10.3,
  "payout": 30,
  "paidOut": 30
}

or{ "error": "User not found" }




GET /aggregation/payoutsRetrieves a list of aggregated payout requests across all users.  

Sample: http://localhost:3000/aggregation/payouts  
Returns: [
  { "userId": "074092", "payoutAmount": 30 },
  { "userId": "074093", "payoutAmount": 50 }
]





Project Structure
src/
├── app.module.ts
├── main.ts
├── transaction/
│   ├── mock-transaction-api.ts
│   ├── transaction.controller.ts
│   ├── transaction.module.ts
│   ├── transaction.service.ts
│   └── transaction.types.ts
├── aggregation/
│   ├── aggregation.controller.ts
│   ├── aggregation.module.ts
│   ├── aggregation.service.ts
│   └── aggregation.types.ts


Transactions Module: Handles fetching and storing transactions from the mock transaction API.
Aggregation Module: Aggregates transaction data and exposes API endpoints.
Mock Transaction API: Simulates the external transaction API with pagination and random data.

Notes

Transaction Fetching: The service fetches transactions every minute, staying within the 5 requests/minute limit (up to 5000 transactions per fetch).
Data Storage: Data is stored in memory using Map for fast access and aggregation. This is suitable for an MVP but should be replaced with a database (e.g., PostgreSQL or MongoDB) for production to handle large datasets and ensure persistence.
Mock API: The mock transaction API simulates real API behavior with pagination and random data for testing purposes.
Exchange Rate: The service assumes 1 SCR = 1 EUR, processing amounts as-is.
Data Freshness: Aggregations are recomputed on each request to ensure data is up-to-date with less than a 2-minute delay.
Scalability: For production, consider adding a caching layer (e.g., Redis) and a database to handle high request volumes and persistent storage.

Dependencies
The project relies on the following key dependencies (see package.json):
{
  "dependencies": {
    "@nestjs/common": "^9.0.0",
    "@nestjs/core": "^9.0.0",
    "@nestjs/platform-express": "^9.0.0",
    "@nestjs/schedule": "^3.0.0",
    "uuid": "^9.0.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.5.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^9.0.0",
    "@nestjs/schematics": "^9.0.0",
    "@types/node": "^18.0.0",
    "typescript": "^4.7.4"
  }
}

Troubleshooting

Error: "UserAggregation cannot be named": Ensure the UserAggregation interface is exported in aggregation.service.ts or moved to aggregation/types.ts with proper imports.
API Not Responding: Verify the service is running on port 3000 and there are no port conflicts.
No Transactions: The mock API generates random transactions. If no data appears, check the logs in the console for errors during transaction fetching.

Future Improvements
To enhance the microservice for production use, consider the following improvements, including the use of third-party tools for external data sources:

Database Integration with TypeORM: Replace the in-memory Map with a persistent database (e.g., PostgreSQL or MongoDB) using TypeORM. TypeORM provides an ORM layer to manage database schemas, perform queries, and handle transactions efficiently. This would enable persistent storage of transactions and aggregations, support for large datasets, and resilience across service restarts. For example, you could define entities for transactions and aggregations, use repositories for data access, and leverage TypeORM's query builder for complex aggregations.
Caching with Redis: Implement a caching layer using Redis to store frequently accessed aggregated data (e.g., user balances). Redis, an in-memory key-value store, can significantly reduce computation overhead by caching aggregation results and serving them directly for repeated requests. Use the @nestjs/cache-manager package with the Redis store to cache API responses, setting appropriate TTLs (e.g., 2 minutes) to maintain data freshness. This is particularly useful for handling millions of requests per day.
Incremental Aggregation: Optimize aggregation logic to process only new transactions incrementally, reducing computational load. Combine this with Redis to store intermediate aggregation states or TypeORM to query only recent transactions.
Authentication and Authorization: Add JWT-based authentication using a library like @nestjs/passport to secure API endpoints.
Error Handling and Retries: Implement retry logic for transaction API failures using a library like axios-retry or NestJS's built-in HTTP module with custom interceptors.
Monitoring and Logging: Integrate third-party tools like Prometheus for metrics and Winston or Pino for structured logging to monitor performance and debug issues in production.

For questions or contributions, please open an issue or submit a pull request in the repository.
