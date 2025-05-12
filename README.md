

# 📊 Data Aggregation Microservice

This is an MVP implementation of a **data aggregation microservice** built with **NestJS**. The service collects transactions from a transaction API, aggregates them by user, and exposes API endpoints to retrieve user balance information and aggregated payout requests.

It is designed to:

* Handle **millions of requests per day**
* Update data within a **2-minute delay**
* Comply with the transaction API's rate limits (**5 requests/minute**, **1000 transactions/request**)

---

## 🚀 Features

* ⏱️ Fetches transactions every minute from a mock transaction API
* 📊 Aggregates user data: `balance`, `earned`, `spent`, `payout`, and `paidOut`
* 🌐 Provides API endpoints for user aggregations and payout requests
* ⚡ Uses an in-memory `Map` for fast data access and aggregation
* 📦 Handles pagination and respects API rate limits
* 💱 Assumes exchange rate of **1 SCR = 1 EUR**

---

## 🛠 Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher)
* npm (comes with Node.js)
* Git

---

## 🧰 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd data-aggregation-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm run start
```

The service will run on [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints

### 🔹 GET `/aggregation/user/:userId`

Retrieves aggregated data for a specific user.

**Example:**

```
GET http://localhost:3000/aggregation/user/074092
```

**Response:**

```json
{
  "balance": 10.2,
  "earned": 50.5,
  "spent": 10.3,
  "payout": 30,
  "paidOut": 30
}
```

**Error:**

```json
{ "error": "User not found" }
```

---

### 🔹 GET `/aggregation/payouts`

Retrieves a list of aggregated payout requests for all users.

**Example:**

```
GET http://localhost:3000/aggregation/payouts
```

**Response:**

```json
[
  { "userId": "074092", "payoutAmount": 30 },
  { "userId": "074093", "payoutAmount": 50 }
]
```

---

## 🧾 Project Structure

```
src/
├── app.module.ts
├── main.ts
├── transactions/
│   ├── mock-transaction-api.service.ts
│   ├── transactions.controller.ts
│   ├── transactions.module.ts
│   ├── transactions.service.ts
│   └── types.ts
├── aggregation/
│   ├── aggregation.controller.ts
│   ├── aggregation.module.ts
│   ├── aggregation.service.ts
│   └── types.ts
```

* **Transactions Module**: Fetches and stores transactions from the mock API.
* **Aggregation Module**: Aggregates data and exposes API endpoints.
* **Mock API**: Simulates external transaction API with pagination and random data.

---

## 📝 Notes

* ⏲️ **Transaction Fetching**: Up to 5000 transactions per minute.
* 🧠 **Data Storage**: In-memory `Map` (MVP) — replace with a DB for production.
* 🎲 **Mock API**: Simulates real-world API behavior.
* 💱 **Exchange Rate**: 1 SCR = 1 EUR.
* 🔁 **Data Freshness**: Recomputed on request (max 2-minute delay).
* 📈 **Scalability**: For production, use caching and persistent DB.

---

## 📦 Dependencies

Example `package.json` (partial):

```json
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
```

---

## 🧪 Troubleshooting

* **`UserAggregation cannot be named`**
  Ensure the `UserAggregation` interface is properly exported in `aggregation.service.ts` or moved to `aggregation/types.ts`.

* **API Not Responding**
  Make sure the app is running on port `3000` and there are no conflicts.

* **No Transactions**
  The mock API may generate empty data — check console logs for errors.

---

## 🔮 Future Improvements

* 🗃️ **Database Integration (e.g., PostgreSQL)** Replace the in-memory Map with a persistent database (e.g., PostgreSQL or MongoDB) using TypeORM. TypeORM provides an ORM layer to manage database schemas, perform queries, and handle transactions efficiently. This would enable persistent storage of transactions and aggregations, support for large datasets, and resilience across service restarts. For example, you could define entities for transactions and aggregations, use repositories for data access, and leverage TypeORM's query builder for complex aggregations.
* ⚡ **Redis Caching** Implement a caching layer using Redis to store frequently accessed aggregated data (e.g., user balances). Redis, an in-memory key-value store, can significantly reduce computation overhead by caching aggregation results and serving them directly for repeated requests. Use the @nestjs/cache-manager package with the Redis store to cache API responses, setting appropriate TTLs (e.g., 2 minutes) to maintain data freshness. This is particularly useful for handling millions of requests per day.
* 🔄 **Incremental Aggregation** Optimize aggregation logic to process only new transactions incrementally, reducing computational load. Combine this with Redis to store intermediate aggregation states or TypeORM to query only recent transactions.
* 🔐 **JWT Authentication** Add JWT-based authentication using a library like `@nestjs/passport` to secure API endpoints.
* 🔁 **Retry Logic** Implement retry logic for transaction API failures using a library like axios-retry or NestJS's built-in HTTP module with custom interceptors.
* 📊 **Monitoring & Logging** Integrate third-party tools like Prometheus for metrics and Winston or Pino for structured logging to monitor performance and debug issues in production.

---

Let me know if you'd like this exported as a Markdown file or want a badge/header/footer section added.
