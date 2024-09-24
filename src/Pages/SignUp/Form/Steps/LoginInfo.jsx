import React from "react";
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Styles from '../../Styling.module.css'

export default function LoginInfo({handleChange, formData, setFormData, errorMessage, setErrorMessage, handleStep}) {
    const { isRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");

  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold">
        {t("loginInfo.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[70%]">
        <h3 className="bg-LightPink px-4 py-4 rounded-lg text-[16px] font-semibold text-center">{t("loginInfo.phoneMsg")}</h3>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="Gender"
                  value={formData.gender ? JSON.stringify(formData.gender) : ''}
                  onChange={handleChange}
                  name="gender"
                  aria-label={i18n.language === 'ar' ? 'الجنس' : 'Gender'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.gender ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  <option value={JSON.stringify(['ذكر', 'Male'])}>{i18n.language === 'ar' ? 'ذكر' : 'Male'}</option>
                  <option value={JSON.stringify(['أنثى', 'Female'])}>{i18n.language === 'ar' ? 'أنثى' : 'Female'}</option>
          </select>
          <label
              htmlFor="Gender"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("loginInfo.gender")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <input
            id="userPhone"
            type="text"
            onChange={handleChange}
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.phone ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
          />
          <label
            htmlFor="userPhone"
            className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
          >
            {t("loginInfo.phone")}
          </label>
        </div>
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
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
          >
            {t("loginInfo.email")}
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
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
          >
            {t("loginInfo.password")}
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
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 myFont text-[14px] w-[100%] -z-20`}
              style={{fontSize: "14px"}}
          >
            {t("loginInfo.confirmPass")}
          </label>
        </div>
        {/* <div className={`${Styles.forgotPassword} self-end mt-[-15px]`}>
                    <button onClick={() => { setType('forgotpassword') }} type='button' className={`${Styles.clickableButton}`}><p className='myFont text-[18px] opacity-80 cursor-pointer font-medium'>نسيت كلمة السر</p></button>
                </div> */}
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
              onClick={() => handleStep(1)}
              onKeyDown={e => e.key === 'enter' ? `() => ${handleStep(1)}` : ""}
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
              {t("personalInfo.next")}
            </button>
        </div>
      </div>
    </>
  );
}
