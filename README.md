# NestJS GraphQL Boilerplate

A boilerplate for building scalable, maintainable, and efficient GraphQL APIs with NestJS.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Test](#test)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **NestJS** - A progressive Node.js framework for building efficient and scalable server-side applications.
- **GraphQL** - A query language for your API.
- **Prisma** - Next-generation ORM that can replace traditional ORMs like TypeORM.
- **Authentication** - Basic authentication setup with JWT.
- **Environment Configuration** - Manage configuration for multiple environments.


## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 18.x)
- npm (>= 6.x) or yarn (>= 1.x)
- PostgreSQL (or any other database you plan to use with Prisma)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/GustavoGomez092/nestjs-graphql-boilerplate.git
cd nestjs-graphql-boilerplate
```

2. Install dependencies:

```sh
npm install
# or
yarn install
```

3. Environment Variables

Make sure to set the following environment variables in your `.env` file:

| Variable              | Description                                                      | Example Value           |
|-----------------------|------------------------------------------------------------------|-------------------------|
| POSTGRES_USER         | The username for your PostgreSQL database                        | prisma                  |
| POSTGRES_PASSWORD     | The password for your PostgreSQL database                        | topsecret               |
| POSTGRES_DB           | The name of your PostgreSQL database                             | mydb                    |
| JWT_SECRET            | Secret key for signing JWT tokens                                | secret                  |
| JWT_REFRESH_SECRET    | Secret key for signing JWT refresh tokens                        | refreshsecret           |
| JWT_EXPIRATION        | Expiration time for JWT tokens                                   | 30m                     |
| JWT_REFRESH_EXPIRATION| Expiration time for JWT refresh tokens                           | 7d                      |
| ENV                   | Application environment (development/production)                 | development             |
| PG_HOST               | Hostname of your PostgreSQL server                               | localhost               |
| DATABASE_URL          | Connection URL for your PostgreSQL database (auto-generated)     | See below for details   |

### Example .env File

```env
POSTGRES_USER=prisma
POSTGRES_PASSWORD=topsecret
POSTGRES_DB=mydb
JWT_SECRET=secret
JWT_REFRESH_SECRET=refreshsecret
JWT_EXPIRATION=30m
JWT_REFRESH_EXPIRATION=7d
ENV=development
PG_HOST=localhost

# Auto-generate DATABASE_URL
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${PG_HOST}:5432/${POSTGRES_DB}?schema=public
```

### Generating Random Secrets
For generating random secret strings, you can use the following command in your terminal:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Replace the values of JWT_SECRET and JWT_REFRESH_SECRET with the generated strings for enhanced security.

4. Generate Prisma client:

```sh
npx prisma generate
```

### Running the App

```sh
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Folder Structure

```
nestjs-graphql-boilerplate/
├── src/
│   ├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── modules/
│   ├── pipes/
│   ├── resolvers/
│   ├── services/
│   └── main.ts
├── test/
│   ├── e2e/
│   └── unit/
├── .env.example
├── .gitignore
├── jest.config.js
├── nest-cli.json
├── package.json
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
└── tsconfig.json
```

## Technologies Used

- [NestJS](https://nestjs.com/)
- [GraphQL](https://graphql.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)

## Contributing

Contributions, Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.