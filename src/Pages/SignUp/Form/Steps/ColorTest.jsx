import React, {useState, useEffect} from "react";
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Styles from '../../Styling.module.css'
import { getColorsUrl } from "../../../../Store/urls";
import { Link } from "react-router-dom";

export default function ColorTest({handleChange, isSelected, colors, setColors, setIsSelected, formData, handleStep, handleSubmit, loading}) {
  const { isRTL } = useLayoutDirection();
  const { t } = useTranslation("global");
  const [usedColors, setUsedColors] = useState([])

  useEffect(() => {
    if (colors.length === 0) {
      // Fetch colors only if the colors array is empty
      const fetchColors = async () => {
        try {
          const response = await fetch(getColorsUrl());
          const data = await response.json();
          setColors(data);
          setIsSelected(new Array(data.length).fill(0));
        } catch (error) {
          // console.error("Error fetching colors:", error);
        }
      };
      fetchColors();
    }
    setUsedColors(colors);
  }, [colors, setColors, setIsSelected]);

  function LoadingSpinner(){
    return (
      <div className='center'>
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-DarkPink" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    )
  }

  // colors.forEach((color) => {if(color.hexCode.length !== 7) console.log(color)});

  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold">
        {t("colorTest.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[85%]">
        <h3 className="bg-LightPink px-4 py-4 rounded-lg text-[16px] font-semibold text-center">{t("colorTest.description")}</h3>
        <div className="w-full center gap-4 flex-wrap">
          {usedColors.map((color, index) => (
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
            <label htmlFor="isChecked" className="text-Black">{t("colorTest.termsOne")}</label> <Link to="/privacy" target="_blank" aria-label="link to privacy" className="text-Black underline cursor-pointer">{t("colorTest.termsTwo")}</Link>
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
              {!loading && (isRTL ? "إنشاء حساب" : "Sign up")}
              {loading && <LoadingSpinner />}
            </button>
        </div>
      </div>
    </>
  );
}
