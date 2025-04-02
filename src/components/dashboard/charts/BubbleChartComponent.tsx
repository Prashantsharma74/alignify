import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartComponentProps } from '@/types/dashboard';

const generateDefaultData = () => [
  { name: 'Group A', x: 10, y: 15, z: 800 },
  { name: 'Group B', x: 25, y: 8, z: 400 },
  { name: 'Group C', x: 40, y: 10, z: 600 },
  { name: 'Group D', x: 55, y: 12, z: 300 },
  { name: 'Group E', x: 70, y: 14, z: 200 }
];

export const BubbleChartComponent = ({ title, width, height, style }: ChartComponentProps) => {
  const chartData = generateDefaultData();
  const effectiveHeight = height - (title ? 40 : 0);

  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-[#F1F0FB] to-white rounded-lg shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-4 text-[#1A1F2C]" style={style}>Title goes here</h3>}
      <div style={{ width: width - 32, height: effectiveHeight - 32 }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="x" 
              domain={[0, 80]}
              label={{ value: 'X Axis', position: 'bottom' }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="y" 
              domain={[0, 30]}
              label={{ value: 'Y Axis', angle: -90, position: 'left' }}
            />
            <ZAxis type="number" dataKey="z" range={[100, 1000]} />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p>{`Name: ${data.name}`}</p>
                      <p>{`X: ${data.x}`}</p>
                      <p>{`Y: ${data.y}`}</p>
                      <p>{`Size: ${data.z}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter 
              data={chartData} 
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};