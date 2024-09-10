import React from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Card from "./Card/Card";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const dummyDetails = 
    {
        "firstName": "احمد",
        "lastName": "سعد",
        "gender": { "ar": "ذكر", "en": "Male" },
        "age": 28,
        "nationality": { "ar": "مصري", "en": "Egyptian" },
        "country": { "ar": "مصر", "en": "Egypt" },
        "city": { "ar": "القاهرة", "en": "Cairo" },
        "message": "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف.",
        "isVerified": true,
    }

export default function Reviews() {
  const { isRTL, setIsRTL } = useLayoutDirection();
  const { t, i18n } = useTranslation("global");


  return (
    <div className="w-full px-[7.5%] h-full flex flex-col gap-2 py-16 bg-[#eaeaea]">
        <div className="flex w-full gap-5 flex-wrap">
            <Typography
                variant="h3"
                className="MyFont text-2xl sm:text-3xl"
            >
                {i18n.language === 'ar' ? "آراء الأعضاء" : "Users reviews"}
            </Typography>
            <Button 
                className={`shadow-none text-Black bg-none border-x-2 rounded-full border-Black  py- px-4 text-base hover:text-DarkPink hover:border-DarkPink`}
            >
                {i18n.language === 'ar' ? "عرض الكل" : "View all"}
            </Button>
        </div>
        
        {
          isRTL &&
          (
            <Swiper
              className="w-[100%] py-5"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1} // Default slides per view
              navigation
              dir='rtl'
            >
                {
                  Array.from({ length: 15 }).map((_, index) => (
                    <SwiperSlide key={index}>
                      <Card userDetails={dummyDetails}/>
                    </SwiperSlide>
                  ))
                }
            </Swiper>
          )
        }
        {
          !isRTL &&
          (
            <Swiper
              className="w-[100%] py-5"
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1} // Default slides per view
              navigation
              dir='ltr'
            >
                {
                  Array.from({ length: 15 }).map((_, index) => (
                    <SwiperSlide key={index}>
                      <Card userDetails={dummyDetails}/>
                    </SwiperSlide>
                  ))
                }
            </Swiper>
          )
        }
    </div>
  );
}