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

export default function Profile({ profileDetails }) {
  // const { Token } = useContext(AuthenticationContext);
  const [isLogged, setIsLogged] = useState(true);
  const [isFavorite, setIsFavorite] = useState(0);
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");
  // console.log(profileDetails);
  var english = /^[A-Za-z]*$/;
  const { id } = useParams();
  const { retData: data, loading: dataLoading } = useFetch({
      url: `${getUserProfile()}userId=${id}`,
      method: 'GET',
    });
  const [dataA, setDataA] = useState(data);
  const [loadingData, setLoadingData] = useState(dataLoading);

  // console.log(dataA)

  useEffect(() => {
      if (data) {
          setDataA(data);
          setLoadingData(false);
      }
      // console.log(dataA)
  }, [data])

  async function handleFavorite() {
    // if (loading) return;
    // setLoading(true)
    // setErrorMessage('')
    // if (isFavorite) {
    //     await Fetch({
    //         url: delFavByProId(dataA?.id),
    //         setLoading,
    //         setData,
    //         setErrorMessage,
    //         method: 'DELETE',
    //         Token
    //     })
    //     setIsFavorite(prev => !prev);
    // } else {
    //     await Fetch({
    //         url: addFav(),
    //         setLoading,
    //         setData,
    //         setErrorMessage,
    //         method: 'POST',
    //         body: { product_item_id: dataA?.id },
    //         Token
    //     })
    //     setIsFavorite(prev => !prev);
    // }
    setIsFavorite((prev) => !prev);
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

  return (
    <section className="w-full relative pt-36 pb-24 bg-White myFont flex flex-col justify-center items-center">
      <div className="">
        <div
          className={`absolute top-0 left-0 z-10 w-full h-[180px] mt-20 ${
            dataA?.gender[1] === "Male"
              ? "bg-Blue/50"
              : "bg-DarkPink/50"
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
              dataA?.isVerified
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
          {
            profileDetails?.isVerifiedUser && 
            (
              <div className="group">
                <MdVerified
                  className={`absolute text-blue-600 ${
                    isRTL ? "-right-12" : "-left-12"
                  } top-[55%]`}
                  size={32}
                />
                <span
                  className={`absolute bg-gray-300 text-Black text-sm font-medium p-1 px-2 top-[73%] ${
                    isRTL ? "-right-[55px]" : "-left-[67px]"
                  } rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  {i18n.language === "ar" ? "موثق" : "Verified"}
                </span>
              </div>
            )
          }
        <div className="absolute group w-full">
          <div className={`center gap-2 absolute top-[20px] sm2:-top-[6.5px] shadow-dm border border-Black/10 ${i18n.language === 'ar' ? "-left-[95px] sm2:-left-[102px]" : "-right-[89px] sm2:-right-[96px]"} py-1 px-3 bg-green-200 rounded-full`}>
            <FaCircle  className={`text-green-600`} size={12} />
            <p className={`text-sm`}>3 اشهر</p>
          </div>
          <span className={`absolute bg-gray-300 text-Black text-sm font-medium p-1 px-2 top-[45px] ${isRTL ? "-left-16" : "-right-20"} rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            {i18n.language === 'ar' ? "آخر ظهور" : "Last seen"}
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
              {"(" +
                dataA?.age +
                " " +
                (isRTL ? "سنة" : "Years") +
                ")"}
            </p>
          </div>
          <div className="center flex-wrap w-full gap-2">
            <FaLocationDot size={24} className="text-Black" />
            <p className="text-lg text-Black font-bold">
              {(isRTL
                ? dataA?.country[0]
                : dataA?.country[1]) +
                ", " +
                (isRTL ? dataA?.city[0] : dataA?.city[1])}
            </p>
          </div>
          <div className={`relative mt-4 flex flex-col items-center justify-center gap-3`}>
            <svg className="size-40 -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              {/* <!-- Background Circle --> */}
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-DarkPink/30" strokeWidth="3"></circle>
              {/* <!-- Progress Circle --> */}
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-DarkPink" strokeWidth="3" strokeDasharray="100" strokeDashoffset={100 - (isLogged ? (dataA?.compatibilityRatio || 75) : 75)} strokeLinecap="round"></circle>
            </svg>

            {/* <!-- Percentage Text --> */}
            <div className={`absolute ${!isLogged ? "top-[43%]" : "top-1/2"} ${isRTL ? "end-1/2" : "start-1/2"} transform -translate-y-1/2 -translate-x-1/2 flex flex-col items-center`}>
              <span className="text-center text-xl font-semibold text-DarkPink">{isLogged ? (dataA?.compatibilityRatio || "?") : "?"}&#x25;</span>
              <span className="text-center text-base font-semibold text-DarkPink">{isRTL ? "التوافق" : "Compatibility"}</span>
            </div>

            {
              !isLogged && 
              (
                <div className="w-full center z-20 gap-2">
                    <Link to = "/login" className="text-md sm:text-lg font-medium text-Black underline cursor-pointer hover:text-DarkPink">{i18n.language === 'ar' ? "تسجيل الدخول" : "Login"}</Link>
                    <p className="text-md sm:text-lg font-medium text-Black">{i18n.language === 'ar' ? "لحساب التوافق" : "To Calculate Compatibility"}</p>
                </div>
              )
            }
          </div>
          <div className="center w-full flex-col sm:flex-row gap-2">
            <button
              className={`text-white bg-DarkPink hover:bg-[#f74c68] cursor-pointer hover:px-8  font-medium transition-all duration-300 shadow-md tracking-wide rounded-full text-lg px-5 py-3 w-max !mt-6 center gap-4`}
            >
              <p>
                {i18n.language === "ar"
                  ? "طلب بيانات التواصل"
                  : "Request contact info"}
              </p>
              <MdContactPhone
                className={`text-[#ffffff] ${!isRTL && "scale-x-[-1]"}`}
                size={26}
              />
            </button>
            <button
              onClick={handleFavorite}
              className={`text-DarkPink bg-none border-DarkPink cursor-pointer border hover:px-8 font-medium  transition-all duration-300 shadow-md tracking-wide rounded-full text-lg px-5 py-3 w-max !mt-6 center gap-4`}
            >
              {isFavorite ? (
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
              )}
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
            {dataA?.selfDescription || (isRTL ? "عند التعارف" : "After Messaging")}
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
            <UserProfileField label={`${isRTL ? "الطول" : "Height"}`} value={`${dataA?.height} ${isRTL ? "سم" : "CM"}`} />
            <UserProfileField label={`${isRTL ? "الوزن" : "Weight"}`} value={`${dataA?.weight} ${isRTL ? "كغ" : "KG"}`} />
            <UserProfileField label={`${isRTL ? "لون البشرة" : "Skin Color"}`} value={`${dataA?.skinColor[isRTL ? 0 : 1]}`} />
            <UserProfileField label={`${isRTL ? "الهيئة" : "Shape"}`} value={`${dataA?.shape[isRTL ? 0 : 1]}`} />
            <UserProfileField label={`${isRTL ? "الحالة الصحية" : "Health Status"}`} value={`${dataA?.health[isRTL ? 0 : 1]}`} />
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
            <UserProfileField label={`${isRTL ? "البلد" : "Country"}`} value={`${dataA?.country[isRTL ? 0 : 1]}`} />
            <UserProfileField label={`${isRTL ? "المدينة" : "City"}`} value={`${dataA?.city[isRTL ? 0 : 1]}`} />
            <UserProfileField label={`${isRTL ? "الجنسية" : "Nationality"}`} value={`${dataA?.nationality[isRTL ? 0 : 1]}`} />
            <UserProfileField label={`${isRTL ? "مكان الإقامة" : "Residence"}`} value={`${dataA?.residence[isRTL ? 0 : 1]}`} />
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
              <UserProfileField label={`${isRTL ? "الديانة" : "Religion"}`} value={`${dataA?.religion[isRTL ? 0 : 1]}`} />
              <UserProfileField label={`${isRTL ? "الطائفة" : "Doctrine"}`} value={`${dataA?.doctrine[isRTL ? 0 : 1]}`} />
              <UserProfileField label={`${isRTL ? "الالتزام الديني" : "Religious Commitment"}`} value={`${dataA?.religiousCommitment[isRTL ? 0 : 1]}`} />
              <UserProfileField label={`${isRTL ? "التدخين" : "Smoking"}`} value={`${dataA?.smoking[isRTL ? 0 : 1]}`} />
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
              <UserProfileField label={`${isRTL ? "الوضع العائلي" : "Family Status"}`} value={`${dataA?.familyStatus[isRTL ? 0 : 1]}`} />
              <UserProfileField label={`${isRTL ? "نوع الزواج" : "Marriage Type"}`} value={`${dataA?.marriageType[isRTL ? 0 : 1]}`} />
              <UserProfileField label={`${isRTL ? "عدد الأطفال" : "Children"}`} value={`${dataA?.children}`} />
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
              <UserProfileField label={`${isRTL ? "المؤهل" : "Education Level"}`} value={`${dataA?.educationLevel[isRTL ? 0 : 1]}`} />
              <UserProfileField label={`${isRTL ? "العمل" : "Work"}`} value={`${dataA?.work}`} />
              <UserProfileField label={`${isRTL ? "الحالة المادية" : "Financial Status"}`} value={`${dataA?.financialStatus[isRTL ? 0 : 1]}`} />
            </div>
          </div>
        </div>
        <div className="bg-DarkBeige/40 overflow-hidden shadow-lg rounded-lg border border-Black/15 lg2:w-[calc(43.25%+43.25%+2rem)] w-[90%]">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-semibold text-Black">
                {i18n.language === 'ar' ? "وصف شريك الحياة" : "Partner Description"}
            </h3>
          </div>
          <div
            className={`border-t border-Black/10 text-lg text-gray-900 py-6 px-3 sm:px-6 ${
              containsLongWord(data?.partnerDescription)
                ? "break-all hyphenated"
                : ""
            }`}
          >
            {dataA?.partnerDescription || (isRTL ? "عند التعارف" : "After Messaging")}
          </div>
        </div>
      </div>
    </section>
  );
}
