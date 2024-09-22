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
  const { isRTL } = useLayoutDirection();
  const [popActive, setPopActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { handleFormDataChange, setIsLogedIn, isLogedIn } = useContext(AuthenticationContext);
  
  const { retData: data } = useFetch({
    url: `${MyDataUrl()}token=${Cookies.get('token')}`,
    method: 'GET',
    setErrorMessage,
    Token: Cookies.get('token'),
  });

  console.log(data);
  console.log(isLogedIn)

  useEffect(() => {
    if (!data) return;

    if (data) {
      setIsLogedIn(true);
      console.log(isLogedIn)
      const user = data;

      // Updating formData
      handleFormDataChange('firstName', user?.firstName || '');
      handleFormDataChange('lastName', user?.lastName || '');
      handleFormDataChange('id', user?.id || '');
      handleFormDataChange('email', user?.email || '');
      handleFormDataChange('gender', user?.gender || ['', '']);
      handleFormDataChange('phone', user?.phone || '');
      handleFormDataChange('age', user?.age || 0);
      handleFormDataChange('weight', user?.weight || 0);
      handleFormDataChange('height', user?.height || 0);
      handleFormDataChange('skinColor', user?.skinColor || ['', '']);
      handleFormDataChange('shape', user?.shape || ['', '']);
      handleFormDataChange('health', user?.health || ["انا بحالة جيدة", "I'm fine"]);
      handleFormDataChange('nationality', user?.nationality || ['', '']);
      handleFormDataChange('country', user?.country || ['', '', '']);
      handleFormDataChange('city', user?.city || ["القاهرة", "Cairo"]);
      handleFormDataChange('residence', user?.residence || ['', '']);
      handleFormDataChange('familyStatus', user?.familyStatus || ['', '']);
      handleFormDataChange('marriageType', user?.marriageType || ['', '']);
      handleFormDataChange('children', user?.children || 0);
      handleFormDataChange('educationLevel', user?.educationLevel || ['', '']);
      handleFormDataChange('work', user?.work || '');
      handleFormDataChange('financialStatus', user?.financialStatus || ['', '']);
      handleFormDataChange('religion', user?.religion || ['', '']);
      handleFormDataChange('doctrine', user?.doctrine || ['', '']);
      handleFormDataChange('religiousCommitment', user?.religiousCommitment || ['', '']);
      handleFormDataChange('smoking', user?.smoking || ['', '']);
      handleFormDataChange('selfDescription', user?.selfDescription || '');
      handleFormDataChange('partnerDescription', user?.partnerDescription || '');
      handleFormDataChange('isChecked', user?.isChecked || false);
      handleFormDataChange('colorAnswers', user?.colorAnswers || []);
    } else {
      setIsLogedIn(false);
      // console.log("Logged out")
    }
}, [data, isRTL]);



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
      {
        popActive && 
        (
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
        )
      }
      <div className="center w-[full] bg-Black gap-0 md4:gap-32 px-16 md4:px-32 md4:flex-row flex-col pt-16 pb-2 -mb-1">
        <RateUs />
        <AppDownload />
      </div>
      <Footer />
    </main>
  )
}
