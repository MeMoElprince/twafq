import React from "react";
import Woman from '../../../assets/Avatars/woman.png'
import Man from '../../../assets/Avatars/man.png'
import verifiedMan from '../../../assets/Avatars/verifiedMan.png'
import verifiedWoman from '../../../assets/Avatars/verifiedWoman.png'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'

export default function Card({ userDetails }) {
    var english = /^[A-Za-z]*$/;
    const { isRTL, setIsRTL } = useLayoutDirection();

  return (
    <button class="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-[#FFE5E8]">
      <div class="flex size-14 items-center rounded-full overflow-hidden bg-gray-200 text-Black group-hover:bg-pink-300">
        <img
          src={
                userDetails?.isVerified ? 
                userDetails?.gender[1] === 'Male' ? verifiedMan : verifiedWoman 
                :
                userDetails?.gender[1] === 'Male' ? Man : Woman 
            }
          alt="avatar"
          className="object-cover size-14 rounded-full imgSettings"
        />
      </div>
      <div class="flex flex-col items-start justify-between gap-1 font-medium text-Black">
        <div className={`center flex-wrap gap-1 line-clamp-1`}>
          <p class="text-base line-clamp-1">{userDetails?.firstName + " " + userDetails?.lastName}</p>
          <p class="text-[13px]">{"(" + userDetails?.age + " " + (isRTL ? "سنة" : "Years") + ")"}</p>
        </div>
        <span class="text-sm center flex-wrap gap-1 text-Black/70 text-start">
          <p>{(isRTL ? userDetails?.country[0] : userDetails?.country[1]) + ", " + (isRTL ? userDetails?.city[0] : userDetails?.city[1])}</p>
        </span>
      </div>
    </button>
  );
}
