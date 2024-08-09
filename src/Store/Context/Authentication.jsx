import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie';

export const AuthenticationContext = createContext()

export default function AuthenticationProvider({ children }) {
  const [isLogedIn, setIsLogedIn] = useState(true)
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [userImg, setUserImg] = useState('https://ik.imagekit.io/nyep6gibl/default.jpg?updatedAt=1718367419170')
  const [Token, setToken] = useState(Cookies.get('token'));
  useEffect(() => {
    if (!isLogedIn) {
      Cookies.remove('token');
      setToken('');
      setUserName('');
      setUserImg('');
      setRole('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setGender('');
      setDob('');
    } else {
      Cookies.set('token', Token, { expires: 7 });
    }
  }, [isLogedIn])

  return (
    <AuthenticationContext.Provider value={{
      isLogedIn, setIsLogedIn,
      Token, setToken,
      userName, setUserName,
      firstName, setFirstName,
      lastName, setLastName,
      userImg, setUserImg,
      role, setRole,
      email, setEmail,
      gender, setGender,
      dob, setDob
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
