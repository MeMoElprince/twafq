import { useState, useEffect, useContext } from "react"
import { Outlet } from "react-router-dom"
import NavBar from "../Components/NavBar/NavBar"
import Footer from "../Components/Footer/Footer"
import useFetch from '../Components/CustomHooks/useFetch'
import { MyDataUrl } from '../Store/urls';
import Cookies from "js-cookie";
import { AuthenticationContext } from "../Store/Context/Authentication";

import BackdropHolder from "../Components/Ui-Components/BackdropHolder";
import AppDownload from "../Components/AppDownload/AppDownload"
import RateUs from "../Components/RateUs/RateUs"

export default function Root() {
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
    setIsChecked
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

      const user = data.user;

      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
      setEmail(user?.email || '');
      setGender([user?.gender || '', '']);
      setPhone(user?.phone || '');
      setAge(user?.age || '');
      setWeight(user?.weight || '');
      setHeight(user?.height || '');
      setSkinColor([user?.skinColor || '', '']);
      setShape([user?.shape || '', '']);
      setHealth([user?.health || '', '']);
      setNationality([user?.nationality || '', '']);
      setCountry([user?.country || '', '', '']);
      setCity([user?.city || '', '']);
      setResidence([user?.residence || '', '']);
      setFamilyStatus([user?.familyStatus || '', '']);
      setMarriageType([user?.marriageType || '', '']);
      setChildreen(user?.children || '');
      setEducationLevel([user?.educationLevel || '', '']);
      setWork(user?.work || '');
      setFinancialStatus([user?.financialStatus || '', '']);
      setReligion([user?.religion || '', '']);
      setDoctrine([user?.doctrine || '', '']);
      setReligiousCommitment([user?.religiousCommitment || '', '']);
      setSmoking([user?.smoking || '', '']);
      setSelfDescription(user?.selfDescription || '');
      setPartnerDescription(user?.partnerDescription || '');
      setIsChecked(user?.isChecked || false);
    } else {
      setIsLogedIn(false);
    }
  }, [data, setIsLogedIn, setFirstName, setLastName, setEmail, setGender, setPhone, setAge, setWeight, setHeight, setSkinColor, setShape, setHealth, setNationality, setCountry, setCity, setResidence, setFamilyStatus, setMarriageType, setChildreen, setEducationLevel, setWork, setFinancialStatus, setReligion, setDoctrine, setReligiousCommitment, setSmoking, setSelfDescription, setPartnerDescription, setIsChecked]);


  return (
    <main className="bg-White">
      <NavBar />
      <div>
        <div>
          <Outlet />
        </div>
      </div>
      <div>
        <BackdropHolder />
      </div>
      <div className="center w-[full] bg-Black gap-0 md4:gap-32 px-16 md4:px-32 md4:flex-row flex-col pt-16 pb-2 -mb-1">
        <RateUs />
        <AppDownload />
      </div>
      <Footer />
    </main>
  )
}
