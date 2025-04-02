export interface ChartData {
  name: string;
  value: number;
  value2?: number;
  target?: number;
  z?: number;
  change?: number;
  changePeriod?: string;
}

export interface ChartStyle {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  colors?: string[];
}

export interface CanvasComponent {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  width?: number;
  height?: number;
  rotation?: number;
  title?: string;
  options?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  style?: ChartStyle;
  data?: ChartData[];
  comment?: string;
}

export interface Resolution {
  name: string;
  width: number;
  height: number;
}

export interface TemplateCategory {
  name: string;
  description: string;
  icon: string;
}

export interface Screen {
  id: string;
  name: string;
  components: CanvasComponent[];
  backgroundColor: string;
}

export interface ChartComponentProps {
  data?: ChartData[];
  title?: string;
  width?: number;
  height?: number;
  style?: ChartStyle;
}