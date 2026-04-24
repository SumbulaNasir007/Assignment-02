# Menu Server

This is a simple Node.js server for the menu assignment.

## Installation

1. Navigate to the backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Server

Start the server with:
```
npm start
```

Or directly:
```
node server.js
```

The server will run on http://localhost:3000

## Endpoints

- GET /menu: Returns the list of menu items in JSON format
- POST /order: Accepts order data and logs it to the console

## Menu Data

The menu includes items with name, price, category, and image URL.