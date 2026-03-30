import { useState, useEffect } from "react";
/**
 * The useLocal hook is a custom React hook that manages a piece of state that is synchronized with localStorage. It stores and retrieves values from localStorage while keeping the React state in sync.
 * 
 * @param key - The key under which the value will be stored in localStorage. 
 * @param initialValue - The initial value to use if there is no existing value in localStorage for the given key. Defaults to null. 
 * @returns {Array} An array containing the current value and a function to update it, similar to the useState hook. 
 */
const useLocal = (key, initialValue = null) => {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        console.debug("useLocal effect triggered", { key, value });

        if (value === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocal;