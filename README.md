# Personal Finance Tracker

A mobile application built with React Native and Expo to help you track your income and expenses. It's designed to be simple, fast, and work offline.

## Features

- **Dashboard**: See your total balance, income, and expense totals at a glance.
- **Transaction Management**: Easily add new income or expense records with categories.
- **History**: View a list of all your past transactions.
- **Analytics**: Visualise your spending and income with pie charts. You can toggle between "All Time" and "This Month" views.
- **Dark Mode**: Switch between light and dark themes in settings.
- **Offline Storage**: Data is saved locally on your device using AsyncStorage, so it persists between restarts.

## Tech Stack

- **React Native** (via Expo)
- **React Navigation** (Bottom Tabs)
- **React Native Paper** (UI Components)
- **React Native Chart Kit** (Analytics)
- **AsyncStorage** (Local Data Persistence)

## Getting Started

### Prerequisites

- Node.js installed
- Expo Go app on your phone (or an emulator set up)

### Installation

1. Clone the repo
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the app
   ```bash
   npm start
   ```

## Project Structure

- `App.js`: Main entry point, sets up navigation and themes.
- `src/screens`: Contains all the screen components (Home, Add, Analytics, History, Settings).
- `src/context`: Context providers for global state (Transactions, Theme).

## Notes

- The app uses a custom color palette for charts (Red/Warm for expenses, Green/Cool for income).
- Data is currently local-only.

## License

MIT
