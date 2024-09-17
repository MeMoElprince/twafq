import { useEffect, useState } from "react"
import SearchPage from "./SearchPage"
import useFetch from "../../Components/CustomHooks/useFetch"
import { getUsers } from "../../Store/urls"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"


export default function Explore() {
  const queryParams = new URLSearchParams(location.search);
  const {t, i18n} = useTranslation("global")
  const { page } = useParams("page");
  const [usersUrl, setUsersUrl] = useState(getUsers())
  const [errorMessage, setErrorMessage] = useState('')
  const sortTypeLabels = [
    ['اعلى نسبة توافق', 'Highest Compatibility'],
    ['اقل نسبة توافق', 'Lowest Compatibility'],
    ['النشاط الاحدث', 'Most Recent Activity'],
    ['الاصغر في السن', 'Youngest'],
    ['الاكبر في السن', 'Oldest'],
    ['اعلى مستوى تعليمي', 'Highest Education Level'],
  ];
  const [formData, setFormData] = useState({
    gender: ["", ""],
    minAge: 18,
    maxAge: 100,
    nationality: ["", ""],
    country: ["", "", ""],
    city: ["", ""],
    countryOfResidence: ["", ""],
    familyStatus: ["", ""],
    marriageType: ["", ""],
    religion: ["", ""],
    doctrine: ["", ""],
    sortType: sortTypeLabels[1],
    page: page,
    size: 10,
  });
  const [retFormData, setRetFormData] = useState({
    gender: formData.gender[1],
    minAge: 18,
    maxAge: 100,
    nationality: formData.nationality[1],
    country: formData.country[1],
    city: formData.city[1],
    countryOfResidence: formData.countryOfResidence[1],
    maritalStatus: formData.familyStatus[1],
    marriageType: formData.marriageType[1],
    religion: formData.religion[1],
    doctrine: formData.doctrine[1],
    sortType: sortTypeLabels[1],
    page: page,
    size: 10,
  });

  // console.log(retFormData)
  const { retData: users, loading: usersLoading } = useFetch({ url: usersUrl, method: 'POST', setErrorMessage, body: retFormData })
  const [usersS, setUsersS] = useState([])
  // const [loadingCategories, setLoadingCategories] = useState(CatLoading)
  const [loadingUsers, setLoadingUsers] = useState(false)
  useEffect(() => {
    if (users) {
      setUsersS(users)
      setLoadingUsers(false)
    }
  }, [users])

  useEffect(() => {
    console.log(users);
  }, [users])


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  


  return (
    <div style={{
      background: '#F4F4F8'
    }} className="relative w-full min-h-screen text-Black flex flex-col items-center gap-40">
      <Helmet>
          <title>{i18n.language === 'ar' ? "البحث عن شريك" : "Find a partner"}</title>
          <meta name='description' content={
            i18n.language === 'ar'
            ? 'استكشف أفضل الخيارات للعثور على شريك الحياة المثالي من خلال أداة البحث المتقدمة لدينا. ابحث عن توافقات مثالية واستمتع بتجربة بحث مريحة وفعالة.'
            : 'Explore top options to find your perfect life partner with our advanced search tool. Discover ideal matches and enjoy a seamless and effective search experience.'
          } />
      </Helmet>
      <SearchPage
        page = {page}
        formData = {formData} setFormData = {setFormData}
        setUsersUrl = {setUsersUrl} usersUrl={usersUrl}
        loadingUsers = {loadingUsers} setLoadingUsers = {setLoadingUsers}
        usersS = {usersS} setUsersS = {setUsersS}
        />
    </div>
  )
}