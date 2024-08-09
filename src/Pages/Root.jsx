import { useState, useEffect, useContext } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../Components/NavBar/NavBar"
import useFetch from '../Components/CustomHooks/useFetch'
import { MyDataUrl } from '../Store/urls';
import Cookies from "js-cookie";
import { AuthenticationContext } from "../Store/Context/Authentication";
import { BackDropContext } from "../Store/Context/BackDrop";
import BackdropHolder from "../Components/Ui-Components/BackdropHolder";

export default function Root() {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    setIsLogedIn, setUserName, setUserImg, setRole,
    setFirstName, setLastName, setEmail, setGender,
    setDob
  } = useContext(AuthenticationContext)
  const { BackDropType, setBackDropType, BackDropActive, setBackDropActive } = useContext(BackDropContext)
  const { data } = useFetch({
    url: MyDataUrl(),
    method: 'GET',
    setErrorMessage,
    Token: Cookies.get('token'),
  })

  useEffect(() => {
    if (!data) return;
    if (data.status === 'success') {
      setIsLogedIn(true)
      setUserName(data.data.user.user_name)
      setUserImg(data.data.user.image_url)
      setRole(data.data.user.role)
      setFirstName(data.data.user.first_name)
      setLastName(data.data.user.last_name)
      setEmail(data.data.user.email)
      setGender(data.data.user.gender)
      const dob = data.data.user.dob
      const date = dob ? new Date(dob).toISOString().slice(0, 10) : ''
      setDob(date)
    } else {
      setIsLogedIn(false)
    }
  }, [data])

  useEffect(() => {
    if (BackDropActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }
  }, [BackDropActive])

  const BackDropStyle =
    BackDropActive ? 'opacity-30 imgSettings' : ''
  return (
    <main className="bg-Black">
      <NavBar />
      <div onClick={() => { setBackDropActive(false) }}>
        <div className={BackDropStyle}>
          <Outlet />
        </div>
      </div>
      <div>
        <BackdropHolder />
      </div>
    </main>
  )
}
