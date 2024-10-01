import { useState, useEffect, useContext } from 'react'
import Fetch from '../../../Components/CustomHooks/Fetch'
import { SignupUrl } from '../../../Store/urls'
import { useNavigate } from 'react-router-dom'
import Styles from '../Styling.module.css'
import { AuthenticationContext } from '../../../Store/Context/Authentication'
import LoginInfo from './Steps/LoginInfo'
import PersonalInfo from './Steps/PersonalInfo'
import Nationality from './Steps/Nationality'
import FamilyStatus from './Steps/FamilyStatus'
import Education from './Steps/Education'
import Religion from './Steps/Religion'
import Description from './Steps/Description'
import ColorTest from './Steps/ColorTest'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import Swal from 'sweetalert2'
import { handleLoginInfo, handlePersonalInfo, handleNationality, handleReligion, handleFamilyStatus, handleEducation } from '../Components/ErrorHandling'
import { useTranslation } from 'react-i18next'



export default function Form() {
	const { isLogedIn} = useContext(AuthenticationContext)
	const {i18n} = useTranslation("global")
	const { isRTL } = useLayoutDirection();
	const [step, setStep] = useState(0)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
	const [errorMessage, setErrorMessage] = useState([])
	const [emailUsedMsg, setEmailUsedMsg] = useState("")
	const Navigate = useNavigate()
	const [currPerc, setCurrPerc] = useState(0)
	const [isSelected, setIsSelected] = useState([]);
	const [colors, setColors] = useState([]);
	const [formData, setFormData] = useState(
		{
			gender: ["", ""],
			email: '',
			password: '',
			confirmPassword: '',
			firstName: '',
			lastName: '',
			phone: '',
			age: 0,
			weight: 0,
			height: 0,
			skinColor: ["", ""],
			shape: ["", ""],
			health: ["انا بحالة جيدة", "I'm fine"],
			nationality : ["", ""],
			country : ["", "", ""],
			city : ["القاهرة", "Cairo"],
			residence : ["", ""],
			familyStatus : ["", ""],
			marriageType : ["", ""],
			children : 0,
			educationLevel : ["", ""],
			work : '',
			financialStatus : ["", ""],
			religion : ["", ""],
			doctrine : ["", ""],
			religiousCommitment : ["", ""],
			smoking : ["", ""],
			selfDescription: '',
			partnerDescription: '',
			isChecked: false,
		}
	)


	  function handleChange(event) {
			const { name, value, type, checked, dataset } = event.target;
		
			const isMultiValue = ['skinColor', 'shape', 'health', 'nationality', 'country', 'city', 'residence',
				'familyStatus', 'marriageType', 'gender', 'smoking', 'religiousCommitment', 'doctrine', 'religion',
				'alcoholDrgus', 'educationLevel', 'financialStatus'
			].includes(name);

			if(name === 'religion')
				formData.doctrine = ["", ""];

			if(name === 'gender'){
				formData.familyStatus = ["", ""];
				formData.marriageType = ["", ""];
			}
		
			setFormData(prevFormData => {
				let newValue;
				if (type === "checkbox"){
					newValue = checked;
				}else if (isMultiValue){
					const valueHolder = JSON.parse(value);
					newValue = valueHolder;
				}else{
					newValue = value;
				}
				return {
					...prevFormData,
					[name]: newValue
				};
			});
		}
	

	function handleSubmit(e) {
		e.preventDefault();
		if (loading) return;
		setErrorMessage([]);
		setEmailUsedMsg("");
		let ansHolder = [];
		for(let i = 0; i<isSelected.length; i++){
			if(isSelected[i]){
				ansHolder.push(colors[i].index);
			}
		}
		if(ansHolder.length === 0){
			setErrorMessage(prevMsg => {
				let newMsg = [...prevMsg];
				newMsg.push(["يرجى اختيار لون واحد على الأقل", "Please choose atleast one color"]);
				return newMsg;
			})
			return
		}
		if (!formData.isChecked){
			setErrorMessage(prevMsg => {
				let newMsg = [...prevMsg];
				newMsg.push(["يرجى الموافقة على الشروط والأحكام", "Please accept the terms and conditions"]);
				return newMsg;
			})
			return
		}
		const RET = {
			...formData,
			colorAnswers: ansHolder,
			// username: formData.firstName + formData.lastName
		}
		// console.log(RET);
		setErrorMessage([]);
		Fetch({ url: SignupUrl(), setLoading, setData, setErrorMessage: setEmailUsedMsg, method: 'POST', body: RET })
	}

	useEffect(() => {
		// console.log(emailUsedMsg);
		if(emailUsedMsg === 'User already exists'){
			setErrorMessage(prevMsg => {
				let newMsg = [...prevMsg];
				newMsg.push(["البريد الإلكتروني مستخدم سابقاً", "User already exists"]);
				return newMsg;
			})
			setStep(0);
			return;
		}
		if (!data) return
		if (data.statusCode === '200') {
			const titleText = isRTL || i18n.language === 'ar' 
				? "تحقق من بريدك الإلكتروني" 
				: "Check your email";
			const bodyText = isRTL || i18n.language === 'ar' 
				? "لقد أرسلنا لك رابط تأكيد. يرجى التحقق من بريدك الإلكتروني." 
				: "We have sent you a verification link. Please check your email.";
			Swal.fire({
				title: titleText,
				text: bodyText,
				icon: 'info',
				iconColor: '#E84762',
				confirmButtonText: isRTL || i18n.language === 'ar' ? "موافق" : "OK",
				confirmButtonColor: '#E84762',
				reverseButtons: isRTL,
				scrollbarPadding: false
			  }).then((result) => {
				if (result.isConfirmed) {
				  Navigate('/login');
				}
			  });
		}
	}, [data, emailUsedMsg])


	useEffect(() => {
		if (isLogedIn) {
			Navigate("/", { replace: true });
			window.location.reload();
		}
	}, [isLogedIn])


	function handleStep(type){
		if (type === 1 && step === 0) {
		  handleLoginInfo(formData, (updatedErrorMessage) => {
			setErrorMessage(updatedErrorMessage);
			if (updatedErrorMessage.length === 0) {
			  setStep(prevStep => (prevStep < 7 ? prevStep + type : 7));
			}
		  });
		}else if (type === 1 && step === 1) {
			handlePersonalInfo(formData, (updatedErrorMessage) => {
				setErrorMessage(updatedErrorMessage);
				if (updatedErrorMessage.length === 0) {
				setStep(prevStep => (prevStep < 7 ? prevStep + type : 7));
				}
			});
		}else if (type === 1 && step === 2) {
			handleNationality(formData, (updatedErrorMessage) => {
				setErrorMessage(updatedErrorMessage);
				if (updatedErrorMessage.length === 0) {
				setStep(prevStep => (prevStep < 7 ? prevStep + type : 7));
				}
			});
		}else if (type === 1 && step === 3) {
			handleReligion(formData, (updatedErrorMessage) => {
				setErrorMessage(updatedErrorMessage);
				if (updatedErrorMessage.length === 0) {
				setStep(prevStep => (prevStep < 7 ? prevStep + type : 7));
				}
			});
		}else if (type === 1 && step === 4) {
			handleFamilyStatus(formData, (updatedErrorMessage) => {
				setErrorMessage(updatedErrorMessage);
				if (updatedErrorMessage.length === 0) {
				setStep(prevStep => (prevStep < 7 ? prevStep + type : 7));
				}
			});
		}else if (type === 1 && step === 5) {
			handleEducation(formData, (updatedErrorMessage) => {
				setErrorMessage(updatedErrorMessage);
				if (updatedErrorMessage.length === 0) {
				setStep(prevStep => (prevStep < 7 ? prevStep + type : 7));
				}
			});
		}else if (type === 1 && step === 6) {
			setStep(prevStep => (prevStep < 7 ? prevStep + type : 7))
		}
		else if(type === -1) {
			if(step - 1 >= 0){
				setErrorMessage([]);
			}
		  setStep(prevStep => (prevStep + type >= 0 ? prevStep + type : 0));
		}
	  }
	  

	useEffect(() => {
		setCurrPerc(Math.round(100 / 8 * step));
	}, [step])

	useEffect(() => {
		const timer = setTimeout(() => {
		  window.scrollTo({
			top: 0,
			behavior: 'smooth',
		  });
		}, 200);
	  
		return () => clearTimeout(timer);
	  }, [step, currPerc]);


	return (
		<>
			<section className={`${Styles.formContainer} relative min-h-screen w-screen bg-White flex content-center items-center justify-center py-20 overflow-hidden`}>
				<div className={`${Styles.exactForm} ${step === 7 ? Styles.step7 : Styles.notstep7}  relative border-Black/5 shadow-lg mt-20 border-2 py-8 min-h-[6%]  transition-all duration-300 rounded-2xl center flex-col gap-8`}>
					<div className='mx-6 p-0 flex relative myFont w-[80%] bg-LighterPink/70 h-12 rounded-full overflow-hidden'>
						<div className={`myFont bg-gradient-to-tr from-Blue to-DarkPink h-full rounded-full transition-all duration-500`} style={{ width: `${currPerc}%` }}></div>
						<div className='myFont w-full h-full center rounded-full absolute font-semibold text-[18px]'>{`${currPerc}%`}</div>
					</div>
					{step === 0 && <LoginInfo handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 1 && <PersonalInfo handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 2 && <Nationality handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 3 && <Religion handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 4 && <FamilyStatus handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 5 && <Education handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 6 && <Description handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 7 && <ColorTest colors={colors} loading={loading} setColors={setColors} isSelected={isSelected} setIsSelected={setIsSelected} handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} handleSubmit = {handleSubmit} />}
					{
						errorMessage.length !== 0 && (
							<div className="bg-red-200/90 w-[70%] -mb-3 -mt-3 rounded-sm px-4 py-4 flex flex-col gap-3">
								<ul className="list-disc list-inside">
									{errorMessage.map((msg, index) => (
									<li key={index} className="text-red-700 font-semibold text-sm sm:text-base py-[6px]" style={{ color: '#B91C1C' /* red-700 color */ }}>
										{msg[isRTL ? 0 : 1]}
									</li>
									))}
								</ul>
							</div>
						)
					}
				</div>
			</section>
		</>
	)
}