import React from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Card from "./Card/Card";

const dummyDetails = 
    {
        "firstName": "احمد",
        "lastName": "سعد",
        "gender": { "ar": "ذكر", "en": "Male" },
        "age": 28,
        "weight": 75,
        "height": 175,
        "skinColor": { "ar": "قمحاوي", "en": "Moderate Brown" },
        "shape": { "ar": "متوسط", "en": "Average" },
        "healthCondition": { "ar": "ألم الظهر", "en": "Back pain" },
        "religion": { "ar": "الإسلام", "en": "Islam" },
        "doctrine": { "ar": "سني", "en": "Sunni" },
        "religiousCommitment": { "ar": "ملتزم", "en": "Committed" },
        "smoking": { "ar": "غير مدخن", "en": "Non-Smoker" },
        "familyStatus": { "ar": "أعزب", "en": "Single" },
        "marriageType": { "ar": "الزوجة الأولى", "en": "First Wife" },
        "children": 0,
        "educationLevel": { "ar": "درجة البكالوريوس", "en": "Bachelor's Degree" },
        "financialStatus": { "ar": "متوسط", "en": "Average" },
        "nationality": { "ar": "مصري", "en": "Egyptian" },
        "country": { "ar": "مصر", "en": "Egypt" },
        "city": { "ar": "القاهرة", "en": "Cairo" },
        "residence": { "ar": "مدينة نصر", "en": "Nasr City" },
        "work": { "ar": "مهندس معماري", "en": "Architect" },
        "selfDescription": "أنا شخص هادئ وبسيط.",
        "partnerDescription": "أبحث عن شريك طيب القلب وصادق.",
        "phone": "+20 1234567890",
        "isVerified": false
    }

export default function UsersCardRatio() {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");


  return (
    <div className="w-[85%] h-full flex flex-col gap-8 py-16">
        <div className="flex w-full gap-5 flex-wrap">
            <Typography
                variant="h3"
                className="MyFont text-2xl sm:text-3xl"
            >
                الاعضاء الاكثر توافقاً معك
            </Typography>
            <Button 
                className={`shadow-none text-Black bg-none border-x-2 rounded-full border-Black  py-1 px-4 text-base hover:text-DarkPink hover:border-DarkPink`}
            >
                عرض الكل
            </Button>
        </div>

        <Card userDetails={dummyDetails} />
    </div>
  );
}