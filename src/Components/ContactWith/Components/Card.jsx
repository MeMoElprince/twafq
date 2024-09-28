import React, {useState, useEffect} from "react";
import Woman from '../../../assets/Avatars/woman.png'
import Man from '../../../assets/Avatars/man.png'
import verifiedMan from '../../../assets/Avatars/verifiedMan.png'
import verifiedWoman from '../../../assets/Avatars/verifiedWoman.png'
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import { MdContactPhone } from "react-icons/md";
import useFetch from "../../CustomHooks/useFetch";
import { getUserProfile } from "../../../Store/urls";
import { Link } from "react-router-dom";
import { likeMeTarget } from "../../../Store/urls";
import { getPhoneURL } from "../../../Store/urls";
import Fetch from "../../CustomHooks/Fetch";

export default function Card({ id, formData, isLogedIn, Token, setPopActive, setPopType }) {
    const { isRTL } = useLayoutDirection();
    const [hasContact, setHasContact] = useState(false);
    const { retData: data, loading: dataLoading } = useFetch({
      url: `${getUserProfile()}userId=${id}`,
      method: "GET",
    });
    const [dataA, setDataA] = useState(data);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberHolder, setPhoneNumberHolder] = useState({});
    // console.log(id)
    const [loadingData, setLoadingData] = useState(dataLoading);
  
    useEffect(() => {
        if (data) {
            setDataA(data);
            setHasContact(formData?.usersContactWith?.includes(dataA?.id));
            setLoadingData(false);
        }
    }, [data, formData]);

    // console.log(formData.id)

    const { retData: ratio } = useFetch({
      url:
        Token && isLogedIn && formData?.id && id
          ? `${likeMeTarget()}userId=${formData.id}&targetId=${id}`
          : null,
      Token,
    });

    useEffect(() => {
      if(!hasContact && dataA?.id){
        Fetch({
          url: `${getPhoneURL()}${dataA?.id && `userId=${dataA.id}`}`,
          Token,
          setData: setPhoneNumberHolder
        })
      }
    }, [hasContact, dataA?.id])

    useEffect(() => {
      if(phoneNumberHolder){
        setPhoneNumber(phoneNumberHolder.statusMsg);
        // console.log(phoneNumber)
      }
    }, [phoneNumberHolder])

    const [compatibilityRatio, setCompatibilityRatio] = useState(0);

    useEffect(() => {
      if (isLogedIn && ratio) {
        setCompatibilityRatio(Math.round(ratio));
      }
      // console.log(compatibilityRatio)
    }, [ratio, isLogedIn, Token]);
  


  return (
    <div className="group flex relative flex-col items-center gap-10 rounded-md px-2.5 py-3 transition-all duration-75 hover:bg-gray-200/80">
      
      <div className={`absolute size-11 ${!isRTL ? "right-[5%]" : "left-[5%]"} bottom-[43%]`}>
        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          {/* <!-- Background Circle --> */}
          <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-DarkPink/30" strokeWidth="4"></circle>
          {/* <!-- Progress Circle --> */}
          <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-DarkPink" strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - (isLogedIn ? compatibilityRatio || 72 : 72)} strokeLinecap="round"></circle>
        </svg>

        {/* <!-- Percentage Text --> */}
        <div className={`absolute top-[47%] ${isRTL ? "end-1/2" : "start-1/2"} transform -translate-y-1/2 -translate-x-1/2`}>
          <span className="text-center text-xs font-semibold text-DarkPink"> {isLogedIn ? compatibilityRatio || "?" : "?"}&#x25;</span>
        </div>
      </div>

      <Link to={`userProfile/${id}`} onClick={() => {setPopActive(prev => !prev); setPopType('')}} aria-label="Link to profile" className="flex items-center gap-x-5 w-full">
        <div className="flex size-14 items-center shrink-0 rounded-full overflow-hidden bg-gray-200 text-Black group-hover:bg-pink-300">
          <img
            src={
                  dataA?.isVerifiedUser ? 
                  dataA?.gender[1] === 'Male' ? verifiedMan : verifiedWoman 
                  :
                  dataA?.gender[1] === 'Male' ? Man : Woman 
              }
            alt="avatar"
            className="object-cover size-14 rounded-full imgSettings"
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-1 font-medium text-Black">
          <div className={`flex items-center flex-wrap gap-1 line-clamp-1`}>
            <p className="text-base line-clamp-1 break-all">{dataA?.firstName + " " + dataA?.lastName}</p>
            <p className="text-[13px]">{"(" + dataA?.age + " " + (isRTL ? "سنة" : "Years") + ")"}</p>
          </div>
          <span className="text-sm center flex-wrap gap-1 text-Black/70 text-start">
            <p>{(isRTL ? dataA?.country[0] : dataA?.country[1]) + ", " + (isRTL ? dataA?.city[0] : dataA?.city[1])}</p>
          </span>
        </div>
      </Link>
      <div className="center gap-3 max-w-sm w-full overflow-visible">
          <a href={hasContact ? `tel:${phoneNumber}` : `` } className="py-2.5 w-[240px] rounded-full text-sm font-medium text-DarkPink  border-2 border-DarkPink backdrop-blur-lg hover:bg-DarkPink/5 shadow-lg hover:w-[250px] transition-all duration-300">
            <div className="center gap-4">
              <p className="myFont tracking-wider" style={{direction: 'ltr'}}>
                  {!hasContact && phoneNumber}
                  {hasContact && (isRTL ? "طلب بيانات التواصل" : "Request contact info")}
              </p>
              <MdContactPhone
                className={`text-DarkPink ${!isRTL && "scale-x-[-1]"}`}
                size={20}
              />
            </div>
          </a>
      </div>
    </div>
  );
}
