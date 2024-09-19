import React from "react";
import { useTranslation } from "react-i18next";
import FamilyImg from './assets/FamilyImg.webp'

export default function index() {
  const { t, i18n } = useTranslation("global");
  return (
    <div className="px-4 sm:px-10 py-[20vh] sm:py-[25vh]">
      <div className="min-h-[500px]">
        <div className="grid md:grid-cols-2 justify-center items-center gap-10">
          <div className="max-md:order-1">
            <p className="mt-4 mb-2 font-semibold text-DarkPink">
              <span className="rotate-90 inline-block mx-2">|</span> {t("services.subtitle")}
            </p>
            <h1 className="md:text-5xl text-4xl font-bold mb-4 md:!leading-[55px]">
              {t("services.title")}
            </h1>
            <p className="mt-8 text-lg leading-relaxed">
              {t("services.description")}
            </p>
          </div>
          <div className="max-md:mt-12 h-full">
            <img
              src= {FamilyImg}
              alt="Family Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
