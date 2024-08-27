import React from "react";
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Styles from '../../Styling.module.css'

export default function Religion({handleChange, formData, setFormData, errorMessage, setErrorMessage, handleStep}) {
  const { isRTL, setIsRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");
  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold mb-6">
        {t("religion.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[70%]">
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="Religion"
                  value={formData.religion ? JSON.stringify(formData.religion) : ''}
                  onChange={handleChange}
                  name="religion"
                  aria-label={i18n.language == 'ar' ? 'الديانة' : 'Religion'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.religion ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
          </select>
          <label
              htmlFor="Religion"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("religion.religion")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="Doctrine"
                  value={formData.doctrine ? JSON.stringify(formData.doctrine) : ''}
                  onChange={handleChange}
                  name="doctrine"
                  aria-label={i18n.language == 'ar' ? 'المذهب' : 'Doctrine'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.doctrine ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
          </select>
          <label
              htmlFor="Doctrine"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("religion.doctrine")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="ReligiousCommitment"
                  value={formData.religiousCommitment ? JSON.stringify(formData.religiousCommitment) : ''}
                  onChange={handleChange}
                  name="religiousCommitment"
                  aria-label={i18n.language == 'ar' ? 'الإلتزام الديني' : 'Religious Commitment'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.religiousCommitment ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
          </select>
          <label
              htmlFor="ReligiousCommitment"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[15px] sm2:text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("religion.religiousCommitment")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="Smoking"
                  value={formData.smoking ? JSON.stringify(formData.smoking) : ''}
                  onChange={handleChange}
                  name="smoking"
                  aria-label={i18n.language == 'ar' ? 'التدخين' : 'Smoking'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.smoking ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  <option value={JSON.stringify(['مدخن', 'Smoker'])}>{i18n.language === 'ar' ? 'مدخن' : 'Smoker'}</option>
                  <option value={JSON.stringify(['غير مدخن', 'Non-Smoker'])}>{i18n.language === 'ar' ? 'غير مدخن' : 'Non-Smoker'}</option>
          </select>
          <label
              htmlFor="Smoking"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[15px] sm2:text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("religion.smoking")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="AlcoholDrugs"
                  value={formData.alcoholdrugs ? JSON.stringify(formData.alcoholdrugs) : ''}
                  onChange={handleChange}
                  name="alcoholdrugs"
                  aria-label={i18n.language == 'ar' ? 'الكحول أو المخدرات' : 'alcohol or drugs'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.alcoholDrugs ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value={JSON.stringify(["", ""])}>{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
          </select>
          <label
              htmlFor="AlcoholDrugs"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[15px] sm2:text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("religion.alcoholDrugs")}
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
        <p className="text-red-700 font-bold -mb-5 -mt-5">{errorMessage}</p>
      </div>
    </>
  );
}
