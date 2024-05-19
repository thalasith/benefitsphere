import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type CustomSelectProps = {
  placeholder: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  value,
  setValue,
  options,
}) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        setValue(value);
      }}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item, idx) => (
            <SelectItem key={idx} value={item ?? ""}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
