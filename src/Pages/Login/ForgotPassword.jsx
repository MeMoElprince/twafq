import { useState } from "react"
import Styles from './Styling.module.css'
import { useNavigate } from "react-router-dom"
import { ResetPassword, ForgetPassword } from '../../Store/urls'

export default function ForgotPassword({ setLoginType }) {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [Type, setType] = useState('enterEmail')

  return (
    <>
      {Type === 'enterEmail' && <EnterEmail email={email} setEmail={setEmail} setType={setType} loading={loading} setLoading={setLoading} />}

      {Type === 'enterPassword' && <EnterPassword setLoginType={setLoginType} email={email} code={code} setCode={setCode} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} setType={setType} loading={loading} setLoading={setLoading} />}
    </>
  )
}

const EnterEmail = ({ email, setEmail, setType, loading, setLoading }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(ForgetPassword(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      })
      const data = await response.json()
      if (data.status !== 'success') {
        throw new Error(data.message)
      } else {
        setType('enterPassword')
      }
    } catch (error) {
      setErrorMessage(error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-10">
      <h2 className='text-center Title text-Black EBGaramond text-4xl'>Change password</h2>
      <div className={`${Styles.inputHolder} relative w-full`}>
        <input
          id='userEmail'
          type="email"
          onChange={handleChange}
          name="email"
          placeholder='Email'
          value={email}
          className={`Fredoka w-full py-2 px-3 border-b-[3px] ${email ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
        />
        <label htmlFor='userEmail' className="inputLabel absolute top-[15px] left-2 text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 Fredoka text-lg w-[100%]"
        >Email</label>
      </div>

      <button type='submit' className={`${Styles.loginBtnAnimate} bg-Black Fredoka text-White text-[22px] w-[100%] py-[14px] rounded-[20px]
                relative overflow-hidden inline-block z-10
                transition-all duration-300 ease-in-out
                focus:outline-none
                hover:py-[13px] hover:my-[1px]
                before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
                before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
                before:transition-all before:duration-300 before:ease-in-out
                hover:before:left-0 
                ${loading ? 'cursor-wait before:left-[0] my-[1px] py-[13px]' : 'cursor-pointer before:left-[-100%] my-0 py-[14px]'} `}>
        Send code
      </button>
      {errorMessage && <p className='text-center text-red-500 font-bold'>{errorMessage}</p>}
    </form>
  )
}

const EnterPassword = ({ setLoginType, email, code, setCode, password, setPassword, confirmPassword, setConfirmPassword, loading, setLoading }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const handleChangeA = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeB = (e) => {
    setConfirmPassword(e.target.value)
  }
  const handleChange = (e) => {
    setCode(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(ResetPassword(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          secretToken: code,
          password,
          password_confirm: confirmPassword
        })
      })
      const data = await response.json()
      if (data.status !== 'success') {
        throw new Error(data.message)
      } else {
        setLoginType('login')
      }
    } catch (error) {
      setErrorMessage(error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-10">
      <h2 className='text-center Title text-Black EBGaramond text-4xl'>Change password</h2>
      <div className={`${Styles.inputHolder} relative w-full`}>
        <input
          id='userCode'
          type="text"
          onChange={handleChange}
          name="text"
          placeholder='code'
          value={code}
          className={`Fredoka w-full py-2 px-3 border-b-[3px] ${code ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
        />
        <label htmlFor='userEmail' className="inputLabel absolute top-[15px] left-2 text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 Fredoka text-lg w-[100%]"
        >code sent to email</label>
      </div>
      <div className={`${Styles.inputHolder} relative w-full`}>
        <input
          id='userPassword'
          type="password"
          onChange={handleChangeA}
          name="password"
          placeholder='password'
          value={password}
          className={`Fredoka w-full py-2 px-3 border-b-[3px] ${password ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
          style={{
            fontFamily: 'Verdana',
            letterSpacing: '0.125em',
          }}
        />
        <label htmlFor='userEmail' className="inputLabel absolute top-[15px] left-2 text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 Fredoka text-lg w-[100%]"
        >password</label>
      </div>
      <div className={`${Styles.inputHolder} relative w-full`}>
        <input
          id='userConfirmPassword'
          type="password"
          onChange={handleChangeB}
          name="password"
          placeholder='password'
          value={confirmPassword}
          className={`Fredoka w-full py-2 px-3 border-b-[3px] ${confirmPassword ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
          style={{
            fontFamily: 'Verdana',
            letterSpacing: '0.125em',
          }}
        />
        <label htmlFor='userEmail' className="inputLabel absolute top-[15px] left-2 text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 Fredoka text-lg w-[100%]"
        >confirm password</label>
      </div>

      <button type='submit' className={`${Styles.loginBtnAnimate} bg-Black Fredoka text-White text-[22px] w-[100%] py-[14px] rounded-[20px]
							relative overflow-hidden inline-block z-10
							transition-all duration-300 ease-in-out
							focus:outline-none
							hover:py-[13px] hover:my-[1px]
							before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
							before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
							before:transition-all before:duration-300 before:ease-in-out
							hover:before:left-0 
							${loading ? 'cursor-wait before:left-[0] my-[1px] py-[13px]' : 'cursor-pointer before:left-[-100%] my-0 py-[14px]'} `}>
        Submit
      </button>
      {errorMessage && <p className='text-center text-red-500 font-bold'>{errorMessage}</p>}
    </form>
  )
}
