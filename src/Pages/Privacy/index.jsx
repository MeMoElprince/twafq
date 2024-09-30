import React from "react";
import { useTranslation } from "react-i18next";
import Contact from "../Contact";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="my-[15vh] w-full cener myFont">
      <div className="container mx-auto px-4 py-8 w-[93%] -mb-20">
        <h1 className="text-3xl font-bold mb-4">{t("privacyPolicy.title")}</h1>

        <p className="mb-4">{t("privacyPolicy.introduction")}</p>

        <h2 className="text-2xl font-bold mb-2 mt-8">
          {t("privacyPolicy.infoWeCollect.title")}
        </h2>

        <p className="mb-4">{t("privacyPolicy.infoWeCollect.intro")}</p>

        <ul className="list-disc list-inside mb-4">
          <li>{t("privacyPolicy.infoWeCollect.name")}</li>
          <li className="mt-2">
            {t("privacyPolicy.infoWeCollect.demographics")}
          </li>
          <li className="mt-2">{t("privacyPolicy.infoWeCollect.otherInfo")}</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2 mt-8">
          {t("privacyPolicy.howWeUse.title")}
        </h2>

        <p className="mb-4">{t("privacyPolicy.howWeUse.intro")}</p>

        <ul className="list-disc list-inside mb-4">
          <li>{t("privacyPolicy.howWeUse.internalRecords")}</li>
          <li className="mt-2">{t("privacyPolicy.howWeUse.improvement")}</li>
          <li className="mt-2">
            {t("privacyPolicy.howWeUse.promotionalEmails")}
          </li>
          <li className="mt-2">{t("privacyPolicy.howWeUse.marketResearch")}</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2 mt-8">
          {t("privacyPolicy.security.title")}
        </h2>

        <p className="mb-4">{t("privacyPolicy.security.description")}</p>

        <h2 className="text-2xl font-bold mb-2 mt-8">
          {t("privacyPolicy.cookies.title")}
        </h2>

        <p className="mb-4">{t("privacyPolicy.cookies.description")}</p>

        <p className="mb-4">{t("privacyPolicy.cookies.additionalInfo")}</p>

        <h2 className="text-2xl font-bold mb-2 mt-8">
          {t("privacyPolicy.links.title")}
        </h2>

        <p className="mb-4">{t("privacyPolicy.links.description")}</p>

        <h2 className="text-2xl font-bold mb-2 mt-8">
          {t("privacyPolicy.controllingYourInfo.title")}
        </h2>

        <p className="mb-4">{t("privacyPolicy.controllingYourInfo.intro")}</p>

        <ul className="list-disc list-inside mb-4">
          {/* <li className="">{t('privacyPolicy.controllingYourInfo.changeMarketing')}</li> */}
          <li className="mt-2">
            {t("privacyPolicy.controllingYourInfo.noSale")}
          </li>
          <li className="mt-2">
            {t("privacyPolicy.controllingYourInfo.requestDetails")}
          </li>
          <li className="mt-2">
            {t("privacyPolicy.controllingYourInfo.correctInfo")}
          </li>
        </ul>

        <p className="mb-4">{t("privacyPolicy.note")}</p>
      </div>
      <Contact
        title={
          i18n.language === "ar" ? "يمكنك التواصل معنا" : "You can contact us"
        }
        description={
          i18n.language === "ar"
            ? "إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية الخاصة بنا، يرجى عدم التردد في الاتصال بنا."
            : "If you have any questions or concerns regarding our privacy policy, please feel free to reach out to us."
        }
      />
    </div>
  );
};

export default PrivacyPolicy;
