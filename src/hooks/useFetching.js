import { useState } from 'react';

export const useFetching = cb => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetching = async () => {
    try {
      setLoading(true);
      await cb();
    } catch (error) {
      setError(error.messege);
    } finally {
      setLoading(false);
    }
  };

  return [fetching, loading, error];
};
