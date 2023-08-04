import { useCallback } from 'react';

type JsonDataType = Template[];

const useJsonExport = () => {
  const exportToJsonFile = useCallback((data: JsonDataType, filename: string = 'Prompt_Template.json') => {
    if (!data) {
      throw new Error('Export data cannot be empty!');
    }

    if (!filename.endsWith('.json')) {
      filename += '.json';
    }

    const jsonString: string = JSON.stringify(data, null, 2);
    const blob: Blob = new Blob([jsonString], { type: 'application/json' });
    const url: string = URL.createObjectURL(blob);

    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 0);
  }, []);

  return { exportToJsonFile };
};

export default useJsonExport;
