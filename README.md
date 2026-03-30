# Personal Finance Tracker

A cloud-based mobile application built with React Native, Expo, and Firebase to help you track your income and expenses securely from anywhere.

## Features

- **Authentication**: Secure email and password login system. Your data is private and synced to your specific account.
- **Cloud Sync**: Real-time data synchronization across all your devices using Firebase Firestore. 
- **Dashboard**: See your total balance, income, and expense totals at a glance.
- **Transaction Management**: Easily add new income or expense records.
- **Custom Categories**: Create and save your own custom categories for both income and expenses on the fly.
- **History**: View a complete list of all your past transactions.
- **Analytics**: Visualise your spending and income with interactive pie charts. Toggle between "All Time" and "This Month" views.
- **Dark Mode**: Switch between light and dark themes in the settings menu.

## Tech Stack

- **React Native** (via Expo)
- **Firebase** (Authentication & Cloud Firestore)
- **React Navigation** (Bottom Tabs & Native Stack)
- **React Native Paper** (Material UI Components)
- **React Native Chart Kit** (Analytics Visualizations)

## Getting Started

### Prerequisites

- Node.js installed
- Expo Go app on your phone (or an iOS/Android emulator)
- A Firebase Project (with Authentication and Firestore enabled)

### Installation

1. Clone the repo
   ```bash
   git clone <repo-url>
   cd Personal_Finance_Tracker
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up your Environment Variables
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
4. Start the app
   ```bash
   npm start
   ```

## Project Structure

- `App.js`: Main entry point, handles global Context wrappers and conditional Auth/App navigation routing.
- `src/config/firebase.js`: Firebase initialization and environment variable setup.
- `src/screens`: Contains all the screen components (Home, Add, Analytics, History, Settings, Login, Signup).
- `src/context`: Context providers for global state (Auth, Transactions, Theme).

## Notes

- The app uses a custom color palette for charts (Red/Warm for expenses, Green/Cool for income).
- Firebase Security Rules should be configured to only allow authenticated users to read/write their own documents matching their `uid`.

## License

MIT
