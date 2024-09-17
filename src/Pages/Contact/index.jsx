import React, {useState, useEffect} from 'react'
import {useTranslation} from "react-i18next"
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiInstagramFill, RiFacebookFill , RiTwitterXFill} from "react-icons/ri";
import { Helmet } from 'react-helmet-async';




export default function Contact(){
    const { t, i18n } = useTranslation("global");
    const [formData, setFormData] = useState(
		{
            name: '',
			email: '',
            subject: '',
            message: ''
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
        // console.log(formData);
	}

    function handleSubmit(event) {
        event.preventDefault()
    }

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
                    <h1 className="text-Black text-4xl font-extrabold">{t("contact.title")}</h1>
                    <p className="text-lg text-Black/80 mt-4 font-medium">{t("contact.description")}</p>

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
                        <input type='text' id='myName' name='name' value={formData.name} onChange={handleChange}
                        className="border border-Black/15 w-full rounded-md py-3 px-4 bg-[#E1E1E1] text-Black text-sm outline-DarkPink" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="myEmail" className='myFont text-md w-max font-medium ml-1 text-Black'>{t("contact.email")}</label>
                        <input type='email' id='myEmail' name='email' value={formData.email} onChange={handleChange}
                            className="border border-Black/15 w-full rounded-md py-3 px-4 bg-[#E1E1E1] text-Black text-sm outline-DarkPink" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="subject" className='myFont text-md w-max font-medium ml-1 text-Black'>{t("contact.subject")}</label>
                        <input type='text' id='subject' name='subject' value={formData.subject} onChange={handleChange}
                            className="border border-Black/15 w-full rounded-md py-3 px-4 bg-[#E1E1E1] text-Black text-sm outline-DarkPink" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="myMessage" className='myFont text-md w-max font-medium ml-1 text-Black'>{t("contact.message")}</label>
                        <textarea id='myMessage' rows="6" name='message' value={formData.message} onChange={handleChange}
                            className="border border-Black/15 w-full rounded-md px-4 bg-[#E1E1E1] text-Black text-sm py-3 outline-DarkPink resize-none"></textarea>
                    </div>
                    <button
                        className="text-White bg-DarkPink hover:bg-[#e84762] tracking-wide rounded-md text-lg px-4 py-3 w-full !mt-6">{t("contact.submit")}</button>
                </form>
            </div>
        </div>
    );
}