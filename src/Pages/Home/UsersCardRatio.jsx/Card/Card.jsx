import React from "react";
import { useLayoutDirection } from "../../../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import Woman from '../../../../assets/Avatars/woman.png'
import Man from '../../../../assets/Avatars/man.png'
import verifiedMan from '../../../../assets/Avatars/verifiedMan.png'
import verifiedWoman from '../../../../assets/Avatars/verifiedWoman.png'
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaCircle } from "react-icons/fa6";



export default function Card({ userDetails }) {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");
  var english = /^[A-Za-z]*$/;

  return (
    <div className="bg-white p-6 select-none relative pt-[82px] border border-Black/20 w-[80%] max-w-[400px] lg2:w-[290px] rounded-2xl myFont overflow-hidden mt-4 mx-auto lg2:mx-0">
      
      <div className="w-full bg-Black/20 h-[50px] absolute top-0 left-0 flex gap-4">
        {
          userDetails ? 
          (
            <>
              <div className={`center w-full gap-2 z-20`}>
                <p className="text-lg font-medium text-Black">{i18n.language === 'ar' ? "نسبة التوافق:" : "Compatibility:"}</p>
                <p className="text-lg font-medium text-Black">{userDetails?.compatibilityRatio}&#x25;</p>
              </div>
              <div className={`h-full bg-gradient-to-r ${i18n.language === 'ar' ? "to-blue-300 from-pink-400" : "from-blue-300 to-pink-400"} absolute z-10`} style={{ width: `${userDetails?.compatibilityRatio}%` }}></div>
            </>
          )
          :
          (
            <div className="w-full center z-20 gap-2">
                <Link to = "/login" className="text-md sm:text-lg font-medium text-Black underline cursor-pointer hover:text-DarkPink">{i18n.language === 'ar' ? "تسجيل الدخول" : "Login"}</Link>
                <p className="text-md sm:text-lg font-medium text-Black">{i18n.language === 'ar' ? "لحساب التوافق" : "To Calculate Compatibility"}</p>
            </div>
          )
        }
      </div>

      {
        userDetails && userDetails?.isVerified && (
        <div className="relative group">
          <MdVerified className="absolute text-blue-600" size={32} />
          <span className={`absolute bg-gray-300 text-Black text-sm font-medium p-1 px-2 mt-[34px] ${isRTL ? "-right-2" : "-left-4"} rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            {i18n.language === 'ar' ? "موثق" : "Verified"}
          </span>
        </div>
        )
      }

        <div className="relative group h-full">
          <div className="center gap-2 absolute top-[108px] shadow-dm border border-Black/10 py-1 px-3 bg-green-200 rounded-full">
            <FaCircle  className={`text-green-600 top-[114px]`} size={12} />
            <p className={`text-sm`}>3 اشهر</p>
          </div>
          <span className={`absolute bg-gray-300 text-Black text-sm font-medium p-1 px-2 top-[140px] ${isRTL ? "-right-6" : "-left-6"} rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            {i18n.language === 'ar' ? "آخر ظهور" : "Last seen"}
          </span>
        </div>


      <div className="flex flex-col items-center gap-4">
        <div className="min-h-[110px]">
          <img
            src={
                userDetails?.isVerified ? 
                userDetails?.gender.en === 'Male' ? verifiedMan : verifiedWoman 
                :
                userDetails?.gender.en === 'Male' ? Man : Woman 
            }
            className="w-28 h-28 rounded-full pointer-events-none"
          />
        </div>

        <div className="mt-4 text-center center flex-col gap-2">
          <div className={`center flex-wrap w-full gap-2 ${(isRTL && english.test(userDetails?.firstName)) || (!isRTL && !english.test(userDetails?.firstName)) ? "flex-row-reverse" : ""}`}>
            <p className="text-lg text-Black font-bold">{userDetails?.firstName + " " + userDetails?.lastName}</p>
            <p className="text-md text-Black font-medium">{"(" + userDetails?.age + " " + (isRTL ? "سنة" : "Years") + ")"}</p>
          </div>
          <div className="center flex-wrap w-full gap-2">
            <FaLocationDot size={16} className="text-Black"/>
            <p className="text-md text-Black font-bold">{(isRTL ? userDetails?.country.ar : userDetails?.country.en) + ", " + (isRTL ? userDetails?.city.ar : userDetails?.city.en)}</p>
          </div>
        </div>

        <div className="flex flex-col w-[90%] gap-2 mt-4">
            <p className="text-md font-semibold text-Black">{i18n.language === 'ar' ? "الوصف الشخصي:" : "About me:"}</p>
            <p className="text-base text-Black/80 break-all hyphenated overflow-hidden line-clamp-3">{userDetails?.selfDescription}</p>
        </div>
      </div>
    </div>
  );
}
