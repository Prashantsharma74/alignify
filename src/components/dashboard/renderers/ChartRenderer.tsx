import { CanvasComponent } from "@/types/dashboard";
import { LineChartComponent } from "../charts/LineChartComponent";
import { AreaChartComponent } from "../charts/AreaChartComponent";
import { StackedBarComponent } from "../charts/StackedBarComponent";
import { BarChartComponent } from "../charts/BarChartComponent";
import { PieChartComponent } from "../charts/PieChartComponent";
import { BubbleChartComponent } from "../charts/BubbleChartComponent";
import { FunnelChartComponent } from "../charts/FunnelChartComponent";
import { GaugeChartComponent } from "../charts/GaugeChartComponent";
import { HeatmapChartComponent } from "../charts/HeatmapChartComponent";
import { GeoMapComponent } from "../charts/GeoMapComponent";
import { defaultChartData } from "@/data/defaultChartData";

interface ChartRendererProps {
  component: CanvasComponent;
  width: number;
  height: number;
}

export const ChartRenderer = ({ component, width, height }: ChartRendererProps) => {
  console.log("ChartRenderer props:", { component, width, height });

  const commonProps = {
    title: component.title,
    width,
    height,
    style: component.style,
    data: component.data || defaultChartData
  };

  console.log("Chart common props:", commonProps);

  switch (component.type) {
    case 'line-chart':
      return <LineChartComponent {...commonProps} />;
    case 'area-chart':
      return <AreaChartComponent {...commonProps} />;
    case 'column-chart':
    case 'bar-chart':
      return (
        <BarChartComponent 
          {...commonProps}
          isVertical={component.type === 'column-chart'}
        />
      );
    case 'stacked-bar':
      return <StackedBarComponent {...commonProps} />;
    case 'pie-chart':
      return <PieChartComponent {...commonProps} />;
    case 'donut':
      return <PieChartComponent {...commonProps} isDonut={true} />;
    case 'bubble':
      return <BubbleChartComponent {...commonProps} />;
    case 'funnel':
      return <FunnelChartComponent {...commonProps} />;
    case 'gauge':
      return <GaugeChartComponent {...commonProps} />;
    case 'heatmap':
      return <HeatmapChartComponent {...commonProps} />;
    case 'geomap':
      return <GeoMapComponent {...commonProps} />;
    default:
      console.warn("Unknown chart type:", component.type);
      return null;
  }
};