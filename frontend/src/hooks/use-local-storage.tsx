import { useMemo, useState, useEffect, Dispatch, SetStateAction } from "react";

/**
 * Like useState but persisting values in localStorage.
 * If there is no value in localstorage intially, then defaultValue will be used as fallback.
 *
 * @param localStorageKey - a key of localstorage
 * @param defaultValue - fallback to use if localstorage value is undefined
 */
export function useLocalStorage<T>(
  localStorageKey: string,
  defaultValue?: T,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const initialStorageValue: T | undefined = useMemo(() => {
    const initial = window.localStorage.getItem(localStorageKey);
    return initial ? JSON.parse(initial) : undefined;
  }, [localStorageKey]);

  const [value, setValue] = useState(initialStorageValue ?? defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      window.localStorage.setItem(localStorageKey, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(localStorageKey);
    }
  }, [value, localStorageKey]);

  return [value, setValue];
}
