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



export default function Card({ userDetails }) {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");

  return (
    <div className="p-6 select-none relative pt-[82px] w-[90%] rounded-2xl myFont overflow-hidden mx-auto mt-4">

      <div className="flex flex-col items-center gap-4">
        <div className="min-h-[110px]">
          <img
            src={
                userDetails?.isVerified ? 
                userDetails?.gender.en === 'Male' ? verifiedMan : verifiedWoman 
                :
                userDetails?.gender.en === 'Male' ? Man : Woman 
            }
            className="w-32 h-32 rounded-full pointer-events-none"
          />
        </div>

        <div className="mt-4 text-center center flex-col gap-2">
          <div className="center flex-wrap w-full gap-2">
            <p className="text-lg text-Black font-bold">{userDetails?.firstName + " " + userDetails?.lastName}</p>
            <p className="text-md text-Black font-medium">{"(" + userDetails?.age + " " + (isRTL ? "سنة" : "Years") + ")"}</p>
          </div>
          <div className="center flex-wrap w-full gap-2">
            <FaLocationDot size={16} className="text-Black"/>
            <p className="text-md text-Black font-bold">{(isRTL ? userDetails?.country.ar : userDetails?.country.en) + ", " + (isRTL ? userDetails?.city.ar : userDetails?.city.en)}</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-[90%] md4:w-[70%] gap-2 mt-4">
            <p className="text-lg text-Black/85 overflow-hidden text-center leading-[28px]">{userDetails?.message}</p>
        </div>
      </div>
    </div>
  );
}