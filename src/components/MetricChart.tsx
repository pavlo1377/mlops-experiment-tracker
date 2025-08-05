import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

type ExperimentLog = {
  experiment_id: string;
  metric_name: string;
  step: number;
  value: number;
};

type MetricChartProps = {
  data: ExperimentLog[];
  selectedExperiments: string[];
  stepLimit: number;
};

export function MetricChart({
  data,
  selectedExperiments,
  stepLimit,
}: MetricChartProps) {
  const filteredData = data.filter((d) =>
    selectedExperiments.includes(d.experiment_id)
  );
  const metrics = Array.from(new Set(filteredData.map((d) => d.metric_name)));
  const colors = [
    "#06b6d4",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#10b981",
    "#f97316",
  ];

  return (
    <div className="space-y-8">
      {metrics.map((metric) => {
        const metricData = filteredData.filter((d) => d.metric_name === metric);

        const steps = Array.from(new Set(metricData.map((d) => d.step)))
          .sort((a, b) => a - b)
          .slice(0, stepLimit);

        const chartData = steps.map((step) => {
          const entry: Record<string, number | null> = { step };
          selectedExperiments.forEach((id) => {
            const row = metricData.find(
              (d) => d.step === step && d.experiment_id === id
            );
            entry[id] = row?.value ?? null;
          });
          return entry;
        });

        return (
          <div key={metric} className="glass-container p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">{metric}</h3>
              <div className="flex gap-2 ml-auto">
                {selectedExperiments.map((exp, idx) => (
                  <div key={exp} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors[idx % colors.length] }}
                    />
                    <span className="text-sm text-gray-400 font-mono">
                      {exp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-96 bg-gray-900/50 rounded-xl p-4 border border-gray-700">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="step"
                    stroke="#9ca3af"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  {selectedExperiments.map((id, index) => (
                    <Line
                      key={id}
                      type="monotone"
                      dataKey={id}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      dot={false}
                      connectNulls={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
