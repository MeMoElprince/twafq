import { useEffect, useState } from "react"
import Shop from "./SearchPage"
import useFetch from "../../Components/CustomHooks/useFetch"
import { getUsers } from "../../Store/urls"

const dummyDetails = {
  data:{
    userCards:[
      {
        "firstName": "سارة",
        "lastName": "سعد",
        "gender": { "ar": "انثى", "en": "Female" },
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
        "isVerified": false,
        "compatibilityRatio" : 43
    },
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
      "compatibilityRatio" : 78
  },
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
    "compatibilityRatio" : 78
},
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
  "compatibilityRatio" : 78
},
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
  "compatibilityRatio" : 78
},
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
  "compatibilityRatio" : 78
}
    ]
  }
}

export default function Explore() {
  const queryParams = new URLSearchParams(location.search);
  const [usersUrl, setUsersUrl] = useState(getUsers())
  const [errorMessage, setErrorMessage] = useState('')
  const { retData: users, loading: usersLoading } = useFetch({ url: usersUrl, method: 'GET', setErrorMessage })
  const [usersS, setUsersS] = useState([])
  // const [loadingCategories, setLoadingCategories] = useState(CatLoading)
  const [loadingUsers, setLoadingUsers] = useState(false)
  useEffect(() => {
    if (users) {
      setUsersS(users)
      usersLoading(false)
    }
  }, [users])

  useEffect(() => {
    console.log({ users });
  }, [users])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <div style={{
      background: '#F4F4F8'
    }} className="relative w-full min-h-screen text-Black flex flex-col items-center gap-40">
      <Shop
        setUsersUrl = {setUsersUrl} usersUrl={usersUrl}
        loadingUsers = {loadingUsers} setLoadingUsers = {setLoadingUsers}
        usersS = {usersS} setUsersS = {setUsersS}
        />
    </div>
  )
}