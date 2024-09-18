import { useState, useEffect, useContext } from 'react'
import Fetch from '../../../Components/CustomHooks/Fetch'
import { SignupUrl } from '../../../Store/urls'
import { Link, useNavigate } from 'react-router-dom'
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


export default function Form() {
	const { isLogedIn} = useContext(AuthenticationContext)
	const [step, setStep] = useState(0)
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
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
			age: '',
			weight: '',
			height: '',
			skinColor: ["", ""],
			shape: ["", ""],
			health: ["", ""],
			nationality : ["", ""],
			country : ["", "", ""],
			city : ["القاهرة", "Cairo"],
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
			isChecked: false,
		}
	)


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
			colorAnswers: ansHolder,
			// username: formData.firstName + formData.lastName
		}
		console.log(RET);
		setErrorMessage('')
		Fetch({ url: SignupUrl(), setLoading, setData, setErrorMessage, method: 'POST', body: RET })
	}

	useEffect(() => {
		if (!data) return
		if (data.statusCode === '200') {
			Navigate('/login');
		}
	}, [data])


	useEffect(() => {
		if (isLogedIn) {
			Navigate('/')
			window.location.reload();
		}
	}, [isLogedIn])


	function handleStep(type) {
		setStep(prevStep => {
		  let newStep = prevStep + type;
		  if(newStep === 4 && formData.religion[1] === 'Christianity')
				newStep += type;
		  if (newStep < 0) newStep = 0;
		  if (newStep > 7) newStep = 7;
		  return newStep;
		});
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
		}, 500);
	  
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
					{step === 7 && <ColorTest colors={colors} setColors={setColors} isSelected={isSelected} setIsSelected={setIsSelected} handleStep = {handleStep} handleChange = {handleChange} formData={formData} setFormData = {setFormData} errorMessage = {errorMessage} setErrorMessage = {setErrorMessage} handleSubmit = {handleSubmit} />}
				</div>
			</section>
		</>
	)
}