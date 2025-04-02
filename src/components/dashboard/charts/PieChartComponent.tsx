import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ChartComponentProps } from '@/types/dashboard';

const DEFAULT_COLORS = ['#6366F1', '#818CF8', '#A5B4FC', '#60A5FA', '#3B82F6'];

interface PieChartProps extends ChartComponentProps {
  isDonut?: boolean;
}

export const PieChartComponent = ({ data, title, style, width, height, isDonut }: PieChartProps) => {
  const chartData = data?.length ? data : [];
  const effectiveHeight = height - (title ? 40 : 0);
  const colors = style?.colors || DEFAULT_COLORS;

  console.log('Pie Chart Style:', style);
  console.log('Pie Chart Colors:', colors);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-4 text-[#1A1F2C]" style={style}>{title}</h3>}
      <div style={{ width: width - 32, height: effectiveHeight - 32 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              innerRadius={isDonut ? "60%" : 0}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #E5DEFF',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.8)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};