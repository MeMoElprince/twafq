import { useState, useEffect, useContext } from 'react'
import Fetch from '../../../../Components/CustomHooks/Fetch'
import { SignupUrl } from '../../../../Store/urls'
import { Link, useNavigate } from 'react-router-dom'
import Styles from '../../Styling.module.css'
import { AuthenticationContext } from '../../../../Store/Context/Authentication'
import ResetPassword from './Steps/ResetPassword'
import PersonalInfo from './Steps/PersonalInfo'
import Nationality from './Steps/Nationality'
import FamilyStatus from './Steps/FamilyStatus'
import Education from './Steps/Education'
import Religion from './Steps/Religion'
import Description from './Steps/Description'
import { useTranslation } from 'react-i18next'
import { button } from '@material-tailwind/react'


export default function Form({editActive, setEditActive}) {
	// const { isLogedIn} = useContext(AuthenticationContext)
	const { t, i18n } = useTranslation("global");
	const [step, setStep] = useState(0)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const Navigate = useNavigate()
	const [currPerc, setCurrPerc] = useState(0)
	const [isSelected, setIsSelected] = useState([]);
	const [colors, setColors] = useState([]);
	const stepLabels = [
		["البيانات الشخصية", "Personal Information"],
		["الجنسية", "Nationality"],
		["الدين", "Religion"],
		["الحالة العائلية", "Family Status"],
		["التعليم", "Education"],
		["الوصف", "Description"],
		["كلمة المرور", "Password"],
	]
	const [formData, setFormData] = useState(
		{
			gender: ["", ""],
			firstName: '',
			lastName: '',
			age: '',
			weight: '',
			height: '',
			skinColor: ["", ""],
			shape: ["", ""],
			health: ["", ""],
			nationality : ["", ""],
			country : ["", "", ""],
			city : ["", ""],
			residence : ["", ""],
			familyStatus : ["", ""],
			marriageType : ["", ""],
			children : '',
			educationLevel : ["", ""],
			work : '',
			financialStatus : ["", ""],
			religion : ["", ""],
			doctrine : ["", ""],
			religiousCommitment : ["", ""],
			smoking : ["", ""],
			selfDescription: '',
			partnerDescription: '',
		}
	)
	const [passwordData, setPasswordData] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: ''
	})


	  function handleChange(event) {
			const { name, value, type, checked, dataset } = event.target;
		
			const isMultiValue = ['skinColor', 'shape', 'health', 'nationality', 'country', 'city', 'residence',
				'familyStatus', 'marriageType', 'gender', 'smoking', 'religiousCommitment', 'doctrine', 'religion',
				'alcoholDrgus', 'educationLevel', 'financialStatus'
			].includes(name);
		
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
	  function handlePasswordChange(event) {
			const { name, value, type, checked, dataset } = event.target;
			setPasswordData(prevPasswordData => {
				return {
					...prevPasswordData,
					[name]: value
				};
			});
			console.log(passwordData)
		}
	

	function handleSubmit(e) {
		e.preventDefault();
		if (loading) return;
		// if (formData.email === '' || formData.password === '') {
		// 	setErrorMessage('Please fill all fields')
		// 	return
		// }
		let ansHolder = [];
		for(let i = 0; i<isSelected.length; i++){
			if(isSelected[i]){
				ansHolder.push(colors[i].index);
			}
		}
		const RET = {
			...formData,
			colorAnswers: ansHolder
		}
		setErrorMessage('')
		Fetch({ url: SignupUrl(), setLoading, setData, setErrorMessage, method: 'POST', body: RET })
	}

	// useEffect(() => {
	// 	if (!data) return
	// 	if (data.statusCode === '200') {
	// 		Navigate('/login');
	// 	}
	// }, [data])


	// useEffect(() => {
	// 	if (isLogedIn) {
	// 		Navigate('/')
	// 		window.location.reload();
	// 	}
	// }, [isLogedIn])




	function StepChoose({word, isSelected}){
		return (
			<div className={`text-White text-lg border-2 ${isSelected ? "bg-DarkPink/60 border-DarkPink font-medium" : "bg-Black/15 backdrop-blur-md hover:bg-DarkPink/30 hover:border-DarkPink/30"} py-2 px-4 rounded-full`}>{word}</div>
		)
	}


	return (
		<div className='absolute top-0 left-0 z-20 bg-none'>
			<section className={`${Styles.formContainer} h-[calc(220vh+9rem)] relative min-h-screen w-screen bg-none z-10 flex flex-col content-center items-center py-40 overflow-hidden`}>
				<div className='center w-[90%] z-20 gap-4 flex-wrap'>
					{
						stepLabels.map((element, idx) => {
							return (
								<butotn onClick={() => setStep(idx)} className="cursor-pointer">
									<StepChoose word = {`${i18n.language === 'ar' ? element[0] : element[1]}`} isSelected = {step === idx} />
								</butotn>
							)
						})
					}
				</div>
				<div className={`${Styles.exactForm} ${step === 7 ? Styles.step7 : Styles.notstep7}  relative border-Black/5 shadow-lg mt-20 border-2 py-8 min-h-[6%]  transition-all duration-300 rounded-2xl center flex-col gap-8`}>
					{step === 0 && <PersonalInfo handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 1 && <Nationality handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 2 && <Religion handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 3 && <FamilyStatus handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 4 && <Education handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 5 && <Description handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					{step === 6 && <ResetPassword handlePasswordChange = {handlePasswordChange} passwordData={passwordData} setPasswordData = {setPasswordData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} />}
					<div className="center gap-4 w-[73%] flex-col-reverse sm:flex-row py-6">
						<button
							onClick={() => setEditActive(0)}
							className={`${
								Styles.loginBtnAnimate
							} bg-none border border-Black myFont text-Black text-[18px] sm2:text-[22px]  w-[100%] py-[14px] rounded-full
									relative overflow-hidden inline-block z-10
									transition-all duration-300 ease-in-out
									focus:outline-none
									before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
									before:rounded-inherit before:bg-[#b5b5b5] before:bg-opacity-40 
									before:transition-all before:duration-300 before:ease-in-out
									hover:before:left-0
									`}
							>
							{i18n.language === 'ar' ? "إلغاء" : "Cancel"}
							</button>
							<button
							onClick={() => handleStep(1)}
							className={`${
								Styles.loginBtnAnimate
							} bg-Black myFont text-White text-[18px] sm2:text-[22px] w-[100%] py-[14px] rounded-full
									relative overflow-hidden inline-block z-10
									transition-all duration-300 ease-in-out
									focus:outline-none
									before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
									before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
									before:transition-all before:duration-300 before:ease-in-out
									
									hover:before:left-0
									
									`}
							>
							{i18n.language === 'ar' ? "حفظ" : "Save"}
							</button>
						</div>
				</div>
			</section>
		</div>
	)
}