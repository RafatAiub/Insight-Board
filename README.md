# 📊 InsightBoard - Analytics & Scenario Simulator

A modern, client-side analytics dashboard built with **React 19**, **TypeScript**, and **Framer Motion**. This project demonstrates advanced frontend architecture patterns including Domain-Driven Design, sophisticated state management, and real-time scenario simulation—all without a backend.

![InsightBoard Dashboard](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🎯 Project Overview

InsightBoard is an interactive analytics dashboard that allows users to visualize key business metrics and simulate "what-if" scenarios in real-time. It showcases professional-grade React development with a focus on type safety, clean architecture, and performance optimization.

## ✨ Key Features

### 📈 **Real-Time Metrics Dashboard**
- Display of critical business KPIs (MRR, Burn Rate, Churn, CAC)
- Visual indicators for metric changes (green/red deltas)
- Mini sparkline charts showing historical trends
- Animated metric cards with smooth transitions

### 🎮 **Interactive Scenario Simulation**
- **Pre-defined Scenarios**: Choose from "Optimistic Growth", "Market Downturn", or "Efficiency Drive"
- **Custom Adjustments**: Fine-tune individual metrics with interactive sliders
- **Real-time Updates**: See metrics recalculate instantly as you adjust parameters
- **Visual Feedback**: Modified metrics highlighted with blue indicators

### ⏮️ **Undo/Redo System**
- Full time-travel debugging capability
- Navigate through your simulation history
- Revert or replay any changes with one click

### 🎨 **Modern UI/UX**
- Dark mode design with glassmorphism effects
- Smooth animations powered by Framer Motion
- Responsive layout that works on all screen sizes
- Professional color palette and typography

## 🏗️ Architecture Highlights

This project demonstrates **production-ready patterns** that you'd find in enterprise applications:

### **1. Domain-Driven Design (DDD)**
```
src/domain/          # Pure business logic (framework-agnostic)
├── types.ts         # Core domain models with branded types
├── utils.ts         # Pure functions for calculations
└── dataService.ts   # Data access layer
```

### **2. Advanced State Management**
- **`useReducer` + Context API**: Centralized state without Redux overhead
- **Discriminated Unions**: Type-safe action handling
- **Undo/Redo Pattern**: Immutable state snapshots with past/future arrays
- **Memoized Selectors**: Performance optimization with `useMemo`

### **3. Custom Hooks Architecture**
```typescript
useSimulation()    // Derives computed values from state
useAppActions()    // Encapsulates all dispatch logic
useAppState()      // Provides type-safe state access
```

### **4. Component Composition**
- **Smart Containers**: `Dashboard.tsx` handles data and logic
- **Presentational Components**: `MetricCard.tsx`, `ScenarioPanel.tsx` focus on UI
- **Reusable UI Kit**: `Button`, `Card` components with variant patterns

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RafatAiub/Insight-Board.git
   cd Insight-Board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Build for Production
```bash
npm run build
npm run preview  # Preview the production build
```

## 🎓 What You'll Learn

Building this project teaches you:

### **TypeScript Mastery**
- ✅ Branded types for type-safe IDs
- ✅ Discriminated unions for exhaustive type checking
- ✅ Generic utility types and advanced type inference
- ✅ Strict mode configuration (`verbatimModuleSyntax`)

### **React Best Practices**
- ✅ Performance optimization with `useMemo`, `useCallback`, `React.memo`
- ✅ Custom hooks for reusable logic
- ✅ Context API for state management without prop drilling
- ✅ Error boundaries for graceful error handling
- ✅ Compound component patterns

### **State Management Patterns**
- ✅ Reducer pattern for complex state logic
- ✅ Immutable state updates
- ✅ Time-travel debugging (undo/redo)
- ✅ Derived state with selectors

### **Modern Tooling**
- ✅ Vite for lightning-fast development
- ✅ ESLint for code quality
- ✅ Framer Motion for animations
- ✅ TailwindCSS for utility-first styling

## 💼 Portfolio Benefits

This project is **interview-ready** and demonstrates:

1. **Architecture Skills**: Shows you can structure a scalable frontend application
2. **TypeScript Expertise**: Proves you understand advanced type systems
3. **Problem-Solving**: Implements complex features like undo/redo and real-time simulation
4. **Code Quality**: Clean, maintainable, and well-documented code
5. **Modern Stack**: Uses current industry-standard tools and patterns

### Perfect for:
- 🎯 Frontend Developer interviews
- 📝 Portfolio projects
- 🏢 Demonstrating enterprise-level React skills
- 📚 Learning advanced React patterns

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, ErrorBoundary)
│   └── layout/          # Layout components (Shell)
├── domain/              # Business logic layer
│   ├── types.ts         # Domain models and types
│   ├── utils.ts         # Pure calculation functions
│   └── dataService.ts   # Data access
├── state/               # State management
│   ├── types.ts         # State interfaces
│   ├── actions.ts       # Action type definitions
│   ├── reducer.ts       # State reducer with undo/redo
│   └── context.tsx      # React Context providers
├── hooks/               # Custom React hooks
│   ├── useSimulation.ts # Simulation calculations
│   └── useAppActions.ts # Action dispatchers
├── features/
│   └── dashboard/       # Dashboard feature
│       ├── Dashboard.tsx
│       ├── MetricCard.tsx
│       └── ScenarioPanel.tsx
└── data/                # Mock data (JSON files)
```

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework with latest features |
| **TypeScript 5.6** | Type safety and developer experience |
| **Vite 7.3** | Build tool and dev server |
| **TailwindCSS** | Utility-first CSS framework |
| **Framer Motion** | Animation library |
| **Lucide React** | Icon library |
| **date-fns** | Date manipulation |

## 🧪 Features Verification

All features are fully functional:

- ✅ **Dashboard loads** with 4 metric cards
- ✅ **Scenario selection** updates all metrics in real-time
- ✅ **Slider adjustments** modify individual metrics
- ✅ **Undo/Redo buttons** navigate through state history
- ✅ **Visual indicators** show modified vs. baseline values
- ✅ **Animations** provide smooth transitions
- ✅ **Error boundary** catches and displays errors gracefully

## 🤝 Contributing

This is a portfolio/learning project, but suggestions and improvements are welcome!

## 📄 License

MIT License - feel free to use this project for learning or as a portfolio piece.

## 🙏 Acknowledgments

Built as a demonstration of advanced React and TypeScript patterns for educational and portfolio purposes.

---

**⭐ If you found this project helpful, please give it a star!**

**📧 Questions?** Feel free to open an issue or reach out.
