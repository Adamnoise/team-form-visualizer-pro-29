
import { memo } from "react";

interface StatComparisonProps {
  label: string;
  value1: string | number;
  value2: string | number;
}

const StatComparison = memo(({ label, value1, value2 }: StatComparisonProps) => {
  const isValue1Better = Number(value1) > Number(value2);
  const isValue2Better = Number(value2) > Number(value1);
  const isEqual = value1 === value2;

  return (
    <div className="grid grid-cols-3 items-center py-3">
      <div className={`text-center font-semibold ${isValue1Better ? "text-blue-600" : "text-gray-700"}`}>
        {value1}
      </div>
      <div className="text-center text-sm text-gray-500">{label}</div>
      <div className={`text-center font-semibold ${isValue2Better ? "text-blue-600" : "text-gray-700"}`}>
        {value2}
      </div>
    </div>
  );
});

StatComparison.displayName = "StatComparison";

export default StatComparison;
