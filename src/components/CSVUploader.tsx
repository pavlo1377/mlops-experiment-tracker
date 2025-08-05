import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { Brain, Upload } from "lucide-react";

export type ExperimentLog = {
  experiment_id: string;
  metric_name: string;
  step: number;
  value: number;
};

type CSVUploaderProps = {
  onDataParsed: (data: ExperimentLog[]) => void;
};

const CSVUploader = ({ onDataParsed }: CSVUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    Papa.parse<ExperimentLog>(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        onDataParsed(results.data);
        setIsUploading(false);
      },
      error: (error) => {
        console.log(`CSV PARSE ERROR ${error}`);
        setIsUploading(false);
      },
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="glass-container p-8 text-center">
      <div className="mb-6">
        <Brain className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Upload Experiment Data
        </h2>
        <p className="text-gray-400">
          Load your ML experiment logs to begin analysis
        </p>
      </div>

      {isUploading ? (
        <div className="flex items-center justify-center py-12">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animate-reverse"></div>
          </div>
          <span className="ml-4 text-cyan-400 font-medium">
            Processing data...
          </span>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={handleButtonClick}
            className="cyber-button group relative overflow-hidden px-8 py-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <Upload className="w-6 h-6" />
              <span className="text-lg font-semibold">Select CSV File</span>
            </div>
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Supports CSV files with experiment_id, metric_name, step, and value
            columns
          </p>
        </>
      )}
    </div>
  );
};

export default CSVUploader;
