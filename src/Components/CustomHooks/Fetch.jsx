export default async function Fetch({ url, setData, setLoading, setErrorMessage, method, body, Token, Type = 'json' }) {
  const headers = Type === 'json' ? { 'Content-Type': 'application/json' } : {};
  if (Token) headers.Authorization = `Bearer ${Token}`;
  const modifiedBody = Type === 'json' ? JSON.stringify(body) : body;
  try {
    if (setLoading) setLoading(true)
    const response = await fetch(url, {
      method,
      headers,
      body: modifiedBody
    })

    const string = await response.text();
    console.log(string);
    const data = string === "" ? {} : JSON.parse(string);

    if (!response.ok) {
      throw new Error(data.message)
    }
    if (setData) setData(data)
    
  } catch (error) {
    if (setErrorMessage) setErrorMessage(error.message)
    console.error(error)
  } finally {
    if (setLoading) setLoading(false)
  }
}