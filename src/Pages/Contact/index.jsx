import React, {useState, useEffect, useContext} from 'react'
import {useTranslation} from "react-i18next"
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiInstagramFill, RiFacebookFill , RiTwitterXFill} from "react-icons/ri";
import { Helmet } from 'react-helmet-async';
import { AuthenticationContext } from '../../Store/Context/Authentication';
import { contactUsURL } from '../../Store/urls';
import Fetch from '../../Components/CustomHooks/Fetch';
import Swal from 'sweetalert2';



export default function Contact(props){
    const {formData, Token, isLogedIn} = useContext(AuthenticationContext)
    const { t, i18n } = useTranslation("global");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null)
    const [newFormData, setNewFormData] = useState(
		{
            name: '',
			email: '',
            subject: '',
            message: ''
		}
	)

	function handleChange(event) {
		const { name, value, type, checked } = event.target
		setNewFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: type === "checkbox" ? checked : value
			}
		})
        // console.log(formData);
	}
    

    function handleSubmit(event) {
        event.preventDefault()
        if(!isLogedIn || !Token || loading || !newFormData.message || !formData.id)
            return;
        setLoading(true);
        Fetch({ 
            url: `${contactUsURL()}userId=${formData?.id}&message=${newFormData.message}&intent=${props.intent || 'general'}}`
            ,setLoading
            ,Token
            ,method: 'POST'
            ,setData
        })
    }

    useEffect(() => {
        if (!data) return;
        if (data.statusCode === '200') {
          const titleText = i18n.language === 'ar' 
            ? "تم إرسال رسالتك بنجاح" 
            : "Your message was sent successfully";
          const bodyText = i18n.language === 'ar' 
            ? "شكرًا لتواصلك معنا. ترقب رسالة منا على بريدك الإلكتروني." 
            : "Thank you for contacting us. Look forward to a message from us in your email.";
          Swal.fire({
            title: titleText,
            text: bodyText,
            icon: 'info',
            iconColor: '#E84762',
            confirmButtonText: i18n.language === 'ar' ? "موافق" : "OK",
            confirmButtonColor: '#E84762',
            reverseButtons: i18n.language === 'ar',
            scrollbarPadding: false
          }).then((result) => {
                setNewFormData(
                    {
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                    }
                )
          });
        }
      }, [data, i18n.language]);
      

    function GenerateIcon({title, text, Icon}){
        return (
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-DarkPink text-White">
                        <Icon size={26} strokeWidth={3}/>
                    </div>
                </div>
                <div>
                    <dt className="text-lg leading-6 font-medium text-Black">
                        {title}
                    </dt>
                    <dd className="mt-2 text-base text-Black/75 font-medium">
                        {text}
                    </dd>
                </div>
            </div>
        )
    }
    
    return(
        <div className='w-full flex justify-center items-center flex-col bg-White myFont min-h-screen'>
            <Helmet>
                <title>{i18n.language === 'ar' ? "تواصل معنا" : "Contact us"}</title>
                <meta name='description' content={t("contact.title").slice(0, 100)} />
            </Helmet>
            <div className="grid sm:grid-cols-2 items-start gap-16 p-4 myFont h-full w-[90%] my-[20vh]">
                <div>
                    <h1 className="text-Black text-4xl font-extrabold">{props.title || t("contact.title")}</h1>
                    <p className="text-lg text-Black/80 mt-4 font-medium">{props.description || t("contact.description")}</p>

                    <div className='flex flex-col mt-16 gap-12'>
                        <GenerateIcon title = {i18n.language === 'ar' ? "رقم الهاتف" : "Phone Number"} text = "01284438883" Icon = {FaPhoneAlt} />
                        <GenerateIcon title = {i18n.language === 'ar' ? "البريد الإلكتروني" : "Email"} text = "email@gmail.com" Icon = {IoMdMail} />
                        <div className='flex flex-col gap-6 items-center'>
                            <h3 className="text-2xl leading-6 font-semibold text-Black">
                                {i18n.language === 'ar' ? "التواصل الاجتماعي" : "Socials"}
                            </h3>
                            <div className='flex gap-4'>
                                <div className='w-[52px] h-[52px] items-center flex justify-center'>
                                    <RiInstagramFill className='text-gray-500 hover:text-DarkPink transition-all duration-200 size-[44px] hover:size-[48px]' />
                                </div>
                                <div className='w-[52px] h-[52px] items-center flex justify-center'>
                                    <RiFacebookFill className='text-White hover:bg-DarkPink hover:outline-DarkPink transition-all duration-200 size-[31px] hover:size-[35px] outline outline-[4px] outline-offset-[-1px] outline-gray-500 bg-gray-500 rounded-[8px]'/>
                                </div>
                                <div className='w-[52px] h-[52px] items-center flex justify-center'>
                                    <RiTwitterXFill className='text-White hover:bg-DarkPink hover:outline-DarkPink transition-all duration-200 size-[26px] hover:size-[30px] outline outline-[7px] outline-offset-[-1px] outline-gray-500 bg-gray-500 rounded-[8px]'/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <form className="ml-auto space-y-2 w-full" onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="myName" className='myFont text-md w-max font-medium ml-1 text-Black'>{t("contact.name")}</label>
                        <input type='text' id='myName' name='name' value={newFormData.name} onChange={handleChange}
                        className="border border-Black/15 w-full rounded-md py-3 px-4 bg-[#E1E1E1] text-Black text-sm outline-DarkPink" />
                    </div>
                    {/* <div className='flex flex-col gap-1'>
                        <label htmlFor="myEmail" className='myFont text-md w-max font-medium ml-1 text-Black'>{t("contact.email")}</label>
                        <input type='email' id='myEmail' name='email' value={newFormData.email} onChange={handleChange}
                            className="border border-Black/15 w-full rounded-md py-3 px-4 bg-[#E1E1E1] text-Black text-sm outline-DarkPink" />
                    </div> */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="subject" className='myFont text-md w-max font-medium ml-1 text-Black'>{t("contact.subject")}</label>
                        <input type='text' id='subject' name='subject' value={newFormData.subject} onChange={handleChange}
                            className="border border-Black/15 w-full rounded-md py-3 px-4 bg-[#E1E1E1] text-Black text-sm outline-DarkPink" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="myMessage" className='myFont text-md w-max font-medium ml-1 text-Black'>{t("contact.message")}</label>
                        <textarea required id='myMessage' rows="9" name='message' value={newFormData.message} onChange={handleChange}
                            className="border border-Black/15 w-full rounded-md px-4 bg-[#E1E1E1] text-Black text-sm py-3 outline-DarkPink resize-none"></textarea>
                    </div>
                    <button className={`text-White bg-DarkPink hover:bg-[#e84762] tracking-wide rounded-md text-lg px-4 py-3 w-full !mt-6 ${!isLogedIn && "pointer-events-none opacity-50"}`}>
                        {isLogedIn && t("contact.submit")}
                        {!isLogedIn && (i18n.language === 'ar' ? "قم بتسجيل الدخول اولاً" : "Login first")}
                    </button>
                </form>
            </div>
        </div>
    );
}