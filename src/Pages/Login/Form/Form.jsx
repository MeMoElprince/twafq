import { useState, useEffect, useContext } from 'react'
import Fetch from '../../../Components/CustomHooks/Fetch'
import { LoginUrl } from '../../../Store/urls'
import { Link, useNavigate } from 'react-router-dom'
import Styles from '../Styling.module.css'
import { AuthenticationContext } from '../../../Store/Context/Authentication'
import ForgotPassword from '../ForgotPassword'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Cookies from 'js-cookie'


export default function Form() {
	const { isLogedIn, setIsLogedIn, setToken } = useContext(AuthenticationContext)
	const { isRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");
	const [LoginType, setLoginType] = useState('login')
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const [showErrorMessage, setShowErrorMessage] = useState([])
	const Navigate = useNavigate()
	const [formData, setFormData] = useState(
		{
			email: '',
			password: ''
		}
	)

	function handleChange(event) {
		const { name, value, type, checked } = event.target
		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: type === "checkbox" ? checked : value
			}
		})
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (loading) return;
		setErrorMessage('')
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!emailRegex.test(formData.email)){
			setErrorMessage("Email format")
			return
		}
		if (formData.email === '' || formData.password === '') {
			setErrorMessage("Data fields")
			return
		}
		setErrorMessage('')
		Fetch({ url: LoginUrl(), setLoading, setData, setErrorMessage, method: 'POST', body: formData })
	}

	useEffect(() => {
		if(errorMessage){
			if(errorMessage === "Invalid credentials")
				setShowErrorMessage([ "البريد الإلكتروني أو كلمة المرور غير صحيحة, يرجى المحاولة مرة أخرى.", "Incorrect email or password. Please try again."])
			else if(errorMessage == "Email not verified")
				setShowErrorMessage(["البريد الإلكتروني غير مفعل, يرجى التحقق من صندوق الوارد.", "Email not verified. Please check your inbox."])
			else if(errorMessage === "Email format")
				setShowErrorMessage(['يرجى إدخال البريد الإلكتروني بشكل صحيح', 'Please enter a valid email address']);
			else if(errorMessage === "Data fields")
				setShowErrorMessage(['الرجاء ملئ جميع البيانات', 'Please fill all fields']);
		}else{
			setShowErrorMessage([]);
		}
	}, [errorMessage])

	
	useEffect(() => {
		if (!data) return;
		setToken(data.token);
		setIsLogedIn(true)
		Cookies.set("token", data.token, { expires: 7 })
	}, [data])


	useEffect(() => {
		if (isLogedIn) {
			Navigate('/')
		}
	}, [])

	useEffect(() => {
		if (isLogedIn) {
			Navigate('/')
		}
	}, [isLogedIn])

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
		<>
			<section className={`${Styles.formContainer} relative min-h-screen w-screen bg-White flex py-[25vh] content-center items-center justify-center`}>
				<div className={`${Styles.exactForm} relative border-Black/5 shadow-lg border-2 w-[80%] py-8 min-h-[6%] md:w-[50%] lg2:w-[35%] rounded-2xl center flex-col gap-8`}>
					{/* <img src={Bear} alt='bear-img' className='absolute top-[-120px] w-[140px] select-none pointer-events-none' /> */}
					{LoginType === 'login' && <>
						<h2 className='Title text-Black myFont text-[32px] font-semibold'>{t("login.title")}</h2>
						<form onSubmit={handleSubmit} className='Form center flex-col gap-10 w-[70%] mt-8'>
							<div className={`${Styles.inputHolder} relative w-full`}>
								<input
									id='userEmail'
									type="email"
									onChange={handleChange}
									name="email"
									placeholder='Email'
									value={formData.email}
									className={`myFont w-full py-2 px-3 border-b-[3px] ${formData.email ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
								/>
								<label
									htmlFor="userEmail"
									className={`inputLabel absolute top-[15px] ${
									isRTL ? "-right-2" : "-left-2"
									} text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
								>
									{t("login.email")}
								</label>
							</div>
							<div className={`${Styles.inputHolder} relative w-full`}>
								<input
									id='userPassword'
									type="password"
									onChange={handleChange}
									name="password"
									value={formData.password}
									placeholder='Password'
									className={`myFont w-full py-2 px-3 border-b-[3px] ${formData.password ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
									style={{
										fontFamily: 'Verdana',
										letterSpacing: '0.125em',
									}}
								/>
								<label
									htmlFor="userPassword"
									className={`inputLabel absolute top-[15px] ${
									isRTL ? "-right-2" : "-left-2"
									} text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
								>
									{t("login.password")}
								</label>
							</div>
							<div className={`${Styles.forgotPassword} self-end mt-[-15px]`}>
								<button onClick={() => { setLoginType('forgotpassword') }} type='button' className={`${Styles.clickableButton}`}><p className='myFont text-[16px] md2:text-[18px] opacity-80 cursor-pointer font-medium'>{t("login.forgot")}</p></button>
							</div>
							<button type='submit' className={`${Styles.loginBtnAnimate} bg-Black myFont text-White text-[22px] w-[100%] py-[14px] rounded-full
							relative overflow-hidden inline-block z-10
							transition-all duration-300 ease-in-out
							focus:outline-none
							before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
							before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
							before:transition-all before:duration-300 before:ease-in-out
							 
							${loading ? 'cursor-wait bg-[#505050]' : 'hover:w-[105%] hover:before:left-0'} `}>
								{!loading && t("login.title")}
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
							<div className={`${Styles.dontHaveAccount} center gap-2 w-full`}>
								<p className='myFont text-[13px] sm2:text-[18px] text-center'>
								{t("login.haveAcc")}
								</p>
								<Link to='/SignUp' className='self-center'>
									<button className={`${Styles.clickableButton}`}>
										<p className='myFont text-[13px] sm2:text-[18px] text-center opacity-80 font-medium underline mb-[2px]'>
										{t("login.signup")}
										</p>
									</button>
								</Link>
							</div>
						</form>
					</>}
					{LoginType === 'forgotpassword' && <ForgotPassword setLoginType={setLoginType} />}
				</div>
			</section>
		</>
	)
}