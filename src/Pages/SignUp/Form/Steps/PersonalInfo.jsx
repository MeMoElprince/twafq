import React from "react";
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Styles from '../../Styling.module.css'

export default function PersonalInfo({handleChange, formData, setFormData, errorMessage, setErrorMessage, handleStep}) {
    const { isRTL, setIsRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");
  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold">
        {t("personalInfo.personal")}
      </h2>
      <div className="Form center flex-col gap-10 w-[70%]">
        <div className={`${Styles.inputHolder} relative w-full`}>
          <input
            id="userEmail"
            type="email"
            onChange={handleChange}
            name="email"
            placeholder="Email"
            value={formData.email}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.email ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
          />
          <label
            htmlFor="userEmail"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "right-2" : "left-2"
            } text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 myFont text-lg w-[100%]`}
          >
            {t("personalInfo.email")}
          </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <input
            id="userPassword"
            type="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            placeholder="Password"
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.password ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
            style={{
              fontFamily: "Verdana",
              letterSpacing: "0.125em",
            }}
          />
          <label
            htmlFor="userPassword"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "right-2" : "left-2"
            } text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 myFont text-lg w-[100%]`}
          >
            {t("personalInfo.password")}
          </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <input
            id="userConfirmPassword"
            type="password"
            onChange={handleChange}
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="confirm password"
            className={`Fredoka w-full py-2 px-3 border-b-[3px] ${
              formData.confirmPassword
                ? "border-Black"
                : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
            style={{
              fontFamily: "Verdana",
              letterSpacing: "0.125em",
            }}
          />
          <label
            htmlFor="userPassword"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "right-2" : "left-2"
            } text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 myFont text-lg w-[100%]`}
          >
            {t("personalInfo.confirmPass")}
          </label>
        </div>
        {/* <div className={`${Styles.forgotPassword} self-end mt-[-15px]`}>
                    <button onClick={() => { setType('forgotpassword') }} type='button' className={`${Styles.clickableButton}`}><p className='myFont text-[18px] opacity-80 cursor-pointer font-medium'>نسيت كلمة السر</p></button>
                </div> */}
        <div className="w-full center gap-4">
          <button
            onClick={() => handleStep(1)}
            className={`${
              Styles.loginBtnAnimate
            } bg-Black myFont text-White text-[22px] w-[100%] py-[14px] rounded-full
                    relative overflow-hidden inline-block z-10
                    transition-all duration-300 ease-in-out
                    focus:outline-none
                    before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:-z-10
                    before:rounded-inherit before:bg-[#505050] before:bg-opacity-40 
                    before:transition-all before:duration-300 before:ease-in-out
                    
                    hover:before:left-0
                    
                    `}
          >
            {t("personalInfo.next")}
          </button>

          <button
            onClick={() => handleStep(-1)}
            className={`${
              Styles.loginBtnAnimate
            } bg-none border border-Black myFont text-Black text-[22px] w-[100%] py-[14px] rounded-full
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
        </div>
        <p className="text-red-700 font-bold -mb-5 -mt-5">{errorMessage}</p>
      </div>
    </>
  );
}
