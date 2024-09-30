import React, { useState, useEffect } from "react";
import Woman from "../../../assets/Avatars/woman.png";
import Man from "../../../assets/Avatars/man.png";
import verifiedMan from "../../../assets/Avatars/verifiedMan.png";
import verifiedWoman from "../../../assets/Avatars/verifiedWoman.png";
import { useLayoutDirection } from "../../../Store/Context/LayoutDirectionContext";
import { MdContactPhone } from "react-icons/md";
import useFetch from "../../CustomHooks/useFetch";
import { getUserProfile, getPhoneURL, addToContactURL, likeMeTarget } from "../../../Store/urls";
import { Link } from "react-router-dom";
import Fetch from "../../CustomHooks/Fetch";
import { IoClose } from "react-icons/io5";

export default function Card({
  id,
  formData,
  isLogedIn,
  Token,
  setPopActive,
  setPopType,
}) {
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
      setHasContact(formData?.usersContactWith?.includes(data?.id));
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

  // useEffect(() => {
  //   console.log(ratio)
  // }, [ratio])

  useEffect(() => {
    if (hasContact && dataA?.id) {
      Fetch({
        url: `${getPhoneURL()}${dataA?.id ? `userId=${dataA.id}` : ""}`,
        Token,
        setData: setPhoneNumberHolder,
      });
    }
  }, [hasContact, dataA?.id]);

  useEffect(() => {
    if (phoneNumberHolder) {
      setPhoneNumber(phoneNumberHolder.statusMsg);
      // console.log(phoneNumber)
    }
  }, [phoneNumberHolder]);

  const [compatibilityRatio, setCompatibilityRatio] = useState(0);

  useEffect(() => {
    if (isLogedIn && ratio) {
      setCompatibilityRatio(Math.round(ratio));
    }
    // console.log(compatibilityRatio)
  }, [ratio, isLogedIn, Token]);

  const [addingUrl, setAddingUrl] = useState("");
  const [addingUrlHolder, setAddingUrlHolder] = useState({});
  const [addingLoading, setAddingLoading] = useState(false);

  function handleGetData(e) {
    if (
      !isLogedIn ||
      !Token ||
      addingLoading ||
      !formData?.id ||
      !dataA?.id ||
      phoneNumber
    )
      return;
    Fetch({
      url: `${addToContactURL()}amount=${1000}${`&user_id=${formData?.id}`}${`&target_id=${dataA?.id}`}`,
      setLoading: setAddingLoading,
      setData: setAddingUrlHolder,
      method: "GET",
      Token,
    });
  }

  // useEffect(() => {
  //   console.log(addingUrl)
  // }, [addingUrl])

  useEffect(() => {
    if (addingUrlHolder) {
      setAddingUrl(addingUrlHolder?.statusMsg);
    }
    if (addingUrl !== "" && addingUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }
  }, [addingUrlHolder]);

  function LoadingSpinnerTwo(){
    return (
      <div className='center'>
        <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin fill-DarkPink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    )
  }

  return (
    <div className="group flex relative flex-col items-center gap-10 rounded-md px-2.5 py-3 transition-all duration-75 hover:bg-gray-200/80">
      {addingUrl && (
        <div className="fixed inset-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="relative size-[80%] z-50">
            <button
              className={`absolute size-[40px] bg-red-500 center text-white rounded-full p-2 -top-3 -right-3 z-50`}
              onClick={() => {setAddingUrl(""); window.location.reload()}}
            >
              <IoClose size={24} />
            </button>
            <iframe
              src={addingUrl}
              className="size-full bg-white rounded-lg shadow-lg z-50"
              title={isRTL ? "الدفع" : "payment"}
            ></iframe>
          </div>
        </div>
      )}
      <div
        className={`absolute size-11 ${
          !isRTL ? "right-[5%]" : "left-[5%]"
        } bottom-[43%]`}
      >
        <svg
          className="size-full -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <!-- Background Circle --> */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-DarkPink/30"
            strokeWidth="4"
          ></circle>
          {/* <!-- Progress Circle --> */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-DarkPink"
            strokeWidth="4"
            strokeDasharray="100"
            strokeDashoffset={100 - (isLogedIn ? compatibilityRatio || 72 : 72)}
            strokeLinecap="round"
          ></circle>
        </svg>

        {/* <!-- Percentage Text --> */}
        <div
          className={`absolute top-[47%] ${
            isRTL ? "end-1/2" : "start-1/2"
          } transform -translate-y-1/2 -translate-x-1/2`}
        >
          <span className="text-center text-xs font-semibold text-DarkPink">
            {" "}
            {isLogedIn ? compatibilityRatio || "?" : "?"}&#x25;
          </span>
        </div>
      </div>

      <Link
        to={`userProfile/${id}`}
        onClick={() => {
          setPopActive((prev) => !prev);
          setPopType("");
        }}
        aria-label="Link to profile"
        className="flex items-center gap-x-5 w-full"
      >
        <div className="flex size-14 items-center shrink-0 rounded-full overflow-hidden bg-gray-200 text-Black group-hover:bg-pink-300">
          <img
            src={
              dataA?.isVerifiedUser
                ? dataA?.gender[1] === "Male"
                  ? verifiedMan
                  : verifiedWoman
                : dataA?.gender[1] === "Male"
                ? Man
                : Woman
            }
            alt="avatar"
            className="object-cover size-14 rounded-full imgSettings"
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-1 font-medium text-Black">
          <div className={`flex items-center flex-wrap gap-1 line-clamp-1`}>
            <p className="text-base line-clamp-1 break-all">
              {dataA?.firstName + " " + dataA?.lastName}
            </p>
            <p className="text-[13px]">
              {"(" + dataA?.age + " " + (isRTL ? "سنة" : "Years") + ")"}
            </p>
          </div>
          <span className="text-sm center flex-wrap gap-1 text-Black/70 text-start">
            <p>
              {(isRTL ? dataA?.country[0] : dataA?.country[1]) +
                "" +
                (isRTL ? "": "")}
            </p>
          </span>
        </div>
      </Link>
      <div className="center gap-3 max-w-sm w-full overflow-visible">
        <a
          href={phoneNumber ? `tel:${phoneNumber}` : undefined}
          onClick={handleGetData}
          className="py-2.5 cursor-pointer w-[240px] rounded-full text-sm font-medium text-DarkPink  border-2 border-DarkPink backdrop-blur-lg hover:bg-DarkPink/5 shadow-lg hover:w-[250px] transition-all duration-300"
        >
          <div className="center gap-4">
            {!addingLoading && (
              <p className="myFont tracking-wider" style={{ direction: "ltr" }}>
                {hasContact && phoneNumber}
                {!hasContact &&
                  (isRTL ? "طلب بيانات التواصل" : "Request contact info")}
              </p>
            )}
            {addingLoading && <LoadingSpinnerTwo />}
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
