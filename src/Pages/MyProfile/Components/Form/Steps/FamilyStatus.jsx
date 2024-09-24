import React from "react";
import { useLayoutDirection } from "../../../../../Store/Context/LayoutDirectionContext";
import { useTranslation } from "react-i18next";
import Styles from "../../../Styling.module.css";

export default function FamilyStatus({
  handleChange,
  formData,
  setFormData,
  errorMessage,
  setErrorMessage,
  handleStep,
}) {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");
  return (
    <>
      <h2 className="Title text-Black myFont text-[25px] font-semibold mb-6">
        {t("familyStatus.title")}
      </h2>
      <div className="Form center flex-col gap-10 w-[70%]">
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select
            id="Gender"
            value={formData.gender ? JSON.stringify(formData.gender) : ""}
            onChange={handleChange}
            name="gender"
            aria-label={i18n.language === "ar" ? "الجنس" : "Gender"}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.gender ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
          >
            <option value={JSON.stringify(["ذكر", "Male"])}>
              {i18n.language === "ar" ? "ذكر" : "Male"}
            </option>
            <option value={JSON.stringify(["أنثى", "Female"])}>
              {i18n.language === "ar" ? "أنثى" : "Female"}
            </option>
          </select>
          <label
            htmlFor="Gender"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "-right-2" : "-left-2"
            } text-Black transform pointer-events-none -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`}
            style={{ top: "-12px" }}
          >
            {t("loginInfo.gender")}
          </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select
            id="FamilyStatus"
            value={
              formData.familyStatus ? JSON.stringify(formData.familyStatus) : ""
            }
            onChange={handleChange}
            name="familyStatus"
            aria-label={
              i18n.language === "ar" ? "الحالة العائلية" : "Family Status"
            }
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.familyStatus
                ? "border-Black"
                : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
          >
            <option
              value={JSON.stringify([
                formData.gender[1] === "Male" ? "أعزب" : "آنسة",
                "Single",
              ])}
            >
              {i18n.language === "ar"
                ? formData.gender[1] === "Male"
                  ? "أعزب"
                  : "آنسة"
                : "Single"}
            </option>
            {formData.gender[1] === "Male" && (
              <option value={JSON.stringify(["متزوج", "Married"])}>
                {i18n.language === "ar" ? "متزوج" : "Married"}
              </option>
            )}
            <option
              value={JSON.stringify([
                formData.gender[1] === "Male" ? "مطلق" : "مطلقة",
                "Divorced",
              ])}
            >
              {i18n.language === "ar"
                ? formData.gender[1] === "Male"
                  ? "مطلق"
                  : "مطلقة"
                : "Divorced"}
            </option>
            <option
              value={JSON.stringify([
                formData.gender[1] === "Male" ? "أرمل" : "أرملة",
                "Widowed",
              ])}
            >
              {i18n.language === "ar"
                ? formData.gender[1] === "Male"
                  ? "أرمل"
                  : "أرملة"
                : "Widowed"}
            </option>
          </select>
          <label
            htmlFor="FamilyStatus"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "-right-2" : "-left-2"
            } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`}
            style={{ top: "-12px" }}
          >
            {t("familyStatus.familyStatus")}
          </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select
            id="MarriageType"
            value={
              formData.marriageType ? JSON.stringify(formData.marriageType) : ""
            }
            onChange={handleChange}
            name="marriageType"
            aria-label={i18n.language === "ar" ? "نوع الزواج" : "Marriage Type"}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.marriageType
                ? "border-Black"
                : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
          >
            {formData.gender[1] === "Male" ? (
              <>
                <option value={JSON.stringify(["الزوجة الأولى", "First Wife"])}>
                  {i18n.language === "ar" ? "الزوجة الأولى" : "First Wife"}
                </option>
                <option
                  value={JSON.stringify(["الزوجة الثانية", "Second Wife"])}
                >
                  {i18n.language === "ar" ? "الزوجة الثانية" : "Second Wife"}
                </option>
                <option
                  value={JSON.stringify(["الزوجة الثالثة", "Third Wife"])}
                >
                  {i18n.language === "ar" ? "الزوجة الثالثة" : "Third Wife"}
                </option>
                <option
                  value={JSON.stringify(["الزوجة الرابعة", "Fourth Wife"])}
                >
                  {i18n.language === "ar" ? "الزوجة الرابعة" : "Fourth Wife"}
                </option>
              </>
            ) : (
              <>
                <option
                  value={JSON.stringify([
                    "لا اقبل تعدد الزوجات",
                    "I don't accept polygamy",
                  ])}
                >
                  {i18n.language === "ar"
                    ? "لا اقبل تعدد الزوجات"
                    : "I don't accept polygamy"}
                </option>
                <option
                  value={JSON.stringify([
                    "اقبل تعدد الزوجات",
                    "I accept polygamy",
                  ])}
                >
                  {i18n.language === "ar"
                    ? "اقبل تعدد الزوجات"
                    : "I accept polygamy"}
                </option>
              </>
            )}
          </select>
          <label
            htmlFor="MarriageType"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "-right-2" : "-left-2"
            } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`}
            style={{ top: "-12px" }}
          >
            {t("familyStatus.marriageType")}
          </label>
        </div>
        <div className={`${Styles.inputHolder} relative w-full`}>
          <select
            id="Children"
            value={formData.children}
            onChange={handleChange}
            name="children"
            aria-label={i18n.language === "ar" ? "الأطفال" : "Children"}
            className={`myFont w-full py-2 px-3 border-b-[3px] ${
              formData.children ? "border-Black" : "border-[rgba(16,16,16,0.7)]"
            } bg-transparent text-Black placeholder-transparent focus:outline-none focus:border-black cursor-pointer`}
          >
            {[...Array(11)].map((_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
          <label
            htmlFor="Children"
            className={`inputLabel absolute top-[15px] ${
              isRTL ? "-right-2" : "-left-2"
            } text-Black transform -translate-y-2.5 px-1 myFont w-[100%] text-[19px] font-semibold`}
            style={{ top: "-12px" }}
          >
            {t("familyStatus.children")}
          </label>
        </div>
        {/* <div className={`${Styles.forgotPassword} self-end mt-[-15px]`}>
                    <button onClick={() => { setType('forgotpassword') }} type='button' className={`${Styles.clickableButton}`}><p className='myFont text-[18px] opacity-80 cursor-pointer font-medium'>نسيت كلمة السر</p></button>
                </div> */}
      </div>
    </>
  );
}
