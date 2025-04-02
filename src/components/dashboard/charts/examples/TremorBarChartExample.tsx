import { Card, BarChart, Title } from "@tremor/react";
import { ChartComponentProps } from "@/types/dashboard";

export const TremorBarChartExample = ({ data, title, style }: ChartComponentProps) => {
  return (
    <Card className="w-full h-full">
      {title && <Title style={style}>{title}</Title>}
      <BarChart
        className="h-[calc(100%-2rem)] mt-4"
        data={data}
        index="name"
        categories={["value"]}
        colors={style?.colors || ["blue"]}
      />
    </Card>
  );
};