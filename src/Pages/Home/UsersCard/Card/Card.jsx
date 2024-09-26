import React, { useState, useEffect } from "react";
import { useLayoutDirection } from "../../../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import Woman from "../../../../assets/Avatars/woman.png";
import Man from "../../../../assets/Avatars/man.png";
import verifiedMan from "../../../../assets/Avatars/verifiedMan.png";
import verifiedWoman from "../../../../assets/Avatars/verifiedWoman.png";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa6";
import { likeMeTarget } from "../../../../Store/urls";
import useFetch from "../../../../Components/CustomHooks/useFetch";

export default function Card({ userDetails, isLogedIn, formData, Token }) {
  const { isRTL } = useLayoutDirection();
  const { i18n } = useTranslation("global");
  var english = /^[A-Za-z]*$/;
  // console.log(userDetails)
  // console.log(Token)
  const { retData: data, loading: perLoading } = useFetch({
    url:
      Token && formData?.id && userDetails?.id
        ? `${likeMeTarget()}userId=${formData.id}&targetId=${userDetails.id}`
        : null,
    Token,
  });
  const [lastActive, setLastActive] = useState("");

  useEffect(() => {
    const calculateLastActive = () => {
      const now = new Date();
      const lastModified = userDetails?.lastLogin
        ? new Date(userDetails.lastLogin)
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
  }, [userDetails?.lastLogin, i18n.language]);

  const [percentage, setPercentage] = useState(data);
  const [loadingPer, setLoadingPer] = useState(perLoading);

  useEffect(() => {
    if (isLogedIn && data) {
      setPercentage(data);
      setLoadingPer(false);
    }
  }, [data, isLogedIn, Token]);

  // useEffect(() => {
  //   console.log(percentage);
  // }, [percentage]);

  const containsLongWord = (sentence) => {
    return sentence && sentence.split(" ").some((word) => word.length > 13);
  };

  return (
    <div className="">
      {true && (
        <div className="bg-white p-6 select-none relative pt-[82px] max-h-[500px] min-h-[500px] border border-Black/20 w-[285px] md:w-[320px] lg2:w-[290px] rounded-2xl myFont overflow-hidden mx-auto lg2:mx-0">
          <div className="w-full bg-Black/20 h-[50px] absolute top-0 left-0 flex gap-4">
            {isLogedIn ? (
              <>
                <div className={`center w-full gap-2 z-20`}>
                  <p className="text-lg font-medium text-Black">
                    {i18n.language === "ar"
                      ? "نسبة التوافق:"
                      : "Compatibility:"}
                  </p>
                  <p className="text-lg font-medium text-Black">
                    {Math.round(percentage)}&#x25;
                  </p>
                </div>
                <div
                  className={`h-full bg-gradient-to-r ${
                    i18n.language === "ar"
                      ? "to-blue-300 from-pink-400"
                      : "from-blue-300 to-pink-400"
                  } absolute z-10`}
                  style={{ width: `${Math.round(percentage)}%` }}
                ></div>
              </>
            ) : (
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

          {userDetails && userDetails?.isVerifiedUser && (
            <div className="relative group h-max w-max">
              <MdVerified className="absolute text-blue-600" size={32} />
              <span
                className={`absolute bg-gray-300 pointer-events-none text-Black text-sm font-medium p-1 px-2 mt-[34px] ${
                  isRTL ? "-right-2" : "-left-4"
                } rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                {i18n.language === "ar" ? "موثق" : "Verified"}
              </span>
            </div>
          )}

          <div className="relative group h-full">
            <div className="center gap-2 absolute top-[118px] shadow-dm border border-Black/10 py-1 px-3 bg-green-200 rounded-full">
              <FaCircle className={`text-green-600 top-[114px]`} size={12} />
              <p className={`text-sm`}>{lastActive}</p>
            </div>
            <span
              className={`absolute bg-gray-300 text-Black pointer-events-none text-sm font-medium p-1 px-2 top-[140px] ${
                isRTL ? "-right-6" : "-left-6"
              } rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            >
              {i18n.language === "ar" ? "آخر ظهور" : "Last seen"}
            </span>
          </div>

          <Link
            to={`userprofile/${userDetails?.id}`}
            aria-label={
              isRTL
                ? `الملف الشخصي الخاص بالمستخدم ${userDetails?.firstName}`
                : `User ${userDetails?.firstName} profile`
            }
            className="flex flex-col items-center gap-4"
          >
            <div className="min-h-[130px]">
              <img
                src={
                  userDetails?.isVerifiedUser
                    ? userDetails?.gender[1] === "Male"
                      ? verifiedMan
                      : verifiedWoman
                    : userDetails?.gender[1] === "Male"
                    ? Man
                    : Woman
                }
                alt="Avatar"
                className="w-28 h-28 rounded-full pointer-events-none"
              />
            </div>

            <div className="mt-4 text-center center flex-col gap-2">
              <div
                className={`center flex-wrap w-full gap-2 ${
                  (isRTL && english.test(userDetails?.firstName)) ||
                  (!isRTL && !english.test(userDetails?.firstName))
                    ? "flex-row-reverse"
                    : ""
                }`}
              >
                <p className="text-lg text-Black font-bold">
                  {userDetails?.firstName + " " + userDetails?.lastName}
                </p>
                <p className="text-md text-Black font-medium">
                  {"(" +
                    userDetails?.age +
                    " " +
                    (isRTL ? "سنة" : "Years") +
                    ")"}
                </p>
              </div>
              <div className="center flex-wrap w-full gap-2">
                <FaLocationDot size={16} className="text-Black" />
                <p className="text-md text-Black font-bold">
                  {(isRTL ? userDetails?.country[0] : userDetails?.country[1]) +
                    ", " +
                    (isRTL ? userDetails?.city[0] : userDetails?.city[1])}
                </p>
              </div>
            </div>

            <div className="flex flex-col w-[90%] gap-2 mt-4">
              <p className="text-md font-semibold text-Black">
                {i18n.language === "ar" ? "الوصف الشخصي:" : "About me:"}
              </p>
              <p
                className={`text-base text-Black/80 overflow-hidden line-clamp-3 ${
                  containsLongWord(userDetails?.selfDescription)
                    ? "break-all hyphenated"
                    : ""
                }`}
              >
                {userDetails?.selfDescription ||
                  (isRTL ? "عند التعارف" : "After Messaging")}
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
