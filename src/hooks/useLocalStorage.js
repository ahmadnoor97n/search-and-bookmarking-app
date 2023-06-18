import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            const serializedValue = JSON.stringify(storedValue);
            window.localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error setting local storage for key "${key}":`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}
