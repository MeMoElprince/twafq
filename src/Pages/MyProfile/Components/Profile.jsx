import { useState, useContext, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import placeholder from "./placeholder.jpg";
import Fetch from "../../../Components/CustomHooks/Fetch";
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
import Form from "./Form/Form";

export default function Profile({ profileDetails }) {
  // const { Token } = useContext(AuthenticationContext);
  const [isFavorite, setIsFavorite] = useState(0);
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");
  console.log(profileDetails);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  var english = /^[A-Za-z]*$/;
  const [editActive, setEditActive] = useState(false);

  async function handleFavorite() {
    // if (loading) return;
    // setLoading(true)
    // setErrorMessage('')
    // if (isFavorite) {
    //     await Fetch({
    //         url: delFavByProId(ProfileDetails?.id),
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
    //         body: { product_item_id: ProfileDetails?.id },
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
    return sentence.split(" ").some((word) => word.length > 20);
  };

  return (
    <section className="w-full relative pt-36 bg-White myFont flex flex-col justify-center items-center">
      {editActive && <Form editActive={editActive} setEditActive={setEditActive} />}
      <div className={`w-full flex flex-col items-center overflow-hidden ${editActive ? "h-[220vh] pointer-events-none" : "mb-24"}`}>
        <div className="">
          <div
            className={`absolute top-0 left-0 z-10 w-full h-[180px] mt-20 ${
              profileDetails?.gender.en === "Male"
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
                profileDetails?.isVerified
                  ? profileDetails?.gender.en === "Male"
                    ? verifiedMan
                    : verifiedWoman
                  : profileDetails?.gender.en === "Male"
                  ? Man
                  : Woman
              }
              alt="user-avatar-image"
              className="border-4 border-solid w-[200px] h-[200px] border-White rounded-full"
            />
            {
              profileDetails.isVerified && 
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
                  ? profileDetails?.country.ar
                  : profileDetails?.country.en) +
                  ", " +
                  (isRTL ? profileDetails?.city.ar : profileDetails?.city.en)}
              </p>
            </div>
            <div className="center w-full flex-col sm:flex-row gap-2">
              {
                !profileDetails.isVerified && 
                (
                  <button
                      className={`text-white bg-DarkPink hover:bg-[#f74c68] hover:px-8  font-medium transition-all duration-300 shadow-md tracking-wide rounded-full text-lg px-6 py-3 w-max !mt-6 center gap-4`}
                    >
                      <p>
                        {i18n.language === "ar"
                          ? "توثيق الحساب"
                          : "Verify Account"}
                      </p>
                      <MdVerified
                        className={`text-[#ffffff]`}
                        size={26}
                      />
                  </button>
                )
              }
              <button
                    onClick={() => setEditActive(prev => !prev)} className={`text-DarkPink bg-none border border-DarkPink hover:px-8  font-medium transition-all duration-300 shadow-md tracking-wide rounded-full text-lg px-6 py-3 w-max !mt-6 center gap-4`}
                  >
                    <p>
                      {i18n.language === "ar"
                        ? "تعديل بياناتي"
                        : "Edit my information"}
                    </p>
                    <FaUserEdit
                      className={`text-DarkPink`}
                      size={26}
                    />
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
              {profileDetails?.selfDescription}
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
                <UserProfileField label="العمر" value="24" />
                <UserProfileField label="الطول" value="175" />
                <UserProfileField label="الوزن" value="68" />
                <UserProfileField label="لون البشرة" value="قمحاوي" />
                <UserProfileField label="الهيئة" value="سمين" />
                <UserProfileField label="الحالة الصحية" value="صداع" />
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
                <UserProfileField label="العمر" value="24" />
                <UserProfileField label="الطول" value="175" />
                <UserProfileField label="الوزن" value="68" />
                <UserProfileField label="لون البشرة" value="قمحاوي" />
                <UserProfileField label="الهيئة" value="سمين" />
                <UserProfileField label="الحالة الصحية" value="صداع" />
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
                <UserProfileField label="العمر" value="24" />
                <UserProfileField label="الطول" value="175" />
                <UserProfileField label="الوزن" value="68" />
                <UserProfileField label="لون البشرة" value="قمحاوي" />
                <UserProfileField label="الهيئة" value="سمين" />
                <UserProfileField label="الحالة الصحية" value="صداع" />
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
                <UserProfileField label="العمر" value="24" />
                <UserProfileField label="الطول" value="175" />
                <UserProfileField label="الوزن" value="68" />
                <UserProfileField label="لون البشرة" value="قمحاوي" />
                <UserProfileField label="الهيئة" value="سمين" />
                <UserProfileField label="الحالة الصحية" value="صداع" />
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
                <UserProfileField label="العمر" value="24" />
                <UserProfileField label="الطول" value="175" />
                <UserProfileField label="الوزن" value="68" />
                <UserProfileField label="لون البشرة" value="قمحاوي" />
                <UserProfileField label="الهيئة" value="سمين" />
                <UserProfileField label="الحالة الصحية" value="صداع" />
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
                containsLongWord(profileDetails?.partnerDescription)
                  ? "break-all hyphenated"
                  : ""
              }`}
            >
              {profileDetails?.partnerDescription}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
