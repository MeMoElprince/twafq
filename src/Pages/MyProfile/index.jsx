import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Components/Profile'
import { AuthenticationContext } from '../../Store/Context/Authentication'


export default function MyProfile() {
    const { formData, Token, isLogedIn } = useContext(AuthenticationContext)
    const Navigate = useNavigate()


    // useEffect(() => {
    //     console.log({ data })
    // }, [data])

    useEffect(() => {
        scrollTo(0, 0);
    }, [])


    if (!Token || !isLogedIn) {
        Navigate('/')
    }

    if(!formData)
            return;

    return (
        <>
            { formData &&
                <div className='w-full bg-Beige center flex-col gap-4 relative'>
                { formData && <Profile profileDetails = { formData } />}
                </div>
            }
        </>
    );
}