import React from "react";
import { useTranslation } from "react-i18next";
import FamilyImg from "./assets/FamilyImg.webp";
import ReactPlayer from "react-player/youtube";
import Contact from "../Contact";

export default function index() {
  const { t, i18n } = useTranslation("global");
  return (
    <div className="px-4 sm:px-10 pt-[20vh] sm:pt-[25vh] flex flex-col justify-center items-center gap-24">
      <div className="min-h-[500px]">
        <div className="grid md:grid-cols-2 justify-center items-center gap-10">
          <div className="max-md:order-1">
            <p className="mt-4 mb-2 font-semibold text-sm sm:text-base text-DarkPink">
              <span className="rotate-90 inline-block mx-2">|</span>{" "}
              {t("services.subtitle")}
            </p>
            <h1 className="md:text-5xl text-3xl sm:text-4xl font-bold mb-4 md:!leading-[55px]">
              {t("services.title")}
            </h1>
            <p className="mt-8 text-base sm:text-lg leading-relaxed">
              {t("services.description")}
            </p>
          </div>
          <div className="max-md:mt-12 h-full">
            <img
              src={FamilyImg}
              alt="Family Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="center flex-wrap gap-24 ">
        <div className="flex justify-center items-center overflow-hidden rounded-lg border border-Black/10 shadow-md">
          <div className="rounded-lg shadow-lg bg-white min-w-[300px] max-w-[300px]">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=YyC6LkXnDjM"
              controls
              width={300}
              height={200}
              light
            />
            <div className="p-6">
              <h5 className="text-Black text-xl font-semibold mb-2 text-center">
                {i18n.language === "ar"
                  ? "معايير اختيار الزوجة"
                  : "Criteria for Choosing a Wife"}
              </h5>
              <button
                type="button"
                className="inline-block px-8 py-2.5 mt-4 bg-DarkPink text-white font-medium text-sm leading-tight rounded-full shadow-md hover:bg-[#e1425d] hover:shadow-lg focus:bg-[#e1425d] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#cb3951] active:shadow-lg transition duration-150 ease-in-out"
              >
                {i18n.language === "ar" ? "تحتاج إلى استشارة؟" : "Need advice?"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center overflow-hidden rounded-lg  border border-Black/10 shadow-md">
          <div className="rounded-lg shadow-lg bg-white min-w-[300px] max-w-[300px]">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=JIMb2tfkzZQ"
              controls
              width={300}
              height={200}
              light
            />
            <div className="p-6">
              <h5 className="text-Black text-xl font-semibold mb-2 text-center">
                {i18n.language === "ar"
                  ? "معايير اختيار الزوج"
                  : "Criteria for Choosing a Husband"}
              </h5>
              <button
                type="button"
                className="inline-block px-8 py-2.5 mt-4 bg-DarkPink text-white font-medium text-sm leading-tight rounded-full shadow-md hover:bg-[#e1425d] hover:shadow-lg focus:bg-[#e1425d] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#cb3951] active:shadow-lg transition duration-150 ease-in-out"
              >
                {i18n.language === "ar" ? "تحتاج إلى استشارة؟" : "Need advice?"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-20">
        <Contact
            title={i18n.language === "ar" ? "استشارة أسرية" : "Family Counseling"}
            description={
            i18n.language === "ar"
                ? "هل تحتاج إلى استشارة أسرية أو دعم في قرارات حياتك الأسرية؟ تواصل معنا الآن."
                : "Need family counseling or support in your family decisions? Reach out to us now."
            }
        />
      </div>
    </div>
  );
}
