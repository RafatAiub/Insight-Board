import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import historicalData from '../../data/historicalData.json';

interface RevenueChartProps {
  scenarioMultiplier?: number;
}

export function RevenueChart({ scenarioMultiplier = 1 }: RevenueChartProps) {
  // Apply scenario multiplier to data
  const chartData = historicalData.monthlyData.map(item => ({
    month: item.month,
    mrr: Math.round(item.mrr * scenarioMultiplier),
    burnRate: Math.round(item.burnRate * scenarioMultiplier),
    netRevenue: Math.round((item.mrr - item.burnRate) * scenarioMultiplier),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm font-medium mb-2">{payload[0].payload.month}</p>
          <div className="space-y-1">
            <p className="text-emerald-400 text-sm">
              MRR: <span className="font-semibold">${payload[0].value.toLocaleString()}</span>
            </p>
            <p className="text-rose-400 text-sm">
              Burn: <span className="font-semibold">${payload[1].value.toLocaleString()}</span>
            </p>
            <p className="text-blue-400 text-sm">
              Net: <span className="font-semibold">${payload[2].value.toLocaleString()}</span>
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
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">Revenue Trends</h3>
        <p className="text-sm text-gray-400">Monthly Recurring Revenue vs Burn Rate</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            tickLine={{ stroke: '#4b5563' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="mrr" 
            stroke="#10b981" 
            strokeWidth={2}
            fill="url(#colorMrr)"
            animationDuration={1000}
          />
          <Area 
            type="monotone" 
            dataKey="burnRate" 
            stroke="#f43f5e" 
            strokeWidth={2}
            fill="url(#colorBurn)"
            animationDuration={1000}
          />
          <Area 
            type="monotone" 
            dataKey="netRevenue" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fill="url(#colorNet)"
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-sm text-gray-400">MRR</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <span className="text-sm text-gray-400">Burn Rate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-400">Net Revenue</span>
        </div>
      </div>
    </motion.div>
  );
}
