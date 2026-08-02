import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/shadcn/select/Select";

type SelectFieldProps<
  T,
  TValue extends keyof T,
  TLabel extends keyof T
> = {
  label: string;
  placeholder: string;
  items: T[];
  valueKey: TValue;
  labelKey: TLabel;
};

export default function SelectField<
  T,
  TValue extends keyof T,
  TLabel extends keyof T
>({
  label,
  placeholder,
  items,
  valueKey,
  labelKey,
}: SelectFieldProps<T, TValue, TLabel>) {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>

          {items.map((item) => (
            <SelectItem
              key={String(item[valueKey])}
              value={String(item[valueKey])}
            >
              {String(item[labelKey])}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}