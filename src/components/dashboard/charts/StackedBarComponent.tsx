import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartComponentProps } from '@/types/dashboard';

const generateDefaultData = () => [
  { name: 'Jan', value: 400, value2: 300 },
  { name: 'Feb', value: 300, value2: 200 },
  { name: 'Mar', value: 200, value2: 400 },
  { name: 'Apr', value: 278, value2: 280 },
  { name: 'May', value: 189, value2: 310 }
];

export const StackedBarComponent = ({ data, title, style, width, height }: ChartComponentProps) => {
  const chartData = data?.length ? data : generateDefaultData();
  const effectiveHeight = height - (title ? 40 : 0);

  return (
    <div className="w-full h-full p-4">
      {title && <h3 className="text-lg font-semibold mb-4" style={style}>{title}</h3>}
      <div style={{ width: width - 32, height: effectiveHeight - 32 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" stackId="a" fill="#8884d8" name="Series 1" />
            <Bar dataKey="value2" stackId="a" fill="#82ca9d" name="Series 2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};