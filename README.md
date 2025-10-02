# Personal Finance Tracker - Stage 1

A simple React Native app for tracking personal finances, built with React Native Paper.

## Features (Stage 1)

- **Bottom Tab Navigation** with 3 screens:
  - Home (Dashboard)
  - Add Transaction
  - Transactions (List)

- **Home Screen**:
  - Current balance display (default: $0.00)
  - Monthly summary placeholder
  - Floating Action Button to add transactions

- **Add Transaction Screen**:
  - Amount input
  - Category input (text field)
  - Type selection (Income/Expense radio buttons)
  - Date display (today's date)
  - Save button with confirmation alert

- **Transactions Screen**:
  - Placeholder for future transaction list

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Use Expo Go app on your phone to scan the QR code, or run on simulator:
   ```bash
   npm run ios    # for iOS simulator
   npm run android # for Android emulator
   ```

## Tech Stack

- React Native
- React Native Paper (UI components)
- React Navigation (Bottom tabs)
- Expo

## Project Structure

```
src/
  screens/
    HomeScreen.js
    AddTransactionScreen.js
    TransactionsScreen.js
App.js
```

## Next Steps (Future Stages)

- Add data persistence (AsyncStorage or SQLite)
- Implement actual transaction storage and display
- Add transaction editing/deletion
- Implement categories management
- Add charts and analytics
- Improve date picker functionality
