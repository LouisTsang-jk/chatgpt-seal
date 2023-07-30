import { useState, useEffect } from 'react';

function useStorage<T>(key: string): [T | null, (newData: T) => void] {
  const [data, setData] = useState<T | null>(null);
  const isChromeExtension = !!chrome?.storage?.local;

  useEffect(() => {
    if (isChromeExtension) {
      chrome.storage.local.get(key).then((result) => {
        setData(result[key] as T);
      });
    } else {
      const localData = localStorage.getItem(key);
      setData(localData ? JSON.parse(localData) as T : null);
    }
  }, [key, isChromeExtension]);

  const setStorageData = (newData: T) => {
    if (isChromeExtension) {
      chrome.storage.local.set({ [key]: newData }).then(() => {
        setData(newData);
      });
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
      setData(newData);
    }
  };
  return [data, setStorageData];
}

export default useStorage;
