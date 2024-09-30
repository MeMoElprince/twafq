import { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import Woman from "../../../assets/Avatars/woman.png";
import Man from "../../../assets/Avatars/man.png";
import verifiedMan from "../../../assets/Avatars/verifiedMan.png";
import verifiedWoman from "../../../assets/Avatars/verifiedWoman.png";
import Texture from "../../../assets/Avatars/Texture.svg";
import { MdVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useLayoutDirection } from "../../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import Form from "./Form/Form";
import { FaCircle } from "react-icons/fa6";
import { verifyURL } from "../../../Store/urls";
import Fetch from "../../../Components/CustomHooks/Fetch";
import { IoClose } from "react-icons/io5";

export default function Profile({ profileDetails, isLogedIn, Token}) {
  const { isRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");
  // console.log(profileDetails);
  var english = /^[A-Za-z]*$/;
  const [editActive, setEditActive] = useState(false);
  const [lastActive, setLastActive] = useState("");

  // useEffect(() => {
  //     if (!data) return;
  //     console.log({ addToCart: data })
  // }, [data])

  useEffect(() => {
    const calculateLastActive = () => {
      const now = new Date();
      const lastModified = profileDetails?.lastLogin ? new Date(profileDetails.lastLogin) : new Date();
      const diffInMilliseconds = now - lastModified;
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);

      if (diffInMinutes < 1) {
        return i18n.language === 'ar' ? "متواجد" : "Online";
      } else if (diffInMinutes < 60) {
        return i18n.language === 'ar' 
        ? (diffInMinutes === 1 ? "دقيقية" : (diffInMinutes === 2 ? "دقيقتان" : diffInMinutes + " دقائق"))
        : `${diffInMinutes} ${diffInMinutes === 1 ? "min" : "mins"}`;
      } else if (diffInHours < 24) {
        return i18n.language === 'ar' 
        ? (diffInHours === 1 ? "ساعة" : (diffInHours === 2 ? "ساعتان" : diffInHours + " ساعات"))
        : `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"}`;
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
  }, [profileDetails?.lastLogin, i18n.language]);

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

  // useEffect(() =>{
  //   console.log(profileDetails)
  // }, [profileDetails])

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const containsLongWord = (sentence) => {
    return sentence.split(" ").some((word) => word.length > 20);
  };

  const [addingUrl, setAddingUrl] = useState("");
  const [addingUrlHolder, setAddingUrlHolder] = useState({});
  const [addingLoading, setAddingLoading] = useState(false);

  function handleGetData(e) {
    if (
      !isLogedIn ||
      !Token ||
      addingLoading ||
      !profileDetails?.id ||
      profileDetails.isVerifiedUser
    )
      return;
    Fetch({
      url: `${verifyURL()}amount=${1000}${`&user_id=${profileDetails?.id}`}`,
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
    <section className="w-full relative pt-36 bg-White myFont flex flex-col justify-center items-center">
      {editActive && (
        <Form editActive={editActive} setEditActive={setEditActive} oldFormData = {profileDetails} />
      )}
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
        className={`w-full flex flex-col items-center overflow-hidden ${
          editActive ? "h-[220vh] pointer-events-none" : "mb-24"
        }`}
      >
        <div className="">
          <div
            className={`absolute top-0 left-0 z-10 w-full h-[180px] mt-20 ${
              profileDetails?.gender[1] === "Male"
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
                profileDetails?.isVerifiedUser
                  ? profileDetails?.gender[1] === "Male"
                    ? verifiedMan
                    : verifiedWoman
                  : profileDetails?.gender[1] === "Male"
                  ? Man
                  : Woman
              }
              alt="user-avatar-image"
              className="border-4 border-solid size-[130px] sm2:size-[200px] mt-10 mb-4 border-White rounded-full"
            />
            {profileDetails?.isVerifiedUser && (
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
                (isRTL && english.test(profileDetails?.firstName)) ||
                (!isRTL && !english.test(profileDetails?.firstName))
                  ? "flex-row-reverse"
                  : ""
              }`}
            >
              <h3 className="text-center myFont font-bold text-3xl text-Black">
                {profileDetails?.firstName + " " + profileDetails?.lastName}
              </h3>
              <p className="text-lg text-Black font-medium text-center">
                {"(" +
                  profileDetails?.age +
                  " " +
                  (isRTL ? "سنة" : "Years") +
                  ")"}
              </p>
            </div>
            <div className="center flex-wrap w-full gap-2">
              <FaLocationDot size={24} className="text-Black" />
              <p className="text-lg text-Black font-bold">
                {(isRTL
                  ? profileDetails?.country[0]
                  : profileDetails?.country[1]) }
              </p>
            </div>
            <div className="center w-full flex-col sm:flex-row gap-2">
              {!profileDetails.isVerifiedUser && (
                <button
                  onClick={handleGetData}
                  className={`text-white bg-DarkPink ${profileDetails.isVerifiedUser && "pointer-events-none"} hover:bg-[#f74c68] hover:px-8  font-medium transition-all duration-300 shadow-md tracking-wide rounded-full text-lg px-6 py-3 w-max !mt-6 center gap-4`}
                >
                  {!addingLoading &&
                    <p>
                      {i18n.language === "ar" ? (profileDetails.isVerifiedUser ? "حساب موثق" : "توثيق الحساب") : (profileDetails.isVerifiedUser ? "Verified Account" : "Verify Account")}
                    </p>
                  }
                  {addingLoading && <LoadingSpinnerTwo />}
                  <MdVerified className={`text-[#ffffff]`} size={26} />
                </button>
              )}
              <button
                onClick={() => setEditActive((prev) => !prev)}
                className={`text-DarkPink bg-none border border-DarkPink hover:px-8  font-medium transition-all duration-300 shadow-md tracking-wide rounded-full text-lg px-6 py-3 w-max !mt-6 center gap-4`}
              >
                <p>
                  {i18n.language === "ar"
                    ? "تعديل بياناتي"
                    : "Edit my information"}
                </p>
                <FaUserEdit className={`text-DarkPink`} size={26} />
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
                containsLongWord(profileDetails?.selfDescription)
                  ? "break-all hyphenated"
                  : ""
              }`}
            >
              {profileDetails?.selfDescription ||
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
                  value={`${profileDetails?.height} ${isRTL ? "سم" : "CM"}`}
                />
                <UserProfileField
                  label={`${isRTL ? "الوزن" : "Weight"}`}
                  value={`${profileDetails?.weight} ${isRTL ? "كغ" : "KG"}`}
                />
                <UserProfileField
                  label={`${isRTL ? "لون البشرة" : "Skin Color"}`}
                  value={`${profileDetails?.skinColor[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${isRTL ? "الهيئة" : "Shape"}`}
                  value={`${profileDetails?.shape[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${isRTL ? "الحالة الصحية" : "Health Status"}`}
                  value={`${profileDetails?.health[isRTL ? 0 : 1]}`}
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
                  value={`${profileDetails?.country[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${isRTL ? "المدينة" : "City"}`}
                  value={`${profileDetails?.city[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${isRTL ? "الجنسية" : "Nationality"}`}
                  value={`${profileDetails?.nationality[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${isRTL ? "مكان الإقامة" : "Residence"}`}
                  value={`${profileDetails?.residence[isRTL ? 0 : 1]}`}
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
                  value={`${profileDetails?.religion[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${isRTL ? "الطائفة" : "Doctrine"}`}
                  value={`${profileDetails?.doctrine[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${
                    isRTL ? "الالتزام الديني" : "Religious Commitment"
                  }`}
                  value={`${
                    profileDetails?.religiousCommitment[isRTL ? 0 : 1]
                  }`}
                />
                <UserProfileField
                  label={`${isRTL ? "التدخين" : "Smoking"}`}
                  value={`${profileDetails?.smoking[isRTL ? 0 : 1]}`}
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
                  value={`${profileDetails?.familyStatus[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${isRTL ? "نوع الزواج" : "Marriage Type"}`}
                  value={`${profileDetails?.marriageType[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${isRTL ? "عدد الأطفال" : "Children"}`}
                  value={`${profileDetails?.children}`}
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
                  value={`${profileDetails?.educationLevel[isRTL ? 0 : 1]}`}
                />
                <UserProfileField
                  label={`${isRTL ? "العمل" : "Work"}`}
                  value={`${profileDetails?.work}`}
                />
                <UserProfileField
                  label={`${isRTL ? "الحالة المادية" : "Financial Status"}`}
                  value={`${profileDetails?.financialStatus[isRTL ? 0 : 1]}`}
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
                containsLongWord(profileDetails?.partnerDescription)
                  ? "break-all hyphenated"
                  : ""
              }`}
            >
              {profileDetails?.partnerDescription ||
                (isRTL ? "عند التعارف" : "After Messaging")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
