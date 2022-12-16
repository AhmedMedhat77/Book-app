import { useEffect, useState } from "react";
const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout_id = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout_id);
    };
  }, [value, delay]);
  return debounceValue;
};
export default useDebounce;
