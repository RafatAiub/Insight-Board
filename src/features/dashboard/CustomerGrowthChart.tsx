import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import historicalData from '../../data/historicalData.json';

interface CustomerGrowthChartProps {
  scenarioMultiplier?: number;
}

export function CustomerGrowthChart({ scenarioMultiplier = 1 }: CustomerGrowthChartProps) {
  const chartData = historicalData.monthlyData.map(item => ({
    month: item.month,
    newCustomers: Math.round(item.newCustomers * scenarioMultiplier),
    lostCustomers: item.lostCustomers,
    totalCustomers: Math.round(item.customers * scenarioMultiplier),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm font-medium mb-2">{data.month}</p>
          <div className="space-y-1">
            <p className="text-emerald-400 text-sm">
              New: <span className="font-semibold">+{data.newCustomers}</span>
            </p>
            <p className="text-rose-400 text-sm">
              Lost: <span className="font-semibold">-{data.lostCustomers}</span>
            </p>
            <p className="text-blue-400 text-sm">
              Total: <span className="font-semibold">{data.totalCustomers}</span>
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
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Customer Growth</h3>
        <p className="text-sm text-gray-400">New vs Lost Customers</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickLine={{ stroke: '#4b5563' }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickLine={{ stroke: '#4b5563' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="newCustomers" 
            fill="#10b981" 
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
          <Bar 
            dataKey="lostCustomers" 
            fill="#f43f5e" 
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-sm text-gray-400">New Customers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <span className="text-sm text-gray-400">Lost Customers</span>
        </div>
      </div>
    </motion.div>
  );
}
