import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import historicalData from '../../data/historicalData.json';

interface ChurnAnalysisChartProps {
  scenarioMultiplier?: number;
}

export function ChurnAnalysisChart({ scenarioMultiplier = 1 }: ChurnAnalysisChartProps) {
  const chartData = historicalData.monthlyData.map(item => ({
    month: item.month,
    churnRate: item.churnRate * scenarioMultiplier,
    customers: Math.round(item.customers * scenarioMultiplier),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm font-medium mb-2">{payload[0].payload.month}</p>
          <div className="space-y-1">
            <p className="text-amber-400 text-sm">
              Churn Rate: <span className="font-semibold">{payload[0].value.toFixed(1)}%</span>
            </p>
            <p className="text-blue-400 text-sm">
              Total Customers: <span className="font-semibold">{payload[1].value.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Churn Analysis</h3>
        <p className="text-sm text-gray-400">Customer Retention Trends</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickLine={{ stroke: '#4b5563' }}
          />
          <YAxis 
            yAxisId="left"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickLine={{ stroke: '#4b5563' }}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickLine={{ stroke: '#4b5563' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="churnRate" 
            stroke="#f59e0b" 
            strokeWidth={3}
            dot={{ fill: '#f59e0b', r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={1000}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="customers" 
            stroke="#3b82f6" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-sm text-gray-400">Churn Rate (%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-400">Total Customers</span>
        </div>
      </div>
    </motion.div>
  );
}
