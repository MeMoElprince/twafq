import { useState, useEffect, useContext } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../Components/NavBar/NavBar"
import Footer from "../Components/Footer/Footer"
import useFetch from '../Components/CustomHooks/useFetch'
import { MyDataUrl } from '../Store/urls';
import Cookies from "js-cookie";
import { AuthenticationContext } from "../Store/Context/Authentication";
import AppDownload from "../Components/AppDownload/AppDownload"
import RateUs from "../Components/RateUs/RateUs"
import { useLayoutDirection } from "../Store/Context/LayoutDirectionContext"
import { useTranslation } from "react-i18next"
import Requests from "../Components/Requests/Requests"
import ReceivedRequests from "../Components/ReceivedRequests/ReceivedRequests"
import AccepetedRequests from "../Components/AccepetedRequests.jsx/AccepetedRequests"

export default function Root() {
  const { isRTL, setIsRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");
  const [popActive, setPopActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const {
    setIsLogedIn,
    setFirstName,
    setLastName,
    setEmail,
    setGender,
    setPhone,
    setAge,
    setWeight,
    setHeight,
    setSkinColor,
    setShape,
    setHealth,
    setNationality,
    setCountry,
    setCity,
    setResidence,
    setFamilyStatus,
    setMarriageType,
    setChildreen,
    setEducationLevel,
    setWork,
    setFinancialStatus,
    setReligion,
    setDoctrine,
    setReligiousCommitment,
    setSmoking,
    setSelfDescription,
    setPartnerDescription,
    setIsChecked,
    setColorAnswers,
  } = useContext(AuthenticationContext);
  
  const { retData: data } = useFetch({
    url: MyDataUrl(),
    method: 'GET',
    setErrorMessage,
    Token: Cookies.get('token'),
  });

  console.log(data);
  
  useEffect(() => {
    if (!data) return;

    if (data) {
      setIsLogedIn(true);

      const user = data;

      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
      setEmail(user?.username || '');
      setGender([user?.gender[!isRTL] || '', '']);
      setPhone(user?.phone || '');
      setAge(user?.age || '');
      setWeight(user?.weight || '');
      setHeight(user?.height || '');
      setSkinColor([user?.skinColor[!isRTL] || '', '']);
      setShape([user?.shape[!isRTL] || '', '']);
      setHealth([user?.health[!isRTL] || '', '']);
      setNationality([user?.nationality[!isRTL] || '', '']);
      setCountry([user?.country[!isRTL] || '', '', '']);
      setCity([user?.city[!isRTL] || '', '']);
      setResidence([user?.residence[!isRTL] || '', '']);
      setFamilyStatus([user?.familyStatus[!isRTL] || '', '']);
      setMarriageType([user?.marriageType[!isRTL] || '', '']);
      setChildreen(user?.children || '');
      setEducationLevel([user?.educationLevel[!isRTL] || '', '']);
      setWork(user?.work || '');
      setFinancialStatus([user?.financialStatus[!isRTL] || '', '']);
      setReligion([user?.religion[!isRTL] || '', '']);
      setDoctrine([user?.doctrine[!isRTL] || '', '']);
      setReligiousCommitment([user?.religiousCommitment[!isRTL] || '', '']);
      setSmoking([user?.smoking[!isRTL] || '', '']);
      setSelfDescription(user?.selfDescription || '');
      setPartnerDescription(user?.partnerDescription || '');
      setIsChecked(user?.isChecked || false);
      setColorAnswers(user?.colorAnswers);
    } else {
      setIsLogedIn(false);
    }
  }, [data, setIsLogedIn, setFirstName, setLastName, setColorAnswers, setEmail, setGender, setPhone, setAge, setWeight, setHeight, setSkinColor, setShape, setHealth, setNationality, setCountry, setCity, setResidence, setFamilyStatus, setMarriageType, setChildreen, setEducationLevel, setWork, setFinancialStatus, setReligion, setDoctrine, setReligiousCommitment, setSmoking, setSelfDescription, setPartnerDescription, setIsChecked]);


  useEffect(() => {
    if (popActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }
  }, [popActive])

  const mainStyle = popActive ? 'opacity-30 imgSettings' : ''

  return (
    <main className="bg-White overflow-hidden">
      <NavBar />
      <div>
        <div className={mainStyle}>
          <Outlet />
        </div>
      </div>
      <div className="absolute w-full h-screen top-0 left-0">
        {/* <Requests
          title={i18n.language === 'ar' ? "الطلبات المرسلة" : "Sent requests"} 
          subTitle={i18n.language === 'ar' ? "سيحذف خلال يوم" : "Deleting within a day"} 
        /> */}
        {/* <ReceivedRequests
          title={i18n.language === 'ar' ? "الطلبات المرسلة إليك" : "Requests sent to you"} 
          subTitle={i18n.language === 'ar' ? "سيحذف خلال يوم" : "Deleting within a day"} 
        /> */}
        {/* <AccepetedRequests
          title={i18n.language === 'ar' ? "الطلبات المقبولة" : "Accepted Requests"} 
        /> */}
      </div>
      <div className="center w-[full] bg-Black gap-0 md4:gap-32 px-16 md4:px-32 md4:flex-row flex-col pt-16 pb-2 -mb-1">
        <RateUs />
        <AppDownload />
      </div>
      <Footer />
    </main>
  )
}
