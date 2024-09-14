import React, { useRef, useState, useEffect} from "react";
import { useLayoutDirection } from '../../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Styles from '../../../Styling.module.css'

export default function Description({handleChange, formData, setFormData, errorMessage, setErrorMessage, handleStep}) {
  const { isRTL, setIsRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");

  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold mb-6">
        {t("description.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[70%]">
        <div className={`${Styles.inputHolder} relative w-full`}>
              <textarea
                id="SelfDescription"
                onChange={handleChange}
                name="selfDescription"
                placeholder="Self Description"
                value={formData.selfDescription}
                style={{ minHeight: "130px", wordBreak : "break-all", whiteSpace: "normal" }}
                maxLength={"255"}
                className={`relative myFont w-full py-2 px-3 border-b-[3px] ${
                  formData.selfDescription ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text resize-none overflow-hidden text-[18px]`}
            />
            <label
              htmlFor="SelfDescription"
              className={`inputLabel absolute top-[15px] transition-all duration-150 ${
                isRTL ? `${formData.selfDescription ? "-" : ""}right-2` : `${formData.selfDescription ? "-" : ""}left-2`
              } transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] ${formData.selfDescription ? "text-[19px] font-semibold text-Black": "text-lg text-Black/70"}`}
              style={formData.selfDescription ? { top: '-12px' } : {}}
            >
              {formData.selfDescription ? t("description.selfDescription").slice(0, -3) : t("description.selfDescription")}
            </label>
          </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
              <textarea
                id="PartnerDescription"
                onChange={handleChange}
                name="partnerDescription"
                placeholder="Partner Description"
                value={formData.partnerDescription}
                style={{ height: "130px", wordBreak : "break-all", whiteSpace: "normal" }}
                maxLength={"255"}
                className={`relative myFont w-full py-2 px-3 border-b-[3px] ${
                  formData.partnerDescription ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text resize-none overflow-hidden text-[18px]`}
            />
            <label
              htmlFor="PartnerDescription"
              className={`inputLabel absolute top-[15px] transition-all duration-150 ${
                isRTL ? `${formData.partnerDescription ? "-" : ""}right-2` : `${formData.partnerDescription ? "-" : ""}left-2`
              } transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] ${formData.partnerDescription ? "text-[19px] font-semibold text-Black": "text-lg text-Black/70"}`}
              style={formData.partnerDescription ? { top: '-12px' } : {}}
            >
              {formData.partnerDescription ? t("description.partnerDescription").slice(0, -3) : t("description.partnerDescription")}
            </label>
          </div>
        {/* <div className={`${Styles.forgotPassword} self-end mt-[-15px]`}>
                    <button onClick={() => { setType('forgotpassword') }} type='button' className={`${Styles.clickableButton}`}><p className='myFont text-[18px] opacity-80 cursor-pointer font-medium'>نسيت كلمة السر</p></button>
                </div> */}
        <p className="text-red-700 font-bold -mb-5 -mt-5">{errorMessage}</p>
      </div>
    </>
  );
}
