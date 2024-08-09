import { useState, useEffect } from 'react'

export default function useFetch({ url, setErrorMessage, method, body, Token }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const headers = {
    'Content-Type': 'application/json',
  }
  if (Token) headers.Authorization = `Bearer ${Token}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url, {
          method: method,
          headers,
          body: JSON.stringify(body)
        })
        const string = await response.text();
        const data = string === "" ? {} : JSON.parse(string);
        const Status = response.status;
        if (Status >= 200 && Status < 300) {
          data.status = 'success'
        }

        setData(data)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
      } catch (error) {
        if(setErrorMessage)
          setErrorMessage(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading }
}
