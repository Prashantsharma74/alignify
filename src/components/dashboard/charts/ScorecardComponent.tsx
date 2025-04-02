import { ChartComponentProps } from "@/types/dashboard";

export const ScorecardComponent = ({ data, title, style }: ChartComponentProps) => {
  const mainValue = data?.[0]?.value || 0;
  const change = data?.[0]?.change || 0;
  const changePeriod = data?.[0]?.changePeriod || "vs Pre Month";
  
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(mainValue);

  const formattedChange = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(Math.abs(change));

  const changePercentage = ((change / (mainValue - change)) * 100).toFixed(1);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm w-full h-full flex flex-col" style={style}>
      <h3 className="text-lg font-medium text-gray-900 mb-4" style={{ fontFamily: style?.fontFamily }}>
        {title || "Scorecard"}
      </h3>
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-bold text-blue-600">
          {formattedValue}
        </span>
        <div className="flex items-center gap-1">
          <span className={`flex items-center ${change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {change >= 0 ? '▲' : '▼'}
            {formattedChange}
            <span className="ml-1">({Math.abs(parseFloat(changePercentage))}%)</span>
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {changePeriod}
        </span>
      </div>
    </div>
  );
};