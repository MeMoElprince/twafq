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
        {t("personalInfo.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[70%]">
        <div className={`${Styles.inputHolder} relative w-full`}>
          <input
            id="realName"
            type="text"
            onChange={handleChange}
            name="name"
            placeholder="Name"
            value={formData.name}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.name ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
          />
          <label
            htmlFor="realName"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "right-2" : "left-2"
            } text-Black/70 transform pointer-events-none -translate-y-2.5 px-1 myFont text-lg w-[100%]`}
          >
            {t("personalInfo.name")}
          </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  name="age"
                  aria-label={i18n.language == 'ar' ? 'العمر' : 'Age'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.height ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value="">{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  {[...Array(83)].map((_, index) => (
                      <option key={index + 18} value={index + 18}>
                          {index + 18}
                      </option>
                  ))}
          </select>
          <label
              htmlFor="age"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] -top-3 font-semibold`}
            >
              {t("personalInfo.age")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                id="userWeight"
                value={formData.weight}
                onChange={handleChange}
                name="weight"
                aria-label={i18n.language == 'ar' ? 'الوزن (كيلوجرام)' : 'Weight (KG)'}
                className={`myFont w-full py-2 px-3 border-b-[3px] ${
                  formData.weight ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
            >
                <option value="">{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                {[...Array(200-30+1)].map((_, index) => (
                    <option key={index + 30} value={index + 30}>
                        {index + 30}
                    </option>
                ))}
          </select>
          <label
              htmlFor="userWeight"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] -top-3 font-semibold`}
            >
              {t("personalInfo.weight")}
            </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select 
                id="userHeight"
                value={formData.height}
                onChange={handleChange}
                name="height"
                aria-label={i18n.language == 'ar' ? 'الطول (سنتيمتر)' : 'Height (CM)'}
                className={`myFont w-full py-2 px-3 border-b-[3px] ${
                  formData.height ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
            >
                <option value="">{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                {[...Array(300-90+1)].map((_, index) => (
                    <option key={index + 90} value={index + 90}>
                        {index + 90}
                    </option>
                ))}
          </select>
          <label
              htmlFor="userheight"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] -top-3 font-semibold`}
            >
              {t("personalInfo.height")}
            </label>
        </div>
        <div className={`relative w-full`}>
            <select 
                    id="SkinColor"
                    value={formData.skinColor}
                    onChange={handleChange}
                    name="skinColor"
                    aria-label={i18n.language == 'ar' ? 'لون البشرة' : 'Skin Color'}
                    className={`myFont w-full py-2 px-3 border-b-[3px] ${
                      formData.skinColor ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                    } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
                >
                    <option value="">{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                    <option value="very_fair">{i18n.language == 'ar' ? 'أبيض جداً' : 'Very Fair'}</option>
                    <option value="fair">{i18n.language == 'ar' ? 'أبيض' : 'Fair'}</option>
                    <option value="light">{i18n.language == 'ar' ? 'قمحاوي' : 'Light'}</option>
                    <option value="olive">{i18n.language == 'ar' ? 'قمحاوي مائل للبياض' : 'Olive'}</option>
                    <option value="medium">{i18n.language == 'ar' ? 'قمحاوي مائل للسمار' : 'Medium'}</option>
                    <option value="tan">{i18n.language == 'ar' ? 'أسمر' : 'Tan'}</option>
                    <option value="brown">{i18n.language == 'ar' ? 'أسمر فاتح' : 'Brown'}</option>
                    <option value="dark_brown">{i18n.language == 'ar' ? 'أسمر غامق' : 'Dark Brown'}</option>
                    <option value="black">{i18n.language == 'ar' ? 'أسود' : 'Black'}</option>
            </select>
          <label
            htmlFor="SkinColor"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "-right-2" : "-left-2"
            } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] -top-3 font-semibold`}
          >
            {t("personalInfo.skinColor")}
          </label>
        </div>
        <div className={`relative w-full`}>
          <select 
                  id="Shape"
                  value={formData.shape}
                  onChange={handleChange}
                  name="shape"
                  aria-label={i18n.language == 'ar' ? 'شكل الجسم' : 'Body Shape'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.shape ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value="">{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                  <option value="slim">{i18n.language == 'ar' ? 'نحيف' : 'Slim'}</option>
                  <option value="average">{i18n.language == 'ar' ? 'متوسط' : 'Average'}</option>
                  <option value="overweight">{i18n.language == 'ar' ? 'سمين' : 'Overweight'}</option>
                  <option value="athletic">{i18n.language == 'ar' ? 'رياضي' : 'Athletic'}</option>
          </select>
          <label
            htmlFor="Shape"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "-right-2" : "-left-2"
            } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] -top-3 font-semibold`}
          >
            {t("personalInfo.shape")}
          </label>
        </div>
        <div className={`relative w-full`}>
          <select 
                  id="Health"
                  value={formData.health}
                  onChange={handleChange}
                  name="health"
                  aria-label={i18n.language == 'ar' ? 'الحالة الصحية' : 'Health Condition'}
                  className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.health ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                  } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
              >
                  <option value="">{i18n.language == 'ar' ? '-- اختر --' : '-- Choose --'}</option>
          </select>
          <label
            htmlFor="Health"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "-right-2" : "-left-2"
            } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] -top-3 font-semibold`}
          >
            {t("personalInfo.health")}
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
