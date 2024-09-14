import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../Components/CustomHooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { getSingleItem } from '../../Store/urls'
import Profile from './Profile/Profile'
import Spinner from '../../Components/Ui-Components/Spinner'
import { AuthenticationContext } from '../../Store/Context/Authentication'

const dummyDetails = 
    {
        "firstName": "احمد",
        "lastName": "سعد",
        "gender": { "ar": "ذكر", "en": "Male" },
        "age": 28,
        "weight": 75,
        "height": 175,
        "skinColor": { "ar": "قمحاوي", "en": "Moderate Brown" },
        "shape": { "ar": "متوسط", "en": "Average" },
        "healthCondition": { "ar": "ألم الظهر", "en": "Back pain" },
        "religion": { "ar": "الإسلام", "en": "Islam" },
        "doctrine": { "ar": "سني", "en": "Sunni" },
        "religiousCommitment": { "ar": "ملتزم", "en": "Committed" },
        "smoking": { "ar": "غير مدخن", "en": "Non-Smoker" },
        "familyStatus": { "ar": "أعزب", "en": "Single" },
        "marriageType": { "ar": "الزوجة الأولى", "en": "First Wife" },
        "children": 0,
        "educationLevel": { "ar": "درجة البكالوريوس", "en": "Bachelor's Degree" },
        "financialStatus": { "ar": "متوسط", "en": "Average" },
        "nationality": { "ar": "مصري", "en": "Egyptian" },
        "country": { "ar": "مصر", "en": "Egypt" },
        "city": { "ar": "القاهرة", "en": "Cairo" },
        "residence": { "ar": "مدينة نصر", "en": "Nasr City" },
        "work": { "ar": "مهندس معماري", "en": "Architect" },
        "selfDescription": "أنا شخص هادئ وبسيط.",
        "partnerDescription": "أبحث عن شريك طيب القلب وصادق.",
        "phone": "+20 1234567890",
        "isVerified": true,
    }

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
                    <Profile profileDetails = { dummyDetails } />
                    {/* <ReviewCards /> */}
                    {/* <ExtraDetails isFavourite = {0} /> */}
                    {/* <SimilarProducts />  */}
                </>
            </div>
        </>
    );
}