import  { useRef, useState } from "react";
import { Settings } from "lucide-react";

type StepInputProps = {
  stepLimit: number;
  setStepLimit: (limit: number) => void;
};

const StepInput = ({ stepLimit, setStepLimit }: StepInputProps) => {
  const [isApplying, setIsApplying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onApply = async () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      setIsApplying(true);
      await new Promise(resolve => setTimeout(resolve, 600));
      setStepLimit(parseInt(inputValue));
      setIsApplying(false);
    }
  };

  return (
    <div className="glass-container p-6">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Training Steps Limit</h3>
      </div>
      
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2 text-gray-400">
            Maximum steps to display
          </label>
          <input
            ref={inputRef}
            type="number"
            min={50}
            max={25000}
            defaultValue={stepLimit}
            step={50}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
            placeholder="Enter step limit..."
          />
        </div>
        <button
          onClick={onApply}
          disabled={isApplying}
          className="cyber-button-secondary px-6 py-3 disabled:opacity-50"
        >
          {isApplying ? (
            <div className="w-5 h-5 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Apply'
          )}
        </button>
      </div>
    </div>
  );
};

export default StepInput;