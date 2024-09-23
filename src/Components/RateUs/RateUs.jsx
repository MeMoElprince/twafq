import React, {useContext, useState} from 'react'
import { useLayoutDirection } from '../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Fetch from "../CustomHooks/Fetch"
import { AuthenticationContext } from '../../Store/Context/Authentication'
import { putReview } from '../../Store/urls'
import Swal from 'sweetalert2'

export default function RateUs() {
    const {Token, formData} = useContext(AuthenticationContext)
    const { isRTL } = useLayoutDirection();
    const { i18n } = useTranslation("global");
    const [buttonActive, setButtonActive] = useState(true);
    const [currFormData, setCurrFormData] = useState(
		{
            message: ''
		}
	)

	function handleChange(event) {
		const { name, value, type, checked } = event.target
		setCurrFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: type === "checkbox" ? checked : value
			}
		})
        // console.log(formData);
	}

    function handleSubmit(event) {
        event.preventDefault();
        if(!currFormData.message)
            return;
        setButtonActive(false);
        Swal.fire({
            title: isRTL ? "نشر قصتك" : "Share Your Story",
            text: isRTL ? "هل أنت متأكد أنك تريد نشر قصتك؟" : "Are you sure you want to share your story?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            iconColor: "#E84762",
            cancelButtonColor: "#d33",
            confirmButtonText: isRTL ? "نعم, نشر القصة" : "Yes, Share",
            cancelButtonText: isRTL ? "إلغاء" : "Cancel",
            scrollbarPadding: false
          }).then((result) => {
            if (result.isConfirmed && Token && currFormData.message != '') {
                event.preventDefault()
                Fetch({ url: `${putReview()}userId=${formData.id}&story=${currFormData.message}`, Token, method: 'POST' })
                setCurrFormData(prevFormData => {
                    return {
                        ...prevFormData,
                        "message": ''
                    }
                })
            }else if(!Token && result.isConfirmed){
                const Toast = Swal.mixin({
                    toast: true,
                    position: `${i18n.language === 'ar' ? "top-start" : "top-end"}`,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    iconColor: "#E84762",
                    icon: "warning",
                    title: `${i18n.language === 'ar' ? "يرجى تسجيل الدخول اولاً" : "Please login first"}`,
                  }).then(() => {
                    setButtonActive(true);
                  });
            }
          }).finally(
            setButtonActive(true)
          );
    }

  return (
    <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit}>
        <label htmlFor="myMessage" className='myFont text-2xl md:text-3xl w-max sm:text-3xl font-medium ml-1 text-White'>
            {i18n.language === 'ar' ? "شارك قصتك" : "Share your story"}
        </label>
        <textarea id='myMessage' rows="6" name='message' value={currFormData.message} onChange={handleChange} placeholder= {isRTL ? "اكتب قصتك..." : "Type your story..."}
            className="w-full rounded-md px-4 bg-[#E1E1E1] text-Black text-sm py-3 outline-Black resize-none"></textarea>
        <button
        className={`text-white ${!buttonActive && "pointer-events-none opacity-50"} bg-[#e42041] hover:bg-[#c12640] tracking-wide rounded-md text-lg px-4 py-3 w-full !mt-6`}>
            {isRTL ? "مشاركة" : "Share"}
        </button>
    </form>
  )
}
