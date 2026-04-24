# CheZay Restaurant App

A React Native application for restaurant management and customer ordering.

## Features

- **Admin Dashboard**: Manage orders, tables, menu, reservations, billing, inventory, and reports
- **Customer Interface**: Browse menu, add to cart, place orders, make reservations, provide feedback
- **Dark/Light Theme**: Toggle between themes
- **Real-time Menu**: Fetches menu from backend server
- **Order Logging**: Sends orders to backend for processing

## Installation

1. Navigate to the frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the App

Make sure the backend server is running first (see backend README).

### For Development (Expo)

If you have Expo CLI installed:
```
npx expo start
```

### For React Native CLI

For Android:
```
npm run android
```

For iOS:
```
npm run ios
```

Or start Metro bundler:
```
npm start
```

## Backend Integration

The app connects to a Node.js backend running on `http://localhost:3000`:

- `GET /menu`: Fetches menu items
- `POST /order`: Submits customer orders

## App Structure

- **Splash Screen**: App introduction
- **Login**: Role selection (Admin/Guest)
- **Admin Screens**: Dashboard, Orders, Tables, Menu, Reservations, Billing, Inventory, Reports, Settings
- **Customer Screens**: Menu, Cart, Reserve, Feedback, QR Code, Checkout

## Technologies Used

- React Native
- React Hooks (useState, useEffect, useMemo)
- Fetch API for backend communication
- StyleSheet for styling

## Notes

- The app uses hardcoded menu data as fallback if backend is not available
- Orders are logged to the backend console when placed
- Make sure both backend and frontend are running on the same network for proper communication
