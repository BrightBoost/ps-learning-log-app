# Learning Log API

A simple RESTful API for creating, retrieving, and managing a log of learning entries. It's built with Node.js, Express, and TypeScript.

## Development Environment Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd learning-log-app
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the App Locally

To start the development server, run:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

## Running the Tests

To run the automated tests, use:

```bash
npm test
```

## Project Structure

```
├───.eslintrc.json      # ESLint configuration
├───.gitignore          # Git ignore configuration
├───API_Reference.md    # API documentation
├───jest.config.ts      # Jest test framework configuration
├───package-lock.json   # Exact dependency versions
├───package.json        # Project dependencies and scripts
├───tsconfig.json       # TypeScript compiler options
├───src/                # Source code
│   ├───app.ts          # Main application file (Express server setup)
│   ├───data/           # Data storage
│   │   └───seed.json   # Seed data for the application
│   ├───models/         # Data models and types
│   │   └───entry.ts    # Entry model definition
│   ├───routes/         # API routes
│   │   ├───entryRoutes.test.ts # Tests for entry routes
│   │   └───entryRoutes.ts      # Routes for entry-related endpoints
│   └───services/       # Business logic
│       ├───entryService.test.ts # Tests for entry service
│       └───entryService.ts      # Logic for managing entries
```
