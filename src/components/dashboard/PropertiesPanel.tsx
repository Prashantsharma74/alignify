import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface PropertiesPanelProps {
  selectedComponent: any;
  onUpdateProperties: (properties: any) => void;
  onRemoveComponent?: (id: string) => void;
}

const fontFamilies = [
  'Inter',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
];

const comparisonPeriods = [
  'vs Pre Month',
  'vs Pre Week',
  'vs Pre Year'
];

export const PropertiesPanel = ({ selectedComponent, onUpdateProperties, onRemoveComponent }: PropertiesPanelProps) => {
  if (!selectedComponent) {
    return (
      <Card className="h-full w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ScrollArea className="h-full">
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              Select a component to edit its properties
            </p>
          </div>
        </ScrollArea>
      </Card>
    );
  }

  const handleChange = (key: string, value: any) => {
    onUpdateProperties({ [key]: value });
  };

  const handleStyleChange = (key: string, value: any) => {
    const currentStyle = selectedComponent.style || {};
    onUpdateProperties({
      style: {
        ...currentStyle,
        [key]: value,
      },
    });
  };

  const handleAddOption = () => {
    const newOptions = [...(selectedComponent.options || []), `Option ${(selectedComponent.options?.length || 0) + 1}`];
    handleChange('options', newOptions);
  };

  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...(selectedComponent.options || [])];
    newOptions[index] = value;
    handleChange('options', newOptions);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = selectedComponent.options.filter((_: string, i: number) => i !== index);
    handleChange('options', newOptions);
  };

  const handleUpdateStepName = (index: number, value: string) => {
    const newData = [...(selectedComponent.data || [])];
    newData[index] = { ...newData[index], name: value };
    handleChange('data', newData);
  };

  const handleUpdateDataValue = (index: number, value: number, key: string = 'value') => {
    const newData = [...(selectedComponent.data || [])];
    newData[index] = { ...newData[index], [key]: value };
    handleChange('data', newData);
  };

  const renderChartDataProperties = () => (
    <div className="space-y-4">
      <div>
        <Label>Chart Data Points</Label>
        <div className="space-y-2 mt-2">
          {selectedComponent.data?.map((point: any, index: number) => (
            <div key={index} className="flex gap-2">
              <Input
                value={point.name}
                onChange={(e) => handleUpdateStepName(index, e.target.value)}
                placeholder={`Label ${index + 1}`}
              />
              <Input
                type="number"
                value={point.value}
                onChange={(e) => handleUpdateDataValue(index, Number(e.target.value))}
                placeholder="Value"
                className="w-24"
              />
              {(selectedComponent.type === 'bubble' || selectedComponent.type === 'scatter') && (
                <Input
                  type="number"
                  value={point.value2}
                  onChange={(e) => handleUpdateDataValue(index, Number(e.target.value), 'value2')}
                  placeholder="Value 2"
                  className="w-24"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFunnelProperties = () => (
    <div className="space-y-4">
      <div>
        <Label>Funnel Steps</Label>
        <div className="space-y-2 mt-2">
          {selectedComponent.data?.map((step: any, index: number) => (
            <div key={index} className="flex gap-2">
              <Input
                value={step.name}
                onChange={(e) => handleUpdateStepName(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
              />
              <Input
                type="number"
                value={step.value}
                onChange={(e) => handleUpdateDataValue(index, Number(e.target.value))}
                placeholder="Value"
                className="w-24"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStyleProperties = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fontFamily">Font Family</Label>
        <Select
          value={selectedComponent.style?.fontFamily || 'Inter'}
          onValueChange={(value) => handleStyleChange('fontFamily', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font family" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="color">Color</Label>
        <Input
          id="color"
          type="color"
          value={selectedComponent.style?.color || '#000000'}
          onChange={(e) => handleStyleChange('color', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="fontSize">Font Size</Label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const currentSize = parseInt(selectedComponent.style?.fontSize || '16');
              handleStyleChange('fontSize', `${Math.max(8, currentSize - 2)}px`);
            }}
          >
            -
          </Button>
          <div className="flex-1 text-center">
            {parseInt(selectedComponent.style?.fontSize || '16')}px
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const currentSize = parseInt(selectedComponent.style?.fontSize || '16');
              handleStyleChange('fontSize', `${Math.min(72, currentSize + 2)}px`);
            }}
          >
            +
          </Button>
        </div>
      </div>
      <div>
        <Label>Text Alignment</Label>
        <Select
          value={selectedComponent.style?.textAlign || 'left'}
          onValueChange={(value) => handleStyleChange('textAlign', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderLineProperties = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="rotation">Rotation (degrees)</Label>
        <Input
          id="rotation"
          type="number"
          min="0"
          max="360"
          value={selectedComponent.rotation || 0}
          onChange={(e) => handleChange('rotation', parseInt(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="lineColor">Line Color</Label>
        <Input
          id="lineColor"
          type="color"
          value={selectedComponent.style?.color || '#e5e7eb'}
          onChange={(e) => handleStyleChange('color', e.target.value)}
        />
      </div>
    </div>
  );

  const renderDropdownProperties = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Dropdown Options</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddOption}
          className="h-8 px-2"
        >
          <Plus className="h-4 w-4" />
          Add Option
        </Button>
      </div>
      <div className="space-y-2">
        {selectedComponent.options?.map((option: string, index: number) => (
          <div key={index} className="flex gap-2">
            <Input
              value={option}
              onChange={(e) => handleUpdateOption(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveOption(index)}
              className="h-10 w-10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScorecardProperties = () => (
    <div className="space-y-4">
      <div>
        <Label>Value</Label>
        <Input
          type="number"
          value={selectedComponent.data?.[0]?.value || 0}
          onChange={(e) => {
            const newData = [...(selectedComponent.data || [])];
            if (newData[0]) {
              newData[0] = { ...newData[0], value: Number(e.target.value) };
            } else {
              newData[0] = { name: 'Current', value: Number(e.target.value) };
            }
            handleChange('data', newData);
          }}
        />
      </div>
      <div>
        <Label>Change Amount</Label>
        <Input
          type="number"
          value={selectedComponent.data?.[0]?.change || 0}
          onChange={(e) => {
            const newData = [...(selectedComponent.data || [])];
            if (newData[0]) {
              newData[0] = { ...newData[0], change: Number(e.target.value) };
            }
            handleChange('data', newData);
          }}
        />
      </div>
      <div>
        <Label>Comparison Period</Label>
        <Select
          value={selectedComponent.data?.[0]?.changePeriod || comparisonPeriods[0]}
          onValueChange={(value) => {
            const newData = [...(selectedComponent.data || [])];
            if (newData[0]) {
              newData[0] = { ...newData[0], changePeriod: value };
            }
            handleChange('data', newData);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select comparison period" />
          </SelectTrigger>
          <SelectContent>
            {comparisonPeriods.map((period) => (
              <SelectItem key={period} value={period}>
                {period}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <Card className="h-full w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4 min-w-[240px]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Properties</h2>
            <button
              onClick={() => onRemoveComponent?.(selectedComponent.id)}
              className="px-2 py-1 text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Component Name</Label>
              <Input
                id="title"
                placeholder="Enter component name"
                value={selectedComponent.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
              />
            </div>

            {selectedComponent.type === 'scorecard' && renderScorecardProperties()}
            {['title'].includes(selectedComponent.type) && renderStyleProperties()}
            {selectedComponent.type === 'line-separator' && renderLineProperties()}
            {selectedComponent.type === 'dropdown' && (
              <>
                {renderDropdownProperties()}
                {renderStyleProperties()}
              </>
            )}
            {selectedComponent.type === 'funnel' && (
              <>
                {renderFunnelProperties()}
                {renderStyleProperties()}
              </>
            )}
            {['line-chart', 'area-chart', 'column-chart', 'bar-chart', 'pie-chart', 'stacked-bar', 'bubble', 'scatter'].includes(selectedComponent.type) && (
              <>
                {renderChartDataProperties()}
                {renderStyleProperties()}
              </>
            )}
            {['target', 'table', 'date-range', 'relative-date'].includes(selectedComponent.type) && renderStyleProperties()}
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};
