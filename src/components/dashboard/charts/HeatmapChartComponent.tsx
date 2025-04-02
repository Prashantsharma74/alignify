import { ChartComponentProps } from "@/types/dashboard";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';

const generateDefaultData = () => {
  const data = [];
  for (let row = 1; row <= 5; row++) {
    for (let col = 1; col <= 5; col++) {
      data.push({
        x: col,
        y: row,
        value: Math.floor(Math.random() * 100),
        name: `Cell ${row}-${col}`
      });
    }
  }
  return data;
};

export const HeatmapChartComponent = ({ data, width, height, title, style }: ChartComponentProps) => {
  const chartData = data?.length ? data : generateDefaultData();
  const effectiveHeight = height - (title ? 40 : 0);

  const getColor = (value: number) => {
    const colors = ['#EEF2FF', '#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8', '#6366F1'];
    const index = Math.floor((value / 100) * (colors.length - 1));
    return colors[Math.max(0, Math.min(index, colors.length - 1))];
  };

  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-[#F1F0FB] to-white rounded-lg shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-4 text-[#1A1F2C]" style={style}>{title}</h3>}
      <div style={{ width: width - 32, height: effectiveHeight - 32 }}>
        <ResponsiveContainer>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 40 }}
          >
            <XAxis 
              type="number" 
              dataKey="x" 
              name="column" 
              domain={[0, 6]}
              tickFormatter={(value) => `Col ${value}`}
              stroke="#6366F1"
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="row" 
              domain={[0, 6]}
              tickFormatter={(value) => `Row ${value}`}
              stroke="#6366F1"
            />
            <ZAxis 
              type="number" 
              dataKey="value" 
              range={[400, 400]} 
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5DEFF',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="text-[#1A1F2C]">{`Position: (${data.x}, ${data.y})`}</p>
                      <p className="text-[#818CF8] font-semibold">{`Value: ${data.value}`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter 
              data={chartData}
              shape={(props: any) => {
                const { cx, cy, payload } = props;
                return (
                  <rect
                    x={cx - 20}
                    y={cy - 20}
                    width={40}
                    height={40}
                    fill={getColor(payload.value)}
                    style={{ transition: 'fill 0.3s' }}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};