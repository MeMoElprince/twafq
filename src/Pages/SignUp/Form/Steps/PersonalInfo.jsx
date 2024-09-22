import React from "react";
import { useLayoutDirection } from '../../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Styles from '../../Styling.module.css'

export default function PersonalInfo({handleChange, formData, setFormData, errorMessage, setErrorMessage, handleStep}) {
  const { isRTL } = useLayoutDirection();
	const { t, i18n } = useTranslation("global");


  const healthConditions = [
      { ar: 'ألم الظهر', en: 'Back pain' },
      { ar: 'ألم البطن', en: 'Abdominal pain' },
      { ar: 'ارتفاع ضغط الدم (فرط ضغط الدم)', en: 'High blood pressure (hypertension (HTN))' },
      { ar: 'ألم الصدر', en: 'Chest pain' },
      { ar: 'مرض السكري', en: 'Diabetes mellitus (DM)' },
      { ar: 'عدوى المسالك البولية', en: 'Urinary tract infection (UTI)' },
      { ar: 'صداع', en: 'Headache' },
      { ar: 'ارتفاع ضغط الدم - أساسي', en: 'Hypertension - essential' },
      { ar: 'ألم أسفل الظهر', en: 'Lower back pain' },
      { ar: 'جروح (تمزق)', en: 'Cut (laceration)' },
      { ar: 'اكتئاب', en: 'Depression' },
      { ar: 'ألم الركبة', en: 'Knee pain' },
      { ar: 'عدوى الجهاز التنفسي العلوي', en: 'Upper respiratory infection (URI)' },
      { ar: 'ألم الأسنان', en: 'Toothache' },
      { ar: 'سعال', en: 'Cough' },
      { ar: 'ربو', en: 'Asthma' },
      { ar: 'ضيق التنفس', en: 'Shortness of breath (dyspnea)' },
      { ar: 'التهاب الشعب الهوائية - حاد', en: 'Bronchitis - acute' },
      { ar: 'التهاب الحلق', en: 'Sore throat (pharyngitis)' },
      { ar: 'التهاب الجيوب الأنفية - حاد', en: 'Sinusitis - acute' },
      { ar: 'التهاب الخلايا', en: 'Cellulitis' },
      { ar: 'عدوى الأذن', en: 'Ear infection (otitis media)' },
      { ar: 'خراج', en: 'Abscess' },
      { ar: 'ألم الكتف', en: 'Shoulder pain' }
  ];



  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold mb-4">
        {t("personalInfo.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[70%]">
        <div className={`${Styles.inputHolder} relative w-full`}>
          <input
            id="FirstName"
            type="text"
            onChange={handleChange}
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.firstName ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
          />
          <label
            htmlFor="FirstName"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "-right-2" : "-left-2"
            } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
          >
            {t("personalInfo.firstName")}
          </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <input
            id="LastName"
            type="text"
            onChange={handleChange}
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.lastName ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-text`}
          />
          <label
            htmlFor="LastName"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "-right-2" : "-left-2"
            } text-Black transform -translate-y-2.5 myFont text-lg w-[100%] -z-20`}
          >
            {t("personalInfo.lastName")}
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
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
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
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
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
                {[...Array(260 - 60 + 1)].map((_, index) => (
                    <option key={index + 60} value={index + 60}>
                        {index + 60}
                    </option>
                ))}
          </select>
          <label
              htmlFor="userheight"
              className={`inputLabel absolute top-[15px] ${
                isRTL ? "-right-2" : "-left-2"
              } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} style={{ top: '-12px' }}
            >
              {t("personalInfo.height")}
            </label>
        </div>
        <div className={`relative w-full`}>
            <select 
                id="SkinColor"
                value={formData.skinColor ? JSON.stringify(formData.skinColor) : ''}
                onChange={handleChange}
                name="skinColor"
                aria-label={i18n.language === 'ar' ? 'لون البشرة' : 'Skin Color'}
                className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.skinColor ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
            >
                <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                <option value={JSON.stringify(['أبيض', 'White'])}>{i18n.language === 'ar' ? 'أبيض' : 'White'}</option>
                <option value={JSON.stringify(['قمحاوي مائل للبياض', 'Olive'])}>{i18n.language === 'ar' ? 'قمحاوي مائل للبياض' : 'Olive'}</option>
                <option value={JSON.stringify(['قمحاوي', 'Moderate Brown'])}>{i18n.language === 'ar' ? 'قمحاوي' : 'Moderate Brown'}</option>
                <option value={JSON.stringify(['أسمر', 'Brown'])}>{i18n.language === 'ar' ? 'أسمر' : 'Brown'}</option>
                <option value={JSON.stringify(['أسمر غامق', 'Dark Brown'])}>{i18n.language === 'ar' ? 'أسمر غامق' : 'Dark Brown'}</option>
            </select>
            <label
                htmlFor="SkinColor"
                className={`inputLabel absolute top-[15px] ${
                    isRTL ? "-right-2" : "-left-2"
                } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} 
                style={{ top: '-12px' }}
            >
                {t("personalInfo.skinColor")}
            </label>
        </div>

        <div className={`relative w-full`}>
            <select 
                id="Shape"
                value={formData.shape ? JSON.stringify(formData.shape) : ''}
                onChange={handleChange}
                name="shape"
                aria-label={i18n.language === 'ar' ? 'شكل الجسم' : 'Body Shape'}
                className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.shape ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
            >
                <option value={JSON.stringify(["", ""])}>{i18n.language === 'ar' ? '-- اختر --' : '-- Choose --'}</option>
                <option value={JSON.stringify(['نحيف', 'Slim'])}>{i18n.language === 'ar' ? 'نحيف' : 'Slim'}</option>
                <option value={JSON.stringify(['متوسط', 'Average'])}>{i18n.language === 'ar' ? 'متوسط' : 'Average'}</option>
                <option value={JSON.stringify(['سمين', 'Overweight'])}>{i18n.language === 'ar' ? 'سمين' : 'Overweight'}</option>
                <option value={JSON.stringify(['رياضي', 'Athletic'])}>{i18n.language === 'ar' ? 'رياضي' : 'Athletic'}</option>
            </select>
            <label
                htmlFor="Shape"
                className={`inputLabel absolute top-[15px] ${
                    isRTL ? "-right-2" : "-left-2"
                } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} 
                style={{ top: '-12px' }}
            >
                {t("personalInfo.shape")}
            </label>
        </div>

        <div className={`relative w-full`}>
            <select 
                id="Health"
                value={formData.health ? JSON.stringify(formData.health) : JSON.stringify(["انا بحالة جيدة", "I'm fine"])}
                onChange={handleChange}
                name="health"
                aria-label={i18n.language === 'ar' ? 'الحالة الصحية' : 'Health Condition'}
                className={`myFont w-full py-2 px-3 border-b-[3px] ${
                    formData.health ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
                } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
            >
                <option value={JSON.stringify(["انا بحالة جيدة", "I'm fine"])}>{i18n.language === 'ar' ? "انا بحالة جيدة" : "I'm fine"}</option>
                {healthConditions.map((condition, index) => (
                    <option 
                        key={index} 
                        value={JSON.stringify([condition.ar, condition.en])}
                    >
                        {i18n.language === 'ar' ? condition.ar : condition.en}
                    </option>
                ))}
            </select>
            <label
                htmlFor="Health"
                className={`inputLabel absolute top-[15px] ${
                    isRTL ? "-right-2" : "-left-2"
                } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`} 
                style={{ top: '-12px' }}
            >
                {t("personalInfo.health")}
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
