# 📊 InsightBoard - Interactive Analytics Dashboard

<div align="center">

![InsightBoard Banner](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.0-22B5BF?style=for-the-badge)

**A stunning, production-ready analytics dashboard showcasing advanced React patterns, TypeScript mastery, and beautiful data visualization.**

[Live Demo](#) • [Features](#-features) • [Quick Start](#-quick-start) • [Tutorial](#-tutorial) • [Architecture](#-architecture)

</div>

---

## 🎯 What is InsightBoard?

InsightBoard is a **professional-grade analytics dashboard** that allows you to:
- 📈 **Visualize business metrics** with interactive, animated charts
- 🎮 **Simulate scenarios** to predict business outcomes
- ⏮️ **Time-travel** through changes with undo/redo
- 🎨 **Experience modern UI/UX** with smooth animations and glassmorphism

This project demonstrates **enterprise-level React development** perfect for portfolios, interviews, and learning advanced patterns.

---

## ✨ Features

### 📊 **Real-Time Data Visualization**
- **Revenue Trends Chart**: Multi-line area chart showing MRR, Burn Rate, and Net Revenue
- **Customer Growth Chart**: Bar chart comparing new vs lost customers
- **Churn Analysis Chart**: Dual-axis chart tracking churn rate and customer base
- **Animated Transitions**: Smooth chart updates when switching scenarios

### 🎮 **Interactive Scenario Simulation**
Choose from pre-defined scenarios or create custom adjustments:
- **Optimistic Growth**: +15% MRR, +10% Burn Rate
- **Market Downturn**: -10% MRR, +50% Churn
- **Efficiency Drive**: -20% Burn Rate, -10% CAC
- **Custom Adjustments**: Fine-tune any metric with sliders

### ⏮️ **Time-Travel Debugging**
- Full undo/redo functionality
- Navigate through your simulation history
- Revert or replay changes instantly

### 🎨 **Premium UI/UX**
- Dark theme with gradient backgrounds
- Glassmorphism effects
- Framer Motion animations
- Custom scrollbars and tooltips
- Responsive design for all devices

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- A modern web browser

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/RafatAiub/Insight-Board.git
cd Insight-Board

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open your browser
# Navigate to http://localhost:5173
```

That's it! 🎉 The dashboard should now be running locally.

---

## 📚 Tutorial: Understanding InsightBoard

### Step 1: Exploring the Dashboard

When you first open InsightBoard, you'll see:

1. **Executive Summary** - Four key metric cards at the top
2. **Revenue Trends Chart** - Main visualization showing financial data
3. **Scenario Builder** - Right panel for simulating different scenarios
4. **Additional Charts** - Customer growth and churn analysis below

### Step 2: Understanding the Metrics

| Metric | Description | Good/Bad |
|--------|-------------|----------|
| **MRR** (Monthly Recurring Revenue) | Predictable monthly income | Higher is better ✅ |
| **Burn Rate** | Monthly expenses | Lower is better ✅ |
| **Churn Rate** | % of customers leaving | Lower is better ✅ |
| **CAC** (Customer Acquisition Cost) | Cost to acquire one customer | Lower is better ✅ |

### Step 3: Simulating Scenarios

#### Try "Optimistic Growth"
1. Click **"Optimistic Growth"** in the Scenario Builder
2. Watch the metrics update:
   - MRR increases by 15% ($150k → $172.5k)
   - Burn Rate increases by 10% ($85k → $93.5k)
3. Notice the **blue dot** on modified metrics
4. See charts animate to show new projections

#### Try "Market Downturn"
1. Click **"Market Downturn"**
2. Observe:
   - MRR drops by 10%
   - Churn Rate spikes by 50%
3. Charts update to reflect the negative scenario

### Step 4: Custom Adjustments

1. Select any scenario (or stay on "Baseline")
2. Use the **sliders** to adjust individual metrics
3. Watch real-time updates across all charts
4. Experiment with different combinations

### Step 5: Time-Travel with Undo/Redo

1. Make several scenario changes
2. Click the **Undo** button (↶) in the top-right
3. Step back through your changes
4. Click **Redo** (↷) to move forward again

### Step 6: Interacting with Charts

#### Revenue Trends Chart
- **Hover** over data points to see exact values
- **Green line**: Monthly Recurring Revenue
- **Red line**: Burn Rate
- **Blue line**: Net Revenue (MRR - Burn)

#### Customer Growth Chart
- **Green bars**: New customers acquired
- **Red bars**: Customers lost (churn)
- Hover to see monthly breakdown

#### Churn Analysis Chart
- **Orange line**: Churn rate percentage
- **Blue dashed line**: Total customer count
- Dual Y-axes for different scales

---

## 🏗️ Architecture & Code Structure

### Project Structure
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx         # Styled button with variants
│   │   ├── Card.tsx           # Card container components
│   │   └── ErrorBoundary.tsx  # Error handling wrapper
│   └── layout/
│       └── Shell.tsx          # Main layout with header
│
├── domain/                    # Business logic (framework-agnostic)
│   ├── types.ts               # Core domain models
│   ├── utils.ts               # Pure calculation functions
│   └── dataService.ts         # Data access layer
│
├── state/                     # State management
│   ├── types.ts               # State interfaces
│   ├── actions.ts             # Action type definitions
│   ├── reducer.ts             # State reducer with undo/redo
│   └── context.tsx            # React Context providers
│
├── hooks/                     # Custom React hooks
│   ├── useSimulation.ts       # Simulation calculations
│   └── useAppActions.ts       # Action dispatchers
│
├── features/
│   └── dashboard/             # Dashboard feature
│       ├── Dashboard.tsx      # Main dashboard container
│       ├── MetricCard.tsx     # Metric display card
│       ├── ScenarioPanel.tsx  # Scenario builder UI
│       ├── RevenueChart.tsx   # Revenue trends chart
│       ├── CustomerGrowthChart.tsx  # Customer growth chart
│       └── ChurnAnalysisChart.tsx   # Churn analysis chart
│
└── data/                      # Mock data
    ├── baseline.json          # Baseline metrics
    ├── scenarios.json         # Pre-defined scenarios
    └── historicalData.json    # 12 months of historical data
```

### Key Patterns Demonstrated

#### 1. **Domain-Driven Design (DDD)**
Business logic is separated from UI concerns:
```typescript
// domain/utils.ts - Pure functions
export function calculateChurnRate(lost: number, total: number): number {
  return total > 0 ? (lost / total) * 100 : 0;
}
```

#### 2. **Advanced State Management**
Using `useReducer` with undo/redo pattern:
```typescript
// state/reducer.ts
export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'UPDATE_ADJUSTMENT':
      return {
        ...state,
        past: [...state.past, state.present],
        present: applyAdjustment(state.present, action.payload),
        future: []
      };
    // ...
  }
};
```

#### 3. **Custom Hooks for Logic Reuse**
```typescript
// hooks/useSimulation.ts
export function useSimulation() {
  const state = useAppState();
  
  const metrics = useMemo(() => {
    return calculateSimulatedMetrics(state.present);
  }, [state.present]);
  
  return { metrics, hasChanges: state.past.length > 0 };
}
```

#### 4. **Component Composition**
```typescript
// Dashboard.tsx - Smart Container
export function Dashboard() {
  const { metrics } = useSimulation();
  const { loadData } = useAppActions();
  
  return (
    <Shell>
      {metrics.map(metric => <MetricCard key={metric.id} metric={metric} />)}
      <RevenueChart />
      <ScenarioPanel />
    </Shell>
  );
}
```

---

## 🎓 What You'll Learn

### TypeScript Mastery
- ✅ **Branded Types** for type-safe IDs
- ✅ **Discriminated Unions** for action types
- ✅ **Generic Utility Types** and advanced inference
- ✅ **Strict Mode** configuration

### React Best Practices
- ✅ **Performance Optimization** with `useMemo`, `useCallback`, `React.memo`
- ✅ **Custom Hooks** for reusable logic
- ✅ **Context API** for state management
- ✅ **Error Boundaries** for graceful error handling
- ✅ **Framer Motion** for smooth animations

### State Management Patterns
- ✅ **Reducer Pattern** for complex state logic
- ✅ **Immutable Updates** with spread operators
- ✅ **Time-Travel Debugging** (undo/redo)
- ✅ **Derived State** with selectors

### Data Visualization
- ✅ **Recharts** for beautiful charts
- ✅ **Custom Tooltips** and legends
- ✅ **Responsive Charts** that adapt to screen size
- ✅ **Animated Transitions** between data states

---

## 💼 Portfolio Benefits

This project is **interview-ready** and demonstrates:

### 1. **Architecture Skills**
Shows you can structure a scalable frontend application with clear separation of concerns.

### 2. **TypeScript Expertise**
Proves you understand advanced type systems and can write type-safe code.

### 3. **Problem-Solving**
Implements complex features like undo/redo and real-time simulation.

### 4. **Code Quality**
Clean, maintainable, and well-documented code that follows best practices.

### 5. **Modern Stack**
Uses current industry-standard tools and patterns.

### Perfect For:
- 🎯 Frontend Developer interviews
- 📝 Portfolio projects
- 🏢 Demonstrating enterprise-level React skills
- 📚 Learning advanced React patterns

---

## 🛠️ Tech Stack

| Technology | Purpose | Why? |
|------------|---------|------|
| **React 19** | UI framework | Latest features, concurrent rendering |
| **TypeScript 5.6** | Type safety | Catch errors at compile time |
| **Vite 7.3** | Build tool | Lightning-fast HMR and builds |
| **Recharts 2.0** | Charts | Beautiful, responsive data viz |
| **Framer Motion** | Animations | Smooth, performant animations |
| **TailwindCSS** | Styling | Utility-first, rapid development |
| **Lucide React** | Icons | Modern, customizable icons |

---

## 🧪 Development Workflow

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run type-check
```

### Making Changes

1. **Edit Components**: Modify files in `src/features/dashboard/`
2. **Update State Logic**: Edit `src/state/reducer.ts`
3. **Add New Metrics**: Update `src/data/baseline.json`
4. **Customize Scenarios**: Edit `src/data/scenarios.json`

### Adding a New Chart

```typescript
// 1. Create component
// src/features/dashboard/MyNewChart.tsx
import { LineChart, Line } from 'recharts';

export function MyNewChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={myData}>
        <Line dataKey="value" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
}

// 2. Import in Dashboard.tsx
import { MyNewChart } from './MyNewChart';

// 3. Add to layout
<MyNewChart />
```

---

## 🎨 Customization Guide

### Changing Colors

Edit `src/index.css`:
```css
:root {
  --color-primary: #3b82f6;    /* Blue */
  --color-success: #10b981;    /* Green */
  --color-danger: #f43f5e;     /* Red */
  --color-warning: #f59e0b;    /* Amber */
}
```

### Adding New Scenarios

Edit `src/data/scenarios.json`:
```json
{
  "id": "custom-scenario",
  "name": "My Custom Scenario",
  "description": "Description here",
  "adjustments": {
    "mrr": 1.2,        // 20% increase
    "burnRate": 0.9    // 10% decrease
  }
}
```

### Modifying Historical Data

Edit `src/data/historicalData.json` to change the 12-month data used in charts.

---

## 📈 Performance Optimization

InsightBoard is optimized for performance:

- ✅ **Code Splitting**: Lazy loading for faster initial load
- ✅ **Memoization**: `useMemo` and `useCallback` prevent unnecessary re-renders
- ✅ **React.memo**: Components only re-render when props change
- ✅ **Efficient State Updates**: Immutable patterns with minimal copying
- ✅ **Optimized Charts**: Recharts with animation throttling

---

## 🐛 Troubleshooting

### Charts Not Displaying
- **Check console** for errors
- **Verify** `historicalData.json` is properly formatted
- **Ensure** Recharts is installed: `npm install recharts`

### Scenarios Not Updating
- **Check** `scenarios.json` format
- **Verify** adjustment multipliers are numbers
- **Open DevTools** and check Redux state

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Type check
npm run type-check
```

---

## 🤝 Contributing

This is a portfolio/learning project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for learning or as a portfolio piece.

---

## 🙏 Acknowledgments

- **Recharts** for the amazing charting library
- **Framer Motion** for smooth animations
- **TailwindCSS** for rapid styling
- **React Team** for the incredible framework

---

## 📧 Contact & Support

- **GitHub**: [@RafatAiub](https://github.com/RafatAiub)
- **Issues**: [Report a bug](https://github.com/RafatAiub/Insight-Board/issues)
- **Discussions**: [Ask questions](https://github.com/RafatAiub/Insight-Board/discussions)

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

**Made with ❤️ for developers who want to level up their React skills**

[Back to Top](#-insightboard---interactive-analytics-dashboard)

</div>
