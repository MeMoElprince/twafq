import React from "react";
import Woman from '../../../assets/Avatars/woman.png'
import Man from '../../../assets/Avatars/man.png'
import verifiedMan from '../../../assets/Avatars/verifiedMan.png'
import verifiedWoman from '../../../assets/Avatars/verifiedWoman.png'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import i18next from "i18next";

export default function Card({ userDetails }) {
    var english = /^[A-Za-z]*$/;
    const { isRTL, setIsRTL } = useLayoutDirection();

  return (
    <div className="group flex relative flex-col items-center gap-10 rounded-md px-2.5 py-3 transition-all duration-75 hover:bg-gray-200/80">
      
      <div className={`absolute size-11 ${!isRTL ? "right-[5%]" : "left-[5%]"} bottom-[43%]`}>
        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          {/* <!-- Background Circle --> */}
          <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-DarkPink/30" strokeWidth="4"></circle>
          {/* <!-- Progress Circle --> */}
          <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-DarkPink" strokeWidth="4" stroke-dasharray="100" stroke-dashoffset={100 - userDetails?.compatibilityRatio} stroke-linecap="round"></circle>
        </svg>

        {/* <!-- Percentage Text --> */}
        <div className={`absolute top-[47%] ${isRTL ? "end-1/2" : "start-1/2"} transform -translate-y-1/2 -translate-x-1/2`}>
          <span className="text-center text-xs font-semibold text-DarkPink">{userDetails?.compatibilityRatio}&#x25;</span>
        </div>
      </div>

      <button className="flex items-center gap-x-5 w-full">
        <div className="flex size-14 items-center shrink-0 rounded-full overflow-hidden bg-gray-200 text-Black group-hover:bg-pink-300">
          <img
            src={
                  userDetails?.isVerifiedUser ? 
                  userDetails?.gender[1] === 'Male' ? verifiedMan : verifiedWoman 
                  :
                  userDetails?.gender[1] === 'Male' ? Man : Woman 
              }
            alt="avatar"
            className="object-cover size-14 rounded-full imgSettings"
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-1 font-medium text-Black">
          <div className={`flex items-center flex-wrap gap-1 line-clamp-1`}>
            <p className="text-base line-clamp-1 break-all">{userDetails?.firstName + " " + userDetails?.lastName}</p>
            <p className="text-[13px]">{"(" + userDetails?.age + " " + (isRTL ? "سنة" : "Years") + ")"}</p>
          </div>
          <span className="text-sm center flex-wrap gap-1 text-Black/70 text-start">
            <p>{(isRTL ? userDetails?.country[0] : userDetails?.country[1]) + "" + (isRTL ? "": "")}</p>
          </span>
        </div>
      </button>
      <div className="center gap-3 max-w-sm w-full overflow-visible">
          <button className="py-2.5 w-[100px] rounded-full text-sm font-medium text-white bg-[#28a745] hover:bg-[#2bb34a] shadow-lg hover:w-[120px] transition-all duration-300">{i18next.language === 'ar' ? "قبول" : "Accept"}</button>
          <button className="py-2.5 w-[100px] rounded-full text-sm font-medium border-2 border-red-600/50 backdrop-blur-lg text-red-600 shadow-lg hover:w-[120px] transition-all duration-300">{i18next.language === 'ar' ? "رفض" : "Decline"}</button>
      </div>
    </div>
  );
}
