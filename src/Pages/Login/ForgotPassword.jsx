import { useState } from "react"
import Styles from './Styling.module.css'
import { ResetPassword, ForgetPassword } from '../../Store/urls'
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import Swal from "sweetalert2"

export default function ForgotPassword({ setLoginType }) {
  const { t, i18n } = useTranslation("global");
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [Type, setType] = useState('enterEmail')

  return (
    <>
      {Type === 'enterEmail' && <EnterEmail email={email} i18n={i18n} t={t} setEmail={setEmail} setType={setType} loading={loading} setLoading={setLoading} />}

      {Type === 'enterPassword' && <EnterPassword setLoginType={setLoginType} i18n={i18n} t={t} email={email} code={code} setCode={setCode} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} setType={setType} loading={loading} setLoading={setLoading} />}
    </>
  )
}

const EnterEmail = ({ email, setEmail, setType, loading, setLoading, i18n, t }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(`${ForgetPassword()}email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()
      // console.log(data)
      if (data.statusCode !== '200') {
        throw new Error(data.errorMessage)
      } else {
        setType('enterPassword')
      }
    } catch (error) {
      setErrorMessage(error.message)
      // console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  function LoadingSpinner(){
    return (
      <div className='center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-DarkPink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-10">
      <h2 className='text-center text-Black myFont text-xl font-medium sm:text-3xl'>{i18n.language === 'ar' ? "تغيير كلمة السر" : "Change Password"}</h2>
      <h3 className="bg-LightPink px-4 py-4 rounded-lg text-[16px] font-semibold text-center mb-4">{i18n.language === 'ar' ? "سيتم إرسال رمز تأكيد إلى بريدك الإلكتروني" : "A confirmation code will be sent to your email"}</h3>
      <div className={`${Styles.inputHolder} relative w-full`}>
        <input
          id='userEmail'
          type="email"
          onChange={handleChange}
          name="email"
          placeholder='Email'
          value={email}
          className={`myFont w-full py-2 px-3 border-b-[3px] ${email ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
        />
        <label
            htmlFor="userPassword"
            className={`inputLabel absolute top-[15px] ${
              i18n.language === 'ar' ? "-right-2" : "-left-2"
            } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
          >
            {t("login.email")}
          </label>
      </div>

      <button type='submit' className={`${Styles.loginBtnAnimate} bg-Black myFont text-White text-[22px] w-[100%] py-[14px] rounded-[20px]
                relative overflow-hidden inline-block z-10
                transition-all duration-300 ease-in-out
                focus:outline-none
                hover:py-[13px] hover:my-[1px]
                before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
                before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
                before:transition-all before:duration-300 before:ease-in-out
                hover:before:left-0 
                ${loading ? 'cursor-wait before:left-[0] my-[1px] py-[13px]' : 'cursor-pointer before:left-[-100%] my-0 py-[14px]'} `}>
              {!loading && (i18n.language === 'ar' ? "إرسال الكود" : "Send code")}
              {loading && <LoadingSpinner />}
      </button>
      {errorMessage && 
        <div className="bg-red-200/90 w-[100%] -mb-3 -mt-3 rounded-sm px-2 py-2 flex justify-center items-center flex-col gap-3">
          <p  className="text-red-700 font-semibold text-sm sm:text-base py-[6px] text-center" >
            {(i18n.language === 'ar' && errorMessage) === 'User not found' ? 'المستخدم غير موجود' : errorMessage}
          </p>
        </div>
      }
    </form>
  )
}

const EnterPassword = ({ setLoginType, email, code, setCode, i18n, t, password, setPassword, confirmPassword, setConfirmPassword, loading, setLoading }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState([])
  const handleChangeA = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeB = (e) => {
    setConfirmPassword(e.target.value)
  }
  const handleChange = (e) => {
    setCode(e.target.value)
  }

  useEffect(() => {
    if(errorMessage){
      if(errorMessage === "1")
          setShowErrorMessage(["يرجى إدخال رمز التأكيد", "Please enter confirmation code"])
      else if(errorMessage === "2")
          setShowErrorMessage(["كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على أرقام وأحرف", 
            "Password must be at least 8 characters long and contain both letters and digits"])
      else if(errorMessage === "3")
          setShowErrorMessage(["كلمة المرور غير متطابقة", 
            "Passwords do not match"])
      else if(errorMessage === "Invalid OTP")
          setShowErrorMessage(['رمز التأكيد غير صحيح', "Invalid confirmation code"])
    }else{
      setShowErrorMessage([])
    }
  },[errorMessage])

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage('')
    setLoading(true)

    if(!code){
      setErrorMessage("1")
      setLoading(false)
      return
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (!password || !passwordRegex.test(password)) {
      setErrorMessage("2")
      setLoading(false)
      return
    }
  
    if (confirmPassword !== password) {
      setErrorMessage("3")
      setLoading(false)
      return
    }
    setLoading(false)

    try {
      setLoading(true)
      const response = await fetch(`${ResetPassword()}userEmail=${email}&otp=${code}&newPassword=${password}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      // console.log(data);
      if (data.statusCode !== '200') {
        throw new Error(data.errorMessage)
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: `${i18n.language === 'ar' ? "top-start" : "top-end"}`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          iconColor: "#E84762",
          icon: "success",
          title: `${i18n.language === 'ar' ? "تم تغيير كلمةالسر" : "Password Changed"}`,
        }).then(() => {
          setLoginType('login');
        });        
      }
    } catch (error) {
      setErrorMessage(error.message)
      // console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  function LoadingSpinner(){
    return (
      <div className='center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-DarkPink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-10" autocomplete="off">
      <h2 className='text-center text-Black myFont text-xl font-medium sm:text-3xl mb-8'>{i18n.language === 'ar' ? "تغيير كلمة السر" : "Change Password"}</h2>
      <div className={`${Styles.inputHolder} relative w-full`}>
        <input
          id='userCode'
          type="text"
          onChange={handleChange}
          name="text"
          placeholder='code'
          value={code}
          className={`myFont w-full py-2 px-3 border-b-[3px] ${code ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
        />
        <label
            htmlFor="userCode"
            className={`inputLabel absolute top-[15px] ${
              i18n.language === 'ar' ? "-right-2" : "-left-2"
            } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
          >
            {i18n.language === 'ar' ? "رمز التأكيد" : "Confirmation Code"}
          </label>
      </div>
      <div className={`${Styles.inputHolder} relative w-full`}>
        <input
          id='userPassword'
          type="password"
          onChange={handleChangeA}
          name="password"
          placeholder='password'
          value={password}
          className={`myFont w-full py-2 px-3 border-b-[3px] ${password ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
          style={{
            fontFamily: 'Verdana',
            letterSpacing: '0.125em',
          }}
        />
        <label
            htmlFor="userPassword"
            className={`inputLabel absolute top-[15px] ${
              i18n.language === 'ar' ? "-right-2" : "-left-2"
            } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
          >
            {t("loginInfo.password")}
          </label>
      </div>
      <div className={`${Styles.inputHolder} relative w-full`}>
        <input
          id='userConfirmPassword'
          type="password"
          onChange={handleChangeB}
          name="password"
          placeholder='password'
          value={confirmPassword}
          className={`myFont w-full py-2 px-3 border-b-[3px] ${confirmPassword ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
          style={{
            fontFamily: 'Verdana',
            letterSpacing: '0.125em',
          }}
        />
        <label
            htmlFor="userConfirmPassword"
            className={`inputLabel absolute top-[15px] ${
              i18n.language === 'ar' ? "-right-2" : "-left-2"
            } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
          >
            {t("loginInfo.confirmPass")}
          </label>
      </div>

      <button type='submit' className={`${Styles.loginBtnAnimate} bg-Black myFont text-White text-[22px] w-[100%] py-[14px] rounded-[20px]
							relative overflow-hidden inline-block z-10
							transition-all duration-300 ease-in-out
							focus:outline-none
							hover:py-[13px] hover:my-[1px]
							before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
							before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
							before:transition-all before:duration-300 before:ease-in-out
							hover:before:left-0 
							${loading ? 'cursor-wait before:left-[0] my-[1px] py-[13px]' : 'cursor-pointer before:left-[-100%] my-0 py-[14px]'} `}>
        {!loading && (i18n.language === 'ar' ? "تأكيد" : "Submit")}
        {loading && <LoadingSpinner />}
      </button>
      {
								showErrorMessage.length !== 0 && 
								(
									<div className="bg-red-200/90 w-[100%] -mb-3 -mt-3 rounded-sm px-2 py-2 flex justify-center items-center flex-col gap-3">
										<p  className="text-red-700 font-semibold text-sm sm:text-base py-[6px] text-center" >
											{showErrorMessage[i18n.language === 'ar' ? 0 : 1]}
										</p>
									</div>
								)
							}
    </form>
  )
}
