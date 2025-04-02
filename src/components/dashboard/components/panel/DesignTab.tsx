import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus } from "lucide-react";

const backgroundColors = [
  { name: "White", value: "#FFFFFF" },
  { name: "Light Gray", value: "#F6F6F7" },
  { name: "Soft Blue", value: "#D3E4FD" },
  { name: "Soft Purple", value: "#E5DEFF" },
  { name: "Soft Pink", value: "#FFDEE2" },
];

const additionalColors = [
  { name: "Soft Green", value: "#F2FCE2" },
  { name: "Soft Yellow", value: "#FEF7CD" },
  { name: "Soft Orange", value: "#FEC6A1" },
  { name: "Soft Peach", value: "#FDE1D3" },
  { name: "Soft Gray", value: "#F1F0FB" },
];

const colorPalettes = {
  purple: {
    name: "Purple Vibes",
    colors: ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#8B5CF6']
  },
  ocean: {
    name: "Ocean Blues",
    colors: ['#0EA5E9', '#1EAEDB', '#33C3F0', '#D3E4FD', '#0FA0CE']
  },
  sunset: {
    name: "Sunset Warmth",
    colors: ['#F97316', '#FEC6A1', '#FDE1D3', '#FFDEE2', '#D946EF']
  }
};

interface DesignTabProps {
  onBackgroundColorChange?: (color: string) => void;
  currentBackgroundColor?: string;
  onPaletteChange?: (colors: string[]) => void;
}

export const DesignTab = ({ 
  onBackgroundColorChange,
  currentBackgroundColor = "#FFFFFF",
  onPaletteChange
}: DesignTabProps) => {
  const [showAdditionalColors, setShowAdditionalColors] = useState(false);

  const handleColorSelect = (color: string) => {
    if (onBackgroundColorChange) {
      onBackgroundColorChange(color);
      const selectedColor = [...backgroundColors, ...additionalColors].find(bg => bg.value === color);
      toast.success(`Background color updated to ${selectedColor?.name || 'Custom color'}`);
    }
  };

  const handlePaletteSelect = (paletteKey: string) => {
    const palette = colorPalettes[paletteKey as keyof typeof colorPalettes];
    if (palette && onPaletteChange) {
      onPaletteChange(palette.colors);
      toast.success(`Color palette updated to ${palette.name}`);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Background Color</h3>
          <div className="grid grid-cols-3 gap-2">
            {backgroundColors.map((color) => (
              <Button
                key={color.value}
                variant="outline"
                className={`h-16 relative group ${currentBackgroundColor === color.value ? 'ring-2 ring-primary' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => handleColorSelect(color.value)}
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                  {color.name}
                </span>
              </Button>
            ))}
            <Button
              variant="outline"
              className="h-16 flex items-center justify-center"
              onClick={() => setShowAdditionalColors(!showAdditionalColors)}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>

          {showAdditionalColors && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {additionalColors.map((color) => (
                <Button
                  key={color.value}
                  variant="outline"
                  className={`h-16 relative group ${currentBackgroundColor === color.value ? 'ring-2 ring-primary' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleColorSelect(color.value)}
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                    {color.name}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Graph Color Palettes</h3>
          <Select onValueChange={handlePaletteSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a color palette for graphs" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(colorPalettes).map(([key, palette]) => (
                <SelectItem key={key} value={key}>
                  {palette.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </ScrollArea>
  );
};