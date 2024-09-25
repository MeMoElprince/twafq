import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../Components/CustomHooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { getSingleItem } from '../../Store/urls'
import Profile from './Profile/Profile'
import Spinner from '../../Components/Ui-Components/Spinner'
import { AuthenticationContext } from '../../Store/Context/Authentication'

export default function UserProfile() {
    const { id } = useParams()
    // const { Token } = useContext(AuthenticationContext)
    // const { data, loading } = useFetch({
    //     url: getSingleItem(id),
    //     method: 'GET',
    //     Token
    // })
    const Navigate = useNavigate()


    // useEffect(() => {
    //     console.log({ data })
    // }, [data])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // if (data && data.status !== 'success') {
    //     Navigate('/Explore')
    // }

    return (
        <>
            <div className='w-full bg-Beige center flex-col gap-4'>
                {/* {!loading && <>
                    <Profile itemDetials={data.data.productItem} />
                    <ReviewCards />
                    <ExtraDetails itemDetials={data.data.productItem} />
                    <SimilarProducts /> 
                </>}
                {loading && <div className='center h-screen'>
                    <Spinner />
                </div>} */}
              <>
                    <Profile />
                </>
            </div>
        </>
    );
}