import { useState, useEffect, useMemo } from 'react';
import { FetchRequest, FetchResult } from '../types';

const useFetch = <T,>(
  requests: FetchRequest<T> | FetchRequest<T>[]
): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Record<keyof T, unknown> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const memoizedRequests = useMemo(() => {
    return Array.isArray(requests) ? requests : [requests];
  }, [JSON.stringify(requests)]);

  useEffect(() => {
    const fetchSingleRequest = async (
      request: FetchRequest<T>,
      results: Partial<T>,
      errors: Record<keyof T, unknown>
    ) => {
      try {
        const response = await fetch(request.url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();

        results[request.key as keyof T] = responseData as T[keyof T];
      } catch (err: unknown) {
        errors[request.key as keyof T] = err;
      }
    };

    const fetchData = async (): Promise<void> => {
      const results: Partial<T> = {};
      const errors: Record<keyof T, unknown> = {} as Record<keyof T, unknown>;

      await Promise.all(
        memoizedRequests.map(async (request) => {
          await fetchSingleRequest(request, results, errors);
        })
      );
      if (Object.keys(results).length === 0 && Object.keys(errors).length > 0) {
        console.error('All requests failed:', errors);
      }
      setData(Object.keys(results).length > 0 ? (results as T) : null);
      setError(Object.keys(errors).length > 0 ? errors : null);
      setLoading(false);
    };

    if (memoizedRequests.length > 0) {
      fetchData();
    }
  }, [memoizedRequests]);

  return { data, error, loading };
};

export { useFetch };
