import React from "react";
import ArLogo from "../../assets/ArLogo.png";
import EnLogo from "../../assets/EnLogo.png";
import { useLayoutDirection } from "../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import {
  RiInstagramFill,
  RiFacebookFill,
  RiTwitterXFill,
} from "react-icons/ri";
import { IoClose } from "react-icons/io5";

function Footer({ setPopActive, popActive, popType, setPopType }) {
  const { i18n } = useTranslation("global");
  const { isRTL } = useLayoutDirection();
  const location = useLocation();
  const isPrivacyPage = location.pathname === "/privacy";
  return (
    <footer className="bg-[#101010] p-10 myFont tracking-wide px-16 relative">
      {popActive && popType && popType === "aboutUs" && (
        <div className="bg-Black/60 fixed inset-0 flex items-center justify-center w-screen h-screen z-50 backdrop-blur-[2px]">
          <div className="min-w-[280px] w-[90%] max-w-[500px] min-h-[300px] bg-White rounded-md flex flex-col p-8 items-center relative">
            <button
              className="absolute w-[40px] h-[40px] bg-red-500 center text-white rounded-full p-2 -top-3 -right-3 z-50"
              onClick={() => {
                setPopActive(false);
                setPopType("");
              }}
            >
              <IoClose size={24} />
            </button>

            <div className="center flex-col gap-8">
              <p className="text-3xl font-semibold">
                {i18n.language === "ar" ? "من نحن" : "About Us"}
              </p>

              <p className="text-base sm2:text-lg text-Black/85 text-center leading-relaxed w-[87%] sm2:w-[85%]">
                {i18n.language === "ar"
                  ? "شركة الوكيل لمساعدة الراغبين في الزواج، شركة ذات مسؤولية محدودة تأسست في جمهورية النيجر في يونيو ٢٠٢٤."
                  : "Alwakeel Company for helping those seeking marriage is a limited liability company established in the Republic of Niger in June 2024."}
              </p>

              <p className="text-base sm2:text-lg text-Black/85 text-center leading-relaxed w-[87%] sm2:w-[85%]">
                {i18n.language === "ar"
                  ? "عماره النصر . شارع جمال عبدالناصر .. نيامى النيجر."
                  : "Al-Nasr Building. Gamal Abdel Nasser Street.. Niamey, Niger."}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
        <div className="lg:flex lg:items-center">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="link to home"
          >
            <img
              className="myFont grayscale w-36"
              src={isRTL ? ArLogo : EnLogo}
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <h3 className="text-xl leading-6 font-medium text-White">
            {i18n.language === "ar" ? "التواصل الاجتماعي" : "Socials"}
          </h3>
          <div className="flex gap-4">
            <div className="w-[52px] h-[52px] items-center flex justify-center">
              <RiInstagramFill className="text-gray-300 hover:text-DarkPink transition-all duration-200 size-[44px] hover:size-[48px]" />
            </div>
            <div className="w-[52px] h-[52px] items-center flex justify-center">
              <RiFacebookFill className="text-Black hover:bg-DarkPink hover:outline-DarkPink transition-all duration-200 size-[31px] hover:size-[35px] outline outline-[4px] outline-offset-[-1px] outline-gray-300 bg-gray-300 rounded-[8px]" />
            </div>
            <div className="w-[52px] h-[52px] items-center flex justify-center">
              <RiTwitterXFill className="text-Black hover:bg-DarkPink hover:outline-DarkPink transition-all duration-200 size-[26px] hover:size-[30px] outline outline-[7px] outline-offset-[-1px] outline-gray-300 bg-gray-300 rounded-[8px]" />
            </div>
          </div>
        </div>

        <div className="md:place-self-center place-self-start h-[75%]">
          <h4 className="text-lg font-semibold mb-6 text-white">
            {i18n.language == "ar" ? "تواصل معنا" : "Contact Us"}
          </h4>
          <ul className="space-y-4">
            <li>
              <Link
                to="Contact"
                className="text-gray-300 hover:text-white text-sm"
              >
                {i18n.language == "ar" ? "إرسل رسالة" : "Send a Message"}
              </Link>
            </li>
            <li>
              <a
                href="https://gmail.com"
                className="text-gray-300 hover:text-white text-sm"
              >
                {i18n.language == "ar" ? "البريد الإلكتروني" : "Email"}
              </a>
            </li>
            <li>
              <a
                href="tel:01284223335"
                className="text-gray-300 hover:text-white text-sm"
              >
                {i18n.language == "ar" ? "الهاتف" : "Phone"}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:place-self-center place-self-start h-[75%]">
          <h4 className="text-lg font-semibold mb-6 text-white">
            {i18n.language == "ar" ? "المعلومات" : "Information"}
          </h4>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => {
                  setPopActive(true);
                  setPopType("aboutUs");
                }}
                className="text-gray-300 hover:text-white text-sm"
              >
                {i18n.language == "ar" ? "من نحن" : "About Us"}
              </button>
            </li>
            <li>
              <Link
                to="/privacy"
                aria-label="link to privacy"
                target={!isPrivacyPage ? "_blank" : undefined}
                onClick={
                  isPrivacyPage
                    ? () => window.scrollTo({ top: 0, behavior: "smooth" })
                    : undefined
                }
                className="text-gray-300 hover:text-white text-sm"
              >
                {i18n.language == "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-gray-300 text-sm mt-10">
        {i18n.language == "ar"
          ? "© عرايس 2024. جميع الحقوق محفوظة."
          : "© Arayes 2024. All rights reserved."}
      </p>
    </footer>
  );
}

export default Footer;
