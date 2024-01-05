# NestJS Leaderboard API - Made By Gabriel Fialho

## Overview

This system implements a NestJS-based API for managing leaderboards in a gaming context. It exposes two main endpoints:

1. **GET /matches/:match_id/leaderboard/top**: Returns the top 50 users in the leaderboard for a specified match, including their scores and positions.

2. **GET /matches/:match_id/leaderboard/:user_id**: Returns the position and score of the given user, along with surrounding users (5 users with scores above and 5 users with scores below).

### API Documentation

API documentation is available using Swagger at http://localhost:3000/docs after starting the system.

### Docker Compose

The system utilizes Docker Compose with services for NestJS (nest-api), PostgreSQL (postgres), and Redis (redis). Configuration variables are loaded from the .env.local file

### Dockerfile

The Dockerfile used for building the NestJS Leaderboard API is designed with multi-stage builds. It has two main stages:

Build Stage (FROM node:18 as build): This stage is responsible for setting up the build environment, installing dependencies, generating Prisma clients, and building the NestJS application.

```dockerfile
FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN rm -rf .env
RUN npx prisma generate
RUN npm run build
```

Production Stage (FROM node:18-slim): This stage is optimized for production, resulting in a smaller and more secure image. It installs only necessary production dependencies, copies the built application, and sets the appropriate environment variables.

```dockerfile
FROM node:18-slim
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env.local .env.local
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/package-lock.json .
RUN npm install --omit=dev
COPY --chown=node:node --from=build /usr/src/app/node_modules/.prisma/client  ./node_modules/.prisma/client

ENV NODE_ENV production
EXPOSE 3000
CMD ["dumb-init", "node", "dist/src/main"]
```

This multi-stage Dockerfile ensures a clean, minimal, and secure production image, minimizing its attack surface and optimizing resource usage.

### Caching

Responses from the API are cached using the @nestjs/cache module in combination with the cache-manager-redis-store which allows the application to use Redis as the caching store.
In the system, the CacheInterceptor from @nestjs/cache-manager is used to automatically cache the responses for specific endpoints. Additionally, a cache time-to-live (TTL) of 20 seconds is set, ensuring that the cached data remains valid for a specified duration.

### Request Throttling

The system implements request throttling using the ThrottlerModule from NestJS. The ThrottlerModule configuration in main.ts is set to limit clients to a maximum of 10 requests per minute.

```typescript
ThrottlerModule.forRoot([
  {
    ttl: 60000,  // Time-to-live (in milliseconds) for the rate limit window (1 minute)
    limit: 100,   // Maximum number of requests allowed within the rate limit window
  },
]),
```

This ensures that each client is restricted to making up to 100 requests within a 1-minute window. If a client exceeds this limit, subsequent requests will be denied until the rate limit window resets.

### Response Formatting Interceptor

The ResponseFormatter is a NestJS interceptor that is designed to format all responses in a standardized way. It intercepts the response stream and transforms the data before it is sent back to the client.

#### How It Works

Interception Point: The intercept method is invoked before the actual response is sent to the client. It takes the current execution context (ExecutionContext) and the next call handler (CallHandler) as parameters.

- Formatting Response: The interceptor uses the map operator to transform the response data. It wraps the actual data in a standardized format that includes a resultCode and the original response.

- resultCode: A numeric code indicating the result of the operation. In this case, 1 typically signifies a successful operation.

- response: The original data returned by the controller.

#### Benefits

Standardized Response Format: By using this interceptor, every successful response from the API will follow a consistent structure. This makes it easier for clients consuming the API to understand and handle responses uniformly.

Code Reusability: The interceptor promotes code reusability by centralizing the response formatting logic. Instead of duplicating this logic across multiple controllers, it's encapsulated in a single interceptor.

### Exception Formatting Filter

The ExceptionFormatter is a NestJS exception filter that captures and formats exceptions thrown during request processing.

#### How It Works

Interception Point: The catch method is invoked when an exception is thrown within the application. It takes the exception and the host (ArgumentsHost) as parameters.

Logging and Formatting: The filter logs the exception and then formats the error response to follow a standardized structure. It extracts error information such as status code, error message, and error code (if available).

- Response: The formatted error response is sent back to the client with an appropriate HTTP status code.

- resultCode: A numeric code indicating an error. In this case, 0 signifies an error.

- error: The error message extracted from the exception or a default "Unknown Error" message.

- errorCode: Additional error code information, if available.

#### Benefits

Standardized Error Responses: All error responses follow a standardized format, making it easier for clients to handle errors consistently.

Logging: The filter logs exceptions, providing valuable information for debugging and monitoring purposes.

Graceful Error Handling: The API gracefully handles exceptions, ensuring that clients receive structured error responses even in unexpected scenarios.

### Database Connection

This system uses Prisma, which is a modern database toolkit that simplifies database access and management. It provides an abstraction layer over the database, enabling developers to interact with the database using a type-safe and auto-generated query builder. Prisma supports multiple databases, and it's particularly well-suited for use with TypeScript.

#### How Prisma is Used in the System:

Prisma Client: The system generates a Prisma client (PrismaClient) by extending it from the @prisma/client package. This client provides a set of auto-generated TypeScript methods for database operations based on the defined data model.

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

The onModuleInit method is used to connect to the database when the module initializes. This ensures that the Prisma client is ready to handle database queries.

The Prisma client is injected into various services in the application, such as MatchesService and LeaderboardService. These services use the Prisma client's methods to perform operations like querying, creating, updating, and deleting records in the database.

```typescript
// matches/matches.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, matches } from '@prisma/client';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  async match(
    matchesWhereUniqueInput: Prisma.matchesWhereUniqueInput,
  ): Promise<matches | null> {
    return this.prisma.matches.findUnique({
      where: matchesWhereUniqueInput,
    });
  }

  // Other database operations using the Prisma client...
}
```

#### Benefits of Using Prisma:

Type-Safe Queries: Prisma generates TypeScript types for the database schema, ensuring type safety when performing queries. This helps catch potential runtime errors during development.

Auto-Generated Methods: Prisma generates methods for CRUD (Create, Read, Update, Delete) operations based on the defined data model. Developers can use these methods directly, reducing the need to write manual SQL queries.

Database Migrations: Prisma supports database migrations, making it easy to evolve the database schema over time. Migrations are managed through the prisma migrate command.

Query Builder: Prisma provides a query builder for constructing complex queries using a fluent API, enhancing the readability of database queries.

##### ps: I left implemented some functions for leaderboard and matches that can be used in the future

### Testing

The NestJS Leaderboard API is thoroughly tested using Jest, a popular JavaScript testing framework. Jest is utilized for both integrational and unit tests, ensuring the reliability and correctness of the codebase.

To run tests locally, use the following command:

```bash
make test
```

This command will execute Jest and run the test suite, ensuring that the application functions as expected.

# Usage

### Running the System

To run the system, use the provided `Makefile` commands:

```bash
make build   # Build the Docker image
make run     # Start the containers, install dependencies, generate migrations, apply migrations, and seed the database
make test    # Run tests
```
