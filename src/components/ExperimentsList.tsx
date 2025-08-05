import { useState, useEffect, useCallback, useMemo } from "react";
import type { ExperimentLog } from "./CSVUploader";
import { Activity, Zap } from "lucide-react";

type ExperimentsListProps = {
  data: ExperimentLog[];
  selected: string[];
  onApply: (selected: string[]) => void;
};

const ExperimentsList = ({ data, selected, onApply }: ExperimentsListProps) => {
  const [checkedExp, setCheckedExp] = useState<string[]>(selected);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const experiments = useMemo(
    () => Array.from(new Set(data.map((row) => row.experiment_id))),
    [data]
  );

  const handleToggle = useCallback((id: string) => {
    setCheckedExp((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  }, []);

  const handleApply = useCallback(async () => {
    if (checkedExp.length === 0) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      onApply(checkedExp);
    } catch (error) {
      console.error("Error applying selection:", error);
    } finally {
      setIsLoading(false);
    }
  }, [checkedExp, onApply]);

  useEffect(() => {
    setCheckedExp(selected);
  }, [selected]);

  return (
    <div className="glass-container p-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Select Experiments</h2>
        <span className="text-sm text-gray-400">
          ({experiments.length} available)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
        {experiments.map((id) => (
          <label
            key={id}
            className="experiment-card group cursor-pointer"
            htmlFor={`experiment-${id}`}
          >
            <input
              id={`experiment-${id}`}
              type="checkbox"
              checked={checkedExp.includes(id)}
              onChange={() => handleToggle(id)}
              className="sr-only"
            />
            <div
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                checkedExp.includes(id)
                  ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20"
                  : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-medium text-white truncate">
                  {id}
                </span>
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-colors duration-200 ${
                    checkedExp.includes(id)
                      ? "bg-cyan-400 border-cyan-400"
                      : "border-gray-500"
                  }`}
                />
              </div>
            </div>
          </label>
        ))}
      </div>

      <button
        onClick={handleApply}
        disabled={checkedExp.length === 0 || isLoading}
        className="cyber-button-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3"
        type="button"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
            <span>Applying Selection...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            <span>Apply Selection ({checkedExp.length})</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ExperimentsList;
