import { CanvasComponent } from "@/types/dashboard";
import { ChartRenderer } from "./ChartRenderer";
import { DataDisplayRenderer } from "./DataDisplayRenderer";
import { FilterComponents } from "../components/FilterComponents";
import { TextComponents } from "../components/TextComponents";
import { LineSeparator } from "../components/LineSeparator";
import { ScorecardComponent } from "../charts/ScorecardComponent";

interface ComponentRendererProps {
  component: CanvasComponent;
  width: number;
  height: number;
}

export const ComponentRenderer = ({ component, width, height }: ComponentRendererProps) => {
  switch (component.type) {
    case 'scorecard':
      return (
        <ScorecardComponent
          title={component.title}
          data={component.data}
          style={component.style}
          width={width}
          height={height}
        />
      );
    case 'title':
      return (
        <TextComponents 
          type={component.type}
          title={component.title}
          style={component.style}
          width={width}
          height={height}
        />
      );
    case 'line-separator':
      return (
        <LineSeparator 
          width={width}
          rotation={component.rotation}
          style={component.style}
        />
      );
    case 'dropdown':
    case 'relative-date':
    case 'date-range':
      return (
        <FilterComponents 
          type={component.type}
          title={component.title}
          options={component.options}
          dateRange={component.dateRange}
          width={width}
        />
      );
    case 'line-chart':
    case 'area-chart':
    case 'bar-chart':
    case 'column-chart':
    case 'stacked-bar':
    case 'pie-chart':
    case 'bubble':
    case 'funnel':
    case 'gauge':
      return <ChartRenderer component={component} width={width} height={height} />;
    case 'table':
      return <DataDisplayRenderer component={component} width={width} />;
    default:
      return null;
  }
};