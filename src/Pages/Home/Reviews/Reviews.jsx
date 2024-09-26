import React, {useState, useEffect} from "react";
import {
  Typography,
} from "@material-tailwind/react";
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Card from "./Card/Card";
import { getAllReviews } from "../../../Store/urls";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Reviews() {
  const { isRTL } = useLayoutDirection();
  const { i18n } = useTranslation("global");
  const [usedReviews, setUsedReviews] = useState([])

  useEffect(() => {
    if (usedReviews.length === 0) {
      const fetchReviews = async () => {
        try {
          const response = await fetch( getAllReviews() , {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = await response.json();
          setUsedReviews(data.content || data);
          // console.log(data)
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
      fetchReviews();
    }
  }, [usedReviews, setUsedReviews]);

  if(usedReviews.length === 0)
      return;


  return (
    <div className="relative w-full px-[7.5%] h-full flex flex-col gap-2 py-16 bg-[#eaeaea]">
        <div className="flex w-full gap-5 flex-wrap z-10">
            <Typography
                variant="h3"
                className="MyFont text-2xl sm:text-3xl"
            >
                {i18n.language === 'ar' ? "آراء الأعضاء" : "Users reviews"}
            </Typography>
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
                  usedReviews &&
                  usedReviews.map((el, index) => (
                    <SwiperSlide key={index}>
                        <Card userInfo={el} />
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
                  usedReviews &&
                  usedReviews.map((el, index) => (
                    <SwiperSlide key={index}>
                        <Card userInfo={el} />
                    </SwiperSlide>
                  ))
                }
            </Swiper>
          )
        }
    </div>
  );
}