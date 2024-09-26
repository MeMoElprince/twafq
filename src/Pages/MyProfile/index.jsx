import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Components/Profile'
import { AuthenticationContext } from '../../Store/Context/Authentication'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'


export default function MyProfile() {
    const { formData, Token, isLogedIn } = useContext(AuthenticationContext)
    const Navigate = useNavigate()
    const {i18n} = useTranslation("global")


    // useEffect(() => {
    //     console.log({ data })
    // }, [data])

    useEffect(() => {
        scrollTo(0, 0);
    }, [])


    if (!Token || !isLogedIn) {
        Navigate("/", { replace: true });
    }

    if(!formData)
            return;

    return (
        <>
            <Helmet>
                <title>{i18n.language === 'ar' ? "الملف الشخصي" : "Profile"}</title>
                <meta name='description' content={i18n.language === 'ar' ? "البيانات الشخصية" : "Personal Information"} />
            </Helmet>
            { formData &&
                <div className='w-full bg-Beige center flex-col gap-4 relative'>
                { formData && <Profile profileDetails = { formData } />}
                </div>
            }
        </>
    );
}