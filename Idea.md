# Project Idea Submission

**Project Title:**  
Personal Finance Tracker – Mobile App  

**Your Name & Roll Number:**  
Yash Pratap Singh Solanki – 2024-B-18112003  

---

## Problem Statement  
Many people struggle to keep track of their spending habits and often overspend without realizing it. Manual methods like paper logs or spreadsheets are time-consuming and lack convenience. Existing solutions are often too complex or require internet access. This project aims to build a **student-friendly, offline-first mobile solution** that enables individuals to easily record and analyze their income and expenses, with an intuitive and minimal UI.  

---

## Proposed Solution / Idea  
A **React Native mobile application** built with **React Native Paper** for UI, **React Navigation** for multi-screen navigation, and **AsyncStorage** for local data persistence. Users can add transactions, categorize them, and view summaries through charts. If needed, a cloud backend (e.g., Firebase or Supabase) can be added later for multi-device sync, but the first stage focuses on a **local-first, offline-capable app**.  

---

## Key Features  
- **Dashboard Overview**: Total balance and monthly summary.  
- **Transaction Management**: Add, edit, and delete income/expense records.  
- **Categorization**: Organize transactions (Food, Transport, Shopping, Bills, etc.).  
- **Analytics & Charts**: Spending breakdown with pie charts and bar charts.  
- **Dark Mode**: UI theme toggle using React Native Paper theming.  
- **Offline Support**: All data stored locally with AsyncStorage.  

---

## Target Users / Audience  
Individuals who want to manage their personal finances effectively in a simple and offline-friendly way. Ideal for **students, young professionals, and individuals new to finance management**.  

---

## Technology Stack  
- **Frontend (Mobile App):** React Native  
- **UI Library:** React Native Paper (Appbar, FAB, Card, TextInput, Button, etc.)  
- **Navigation:** React Navigation (Bottom Tabs, Stack)  
- **Local Storage:** AsyncStorage (offline-first approach)  
- **Charts & Visualization:** react-native-chart-kit  
- **State Management:** Context API + useReducer  

---

## Expected Outcome  
A fully functional mobile application where users can record income and expenses, categorize them, and visualize financial data through charts. The app will run offline using AsyncStorage, feature a modern and clean UI built with React Native Paper, and support dark mode.  

---

## Timeline  
- **Week 1–2:** UI/UX design using React Native Paper, setup navigation (Bottom Tabs).  
- **Week 3–4:** Implement transaction management (Add, Edit, Delete) with AsyncStorage.  
- **Week 5:** Build analytics screen with charts (Pie + Bar).  
- **Week 6:** Add dark mode support and offline caching.  
- **Week 7:** Testing, debugging, and UI polishing.  

---

## Additional Notes  
Future enhancements could include:  
- Cloud sync with Firebase or Supabase for multi-device access.  
- Authentication (Signup/Login).  
- AI-driven spending suggestions.  
- Export/backup options (CSV, PDF).  
