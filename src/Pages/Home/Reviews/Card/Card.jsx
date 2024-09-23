import React, {useState, useEffect} from "react";
import { useLayoutDirection } from "../../../../Store/Context/LayoutDirectionContext";
import Woman from '../../../../assets/Avatars/woman.png'
import Man from '../../../../assets/Avatars/man.png'
import verifiedMan from '../../../../assets/Avatars/verifiedMan.png'
import verifiedWoman from '../../../../assets/Avatars/verifiedWoman.png'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getUserProfile } from "../../../../Store/urls";
import useFetch from "../../../../Components/CustomHooks/useFetch";



export default function Card({ userInfo }) {
  const { isRTL } = useLayoutDirection();
  const { retData: data, loading: userLoading } = useFetch({
    url: `${getUserProfile()}userId=${userInfo.userId}`,
    method: "GET",
  });
  const [userDetails, setUserDetails] = useState(data);
  const [loadingUser, setLoadingUser] = useState(userLoading);

  useEffect(() => {
    if (data) {
      setUserDetails(data);
      setLoadingUser(false);
    }
    // console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  if(!userInfo?.story || !userDetails)
      return;

  return (
    <div className="p-6 select-none relative pt-[82px] w-[90%] rounded-2xl myFont overflow-hidden mx-auto mt-4">

      <div className="flex flex-col items-center gap-4">
        <Link to={`userprofile/${userDetails?.id}`} aria-label={isRTL ? `${userDetails?.firstName}الملف الشخصي الخاص ب` : `${userDetails?.firstName} Profile`} className="min-h-[110px]">
          <img
            src={
                userDetails?.isVerifiedUser ? 
                userDetails?.gender[1] === 'Male' ? verifiedMan : verifiedWoman 
                :
                userDetails?.gender[1] === 'Male' ? Man : Woman 
            }
            alt="Avatar"
            className="w-32 h-32 rounded-full pointer-events-none"
          />
        </Link>

        <div className="mt-4 text-center center flex-col gap-2">
          <div className="center flex-wrap w-full gap-2">
            <p className="text-lg text-Black font-bold">{userDetails?.firstName + " " + userDetails?.lastName}</p>
            <p className="text-md text-Black font-medium">{"(" + userDetails?.age + " " + (isRTL ? "سنة" : "Years") + ")"}</p>
          </div>
          <div className="center flex-wrap w-full gap-2">
            <FaLocationDot size={16} className="text-Black"/>
            <p className="text-md text-Black font-bold">{(isRTL ? userDetails?.country[0] : userDetails?.country[1]) + ", " + (isRTL ? userDetails?.city[0] : userDetails?.city[1])}</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-[90%] md4:w-[70%] gap-2 mt-4">
            <p className="text-lg text-Black/85 overflow-hidden text-center leading-[28px]">{userInfo?.story}</p>
        </div>
      </div>
    </div>
  );
}
