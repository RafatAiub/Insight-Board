import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import type { SimulatedMetric } from '../../hooks/useSimulation';
import { formatMetricValue } from '../../domain/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface MetricCardProps {
  metric: SimulatedMetric;
  onClick?: () => void;
}

export function MetricCard({ metric, onClick }: MetricCardProps) {
  const isPositive = metric.delta > 0;
  const isNeutral = metric.delta === 0;
  
  // Color logic
  const deltaColor = isNeutral 
    ? "text-neutral-500" 
    : isPositive 
      ? "text-emerald-400" 
      : "text-rose-400";
      
  // For Expense/Burn Rate, positive growth might be bad (red), but let's stick to simple math colors for now
  // or use the Category to inverse it? 
  // Let's stick to green = arrow up, red = arrow down for consistency, user can interpret.

  return (
    <Card 
        className="cursor-pointer group hover:border-blue-500/50 relative overflow-hidden" 
        onClick={onClick}
    >
        {/* Background Gradient for 'Active' feel */}
        {metric.isModified && (
            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
        )}

      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-neutral-400 group-hover:text-neutral-200 transaction-colors">
          {metric.name}
        </CardTitle>
        {metric.isModified && (
             <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight flex items-baseline gap-2">
           {/* Animated Value Selection */}
           <AnimatePresence mode="popLayout">
             <motion.span
                key={metric.simulatedValue}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
             >
                {formatMetricValue(metric.simulatedValue, metric.type)}
             </motion.span>
           </AnimatePresence>

           {metric.isModified && (
             <span className="text-xs text-neutral-500 line-through decoration-neutral-600 decoration-1">
                {formatMetricValue(metric.baselineValue, metric.type)}
             </span>
           )}
        </div>
        
        <div className={`text-xs mt-2 flex items-center ${deltaColor}`}>
            {isNeutral ? (
                <Minus className="mr-1 h-3 w-3" />
            ) : isPositive ? (
                <ArrowUp className="mr-1 h-3 w-3" />
            ) : (
                <ArrowDown className="mr-1 h-3 w-3" />
            )}
            <span className="font-medium">
                {Math.abs(metric.delta * 100).toFixed(1)}%
            </span>
            <span className="text-neutral-500 ml-1 font-normal">
                vs baseline
            </span>
        </div>
        
        {/* Simple Sparkline could go here using metric.simulatedHistory */}
        <div className="mt-4 h-8 flex items-end gap-0.5">
            {metric.simulatedHistory.map((point, i) => {
                // simple normalization for demo
                const max = Math.max(...metric.simulatedHistory.map(p => p.value));
                const min = Math.min(...metric.simulatedHistory.map(p => p.value));
                const range = max - min || 1;
                const height = ((point.value - min) / range) * 100;
                
                return (
                    <div 
                        key={point.date} 
                        className={`w-full rounded-sm opacity-50 ${metric.isModified ? 'bg-blue-500' : 'bg-neutral-600'}`}
                        style={{ height: `${Math.max(10, height)}%` }}
                    />
                )
            })}
        </div>

      </CardContent>
    </Card>
  );
}
