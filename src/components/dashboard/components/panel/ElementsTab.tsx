import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { textComponents } from "./TextComponents";
import { filterComponents } from "./FilterComponents";
import { graphComponents } from "./GraphComponents";
import { dataDisplayComponents } from "./DataDisplayComponents";

const components = [
  textComponents,
  filterComponents,
  graphComponents,
  dataDisplayComponents,
];

interface ElementsTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ElementsTab = ({ searchQuery, setSearchQuery }: ElementsTabProps) => {
  const onDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("componentType", componentType);
  };

  const filteredComponents = components.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <>
      <div className="p-4 border-b">
        <div className="flex items-center space-x-2 mb-4">
          <h2 className="text-lg font-semibold">Elements</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Find any element" 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <TooltipProvider>
          <div className="p-4 space-y-6">
            {filteredComponents.map((category) => (
              <div key={category.category} className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {category.category}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, item.id)}
                      className="relative flex flex-col items-center gap-2 p-3 rounded-lg cursor-move hover:bg-accent transition-colors border bg-background aspect-square group"
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="absolute top-1 right-1 p-1 rounded-full hover:bg-accent">
                            <Info className="h-3 w-3 text-muted-foreground" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[200px]">
                          <p>{item.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                      <item.icon 
                        className="w-6 h-6 stroke-[1.5] transition-transform group-hover:scale-110" 
                        style={{ color: item.color }}
                      />
                      <span className="text-xs font-medium text-center">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
              </div>
            ))}
            {filteredComponents.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No elements found matching "{searchQuery}"
              </div>
            )}
          </div>
        </TooltipProvider>
      </ScrollArea>
    </>
  );
};