import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
} from "@material-tailwind/react";
import { useLayoutDirection } from '../../../Store/Context/LayoutDirectionContext'
import {useTranslation} from "react-i18next"
import Card from "./Card/Card";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getUsers } from "../../../Store/urls";
import { AuthenticationContext } from "../../../Store/Context/Authentication";
import { Link } from "react-router-dom";

import "./customSwiper.css";


export default function UsersCardRatio() {
  const { isRTL } = useLayoutDirection();
  const { i18n } = useTranslation("global");
  const [usedCards, setUsedCards] = useState([])
  const {formData, isLogedIn, Token} = useContext(AuthenticationContext)

  // useEffect(() => {
  //   console.log(usedCards);
  // }, [usedCards])

  useEffect(() => {
    if (usedCards.length === 0) {
      const fetchCards = async () => {
        try {
          const response = await fetch(`${getUsers()}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              page: 0,
              size: 100000
            })
          });
          const data = await response.json();
          const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          };
  
          const shuffledCards = shuffleArray(data.content || data);

          console.log(response);
  
          setUsedCards(shuffledCards);
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
      };
      fetchCards();
    }
  }, [usedCards, setUsedCards]);


  if(!usedCards.length)
      return;

  return (
    <div className="w-[85%] h-full flex flex-col gap-8 py-16 pb-32">
        <div className="flex w-full gap-5 flex-wrap">
            <Typography
                variant="h1"
                className="MyFont text-2xl sm:text-3xl"
            >
                {i18n.language === 'ar' ? "مستخدمين عرايس" : "Arayes Users"}
            </Typography>
            <Link to={`explore/0`} aria-label={isRTL ? "عرض الكل" : "view all"}
                className={`shadow-none text-Black bg-none border-x-2 rounded-full border-Black center px-4 text-base hover:text-DarkPink hover:border-DarkPink`}
            >
                {i18n.language === 'ar' ? "عرض الكل" : "View all"}
            </Link>
        </div>
        
        {
          isRTL &&
          (
            <Swiper
                className="w-[100%] py-5"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                spaceBetween={100}
                centeredSlides={true}
                pagination = {{clickable: true}}
                dir="rtl"
                breakpoints={{
                  620: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                    centeredSlides: true,
                    centeredSlidesBounds: true,
                  },
                  830: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: false,
                    centeredSlidesBounds: false,
                  },
                  1100: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: true,
                    centeredSlidesBounds: true,
                  },
                  1180: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                    centeredSlides: false,
                    centeredSlidesBounds: false,
                  },
                  1440: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    centeredSlides: false,
                    centeredSlidesBounds: false,
                  },
                }}
              >
                {
                  usedCards && Array.isArray(usedCards) &&
                  usedCards.slice(0, 10).map((el, index) => {
                    if(formData.id != el.id){
                      return (
                        <SwiperSlide key={index} className="h-[530px]  flex justify-center">
                            <Card userDetails={el} isLogedIn={isLogedIn} Token={Token} formData={formData} />
                        </SwiperSlide>
                      )
                    }else{
                      return null
                    }
                  })
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
                slidesPerView={1}
                spaceBetween={100}
                centeredSlides={true}
                pagination = {{clickable: true}}
                dir="ltr"
                breakpoints={{
                  620: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                    centeredSlides: true,
                    centeredSlidesBounds: true,
                  },
                  830: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: false,
                    centeredSlidesBounds: false,
                  },
                  1100: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: true,
                    centeredSlidesBounds: true,
                  },
                  1180: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                    centeredSlides: false,
                    centeredSlidesBounds: false,
                  },
                  1440: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    centeredSlides: false,
                    centeredSlidesBounds: false,
                  },
                }}
              >
                {
                  usedCards && Array.isArray(usedCards) &&
                  usedCards.slice(0, 10).map((el, index) => {
                    if(formData.id != el.id){
                      return (
                        <SwiperSlide key={index} className="h-[530px]  flex justify-center">
                            <Card userDetails={el} isLogedIn={isLogedIn} Token={Token} formData={formData} />
                        </SwiperSlide>
                      )
                    }else{
                      return null
                    }
                  })
                }
            </Swiper>
          )
        }
    </div>
  );
}