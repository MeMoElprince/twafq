import React, {useState, useEffect} from "react";
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Styles from '../../Styling.module.css'
import { getColorsUrl } from "../../../../Store/urls";

export default function ColorTest({handleChange, isSelected, colors, setColors, setIsSelected, formData, setFormData, errorMessage, setErrorMessage, handleStep, handleSubmit}) {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(getColorsUrl());
        const data = await response.json();
        console.log(data);
        setColors(data);
        setIsSelected(new Array(data.length).fill(0));
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchColors();
  }, []);

  // colors.forEach((color) => {if(color.hexCode.length !== 7) console.log(color)});

  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold">
        {t("colorTest.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[85%]">
        <h3 className="bg-LightPink px-4 py-4 rounded-lg text-[16px] font-semibold text-center">{t("colorTest.description")}</h3>
        <div className="w-full center gap-4 flex-wrap">
          {colors.map((color, index) => (
            <span
              key={index}
              onClick={() => setIsSelected(prevSelected => {
                const newSelected = [...prevSelected];
                newSelected[index] = !newSelected[index];
                return newSelected;
              })}
              className={`w-20 h-20 md3:w-32 md3:h-32 rounded-2xl center bg-[#DDDDDD] cursor-pointer ${isSelected[index] ? 'border-[6px] border-DarkPink' : ''}`}
            >
              <div className={`w-14 h-14 md3:w-24 md3:h-24 rounded-xl shadow-custom border border-Black/25`} style={{background: `${color.hexCode === '#80' ? "#000050" : color.hexCode}`}}></div>
            </span>
          ))}
        </div>
        {/* add the accept terms here */}
        <div className="flex items-center gap-2 mt-6">
          <input  
            type="checkbox"
            id="isChecked"
            name="isChecked"
            checked={formData.isChecked}
            onChange={handleChange}
            className="cursor-pointer w-6 h-6"
          />
          <div className="text-[18px] font-semibold">
            <label htmlFor="isChecked" className="text-Black">{t("colorTest.termsOne")}</label> <span className="text-Black underline cursor-pointer">{t("colorTest.termsTwo")}</span>
          </div>
        </div>

        <div className="w-full center gap-4">
        <button
              onClick={() => handleStep(-1)}
              className={`${
                Styles.loginBtnAnimate
              } bg-none border border-Black myFont text-Black text-[18px] sm2:text-[22px]  w-[100%] py-[14px] rounded-full
                      relative overflow-hidden inline-block z-10
                      transition-all duration-300 ease-in-out
                      focus:outline-none
                      before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
                      before:rounded-inherit before:bg-[#b5b5b5] before:bg-opacity-40 
                      before:transition-all before:duration-300 before:ease-in-out
                      hover:before:left-0
                      `}
            >
              {t("personalInfo.prev")}
            </button>
            <button
              onClick={handleSubmit}
              className={`${
                Styles.loginBtnAnimate
              } bg-Black myFont text-White text-[18px] sm2:text-[22px] w-[100%] py-[14px] rounded-full
                      relative overflow-hidden inline-block z-10
                      transition-all duration-300 ease-in-out
                      focus:outline-none
                      before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
                      before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
                      before:transition-all before:duration-300 before:ease-in-out
                      
                      hover:before:left-0
                      
                      `}
            >
              {i18n.language === 'ar' ? "إنشاء حساب" : "Sign up"}
            </button>
        </div>
        <p className="text-red-700 font-bold -mb-5 -mt-5">{errorMessage}</p>
      </div>
    </>
  );
}
