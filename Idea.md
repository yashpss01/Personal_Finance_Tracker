# Project Idea Submission

**Project Title:**  
Personal Finance Tracker – Mobile App  

**Your Name & Roll Number:**  
Yash Pratap Singh Solanki – 2024-B-18112003  

---

## Problem Statement  
Many people struggle to keep track of their spending habits and often overspend without realizing it. Manual methods like paper logs or spreadsheets are time-consuming and lack convenience. Existing solutions often fail to support multi-user access, secure authentication, or cross-device usage. This project aims to build a multi-user mobile solution that enables individuals to securely record and analyze their income and expenses, with data stored in a structured backend system.  

---

## Proposed Solution / Idea  
A React Native mobile application integrated with a **Node.js + Express backend** and a **MySQL database (managed using Prisma ORM)**. Users can sign up, log in securely, and manage their financial transactions (income and expenses). Data will be categorized, stored centrally, and visualized through charts for spending analysis. Local caching with AsyncStorage will enable offline access, syncing data with the backend once online.  

---

## Key Features  
- **User Authentication**: Signup/Login with secure password hashing (JWT-based auth).  
- **Transaction Management**: Add, edit, delete income/expense records.  
- **Categorization**: Organize transactions (Food, Transport, Shopping, Bills, etc.).  
- **Analytics & Charts**: Monthly summaries and category-wise spending breakdown.  
- **Budget Tracking**: Set budgets and get spending alerts.  
- **Dark Mode**: UI theme toggle.  
- **Offline Support**: Cache with AsyncStorage, syncing with server.  

---

## Target Users / Audience  
Individuals who want to manage their personal finances more effectively, including students, working professionals, and small business owners. The app is built for multiple users with secure login and centralized storage.  

---

## Technology Stack  

- **Frontend (Mobile App):** React Native  
- **Navigation:** React Navigation  
- **State Management:** Context API or Redux (optional)  
- **Offline Storage (Cache):** AsyncStorage  
- **Backend:** Node.js with Express.js (REST API)  
- **Database:** MySQL (Relational DB for structured financial data)  
- **ORM:** Prisma (for database schema management & queries)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Charts & Visualization:** react-native-chart-kit  

---

## Expected Outcome  
A fully functional multi-user mobile application where users can create accounts, manage financial transactions, and visualize spending through charts. The app ensures secure backend integration with MySQL via Prisma, provides offline usability with local caching, and delivers a smooth and user-friendly experience.  

---

## Timeline  

- **Week 1–2:** UI/UX design and component setup in React Native  
- **Week 3–4:** Setup backend with Node.js + Express, implement authentication  
- **Week 5:** Connect backend with MySQL using Prisma ORM, build transaction APIs  
- **Week 6:** Integrate React Native app with backend APIs (CRUD operations)  
- **Week 7:** Add charts, analytics, budget tracking, and offline caching  
- **Week 8:** Testing, debugging, UI polishing, and dark mode support  

---

## Additional Notes  
Future enhancements may include cloud sync across devices, role-based access (e.g., shared family accounts), AI-driven financial insights, and multi-currency support.  
