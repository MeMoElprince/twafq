import { useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
import Fetch from '../../../Components/CustomHooks/Fetch'
import { LoginUrl } from '../../../Store/urls'
import { Link, useNavigate } from 'react-router-dom'
import Styles from '../Styling.module.css'
import { AuthenticationContext } from '../../../Store/Context/Authentication'
import loginBackground from './assets/LoginBackground.jpg'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import LoginInfo from './Steps/LoginInfo'
import PersonalInfo from './Steps/PersonalInfo'
import Nationality from './Steps/Nationality'
import FamilyStatus from './Steps/FamilyStatus'
import Education from './Steps/Education'
import Religion from './Steps/Religion'


export default function Form() {
	// const { isLogedIn, setIsLogedIn, setToken } = useContext(AuthenticationContext)
	const { isRTL, setIsRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");
	const [step, setStep] = useState(0)
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
			phone: '',
			age: '',
			weight: '',
			height: '',
			skinColor: '',
			shape: '',
			health: '',
			nationality : '',
			country : '',
			city : '',
			residence : '',
			familyStatus : '',
			marriageType : '',
			children : '',
			educationLevel : '',
			work : '',
			financialStatus : '',
			religion : '',
			doctrine : '',
			religiousCommitment : '',
			smoking : '',
			alcoholDrgus : '',
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
		// if (loading) return;
		// if (formData.email === '' || formData.password === '') {
		// 	setErrorMessage('Please fill all fields')
		// 	return
		// }
		// setLoading(true)
		// setErrorMessage('')
		// Fetch({ url: LoginUrl(), setLoading, setData, setErrorMessage, method: 'POST', body: formData })
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

	function handleStep(type) {
		setStep(prevStep => {
		  let newStep = prevStep + type;
		  if (newStep < 0) newStep = 0;
		  if (newStep > 5) newStep = 5;
		  return newStep;
		});
	}

	useEffect(() => {
		setCurrPerc(Math.ceil(100 / 6 * step));
	}, [step])

	useEffect(() => {
		const timer = setTimeout(() => {
		  window.scrollTo({
			top: 0,
			behavior: 'smooth',
		  });
		}, 500);
	  
		return () => clearTimeout(timer); // Cleanup if the component unmounts
	  }, [step, currPerc]);
	  


	return (
		<>
			<section className={`${Styles.formContainer} relative min-h-screen w-screen bg-White flex content-center items-center justify-center py-20 overflow-hidden`}>
				<div className={`${Styles.exactForm} relative border-Black/5 shadow-lg mt-20 border-2 w-[80%] py-8 min-h-[6%] md:w-[50%] lg2:w-[35%] rounded-2xl center flex-col gap-8`}>
					{/* <img src={Bear} alt='bear-img' className='absolute top-[-120px] w-[140px] select-none pointer-events-none' /> */}
					<div className='mx-6 p-0 flex relative myFont w-[80%] bg-LighterPink/70 h-12 rounded-full overflow-hidden'>
						<div className={`myFont bg-gradient-to-tr from-Blue to-DarkPink h-full rounded-full transition-all duration-500`} style={{ width: `${currPerc}%` }}></div>
						<div className='myFont w-full h-full center rounded-full absolute font-semibold text-[18px]'>{`${currPerc}%`}</div>
					</div>
					{step === 0 && <LoginInfo handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 1 && <PersonalInfo handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 2 && <Nationality handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 3 && <FamilyStatus handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 4 && <Education handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 5 && <Religion handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
				</div>
			</section>
		</>
	)
}