import React, {useState, useEffect} from "react";
import { useLayoutDirection } from "../../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import Woman from '../../../assets/Avatars/woman.png'
import Man from '../../../assets/Avatars/man.png'
import verifiedMan from '../../../assets/Avatars/verifiedMan.png'
import verifiedWoman from '../../../assets/Avatars/verifiedWoman.png'
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaCircle } from "react-icons/fa6";



export default function Card({ userDetailsReceived }) {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");
  var english = /^[A-Za-z]*$/;
  const [lastActive, setLastActive] = useState("");
  const [userDetails, setUserDetails] = useState(userDetailsReceived || {})

  useEffect(() => {
    const calculateLastActive = () => {
      const now = new Date();
      const lastModified = new Date(userDetails?.lastModifiedDate);
      const diffInMilliseconds = now - lastModified;
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);

      if (diffInMinutes < 1) {
        return i18n.language === 'ar' ? "متواجد" : "Online now";
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} ${i18n.language === 'ar' ? "دقيقة" : "minutes"}`;
      } else if (diffInHours < 24) {
        return `${diffInHours} ${i18n.language === 'ar' ? "ساعة" : "hours"}`;
      } else if (diffInDays < 7) {
        return i18n.language === 'ar' 
        ? (diffInDays === 1 ? "يوم" : (diffInDays === 2 ? "يومان" : diffInDays + " ايام"))
        : `${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
      } else if (diffInWeeks < 4) {
        return i18n.language === 'ar' 
        ? (diffInWeeks === 1 ? "اسبوع" : (diffInWeeks === 2 ? "اسبوعان" : diffInWeeks + " اسابيع"))
        : `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"}`;
      } else {
        return i18n.language === 'ar' 
        ? (diffInMonths === 1 ? "شهر" : (diffInMonths === 2 ? "شهران" : diffInMonths + " شهور"))
        : `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"}`;
      }
    };
    
    setLastActive(calculateLastActive());
  }, [userDetails?.lastModifiedDate, i18n.language]);

  const containsLongWord = (sentence) => {
    return sentence.split(" ").some((word) => word.length > 14);
  };

  return (
    <div className="bg-white p-6 select-none relative pt-[82px] h-[470px] border border-Black/20 max-w-[400px] w-[100%] md:w-[50%] md4:w-[35%] lg:w-[30%] rounded-2xl myFont overflow-hidden mt-4">
      
      <div className="w-full bg-Black/20 h-[50px] absolute top-0 left-0 flex gap-4">
        {
          userDetails && userDetails.compatibilityRatio ? 
          (
            <>
              <div className={`center w-full gap-2 z-20`}>
                <p className="text-lg font-medium text-Black">{i18n.language === 'ar' ? "نسبة التوافق:" : "Compatibility:"}</p>
                <p className="text-lg font-medium text-Black">{userDetails?.compatibilityRatio} &#x25;</p>
              </div>
              <div className={`h-full bg-gradient-to-r ${i18n.language === 'ar' ? "to-blue-300 from-pink-400" : "from-blue-300 to-pink-400"} absolute z-10`} style={{ width: `${userDetails?.compatibilityRatio}%` }}></div>
            </>
          )
          :
          (
            <div className="w-full center z-20 gap-2">
                <Link to = "/login" className="text-md sm:text-lg font-medium text-Black underline cursor-pointer hover:text-DarkPink">{i18n.language === 'ar' ? "تسجيل الدخول" : "Login"}</Link>
                <p className="text-md sm:text-lg font-medium text-Black">{i18n.language === 'ar' ? "لإظهار التوافق" : "to show compatibility"}</p>
            </div>
          )
        }
      </div>

      {
        userDetails && userDetails.isVerifiedUser && (
        <div className="relative group">
          <MdVerified className="absolute text-blue-600" size={32} />
          <span className={`absolute bg-gray-300 text-Black pointer-events-none text-sm font-medium p-1 px-2 mt-[34px] ${isRTL ? "-right-2" : "-left-4"} rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <span className={`absolute bg-gray-300 text-Black pointer-events-none text-sm font-medium p-1 px-2 mt-[34px] ${isRTL ? "-right-2" : "-left-4"} rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            {i18n.language === 'ar' ? "موثق" : "Verified"}
          </span>
        </div>
        )
      }

        <div className="absolute group w-full">
          <div className="center gap-2 absolute top-[120px] shadow-dm border border-Black/10 py-1 px-3 bg-green-200 rounded-full">
          <div className="center gap-2 absolute top-[120px] shadow-dm border border-Black/10 py-1 px-3 bg-green-200 rounded-full">
            <FaCircle  className={`text-green-600`} size={12} />
            <p className={`text-sm`}>{lastActive}</p>
          </div>
          <span className={`absolute bg-gray-300 text-Black pointer-events-none text-sm font-medium p-1 px-2 top-[152px] ${isRTL ? "-right-6" : "-left-6"} rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            {i18n.language === 'ar' ? "آخر ظهور" : "Last seen"}
          </span>
        </div>


      <div className="flex flex-col items-center gap-4">
        <div className="min-h-[130px]">
        <div className="min-h-[130px]">
          <img
            src={
                userDetails?.isVerifiedUser ? 
                userDetails && userDetails.gender[1] === 'Male' ? verifiedMan : verifiedWoman 
                :
                userDetails && userDetails.gender[1] === 'Male' ? Man : Woman 
            }
            alt="Avatar"
            alt="Avatar"
            className="w-28 h-28 rounded-full pointer-events-none"
          />
        </div>

        <div className="mt-4 text-center center flex-col gap-2">
          <div className={`center flex-wrap w-full gap-2 ${(isRTL && english.test(userDetails?.firstName)) || (!isRTL && !english.test(userDetails?.firstName)) ? "flex-row-reverse" : ""}`}>
            <p className={`text-lg text-Black font-bold line-clamp-1 max-w-[90%]`}
               style={{direction : `${(isRTL && english.test(userDetails?.firstName)) || (!isRTL && !english.test(userDetails?.firstName)) ? isRTL ? "ltr" : "rtl" : ""}`}}
            >
            {userDetails?.firstName + " " + userDetails?.lastName}
            </p>
            <p className="text-md text-Black font-medium">{"(" + userDetails?.age + " " + (isRTL ? "سنة" : "Years") + ")"}</p>
          </div>
          <div className="center flex-wrap w-full gap-2">
            <FaLocationDot size={16} className="text-Black"/>
            <p className="text-md text-Black font-bold">{
            (
              isRTL 
              ? (userDetails && userDetails.country && userDetails.country[0])
              : (userDetails && userDetails.country && userDetails.country[1])
            ) + (userDetails?.city && userDetails?.country && userDetails.country[1] ? ", " : "") + 
            (
              isRTL 
              ? (userDetails && userDetails.city && userDetails.city[0]) 
              : (userDetails && userDetails.city && userDetails.city[1])
            )
              }</p>
          </div>
        </div>

        <div className="flex flex-col w-[90%] gap-2 mt-4">
            <p className="text-md font-semibold text-Black">{i18n.language === 'ar' ? "الوصف الشخصي:" : "About me:"}</p>
            <p className={`text-base text-Black/80 ${containsLongWord(userDetails?.selfDescription || "") && "break-all hyphenated"} overflow-hidden line-clamp-3`}>{userDetails?.selfDescription || (isRTL ? "عند التعارف" : "After Messaging")}</p>
        </div>
      </div>
    </div>
  );
}