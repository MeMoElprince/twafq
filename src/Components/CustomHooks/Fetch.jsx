export default async function Fetch({ url, setData, setLoading, setErrorMessage, method, body, Token, Type = 'json' }) {
  const headers = Type === 'json' ? { 'Content-Type': 'application/json' } : {};
  if (Token) headers.Authorization = `Bearer ${Token}`;
  const modifiedBodyy = Type === 'json' ? JSON.stringify(body) : body;
  try {
    const response = await fetch(url, {
      method,
      headers,
      body: modifiedBodyy
    })

    console.log(response);
    
    const msg = response.text();

    setData(response.ok)
    if (!response.ok) {
      throw new Error(msg || 'An error occurred')
    }else{
      console.log(msg);
    }
  } catch (error) {
    setErrorMessage(error.message || 'An unknown error occurred')
    console.error(error)
  } finally {
    setLoading(false)
  }
}
