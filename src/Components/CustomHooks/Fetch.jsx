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
    const string = await response.text();
    const data = string === "" ? {} : JSON.parse(string);
    const Status = response.status;
    if (Status >= 200 && Status < 300) {
      data.status = 'success'
    }
    console.log(data.message);
    setData(data)
    if (data.status !== 'success') {
      throw new Error(data.message)
    }
  } catch (error) {
    setErrorMessage(error.message)
    console.error(error)
  } finally {
    setLoading(false)
  }
}
