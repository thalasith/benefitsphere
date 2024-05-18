"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type DatePickerProps = {
  date: Date;
  setDate: (date: Date) => void;
};

// export default const DatePicker: React.FC<DatePickerProps> = ({date, setDate}) =>  {
export const DatePicker: React.FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[160px] justify-start text-left font-normal text-primary",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 text-primary">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => setDate(e!)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
