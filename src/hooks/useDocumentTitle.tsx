import { useEffect, useRef } from 'react';

interface UseDocumentTitleOptions {
  prefix?: string;
  suffix?: string;
}

export const useDocumentTitle = (
  title: string,
  options: UseDocumentTitleOptions = {}
) => {
  const { prefix = '', suffix = '' } = options;
  const defaultTitle = 'MIND MELD';
  const previousTitleRef = useRef<string>(document.title);

  useEffect(() => {
    try {
      if (!previousTitleRef.current) {
        previousTitleRef.current = document.title;
      }

      const newTitle = [prefix, title || defaultTitle, suffix]
        .filter(Boolean)
        .join(' ');

      document.title = newTitle;

      return () => {
        document.title = previousTitleRef.current;
      };
    } catch (error) {
      console.error('Error setting document title:', error);
    }
  }, [title, prefix, suffix]);
};
