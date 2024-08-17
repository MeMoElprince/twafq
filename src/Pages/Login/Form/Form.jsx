import { useState, useRef, useEffect, useContext } from 'react'
import Fetch from '../../../Components/CustomHooks/Fetch'
import { LoginUrl } from '../../../Store/urls'
import { Link, useNavigate } from 'react-router-dom'
import Styles from '../Styling.module.css'
import Bear from './assets/Bear.png'
import { AuthenticationContext } from '../../../Store/Context/Authentication'
import VarifyCode from '../VarifyCode'
import ForgotPassword from '../ForgotPassword'
import loginBackground from './assets/LoginBackground.jpg'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import { IoMenu , IoClose } from "react-icons/io5";
import {useTranslation} from "react-i18next"


export default function Form() {
	// const { isLogedIn, setIsLogedIn, setToken } = useContext(AuthenticationContext)
	const { isRTL, setIsRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");
	const [Type, setType] = useState('login')
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const Navigate = useNavigate()
	const [formData, setFormData] = useState(
		{
			email: '',
			password: ''
		}
	)

	useEffect(() => {
		setIsRTL(i18n.language === "ar");
	  }, [i18n.language]);
	
	  const handleLangChange = (lang) => {
		i18n.changeLanguage(lang);
	  };



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
		if (formData.email === '' || formData.password === '') {
			setErrorMessage('Please fill all fields')
			return
		}
		setLoading(true)
		setErrorMessage('')
		Fetch({ url: LoginUrl(), setLoading, setData, setErrorMessage, method: 'POST', body: formData })
	}
	useEffect(() => {
		if (data?.status !== 'success') return;
		setToken(data.data.token);
		if (!data.data.active) {
			setType('otp')
		} else {
			setIsLogedIn(true)
		}
	}, [data])
	// useEffect(() => {
	// 	if (isLogedIn) {
	// 		Navigate('/')
	// 	}
	// }, [])
	// useEffect(() => {
	// 	if (isLogedIn) {
	// 		Navigate('/')
	// 		window.location.reload();
	// 	}
	// }, [isLogedIn])

	// if (isLogedIn && Type !== 'otp')
	// 	return <div className='w-screen h-screen bg-DarkerBlue' />
	return (
		<>
			<section className={`${Styles.formContainer} relative min-h-screen w-screen bg-White flex content-center items-center justify-center`}>
				<div className={`${Styles.exactForm} relative border-Black/5 shadow-lg mt-20 border-2 w-[80%] py-8 min-h-[6%] md:w-[50%] lg2:w-[30%] rounded-2xl center flex-col gap-8`}>
					{/* <img src={Bear} alt='bear-img' className='absolute top-[-120px] w-[140px] select-none pointer-events-none' /> */}
					{Type === 'login' && <>
						<h2 className='Title text-Black myFont text-[32px] font-semibold'>{t("login.title")}</h2>
						<form onSubmit={handleSubmit} className='Form center flex-col gap-10 w-[70%]'>
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
								<label htmlFor='userEmail' className={`inputLabel absolute top-[15px] ${isRTL ? "right-2" : "left-2"} text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 myFont text-lg w-[100%]`}
								>{t("login.email")}</label>
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
								<label htmlFor='userPassword' className={`inputLabel absolute top-[15px] ${isRTL ? "right-2" : "left-2"} text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 myFont text-lg w-[100%]`}
								>{t("login.password")}</label>
							</div>
							<div className={`${Styles.forgotPassword} self-end mt-[-15px]`}>
								<button onClick={() => { setType('forgotpassword') }} type='button' className={`${Styles.clickableButton}`}><p className='myFont text-[16px] md2:text-[18px] opacity-80 cursor-pointer font-medium'>{t("login.forgot")}</p></button>
							</div>
							<button type='submit' className={`${Styles.loginBtnAnimate} bg-Black myFont text-White text-[22px] w-[100%] py-[14px] rounded-full
							relative overflow-hidden inline-block z-10
							transition-all duration-300 ease-in-out
							focus:outline-none
							before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
							before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
							before:transition-all before:duration-300 before:ease-in-out
							 
							${loading ? 'cursor-wait bg-[#505050]' : 'hover:w-[105%] hover:before:left-0'} `}>
								{t("login.title")}
							</button>
							<p className='text-red-700 font-bold -mb-5 -mt-5'>{errorMessage}</p>
							<div className={`${Styles.dontHaveAccount} center gap-2`}>
								<p className='myFont text-[14px] md2:text-[18px]  text-center'>
								{t("login.haveAcc")}
								</p>
								<Link to='/SignUp'>
									<button className={`${Styles.clickableButton}`}>
										<p className='myFont text-[14px] md2:text-[18px] text-center opacity-80 font-medium underline'>
										{t("login.signup")}
										</p>
									</button>
								</Link>
							</div>
						</form>
					</>}
					{Type === 'otp' && <VarifyCode email={formData.email} />}
					{Type === 'forgotpassword' && <ForgotPassword setLoginType={setType} />}
				</div>
			</section>
		</>
	)
}