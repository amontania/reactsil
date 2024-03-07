import { useState, useEffect, ComponentProps } from "react";

type FilterProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<ComponentProps<"input">, "value" | "onChange">;

const Filter = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: FilterProps) => {
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  console.log(debouncedValue);

  useEffect(() => {
    setDebouncedValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(debouncedValue);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debouncedValue]);

  return (
    <div className="flex w-80 items-center gap-4 rounded border px-3 py-3.5">
      <svg xmlns="http://www.w3.org/2000/svg" width="24"
       height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" > <circle cx="11" cy="11" r="8" /> <path d="m21 21-4.3-4.3" /></svg>
      <input
        {...props}
        className="w-full border-0 p-0 ring-0 focus:outline-none focus:ring-0 text-black"
        value={debouncedValue}
        onChange={(e) => setDebouncedValue(e.target.value)}
      />
    </div>
  );
};

export default Filter;