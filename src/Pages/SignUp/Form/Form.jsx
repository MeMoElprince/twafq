import { useState, useRef, useEffect, useContext } from 'react'
import Fetch from '../../../Components/CustomHooks/Fetch'
import { LoginUrl } from '../../../Store/urls'
import { Link, useNavigate } from 'react-router-dom'
import Styles from '../Styling.module.css'
import { AuthenticationContext } from '../../../Store/Context/Authentication'
import loginBackground from './assets/LoginBackground.jpg'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'


export default function Form() {
	// const { isLogedIn, setIsLogedIn, setToken } = useContext(AuthenticationContext)
	const { isRTL, toggleLayoutDirection } = useLayoutDirection();
	const [Type, setType] = useState('login')
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const Navigate = useNavigate()
	const [currPerc, setCurrPerc] = useState(0)
	const [formData, setFormData] = useState(
		{
			email: '',
			password: '',
			confirmPassword: '',
			username: '',
			firstName: '',
			lastName: '',
		}
	)

	const titleStyle = {
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: '44px',
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

	const stepLabels = [
		"الجنس",
		"بيانات الدخول",
		"البيانات الشخصية",
		"الحالة الاجتماعية"
	]

	return (
		<>
			<section className={`${Styles.formContainer} relative min-h-screen w-screen bg-White flex content-center items-center justify-center py-20 overflow-hidden`}>
				<div className={`${Styles.exactForm} relative border-Black/5 shadow-lg mt-20 border-2 w-[80%] py-8 min-h-[6%] md:w-[50%] lg2:w-[30%] rounded-2xl center flex-col gap-8`}>
					{/* <img src={Bear} alt='bear-img' className='absolute top-[-120px] w-[140px] select-none pointer-events-none' /> */}
					<div className='mx-6 p-0 flex relative myFont w-[80%] bg-LighterPink/70 h-12 rounded-full'>
						<div className={`myFont bg-gradient-to-tr from-Blue to-DarkPink w-[${currPerc}%] h-full rounded-full transition-all duration-500`}></div>
						<div className='myFont w-full h-full center rounded-full absolute font-semibold text-[18px]'>{`${currPerc}%`}</div>
					</div>
					{Type === 'login' && <>
						<h2 className='Title text-Black myFont text-[32px] font-semibold'>البيانات الشخصية</h2>
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
								>البريد الإلكتروني</label>
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
								>كلمة المرور</label>
							</div>
							<div className={`${Styles.inputHolder} relative w-full`}>
								<input
									id='userConfirmPassword'
									type="password"
									onChange={handleChange}
									name="confirmPassword"
									value={formData.confirmPassword}
									placeholder='confirm password'
									className={`Fredoka w-full py-2 px-3 border-b-[3px] ${formData.confirmPassword ? 'border-Black' : 'border-[rgba(16,16,16,0.7)]'} bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
									style={{
									fontFamily: 'Verdana',
									letterSpacing: '0.125em',
									}}
								/>
								<label htmlFor='userPassword' className={`inputLabel absolute top-[15px] ${isRTL ? "right-2" : "left-2"} text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 myFont text-lg w-[100%]`}
								>تأكيد كلمة المرور</label>
							</div>
							{/* <div className={`${Styles.forgotPassword} self-end mt-[-15px]`}>
								<button onClick={() => { setType('forgotpassword') }} type='button' className={`${Styles.clickableButton}`}><p className='myFont text-[18px] opacity-80 cursor-pointer font-medium'>نسيت كلمة السر</p></button>
							</div> */}
							<div className='w-full center gap-4'>
								<button type='submit' className={`${Styles.loginBtnAnimate} bg-Black myFont text-White text-[22px] w-[100%] py-[14px] rounded-full
								relative overflow-hidden inline-block z-10
								transition-all duration-300 ease-in-out
								focus:outline-none
								before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
								before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
								before:transition-all before:duration-300 before:ease-in-out
								
								${loading ? 'cursor-wait bg-[#505050]' : 'hover:before:left-0'} `}>
									التالي
								</button>

								<button type='submit' className={`${Styles.loginBtnAnimate} bg-none border border-Black myFont text-Black text-[22px] w-[100%] py-[14px] rounded-full
								relative overflow-hidden inline-block z-10
								transition-all duration-300 ease-in-out
								focus:outline-none
								before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
								before:rounded-inherit before:bg-[#b5b5b5] before:bg-opacity-40 
								before:transition-all before:duration-300 before:ease-in-out
								
								${loading ? 'cursor-wait bg-[#b5b5b5]' : 'hover:before:left-0'} `}>
									السابق
								</button>
							</div>
							<p className='text-red-700 font-bold -mb-5 -mt-5'>{errorMessage}</p>
						</form>
					</>}
				</div>
			</section>
		</>
	)
}