import { useState } from "react";
import type { ExperimentLog } from "./components/CSVUploader";
import CSVUploader from "./components/CSVUploader";
import ExperimentsList from "./components/ExperimentsList";
import { MetricChart } from "./components/MetricChart";
import StepInput from "./components/StepInput";
import { Activity, ArrowUp, Brain } from "lucide-react";

function App() {
  const [data, setData] = useState<ExperimentLog[]>([]);
  const [selectedExperiments, setSelectedExperiments] = useState<string[]>([]);
  const [stepLimit, setStepLimit] = useState(100);

  const handlePageUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='%23374151' stroke-width='1' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      />

      <ArrowUp
        className="w-12 h-12 p-3 fixed bottom-5 right-5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-4xl cursor-pointer"
        onClick={handlePageUp}
      />
      <div className="relative z-10 container mx-auto px-6 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              MLOps Experiment Tracker
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Analyze and visualize your machine learning experiments with
            AI-powered insights
          </p>
        </header>

        <div className="space-y-8">
          <CSVUploader onDataParsed={setData} />

          {data.length > 0 && (
            <>
              <div className="grid lg:grid-cols-2 gap-8">
                <ExperimentsList
                  onApply={setSelectedExperiments}
                  selected={selectedExperiments}
                  data={data}
                />
                <StepInput stepLimit={stepLimit} setStepLimit={setStepLimit} />
              </div>

              {selectedExperiments.length > 0 ? (
                <MetricChart
                  data={data}
                  selectedExperiments={selectedExperiments}
                  stepLimit={stepLimit}
                />
              ) : (
                <div className="glass-container p-12 text-center">
                  <Activity className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Ready for Analysis
                  </h3>
                  <p className="text-gray-500">
                    Select one or more experiments above to visualize your
                    metrics
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
