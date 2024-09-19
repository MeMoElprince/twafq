import React from "react";
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import SingleFeature from "./Components/SingleFeature";

export default function Features() {
  const { t, i18n } = useTranslation("global");

  const features = [
    {
      "title": {
        "ar": "مساعدة الشباب على الزواج المبكر",
        "en": "Supporting Youth in Early Marriage"
      },
      "description": {
        "ar": "نساهم في تشجيع الشباب على الزواج المبكر وتكوين أسرة مستقرة، مع تقديم جميع الوسائل اللازمة لتحقيق ذلك.",
        "en": "We help encourage young people to marry early and form a stable family, providing all necessary tools to achieve this."
      }
    },
    {
        "title": {
          "ar": "أدوات بحث متقدمة",
          "en": "Advanced Search Tools"
        },
        "description": {
          "ar": "نوفر أدوات بحث متقدمة، تشمل حساب التوافق بين الطرفين بناءً على الألوان المفضلة، مما يساعد الأعضاء في العثور على الشريك المثالي.",
          "en": "We provide advanced search tools, including compatibility ratio based on preferred colors, helping members find their perfect match."
        }
    },
    {
      "title": {
        "ar": "خدمات متكاملة",
        "en": "Comprehensive Services"
      },
      "description": {
        "ar": "نقدم خدمات شاملة تشمل التسجيل، البحث، طلب التواصل، وتقديم الاستشارات؛ مما يوفر تجربة سلسة وشاملة للأعضاء.",
        "en": "We offer comprehensive services including registration, search, contact request, and consultations, providing a smooth and complete experience for users."
      }
    },
    {
      "title": {
        "ar": "الخصوصية والأمان",
        "en": "Privacy and Security"
      },
      "description": {
        "ar": "نضمن حماية خصوصية الأعضاء وتوفير أعلى معايير الأمان لضمان تجربة آمنة.",
        "en": "We ensure the privacy of members and provide the highest standards of security to guarantee a safe experience."
      }
    },
    {
      "title": {
        "ar": "التحقق من هوية الأعضاء",
        "en": "Member Identity Verification"
      },
      "description": {
        "ar": "نعمل على التأكد من هوية الأعضاء لضمان تقديم معلومات دقيقة وشاملة للأعضاء المسجلين.",
        "en": "We verify the identity of members to ensure accurate and comprehensive information for registered members."
      }
    }
  ]

  return (
    <section className="bg-[#eaeaea] w-full py-16">
        <div className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2
                        className="mb-4 bg-LightPink px-4 py-2 rounded-lg md:w-64 w-[80%] mx-auto text-md font-semibold  text-Black uppercase">
                        {t("aboutFeatures.question")}
                    </h2>
                    {/* <p className="mt-2 text-3xl font-semibold mx-auto tracking-tight text-Black sm:text-4xl leading-[300px]">
                        {t("aboutFeatures.description")}
                    </p> */}
                    <p className="mt-4 text-2xl text-Black max-w-[90%] font-semibold mx-auto">
                        {t("aboutFeatures.description")}
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

                        {
                            features.map((feature, index) => (
                                <SingleFeature 
                                    key={index}
                                    title = {i18n.language === 'ar' ? feature.title.ar : feature.title.en}
                                    description= {i18n.language === 'ar' ? feature.description.ar : feature.description.en}
                                />
                            ))
                        }

                    </dl>
                </div>

            </div>
        </div>
    </section>
  );
}