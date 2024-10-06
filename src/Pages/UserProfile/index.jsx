import { useEffect } from 'react'
import Profile from './Profile/Profile'

export default function UserProfile() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className='w-full bg-Beige center flex-col gap-4'>
              <>
                <Profile />
            </>
            </div>
        </>
    );
}