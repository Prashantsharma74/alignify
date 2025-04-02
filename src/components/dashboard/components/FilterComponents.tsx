import { addDays, format, subWeeks, subMonths, subYears } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterComponentsProps {
  title?: string;
  options?: string[];
  dateRange?: { start: string; end: string };
  width?: number;
  type: 'dropdown' | 'relative-date' | 'date-range';
  style?: {
    fontFamily?: string;
    color?: string;
    fontSize?: string;
  };
}

type TimeUnit = 'days' | 'weeks' | 'months' | 'years';

export const FilterComponents = ({ title, options, type, style }: FilterComponentsProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [timeValue, setTimeValue] = useState<number>(3);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('months');

  const handleTimeRangeChange = (value: number, unit: TimeUnit) => {
    const to = new Date();
    let from: Date;

    switch (unit) {
      case 'weeks':
        from = subWeeks(to, value);
        break;
      case 'months':
        from = subMonths(to, value);
        break;
      case 'years':
        from = subYears(to, value);
        break;
      case 'days':
        from = addDays(to, -value);
        break;
      default:
        from = subMonths(to, value);
    }

    setDate({ from, to });
  };

  const handleTimeValueChange = (value: number) => {
    setTimeValue(value);
    handleTimeRangeChange(value, timeUnit);
  };

  const handleTimeUnitChange = (unit: TimeUnit) => {
    setTimeUnit(unit);
    handleTimeRangeChange(timeValue, unit);
  };

  const titleStyle = {
    fontFamily: style?.fontFamily || 'Inter',
    color: style?.color || 'inherit',
    fontSize: style?.fontSize || '14px',
  };

  if (type === 'dropdown') {
    return (
      <div className="w-full">
        {title && <h3 className="text-sm font-medium mb-2" style={titleStyle}>{title}</h3>}
        <select className="w-full p-2 border rounded-md bg-background" style={style}>
          {options?.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          )) || <option>Select an option</option>}
        </select>
      </div>
    );
  }

  if (type === 'relative-date') {
    return (
      <div className="w-full space-y-4">
        {title && <h3 className="text-sm font-medium mb-2" style={titleStyle}>{title}</h3>}
        <div className="flex items-center gap-2">
          <Label>Last</Label>
          <Input
            type="number"
            min={1}
            max={999}
            value={timeValue}
            onChange={(e) => handleTimeValueChange(parseInt(e.target.value) || 1)}
            className="w-20"
          />
          <Select value={timeUnit} onValueChange={(value: TimeUnit) => handleTimeUnitChange(value)}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="days">Days</SelectItem>
              <SelectItem value="weeks">Weeks</SelectItem>
              <SelectItem value="months">Months</SelectItem>
              <SelectItem value="years">Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {title && <h3 className="text-sm font-medium mb-2" style={titleStyle}>{title}</h3>}
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
