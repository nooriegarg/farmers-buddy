import { useState, useCallback } from 'react';

/**
 * Generic API hook — provides loading, error, data states + execute function.
 * Usage:
 *   const { data, loading, error, execute } = useApi(myService.getAll);
 *   useEffect(() => { execute(); }, [execute]);
 */
export const useApi = (apiFn, immediate = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFn(...args);
      const result = res.data?.data ?? res.data;
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, [apiFn]);

  return { data, loading, error, execute, setData };
};