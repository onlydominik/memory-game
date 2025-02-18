import { useEffect, useRef } from 'react';
import { DEFAULT_APP_TITLE } from '@utils/constants';
interface UseDocumentTitleOptions {
  prefix?: string;
  suffix?: string;
}

const useDocumentTitle = (
  title: string,
  options: UseDocumentTitleOptions = {}
) => {
  const { prefix = '', suffix = '' } = options;
  const previousTitleRef = useRef<string>(document.title);

  useEffect(() => {
    try {
      if (!previousTitleRef.current) {
        previousTitleRef.current = document.title;
      }

      const newTitle = [prefix, title || DEFAULT_APP_TITLE, suffix]
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

export { useDocumentTitle };
