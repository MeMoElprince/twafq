import { useState, useEffect } from 'react';

export default function useFetch({ url, setErrorMessage, setTotalPages, method = 'GET', body, Token, reRender = 1 }) {
  const [retData, setRetData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (Token) headers.Authorization = `Bearer ${Token}`;
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const options = {
          method,
          headers,
        };

        if (body && (method !== 'GET' && method !== 'HEAD')) {
          options.body = JSON.stringify(body);
        }
        
        const response = await fetch(url, options);
        
        // console.log(response)
        const string = await response.text();
        // console.log(string)
        const data = string ? JSON.parse(string) : {};
        
        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong');
        }
        // console.log(data)
        setRetData((data?.content !== undefined && data?.content) || data);

        if(setTotalPages)
            setTotalPages(data.totalPages)

      } catch (error) {
        if (setErrorMessage) setErrorMessage(error.message);
        // console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, reRender, method, body]);

  return { retData, loading };
}
