import React, {useState} from 'react'
import { useLayoutDirection } from '../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"

export default function RateUs() {
    const { isRTL, setIsRTL } = useLayoutDirection();
    const { t, i18n } = useTranslation("global");
    const [formData, setFormData] = useState(
		{
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
        // submitToApi(formData)
    }

  return (
    <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
        <label htmlFor="myMessage" className='myFont text-2xl md:text-3xl w-max sm:text-3xl font-medium ml-1 text-White'>
            {i18n.language === 'ar' ? "شارك قصتك" : "Share your story"}
        </label>
        <textarea id='myMessage' rows="6" name='message' value={formData.message} onChange={handleChange} placeholder= {isRTL ? "اكتب قصتك..." : "Type your story..."}
            className="w-full rounded-md px-4 bg-[#E1E1E1] text-Black text-sm py-3 outline-Black resize-none"></textarea>
        <button
        className="text-white bg-DarkPink hover:bg-[#e84762] tracking-wide rounded-md text-lg px-4 py-3 w-full !mt-6">
            {isRTL ? "مشاركة" : "Share"}
        </button>
    </form>
  )
}
