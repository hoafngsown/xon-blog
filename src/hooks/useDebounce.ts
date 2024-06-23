import { useEffect, useState } from "react";

const useDebounce = (value: any, delay: number) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [debouncedValue, setDebouncedValue] = useState<any>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return debouncedValue;
};

export default useDebounce;
