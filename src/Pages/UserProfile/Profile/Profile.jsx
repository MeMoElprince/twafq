import { useState, useContext, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import Fetch from "../../../Components/CustomHooks/Fetch";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../../Store/Context/Authentication";
import Woman from "../../../assets/Avatars/woman.png";
import Man from "../../../assets/Avatars/man.png";
import verifiedMan from "../../../assets/Avatars/verifiedMan.png";
import verifiedWoman from "../../../assets/Avatars/verifiedWoman.png";
import Texture from "../../../assets/Avatars/Texture.svg";
import { MdVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useLayoutDirection } from "../../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import { MdContactPhone } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import useFetch from "../../../Components/CustomHooks/useFetch";
import { getUserProfile } from "../../../Store/urls";
import { useParams } from "react-router-dom";
import { likeMeTarget } from "../../../Store/urls";
import { useNavigate } from "react-router-dom";
import { favoriteChange } from "../../../Store/urls";
import { addToContactURL } from "../../../Store/urls";
import { IoClose } from "react-icons/io5";
import { getPhoneURL } from "../../../Store/urls";

export default function Profile() {
  const { isLogedIn, Token, formData, handleFormDataChange } = useContext(
    AuthenticationContext
  );
  const { isRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");
  const navigate = useNavigate();
  // console.log(dataA);
  var english = /^[A-Za-z]*$/;
  const { id } = useParams();
  const { retData: data, loading: dataLoading } = useFetch({
    url: `${getUserProfile()}userId=${id}`,
    method: "GET",
  });
  const [dataA, setDataA] = useState(data);
  const [loadingData, setLoadingData] = useState(dataLoading);
  const [lastActive, setLastActive] = useState("");
  const [hasContact, setHasContact] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberHolder, setPhoneNumberHolder] = useState({});
  const [compatibilityRatio, setCompatibilityRatio] = useState(0);
  const { retData: ratio } = useFetch({
    url:
      Token && isLogedIn && dataA && formData?.id && dataA?.id
        ? `${likeMeTarget()}userId=${formData.id}&targetId=${dataA.id}`
        : null,
    Token,
  });

  const [isFavorite, setIsFavorite] = useState(
    formData?.favoriteUsers?.includes(dataA?.id) || false
  );

  useEffect(() => {
    if (data) {
      setDataA(data);
      if (formData?.favoriteUsers && data.id) {
        setIsFavorite(formData.favoriteUsers.includes(data.id));
      }
      setHasContact(formData?.usersContactWith?.includes(dataA?.id));
      setLoadingData(false);
    }
  }, [data, formData]);

  useEffect(() => {
    if(hasContact && dataA?.id){
      Fetch({
        url: `${getPhoneURL()}${dataA?.id ? `userId=${dataA.id}` : ""}`,
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


  const [loadingFavo, setLoadingFavo] = useState(false);

  const [successFavo, setSuccessFavo] = useState({});

  async function handleFavorite(){
    if (Token && dataA.id && formData?.id && isLogedIn) {
      if (loadingFavo) return;
      setLoadingFavo(true);
      await Fetch({
        url: `${favoriteChange()}userId=${formData.id}&favoriteUserId=${
          dataA?.id
        }`,
        setData: setSuccessFavo,
        setLoadingFavo,
        method: "POST",
        Token,
      });
      // console.log(successFavo);
    }
  }

  useEffect(() => {
    if(successFavo?.statusCode === '200'){
      if (isFavorite) {
        handleFormDataChange({
          ...formData,
          favoriteUsers: formData.favoriteUsers.filter((el) => el !== dataA.id),
        });
        setIsFavorite((prev) => !prev);
        setLoadingFavo(false);
      } else {
        handleFormDataChange({
          ...formData,
          favoriteUsers: [...formData.favoriteUsers, dataA.id],
        });
        setIsFavorite((prev) => !prev);
        setLoadingFavo(false);
      }
    }else{
      setLoadingFavo(false);
    } 
  }, [successFavo])
  

  if (formData?.id === dataA?.id) {
    navigate("/", { replace: true });
    window.location.reload();
  }


  // useEffect(() =>{
  //   console.log(compatibilityRatio)
  // }, [compatibilityRatio])

  useEffect(() => {
    if (isLogedIn && ratio) {
      setCompatibilityRatio(Math.round(ratio));
    }
    // console.log(ratio);
  }, [ratio, isLogedIn, Token]);

  // console.log(dataA)

  useEffect(() => {
    const calculateLastActive = () => {
      const now = new Date();
      const lastModified = dataA?.lastLogin
        ? new Date(dataA.lastLogin)
        : new Date();
      const diffInMilliseconds = now - lastModified;
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);

      if (diffInMinutes < 1) {
        return i18n.language === "ar" ? "متواجد" : "Online";
      } else if (diffInMinutes < 60) {
        return i18n.language === "ar"
          ? diffInMinutes === 1
            ? "دقيقية"
            : diffInMinutes === 2
            ? "دقيقتان"
            : diffInMinutes + " دقائق"
          : `${diffInMinutes} ${diffInMinutes === 1 ? "min" : "mins"}`;
      } else if (diffInHours < 24) {
        return i18n.language === "ar"
          ? diffInHours === 1
            ? "ساعة"
            : diffInHours === 2
            ? "ساعتان"
            : diffInHours + " ساعات"
          : `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"}`;
      } else if (diffInDays < 7) {
        return i18n.language === "ar"
          ? diffInDays === 1
            ? "يوم"
            : diffInDays === 2
            ? "يومان"
            : diffInDays + " ايام"
          : `${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
      } else if (diffInWeeks < 4) {
        return i18n.language === "ar"
          ? diffInWeeks === 1
            ? "اسبوع"
            : diffInWeeks === 2
            ? "اسبوعان"
            : diffInWeeks + " اسابيع"
          : `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"}`;
      } else {
        return i18n.language === "ar"
          ? diffInMonths === 1
            ? "شهر"
            : diffInMonths === 2
            ? "شهران"
            : diffInMonths + " شهور"
          : `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"}`;
      }
    };

    setLastActive(calculateLastActive());
  }, [dataA?.lastLogin, i18n.language]);

  const [addingUrl, setAddingUrl] = useState("");
  const [addingUrlHolder, setAddingUrlHolder] = useState({});
  const [addingLoading, setAddingLoading] = useState(false);

  function handleGetData(e){
    if(!isLogedIn || !Token || addingLoading || !formData?.id || !dataA?.id || phoneNumber)
        return;
    Fetch({ url: `${addToContactURL()}amount=${1000}${`&user_id=${formData?.id}`}${`&target_id=${dataA?.id}`}`,
      setLoading: setAddingLoading,
      setData: setAddingUrlHolder,
      method: 'GET',
      Token,
    })
  }

  // useEffect(() => {
  //   console.log(addingUrl)
  // }, [addingUrl])

  useEffect(() => {
    if(addingUrlHolder){
      setAddingUrl(addingUrlHolder?.statusMsg)
    }
    if (addingUrl !== "" && addingUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "hidden";
    }
  }, [addingUrlHolder])

  function LoadingSpinnerTwo(){
    return (
      <div className='center'>
        <svg aria-hidden="true" className="w-7 h-7 text-gray-200 animate-spin fill-DarkPink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    )
  }

  // useEffect(() => {
  //     if (!data) return;
  //     console.log({ addToCart: data })
  // }, [data])

  function UserProfileField({ label, value }) {
    return (
      <div className="py-6 px-3 gap-2 sm:px-6 sm:gap-4 flex items-center flex-wrap break-all hyphenated">
        <p className="text-lg font-medium text-Black">{label + ":"}</p>
        <p className="mt-1 text-base text-gray-900 sm:mt-0 sm:col-span-2">
          {value}
        </p>
      </div>
    );
  }

  const containsLongWord = (sentence) => {
    return sentence && sentence.split(" ").some((word) => word.length > 20);
  };

  function LoadingSpinner() {
    return (
      <div className="center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin fill-DarkPink"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <section className={`"w-full relative pt-36 pb-24 bg-White myFont flex flex-col justify-center items-center`}>
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
                  title={i18n.language === 'ar' ? "الدفع" : "payment"}
                ></iframe>
              </div>
            </div>
          )
        }
      <div className="">
        <div
          className={`absolute top-0 left-0 z-10 w-full h-[180px] mt-20 ${
            dataA?.gender[1] === "Male" ? "bg-Blue/50" : "bg-DarkPink/50"
          }`}
        ></div>
        <img
          src={Texture}
          alt="cover-image"
          className="absolute top-0 left-0 z-0 w-full h-[180px] object-cover mt-20 before:bg-DarkPink shadow-md"
        />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mt-4 flex flex-col items-center">
        <div className="flex items-center justify-center relative z-10 mb-2.5 w-max">
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
            alt="user-avatar-image"
            className="border-4 border-solid size-[130px] sm2:size-[200px] mt-10 mb-4 border-White rounded-full"
          />
          {!dataA?.isVerifiedUser && (
            <div className="group">
              <MdVerified
                className={`absolute text-blue-600 ${
                  isRTL ? "-right-[41px]" : "-left-[41px]"
                } top-[69%] sm2:top-[47.5%]`}
                size={32}
              />
              <span
                className={`absolute bg-gray-300 text-Black text-sm font-medium text-center p-1 px-2 top-[60%] ${
                  isRTL ? "-right-[48px]" : "-left-[58px]"
                } rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                {i18n.language === "ar" ? "موثق" : "Verified"}
              </span>
            </div>
          )}
          <div className="absolute group w-full">
            <div
              className={`center gap-2 absolute top-[40px] sm2:-top-[6.5px] shadow-dm border border-Black/10 ${
                i18n.language === "ar"
                  ? "-left-[95px] sm2:-left-[102px]"
                  : "-right-[96px] sm2:-right-[96px]"
              } py-1 px-3 bg-green-200 rounded-full`}
            >
              <FaCircle className={`text-green-600`} size={12} />
              <p className={`text-xs`}>{lastActive}</p>
            </div>
            <span
              className={`absolute bg-gray-300 text-Black text-sm font-medium p-1 px-2 top-[70px] sm2:top-[25px] ${
                isRTL ? "-left-20" : "-right-24"
              } rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            >
              {i18n.language === "ar" ? "آخر ظهور" : "Last seen"}
            </span>
          </div>
        </div>
        <div className="text-center center flex-col gap-4">
          <div
            className={`center flex-wrap w-full gap-2 ${
              (isRTL && english.test(dataA?.firstName)) ||
              (!isRTL && !english.test(dataA?.firstName))
                ? "flex-row-reverse"
                : ""
            }`}
          >
            <h3 className="text-center myFont font-bold text-2xl sm2:text-3xl text-Black">
              {dataA?.firstName + " " + dataA?.lastName}
            </h3>
            <p className="text-lg text-Black font-medium text-center">
              {"(" + dataA?.age + " " + (isRTL ? "سنة" : "Years") + ")"}
            </p>
          </div>
          <div className="center flex-wrap w-full gap-2">
            <FaLocationDot size={24} className="text-Black" />
            <p className="text-lg text-Black font-bold">
              {(isRTL ? dataA?.country[0] : dataA?.country[1]) +
                ", " +
                (isRTL ? dataA?.city[0] : dataA?.city[1])}
            </p>
          </div>
          <div
            className={`relative mt-4 flex flex-col items-center justify-center gap-3`}
          >
            <svg
              className="size-40 -rotate-90"
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
                strokeWidth="3"
              ></circle>
              {/* <!-- Progress Circle --> */}
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-DarkPink"
                strokeWidth="3"
                strokeDasharray="100"
                strokeDashoffset={
                  100 - (isLogedIn ? compatibilityRatio || 72 : 72)
                }
                strokeLinecap="round"
              ></circle>
            </svg>

            {/* <!-- Percentage Text --> */}
            <div
              className={`absolute ${!isLogedIn ? "top-[43%]" : "top-1/2"} ${
                isRTL ? "end-1/2" : "start-1/2"
              } transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center`}
            >
              <span className="text-center text-xl font-semibold text-DarkPink">
                {isLogedIn ? compatibilityRatio || "?" : "?"}&#x25;
              </span>
              <span className="text-center text-base font-semibold text-DarkPink">
                {isRTL ? "التوافق" : "Compatibility"}
              </span>
            </div>

            {!isLogedIn && (
              <div className="w-full center z-20 gap-2">
                <Link
                  to="/login"
                  className="text-md sm:text-lg font-medium text-Black underline cursor-pointer hover:text-DarkPink"
                >
                  {i18n.language === "ar" ? "تسجيل الدخول" : "Login"}
                </Link>
                <p className="text-md sm:text-lg font-medium text-Black">
                  {i18n.language === "ar"
                    ? "لحساب التوافق"
                    : "to see compatibility"}
                </p>
              </div>
            )}
          </div>
          <div className="center w-full flex-col sm:flex-row gap-2">
            <button onClick={handleGetData}
              className={`text-white ${(!isLogedIn || !Token) && "pointer-events-none opacity-50"} bg-DarkPink hover:bg-[#f74c68] cursor-pointer hover:px-8  font-medium transition-all duration-300 shadow-md tracking-wide rounded-full text-lg px-5 py-3 w-max !mt-6 center gap-4`}
            >
              {
                !addingLoading && (
                  !hasContact ? (
                    <p>
                      {i18n.language === "ar"
                        ? "طلب بيانات التواصل"
                        : "Request contact info"}
                    </p>
                  ) : (
                    <a href={`tel:${phoneNumber}`}>
                      {phoneNumber}
                    </a>
                  )
                )
              }
              { addingLoading && <LoadingSpinnerTwo/> }
              <MdContactPhone
                className={`text-[#ffffff] ${!isRTL && "scale-x-[-1]"}`}
                size={26}
              />
            </button>
            <button
              onClick={handleFavorite}
              className={`text-DarkPink bg-none border-DarkPink cursor-pointer border hover:px-8 font-medium  transition-all duration-300 shadow-md tracking-wide rounded-full text-lg px-5 py-3 w-max !mt-6 center gap-4`}
            >
              {loadingFavo && <LoadingSpinner />}
              {!loadingFavo &&
                (isFavorite ? (
                  <>
                    <p>
                      {i18n.language === "ar"
                        ? "إزالة من المفضلة"
                        : "Remove favorite"}
                    </p>
                    <FaHeart className={`text-DarkPink`} size={26} />
                  </>
                ) : (
                  <>
                    <p>
                      {i18n.language === "ar"
                        ? "إضافة إلى المفضلة"
                        : "Add to favorite"}
                    </p>
                    <FaHeart
                      className={`${
                        isFavorite ? "text-DarkPink" : "text-DarkPink/50"
                      }`}
                      size={26}
                    />
                  </>
                ))}
            </button>
          </div>
        </div>
      </div>
      <div className="w-[90%] center flex-wrap py-12 gap-8">
        <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:w-[calc(43.25%+43.25%+2rem)] w-[90%]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-semibold text-Black">
              {i18n.language === "ar" ? "الوصف الشخصي" : "Self Description"}
            </h3>
          </div>
          <div
            className={`border-t border-Black/10 text-lg text-gray-900 py-6 px-3 sm:px-6 ${
              containsLongWord(dataA?.selfDescription)
                ? "break-all hyphenated"
                : ""
            }`}
          >
            {dataA?.selfDescription ||
              (isRTL ? "عند التعارف" : "After Messaging")}
          </div>
        </div>
        <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:max-w-[43.25%] w-[90%]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-semibold text-Black">
              {t("personalInfo.title")}
            </h3>
          </div>
          <div className="border-t border-Black/10 text-lg text-gray-900 px-4 py-2 sm:p-0">
            <div className="flex flex-wrap">
              <UserProfileField
                label={`${isRTL ? "الطول" : "Height"}`}
                value={`${dataA?.height} ${isRTL ? "سم" : "CM"}`}
              />
              <UserProfileField
                label={`${isRTL ? "الوزن" : "Weight"}`}
                value={`${dataA?.weight} ${isRTL ? "كغ" : "KG"}`}
              />
              <UserProfileField
                label={`${isRTL ? "لون البشرة" : "Skin Color"}`}
                value={`${dataA?.skinColor[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "الهيئة" : "Shape"}`}
                value={`${dataA?.shape[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "الحالة الصحية" : "Health Status"}`}
                value={`${dataA?.health[isRTL ? 0 : 1]}`}
              />
            </div>
          </div>
        </div>
        <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:max-w-[43.25%] w-[90%]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-semibold text-Black">
              {t("nationality.title")}
            </h3>
          </div>
          <div className="border-t border-Black/10 text-lg text-gray-900 px-4 py-2 sm:p-0">
            <div className="flex flex-wrap">
              <UserProfileField
                label={`${isRTL ? "البلد" : "Country"}`}
                value={`${dataA?.country[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "المدينة" : "City"}`}
                value={`${dataA?.city[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "الجنسية" : "Nationality"}`}
                value={`${dataA?.nationality[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "مكان الإقامة" : "Residence"}`}
                value={`${dataA?.residence[isRTL ? 0 : 1]}`}
              />
            </div>
          </div>
        </div>
        <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:w-[calc(43.25%+43.25%+2rem)] w-[90%]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-semibold text-Black">
              {t("religion.title")}
            </h3>
          </div>
          <div className="border-t border-Black/10 text-lg text-gray-900 px-4 py-2 sm:p-0">
            <div className="flex flex-wrap">
              <UserProfileField
                label={`${isRTL ? "الديانة" : "Religion"}`}
                value={`${dataA?.religion[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "الطائفة" : "Doctrine"}`}
                value={`${dataA?.doctrine[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "الالتزام الديني" : "Religious Commitment"}`}
                value={`${dataA?.religiousCommitment[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "التدخين" : "Smoking"}`}
                value={`${dataA?.smoking[isRTL ? 0 : 1]}`}
              />
            </div>
          </div>
        </div>
        <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:max-w-[43.25%] w-[90%]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-semibold text-Black">
              {t("familyStatus.title")}
            </h3>
          </div>
          <div className="border-t border-Black/10 text-lg text-gray-900 px-4 py-2 sm:p-0">
            <div className="flex flex-wrap">
              <UserProfileField
                label={`${isRTL ? "الوضع العائلي" : "Family Status"}`}
                value={`${dataA?.familyStatus[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "نوع الزواج" : "Marriage Type"}`}
                value={`${dataA?.marriageType[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "عدد الأطفال" : "Children"}`}
                value={`${dataA?.children}`}
              />
            </div>
          </div>
        </div>
        <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:max-w-[43.25%] w-[90%]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-semibold text-Black">
              {t("education.title")}
            </h3>
          </div>
          <div className="border-t border-Black/10 text-lg text-gray-900 px-4 py-2 sm:p-0">
            <div className="flex flex-wrap">
              <UserProfileField
                label={`${isRTL ? "المؤهل" : "Education Level"}`}
                value={`${dataA?.educationLevel[isRTL ? 0 : 1]}`}
              />
              <UserProfileField
                label={`${isRTL ? "العمل" : "Work"}`}
                value={`${dataA?.work}`}
              />
              <UserProfileField
                label={`${isRTL ? "الحالة المادية" : "Financial Status"}`}
                value={`${dataA?.financialStatus[isRTL ? 0 : 1]}`}
              />
            </div>
          </div>
        </div>
        <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:w-[calc(43.25%+43.25%+2rem)] w-[90%]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-semibold text-Black">
              {i18n.language === "ar"
                ? "وصف شريك الحياة"
                : "Partner Description"}
            </h3>
          </div>
          <div
            className={`border-t border-Black/10 text-lg text-gray-900 py-6 px-3 sm:px-6 ${
              containsLongWord(dataA?.partnerDescription)
                ? "break-all hyphenated"
                : ""
            }`}
          >
            {dataA?.partnerDescription ||
              (isRTL ? "عند التعارف" : "After Messaging")}
          </div>
        </div>
      </div>
    </section>
  );
}
