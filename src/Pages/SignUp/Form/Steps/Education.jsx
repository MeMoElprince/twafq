import React from "react";
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Styles from '../../Styling.module.css'

export default function Education({handleChange, formData, setFormData, errorMessage, setErrorMessage, handleStep}) {
  const { isRTL, setIsRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");
  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold mb-6">
        {t("education.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[70%]">
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="EducationLevel"
                  value={formData.educationLevel ? JSON.stringify(formData.educationLevel) : ''}
                  onChange={handleChange}
                  name="educationLevel"
                  aria-label={i18n.language === 'ar' ? 'المؤهل' : 'Education Level'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.educationLevel ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>
                      {i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}
                  </option>
                  <option value={JSON.stringify(['دون تعليم', 'No Education'])}>
                      {i18n.language === 'ar' ? 'دون تعليم' : 'No Education'}
                  </option>
                  <option value={JSON.stringify(['شهادة المتوسطة', 'Middle School'])}>
                      {i18n.language === 'ar' ? 'شهادة المتوسطة' : 'Middle School'}
                  </option>
                  <option value={JSON.stringify(['شهادة ثانوية', 'High School'])}>
                      {i18n.language === 'ar' ? 'شهادة ثانوية' : 'High School'}
                  </option>
                  <option value={JSON.stringify(['درجة البكالوريوس', 'Bachelor\'s Degree'])}>
                      {i18n.language === 'ar' ? 'درجة البكالوريوس' : 'Bachelor\'s Degree'}
                  </option>
                  <option value={JSON.stringify(['درجة الماجستير', 'Master\'s Degree'])}>
                      {i18n.language === 'ar' ? 'درجة الماجستير' : 'Master\'s Degree'}
                  </option>
                  <option value={JSON.stringify(['درجة الدكتوراه', 'Doctorate'])}>
                      {i18n.language === 'ar' ? 'درجة الدكتوراه' : 'Doctorate'}
                  </option>
          </select>
          <label
              htmlFor="EducationLevel"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("education.educationLevel")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
            <input
              id="Work"
              type="text"
              onChange={handleChange}
              name="work"
              placeholder="Work"
              value={formData.work}
              className={`myFont w-full py-2 px-3 border-b-[3px] ${
                formData.work ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
              } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
            />
            <label
              htmlFor="Work"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
            >
              {t("education.work")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="FinancialStatus"
                  value={formData.financialStatus ? JSON.stringify(formData.financialStatus) : ''}
                  onChange={handleChange}
                  name="financialStatus"
                  aria-label={i18n.language === 'ar' ? 'الحالة المادية' : 'Financial Status'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.financialStatus ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>
                      {i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}
                  </option>
                  <option value={JSON.stringify(['فقير', 'Poor'])}>
                      {i18n.language === 'ar' ? 'فقير' : 'Poor'}
                  </option>
                  <option value={JSON.stringify(['أقل من المتوسط', 'Less than Average'])}>
                      {i18n.language === 'ar' ? 'أقل من المتوسط' : 'Less than Average'}
                  </option>
                  <option value={JSON.stringify(['متوسط', 'Average'])}>
                      {i18n.language === 'ar' ? 'متوسط' : 'Average'}
                  </option>
                  <option value={JSON.stringify(['جيد', 'Good'])}>
                      {i18n.language === 'ar' ? 'جيد' : 'Good'}
                  </option>
                  <option value={JSON.stringify(['غني', 'Wealthy'])}>
                      {i18n.language === 'ar' ? 'غني' : 'Wealthy'}
                  </option>
          </select>
          <label
              htmlFor="FinancialStatus"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("education.financialStatus")}
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
