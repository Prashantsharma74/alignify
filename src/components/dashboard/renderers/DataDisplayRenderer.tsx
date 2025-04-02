import { CanvasComponent } from "@/types/dashboard";
import { TableComponent } from "../components/TableComponent";
import { tableData } from "@/data/defaultChartData";

interface DataDisplayRendererProps {
  component: CanvasComponent;
  width: number;
}

export const DataDisplayRenderer = ({ component, width }: DataDisplayRendererProps) => {
  if (component.type === 'table') {
    return (
      <TableComponent 
        data={component.data || tableData}
        title={component.title}
        width={width}
        style={component.style}
      />
    );
  }
  return null;
};