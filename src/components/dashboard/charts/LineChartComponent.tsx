
import { Card } from "@tremor/react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface LineChartComponentProps {
  data?: any[];
  title?: string;
  width?: number;
  height?: number;
  style?: {
    fontFamily?: string;
    color?: string;
    fontSize?: string;
    colors?: string[];
  };
}

export const LineChartComponent = ({ data, title, height, style }: LineChartComponentProps) => {
  const chartColor = style?.colors?.[0] || '#2563eb';
  const effectiveHeight = height ? (title ? height - 40 : height) : '100%';

  console.log('Line Chart Style:', style);
  console.log('Line Chart Color:', chartColor);
  console.log('Line Chart Data:', data);
  
  // Ensure data is in the correct format
  const formattedData = data?.map(item => ({
    ...item,
    value: Number(item.value)
  })) || [];

  return (
    <Card className="w-full h-full">
      <div className="p-4">
        {title && (
          <h3 
            className="text-lg font-semibold mb-4" 
            style={{ 
              ...style,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {title}
          </h3>
        )}
        <div style={{ height: effectiveHeight }} className="mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={formattedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                dot={{ fill: chartColor, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
